import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);

assert.equal(packageJson.name, 'create-sparkkit');
assert.match(packageJson.version, /^\d+\.\d+\.\d+$/);
assert.equal(packageJson.license, 'Apache-2.0');
assert.equal(packageJson.bin['create-sparkkit'], './dist/cli.js');
assert.equal(packageJson.publishConfig.access, 'public');
assert.match(
  await readFile(new URL('../dist/cli.js', import.meta.url), 'utf8'),
  /^#!\/usr\/bin\/env node/,
  'CLI output must preserve its executable shebang',
);

const command = process.platform === 'win32'
  ? [process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', 'npm pack --dry-run --json --ignore-scripts']]
  : ['npm', ['pack', '--dry-run', '--json', '--ignore-scripts']];
const { stdout } = await execFileAsync(command[0], command[1], {
  cwd: packageRoot,
  maxBuffer: 10 * 1024 * 1024,
});
const [manifest] = JSON.parse(stdout);
const files = new Set(manifest.files.map(({ path }) => path.replaceAll('\\', '/')));

for (const required of [
  'LICENSE',
  'README.md',
  'package.json',
  'dist/cli.js',
  'dist/index.js',
  'dist/index.d.ts',
  'template/package.json',
  'template/apps/web/package.json',
  'template/packages/db/prisma/schema.prisma',
]) {
  assert.ok(files.has(required), `npm package is missing ${required}`);
}

for (const file of files) {
  assert.doesNotMatch(file, /(^|\/)node_modules\//, `package contains ${file}`);
  assert.doesNotMatch(file, /(^|\/)repository\.test\.mjs$/, `package contains ${file}`);
  assert.doesNotMatch(file, /(^|\/)\.env\.local$/, `package contains ${file}`);
  assert.doesNotMatch(file, /(^|\/)\.next\//, `package contains ${file}`);
}

assert.ok(manifest.entryCount > 0, 'npm package is empty');
process.stdout.write(
  `Verified ${manifest.name}@${manifest.version}: ${manifest.entryCount} files, ${manifest.size} bytes packed.\n`,
);
