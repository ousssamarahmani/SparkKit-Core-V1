import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { database } from './database';
import { getAuthEnvironment } from './auth-environment';

const authEnvironment = getAuthEnvironment();

export const auth = betterAuth({
  appName: 'SparkKit',
  baseURL: authEnvironment.baseURL,
  secret: authEnvironment.secret,
  trustedOrigins: authEnvironment.trustedOrigins,
  database: prismaAdapter(database, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    enabled: true,
    storage: 'memory',
    window: 60,
    max: 100,
    customRules: {
      '/sign-in/email': { window: 60, max: 5 },
      '/sign-up/email': { window: 60, max: 5 },
    },
  },
  advanced: {
    cookiePrefix: 'sparkkit',
    useSecureCookies: authEnvironment.isProduction,
    disableCSRFCheck: false,
    disableOriginCheck: false,
    crossSubDomainCookies: { enabled: false },
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: 'lax',
      secure: authEnvironment.isProduction,
      path: '/',
    },
    database: {
      generateId: 'uuid',
    },
  },
});
