# SparkKit Product and Technical Requirements

## Purpose

SparkKit is an early-stage, open-source TypeScript application foundation for
portable Small Software and AI-powered applications. It is not yet a released
starter kit. Requirements are promoted into the implemented product only when
their acceptance criteria and verification pass.

The product direction is defined in [`VISION.md`](./VISION.md); the delivery
sequence and evidence are tracked in [`TASKS.md`](./TASKS.md).

## Version 0.1 outcome

An external developer can generate and run one organization-aware application
without founder assistance, retain ownership of ordinary TypeScript source code,
and safely extend it with tenant-owned business resources.

## Functional requirements

### Foundation

- A pnpm/Turborepo workspace coordinates applications, packages, and shared tooling.
- Every maintained workspace uses strict TypeScript and shared lint rules.
- CI performs a locked install, lint, type-check, tests, and production builds.
- The repository includes contribution, governance, conduct, and security policies.

### Data and tenancy

- PostgreSQL and Prisma provide versioned schema migrations and deterministic seeds.
- Users may belong to multiple organizations through unique memberships.
- Organization roles are `OWNER`, `ADMIN`, and `MEMBER`.
- Every tenant-owned record carries an organization boundary.
- Server operations enter tenant context only after authenticated membership is verified.
- Integration tests prove cross-tenant reads and mutations are rejected.

### Authentication and authorization

- Email/password registration, sign-in, sign-out, and session restoration work through Better Auth.
- Production configuration requires a strong secret and secure origin policy.
- CSRF/origin validation, secure cookies, and authentication rate limits remain enabled.
- Privileged operations are deny-by-default and enforced server-side.

### Reference application

- A responsive Next.js application supports registration, onboarding, dashboard,
  organization switching, settings, and sign-out.
- A representative tenant-owned `Project` resource supports authorized create,
  list, update, and delete operations.
- Loading, empty, unauthorized, validation, and unexpected-error states are explicit and accessible.
- End-to-end smoke tests cover the primary journey and negative tenant boundaries.

### Project generator

- `create-sparkkit` validates project names and refuses unsafe overwrites.
- It generates one complete, documented template without repository-only paths or secrets.
- Package-manager, install/no-install, and optional Git initialization choices are tested.
- CI generates a project in a temporary directory and verifies install, type-check,
  tests, build, and startup.
- Package metadata and an npm dry run are inspected before publication.

### Optional AI capability

- AI is not required for the core application to run.
- A minimal provider-neutral server interface precedes any provider adapter.
- The first example uses a fake provider in tests and keeps all credentials server-side.
- Missing optional AI configuration disables the feature gracefully.
- Runtime agents, tool authorization, approvals, and audit are post-foundation work
  and require separate acceptance criteria.

## Non-functional requirements

### Security

- No secrets are exposed through browser bundles or public environment variables.
- External input is validated and internal exceptions are not returned raw.
- Organization scope is never authorized solely from client input.
- Security-sensitive logs redact tokens, credentials, and personal data.
- Security and performance claims require recorded evidence.

### Portability

- SparkKit applications remain normal TypeScript applications.
- Local development and self-hosting do not require Sparkbase.
- Model providers and future managed services are replaceable integrations.
- The open-source application is not artificially limited to force managed adoption.

### Developer experience

- Setup commands are exercised in CI or documented release checks.
- A new contributor can run the application using only the repository documentation.
- Repository conventions make a tenant-owned resource straightforward to add without weakening isolation.
- Error messages identify actionable configuration or workflow problems.

### Accessibility and quality

- Interactive states expose appropriate labels, focus behavior, and status or alert semantics.
- Reduced-motion preferences are respected.
- Maintained code passes lint, strict type-checking, tests, and production builds.

## Explicitly deferred

The following are not version 0.1 commitments:

- multiple starter-template catalogs;
- Stripe billing;
- pgvector/RAG pipelines;
- passkeys, magic links, or enterprise SSO;
- proprietary LLM or multi-agent orchestration;
- a connector marketplace;
- Kubernetes or Sparkbase infrastructure;
- generalized human/agent principal abstractions;
- production scale, latency, compliance, or enterprise-readiness claims.

## Release gates

Version 0.1 is ready only when:

1. The root quality gate passes from a clean checkout.
2. Tenant-isolation tests pass against a real PostgreSQL service.
3. The reference journey passes end-to-end smoke tests.
4. A generated project installs, migrates, seeds, tests, builds, and starts.
5. A clean-machine setup succeeds using only generated documentation.
6. Security review finds no unresolved release blocker.
7. README and product documentation describe only verified behavior.
