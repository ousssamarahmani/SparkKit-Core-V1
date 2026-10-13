import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const readRoot = (path) => readFile(new URL(`../../../${path}`, import.meta.url), "utf8");

test("the M3.4 browser smoke workflow is installed and enforced in the SparkKit repository", async () => {
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
