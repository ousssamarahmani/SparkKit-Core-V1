import { SchemaModel } from '../types';

export const prismaSchemaRaw = `// SparkKit Production Prisma Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ==========================================
// 1. AUTHENTICATION & USERS (Better Auth)
// ==========================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified Boolean   @default(false)
  name          String?
  image         String?
  role          UserRole  @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  sessions      Session[]
  accounts      Account[]
  memberships   Member[]
  apiKeys       ApiKey[]
  auditLogs     AuditLog[]
  prompts       Prompt[]

  @@map("users")
}

enum UserRole {
  SUPER_ADMIN
  USER
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model Account {
  id           String   @id @default(cuid())
  userId       String
  accountId    String
  providerId   String
  accessToken  String?
  refreshToken String?
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("accounts")
}

// ==========================================
// 2. MULTI-TENANCY & ORGANIZATIONS
// ==========================================

model Organization {
  id            String         @id @default(cuid())
  name          String
  slug          String         @unique
  logo          String?
  plan          PlanType       @default(FREE)
  stripeCustId  String?        @unique
  createdAt     DateTime       @default(now())

  members       Member[]
  apiKeys       ApiKey[]
  subscriptions Subscription[]
  auditLogs     AuditLog[]
  agents        Agent[]
  knowledgeDocs KnowledgeDoc[]
  webhooks      Webhook[]
  featureFlags  FeatureFlag[]

  @@map("organizations")
}

enum PlanType {
  FREE
  PRO
  ENTERPRISE
}

model Member {
  id             String       @id @default(cuid())
  role           MemberRole   @default(MEMBER)
  userId         String
  organizationId String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@unique([userId, organizationId])
  @@map("members")
}

enum MemberRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

// ==========================================
// 3. API KEYS & SECURITY
// ==========================================

model ApiKey {
  id             String       @id @default(cuid())
  name           String
  keyHash        String       @unique
  prefix         String
  lastUsedAt     DateTime?
  userId         String
  organizationId String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@map("api_keys")
}

// ==========================================
// 4. BILLING & SUBSCRIPTIONS
// ==========================================

model Subscription {
  id                 String       @id @default(cuid())
  organizationId     String
  stripeSubscriptionId String     @unique
  stripePriceId      String
  status             String
  currentPeriodEnd   DateTime
  organization       Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@map("subscriptions")
}

// ==========================================
// 5. AI AGENTS, PROMPTS & VECTOR RAG
// ==========================================

model Agent {
  id             String       @id @default(cuid())
  name           String
  description    String?
  systemPrompt   String
  model          String       @default("gemini-2.5-flash")
  temperature    Float        @default(0.7)
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  executions     AgentExecution[]

  @@map("agents")
}

model KnowledgeDoc {
  id             String       @id @default(cuid())
  title          String
  content        String
  embedding      Unsupported("vector(1536)")?
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  @@map("knowledge_docs")
}

model AgentExecution {
  id        String   @id @default(cuid())
  agentId   String
  input     String
  output    String
  tokens    Int
  latencyMs Int
  agent     Agent    @relation(fields: [agentId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@map("agent_executions")
}

model Prompt {
  id        String   @id @default(cuid())
  title     String
  template  String
  version   Int      @default(1)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())

  @@map("prompts")
}

// ==========================================
// 6. SYSTEM AUDIT, WEBHOOKS & FLAGS
// ==========================================

model AuditLog {
  id             String       @id @default(cuid())
  action         String
  entity         String
  details        Json
  ipAddress      String?
  userId         String?
  organizationId String
  user           User?        @relation(fields: [userId], references: [id])
  organization   Organization @relation(fields: [organizationId], references: [id])
  createdAt      DateTime     @default(now())

  @@map("audit_logs")
}

model Webhook {
  id             String       @id @default(cuid())
  url            String
  secret         String
  events         String[]
  isActive       Boolean      @default(true)
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])

  @@map("webhooks")
}

model FeatureFlag {
  id             String       @id @default(cuid())
  key            String       @unique
  description    String?
  isEnabled      Boolean      @default(false)
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])

  @@map("feature_flags")
}
`;

