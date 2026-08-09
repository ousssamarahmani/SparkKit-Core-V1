export const githubReadmeMarkdown = `# ⚡ SparkKit

<div align="center">

  <h1>SparkKit</h1>
  <p><strong>The fastest way to build production-ready SaaS and AI applications.</strong></p>

  <p>
    <a href="#quickstart"><strong>Quickstart</strong></a> •
    <a href="#architecture"><strong>Architecture</strong></a> •
    <a href="#templates"><strong>Templates</strong></a> •
    <a href="#cli"><strong>CLI</strong></a> •
    <a href="#sparkbase-cloud"><strong>Sparkbase Cloud</strong></a>
  </p>

  <br />

  <p>
    <a href="https://github.com/sparkbase/sparkkit"><img src="https://img.shields.io/github/stars/sparkbase/sparkkit?style=for-the-badge&logo=github&color=FF5500" alt="GitHub Stars" /></a>
    <a href="https://github.com/sparkbase/sparkkit/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache--2.0-blue.svg?style=for-the-badge" alt="Apache License 2.0" /></a>
    <a href="https://npmjs.com/package/create-sparkkit"><img src="https://img.shields.io/npm/v/create-sparkkit?style=for-the-badge&color=000000&logo=npm" alt="NPM Version" /></a>
    <a href="https://discord.gg/sparkkit"><img src="https://img.shields.io/discord/123456789?style=for-the-badge&logo=discord&color=5865F2" alt="Discord Community" /></a>
  </p>

</div>

---

## 🚀 What is SparkKit?

SparkKit is NOT another boilerplate or starter template.

It is a complete, modular, type-safe developer toolkit designed to give developers everything required to build modern software in minutes — from **Next.js 15 App Router** and **Better Auth** to **Vercel AI SDK**, **Prisma**, **tRPC**, and **Stripe**.

SparkKit is the **open-source foundation of Sparkbase Cloud**. Anyone can use SparkKit for free, self-host anywhere, or seamlessly deploy to Sparkbase Cloud for managed infrastructure, scaling, and observability.

---

## 💡 Why Choose SparkKit?

| Feature | Standard Boilerplates | Supabase | Next.js Starters | **SparkKit** |
| :--- | :---: | :---: | :---: | :---: |
| **Monorepo Architecture** | ❌ | ❌ | ❌ | **✅ Turborepo Native** |
| **Passkeys & Multi-Tenant Auth** | Partial | Partial | ❌ | **✅ Better Auth Built-in** |
| **Native AI Agent & RAG SDK** | ❌ | ❌ | Partial | **✅ Vercel AI + Gemini Native** |
| **End-to-End Type Safety** | Partial | Partial | Partial | **✅ tRPC + Prisma + Zod** |
| **Zero-Config CLI** | ❌ | ❌ | ❌ | **✅ \`npx create-sparkkit\`** |
| **Open Source + Cloud Path** | ❌ | ✅ | ❌ | **✅ Seamless Sparkbase Cloud** |

---

## 📦 Quickstart

Scaffold a production app in **less than 60 seconds**:

\`\`\`bash
npx create-sparkkit@latest my-awesome-app
\`\`\`

Navigate into your workspace and start the development engine:

\`\`\`bash
cd my-awesome-app
spark dev
\`\`\`

Launch live on **Sparkbase Cloud**:

\`\`\`bash
spark deploy
\`\`\`

---

## 🏗 Monorepo Architecture

SparkKit is structured as a scalable Turborepo monorepo:

\`\`\`
sparkkit/
├── apps/
│   ├── web/        # Next.js 15 App Router (React 19)
│   └── api/        # tRPC Express backend server
├── packages/
│   ├── core/       # App context, configuration & plugin runner
│   ├── auth/       # Better Auth, Passkeys, OAuth & RBAC
│   ├── ai/         # Vercel AI SDK, Gemini 2.5 Flash, RAG & Vector store
│   ├── db/         # Prisma Client with PostgreSQL connection pool & tenant extensions
│   ├── api/        # tRPC root router & procedures
│   ├── ui/         # Tailwind CSS v4 + shadcn component library
│   └── cli/        # SparkKit CLI engine
└── templates/      # 10 Official starter templates
\`\`\`

---

## ⚡ SparkKit CLI Commands

| Command | Action |
| :--- | :--- |
| \`npx create-sparkkit\` | Scaffold a new project with interactive prompts |
| \`spark dev\` | Run Turborepo HMR dev environment |
| \`spark doctor\` | Perform full system, environment & DB diagnostics |
| \`spark generate\` | Generate Prisma models, tRPC procedures & UI tables |
| \`spark deploy\` | Deploy container to Sparkbase Cloud or Docker |
| \`spark update\` | Safely upgrade all SparkKit packages to latest |

---

## 🤝 Why Contributors Join & Why Companies Adopt

- **For Developers**: Absolute DX perfection. No more copy-pasting 500 lines of auth or setting up tRPC context from scratch.
- **For Contributors**: Clean workspace package boundaries, comprehensive Vitest test coverage, and transparent RFC governance.
- **For Companies**: Enterprise RBAC, Passkeys, Audit logs, and clean migration path to managed infrastructure.

---

## 📄 License

SparkKit is open-source software licensed under the [Apache License 2.0](LICENSE).
`;
