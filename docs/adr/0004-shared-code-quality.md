# ADR 0004: Shared code-quality configuration

- Status: Accepted
- Date: 2026-07-29

## Context

SparkKit needs one enforceable quality standard across applications and future packages. TypeScript compilation and linting solve different problems, so using `tsc` as the lint command does not satisfy this requirement.

## Decision

- Keep strict compiler defaults in `tooling/typescript/base.json`.
- Provide ESLint 10 flat configurations from `@sparkkit/eslint-config`.
- Export base, React, and Next.js configurations from the shared package.
- Use the ESLint CLI directly because Next.js 16 removed `next lint`.
- Fail CI on ESLint warnings with `--max-warnings 0`.
- Self-lint the shared configuration package.
- Keep `pnpm lint` and `pnpm typecheck` as separate root gates.

The docs workspace temporarily excludes its unmounted legacy concept prototype (`src/App.tsx`, `src/HonestSite.tsx`, `src/components`, and `src/data`) from ESLint. Those files remain under strict TypeScript validation and are retained only as design reference until they are deleted or migrated.

## Consequences

Maintained source receives consistent TypeScript, React Hooks, React Refresh, and Next.js Core Web Vitals checks. New workspaces must extend the closest shared configuration instead of creating independent rule sets.
