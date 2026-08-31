import { expect, test, type Browser, type Page } from '@playwright/test';

const password = 'SparkKit-test-password-2026';

function unique(prefix: string): string {
  const safePrefix = prefix.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${safePrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function registerAndOnboard(page: Page, label: string) {
  const identity = unique(label);
  const email = `${identity}@example.test`;
  const organizationName = `${label} Workspace ${identity.slice(-6)}`;

  await page.goto('/sign-in');
  await page.getByRole('button', { name: 'Create account', exact: true }).click();
  await page.getByLabel('Full name').fill(`${label} Owner`);
  await page.getByLabel('Email address').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Create account →' }).click();
  await expect(page).toHaveURL(/\/onboarding$/);

  await page.getByLabel('Organization name').fill(organizationName);
  await page.getByRole('button', { name: 'Create workspace' }).click();
  await expect(page).toHaveURL(/\/dashboard\?organization=/);

  return {
    email,
    organizationId: new URL(page.url()).searchParams.get('organization')!,
  };
}

async function createOrganization(page: Page, label: string) {
  const slug = unique(label).toLowerCase();
  const response = await page.request.post('/api/organizations', {
    data: { name: `${label} Workspace`, slug },
    headers: { origin: new URL(page.url()).origin },
  });

  expect(response.status()).toBe(201);
  return (await response.json()) as { organization: { id: string; name: string } };
}

async function createSecondTenant(browser: Browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const tenant = await registerAndOnboard(page, 'Other Tenant');
  await context.close();
  return tenant;
}

test('onboarding, login, organization switching, project workflow, and tenant isolation', async ({ browser, page }) => {
  const primary = await registerAndOnboard(page, 'Primary');
  await expect(page.getByRole('heading', { name: /Good morning/ })).toBeVisible();
  await expect(page.getByText('Create your first small software project')).toBeVisible();

  const secondOrganization = await createOrganization(page, 'Second');
  await page.reload();
  const picker = page.getByLabel('Workspace', { exact: true });
  await expect(picker.locator('option')).toHaveCount(2);
  await picker.selectOption(secondOrganization.organization.id);
  await expect(page).toHaveURL(new RegExp(`organization=${secondOrganization.organization.id}`));

  await page.getByRole('button', { name: 'New project' }).click();
  await page.getByLabel('Project name').fill('Release tracker');
  await page.getByLabel('Description').fill('Coordinates the next Small Software release.');
  await page.getByRole('button', { name: 'Create project' }).click();
  await expect(page.getByText('Release tracker')).toBeVisible();

  await page.getByLabel('Sign out').click();
  await expect(page).toHaveURL(/\/sign-in$/);
  await page.getByLabel('Email address').fill(primary.email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in →' }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  const otherTenant = await createSecondTenant(browser);
  const forbidden = await page.request.get(`/api/projects?organization=${otherTenant.organizationId}`);
  expect(forbidden.status()).toBe(403);
  await expect(forbidden.json()).resolves.toEqual({ error: 'The organization is not accessible.' });
});
