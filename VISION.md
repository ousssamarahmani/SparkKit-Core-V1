# SparkKit and Sparkbase Vision

**Status:** August 2026
**Purpose:** Product and engineering direction. This document describes both the
implemented foundation and the longer-term thesis; future capabilities are labeled
explicitly.

## The core idea

> **Build small software that is ready to become real software.**

AI coding tools can generate application code increasingly quickly. They do not
remove the application foundation required for real people and teams to use that
software safely:

- authentication and secure sessions;
- organizations, memberships, roles, and permissions;
- tenant-safe data access and migrations;
- validation, testing, and predictable repository conventions;
- environment configuration and deployment discipline.

SparkKit provides that foundation as ordinary, portable TypeScript code. A
developer—or a coding agent—should spend most of its time on the application's
unique workflow instead of rebuilding the same security and tenancy layer.

## What is Small Software?

Small Software is focused software created for one person, team, company,
customer, project, or narrow workflow. It can be important without becoming a
large horizontal SaaS product.

Examples include:

- internal operations tools and dashboards;
- customer and partner portals;
- migration, inventory, and project trackers;
- support and sales research tools;
- personal or team AI applications;
- focused vertical applications and compact SaaS products;
- temporary software built for a time-bounded company project.

AI changes the economics of building these applications. Problems that once
remained in spreadsheets or generic tools can justify purpose-built software.
SparkKit's opportunity is to give that new software a dependable foundation.

## The product system

### SparkKit

SparkKit is the open-source application foundation.

It must remain:

- open source and source-owned;
- portable and cloud optional;
- provider neutral;
- useful without AI;
- useful without Sparkbase;
- explicit about organization and tenant boundaries.

### Sparkbase

Sparkbase is the planned managed operations layer for software built with
SparkKit. It is a long-term product direction, not a reason to build cloud
infrastructure before demand exists.

Potential responsibilities include deployments, environments, secrets,
databases, logs, backups, recovery, team access, agent execution, policy, and
audit. Sparkbase must earn adoption through convenience rather than lock-in.

```text
Developer or coding agent
          │
          ▼
       SparkKit
          │
          ▼
     Small Software
          │
     ┌────┴────┐
     ▼         ▼
Own infra   Sparkbase
            (planned)
```

## Who SparkKit serves first

The initial wedge is technical startup teams, agencies, and serious independent
developers repeatedly building organization-aware internal software.

| User | Immediate value |
| --- | --- |
| Independent developer | Starts from owned code with a real application foundation |
| Startup team | Builds internal portals and operational workflows without rebuilding tenancy |
| Software agency | Reuses one secure application contract across client projects |
| AI-assisted builder | Moves from generated prototype to team-ready application structure |

The product should win one concrete workflow at a time. It should not sell an
abstract future platform before outsiders can run and extend the current
foundation.

## What exists today

The repository currently contains verified implementations of:

- pnpm/Turborepo workspace, strict TypeScript, shared ESLint, and CI;
- Prisma/PostgreSQL migrations, deterministic seeds, and tenant isolation;
- email/password registration, sessions, sign-in, and sign-out;
- organization onboarding and owner/admin/member authorization;
- a responsive application shell and tenant-owned project CRUD;
- loading, empty, authorization, validation, and unexpected-error states;
- architecture decisions, security documentation, and public task evidence.

The project generator, optional AI package, runtime-agent model, Agent Harness,
and Sparkbase do **not** exist yet.

## Human + Agent applications

The longer-term thesis is that software will increasingly contain both humans
and runtime AI agents as active participants.

Traditional applications model:

```text
Human → Organization → Role → Permission → Resource
```

Agentic applications also need:

```text
Agent → Organization → Scope → Tool policy → Resource
```

Agents should not be treated as unrestricted API keys. A future SparkKit runtime
agent may have an identity, owning organization, creator, permissions, tenant
scope, allowed tools, approval requirements, and an execution history.

This direction is distinct from coding agents such as Codex or Claude Code:

- **Coding agents** help developers build a SparkKit application.
- **Runtime agents** operate inside the resulting application.

> **Agents can build the software, and agents can live inside the software.**

## The future Agent Harness

Working term: **SparkKit Agent Harness**.

It is the security and execution boundary between a runtime AI agent and the
application it operates inside. It should answer:

- Who is the agent and which organization owns it?
- Who invoked it and on whose behalf is it acting?
- Which tenant data and tools may it access?
- Which actions are allowed, denied, or require approval?
- What did it request and what actually executed?

