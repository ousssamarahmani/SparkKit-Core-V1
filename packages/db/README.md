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

Start the local PostgreSQL service and wait for its health check:

```powershell
pnpm db:up
```

The service binds only to `127.0.0.1:5432`, stores data in the named
`sparkkit-postgres` volume, and uses the development-only credentials from
`.env.example`. Stop it with `pnpm db:down`; add `--volumes` to the underlying
`docker compose down` command only when you intentionally want to erase local
database data.

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

Create or reconcile the deterministic development fixtures with:

```powershell
pnpm --filter @sparkkit/db db:seed
```

The seed is safe to rerun. It upserts two users, two organizations, and their
owner memberships using stable identifiers instead of creating duplicates.

`DATABASE_URL` is server-only. The documented local default is intended only
for the Docker development profile that will be added in M1.3.

## Tenancy model

The initial schema separates identity from organization access:

- `User` owns a unique email address.
- `Organization` owns a unique URL-safe slug.
- `Membership` joins one user to one organization with an `OWNER`, `ADMIN`, or
  `MEMBER` role.

PostgreSQL and Prisma enforce one membership per user and organization. Deleting
a user or organization cascades to its memberships so join records cannot become
orphaned. Application authorization must still verify the active membership on
every tenant-scoped operation; the schema constraint is a foundation, not a
replacement for authorization.

## Tenant-scoped access

Call `createTenantDatabase` with the authenticated user's ID and the active
organization ID before accessing organization-owned records. It verifies the
membership once and returns an API whose project reads and writes always include
the active `organizationId`.

```ts
const tenantDb = await createTenantDatabase(prisma, {
  userId: session.user.id,
  organizationId: session.activeOrganizationId,
});

const projects = await tenantDb.listProjects();
```

Do not expose the unrestricted Prisma client to request handlers. Client input
may select an organization, but the server must pair it with the authenticated
user ID and let the membership check establish the trusted tenant context.
