import assert from 'node:assert/strict';
import test from 'node:test';

import { auth } from '../lib/auth.js';

function signInRequest(origin: string) {
  return auth.handler(
    new Request('http://localhost:3001/api/auth/sign-in/email', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin,
      },
      body: JSON.stringify({
        email: 'rate-limit-test@example.com',
        password: 'not-the-right-password',
      }),
    }),
  );
}

test('an untrusted browser origin is rejected', async () => {
  const response = await signInRequest('https://attacker.example');
  assert.equal(response.status, 403);
});

test('repeated password sign-in attempts are rate limited', async () => {
  const responses = [];

  for (let attempt = 0; attempt < 6; attempt += 1) {
    responses.push(await signInRequest('http://localhost:3001'));
  }

  assert.equal(responses.at(-1)?.status, 429);
});
