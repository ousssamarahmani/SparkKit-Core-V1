import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const requiredFiles = [
  'LICENSE',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  '.github/ISSUE_TEMPLATE/bug_report.yml',
  '.github/ISSUE_TEMPLATE/feature_request.yml',
  '.github/ISSUE_TEMPLATE/documentation.yml',
  'CHANGELOG.md',
  'GOVERNANCE.md',
  '.github/ISSUE_TEMPLATE/config.yml',
  '.github/PULL_REQUEST_TEMPLATE.md',
];

test('required open-source community files exist', async () => {
  await Promise.all(requiredFiles.map((path) => access(path)));
});

test('the license is Apache-2.0 and community reporting routes are explicit', async () => {
  const [license, contributing, conduct, security, issueConfig, pullRequest] = await Promise.all([
    readFile('LICENSE', 'utf8'),
    readFile('CONTRIBUTING.md', 'utf8'),
    readFile('CODE_OF_CONDUCT.md', 'utf8'),
    readFile('SECURITY.md', 'utf8'),
    readFile('.github/ISSUE_TEMPLATE/config.yml', 'utf8'),
    readFile('.github/PULL_REQUEST_TEMPLATE.md', 'utf8'),
  ]);

  assert.match(license, /Apache License/);
  assert.match(contributing, /pnpm install --frozen-lockfile/);
  assert.match(conduct, /harassment-free community/i);
  assert.match(security, /Do not open a public issue/i);
  assert.match(issueConfig, /blank_issues_enabled: false/);
  assert.match(issueConfig, /github\.com\/ousssamarahmani\/SparkKit-Core-V1\/security/);
  assert.match(pullRequest, /pnpm lint/);
  assert.match(pullRequest, /No secrets, credentials, personal data/);
});

test('local PostgreSQL has a persistent and health-checked Compose profile', async () => {
  const [compose, packageJson] = await Promise.all([
    readFile('compose.yaml', 'utf8'),
    readFile('package.json', 'utf8').then(JSON.parse),
  ]);

  assert.match(compose, /postgres:\s*\n\s*image: postgres:17-alpine/);
  assert.match(compose, /127\.0\.0\.1:5432:5432/);
  assert.match(compose, /pg_isready -U sparkkit -d sparkkit/);
  assert.match(compose, /sparkkit-postgres:\s*$/m);
  assert.equal(
    packageJson.scripts['db:up'],
    'docker compose up --detach --wait postgres',
  );
  assert.equal(packageJson.scripts['db:down'], 'docker compose down');
});
