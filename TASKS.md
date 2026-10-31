# SparkKit Task Backlog

## Status legend

- `[ ]` Not started
- `[-]` In progress
- `[x]` Complete and verified

Nothing below should be marked complete until its acceptance criteria pass.

## Current priority and delivery rules

**Current priority: M5.1 — define the external validation protocol.**

- Milestones 5, 6, and 7 form the version 0.1 release path.
- Runtime agents, the Human + Agent proof, MCP interoperability, and Sparkbase
  remain gated work. They must not delay a useful version 0.1.
- SparkKit stays useful without an AI provider, hosted control plane, or agent
  runtime.
- Every agent capability is deny-by-default, tenant-scoped, observable, and
  covered by deterministic tests before it is presented as working.
- Sparkbase work begins from documented user demand rather than assumptions.

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

- [x] **M4.1 Create `create-sparkkit` CLI**
  - Acceptance: it validates project names and refuses unsafe overwrites.

### M4.1 implementation evidence

- A private `create-sparkkit` workspace package exposes a real executable and a
  typed programmatic API without runtime dependencies.
- Project names must be lowercase kebab-case, stay within npm's length limit,
  and cannot be paths, special names, or Windows-reserved device names.
- Target creation is atomic and refuses to overwrite an existing directory or
  file, including when the target appears between validation and creation.
- Unit and command-level tests verify successful creation, invalid input, and
  overwrite refusal. Template contents intentionally remain M4.2.
- [x] **M4.2 Package the SaaS template**
  - Acceptance: generated code contains no repository-only paths or secrets.

### M4.2 implementation evidence

- The CLI packages the verified Next.js application, PostgreSQL/Prisma data
  layer, migrations, shared TypeScript and ESLint tooling, and local Compose
  profile from an explicit allowlist.
- Generated projects receive a personalized root package, Compose project name,
  setup guide, example environment files, and Apache-2.0 license.
- Local environment files, dependencies, build outputs, generated Prisma code,
  browser artifacts, and repository-only paths are excluded from the template.
- Generation copies into the atomically reserved target without overwriting and
  removes partial output if template copying or personalization fails.
- Automated tests inspect the complete generated file tree for secrets,
  unresolved tokens, repository paths, excluded artifacts, and required SaaS
  foundation files.
- [x] **M4.3 Add CLI options**
  - Acceptance: package manager, install/no-install, and Git initialization choices work.

### M4.3 implementation evidence

- `--package-manager`/`--pm` selects pnpm, npm, yarn, or Bun and personalizes
  package metadata, workspace commands, dependency syntax, and setup guidance.
- `--install`/`--no-install` and `--git`/`--no-git` are explicit, conflicting
  choices are rejected, and both operations default to off for deterministic use.
- Optional setup commands run without a shell, report actionable failures, and
  preserve the generated project so users can recover manually.
- Unit and command-level tests cover parsing, safe defaults, npm-compatible
  generation, selected setup commands, real Git initialization, and rerun safety.
- [x] **M4.4 Test generation**
  - Acceptance: CI generates a project in a temporary directory, installs it, type-checks it, tests it, and builds it.

### M4.4 implementation evidence

- CI builds the local `create-sparkkit` package and generates a clean project
  beneath the runner's temporary directory without reusing repository artifacts.
- The generated project installs independently, applies its PostgreSQL migrations,
  then runs lint, type-check, test, and production-build gates.
- Repository-only browser and workflow contract checks stay in the source repository
  and are excluded from the portable application template.
- CLI contract tests protect the generated-project CI job and its complete command
  sequence against accidental removal.

- [x] **M4.5 Prepare npm publishing**
  - Acceptance: package metadata, executable mapping, versioning, changelog, and dry-run package contents are verified.

### M4.5 implementation evidence

- `create-sparkkit` is versioned at `0.1.0` with Apache-2.0 licensing, public npm
  publishing configuration, repository links, issue tracking, and search metadata.
- The package includes dedicated usage documentation, the full project license,
  compiled CLI/library output, and the portable application template.
- The package verifier checks the executable mapping and shebang, runs
  `npm pack --dry-run --json`, requires release assets, and rejects local or
  repository-only artifacts.
- CI runs the package verifier before exercising the generated application.

Milestone 4 is complete. Publishing remains an explicit maintainer release action.

## Milestone 5 — Distribution and external validation

- [ ] **M5.1 Define the external validation protocol**
  - Acceptance: a versioned checklist records the tester environment, commands,
    completion time, assistance given, outcome, and exact failure points without
    collecting secrets or unnecessary personal information.
- [ ] **M5.2 Verify the generated project on clean machines**
  - Acceptance: independent Windows and macOS or Linux environments generate,
    configure, migrate, seed, test, build, and run an application using only the
    generated documentation.
- [ ] **M5.3 Validate setup with ten external developers**
  - Acceptance: ten non-maintainer attempts have documented completion rates,
    setup times, assistance levels, and repeated failure points; incomplete
    attempts remain visible in the results.
