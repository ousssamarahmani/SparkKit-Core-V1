import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

import {
  createProjectDirectory,
  createSparkKitProject,
  parseCliArguments,
  ProjectNameError,
  ProjectTemplateError,
  ProjectTargetExistsError,
  setupSparkKitProject,
  validateProjectName,
} from '../dist/index.js';

const execFileAsync = promisify(execFile);
const cliPath = fileURLToPath(new URL('../dist/cli.js', import.meta.url));

test('accepts lowercase kebab-case project names', () => {
  assert.equal(validateProjectName('customer-portal'), 'customer-portal');
  assert.equal(validateProjectName('agent42'), 'agent42');
});

test('rejects unsafe names, paths, and Windows-reserved targets', () => {
  for (const name of ['', '.', '..', '../escape', 'nested/app', 'My App', 'my_app', 'con']) {
    assert.throws(() => validateProjectName(name), ProjectNameError);
  }
});

test('parses deterministic package-manager, install, and Git choices', () => {
  assert.deepEqual(
    parseCliArguments(['customer-portal', '--pm', 'npm', '--install', '--git']),
    {
      projectName: 'customer-portal',
      packageManager: 'npm',
      install: true,
      initializeGit: true,
    },
  );
  assert.deepEqual(parseCliArguments(['customer-portal']), {
    projectName: 'customer-portal',
    packageManager: 'pnpm',
    install: false,
    initializeGit: false,
  });
  assert.throws(() => parseCliArguments(['app', '--pm', 'unknown']), /Unsupported/);
  assert.throws(() => parseCliArguments(['app', '--install', '--no-install']), /only one/);
  assert.throws(() => parseCliArguments(['app', '--git', '--no-git']), /only one/);
  assert.throws(() => parseCliArguments(['app', '--mystery']), /Unknown option/);
});

test('creates a new target and refuses existing directories and files', async (t) => {
  const cwd = await mkdtemp(path.join(tmpdir(), 'create-sparkkit-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));

  assert.equal(await createProjectDirectory('new-app', cwd), path.join(cwd, 'new-app'));
  await assert.rejects(createProjectDirectory('new-app', cwd), ProjectTargetExistsError);

  await writeFile(path.join(cwd, 'existing-file'), 'keep me');
  await assert.rejects(
    createProjectDirectory('existing-file', cwd),
    ProjectTargetExistsError,
  );

  await mkdir(path.join(cwd, 'existing-directory'));
  await assert.rejects(
    createProjectDirectory('existing-directory', cwd),
    ProjectTargetExistsError,
  );
});

test('the command exits successfully only for a safe new target', async (t) => {
  const cwd = await mkdtemp(path.join(tmpdir(), 'create-sparkkit-cli-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));

  const created = await execFileAsync(
    process.execPath,
    [cliPath, 'demo-app', '--pm', 'npm', '--no-install', '--git'],
    { cwd },
  );
  assert.match(created.stdout, /Created .*demo-app/);
  assert.match(created.stdout, /npm install/);
  assert.match(created.stdout, /Initialized an empty Git repository/);
  await access(path.join(cwd, 'demo-app', 'apps', 'web', 'package.json'));
  await access(path.join(cwd, 'demo-app', '.git'));
  const generatedPackage = JSON.parse(
    await readFile(path.join(cwd, 'demo-app', 'package.json'), 'utf8'),
  );
  assert.equal(generatedPackage.packageManager, 'npm@11');
  assert.match(generatedPackage.scripts['db:migrate'], /^npm run/);

  await assert.rejects(
    execFileAsync(process.execPath, [cliPath, 'demo-app', '--no-install'], { cwd }),
    (error) => {
      assert.match(error.stderr, /Refusing to overwrite existing target/);
      return true;
    },
  );
});

test('runs only the optional setup commands that were selected', async () => {
  const commands = [];
  const runCommand = async (command, args, cwd) => {
    commands.push({ command, args, cwd });
  };

  await setupSparkKitProject('C:\\generated\\app', {
    packageManager: 'bun',
    install: true,
    initializeGit: true,
    runCommand,
  });
  assert.deepEqual(commands, [
    { command: 'bun', args: ['install'], cwd: 'C:\\generated\\app' },
    { command: 'git', args: ['init'], cwd: 'C:\\generated\\app' },
  ]);

  commands.length = 0;
  await setupSparkKitProject('C:\\generated\\app', { runCommand });
  assert.deepEqual(commands, []);
});

async function listFiles(directory, root = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath, root)));
    } else {
      files.push(path.relative(root, entryPath));
    }
  }

  return files;
}

