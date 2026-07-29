import { DocArticle } from '../types';

export const docsArticles: DocArticle[] = [
  {
    id: 'getting-started',
    title: 'Quick Start Guide',
    category: 'Fundamentals',
    description: 'Learn how to scaffold and launch a SparkKit production app in under 2 minutes.',
    content: `
SparkKit is an open-source, type-safe developer toolkit that combines modern authentication, database ORM, AI agent engines, and multi-tenant architectures into a seamless monorepo.

### Step 1: Create a new project
Run the zero-dependency CLI initializer in your terminal:

\`\`\`bash
npx create-sparkkit@latest my-saas-app
cd my-saas-app
\`\`\`

### Step 2: Environment Setup
SparkKit automatically configures your \`.env\` file. Provide your PostgreSQL database URL and optional Gemini or OpenAI key:

\`\`\`env
DATABASE_URL="postgresql://postgres:password@localhost:5432/sparkkit"
BETTER_AUTH_SECRET="your-super-secret-key-32-chars-minimum"
GEMINI_API_KEY="your-gemini-api-key"
\`\`\`

### Step 3: Run Development Server
Start the Turborepo development server:

\`\`\`bash
spark dev
\`\`\`

Your application web dashboard will be live at \`http://localhost:3000\` and the tRPC API service at \`http://localhost:3001\`.
    `,
    codeSnippets: [
      {
        language: 'typescript',
        filename: 'sparkkit.config.ts',
        code: `import { createSparkKit } from '@sparkkit/core';
import { authPlugin } from '@sparkkit/auth';
import { aiPlugin } from '@sparkkit/ai';

export default createSparkKit({
  appName: 'Acme SaaS',
  environment: 'development',
  plugins: [
    authPlugin({ passkeys: true, oauth: ['github', 'google'] }),
    aiPlugin({ defaultModel: 'gemini-2.5-flash', vectorRAG: true })
  ]
});`
      }
    ]
  },
  {
    id: 'monorepo-architecture',
    title: 'Monorepo Architecture & Turborepo',
    category: 'Architecture',
    description: 'Deep dive into SparkKit package structure, boundaries, and remote caching.',
    content: `
SparkKit utilizes Turborepo to ensure lightning-fast builds, strict workspace boundaries, and seamless code sharing across applications and services.

### Directory Overview
- \`apps/web\`: Next.js 15 App Router application with React 19 server components.
- \`apps/api\`: Standalone tRPC backend server over Express/Node.js.
- \`packages/core\`: Core plugin manager, event emitter, and app configuration.
- \`packages/auth\`: Better Auth integration, OAuth, Passkey credentials, and RBAC helpers.
- \`packages/db\`: Prisma ORM client with PostgreSQL connection pooling and multi-tenant scoping.
- \`packages/ai\`: Vercel AI SDK wrappers, Gemini 2.5 Flash, RAG vector search, and agent orchestration.
- \`packages/ui\`: Tailwind CSS v4 component library with shadcn design patterns.
    `,
    codeSnippets: [
      {
        language: 'json',
        filename: 'turbo.json',
        code: `{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {}
  }
}`
      }
    ]
  },
  {
    id: 'authentication-rbac',
    title: 'Authentication, Passkeys & RBAC',
    category: 'Auth & Multi-Tenancy',
    description: 'Secure multi-tenant authentication powered by Better Auth, Passkeys, OAuth 2.0, and Role-Based Access Control.',
    content: `
SparkKit provides enterprise-grade authentication out of the box with zero boilerplate.

### Key Features:
1. **Passkeys & WebAuthn**: Passwordless biometric authentication built-in.
2. **Social OAuth**: One-click GitHub, Google, Microsoft, and WorkOS SSO.
3. **Multi-Tenant Organizations**: Isolates users into workspaces with distinct billing, team roles, and member permissions.
4. **RBAC Guard**: Enforce \`OWNER\`, \`ADMIN\`, \`MEMBER\`, and \`VIEWER\` policies at both tRPC procedure level and React component level.
    `,
    codeSnippets: [
      {
        language: 'typescript',
        filename: 'packages/api/src/procedures.ts',
        code: `import { protectedProcedure } from './trpc';
import { z } from 'zod';

export const adminDeleteUser = protectedProcedure
  .input(z.object({ targetUserId: z.string() }))
  .use(async ({ ctx, next }) => {
    if (ctx.member.role !== 'OWNER' && ctx.member.role !== 'ADMIN') {
      throw new Error('UNAUTHORIZED: Admin privilege required');
    }
    return next();
  })
  .mutation(async ({ input, ctx }) => {
    return ctx.db.user.delete({ where: { id: input.targetUserId } });
  });`
      }
    ]
  },
  {
    id: 'ai-agents-rag',
    title: 'AI Agents SDK & Vector RAG',
    category: 'AI & Intelligence',
    description: 'How to build stateful AI Agents with Gemini, OpenAI, tool calling, and pgvector knowledge retrieval.',
    content: `
SparkKit features a dedicated \`@sparkkit/ai\` package designed to bring AI natively into your application.

### Key AI Capabilities:
- **Multi-Model Support**: Native support for Gemini 2.5 Flash, GPT-4o, and Claude 3.5 Sonnet.
- **RAG Engine**: Automatic text chunking and vector embedding stored directly in PostgreSQL via \`pgvector\`.
- **Tool Execution**: Give agents access to database queries, email sending, web search, or custom tRPC endpoints.
- **Streaming Hooks**: Ready-to-use React hooks (\`useAgentChat\`, \`useAgentStream\`) for UI interaction.
    `,
    codeSnippets: [
      {
        language: 'typescript',
        filename: 'packages/ai/src/supportAgent.ts',
        code: `import { createSparkAgent } from '@sparkkit/ai';
import { vectorSearch } from '@sparkkit/ai/rag';

export const customerSupportAgent = createSparkAgent({
  model: 'gemini-2.5-flash',
  systemPrompt: 'You are an expert customer support agent for SparkKit.',
  async beforeResponse(userPrompt, orgId) {
    // Automatically retrieve relevant knowledge base articles
    const contextDocs = await vectorSearch({ query: userPrompt, orgId, topK: 3 });
    return \`Relevant Knowledge:\\n\${contextDocs.join('\\n')}\\n\\nUser Query: \${userPrompt}\`;
  }
});`
      }
    ]
  },
  {
    id: 'database-prisma',
    title: 'Database & Prisma ORM',
    category: 'Database & Storage',
    description: 'PostgreSQL connection pooling, multi-tenant row isolation, and Prisma schema management.',
    content: `
Database interactions in SparkKit are powered by Prisma ORM and optimized for high-concurrency cloud environments like Sparkbase Cloud and Cloud Run.

### Database Scoping & Security
Every query can be scoped to the currently active organization automatically using SparkKit's \`tenantClient\` extension:

\`\`\`typescript
import { db, tenantClient } from '@sparkkit/db';

// Automatically injects organizationId filter into all queries
const scopedDb = tenantClient(db, { organizationId: currentOrgId });
const projects = await scopedDb.project.findMany(); // WHERE organizationId = currentOrgId
\`\`\`
    `,
    codeSnippets: [
      {
        language: 'typescript',
        filename: 'packages/db/src/tenant.ts',
        code: `import { PrismaClient } from '@prisma/client';

export function tenantClient(prisma: PrismaClient, ctx: { organizationId: string }) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (['findMany', 'findFirst', 'count'].includes(operation)) {
            args.where = { ...args.where, organizationId: ctx.organizationId };
          }
          return query(args);
        }
      }
    }
  });
}`
      }
    ]
  },
  {
    id: 'trpc-api-architecture',
    title: 'tRPC End-to-End Type Safety',
    category: 'API & Communications',
    description: 'Full-stack type safety without code generation using tRPC routers and Zod validations.',
    content: `
tRPC powers the communication layer between Next.js server components / client UI and backend services.

### Why tRPC in SparkKit?
- **Zero API Generation Steps**: Changes in backend types reflect immediately in React code.
- **Context Awareness**: User session, active organization, and database connection are automatically injected into every request.
- **Batching & Performance**: Multiple tRPC requests are automatically batched into single HTTP requests.
    `,
    codeSnippets: [
      {
        language: 'typescript',
        filename: 'packages/api/src/routers/organization.ts',
        code: `import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const organizationRouter = router({
  getMembers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.member.findMany({
      where: { organizationId: ctx.organization.id },
      include: { user: true }
    });
  }),
  updateName: protectedProcedure
    .input(z.object({ name: z.string().min(2) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.organization.update({
        where: { id: ctx.organization.id },
        data: { name: input.name }
      });
    })
});`
      }
    ]
  },
  {
    id: 'plugin-system',
    title: 'SparkKit Plugin Architecture',
    category: 'Extensibility',
    description: 'Extend SparkKit with custom hooks, middleware, and third-party integrations.',
    content: `
SparkKit features a lightweight event-driven plugin system that allows developers to customize application behavior cleanly.

### Creating a Custom Plugin
Plugins can tap into life-cycle events such as user signups, AI agent calls, billing changes, and webhook dispatches.
    `,
    codeSnippets: [
      {
        language: 'typescript',
        filename: 'packages/plugins/auditLoggerPlugin.ts',
        code: `import { definePlugin } from '@sparkkit/core';

export const auditLoggerPlugin = definePlugin({
  name: 'audit-logger-plugin',
  version: '1.0.0',
  hooks: {
    async onAuthSuccess(user, ctx) {
      await ctx.db.auditLog.create({
        data: {
          action: 'user.login',
          entity: 'User',
          details: { userId: user.id, email: user.email },
          organizationId: ctx.currentOrgId
        }
      });
    }
  }
});`
      }
    ]
  },
  {
    id: 'sparkbase-cloud-deployment',
    title: 'Deploying to Sparkbase Cloud',
    category: 'Deployment & Infra',
    description: 'One-click deployment, managed PostgreSQL with pgvector, edge routing, and monitoring.',
    content: `
While SparkKit is 100% open-source and self-hostable anywhere via Docker or Vercel, **Sparkbase Cloud** is the managed platform built specifically for SparkKit applications.

### Sparkbase Cloud Managed Features:
- **Managed PostgreSQL**: Automated daily backups, zero-downtime migrations, built-in \`pgvector\` support.
- **AI Gateway & Proxy**: Unified rate-limiting, caching, and prompt cost monitoring for Gemini, OpenAI, and Anthropic.
- **Serverless Redis Queue**: Managed background jobs and cron scheduler.
- **Zero-Config Deployment**: Run \`spark deploy\` and your monorepo is deployed globally in under 30 seconds.
    `,
    codeSnippets: [
      {
        language: 'bash',
        filename: 'Terminal',
        code: `# Authenticate and deploy to Sparkbase Cloud
npx spark deploy --cloud

# Output:
✔ Build succeeded (0.32s)
✔ Database migrated
🌐 App live: https://my-app.sparkbase.cloud`
      }
    ]
  }
];
