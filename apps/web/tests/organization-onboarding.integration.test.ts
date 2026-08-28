import assert from 'node:assert/strict';
import test from 'node:test';

import { createDatabaseClient } from '@sparkkit/db';
import { POST } from '../app/api/organizations/route.js';
import { auth } from '../lib/auth.js';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';
const database = createDatabaseClient(databaseUrl);
const unique = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const email = `m2-2-${unique}@example.com`;
const slug = `m2-2-${unique}`;

function sessionCookie(response: Response): string {
  const setCookie = response.headers.get('set-cookie');
  assert.ok(setCookie);
  return setCookie.split(';', 1)[0];
}

test.after(async () => {
  await database.organization.deleteMany({ where: { slug } });
  await database.user.deleteMany({ where: { email } });
  await database.$disconnect();
});

test('a new authenticated user creates an organization and becomes its owner', async () => {
  const registration = await auth.handler(
    new Request('http://localhost:3001/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:3001',
      },
      body: JSON.stringify({
        name: 'Organization Owner',
        email,
        password: 'SparkKit-test-password-123!',
      }),
    }),
  );
  assert.equal(registration.status, 200);

  const response = await POST(
    new Request('http://localhost:3001/api/organizations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: sessionCookie(registration),
        origin: 'http://localhost:3001',
      },
      body: JSON.stringify({ name: 'M2.2 Test Organization', slug }),
    }),
  );

  assert.equal(response.status, 201);
  const result = await response.json();
  assert.equal(result.organization.slug, slug);
  assert.equal(result.membership.role, 'OWNER');

  const membership = await database.membership.findUnique({
    where: {
      organizationId_userId: {
        organizationId: result.organization.id,
        userId: result.membership.userId,
      },
    },
  });
  assert.equal(membership?.role, 'OWNER');
});

test('organization creation rejects unauthenticated requests', async () => {
  const response = await POST(
    new Request('http://localhost:3001/api/organizations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:3001',
      },
      body: JSON.stringify({ name: 'Unauthorized Organization' }),
    }),
  );

  assert.equal(response.status, 401);
});
