import { createDatabaseClient } from '@sparkkit/db';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';

export const database = createDatabaseClient(databaseUrl);
