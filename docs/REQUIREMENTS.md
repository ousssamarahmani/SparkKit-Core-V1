# SparkKit — Product & Technical Requirements Document (PRD/TRD)

## 1. Executive Summary & Vision
SparkKit is an enterprise-grade, open-source Turborepo starter toolkit designed to drastically reduce the time to build and deploy production-ready SaaS and AI applications. It unifies monorepo package architecture, multi-tenant database schemas with PostgreSQL and `pgvector`, modern authentication (Better Auth), type-safe APIs (tRPC/Zod), and AI agent orchestration (Gemini / Vercel AI SDK).

---

## 2. Functional Requirements (FR)

### FR-1: Monorepo Package Workspace (`apps/` & `packages/`)
- **FR-1.1**: Multi-package Turborepo workspace managing shared core libraries.
- **FR-1.2**: `@sparkkit/core`: Shared utilities, design system tokens, layout primitive components, and error handlers.
- **FR-1.3**: `@sparkkit/auth`: Authentication adapters supporting Passkeys, OAuth 2.0, Magic Links, and Session Management via Better Auth.
- **FR-1.4**: `@sparkkit/ai`: Vercel AI SDK wrappers, Gemini 2.5 Flash integrations, streaming helpers, and pgvector RAG document search tools.
- **FR-1.5**: `@sparkkit/db`: Prisma ORM client with PostgreSQL schema, migrations pipeline, and multi-tenant isolation helpers.

### FR-2: Database & Multi-Tenancy Architecture
- **FR-2.1**: Relational PostgreSQL database managed via Prisma ORM.
- **FR-2.2**: Tenant isolation with `Organization`, `OrganizationMember`, and role-based access control (RBAC: `OWNER`, `ADMIN`, `MEMBER`).
- **FR-2.3**: Built-in support for vector embeddings (`pgvector` 1536-dim vectors) in the `KnowledgeDoc` model for RAG workflows.
- **FR-2.4**: Stripe billing and subscription management tracking (`Subscription` model with `ACTIVE`, `CANCELED`, `PAST_DUE` states).

### FR-3: AI & Agent Orchestration Engine
- **FR-3.1**: Server-side Gemini API client (`@google/genai`) and Vercel AI SDK integration.
- **FR-3.2**: Streaming tool invocation logs and real-time execution telemetry.
- **FR-3.3**: Document chunking and embedding generation pipeline for semantic vector search over knowledge bases.

### FR-4: Starter Template Architectures
- **FR-4.1**: 10 production-ready starter templates available via CLI (`npx create-sparkkit`):
  1. AI SaaS Boilerplate (`ai-saas`)
  2. Multi-Tenant Enterprise SaaS (`b2b-saas`)
  3. AI Agent Workflow Builder (`ai-agent-flow`)
  4. Internal Backoffice Admin (`internal-admin`)
  5. Headless E-Commerce (`headless-store`)
  6. Developer API Platform (`developer-api`)
  7. Real-Time Collaboration Workspace (`collab-workspace`)
  8. Customer Support Portal (`support-desk`)
  9. Content Management Engine (`cms-engine`)
  10. FinTech Analytics Dashboard (`fintech-dashboard`)

---

## 3. Non-Functional Requirements (NFR)

### NFR-1: Performance & Latency
- **NFR-1.1**: Server Response Time: Sub-100ms API response latency for cached routes.
- **NFR-1.2**: Cold Start: Turborepo dev server startup under 3 seconds using Vite / HMR.
- **NFR-1.3**: AI Latency: Gemini 2.5 Flash time-to-first-token (TTFT) under 400ms.

### NFR-2: Security & Compliance
- **NFR-2.1**: Zero client-side API key leakage. All LLM keys (`GEMINI_API_KEY`, etc.) strictly server-side.
- **NFR-2.2**: Tenant Data Isolation: DB queries scoped by `organizationId`.
- **NFR-2.3**: CSRF protection, secure HTTP-only cookies, and rate limiting on API endpoints.

### NFR-3: Developer Experience (DX) & Maintainability
- **NFR-3.1**: End-to-end type safety from DB models (Prisma) through API layer (tRPC/Zod) to React frontend components.
- **NFR-3.2**: Zero configuration setup via `npx create-sparkkit`.
- **NFR-3.3**: Strict ESLint + TypeScript strict mode compliance across all packages.

---

## 4. System Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Monorepo Engine** | Turborepo, pnpm workspaces |
| **Frontend Framework** | React 19, Vite, Tailwind CSS v4 |
| **Icons & Motion** | Lucide React, Motion (`motion/react`) |
| **Backend & API** | Node.js, Express, tRPC, Zod |
| **Database & ORM** | PostgreSQL, Prisma ORM, pgvector extension |
| **Authentication** | Better Auth (Passkeys, OAuth, WebAuthn) |
| **AI Integration** | `@google/genai` (Gemini 2.5 Flash), Vercel AI SDK |
| **Payments** | Stripe Checkout & Webhooks |
