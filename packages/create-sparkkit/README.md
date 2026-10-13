# create-sparkkit

Create a portable SparkKit application with Next.js, PostgreSQL, Prisma,
authentication, organizations, tenant-safe project CRUD, and shared tooling.

## Usage

```bash
npx create-sparkkit my-app
cd my-app
pnpm install
pnpm db:up
pnpm db:migrate
pnpm dev:web
```

Generation never overwrites an existing target. Dependency installation and Git
initialization are opt-in:

```bash
npx create-sparkkit my-app --pm pnpm --install --git
```

Supported package managers are pnpm, npm, Yarn, and Bun. Run
`npx create-sparkkit --help` for every option.

SparkKit is licensed under Apache-2.0. Documentation, source code, and issue
tracking are available in the
[SparkKit repository](https://github.com/ousssamarahmani/SparkKit-Core-V1).
