import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the reference application identifies its current milestone", async () => {
  const page = await read("app/page.tsx");

  assert.match(page, /reference application starts here/i);
  assert.match(page, /Milestone 0\.2/);
});
