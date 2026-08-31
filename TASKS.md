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
- [x] **M1.2 Model users, organizations, and memberships**
  - Acceptance: constraints prevent duplicate memberships and invalid roles.
- [x] **M1.3 Add local PostgreSQL**
  - Acceptance: Docker Compose starts the database and the health check succeeds.
- [x] **M1.4 Add deterministic seed data**
  - Acceptance: seeding creates two tenants and can be rerun safely.
- [x] **M1.5 Add tenant isolation helpers**
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

### M1.2 implementation evidence

- Prisma models define users, organizations, and memberships with UUID primary
  keys and timestamps.
- PostgreSQL restricts membership roles to `OWNER`, `ADMIN`, and `MEMBER`.
- Unique constraints prevent duplicate user emails, organization slugs, and
  duplicate memberships within an organization.
- Membership foreign keys cascade on user or organization deletion, and the
  committed migration preserves the schema constraints.
- Package tests verify the schema and migration contract; the full root lint,
  type-check, test, and build gate passes.

### M1.3 implementation evidence

- Docker Compose runs PostgreSQL 17 on `127.0.0.1:5432` with a persistent named
  volume and a `pg_isready` health check.
- Root commands start, stop, and inspect the local database consistently.
- The live container reached `healthy`, Prisma applied the committed migration,
  and `prisma migrate status` reported the schema up to date.
- Live PostgreSQL inspection confirmed the tenancy tables and the three allowed
  membership roles.

### M1.4 implementation evidence

- Prisma's explicit seed workflow upserts two stable development users, two
  organizations, and one owner membership for each tenant.
- Running the seed twice completed successfully and left exactly two users, two
  organizations, and two memberships in the live PostgreSQL database.
- Package tests verify stable fixture identifiers, upsert-only behavior, and the
  documented seed command; the full root quality gate passes.

### M1.5 implementation evidence

- `createTenantDatabase` verifies membership before returning a scoped data API;
  its implementation class cannot be constructed through the package exports.
- The first tenant-owned `Project` model carries a required `organizationId`,
  indexed foreign key, and cascading organization relationship.
- Project list, lookup, create, update, and delete operations derive their tenant
  scope from the verified context and never accept an organization ID as data.
- Live PostgreSQL integration tests prove a user cannot enter another tenant or
  read, update, or delete another tenant's project.
- GitHub Actions now provisions PostgreSQL, applies migrations, seeds fixtures,
  and runs the isolation suite as part of the normal test gate.

- [x] **M2.1 Integrate the selected auth library**
  - Acceptance: a user can register/sign in, sign out, and restore a session.

### M2.1 implementation evidence

- Better Auth 1.7 is connected to Next.js through the catch-all API route with
  email/password registration and sign-in enabled.
- Prisma stores users, credential accounts, sessions, and verification records
  in PostgreSQL through a versioned migration.
- The React client is available to the application shell, while production
  startup rejects a missing or undersized authentication secret.
- A live handler-level integration test registers a user, restores the cookie
  session, signs out, verifies invalidation, signs in again, and restores the
  new session. The repository-wide lint, type-check, test, and build gate passes.
- [x] **M2.2 Add organization onboarding**
  - Acceptance: a new user can create an organization and becomes its owner.

### M2.2 implementation evidence

- An authenticated `POST /api/organizations` endpoint creates organizations
  from validated names and URL-safe slugs.
- Organization creation and the initial `OWNER` membership run in one database
  transaction, preventing partially created tenants.
- Duplicate slugs return a conflict response and unauthenticated requests are
  rejected before database writes.
- A live integration test registers a new user, creates an organization through
  the endpoint, and verifies the persisted owner membership.
- [x] **M2.3 Implement role checks**
  - Acceptance: owner, admin, and member permissions have automated tests.

### M2.3 implementation evidence

- A deny-by-default permission matrix defines organization, membership, and
  project capabilities for `OWNER`, `ADMIN`, and `MEMBER` roles.
- Database-backed authorization verifies active organization membership before
  granting a permission.
- Tenant-scoped project helpers enforce read, create, update, and delete
  permissions at the data boundary; callers cannot bypass checks accidentally.
