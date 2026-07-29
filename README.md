# SparkKit

SparkKit is a planned open-source starter toolkit for building SaaS and AI applications.

## Current status

SparkKit now has a pnpm/Turborepo foundation. The public React website remains a **product concept and interactive prototype**, while a minimal Next.js reference application establishes the boundary for implementation. The CLI, backend packages, database layer, authentication, billing, and AI integrations are still planned work.

## Workspace

```text
apps/
  docs/  # Public concept site (Vite, port 3000)
  web/   # Next.js reference application (port 3001)
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

## Planning documents

- [Architecture](./ARCHITECTURE.md) — target system design, boundaries, security rules, and decisions.
- [Tasks](./TASKS.md) — prioritized backlog with acceptance criteria.
- [Implementation plan](./IMPLEMENTATION.md) — recommended build sequence and release gates.

## Community

- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
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

