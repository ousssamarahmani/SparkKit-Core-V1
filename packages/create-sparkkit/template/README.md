# {{PROJECT_NAME}}

A portable SaaS starter generated with [SparkKit](https://github.com/ousssamarahmani/SparkKit-Core-V1).

## Included

- Next.js and TypeScript application shell
- Email/password authentication with Better Auth
- Organizations, memberships, and role-based authorization
- Tenant-safe project CRUD
- PostgreSQL, Prisma migrations, and deterministic seed data
- Docker Compose development database
- ESLint, type checking, integration tests, and production builds

## Requirements

- Node.js 24 or 26
- pnpm 11
- Docker Desktop or another PostgreSQL 17 instance

## Start locally

```powershell
Copy-Item .env.example .env
Copy-Item apps/web/.env.example apps/web/.env.local
pnpm install
pnpm db:up
pnpm --filter @sparkkit/db db:migrate:deploy
pnpm --filter @sparkkit/db db:seed
pnpm dev:web
```

Open [http://localhost:3001](http://localhost:3001).

Replace `BETTER_AUTH_SECRET` in both environment files before using the application outside local development. Never commit real secrets.

## Verify

```powershell
pnpm check
```

## Database lifecycle

```powershell
pnpm db:logs
pnpm db:down
```

The generated application is yours to modify and deploy under the Apache-2.0 license.
