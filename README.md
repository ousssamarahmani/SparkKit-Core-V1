# SparkKit

**The open-source foundation for Small Software and AI-powered applications.**

## Current status

SparkKit is an early-stage implementation, not a released starter. The
pnpm/Turborepo foundation, public documentation site, Next.js reference shell,
and Prisma database package work today. The `create-sparkkit` CLI,
authentication flow, complete SaaS template, and deployment profiles remain
roadmap items.

## Workspace

```text
apps/
  docs/  # Public concept site (Vite, port 3000)
  web/   # Next.js reference application (port 3001)
packages/
  db/    # Prisma schema, generated client, and migration workflow
tooling/
  eslint/      # Shared base, React, and Next.js lint rules
  typescript/  # Shared strict TypeScript baseline
```

```powershell
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Run the repository

Run the public site:

```powershell
pnpm dev:docs
```

The SparkKit site runs at `http://localhost:3000`. Run the complete repository
verification gate with `pnpm check`.

## Planning documents

- [Architecture](./ARCHITECTURE.md) — target system design, boundaries, security rules, and decisions.
- [Tasks](./TASKS.md) — prioritized backlog with acceptance criteria.
- [Implementation plan](./IMPLEMENTATION.md) — recommended build sequence and release gates.

## Community

- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Open-source growth](./docs/OPEN_SOURCE_GROWTH.md) - product gates, examples, community operations, distribution, and evidence-based metrics.
- [Security Policy](./SECURITY.md)
- [Support](./.github/SUPPORT.md)

## Initial product goal

The first usable release will provide:

1. A working `create-sparkkit` CLI.
2. One maintained SaaS starter template.
3. Authentication and organization-based multi-tenancy.
4. PostgreSQL persistence through Prisma.
5. An optional server-side AI chat feature.
6. Tests, CI, Docker support, and clear documentation.

Additional templates, billing, RAG, and agent orchestration are later milestones.


## Why SparkKit

AI agents and developers can create purpose-built software faster than ever,
but turning that code into something secure, maintainable, and shareable still
requires repetitive infrastructure work.

SparkKit focuses on **Small Software**: internal tools, team utilities, personal
AI tools, operational dashboards, workflow applications, and focused SaaS
products built for one person or a small group.

SparkKit is not intended to be another fixed boilerplate or another cloud
provider. Its goal is to become a maintained foundation that:

- works for developers and coding agents;
- produces code the developer owns;
- runs locally and can deploy to different infrastructure;
- keeps integrations replaceable through package boundaries;
- treats authentication, tenant isolation, testing, and documentation as core
  product behavior.

## Target developer experience

The version 0.1 goal is:

```powershell
npx create-sparkkit my-app
cd my-app
pnpm dev
```

This CLI workflow is **planned and not published yet**. It will not be presented
as available until a generated project installs, tests, builds, and starts from
a clean machine.

## SparkKit and Sparkbase

- **SparkKit** is the free, open-source developer toolkit.
- **Sparkbase Cloud** is the planned managed platform for deploying, securing,
  sharing, and operating Small Software.

SparkKit will remain useful without Sparkbase Cloud. The managed platform should
earn adoption through convenience, not lock-in.
