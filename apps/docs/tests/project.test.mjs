import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the public entry renders the current SparkKit site', async () => {
  const entry = await read('src/main.tsx');
  assert.match(entry, /SparkKitSite/);
  assert.doesNotMatch(entry, /HonestSite/);
});

test('the public site labels unreleased capabilities honestly', async () => {
  const source = await read('src/SparkKitSite.tsx');
  assert.match(source, /aria-label="SparkKit"/);
  assert.match(source, /for Small Software &amp; AI apps/);
  assert.match(source, /with developers or AI agents/);
  assert.match(source, /planned, not released/i);
  assert.match(source, /AWS and Kubernetes are deployment targets, not SparkKit requirements/i);
  assert.match(source, /Software developers/);
  assert.match(source, /AI developers & agents/);
  assert.match(source, /Local setup, step by step/);
  assert.match(source, /email\/password sessions, organization onboarding, responsive application shell/i);
  assert.match(source, /tenant-owned project workflows work today/i);
  assert.match(source, /tenant-owned project CRUD work/i);
  assert.match(source, /Open Workspace/);
  assert.match(source, /Build with SparkKit\. Run it on Sparkbase\./);
});

test('page metadata does not claim production readiness', async () => {
  const html = await read('index.html');
  assert.match(html, /open-source foundation/i);
  assert.doesNotMatch(html, /production.ready|20k|21,840|100% operational/i);
});
