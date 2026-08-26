import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from './generated/prisma/client.js';

export {
  createTenantDatabase,
  TenantAccessError,
} from './tenant.js';
export type {
  CreateTenantProjectInput,
  TenantDatabase,
  TenantContext,
  UpdateTenantProjectInput,
} from './tenant.js';

export type DatabaseClient = PrismaClient;

export function createDatabaseClient(connectionString: string): PrismaClient {
  if (connectionString.trim().length === 0) {
    throw new Error('A PostgreSQL connection string is required.');
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}
