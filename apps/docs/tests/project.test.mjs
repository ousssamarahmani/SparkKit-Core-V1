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
  assert.match(source, /Built with agents/);
  assert.match(source, /Designed for humans and agents/);
  assert.match(source, /open application foundation for software built with AI coding agents/i);
  assert.match(source, /Open source · Agent-native · Cloud optional/);
  assert.match(source, /Private app generator &amp; setup options/);
  assert.match(source, /Application foundation/);
  assert.match(source, /Agent-native development/);
  assert.match(source, /Application runtime/);
  assert.match(source, /ALLOW · DENY · REQUIRE_APPROVAL/);
  assert.match(source, /MCP connects services later/);
  assert.match(source, /runtime agents and MCP are product direction, not released capabilities/i);
  assert.match(source, /AWS and Kubernetes are deployment targets, not SparkKit requirements/i);
  assert.match(source, /Software developers/);
  assert.match(source, /AI developers & agents/);
  assert.match(source, /Local setup, step by step/);
  assert.match(source, /project CRUD and browser smoke tests work/i);
  assert.match(source, /Open Workspace/);
  assert.match(source, /Build with SparkKit\. Run it on Sparkbase\./);
});

test('page metadata does not claim production readiness', async () => {
  const html = await read('index.html');
  assert.match(html, /open application foundation/i);
  assert.match(html, /Built with agents\. Designed for humans and agents\./);
  assert.doesNotMatch(html, /production.ready|20k|21,840|100% operational/i);
});
