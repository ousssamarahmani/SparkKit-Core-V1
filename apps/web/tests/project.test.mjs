import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the reference application identifies its current milestone", async () => {
  const page = await read("app/page.tsx");

  assert.match(page, /reference application starts here/i);
  assert.match(page, /Milestone 0\.2/);
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
