# Contributing to SparkKit

SparkKit is early-stage. Contributions should help establish the verified version 0.1 vertical slice described in `TASKS.md`.

## Before contributing

1. Read `ARCHITECTURE.md`, `IMPLEMENTATION.md`, and the relevant ADRs in `docs/adr`.
2. Search existing issues before opening a new one.
3. Keep pull requests focused on one outcome.
4. Do not describe planned functionality as implemented.

## Local validation

Install and validate every workspace from the repository root:

```powershell
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The current workspaces are `@sparkkit/docs`, which contains the public product site, and `@sparkkit/web`, which is the initial Next.js reference application. A contribution is ready when every root command passes.

Lint rules come from `@sparkkit/eslint-config`; workspace-specific configs should extend its base, React, or Next.js exports. The unmounted legacy concept prototype under `apps/docs/src/components` and `apps/docs/src/data` is temporarily excluded from ESLint but remains under strict TypeScript validation.

Use `pnpm dev:docs` for the website on port 3000 and `pnpm dev:web` for the reference application on port 3001.

## Pull requests

Include:

- the user or maintainer problem being solved;
- the chosen approach and notable tradeoffs;
- tests for behavior changes;
- documentation changes where commands or behavior change;
- screenshots only when visual behavior changes.

Never commit secrets, personal data, generated credentials, or real customer information.

## Scope

Stripe, RAG, agent orchestration, additional templates, and managed cloud features require an approved milestone or architecture decision before implementation.
