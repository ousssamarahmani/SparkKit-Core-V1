# SparkKit — Technical Implementation Guide

This guide details step-by-step instructions for developers implementing, modifying, or extending the SparkKit toolkit and workspace packages.

---

## 1. Quick Development Setup

### Prerequisites
- **Node.js**: v20.x or higher
- **pnpm**: v9.x or higher (recommended for Turborepo workspaces)
- **PostgreSQL**: v15+ with `pgvector` extension enabled

### Local Environment Setup
```bash
# 1. Clone repository
git clone https://github.com/sparkbase/sparkkit.git
cd sparkkit

# 2. Install workspace dependencies
pnpm install

# 3. Configure Environment Variables
cp .env.example .env

# Edit .env with your credentials:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/sparkkit?sslmode=disable"
# GEMINI_API_KEY="your_gemini_api_key"
# BETTER_AUTH_SECRET="your_32_byte_secret"

# 4. Push Prisma Database Schema & Seed
pnpm --filter @sparkkit/db db:push
pnpm --filter @sparkkit/db db:seed

# 5. Start Turborepo Local Development Server
pnpm dev
```

---

## 2. Package Architecture & Extension Guide

### Adding a New Shared Package (`packages/my-package`)
1. Create directory `packages/my-package`.
2. Add `package.json` with workspace name `@sparkkit/my-package`.
3. Add `tsconfig.json` extending root `@sparkkit/tsconfig`.
4. Export package entrypoint in `package.json` (`"exports": { ".": "./src/index.ts" }`).
5. Reference in application apps via `"dependencies": { "@sparkkit/my-package": "workspace:*" }`.

### Adding a New Starter Template (`templates/`)
1. Add template directory inside `templates/my-template`.
2. Configure `package.json` with scaffold metadata.
3. Update `src/data/mockData.ts` in the catalog directory to list the new template name, CLI command, route structure, and category.

---

## 3. Database Schema Migration Workflow

When modifying Prisma schema (`packages/db/prisma/schema.prisma`):

```bash
# Generate Prisma Client types
pnpm --filter @sparkkit/db db:generate

# Create and apply migration
pnpm --filter @sparkkit/db db:migrate:dev --name add_new_feature

# Verify in Prisma Studio GUI
pnpm --filter @sparkkit/db db:studio
```

---

## 4. AI SDK & Gemini Integration

Server-side route handler example using `@google/genai`:

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAgentResponse(prompt: string, contextDocs: string[]) {
  const model = "gemini-2.5-flash";
  const systemInstruction = `You are SparkKit Assistant. Use the following context documents:\n${contextDocs.join("\n")}`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.2,
    },
  });

  return response.text;
}
```

---

## 5. Production Build & Deployment

```bash
# Build all apps and packages in workspace
pnpm build

# Run production server
pnpm start
```
