<div align="center">
  <img src="./apps/docs/public/sparkkit-logo.png" alt="SparkKit" width="360" />

  # Build small software that is ready to become real software.

  SparkKit is an open-source TypeScript foundation for portable SaaS, internal tools,
  and AI-powered applications—with authentication, organizations, tenant-safe data,
  and production-minded defaults built in.

  [![CI](https://img.shields.io/github/actions/workflow/status/ousssamarahmani/SparkKit-Core-V1/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/ousssamarahmani/SparkKit-Core-V1/actions/workflows/ci.yml)
  [![License](https://img.shields.io/badge/license-Apache--2.0-111111?style=flat-square)](./LICENSE)
  [![Status](https://img.shields.io/badge/status-early%20stage-C4943D?style=flat-square)](./TASKS.md)
  [![GitHub stars](https://img.shields.io/github/stars/ousssamarahmani/SparkKit-Core-V1?style=flat-square)](https://github.com/ousssamarahmani/SparkKit-Core-V1/stargazers)

  [Project site](http://localhost:3000) · [Vision](./VISION.md) · [Quick start](#quick-start) · [Architecture](./ARCHITECTURE.md) · [Roadmap](./TASKS.md) · [Contributing](./CONTRIBUTING.md)
</div>

---

<picture>
  <img src="./assets/github/sparkkit-repository-hero.png" alt="SparkKit project website presenting the open-source foundation for Small Software and AI applications" width="100%" />
</picture>

> [!IMPORTANT]
> SparkKit is being built in public and has not reached its first stable release.
> The monorepo, project site, application shell, PostgreSQL data layer,
> authentication, organization onboarding, role enforcement, and tenant-owned
> project workflow are implemented today. The generator and optional AI layer are next.

## What is SparkKit?

AI agents make application code dramatically easier to create. They do not make
identity, tenant isolation, permissions, database migrations, testing, or deployment
disappear. SparkKit provides that missing application foundation.

It is designed for **Small Software**: focused products that serve one person, one
team, or a narrow workflow—internal tools, customer portals, operational dashboards,
personal AI tools, vertical applications, and compact SaaS products.

- **Owned and portable.** The generated application is normal TypeScript code that
  stays useful outside any managed platform.
- **Secure by design.** Authentication, organizations, roles, and tenant boundaries
  are part of the foundation.
- **Agent-ready.** Clear conventions help software developers and coding agents work
  on the same codebase safely.
- **AI-optional.** AI capabilities remain modular, server-side, and removable.
- **Cloud-optional.** Run locally or deploy to infrastructure you choose.

| Build with SparkKit | Operate with confidence | Keep your options open |
| --- | --- | --- |
| Start from a coherent application contract instead of rebuilding the foundation. | Treat identity, tenancy, permissions, and verification as product features. | Own ordinary TypeScript code and choose where it runs. |

## Quick start

### 1. Install the prerequisites

You need:

- [Git](https://git-scm.com/downloads)
- Node.js 24 or 26 (`node --version`)
- pnpm 11.9.0 through Corepack (`pnpm --version`)
- Docker Desktop, or another Docker Compose-compatible runtime

Start Docker before continuing. On Windows, Docker Desktop should use its WSL 2
engine. Confirm the required tools are available:

```bash
git --version
node --version
corepack enable
corepack prepare pnpm@11.9.0 --activate
pnpm --version
docker --version
docker compose version
```

### 2. Clone and install

```bash
git clone https://github.com/ousssamarahmani/SparkKit-Core-V1.git
cd SparkKit-Core-V1
pnpm install --frozen-lockfile
```

Run every remaining command from the repository root unless a step says otherwise.

### 3. Configure the reference application

Copy the safe local example to the environment file read by Next.js:

```bash
# macOS or Linux
cp apps/web/.env.example apps/web/.env.local

# Windows PowerShell
Copy-Item apps/web/.env.example apps/web/.env.local
```

The example connects to the PostgreSQL container on `localhost:5432` and serves
the application at `http://localhost:3001`. Its development secret is only for
local use. Never commit `.env.local` or reuse its secret in a deployed environment.

### 4. Start and prepare PostgreSQL

```bash
pnpm db:up
pnpm --filter @sparkkit/db db:migrate:deploy
pnpm --filter @sparkkit/db db:seed
```

`pnpm db:up` waits for PostgreSQL to become healthy. The migration creates the
schema. The optional, repeatable seed adds two deterministic tenant fixtures for
database development; it does not create passwords for signing into the web app.

Check the container at any time with:

```bash
docker compose ps
```

### 5. Run SparkKit

Open two terminals in the repository root.

Terminal 1 - public project site:

```bash
pnpm dev:docs
```

Terminal 2 - authenticated reference application:

```bash
pnpm dev:web
```

Open:

- Project site: [http://localhost:3000](http://localhost:3000)
- Reference application: [http://localhost:3001](http://localhost:3001)

On the reference application, choose **Create account**, register with a local test
email and a password of at least eight characters, name the first organization,
and create a project. You can then sign out and sign back in with that account.

### 6. Verify the repository

Keep PostgreSQL running, stop the development servers with `Ctrl+C`, then run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
```

The browser smoke test installs separately on a fresh machine. If Chromium is not
already available, run `pnpm exec playwright install chromium` once, then rerun
`pnpm e2e`.

### Stop or reset the local database

Stop PostgreSQL without deleting its data:

```bash
pnpm db:down
```

To deliberately erase the local SparkKit database and begin again, run the
following command, then repeat step 4:

```bash
docker compose down --volumes
```

> [!WARNING]
> `docker compose down --volumes` permanently deletes the local PostgreSQL volume.

### Troubleshooting

| Problem | Resolution |
| --- | --- |
| Docker cannot connect | Start Docker Desktop and wait until its engine reports that it is running. |
| Port `5432` is already in use | Stop the other PostgreSQL service or change both the Compose port and `DATABASE_URL`. |
| Port `3000` or `3001` is already in use | Stop the process using that port before restarting the corresponding development server. |
| Prisma cannot reach PostgreSQL | Run `docker compose ps`; wait for `postgres` to show `healthy`, then rerun the migration. |
| Authentication reports an origin error | Keep `BETTER_AUTH_URL=http://localhost:3001` and access the app through that same origin. |
| Generated Prisma types are missing | Run `pnpm --filter @sparkkit/db db:generate`, then rerun `pnpm typecheck`. |
| Browser smoke tests cannot find Chromium | Run `pnpm exec playwright install chromium`. |

## What works today

| Area | Available now |
| --- | --- |
| Foundation | pnpm workspace, Turborepo, strict TypeScript, shared ESLint, CI |
| Data | Prisma, PostgreSQL, migrations, deterministic seeds, tenant isolation |
| Identity | Email/password sessions, sign-in, sign-out, session restoration |
| Teams | Organization onboarding and owner/admin/member authorization |
| Application | Responsive shell, workspace navigation, tenant-owned project CRUD |
| Documentation | Public project site, architecture decisions, security guide, roadmap |

The next verified deliverable is the `create-sparkkit` generator. See the
[public task backlog](./TASKS.md) for acceptance criteria and implementation evidence.

<details>
<summary><strong>See the current project experience</strong></summary>

<br />

![SparkKit project site](./docs/screenshots/sparkkit-project-site-hero.jpg)

The public project site runs from `apps/docs`; the authenticated reference
application runs independently from `apps/web`.

</details>

## The product direction

```text
Developer or coding agent
          │
          ▼
 SparkKit application foundation
          │
          ├── Next.js application
          ├── Authentication and organizations
          ├── Tenant-safe PostgreSQL data
          ├── Tests and deployment conventions
          └── Optional AI adapters
          │
          ▼
 Infrastructure you choose
          └── Sparkbase managed cloud (planned, optional)
```

**SparkKit** is the open-source standard and application foundation. **Sparkbase**
is the planned managed cloud for deploying, securing, sharing, observing, and
recovering SparkKit applications. SparkKit will remain useful without Sparkbase;
the managed service must earn adoption through convenience rather than lock-in.

### One standard, two paths

| SparkKit | Sparkbase |
| --- | --- |
| Open-source application foundation | Planned managed operations platform |
| Source code the developer owns | Deployment, observability, backups, and recovery |
| Runs locally and on chosen infrastructure | An optional path optimized for convenience |
| Designed for developers and coding agents | Designed for teams using the resulting software |

## Target developer experience

Version 0.1 is working toward a dependable three-command path:

```bash
npx create-sparkkit my-app
cd my-app
pnpm dev
```

The `create-sparkkit` package is **not published yet**. This README will only mark
it available after a generated project installs, tests, builds, and starts on a
clean machine.

## Repository map

```text
apps/
  docs/       Project site and interactive documentation
  web/        Next.js reference application
packages/
  db/         Prisma schema, tenant-safe data access, migrations, and seeds
tooling/
  eslint/     Shared lint configuration
  typescript/ Shared strict TypeScript configuration
docs/
  adr/        Architecture decision records
  articles/   Long-form project writing and artwork
  security/   Security design and operational guidance
```

## Roadmap

- [x] **Foundation** — workspace, shared tooling, governance, and CI
- [x] **Database and tenancy** — PostgreSQL, organizations, memberships, and isolation
- [x] **Identity and authorization** — authentication, onboarding, roles, and sessions
- [ ] **Reference application** — shell, project CRUD, UX states, and browser smoke tests complete; setup documentation remains
- [ ] **Generator** — tested `create-sparkkit` CLI and publishable template
- [ ] **Optional AI** — provider-neutral interface, adapter, streaming example, and tests
- [ ] **Version 0.1** — production container, security review, and clean-machine verification

Detailed work is tracked in [`TASKS.md`](./TASKS.md); sequencing and release gates
live in [`IMPLEMENTATION.md`](./IMPLEMENTATION.md).

## Development

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run the complete repository gate with `pnpm check`. Database-specific setup and
commands are documented in [`packages/db/README.md`](./packages/db/README.md).

## Contributing

Contributions to code, tests, documentation, design, and examples are welcome.
Before opening a pull request:

1. Read the [contribution guide](./CONTRIBUTING.md) and [code of conduct](./CODE_OF_CONDUCT.md).
2. Check the [current milestone](./TASKS.md) and keep the change focused.
3. Add or update tests for behavior changes.
4. Run `pnpm check` locally.

Please report vulnerabilities privately according to the [security policy](./SECURITY.md).

## Documentation

- [Product vision](./VISION.md) — Small Software thesis, Human + Agent direction, validation gates, and Sparkbase relationship
- [AI contributor context](./AI_CONTEXT.md) — security invariants and scope rules for coding assistants
- [Architecture](./ARCHITECTURE.md) — boundaries, technology choices, and security model
- [Requirements](./REQUIREMENTS.md) — product requirements and release scope
- [Implementation plan](./IMPLEMENTATION.md) — delivery sequence and verification gates
- [Authentication security](./docs/security/authentication.md) — session and endpoint baseline
- [Project thesis](./docs/articles/why-ai-agents-need-an-open-source-foundation-for-small-software.md) — why Small Software needs an open foundation

## License

SparkKit is open source under the [Apache License 2.0](./LICENSE).

<div align="center">
  <strong>Build with SparkKit. Run it anywhere.</strong>
</div>
