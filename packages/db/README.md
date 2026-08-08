# `@sparkkit/db`

SparkKit's server-only PostgreSQL boundary. It owns the Prisma schema,
migrations, generated client, and database connection lifecycle. HTTP, UI, and
authorization logic do not belong in this package.

## Commands

Run these commands from the repository root:

```powershell
pnpm --filter @sparkkit/db db:format
pnpm --filter @sparkkit/db db:validate
pnpm --filter @sparkkit/db db:generate
pnpm --filter @sparkkit/db db:migrate:diff
```

The diff command generates the SQL represented by the current schema without
connecting to a database. After local PostgreSQL is introduced in M1.3, create
and apply development migrations with:

```powershell
pnpm --filter @sparkkit/db db:migrate:dev --name <migration-name>
```

Apply committed migrations in CI or production with:

```powershell
pnpm --filter @sparkkit/db db:migrate:deploy
```

`DATABASE_URL` is server-only. The documented local default is intended only
for the Docker development profile that will be added in M1.3.
