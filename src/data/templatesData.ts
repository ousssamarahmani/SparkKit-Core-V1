import { SparkTemplate } from '../types';

export const officialTemplates: SparkTemplate[] = [
  {
    id: 'ai-saas',
    name: 'AI SaaS Foundation',
    category: 'AI',
    description: 'Production-ready AI Copilot application with Gemini 2.5 Flash, credit billing, prompt library, and RAG document search.',
    badge: 'Popular',
    features: ['Vercel AI SDK Integration', 'Stripe Credit Refill & Subscriptions', 'Vector Document RAG', 'Dark / Light Theme UI', 'Audit Trail'],
    stack: ['Next.js 15', 'Gemini 2.5', 'Better Auth', 'Prisma Vector', 'Tailwind CSS v4'],
    cliCommand: 'npx create-sparkkit my-ai-app --template ai-saas',
    routeStructure: ['/app/dashboard', '/app/chat', '/app/documents', '/app/billing', '/app/settings'],
    mockData: {
      title: 'Spark AI Workspace',
      subtitle: 'Generate marketing campaigns, analyze documents, and automate content generation.',
      metrics: [
        { label: 'Token Credits', value: '84,500 / 100k', change: '+12% refill' },
        { label: 'RAG Embeddings', value: '1,420 Docs', change: 'Updated 2m ago' },
        { label: 'Agent Runs', value: '3,892', change: '99.8% success' }
      ],
      actions: ['New AI Chat', 'Upload Knowledge Doc', 'Refill Credits', 'Manage API Keys']
    }
  },
  {
    id: 'agent-platform',
    name: 'Autonomous Agent Platform',
    category: 'AI',
    description: 'Multi-agent orchestration studio with visual workflow canvas, custom tool execution, and execution logs.',
    badge: 'AI Native',
    features: ['Visual Agent Flow Editor', 'Custom Tool Definitions', 'Long-term Memory Context', 'Webhook Triggers', 'Execution Telemetry'],
    stack: ['Next.js 15', 'tRPC', 'Gemini / Claude', 'Redis Queue', 'PostgreSQL'],
    cliCommand: 'npx create-sparkkit agent-studio --template agent-platform',
    routeStructure: ['/agents', '/tools', '/canvas', '/logs', '/settings'],
    mockData: {
      title: 'Spark Agent Orchestrator',
      subtitle: 'Build, test, and deploy autonomous AI agents with background workers and custom tool APIs.',
      metrics: [
        { label: 'Active Agents', value: '12 Deployed', change: '3 running' },
        { label: 'Avg Latency', value: '240ms', change: '-35ms' },
        { label: 'Tool Invocations', value: '18,400', change: '100% type safe' }
      ],
      actions: ['Create New Agent', 'Add Custom Tool', 'Simulate Flow', 'View Traces']
    }
  },
  {
    id: 'multi-tenant-saas',
    name: 'Multi-Tenant Enterprise SaaS',
    category: 'SaaS',
    description: 'B2B SaaS starter with organization switching, custom domain support, RBAC permissions, and team invite flows.',
    badge: 'Enterprise',
    features: ['Organization Isolation', 'RBAC & Custom Roles', 'SAML SSO & Passkeys', 'Stripe Customer Portal', 'Usage Metering'],
    stack: ['Next.js 15', 'Better Auth', 'Prisma', 'Stripe', 'Tailwind v4'],
    cliCommand: 'npx create-sparkkit enterprise-saas --template multi-tenant-saas',
    routeStructure: ['/org/[slug]/dashboard', '/org/[slug]/members', '/org/[slug]/billing', '/org/[slug]/audit-logs'],
    mockData: {
      title: 'Acme Corp Workspace',
      subtitle: 'Manage team members, assign granular access roles, and monitor organization spending.',
      metrics: [
        { label: 'Team Members', value: '28 Users', change: '4 Pending Invites' },
        { label: 'Current Plan', value: 'Enterprise Tier', change: 'Renews Dec 2026' },
        { label: 'API Usage', value: '142k Calls', change: 'Within quota' }
      ],
      actions: ['Invite Team Member', 'Create API Key', 'Upgrade Seats', 'Export Audit Log']
    }
  },
  {
    id: 'crm',
    name: 'Modern Customer CRM',
    category: 'SaaS',
    description: 'Pipeline tracker with deal stages, contact timeline, activity feed, and automated email sequences via Resend.',
    badge: 'Featured',
    features: ['Kanban Deal Pipeline', 'Contact Timeline History', 'Email Sequence Automation', 'Custom Fields', 'Analytics Dashboard'],
    stack: ['Next.js 15', 'Resend', 'Prisma', 'recharts', 'Tailwind v4'],
    cliCommand: 'npx create-sparkkit my-crm --template crm',
    routeStructure: ['/crm/pipeline', '/crm/contacts', '/crm/deals', '/crm/analytics'],
    mockData: {
      title: 'Revenue Pipeline & Deals',
      subtitle: 'Track active sales leads, schedule follow-up tasks, and calculate monthly recurring revenue.',
      metrics: [
        { label: 'Pipeline Value', value: '$348,000', change: '+$42k this week' },
        { label: 'Active Deals', value: '47 Leads', change: '12 in Negotiation' },
        { label: 'Win Rate', value: '64.2%', change: '+4.1%' }
      ],
      actions: ['Add Deal', 'Import Leads', 'Send Email Batch', 'Export CSV']
    }
  },
  {
    id: 'internal-tool',
    name: 'Internal Admin Backoffice',
    category: 'Internal',
    description: 'High-density admin interface with data grid filtering, bulk operations, user impersonation, and database operations.',
    badge: 'Operations',
    features: ['High-density Data Grid', 'User Impersonation', 'SQL & Model Inspector', 'Batch Actions', 'Role Guarding'],
    stack: ['Next.js 15', 'tRPC', 'Prisma', 'Tailwind v4'],
    cliCommand: 'npx create-sparkkit ops-portal --template internal-tool',
    routeStructure: ['/admin/users', '/admin/orders', '/admin/system-health', '/admin/feature-flags'],
    mockData: {
      title: 'System Administration Console',
      subtitle: 'Inspect platform entities, manage feature flags, and perform emergency operations.',
      metrics: [
        { label: 'Total Registered', value: '14,290 Users', change: '+240 today' },
        { label: 'Active Incidents', value: '0 Open', change: 'All systems green' },
        { label: 'Queue Backlog', value: '0 Jobs', change: 'Latency 12ms' }
      ],
      actions: ['Toggle Feature Flag', 'Impersonate User', 'Flush Redis Cache', 'View DB Logs']
    }
  },
  {
    id: 'dashboard',
    name: 'Executive Analytics Dashboard',
    category: 'SaaS',
    description: 'Data visualization suite with real-time charts, metric cards, interactive filtering, and scheduled report delivery.',
    badge: 'Analytics',
    features: ['Recharts Integration', 'Export PDF/CSV Reports', 'Real-time WebSocket Feed', 'Custom Widget Grid'],
    stack: ['Next.js 15', 'Recharts', 'tRPC', 'Tailwind v4'],
    cliCommand: 'npx create-sparkkit analytics-dash --template dashboard',
    routeStructure: ['/metrics/overview', '/metrics/revenue', '/metrics/retention', '/metrics/reports'],
    mockData: {
      title: 'Executive Metrics & Growth',
      subtitle: 'Comprehensive overview of MRR, churn rates, customer acquisition costs, and user engagement.',
      metrics: [
        { label: 'Monthly Revenue', value: '$128,450', change: '+18.4% MoM' },
        { label: 'Net Retention', value: '112%', change: 'Industry benchmark' },
        { label: 'Active Sessions', value: '2,891', change: 'Live right now' }
      ],
      actions: ['Export Report', 'Change Date Range', 'Configure Alerts', 'Share Board']
    }
  },
  {
    id: 'helpdesk',
    name: 'Customer Support Helpdesk',
    category: 'Enterprise',
    description: 'Ticket management portal with AI auto-replies, SLA timers, knowledge base integration, and customer portal.',
    badge: 'Support',
    features: ['Ticket Queue Management', 'AI Draft Assistant', 'SLA Countdown Timers', 'Customer Knowledge Base'],
    stack: ['Next.js 15', 'Gemini AI', 'Better Auth', 'Resend', 'Prisma'],
    cliCommand: 'npx create-sparkkit support-hub --template helpdesk',
    routeStructure: ['/tickets', '/knowledge-base', '/customers', '/sla-rules'],
    mockData: {
      title: 'Customer Support Portal',
      subtitle: 'Manage support tickets, auto-generate answers with Gemini RAG, and maintain 99%+ SLA compliance.',
      metrics: [
        { label: 'Open Tickets', value: '14 Tickets', change: '2 Urgent SLA' },
        { label: 'Avg Resolution', value: '18 mins', change: 'AI deflection 45%' },
        { label: 'Satisfaction', value: '98.6%', change: '4.9/5 stars' }
      ],
      actions: ['Create Ticket', 'AI Auto-Draft Reply', 'Publish Article', 'SLA Config']
    }
  },
  {
    id: 'cms',
    name: 'Headless Content Management',
    category: 'CMS',
    description: 'Modern content editor with block builder, media asset manager, publishing workflows, and preview URLs.',
    badge: 'Content',
    features: ['Visual Block Editor', 'S3 Storage File Manager', 'Draft / Publish Lifecycle', 'GraphQL & tRPC API'],
    stack: ['Next.js 15', 'TipTap Editor', 'S3 Compatible Storage', 'Prisma'],
    cliCommand: 'npx create-sparkkit headless-cms --template cms',
    routeStructure: ['/cms/posts', '/cms/media', '/cms/categories', '/cms/api-keys'],
    mockData: {
      title: 'Spark Content Studio',
      subtitle: 'Author articles, manage media uploads, and deliver structured content across web and mobile apps.',
      metrics: [
        { label: 'Published Posts', value: '142 Articles', change: '3 Drafts' },
        { label: 'Media Assets', value: '8.4 GB', change: 'S3 CDN connected' },
        { label: 'API Requests', value: '1.2M / mo', change: 'Cached at edge' }
      ],
      actions: ['New Article', 'Upload Asset', 'Preview Live', 'Manage Schema']
    }
  },
  {
    id: 'landing-page',
    name: 'High-Converting SaaS Landing Page',
    category: 'SaaS',
    description: 'SEO-optimized marketing template with dark luxury theme, waitlist collection, pricing table, and testimonials.',
    badge: 'Growth',
    features: ['Next.js 15 SSG & Edge', 'SEO Metadata & OpenGraph', 'Waitlist Email Capture', 'Tailwind Motion Animations'],
    stack: ['Next.js 15', 'Motion', 'Resend', 'Tailwind v4'],
    cliCommand: 'npx create-sparkkit saas-landing --template landing-page',
    routeStructure: ['/', '/pricing', '/about', '/blog', '/contact'],
    mockData: {
      title: 'SparkKit Landing Marketing Suite',
      subtitle: 'Stunning marketing hero, interactive pricing toggle, social proof stats, and instant lead capture.',
      metrics: [
        { label: 'Waitlist Subscribers', value: '4,820 Leads', change: '+340 today' },
        { label: 'Lighthouse Score', value: '100 / 100', change: 'Perfect performance' },
        { label: 'Conversion Rate', value: '8.4%', change: 'A/B tested' }
      ],
      actions: ['Edit Hero Headline', 'Export Leads CSV', 'Toggle Dark Mode', 'Deploy to Vercel']
    }
  },
  {
    id: 'api-only',
    name: 'Headless API Microservice',
    category: 'Enterprise',
    description: 'Standalone tRPC and REST service with API Key authentication, rate limiting, and OpenAPI docs.',
    badge: 'API Native',
    features: ['tRPC + Express Server', 'OpenAPI & Swagger Spec', 'Redis Token Bucket Rate Limiter', 'Structured Pino Logger'],
    stack: ['Node.js', 'Express', 'tRPC', 'Prisma', 'Redis'],
    cliCommand: 'npx create-sparkkit api-service --template api-only',
    routeStructure: ['/trpc/*', '/api/v1/*', '/docs/swagger', '/health'],
    mockData: {
      title: 'Headless tRPC & REST Microservice',
      subtitle: 'High-throughput standalone API backend ready for mobile apps, serverless functions, and web hooks.',
      metrics: [
        { label: 'Requests / sec', value: '4,500 req/s', change: 'p99 latency 8ms' },
        { label: 'Active API Keys', value: '184 Keys', change: 'Rate limit enforced' },
        { label: 'Server Uptime', value: '99.99%', change: 'Zero downtime' }
      ],
      actions: ['Generate API Key', 'View OpenAPI Spec', 'Run Load Test', 'Health Check']
    }
  }
];