export const schemaModels: SchemaModel[] = [
  {
    name: 'User',
    description: 'Central user identity managed via Better Auth. Supports OAuth, Passkeys and Passwords.',
    category: 'Auth',
    fields: [
      { name: 'id', type: 'String', isPrimary: true, description: 'Unique CUID identifier' },
      { name: 'email', type: 'String', description: 'User primary email address' },
      { name: 'name', type: 'String?', description: 'Display name' },
      { name: 'role', type: 'UserRole', description: 'System level role (SUPER_ADMIN | USER)' }
    ],
    relations: ['Session', 'Account', 'Member', 'ApiKey', 'AuditLog']
  },
  {
    name: 'Organization',
    description: 'Multi-tenant isolate boundary. Owns teams, subscriptions, agents, and API keys.',
    category: 'Tenancy',
    fields: [
      { name: 'id', type: 'String', isPrimary: true, description: 'Unique tenant CUID' },
      { name: 'name', type: 'String', description: 'Organization workspace name' },
      { name: 'slug', type: 'String', description: 'URL unique slug identifier' },
      { name: 'plan', type: 'PlanType', description: 'FREE | PRO | ENTERPRISE' }
    ],
    relations: ['Member', 'ApiKey', 'Subscription', 'Agent', 'KnowledgeDoc', 'Webhook']
  },
  {
    name: 'Member',
    description: 'Role-based membership linking User to Organization with fine-grained RBAC.',
    category: 'Tenancy',
    fields: [
      { name: 'id', type: 'String', isPrimary: true, description: 'Membership ID' },
      { name: 'role', type: 'MemberRole', description: 'OWNER | ADMIN | MEMBER | VIEWER' },
      { name: 'userId', type: 'String', isRelation: true, description: 'FK -> User.id' },
      { name: 'organizationId', type: 'String', isRelation: true, description: 'FK -> Organization.id' }
    ],
    relations: ['User', 'Organization']
  },
  {
    name: 'Agent',
    description: 'AI Agent definition with system prompts, model choice (Gemini/OpenAI/Claude), and tools.',
    category: 'AI & Vector',
    fields: [
      { name: 'id', type: 'String', isPrimary: true, description: 'Agent ID' },
      { name: 'name', type: 'String', description: 'Agent name' },
      { name: 'systemPrompt', type: 'String', description: 'System instruction prompt' },
      { name: 'model', type: 'String', description: 'Selected LLM alias' }
    ],
    relations: ['Organization', 'AgentExecution']
  },
  {
    name: 'KnowledgeDoc',
    description: 'Vector-enabled document chunk store with pgvector embeddings for RAG.',
    category: 'AI & Vector',
    fields: [
      { name: 'id', type: 'String', isPrimary: true, description: 'Document chunk ID' },
      { name: 'title', type: 'String', description: 'Document header' },
      { name: 'content', type: 'String', description: 'Text chunk content' },
      { name: 'embedding', type: 'Vector(1536)', description: 'pgvector 1536 dimension vector float array' }
    ],
    relations: ['Organization']
  },
  {
    name: 'Subscription',
    description: 'Stripe subscription state tracking, plan tier, renewal cycle and webhook sync.',
    category: 'Billing',
    fields: [
      { name: 'id', type: 'String', isPrimary: true, description: 'Subscription record ID' },
      { name: 'stripeSubscriptionId', type: 'String', description: 'Stripe API sub ID' },
      { name: 'status', type: 'String', description: 'active | trialing | canceled' }
    ],
    relations: ['Organization']
  },
  {
    name: 'AuditLog',
    description: 'Immutable system audit trail for security compliance and admin inspection.',
    category: 'System',
    fields: [
      { name: 'id', type: 'String', isPrimary: true, description: 'Audit log ID' },
      { name: 'action', type: 'String', description: 'Event action e.g. member.invited' },
      { name: 'details', type: 'Json', description: 'Structured event metadata' }
    ],
    relations: ['User', 'Organization']
  }
];
