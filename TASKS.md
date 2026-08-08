# SparkKit Task Backlog

## Status legend

- `[ ]` Not started
- `[-]` In progress
- `[x]` Complete and verified

Nothing below should be marked complete until its acceptance criteria pass.

## Milestone 0 — Project foundation

- [x] **M0.1 Choose and document the application framework**
  - Acceptance: an architecture decision records the choice and supported Node.js versions.
- [x] **M0.2 Initialize the pnpm/Turborepo workspace**
  - Acceptance: `pnpm install`, `pnpm lint`, `pnpm test`, and `pnpm build` run from the root.
- [x] **M0.3 Add shared TypeScript and lint configuration**
  - Acceptance: strict TypeScript is enabled in every workspace.
- [x] **M0.4 Add repository community files**
  - Acceptance: `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, security policy, and issue templates exist.
- [x] **M0.5 Add continuous integration**
  - Acceptance: clean-install, lint, type-check, test, and build jobs pass on a pull request.

### Milestone 0 implementation evidence

- Framework, runtime, scope, and governance decisions are recorded in `docs/adr/`.
- `pnpm-workspace.yaml` and `turbo.json` coordinate `@sparkkit/docs` and `@sparkkit/web`.
- The website is preserved in `apps/docs`; the initial Next.js reference shell is in `apps/web`.
- The root install, lint, type-check, test, and build commands pass for both workspaces.
- Both applications extend the strict TypeScript baseline in `tooling/typescript/base.json`.
- `@sparkkit/eslint-config` exports shared base, React, and Next.js flat configurations and lints itself.
- Maintained application code passes ESLint 10 with warnings treated as errors.
- Repository license, contribution guide, code of conduct, security policy, and issue templates are present.
- Community regression tests verify required files, private security routing, and pull-request quality checks.
- CI uses read-only permissions, frozen pnpm installs, dependency caching, concurrency cancellation, and the same lint/type-check/test/build gates verified locally.
- Pull request #1 verified the complete pnpm workflow on GitHub Actions: frozen install, lint, type-check, test, and build all passed.

## Milestone 1 — Database and tenancy

- [x] **M1.1 Create `@sparkkit/db`**
  - Acceptance: Prisma client generation and migrations run from documented commands.
- [ ] **M1.2 Model users, organizations, and memberships**
  - Acceptance: constraints prevent duplicate memberships and invalid roles.
- [ ] **M1.3 Add local PostgreSQL**
  - Acceptance: Docker Compose starts the database and the health check succeeds.
- [ ] **M1.4 Add deterministic seed data**
  - Acceptance: seeding creates two tenants and can be rerun safely.
- [ ] **M1.5 Add tenant isolation helpers**
  - Acceptance: integration tests prove cross-tenant reads and writes are rejected.

## Milestone 2 — Authentication and authorization

### M1.1 implementation evidence

- `packages/db` defines a server-only PostgreSQL boundary with Prisma ORM 7.
- Prisma configuration, schema formatting, validation, client generation, and
  development/deployment migration commands are documented in the package README.
- The package compiles to an importable ESM entry point and exposes a PostgreSQL
  driver-adapter client factory without opening a connection at import time.
- Package tests execute Prisma validation and offline migration SQL generation;
  the full root lint, type-check, test, and build gate includes `@sparkkit/db`.

- [ ] **M2.1 Integrate the selected auth library**
  - Acceptance: a user can register/sign in, sign out, and restore a session.
- [ ] **M2.2 Add organization onboarding**
  - Acceptance: a new user can create an organization and becomes its owner.
- [ ] **M2.3 Implement role checks**
  - Acceptance: owner, admin, and member permissions have automated tests.
- [ ] **M2.4 Secure session and auth endpoints**
  - Acceptance: secure cookie settings, CSRF strategy, rate limiting, and environment validation are documented and tested where practical.

## Milestone 3 — First SaaS template

- [ ] **M3.1 Build the application shell**
  - Acceptance: responsive sign-in, onboarding, dashboard, organization switcher, and settings screens exist.
- [ ] **M3.2 Add a representative tenant-owned resource**
  - Acceptance: users can create, list, update, and delete projects only in an authorized organization.
- [ ] **M3.3 Add error and empty states**
  - Acceptance: loading, empty, unauthorized, validation, and unexpected-error states are covered.
- [ ] **M3.4 Add end-to-end smoke tests**
  - Acceptance: onboarding, login, organization switching, and tenant isolation flows pass.
- [ ] **M3.5 Document local setup**
  - Acceptance: a new contributor can run the template using only the README.

## Milestone 4 — Project generator

- [ ] **M4.1 Create `create-sparkkit` CLI**
  - Acceptance: it validates project names and refuses unsafe overwrites.
- [ ] **M4.2 Package the SaaS template**
  - Acceptance: generated code contains no repository-only paths or secrets.
- [ ] **M4.3 Add CLI options**
  - Acceptance: package manager, install/no-install, and Git initialization choices work.
- [ ] **M4.4 Test generation**
  - Acceptance: CI generates a project in a temporary directory, installs it, type-checks it, tests it, and builds it.
- [ ] **M4.5 Prepare npm publishing**
  - Acceptance: package metadata, executable mapping, versioning, changelog, and dry-run package contents are verified.

## Milestone 5 — Optional AI module

- [ ] **M5.1 Define the minimal AI interface**
  - Acceptance: the template is not coupled directly to a provider SDK.
- [ ] **M5.2 Add one provider adapter**
  - Acceptance: server-side streaming works with timeouts and normalized errors.
- [ ] **M5.3 Add an example AI chat**
  - Acceptance: it has input limits, rate limiting, cancellation, and no client-side secret.
- [ ] **M5.4 Add fake-provider tests**
  - Acceptance: CI tests success, stream failure, timeout, and cancellation without a real API key.
- [ ] **M5.5 Document optional configuration**
  - Acceptance: the starter works normally when AI variables are absent.

## Milestone 6 — Version 0.1 release

- [ ] **M6.1 Perform security review**
  - Acceptance: auth, tenant isolation, secret handling, dependencies, and logs have recorded results.
- [ ] **M6.2 Add production Docker build**
  - Acceptance: image builds, runs as non-root, and passes a health check.
- [ ] **M6.3 Verify clean-machine setup**
  - Acceptance: two independent testers complete the documented setup.
- [ ] **M6.4 Publish release candidate**
  - Acceptance: CLI and generated application are installable from the release candidate.
- [ ] **M6.5 Publish version 0.1**
  - Acceptance: tagged source, npm package, release notes, and migration notes are public.

## Open-source adoption workstream

- [x] **OA.1 Establish honest repository positioning**
  - Acceptance: the README clearly separates implemented capabilities from the version 0.1 target.
- [ ] **OA.2 Validate setup with ten developers**
  - Acceptance: results record completion rate, setup time, and repeated failure points without invented metrics.
- [ ] **OA.3 Publish three maintained example applications**
  - Acceptance: each example includes source, screenshots, setup instructions, and the SparkKit version used.
- [ ] **OA.4 Prepare version 0.1 launch assets**
  - Acceptance: a short demo, screenshots, release notes, repository description, topics, and launch post are ready.
- [ ] **OA.5 Establish contributor operations**
  - Acceptance: Discussions, scoped `good first issue` work, triage expectations, and contributor recognition are active.
- [ ] **OA.6 Review adoption evidence after launch**
  - Acceptance: generated-project success, setup time, active usage, npm downloads, examples, contributors, stars, and forks are reported only from documented sources.

## Post-0.1 candidates

These should become separate proposals rather than being silently added to version 0.1:

- Stripe billing module.
- Invitations and additional authentication methods.
- pgvector knowledge base and RAG.
- Additional starter templates.
- Agent tools and orchestration.
- Hosted deployment presets.
- Telemetry and benchmarking.

