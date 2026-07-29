import { CliCommand } from '../types';

export const cliCommands: CliCommand[] = [
  {
    command: 'npx create-sparkkit',
    description: 'Scaffolds a new SparkKit workspace with interactive template and plugin selection.',
    args: '[project-name] [--template <name>] [--database <type>]',
    options: [
      { flag: '-t, --template <name>', description: 'Template to scaffold (ai-saas, crm, internal-tool, agent-platform)' },
      { flag: '-db, --database <type>', description: 'Database target (postgres, neon, cloudsql, supabase)' },
      { flag: '--auth <providers>', description: 'Comma separated auth providers (github, google, passkeys)' }
    ],
    interactivePrompts: [
      { question: 'What is your project name?', default: 'my-spark-app' },
      { question: 'Which starter template would you like to use?', options: ['AI SaaS (Recommended)', 'CRM Workspace', 'Agent Platform', 'Internal Tool', 'Multi-Tenant SaaS', 'Minimal API'] },
      { question: 'Include AI Agent SDK (@sparkkit/ai)?', options: ['Yes (Gemini + OpenAI + Vercel AI SDK)', 'No'] },
      { question: 'Select Database Provider:', options: ['Sparkbase Cloud Managed Postgres (Free tier included)', 'Local PostgreSQL / Docker', 'Supabase / Neon'] }
    ],
    exampleOutput: [
      '✔ SparkKit CLI v1.2.0',
      '✔ Creating project in ./my-spark-app...',
      '✔ Downloading template: AI SaaS (apps/web, apps/api, packages/*)...',
      '✔ Installing dependencies with pnpm...',
      '✔ Generating Prisma client and tRPC types...',
      '✔ Initializing Better Auth keys and passkey configuration...',
      '',
      '🎉 Success! Created my-spark-app at /Users/developer/my-spark-app',
      '',
      'Inside that directory, you can run several commands:',
      '  cd my-spark-app',
      '  spark dev',
      '',
      'Ready to launch on Sparkbase Cloud?',
      '  spark deploy'
    ]
  },
  {
    command: 'spark init',
    description: 'Initializes SparkKit configuration in an existing Next.js or Node repository.',
    args: '[--force]',
    options: [
      { flag: '-f, --force', description: 'Overwrite existing configuration files' }
    ],
    exampleOutput: [
      '⚡ Initializing SparkKit in current repository...',
      '✔ Created sparkkit.config.ts',
      '✔ Added @sparkkit/core, @sparkkit/auth, @sparkkit/db to package.json',
      '✔ Configured Turborepo pipeline configuration in turbo.json',
      '✔ Generated .env.example with Gemini & Postgres placeholders',
      '✨ SparkKit is ready! Run "spark dev" to start.'
    ]
  },
  {
    command: 'spark dev',
    description: 'Starts the SparkKit development server with Turborepo HMR, tRPC watch, and local DB proxy.',
    options: [
      { flag: '-p, --port <number>', description: 'Specify port (default: 3000)' },
      { flag: '--filter <app>', description: 'Filter Turborepo execution to specific package/app' }
    ],
    exampleOutput: [
      '⚡ SparkKit Dev Engine v1.2.0',
      '  ├── apps/web  -> http://localhost:3000 (Next.js 15 App Router)',
      '  ├── apps/api  -> http://localhost:3001 (tRPC Express Server)',
      '  └── @sparkkit/db -> PostgreSQL Connected (Pool: 10 connections)',
      '  ',
      '  [tRPC Router]: Re-built router in 42ms',
      '  [Better Auth]: Session validator watching active JWT keys',
      '  [AI Agent Engine]: Loaded 3 active agent prompts',
      '  ✔ Ready for connections.'
    ]
  },
  {
    command: 'spark generate',
    description: 'Generates Prisma models, tRPC procedures, React UI components, or AI agent definitions.',
    args: '<type> <name>',
    options: [
      { flag: 'model <Name>', description: 'Generate Prisma model + CRUD tRPC router + UI table' },
      { flag: 'agent <Name>', description: 'Generate AI agent definition with tools and RAG schema' },
      { flag: 'plugin <Name>', description: 'Generate custom SparkKit plugin skeleton' }
    ],
    exampleOutput: [
      '⚡ Generating SparkKit feature module: ProjectManager',
      '✔ Created packages/db/prisma/schema.prisma [Model: ProjectManager]',
      '✔ Created packages/api/src/routers/projectManager.ts (tRPC CRUD router)',
      '✔ Created packages/ui/src/components/ProjectManagerTable.tsx',
      '✔ Registered router in appRouter at packages/api/src/root.ts',
      '✨ Run "spark db:push" to update your database schema!'
    ]
  },
  {
    command: 'spark doctor',
    description: 'Runs comprehensive health diagnostics on environment variables, DB connections, API keys and types.',
    exampleOutput: [
      '🏥 Running SparkKit Health Check...',
      '',
      ' [✓] Environment Variables: GEMINI_API_KEY, DATABASE_URL, BETTER_AUTH_SECRET detected',
      ' [✓] Database: Connection pool test passed (PostgreSQL 16.2)',
      ' [✓] Type Checker: 0 TypeScript errors found in Turborepo workspace',
      ' [✓] Auth Config: Better Auth keys and OAuth callback URIs verified',
      ' [✓] AI Gateway: Gemini 2.5 Flash model test call responded in 180ms',
      ' [✓] Redis Queue: Redis health ping OK',
      '',
      '🎉 All 6 health checks passed! SparkKit is 100% operational.'
    ]
  },
  {
    command: 'spark deploy',
    description: 'Deploys your SparkKit application to Sparkbase Cloud or custom Docker infrastructure.',
    options: [
      { flag: '--cloud', description: 'Deploy directly to Sparkbase Cloud managed platform' },
      { flag: '--docker', description: 'Build standalone Docker container image' }
    ],
    exampleOutput: [
      '🚀 Deploying to Sparkbase Cloud...',
      '✔ Authenticated as developer (team: Acme Corp)',
      '✔ Building container image with Turborepo remote cache (0.4s)...',
      '✔ Provisioning managed PostgreSQL database with pgvector...',
      '✔ Deploying Next.js 15 app to Cloud Run edge network...',
      '✔ Syncing database migrations (prisma migrate deploy)...',
      '',
      '🌐 Deployment complete! Your application is live:',
      '   https://acme-app.sparkbase.cloud',
      '   Dashboard & Logs: https://sparkbase.cloud/orgs/acme/deployments'
    ]
  },
  {
    command: 'spark update',
    description: 'Upgrades all @sparkkit/* core packages, dependencies, and Prisma schemas safely.',
    exampleOutput: [
      '🔄 Checking for SparkKit updates...',
      '  @sparkkit/core  1.1.4 -> 1.2.0 (Available)',
      '  @sparkkit/auth  1.1.4 -> 1.2.0 (Available)',
      '  @sparkkit/ai    1.1.4 -> 1.2.0 (Available)',
      '✔ Downloaded packages',
      '✔ Ran automated migration codemods',
      '✨ Upgrade complete! You are on SparkKit v1.2.0.'
    ]
  }
];
