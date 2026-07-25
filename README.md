# SparkKit

SparkKit is a planned open-source starter toolkit for building SaaS and AI applications.

## Current status

The existing React application is a **product concept and interactive prototype**. The production toolkit, CLI, backend packages, database layer, authentication, billing, and AI integrations are planned work.

## Planning documents

- [Architecture](./ARCHITECTURE.md) — target system design, boundaries, security rules, and decisions.
- [Tasks](./TASKS.md) — prioritized backlog with acceptance criteria.
- [Implementation plan](./IMPLEMENTATION.md) — recommended build sequence and release gates.

## Initial product goal

The first usable release will provide:

1. A working `create-sparkkit` CLI.
2. One maintained SaaS starter template.
3. Authentication and organization-based multi-tenancy.
4. PostgreSQL persistence through Prisma.
5. An optional server-side AI chat feature.
6. Tests, CI, Docker support, and clear documentation.

Additional templates, billing, RAG, and agent orchestration are later milestones.

