# SparkKit — Task List & Implementation Backlog

## Phase 1: Core Framework & Monorepo Setup [COMPLETED]
- [x] Configure Turborepo root `package.json` and `pnpm-workspace.yaml`.
- [x] Create `@sparkkit/core` with shared TypeScript utilities, UI components, and design system tokens.
- [x] Establish `@sparkkit/db` package with Prisma ORM schema and PostgreSQL models.
- [x] Create `@sparkkit/auth` adapter layer with Better Auth integration (Passkeys, OAuth, Sessions).
- [x] Create `@sparkkit/ai` wrapper library for Gemini 2.5 Flash and pgvector document search.

## Phase 2: Schema & Multi-Tenancy Architecture [COMPLETED]
- [x] Define `User`, `Account`, `Session`, and `VerificationToken` models for Better Auth.
- [x] Implement `Organization`, `OrganizationMember`, and RBAC permissions (`OWNER`, `ADMIN`, `MEMBER`).
- [x] Design `KnowledgeDoc` model with 1536-dimensional `pgvector` field for vector RAG embeddings.
- [x] Integrate `Subscription` model for Stripe webhook status sync.
- [x] Build interactive Schema Visualizer and ERD inspector.

## Phase 3: AI Agent Orchestration & RAG Engine [COMPLETED]
- [x] Integrate `@google/genai` TypeScript SDK on server-side.
- [x] Implement document chunking algorithm and pgvector similarity search query generator.
- [x] Build real-time agent execution telemetry logger (tokens, latency, tool calls).
- [x] Create interactive AI Agent Playground for testing system prompts and RAG queries.

## Phase 4: Starter Templates Catalog [COMPLETED]
- [x] Design catalog for 10 production-ready Turborepo starter templates.
- [x] Add CLI scaffolding command generator (`npx create-sparkkit`).
- [x] Build interactive live mock previews for templates in the catalog.

## Phase 5: Production Readiness & Developer Tools [IN PROGRESS]
- [ ] **Task 5.1**: Set up Docker multi-stage build files (`Dockerfile`) for Cloud Run / Kubernetes deployment.
- [ ] **Task 5.2**: Implement automated CI/CD GitHub Actions workflow for linting, testing, and building workspace packages.
- [ ] **Task 5.3**: Add Stripe webhook handler endpoint in `@sparkkit/core` / Express backend.
- [ ] **Task 5.4**: Create database seeding script (`prisma/seed.ts`) with demo tenant data and test vector documents.
- [ ] **Task 5.5**: Finalize production environment variable templates (`.env.example`) and security audit.

---

## Production Launch Checklist
- [ ] Environment variables verified in Cloud secret manager (`GEMINI_API_KEY`, `DATABASE_URL`, `STRIPE_SECRET_KEY`).
- [ ] PostgreSQL `pgvector` extension enabled on target database instance.
- [ ] SSL / TLS configured for custom domain routing.
- [ ] CORS policies hardened to allow only whitelisted frontend domains.
- [ ] Health check endpoint `/api/health` returning 200 OK.
