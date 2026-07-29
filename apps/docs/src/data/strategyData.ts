import { StrategySection } from '../types';

export const monetizationStrategy: StrategySection[] = [
  {
    id: 'duality',
    title: 'The SparkKit / Sparkbase Cloud Duality',
    summary: 'Open Source Developer Toolkit (SparkKit) + Commercial Platform (Sparkbase Cloud)',
    points: [
      {
        title: 'SparkKit (100% Free Open Source)',
        description: 'Complete monorepo toolkit, all packages, database schemas, CLI, and starter templates. Developers can self-host on AWS, DigitalOcean, GCP, or Docker with zero restrictions.'
      },
      {
        title: 'Sparkbase Cloud (Managed Commercial SaaS)',
        description: 'When teams want instant managed infrastructure, zero-ops deployments, automated pgvector database scaling, unified AI cost gateway, and enterprise SLA, they deploy to Sparkbase Cloud with `spark deploy`.'
      }
    ]
  },
  {
    id: 'cloud-tiers',
    title: 'Sparkbase Cloud Tiered Model',
    summary: 'Predictable, developer-friendly pricing built around compute, AI token pass-through, and team seats.',
    points: [
      {
        title: 'Developer Free Tier',
        description: '$0 / month. 1 Managed Postgres (512MB + pgvector), 100k AI Gateway Tokens / mo, 1 project, community support.',
        tag: 'Free Forever'
      },
      {
        title: 'Pro Team Tier',
        description: '$29 / workspace / month + usage. Dedicated Postgres instance, unlimited preview environments, 5M AI Gateway Tokens, custom domains.',
        tag: 'Most Popular'
      },
      {
        title: 'Enterprise Managed Tier',
        description: '$499 / month. Dedicated VPC, SOC2 compliance, multi-region database failover, priority 24/7 SLA, custom AI model hosting.',
        tag: 'Enterprise'
      }
    ]
  },
  {
    id: 'ai-gateway',
    title: 'AI Gateway & Add-On Monetization',
    summary: 'Value-added managed cloud services that naturally upgrade developer capabilities.',
    points: [
      {
        title: 'Unified AI Gateway',
        description: 'Single endpoint proxy for Gemini, OpenAI, Anthropic with prompt caching, cost controls, and rate-limiting.'
      },
      {
        title: 'Managed RAG Vector Database',
        description: 'Automatic document indexing and HNSW vector indexing without managing pgvector extensions manually.'
      },
      {
        title: 'Background Job & Cron Queue',
        description: 'Serverless Redis worker pool powering `@sparkkit/queue` with zero maintenance.'
      }
    ]
  }
];

export const openSourceStrategy: StrategySection[] = [
  {
    id: 'governance',
    title: 'Open Source Governance & Permissive MIT',
    summary: 'Building trust through true open source commitments and community ownership.',
    points: [
      {
        title: 'MIT License Security',
        description: 'No SSPL or restrictive licenses. SparkKit core packages will remain 100% MIT licensed forever.'
      },
      {
        title: 'Open RFC Process',
        description: 'Architectural changes and package additions are discussed publicly via GitHub RFCs.'
      },
      {
        title: 'Transparency',
        description: 'Public roadmap, release notes, and automated benchmark dashboards.'
      }
    ]
  }
];

export const communityFlywheel: StrategySection[] = [
  {
    id: 'flywheel',
    title: 'The 20k+ Star Community Engine',
    summary: 'Organic adoption flywheel driven by developer experience, templates, and content.',
    points: [
      {
        title: 'Template Directory Marketplace',
        description: 'Community members can submit open-source templates and earn recognition or bounties.'
      },
      {
        title: 'Discord & Builder Community',
        description: 'Weekly office hours, live coding sessions, and showcase channels for SparkKit apps.'
      },
      {
        title: 'Certified Partner Network',
        description: 'Agency partners building client applications on SparkKit receive leads and priority support.'
      }
    ]
  }
];
