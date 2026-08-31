import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BETTER_AUTH_URL ?? 'http://localhost:3001';

export default defineConfig({
  testDir: './apps/web/e2e',
  expect: {
    timeout: 15_000,
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm dev:web',
    url: `${baseURL}/sign-in`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { ...process.env, BETTER_AUTH_URL: baseURL },
  },
});
