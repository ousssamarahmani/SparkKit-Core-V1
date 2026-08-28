import assert from 'node:assert/strict';
import test from 'node:test';

import { createDatabaseClient } from '@sparkkit/db';
import { auth } from '../lib/auth.js';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';
const email = `m2-1-${Date.now()}@example.com`;
const password = 'SparkKit-test-password-123!';
const database = createDatabaseClient(databaseUrl);

function request(path: string, init?: RequestInit) {
  return auth.handler(
    new Request(`http://localhost:3001/api/auth${path}`, init),
  );
}

function sessionCookie(response: Response): string {
  const setCookie = response.headers.get('set-cookie');
  assert.ok(setCookie, 'the auth response should set a session cookie');
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Lax/i);
  return setCookie.split(';', 1)[0];
}

test.after(async () => {
  await database.user.deleteMany({ where: { email } });
  await database.$disconnect();
});

test('email/password registration, session restoration, sign-out, and sign-in work', async () => {
  await database.user.deleteMany({ where: { email } });

  const registration = await request('/sign-up/email', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'M2.1 Test User', email, password }),
  });
  assert.equal(registration.status, 200);
  const registrationCookie = sessionCookie(registration);

  const restoredSession = await request('/get-session', {
    headers: { cookie: registrationCookie },
  });
  assert.equal(restoredSession.status, 200);
  assert.equal((await restoredSession.json()).user.email, email);

  const signOut = await request('/sign-out', {
    method: 'POST',
    headers: {
      cookie: registrationCookie,
      origin: 'http://localhost:3001',
    },
  });
  assert.equal(signOut.status, 200);

  const signedOutSession = await request('/get-session', {
    headers: { cookie: registrationCookie },
  });
  assert.equal(await signedOutSession.json(), null);

  const signIn = await request('/sign-in/email', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  assert.equal(signIn.status, 200);
  const signInCookie = sessionCookie(signIn);

  const signedInSession = await request('/get-session', {
    headers: { cookie: signInCookie },
  });
  assert.equal((await signedInSession.json()).user.email, email);
});
