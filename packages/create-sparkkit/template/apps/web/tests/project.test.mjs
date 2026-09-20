import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const readRoot = (path) => readFile(new URL(`../../../${path}`, import.meta.url), "utf8");

test("the reference application routes users into the authenticated shell", async () => {
  const page = await read("app/page.tsx");

  assert.match(page, /redirect\('\/dashboard'\)/);
});

test("the web application exposes Better Auth through the Next.js route", async () => {
  const [auth, client, route, packageJson] = await Promise.all([
    read("lib/auth.ts"),
    read("lib/auth-client.ts"),
    read("app/api/auth/[...all]/route.ts"),
    read("package.json").then(JSON.parse),
  ]);

  assert.match(auth, /emailAndPassword:\s*{\s*enabled: true/s);
  assert.match(auth, /prismaAdapter/);
  assert.match(client, /createAuthClient/);
  assert.match(route, /toNextJsHandler\(auth\)/);
  assert.equal(packageJson.dependencies["better-auth"], "1.7.1");
});

test("organization onboarding is exposed through an authenticated API route", async () => {
  const route = await read("app/api/organizations/route.ts");

  assert.match(route, /auth\.api\.getSession/);
  assert.match(route, /createOrganizationForUser/);
  assert.match(route, /status: 401/);
  assert.match(route, /status: 201/);
});

test("authentication keeps CSRF checks, secure production cookies, and rate limits enabled", async () => {
  const [auth, environment] = await Promise.all([
    read("lib/auth.ts"),
    read("lib/auth-environment.ts"),
  ]);

  assert.match(auth, /disableCSRFCheck: false/);
  assert.match(auth, /disableOriginCheck: false/);
  assert.match(auth, /useSecureCookies: authEnvironment\.isProduction/);
  assert.match(auth, /sameSite: 'lax'/);
  assert.match(auth, /rateLimit:\s*{\s*enabled: true/s);
  assert.match(environment, /must use HTTPS outside local loopback environments/);
});

test("the responsive application shell includes every M3.1 screen", async () => {
  const [layout, signIn, onboarding, dashboard, settings, shell, styles] = await Promise.all([
    read("app/layout.tsx"),
    read("app/sign-in/page.tsx"),
    read("app/onboarding/page.tsx"),
    read("app/dashboard/page.tsx"),
    read("app/settings/page.tsx"),
    read("components/app-shell.tsx"),
    read("app/styles.css"),
  ]);

  assert.match(layout, /<html lang="en" suppressHydrationWarning>/);
  assert.match(signIn, /authClient\.signIn\.email/);
  assert.match(signIn, /authClient\.signUp\.email/);
  assert.match(onboarding, /fetch\('\/api\/organizations'/);
  assert.match(dashboard, /requireWorkspace/);
  assert.match(settings, /Members & roles/);
  assert.match(shell, /organization-picker/);
  assert.match(shell, /authClient\.signOut/);
  assert.match(shell, /SparkKit Project/);
  assert.match(shell, /NEXT_PUBLIC_PROJECT_URL/);
  assert.match(styles, /@media \(max-width: 850px\)/);
});

test("tenant-owned project CRUD is wired through the authorized data boundary", async () => {
  const [collection, detail, manager, dashboard] = await Promise.all([
    read("app/api/projects/route.ts"),
    read("app/api/projects/[projectId]/route.ts"),
    read("components/project-manager.tsx"),
    read("app/dashboard/page.tsx"),
  ]);

  assert.match(collection, /tenant\.listProjects/);
  assert.match(collection, /tenant\.createProject/);
  assert.match(detail, /tenant\.updateProject/);
  assert.match(detail, /tenant\.deleteProject/);
  assert.match(manager, /Create a project/);
  assert.match(manager, /Delete/);
  assert.match(dashboard, /createTenantDatabase/);
});

test("workspace states cover loading, empty, unauthorized, validation, and unexpected failures", async () => {
  const [dashboard, loading, boundary, manager, styles] = await Promise.all([
    read("app/dashboard/page.tsx"),
    read("app/dashboard/loading.tsx"),
    read("app/dashboard/error.tsx"),
    read("components/project-manager.tsx"),
    read("app/styles.css"),
  ]);

  assert.match(loading, /aria-busy="true"/);
  assert.match(loading, /Loading your SparkKit workspace/);
  assert.match(manager, /Create your first small software project/);
  assert.match(dashboard, /Access denied/);
  assert.match(dashboard, /do not have membership/);
  assert.match(manager, /Enter a project name/);
  assert.match(manager, /could not reach the workspace service/);
  assert.match(boundary, /Unexpected error/);
  assert.match(boundary, /Try again/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("the M3.4 browser smoke workflow is installed and enforced in CI", async () => {
  const [workflow, config, ci, packageJson] = await Promise.all([
    read("e2e/workspace.spec.ts"),
    readRoot("playwright.config.ts"),
    readRoot(".github/workflows/ci.yml"),
    readRoot("package.json").then(JSON.parse),
  ]);

  assert.equal(packageJson.scripts.e2e, "playwright test");
  assert.match(config, /testDir: '\.\/apps\/web\/e2e'/);
  assert.match(workflow, /registerAndOnboard/);
  assert.match(workflow, /picker\.selectOption/);
  assert.match(workflow, /forbidden\.status\(\)\)\.toBe\(403\)/);
  assert.match(ci, /playwright install --with-deps chromium/);
  assert.match(ci, /run: pnpm e2e/);
});
