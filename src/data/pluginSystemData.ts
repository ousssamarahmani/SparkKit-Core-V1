export interface SparkPluginSpec {
  id: string;
  name: string;
  npmPackage: string;
  description: string;
  category: 'Payments' | 'Auth' | 'AI' | 'Observability' | 'Storage';
  author: string;
  hooksUsed: string[];
  sampleCode: string;
}

export const pluginList: SparkPluginSpec[] = [
  {
    id: 'stripe-plugin',
    name: '@sparkkit/plugin-stripe',
    npmPackage: '@sparkkit/plugin-stripe',
    description: 'Automates Stripe checkout sessions, usage-based metering, customer portals, and webhook signature verification.',
    category: 'Payments',
    author: 'SparkKit Core Team',
    hooksUsed: ['onOrgCreated', 'onWebhookReceived', 'beforeBillingCheck'],
    sampleCode: `import { stripePlugin } from '@sparkkit/plugin-stripe';

export default createSparkKit({
  plugins: [
    stripePlugin({
      apiKey: process.env.STRIPE_SECRET_KEY!,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      products: [
        { id: 'prod_pro', name: 'Pro Tier', monthlyPriceId: 'price_pro_m' }
      ]
    })
  ]
});`
  },
  {
    id: 'gemini-agent-plugin',
    name: '@sparkkit/plugin-gemini-agent',
    npmPackage: '@sparkkit/plugin-gemini-agent',
    description: 'Extends SparkKit AI with Gemini 2.5 Flash, automatic grounding search tools, and structured JSON output schemas.',
    category: 'AI',
    author: 'SparkKit Core Team',
    hooksUsed: ['beforeAgentExecution', 'onTokenUsage', 'transformPromptContext'],
    sampleCode: `import { geminiAgentPlugin } from '@sparkkit/plugin-gemini-agent';

export default createSparkKit({
  plugins: [
    geminiAgentPlugin({
      apiKey: process.env.GEMINI_API_KEY!,
      enableSearchGrounding: true,
      enableThinkingMode: true
    })
  ]
});`
  },
  {
    id: 'sentry-observability-plugin',
    name: '@sparkkit/plugin-sentry',
    npmPackage: '@sparkkit/plugin-sentry',
    description: 'Distributed tracing across tRPC procedures, Prisma queries, and AI agent execution streams.',
    category: 'Observability',
    author: 'Community Contributor',
    hooksUsed: ['onError', 'beforeTrpcProcedure', 'onAgentExecutionFinish'],
    sampleCode: `import { sentryPlugin } from '@sparkkit/plugin-sentry';

export default createSparkKit({
  plugins: [
    sentryPlugin({
      dsn: process.env.SENTRY_DSN!,
      traceSampleRate: 1.0
    })
  ]
});`
  },
  {
    id: 's3-storage-plugin',
    name: '@sparkkit/plugin-s3',
    npmPackage: '@sparkkit/plugin-s3',
    description: 'Presigned upload URL generation, image optimization, and CDN file delivery for S3, Cloudflare R2, or MinIO.',
    category: 'Storage',
    author: 'SparkKit Core Team',
    hooksUsed: ['beforeFileUpload', 'afterFileUploadDelete'],
    sampleCode: `import { s3StoragePlugin } from '@sparkkit/plugin-s3';

export default createSparkKit({
  plugins: [
    s3StoragePlugin({
      bucket: 'my-spark-assets',
      region: 'us-east-1',
      endpoint: process.env.S3_ENDPOINT
    })
  ]
});`
  }
];
