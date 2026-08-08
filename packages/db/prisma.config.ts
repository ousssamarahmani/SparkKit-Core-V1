import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const developmentDatabaseUrl =
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? developmentDatabaseUrl,
  },
});