test('generates a personalized portable SaaS template without local secrets', async (t) => {
  const cwd = await mkdtemp(path.join(tmpdir(), 'create-sparkkit-template-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));

  const target = await createSparkKitProject('customer-portal', { cwd });
  const packageJson = JSON.parse(await readFile(path.join(target, 'package.json'), 'utf8'));
  const readme = await readFile(path.join(target, 'README.md'), 'utf8');
  const compose = await readFile(path.join(target, 'compose.yaml'), 'utf8');
  const files = await listFiles(target);

  assert.equal(packageJson.name, 'customer-portal');
  assert.equal(packageJson.private, true);
  assert.match(readme, /^# customer-portal/m);
  assert.match(compose, /^name: customer-portal$/m);
  assert.ok(files.includes('apps\\web\\.env.example') || files.includes('apps/web/.env.example'));
  assert.ok(files.includes('packages\\db\\prisma\\schema.prisma') || files.includes('packages/db/prisma/schema.prisma'));
  assert.ok(!files.some((file) => /(^|[/\\])\.env$/.test(file)));
  assert.ok(!files.some((file) => /(^|[/\\])(node_modules|dist|\.next)([/\\]|$)/.test(file)));
  assert.ok(!files.some((file) => file.includes('generated')));

  const textFiles = files.filter((file) => /\.(?:example|js|json|md|mjs|prisma|sql|ts|tsx|yaml|yml)$/.test(file));
  const contents = await Promise.all(
    textFiles.map((file) => readFile(path.join(target, file), 'utf8')),
  );
  const combined = contents.join('\n');

  assert.doesNotMatch(combined, /{{PROJECT_NAME}}/);
  assert.doesNotMatch(combined, /\.SparkKit by Sparkbase Cloud/i);
  assert.doesNotMatch(combined, /(?:sk-|ghp_|github_pat_)[A-Za-z0-9_-]{20,}/);
});

test('personalizes generated instructions and workspace dependencies for npm', async (t) => {
  const cwd = await mkdtemp(path.join(tmpdir(), 'create-sparkkit-npm-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));

  const target = await createSparkKitProject('npm-workspace', {
    cwd,
    packageManager: 'npm',
  });
  const rootPackage = JSON.parse(await readFile(path.join(target, 'package.json'), 'utf8'));
  const webPackage = JSON.parse(
    await readFile(path.join(target, 'apps', 'web', 'package.json'), 'utf8'),
  );
  const readme = await readFile(path.join(target, 'README.md'), 'utf8');

  assert.equal(rootPackage.packageManager, 'npm@11');
  assert.deepEqual(rootPackage.workspaces, ['apps/*', 'packages/*', 'tooling/*']);
  assert.match(rootPackage.scripts.check, /^npm run lint/);
  assert.doesNotMatch(JSON.stringify(rootPackage.scripts), /pnpm/);
  assert.match(rootPackage.scripts.typecheck, /^npm run/);
  assert.equal(webPackage.dependencies['@sparkkit/db'], '0.0.0');
  assert.equal(webPackage.devDependencies['@sparkkit/eslint-config'], '0.0.0');
  assert.match(readme, /npm install/);
  assert.doesNotMatch(readme, /pnpm/);
});

test('removes a partial target when template generation fails', async (t) => {
  const cwd = await mkdtemp(path.join(tmpdir(), 'create-sparkkit-rollback-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));

  const target = path.join(cwd, 'broken-app');
  await assert.rejects(
    createSparkKitProject('broken-app', {
      cwd,
      templateDirectory: path.join(cwd, 'missing-template'),
    }),
    ProjectTemplateError,
  );
  await assert.rejects(access(target));
});