- Automated tests cover all three roles and prove that a member cannot delete a
  project while an admin can.
- [x] **M2.4 Secure session and auth endpoints**
  - Acceptance: secure cookie settings, CSRF strategy, rate limiting, and environment validation are documented and tested where practical.

### M2.4 implementation evidence

- Production startup requires an HTTPS canonical URL outside local loopback, a
  signing secret of at least 32 characters, and HTTPS-only exact trusted origins.
- Host-only authentication cookies explicitly use `HttpOnly`, `SameSite=Lax`,
  and production-only `Secure`; cross-subdomain sharing is disabled.
- Better Auth CSRF and origin checks remain enabled, and SparkKit-owned mutation
  endpoints apply the same trusted-origin policy before session lookup.
- Rate limiting is always enabled, with stricter five-per-minute rules for email
  registration and password sign-in.
- Automated tests verify invalid-origin rejection, throttling, environment
  failures, cookie attributes, and trusted-origin matching. Operational proxy
  and multi-instance requirements are documented in
  `docs/security/authentication.md`.

## Milestone 3 — First SaaS template

- [x] **M3.1 Build the application shell**
  - Acceptance: responsive sign-in, onboarding, dashboard, organization switcher, and settings screens exist.

### M3.1 implementation evidence

- The reference application now includes responsive sign-in and registration,
  authenticated organization onboarding, a tenant-aware dashboard, organization
  switching, settings, and sign-out.
- Dashboard and settings data comes from the active Better Auth session and real
  organization memberships; unauthenticated access redirects to sign-in and users
  without a membership continue through onboarding.
- Static contract tests, integration tests, lint, type-check, production build,
  and desktop/mobile browser review pass.
- [x] **M3.2 Add a representative tenant-owned resource**
  - Acceptance: users can create, list, update, and delete projects only in an authorized organization.

### M3.2 implementation evidence

- Authenticated project collection and detail routes derive the user from the
  Better Auth session and enter the existing verified tenant database boundary.
- The dashboard lists real organization projects and provides responsive create,
  edit, and delete interactions; delete is shown only to owner and admin roles.
- Database-backed route tests complete the full CRUD lifecycle and reject access
  to an organization outside the authenticated user's memberships.
- [x] **M3.3 Add error and empty states**
  - Acceptance: loading, empty, unauthorized, validation, and unexpected-error states are covered.

### M3.3 implementation evidence

- The dashboard has an accessible skeleton loading route with reduced-motion support.
- An explicitly requested organization outside the signed-in user's memberships
  renders an access-denied state without exposing tenant data.
- The project manager covers the first-project empty state, trimmed-name
  validation, save and delete progress, malformed responses, and network failures.
- The dashboard error boundary preserves user data, reports unexpected rendering
  failures, and offers an in-place retry action.
- Workspace state regression tests pass with the repository-wide lint, type-check,
  database integration, and test gates.
- [x] **M3.4 Add end-to-end smoke tests**
  - Acceptance: onboarding, login, organization switching, and tenant isolation flows pass.

### M3.4 implementation evidence

- A real Chromium workflow registers a user, creates the first workspace, and
  verifies the authenticated dashboard and first-project state.
- The same workflow creates and switches to a second organization, creates a
  project, signs out, and signs back in through the public UI.
- A separately authenticated browser context creates another tenant, then the
  primary user is denied access to that tenant's projects with a verified `403`.
- Playwright runs through `pnpm e2e`, and CI installs Chromium and executes the
  smoke test after the repository-wide test suite.
- [x] **M3.5 Document local setup**
  - Acceptance: a new contributor can run the template using only the README.

### M3.5 implementation evidence

- The README now provides an ordered prerequisites-to-first-workspace path for
  Windows, macOS, and Linux contributors.
- Environment setup points to the file the Next.js application actually reads,
  explains local-only secrets, and removes obsolete AI Studio variables.
- Database startup, migration, optional seed behavior, both development servers,
  account onboarding, verification commands, shutdown, and destructive reset are
  documented with expected ports and outcomes.
- Troubleshooting covers Docker availability, port conflicts, PostgreSQL health,
  authentication origins, generated Prisma types, and Playwright installation.

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