- [ ] **M5.4 Fix repeated distribution failures**
  - Acceptance: every issue repeated by two or more testers is fixed, documented,
    deliberately deferred with rationale, or converted into a tracked issue with
    an owner and acceptance criteria.
- [ ] **M5.5 Record the Gate B decision**
  - Acceptance: a short evidence report states whether an external developer can
    use the CLI successfully and whether SparkKit is ready to proceed to
    Agent-native DX; no unsupported success metrics are claimed.

## Milestone 6 — Agent-native developer experience

- [ ] **M6.1 Add the root `AGENTS.md` contract**
  - Acceptance: the concise, version-controlled file explains repository layout,
    supported commands, tenant and authorization boundaries, prohibited changes,
    verification gates, and the definition of done for coding agents.
- [ ] **M6.2 Define the portable Agent Skill format**
  - Acceptance: a documented format covers purpose, inputs, allowed tools,
    ordered procedure, security constraints, expected output, and verification;
    it does not depend on one model vendor.
- [ ] **M6.3 Implement `add-tenant-resource`**
  - Acceptance: the skill guides an agent to add an organization-owned resource
    with schema constraints, authorization at the data boundary, API validation,
    migrations, tests, and documentation.
- [ ] **M6.4 Implement `tenant-security`**
  - Acceptance: the skill audits a feature for cross-tenant access, missing role
    checks, unsafe identifiers, secret exposure, and incomplete negative tests,
    and produces actionable evidence.
- [ ] **M6.5 Implement `verify-feature`**
  - Acceptance: the skill runs the required lint, type-check, test, build, tenant
    isolation, and generated-project checks and reports failures without hiding or
    rewriting them.
- [ ] **M6.6 Validate coding-agent extension quality**
  - Acceptance: at least two supported coding-agent workflows attempt the same
    tenant-owned feature from a clean checkout; results record completion,
    security mistakes, human corrections, elapsed time, and verification status.
- [ ] **M6.7 Publish Agent-native DX documentation**
  - Acceptance: maintainers and contributors can discover, run, review, and
    update `AGENTS.md` and the three skills without proprietary services.

## Milestone 7 — Version 0.1 release

- [ ] **M7.1 Perform the version 0.1 security review**
  - Acceptance: authentication, tenant isolation, authorization, secret handling,
    dependencies, logs, generated output, and deployment defaults have recorded
    findings and dispositions.
- [ ] **M7.2 Add the production container profile**
  - Acceptance: the application image builds reproducibly, runs as non-root,
    accepts configuration only at runtime, exposes a health check, and documents
    PostgreSQL and migration responsibilities.
- [ ] **M7.3 Publish a release candidate**
  - Acceptance: the CLI and generated application install from the candidate,
    pass the clean-machine protocol, and include accurate release notes.
- [ ] **M7.4 Publish `create-sparkkit` version 0.1**
  - Acceptance: provenance, package contents, executable behavior, version,
    license, and public installation are verified from the npm registry.
- [ ] **M7.5 Publish SparkKit version 0.1**
  - Acceptance: the tagged source, npm package, container instructions, release
    notes, known limitations, migration notes, and verification evidence are
    public and mutually consistent.

## Milestone 8 — Minimal agent runtime experiment

This milestone may move to version 0.2 if it would delay the version 0.1 release.

- [ ] **M8.1 Record the runtime boundary ADR**
  - Acceptance: the decision separates the open-source SparkKit primitives from
    possible Sparkbase managed services and defines what remains application-owned.
- [ ] **M8.2 Add tenant-scoped agent identity**
  - Acceptance: every agent belongs to one organization and project, has a human
    owner, cannot impersonate a user, and is rejected outside its assigned scope.
- [ ] **M8.3 Define the agent capability model**
  - Acceptance: capabilities use stable names such as `tickets.read` and
    `refund.execute`, default to deny, and are stored separately from human roles.
- [ ] **M8.4 Add a typed tool registry**
  - Acceptance: tools declare validated input/output schemas, required capability,
    side-effect class, timeout, and audit metadata before they can execute.
- [ ] **M8.5 Implement the policy harness**
  - Acceptance: one centralized evaluator returns `ALLOW`, `APPROVAL`, or `DENY`
    for every tool request and cannot be bypassed by registered tools.
- [ ] **M8.6 Implement human approval requests**
  - Acceptance: approval-required actions pause before side effects, expose the
    actor, arguments, risk, and expiry, and can be approved or rejected only by an
    authorized human.
- [ ] **M8.7 Add an append-only activity audit**
  - Acceptance: requests, policy decisions, approvals, executions, failures, and
    cancellations are attributable to a human or agent without recording secrets.
- [ ] **M8.8 Add runtime safety limits**
  - Acceptance: tool calls enforce cancellation, deadlines, bounded retries,
    concurrency and cost limits, and an organization-level emergency stop.
