import { MonorepoNode } from '../types';

export const monorepoTree: MonorepoNode = {
  name: 'sparkkit',
  type: 'directory',
  path: '/',
  description: 'SparkKit Turborepo Monorepo Root',
  children: [
    {
      name: 'apps',
      type: 'directory',
      path: '/apps',
      description: 'Applications built on top of @sparkkit packages',
      children: [
        {
          name: 'web',
          type: 'directory',
          path: '/apps/web',
          description: 'Next.js 15 Web Application & App Router dashboard',
          children: [
            {
              name: 'package.json',
              type: 'file',
              path: '/apps/web/package.json',
              content: `{
  "name": "@sparkkit/app-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@sparkkit/ai": "workspace:*",
    "@sparkkit/auth": "workspace:*",
    "@sparkkit/db": "workspace:*",
    "@sparkkit/ui": "workspace:*",
    "@sparkkit/api": "workspace:*",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`
            },
            {
              name: 'src/app/page.tsx',
              type: 'file',
              path: '/apps/web/src/app/page.tsx',
              content: `import { createSparkApp } from '@sparkkit/core';
import { AuthGuard } from '@sparkkit/auth/components';
import { AgentChat } from '@sparkkit/ai/components';

export default async function DashboardPage() {
  return (
    <AuthGuard requiredRole="MEMBER">
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">SparkKit Workspace</h1>
        <AgentChat agentId="default-assistant" />
      </div>
    </AuthGuard>
  );
}`
            }
          ]
        },
        {
          name: 'api',
          type: 'directory',
          path: '/apps/api',
          description: 'Standalone Node.js / Express / tRPC Server instance',
          children: [
            {
              name: 'src/index.ts',
              type: 'file',
              path: '/apps/api/src/index.ts',
              content: `import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter, createContext } from '@sparkkit/api';

const app = express();
app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));
app.listen(3001, () => console.log('SparkKit API running on port 3001'));`
            }
          ]
        }
      ]
    },
    {
      name: 'packages',
      type: 'directory',
      path: '/packages',
      description: 'Core modular SparkKit TypeScript packages',
      children: [
        {
          name: 'core',
          type: 'directory',
          path: '/packages/core',
          packageDetails: {
            version: '1.2.0',
            description: 'Core application engine, plugin manager, and context provider',
            exports: ['createSparkKit()', 'definePlugin()', 'useSparkContext()'],
            dependencies: ['zod', 'events']
          },
          children: [
            {
              name: 'src/index.ts',
              type: 'file',
              path: '/packages/core/src/index.ts',
              content: `import { z } from 'zod';

export interface SparkConfig {
  appName: string;
  environment: 'development' | 'production' | 'test';
  plugins?: SparkPlugin[];
}

export interface SparkPlugin {
  name: string;
  version: string;
  setup?: (ctx: SparkContext) => void | Promise<void>;
  hooks?: {
    onAuthSuccess?: (user: unknown) => void;
    beforeAgentExecution?: (payload: unknown) => void;
    onWebhookEvent?: (event: unknown) => void;
  };
}

export class SparkContext {
  private plugins = new Map<string, SparkPlugin>();

  constructor(public config: SparkConfig) {
    config.plugins?.forEach(p => this.plugins.set(p.name, p));
  }

  async init() {
    for (const plugin of this.plugins.values()) {
      if (plugin.setup) await plugin.setup(this);
    }
  }
}

export function createSparkKit(config: SparkConfig) {
  return new SparkContext(config);
}`
            }
          ]
        },
        {
          name: 'auth',
          type: 'directory',
          path: '/packages/auth',
          packageDetails: {
            version: '1.2.0',
            description: 'Better Auth wrappers, Passkeys, OAuth, Multi-Tenancy & RBAC',
            exports: ['authHandler', 'useSession()', 'requirePermission()', 'organizationRouter'],
            dependencies: ['better-auth', '@sparkkit/db']
          },
          children: [
            {
              name: 'src/index.ts',
              type: 'file',
              path: '/packages/auth/src/index.ts',
              content: `import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@sparkkit/db';

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! },
    google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }
  },
  plugins: [
    // Passkeys, Organizations, API Keys
  ]
});`
            }
          ]
        },
        {
          name: 'ai',
          type: 'directory',
          path: '/packages/ai',
          packageDetails: {
            version: '1.2.0',
            description: 'Vercel AI SDK, Gemini/OpenAI/Anthropic agent engine, RAG & Vector store',
            exports: ['createSparkAgent()', 'vectorSearch()', 'promptManager', 'useAgentChat()'],
            dependencies: ['ai', '@google/genai', '@sparkkit/db']
          },
          children: [
            {
              name: 'src/agent.ts',
              type: 'file',
              path: '/packages/ai/src/agent.ts',
              content: `import { generateText, streamText } from 'ai';
import { GoogleGenAI } from '@google/genai';

export interface AgentConfig {
  model: 'gemini-2.5-flash' | 'gpt-4o' | 'claude-3-5-sonnet';
  systemPrompt: string;
  tools?: Record<string, any>;
  temperature?: number;
}

export function createSparkAgent(config: AgentConfig) {
  return {
    async run(prompt: string) {
      // Automatic memory context injection & RAG vector search
      return generateText({
        model: config.model as any,
        system: config.systemPrompt,
        prompt,
      });
    },
    async stream(prompt: string) {
      return streamText({
        model: config.model as any,
        system: config.systemPrompt,
        prompt,
      });
    }
  };
}`
            }
          ]
        },
        {
          name: 'db',
          type: 'directory',
          path: '/packages/db',
          packageDetails: {
            version: '1.2.0',
            description: 'Prisma Client, PostgreSQL connection pool, multi-tenant extension',
            exports: ['db', 'PrismaClient', 'tenantClient()'],
            dependencies: ['@prisma/client']
          },
          children: [
            {
              name: 'prisma/schema.prisma',
              type: 'file',
              path: '/packages/db/prisma/schema.prisma',
              content: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  memberships   Member[]
  apiKeys       ApiKey[]
  createdAt     DateTime @default(now())
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  members     Member[]
  createdAt   DateTime @default(now())
}

model Member {
  id             String       @id @default(cuid())
  role           String       @default("MEMBER")
  userId         String
  organizationId String
  user           User         @relation(fields: [userId], references: [id])
  organization   Organization @relation(fields: [organizationId], references: [id])
}`
            }
          ]
        },
        {
          name: 'ui',
          type: 'directory',
          path: '/packages/ui',
          packageDetails: {
            version: '1.2.0',
            description: 'Tailwind CSS v4 + shadcn UI components, charts, agent widgets',
            exports: ['Button', 'Card', 'AgentChatUI', 'DataGrid', 'CommandMenu'],
            dependencies: ['lucide-react', 'motion', 'clsx', 'tailwind-merge']
          }
        },
        {
          name: 'api',
          type: 'directory',
          path: '/packages/api',
          packageDetails: {
            version: '1.2.0',
            description: 'tRPC Root Router, Context creation, Procedures with RBAC',
            exports: ['appRouter', 'createContext', 'protectedProcedure'],
            dependencies: ['@trpc/server', 'zod', '@sparkkit/auth', '@sparkkit/db']
          }
        },
        {
          name: 'cli',
          type: 'directory',
          path: '/packages/cli',
          packageDetails: {
            version: '1.2.0',
            description: 'SparkKit CLI tool (spark & create-sparkkit)',
            exports: ['bin/spark', 'bin/create-sparkkit'],
            dependencies: ['commander', 'clack/prompts', 'execa', 'chalk']
          }
        }
      ]
    },
    {
      name: 'tooling',
      type: 'directory',
      path: '/tooling',
      description: 'Shared ESLint, TypeScript, Tailwind, and Vitest configurations',
      children: [
        { name: 'typescript-config', type: 'directory', path: '/tooling/typescript-config' },
        { name: 'eslint-config', type: 'directory', path: '/tooling/eslint-config' },
        { name: 'tailwind-config', type: 'directory', path: '/tooling/tailwind-config' }
      ]
    },
    {
      name: 'templates',
      type: 'directory',
      path: '/templates',
      description: '10 Official Starter Templates for SparkKit CLI',
      children: [
        { name: 'ai-saas', type: 'directory', path: '/templates/ai-saas' },
        { name: 'crm', type: 'directory', path: '/templates/crm' },
        { name: 'internal-tool', type: 'directory', path: '/templates/internal-tool' },
        { name: 'agent-platform', type: 'directory', path: '/templates/agent-platform' },
        { name: 'multi-tenant-saas', type: 'directory', path: '/templates/multi-tenant-saas' }
      ]
    },
    {
      name: 'docs',
      type: 'directory',
      path: '/docs',
      description: 'Official Documentation site content and OpenAPI definitions'
    }
  ]
};
