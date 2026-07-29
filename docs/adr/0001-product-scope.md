# ADR 0001: Version 0.1 Product Scope

- Status: Accepted
- Date: 2026-07-27

## Context

SparkKit has a broad long-term vision covering SaaS foundations, AI integrations, deployment profiles, templates, billing, RAG, agents, and managed cloud infrastructure. Attempting all of these in the first release would make the project difficult to verify and maintain.

## Decision

Version 0.1 will deliver one complete vertical slice:

1. A pnpm/Turborepo workspace.
2. One maintained full-stack SaaS reference application.
3. Authentication, organizations, and server-side authorization.
4. PostgreSQL persistence through Prisma.
5. One organization-owned `Project` resource with isolation tests.
6. A `create-sparkkit` project generator.
7. Docker packaging, automated tests, CI, and accurate documentation.
8. An optional provider-neutral AI example after the core application works.

Stripe, RAG, agent orchestration, multiple templates, AWS/EKS, and Sparkbase Cloud deployment remain post-0.1 or optional deployment-profile work.

## Consequences

- The reference application becomes the test fixture for packages and the CLI.
- Documentation may describe future capabilities only when marked `Planned`.
- New features require a user outcome, acceptance criteria, and an explicit milestone.
- The website prototype does not count as implementation evidence.
