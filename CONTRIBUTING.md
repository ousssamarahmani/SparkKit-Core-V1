# Contributing to SparkKit

Thank you for helping build SparkKit. Contributions to code, tests,
documentation, design, examples, and issue triage are welcome.

SparkKit is early-stage. Contributions should help establish the verified
version 0.1 vertical slice described in `TASKS.md`.

## Good first contributions

Start with documentation corrections, missing tests, accessibility fixes, or a
scoped issue from the current milestone. Before beginning a larger feature,
open a proposal so its product and maintenance tradeoffs can be agreed on first.

## Before contributing

1. Read `ARCHITECTURE.md`, `IMPLEMENTATION.md`, and the relevant ADRs in `docs/adr`.
2. Search existing issues before opening a new one.
3. Comment on the issue you plan to address, or open a proposal for untracked work.
4. Keep pull requests focused on one outcome.
5. Do not describe planned functionality as implemented.

## Local validation

Install and validate every workspace from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The current workspaces include `@sparkkit/docs`, the public product site;
`@sparkkit/web`, the initial Next.js reference application; and `@sparkkit/db`,
the Prisma/PostgreSQL boundary. A contribution is ready when every root command
passes.

Lint rules come from `@sparkkit/eslint-config`; workspace-specific configs
should extend its base, React, or Next.js exports. The unmounted legacy concept
prototype under `apps/docs/src/components` and `apps/docs/src/data` is temporarily
excluded from ESLint but remains under strict TypeScript validation.

Use `pnpm dev:docs` for the website on port 3000 and `pnpm dev:web` for the
reference application on port 3001.

## Pull requests

Include:

- the user or maintainer problem being solved;
- the chosen approach and notable tradeoffs;
- tests for behavior changes;
- documentation changes where commands or behavior change; and
- screenshots only when visual behavior changes.

Never commit secrets, personal data, generated credentials, or real customer
information.

Draft pull requests are welcome when they make the remaining questions explicit.
Maintainers may ask to split a change when doing so makes review, testing, or
reversion safer.

## Commit messages

Use short, outcome-oriented commit subjects. Conventional Commit prefixes are
recommended:

```text
feat: add organization membership constraints
fix: reject cross-tenant project lookup
docs: clarify local database setup
test: cover duplicate membership rejection
```

## Architecture decisions

Add or update an ADR when a change introduces a long-lived dependency, alters a
security boundary, changes the public package architecture, or expands product
scope. Follow the structure used in `docs/adr` and record alternatives and
consequences.

## Scope

Stripe, RAG, agent orchestration, additional templates, and managed cloud
features require an approved milestone or architecture decision before
implementation.

## Community standards

Participation is governed by `CODE_OF_CONDUCT.md`. Security reports must follow
`SECURITY.md` and must never be opened as public issues.
