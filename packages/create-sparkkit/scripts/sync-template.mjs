import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const repositoryRoot = path.resolve(packageRoot, '../..');
const templateRoot = path.join(packageRoot, 'template');

const copiedDirectories = [
  'apps/web',
  'packages/db',
  'tooling/eslint',
  'tooling/typescript',
];

const copiedRootFiles = [
  '.env.example',
  '.gitignore',
  'LICENSE',
  'compose.yaml',
  'pnpm-workspace.yaml',
  'turbo.json',
];

const excludedNames = new Set([
  '.next',
  'coverage',
  'dist',
  'e2e',
  'generated',
  'node_modules',
  'playwright-report',
  'test-results',
]);

function includeTemplateEntry(source) {
  const name = path.basename(source);
  if (excludedNames.has(name) || name.endsWith('.tsbuildinfo')) {
    return false;
  }

  if (name.startsWith('.env') && name !== '.env.example') {
    return false;
  }

  return true;
}

const rootPackage = {
  name: '{{PROJECT_NAME}}',
  version: '0.1.0',
  private: true,
  description: 'A portable SaaS application generated with SparkKit.',
  workspaces: ['apps/*', 'packages/*', 'tooling/*'],
  scripts: {
    dev: 'turbo run dev --parallel',
    build: 'turbo run build',
    clean: 'turbo run clean',
    lint: 'turbo run lint',
    typecheck: 'pnpm --filter @sparkkit/db db:generate && turbo run typecheck',
    test: 'turbo run test',
    check: 'pnpm lint && pnpm typecheck && pnpm test && pnpm build',
    'db:down': 'docker compose down',
    'db:logs': 'docker compose logs --follow postgres',
    'db:up': 'docker compose up --detach --wait postgres',
    'dev:web': 'pnpm --filter @sparkkit/web dev',
  },
  devDependencies: {
    turbo: '^2.5.8',
    typescript: '^5.9.3',
  },
  engines: {
    node: '>=24 <27',
  },
  packageManager: 'pnpm@11.9.0',
};

const templateReadme = `# {{PROJECT_NAME}}

A portable SaaS starter generated with [SparkKit](https://github.com/ousssamarahmani/SparkKit-Core-V1).

## Included

- Next.js and TypeScript application shell
- Email/password authentication with Better Auth
- Organizations, memberships, and role-based authorization
- Tenant-safe project CRUD
- PostgreSQL, Prisma migrations, and deterministic seed data
- Docker Compose development database
- ESLint, type checking, integration tests, and production builds

## Requirements

- Node.js 24 or 26
- {{PACKAGE_MANAGER}} (current stable release)
- Docker Desktop or another PostgreSQL 17 instance

## Start locally

\`\`\`powershell
Copy-Item .env.example .env
Copy-Item apps/web/.env.example apps/web/.env.local
{{PACKAGE_MANAGER}} install
{{PACKAGE_MANAGER}} run db:up
{{PACKAGE_MANAGER}} run db:migrate
{{PACKAGE_MANAGER}} run db:seed
{{PACKAGE_MANAGER}} run dev:web
\`\`\`

Open [http://localhost:3001](http://localhost:3001).

Replace \`BETTER_AUTH_SECRET\` in both environment files before using the application outside local development. Never commit real secrets.

## Verify

\`\`\`powershell
{{PACKAGE_MANAGER}} run check
\`\`\`

## Database lifecycle

\`\`\`powershell
{{PACKAGE_MANAGER}} run db:logs
{{PACKAGE_MANAGER}} run db:down
\`\`\`

The generated application is yours to modify and deploy under the Apache-2.0 license.
`;

await rm(templateRoot, { recursive: true, force: true });
await mkdir(templateRoot, { recursive: true });

for (const relativePath of copiedDirectories) {
  await cp(
    path.join(repositoryRoot, relativePath),
    path.join(templateRoot, relativePath),
    { recursive: true, filter: includeTemplateEntry },
  );
}

for (const relativePath of copiedRootFiles) {
  await cp(path.join(repositoryRoot, relativePath), path.join(templateRoot, relativePath));
}

await writeFile(
  path.join(templateRoot, 'package.json'),
  `${JSON.stringify(rootPackage, null, 2)}\n`,
);
await writeFile(path.join(templateRoot, 'README.md'), templateReadme);

const composePath = path.join(templateRoot, 'compose.yaml');
const compose = await readFile(composePath, 'utf8');
await writeFile(composePath, compose.replace(/^name: sparkkit$/m, 'name: {{PROJECT_NAME}}'));
