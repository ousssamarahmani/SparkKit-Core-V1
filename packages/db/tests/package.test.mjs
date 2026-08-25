import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the database package exposes documented Prisma workflows', async () => {
  const packageJson = JSON.parse(await read('package.json'));

  assert.equal(packageJson.name, '@sparkkit/db');
  assert.equal(packageJson.scripts['db:generate'], 'prisma generate');
  assert.equal(packageJson.scripts['db:migrate:dev'], 'prisma migrate dev');
  assert.equal(
    packageJson.scripts['db:migrate:diff'],
    'prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script',
  );
  assert.equal(packageJson.scripts['db:migrate:deploy'], 'prisma migrate deploy');
  assert.equal(packageJson.scripts['db:seed'], 'prisma generate && prisma db seed');
});

test('the seed defines two deterministic tenants and uses idempotent upserts', async () => {
  const [config, seed] = await Promise.all([
    read('prisma.config.ts'),
    read('prisma/seed.ts'),
  ]);

  assert.match(config, /seed: 'tsx prisma\/seed\.ts'/);
  assert.match(seed, /11111111-1111-4111-8111-111111111111/);
  assert.match(seed, /22222222-2222-4222-8222-222222222222/);
  assert.equal((seed.match(/organization\.upsert/g) ?? []).length, 1);
  assert.equal((seed.match(/membership\.upsert/g) ?? []).length, 1);
  assert.match(seed, /for \(const fixture of fixtures\)/);
  assert.doesNotMatch(seed, /\.create\s*\(/);
});

test('the initial database boundary targets PostgreSQL', async () => {
  const [schema, client] = await Promise.all([
    read('prisma/schema.prisma'),
    read('src/index.ts'),
  ]);

  assert.match(schema, /provider\s*=\s*"postgresql"/);
  assert.match(schema, /provider\s*=\s*"prisma-client"/);
  assert.match(client, /new PrismaPg/);
  assert.match(client, /new PrismaClient/);
});

test('users, organizations, and memberships enforce tenancy constraints', async () => {
  const schema = await read('prisma/schema.prisma');

  assert.match(schema, /enum MembershipRole\s*{\s*OWNER\s*ADMIN\s*MEMBER\s*}/s);
  assert.match(schema, /model User\s*{/);
  assert.match(schema, /email\s+String\s+@unique/);
  assert.match(schema, /model Organization\s*{/);
  assert.match(schema, /slug\s+String\s+@unique/);
  assert.match(schema, /model Membership\s*{/);
  assert.match(schema, /role\s+MembershipRole\s+@default\(MEMBER\)/);
  assert.match(schema, /@@unique\(\[organizationId, userId\]\)/);
  assert.match(schema, /onDelete: Cascade/g);
});

test('the initial migration preserves role and membership constraints', async () => {
  const migration = await read(
    'prisma/migrations/20260825120000_model_users_organizations_memberships/migration.sql',
  );

  assert.match(
    migration,
    /CREATE TYPE "MembershipRole" AS ENUM \('OWNER', 'ADMIN', 'MEMBER'\)/,
  );
  assert.match(
    migration,
    /CREATE UNIQUE INDEX "Membership_organizationId_userId_key"/,
  );
  assert.match(migration, /ON DELETE CASCADE ON UPDATE CASCADE/g);
});
