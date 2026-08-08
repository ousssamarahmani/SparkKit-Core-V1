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
});

test('the initial database boundary targets PostgreSQL', async () => {
  const [schema, client] = await Promise.all([
    read('prisma/schema.prisma'),
    read('src/index.ts'),
  ]);

  assert.match(schema, /provider = "postgresql"/);
  assert.match(schema, /provider = "prisma-client"/);
  assert.match(client, /new PrismaPg/);
  assert.match(client, /new PrismaClient/);
});
