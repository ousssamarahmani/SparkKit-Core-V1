import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getAuthEnvironment,
  isTrustedRequestOrigin,
} from '../lib/auth-environment.js';

const productionSecret = 'production-test-secret-at-least-32-characters';

test('production auth configuration requires HTTPS and a strong secret', () => {
  assert.throws(
    () =>
      getAuthEnvironment({
        NODE_ENV: 'production',
        BETTER_AUTH_URL: 'http://example.com',
        BETTER_AUTH_SECRET: productionSecret,
      }),
    /HTTPS/,
  );
  assert.throws(
    () =>
      getAuthEnvironment({
        NODE_ENV: 'production',
        BETTER_AUTH_URL: 'https://example.com',
        BETTER_AUTH_SECRET: 'too-short',
      }),
    /at least 32 characters/,
  );
});

test('trusted origins are normalized and enforced exactly', () => {
  const environment = getAuthEnvironment({
    NODE_ENV: 'production',
    BETTER_AUTH_URL: 'https://app.example.com',
    BETTER_AUTH_SECRET: productionSecret,
    BETTER_AUTH_TRUSTED_ORIGINS: 'https://admin.example.com',
  });

  assert.deepEqual(environment.trustedOrigins, [
    'https://app.example.com',
    'https://admin.example.com',
  ]);
  assert.equal(
    isTrustedRequestOrigin(
      new Request('https://app.example.com/api/example', {
        headers: { origin: 'https://admin.example.com' },
      }),
      environment.trustedOrigins,
    ),
    true,
  );
  assert.equal(
    isTrustedRequestOrigin(
      new Request('https://app.example.com/api/example', {
        headers: { origin: 'https://attacker.example' },
      }),
      environment.trustedOrigins,
    ),
    false,
  );
});
