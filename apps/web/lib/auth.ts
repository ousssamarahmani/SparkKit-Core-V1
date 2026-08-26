import { createDatabaseClient } from '@sparkkit/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';

const developmentSecret =
  'sparkkit-local-development-secret-change-before-production';

function getAuthSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;

  if (secret !== undefined && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('BETTER_AUTH_SECRET must contain at least 32 characters.');
  }

  return developmentSecret;
}

export const auth = betterAuth({
  appName: 'SparkKit',
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3001',
  secret: getAuthSecret(),
  database: prismaAdapter(createDatabaseClient(databaseUrl), {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: 'sparkkit',
    database: {
      generateId: 'uuid',
    },
  },
});
