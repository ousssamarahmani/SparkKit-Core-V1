# ADR 0002: Technology Stack

- Status: Accepted
- Date: 2026-07-27

## Decision

SparkKit will use:

| Area | Choice |
|---|---|
| Full-stack framework | Next.js 16 App Router |
| UI runtime | React 19 and TypeScript |
| Styling | Tailwind CSS and accessible component primitives |
| Package manager | pnpm 11 |
| Monorepo task runner | Turborepo |
| Supported runtime | Node.js 24 LTS |
| Database | PostgreSQL |
| ORM and migrations | Prisma |
| Authentication | Better Auth |
| Input validation | Zod |
| Unit and integration tests | Vitest |
| Browser tests | Playwright |
| First deployment profile | Docker |
| License | MIT |

## Rationale

Next.js 16 provides a stable App Router foundation and is directly supported by Better Auth. Node.js 24 is the current LTS baseline; unsupported Node.js releases will not be targeted. PostgreSQL and Prisma provide a clear relational model for organizations and tenant-owned records.

The existing Vite website remains a product and documentation prototype until it is moved into the monorepo as `apps/docs`. It is not the reference SaaS implementation.

## Constraints

- Provider SDKs and secrets remain server-only.
- AI is optional and accessed through a provider-neutral package boundary.
- Framework and dependency versions are reviewed before each minor release.
- Kubernetes and AWS are optional deployment targets, not core requirements.
