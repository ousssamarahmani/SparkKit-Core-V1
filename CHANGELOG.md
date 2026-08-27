# Changelog

All notable changes to SparkKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project will use [Semantic Versioning](https://semver.org/) for public
releases.

## [Unreleased]

### Added

- pnpm and Turborepo workspace foundation.
- Public project site and Next.js reference application shell.
- Shared strict TypeScript and ESLint configurations.
- Prisma/PostgreSQL database package with constrained memberships, migrations,
  deterministic tenant fixtures, and scoped project operations.
- Local PostgreSQL 17 Docker Compose profile with persistent storage and health
  checks.
- Live integration tests for membership verification and rejected cross-tenant
  project reads and writes.
- Better Auth email/password registration, sign-in, sign-out, and persistent
  PostgreSQL sessions, verified through the real authentication handler.
- Authenticated organization onboarding with atomic owner membership creation.
- Owner, admin, and member authorization checks enforced by tenant data helpers.
- Hardened authentication configuration with trusted origins, secure production
  cookies, CSRF validation, sign-in throttling, and production environment checks.
- Community health files and continuous integration.

### Changed

- Reworked the repository front page around honest product status, local setup,
  architecture, roadmap, and contribution paths.

[Unreleased]: https://github.com/ousssamarahmani/SparkKit-Core-V1/compare/main...HEAD