It is not an LLM orchestration framework. Model execution may come from OpenAI,
Anthropic, Gemini, a custom runtime, or another compatible framework. SparkKit's
responsibility is the application boundary.

### Tool authorization model

A future tool registry could associate each operation with a required permission
and risk level:

```text
Agent requests tool
        ↓
Resolve organization and tenant
        ↓
Check permission and tool policy
        ↓
LOW        → execute
HIGH       → request human approval
FORBIDDEN  → deny
        ↓
Record audit event
```

MCP can be an adapter below this boundary. Connecting an MCP server must never
grant unrestricted access by itself.

### First proof, not a platform

The first Agent Harness work should be one narrow support-agent demonstration:

1. An organization owns a Support Agent.
2. The agent may read tickets, search knowledge, and create drafts.
3. Customer deletion is denied.
4. A high-value refund requires owner approval.
5. Every decision and execution produces an audit event.

This single demo should prove identity, tenant scope, tool authorization,
approval, and audit before broader agent infrastructure is considered.

## Sequence of development

```text
SparkKit Core
     ↓
Complete UX states and end-to-end verification
     ↓
Reliable local setup
     ↓
create-sparkkit
     ↓
External developer validation
     ↓
Agent identity and tool authorization
     ↓
Human + Agent multiplayer proof
     ↓
Demonstrated operational demand
     ↓
Smallest useful Sparkbase layer
```

### Gate A — Foundation

Authentication, organizations, roles, tenant isolation, a reference resource,
and repository tests are complete and documented.

### Gate B — Distribution

An external developer can generate, configure, migrate, seed, test, build, and
run a SparkKit application using only generated documentation.

### Gate C — Developer value

External developers successfully build tenant-owned features, return to the
project, and recommend it without founder assistance.

### Gate D — Agent differentiation

Agent identity, permissions, tool registry, approvals, and audit work together in
one verified demonstration.

### Gate E — Sparkbase demand

Users ask for hosting, secrets, monitoring, backups, or managed agent execution.
Only then should Sparkbase implement the smallest layer that answers observed
demand.

## External validation tests

SparkKit should pass three tests before broadening its platform scope:

1. **Setup:** Can a stranger run the application from the documentation?
2. **Extension:** Can a stranger add a tenant-owned resource without weakening isolation?
3. **Coding agent:** Can a coding agent follow repository conventions and add that resource safely?

Every failure is product feedback, not merely a documentation problem.

## What SparkKit is not

SparkKit is not trying to become:

- another Supabase, Vercel, or standalone identity provider;
- an LLM or multi-agent orchestration framework;
- an MCP implementation or connector marketplace;
- a Kubernetes platform or generalized cloud provider;
- a ten-template catalog before one template is excellent.

Do not build Sparkbase infrastructure, billing, enterprise SSO, long-term memory,
dozens of connectors, speculative packages, or a generalized `Principal`
abstraction before a verified requirement justifies them.

## Engineering principles

1. **Security boundaries are product features.** Never bypass tenant isolation for convenience.
2. **Prefer explicitness.** Security-sensitive behavior should be obvious in code.
3. **Portable first.** Generated applications remain ordinary TypeScript applications.
4. **AI optional.** The core application must work without an AI account.
5. **Cloud optional.** SparkKit must work without Sparkbase.
6. **Provider neutral.** Avoid unnecessary dependence on one model provider.
7. **Verify, do not claim.** Completion requires tests and acceptance evidence.
8. **Do not abstract hypothetical duplication.** Generalize only demonstrated patterns.
9. **Keep changes focused.** Do not redesign unrelated architecture during a task.
10. **Optimize for external success.** More features are not the primary measure.

## Positioning

Primary:

> **The open foundation for Small Software and AI-powered applications.**

Current promise:

> **Build small software that is ready to become real software.**

Ecosystem:

> **Build with SparkKit. Run it anywhere.**

Future agent direction:

> **Give every agent an identity, a scope, and only the tools it needs.**

Long-term narrative:

> AI made application code inexpensive to generate, but real software still
> needed identity, organizations, permissions, tenancy, and operational structure.
> SparkKit became the open foundation for that software. As agents became
> participants inside applications, SparkKit extended the same application model
> so humans and agents could share organizations, data, and tools safely. When
> teams asked for those workloads to be operated for them, Sparkbase emerged as
> the managed layer they had already earned the right to request.

## The immediate mission

> **Finish the foundation, make it generatable, prove outsiders can use it, prove
> coding agents can extend it safely, then add runtime agents. Build Sparkbase only
> after real usage creates operational demand.**
