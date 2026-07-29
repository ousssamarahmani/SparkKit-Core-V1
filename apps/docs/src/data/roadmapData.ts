import { RoadmapMilestone } from '../types';

export const roadmapMilestones: RoadmapMilestone[] = [
  {
    version: 'v0.1 - Beta Core',
    quarter: 'Q1 2026',
    title: 'Foundation & Core Monorepo',
    status: 'released',
    summary: 'Initial open-source release establishing Turborepo architecture, @sparkkit/core, and basic CLI.',
    features: [
      { name: '@sparkkit/core', category: 'Core', description: 'Plugin runner and app context initialization', completed: true },
      { name: '@sparkkit/auth', category: 'Auth', description: 'Better Auth integration with GitHub and Google OAuth', completed: true },
      { name: '@sparkkit/db', category: 'DB', description: 'Prisma client with PostgreSQL driver', completed: true },
      { name: 'create-sparkkit CLI', category: 'CLI', description: 'Interactive project scaffolder', completed: true }
    ]
  },
  {
    version: 'v1.0 - Production Launch',
    quarter: 'Q2 2026',
    title: 'AI Native & Multi-Tenancy',
    status: 'released',
    summary: 'Full production release introducing native AI Agent SDK, Passkey authentication, and 10 official templates.',
    features: [
      { name: '@sparkkit/ai', category: 'AI Native', description: 'Gemini 2.5 Flash, Vercel AI SDK and pgvector RAG', completed: true },
      { name: 'Passkey Auth', category: 'Auth', description: 'WebAuthn biometric passwordless login', completed: true },
      { name: 'Organization RBAC', category: 'Tenancy', description: 'Multi-tenant isolation and fine-grained roles', completed: true },
      { name: '10 Starter Templates', category: 'Templates', description: 'AI SaaS, CRM, Agent Studio, Multi-Tenant SaaS, etc.', completed: true },
      { name: 'spark doctor', category: 'CLI', description: 'System diagnostic health checker', completed: true }
    ]
  },
  {
    version: 'v1.5 - Ecosystem & Extensions',
    quarter: 'Q3 2026',
    title: 'Plugin Registry & Sparkbase Cloud Engine',
    status: 'in-progress',
    summary: 'Expanding third-party plugin ecosystem, serverless Redis job queue, and one-click Sparkbase Cloud deployment.',
    features: [
      { name: 'Plugin Registry', category: 'Plugins', description: '@sparkkit/plugin-stripe, @sparkkit/plugin-resend', completed: true },
      { name: '@sparkkit/queue', category: 'Async', description: 'Redis-backed background worker and cron scheduler', completed: false },
      { name: 'spark deploy --cloud', category: 'Cloud', description: 'Seamless deployment to Sparkbase Cloud edge', completed: true },
      { name: 'OpenTelemetry Telemetry', category: 'Observability', description: 'Distributed tracing across tRPC procedures', completed: false }
    ]
  },
  {
    version: 'v2.0 - Enterprise AI Mesh',
    quarter: 'Q4 2026',
    title: 'Distributed Agents & Self-Healing Architecture',
    status: 'planned',
    summary: 'Next generation multi-agent swarm protocol, real-time audio Live API integration, and self-repairing database migrations.',
    features: [
      { name: 'Agent Swarm Protocol', category: 'AI Native', description: 'Inter-agent communication and task delegator', completed: false },
      { name: 'Gemini Live Audio API', category: 'AI Native', description: 'Real-time bidirectional speech with WebSockets', completed: false },
      { name: 'Automated Schema Healing', category: 'Database', description: 'Zero-downtime migration planner with AI rollbacks', completed: false },
      { name: 'Global Edge Database', category: 'Sparkbase Cloud', description: 'Multi-region PostgreSQL replication', completed: false }
    ]
  }
];