- [ ] **M8.9 Add deterministic fake-runtime tests**
  - Acceptance: CI proves allow, approval, denial, cross-tenant rejection,
    timeout, cancellation, audit redaction, and failure behavior without a paid
    model or network access.
- [ ] **M8.10 Add the first Agent Builder UI**
  - Acceptance: an authorized user can create an agent, assign skills and tools,
    configure capabilities, choose a human owner, pause the agent, and inspect its
    effective policy; advanced model orchestration remains out of scope.

## Milestone 9 — Human + Agent multiplayer proof

- [ ] **M9.1 Define the Support AI demonstration**
  - Acceptance: the organization-aware scenario and non-goals are documented
    around one support workflow rather than a generic chatbot.
- [ ] **M9.2 Add tenant-owned tickets and knowledge sources**
  - Acceptance: ticket and knowledge data cannot be read or changed across
    organizations and all access passes through the existing authorization layer.
- [ ] **M9.3 Add the Support Agent configuration**
  - Acceptance: the agent can search knowledge, read tickets, and create reply
    drafts but cannot directly send replies or perform undeclared actions.
- [ ] **M9.4 Add the refund approval workflow**
  - Acceptance: a refund request pauses for an authorized human, records approval
    or rejection, prevents replay, and executes at most once after approval.
- [ ] **M9.5 Prove a denied destructive action**
  - Acceptance: `customers.delete` or an equivalent destructive tool is denied,
    produces no side effect, and appears in the audit trail.
- [ ] **M9.6 Add the collaboration workspace**
  - Acceptance: humans can see assignments, drafts, pending approvals, agent
    state, effective permissions, recent runs, and the shared activity timeline.
- [ ] **M9.7 Add end-to-end multiplayer verification**
  - Acceptance: browser and runtime tests prove allowed, approval-required, denied,
    cancellation, cross-tenant, and human handoff flows in one repeatable scenario.
- [ ] **M9.8 Document the Gate D result**
  - Acceptance: the evidence states what is implemented, experimental, unsafe for
    production, or deferred; the demo is not presented as a general agent platform.

## Milestone 10 — MCP interoperability experiment

- [ ] **M10.1 Define the MCP adapter boundary**
  - Acceptance: an ADR maps MCP servers and tools into SparkKit identity, tenancy,
    capability, approval, timeout, and audit rules without granting implicit trust.
- [ ] **M10.2 Add one experimental MCP connection**
  - Acceptance: an administrator can configure one server using secret references,
    allowlisted tools, explicit scopes, and a disabled-by-default setting.
- [ ] **M10.3 Route MCP tools through the harness**
  - Acceptance: MCP and native tools receive identical authorization, approval,
    cancellation, redaction, and audit behavior.
- [ ] **M10.4 Add adversarial MCP tests**
  - Acceptance: CI covers unknown tools, changed schemas, unavailable servers,
    timeouts, malicious output, cross-tenant attempts, and approval bypass attempts.
- [ ] **M10.5 Document experimental MCP support**
  - Acceptance: setup, threat model, supported subset, limitations, and safe removal
    are documented without implying universal compatibility.

## Milestone 11 — Evidence-driven Sparkbase

- [ ] **M11.1 Interview teams using SparkKit**
  - Acceptance: requests for hosting, secrets, monitoring, backups, deployment,
    collaboration, or managed execution are recorded with frequency and context.
- [ ] **M11.2 Define the smallest useful Sparkbase layer**
  - Acceptance: the product brief solves the strongest documented operational
    problem and explicitly rejects unrelated platform scope.
- [ ] **M11.3 Prototype the multi-organization control plane**
  - Acceptance: the workspace separates organizations, projects, environments,
    members, agents, policies, approvals, runs, and audit data in its information
    architecture and access model.
- [ ] **M11.4 Validate the workspace with real users**
  - Acceptance: representative users complete project, agent, approval, and audit
    tasks; observed usability and trust failures are recorded and prioritized.
- [ ] **M11.5 Define managed-runtime operations and security**
  - Acceptance: tenancy, encryption, secret storage, regional data, backups,
    incident response, observability, billing boundaries, and customer deletion
    have reviewed requirements before production implementation.
- [ ] **M11.6 Record the Gate E go/no-go decision**
  - Acceptance: build, narrow, postpone, or reject Sparkbase scope based on
    documented demand and willingness to adopt or pay, not repository interest alone.

## Open-source adoption workstream

- [x] **OA.1 Establish honest repository positioning**
  - Acceptance: the README clearly separates implemented capabilities from the version 0.1 target.
- [ ] **OA.2 Validate setup with ten developers**
  - Acceptance: Milestone 5 records completion rate, setup time, assistance, and
    repeated failure points without invented metrics.
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
- Hosted deployment presets.
- Telemetry and benchmarking.
- Multi-agent planning and autonomous orchestration.
- Additional model-provider adapters and routing.
- Enterprise identity, compliance, and policy integrations.

