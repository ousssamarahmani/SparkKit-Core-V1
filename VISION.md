# SparkKit and Sparkbase Vision

**Status:** September 2026
**Purpose:** Product and engineering direction. This document describes both the
implemented foundation and the longer-term thesis; future capabilities are labeled
explicitly.

## The core idea

> **SparkKit is an open application foundation for software built with AI coding
> agents and designed for humans and agents to work together.**

AI coding tools can generate application code increasingly quickly. They do not
remove the application foundation required for real people and teams to use that
software safely:

- authentication and secure sessions;
- organizations, memberships, roles, and permissions;
- tenant-safe data access and migrations;
- validation, testing, and predictable repository conventions;
- environment configuration and deployment discipline;
- background jobs, storage, tools, workflows, and observability.

SparkKit provides that foundation as ordinary, portable TypeScript code. A
developer—or a coding agent—should spend most of its time on the application's
unique workflow instead of rebuilding the same security and tenancy layer.

SparkKit grows from that foundation in three focused layers:

```text
                         SPARKKIT

        ┌──────────────────┼──────────────────┐
        │                  │                  │
 APP FOUNDATION      AGENT-NATIVE DX      APP RUNTIME
        │                  │                  │
 Auth                 AGENTS.md             Humans
 Organizations        Agent Skills          Agents
 PostgreSQL           CLI                   Roles
 Multi-tenancy        Coding agents         Tools
 RBAC                                      Approvals
 Testing                                   Activity
                                              │
                                              ▼
                                         MCP adapters
                                              │
                                       External systems
```

The application foundation remains the core. Agent-native development guidance
helps coding agents extend it safely. Runtime primitives make humans and agents
first-class application participants. MCP is an adapter at the edge, not the
architecture around which SparkKit is designed.

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

Potential responsibilities include application runtime, deployments,
environments, secrets, databases, storage, queues, background jobs, agent
workers, logs, monitoring, domains, scaling, backups, and recovery. Sparkbase
must earn adoption through convenience rather than lock-in.

> **SparkKit builds it. Sparkbase runs it.**

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

## Agent-native development experience

SparkKit should be unusually easy for coding agents such as Codex, Claude Code,
Cursor, and GitHub Copilot to extend correctly. This is a build-time concern,
separate from agents that run inside a generated application.

A coding agent should not need to rediscover SparkKit's architecture, tenant
model, authorization rules, or verification requirements for every feature. A
concise root `AGENTS.md` and one canonical `.agents/skills/` layer should teach
those invariants without duplicating the same knowledge for every tool.

The first three portable skills should remain deliberately narrow:

1. **Add a tenant resource** — follow existing organization ownership, verified
   tenant context, server authorization, validation, and isolation-test patterns.
2. **Tenant security** — never trust a client-supplied organization boundary,
   never substitute UI visibility for authorization, and test cross-tenant denial.
3. **Verify a feature** — run the applicable type, lint, test, authorization,
   isolation, build, and security checks before claiming completion.

Thin tool-specific adapters are acceptable where required, but SparkKit should
keep its architecture and security rules in one source of truth. Skills may gain
references, templates, or scripts only when they make execution more deterministic.

## What exists today

The repository currently contains verified implementations of:

- pnpm/Turborepo workspace, strict TypeScript, shared ESLint, and CI;
- Prisma/PostgreSQL migrations, deterministic seeds, and tenant isolation;
- email/password registration, sessions, sign-in, and sign-out;
- organization onboarding and owner/admin/member authorization;
- a responsive application shell and tenant-owned project CRUD;
- loading, empty, authorization, validation, and unexpected-error states;
- architecture decisions, security documentation, and public task evidence;
- a safe `create-sparkkit` CLI, packaged portable SaaS template, package-manager
  selection, and opt-in dependency installation and Git initialization.

Clean-machine generation verification, npm publication, the canonical agent
skills, optional AI provider layer, runtime-agent model, Human + Agent reference
workflow, MCP adapters, and Sparkbase do **not** exist yet.

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

Agents should be first-class application participants rather than unrestricted
API keys. A future SparkKit runtime agent may have an identity, owning
organization, creator, role, permissions, tenant scope, allowed tools, approval
requirements, assigned work, and an execution history.

This direction is distinct from coding agents such as Codex or Claude Code:

- **Coding agents** help developers build a SparkKit application.
- **Runtime agents** operate inside the resulting application.

> **Agents can build the software, and agents can live inside the software.**

## The future minimal agent runtime

The runtime Agent Harness is deliberately narrow: a small set of application
primitives that lets an agent participate in SparkKit software under the same
organization and permission model as human users. It is not a standalone agent
framework.

It should answer:

- Who is the agent and which organization owns it?
- Who invoked it and on whose behalf is it acting?
- Which tenant data and tools may it access?
- Which actions are allowed, denied, or require approval?
- What did it request and what actually executed?

That is enough for SparkKit. It is not an LLM orchestration framework, an
advanced agent-security product, or a generalized authority-control platform.
Model execution may come from OpenAI, Anthropic, Gemini, a custom runtime, or
another compatible framework. SparkKit's responsibility ends at the clear,
portable application boundary.

The harness may provide:

```text
Agent identity
  → Organization and role
  → Application permissions
  → Allowed tools and workflows
  → Task execution
  → Human approval where the application requires it
  → Basic audit history
```

It must not expand into authority graphs, delegation-chain analysis, capability
composition, blast-radius calculation, generalized runtime policy, isolation,
containment, or security replay. Those are separate product concerns and do not
belong in this repository.

The first model should stay understandable to ordinary application developers:

```text
Application agent
  ├── identity and owning organization
  ├── creator, status, and application permissions
  ├── allowed application tools
  ├── ALLOW / DENY / REQUIRE_APPROVAL decisions
  └── understandable activity history
```

SparkKit should extend the existing authorization model where it fits instead of
creating a second, unrelated security system for agents.

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

### MCP interoperability

MCP should connect external tools and services to SparkKit's application model;
it should not leak into every package or replace the core tool abstraction. The
order is always agent identity, application permission, tool registry, optional
approval, execution, and activity recording. An MCP-backed tool passes through
the same authorization path as a native application tool.

The product value is not merely that SparkKit “supports MCP.” The value is that
MCP tools can participate naturally in an application's organizations,
permissions, approvals, and activity history.

### First proof, not a platform

The first Agent Harness work should be one narrow support-agent demonstration:

1. An organization owns a Support Agent.
2. The agent may read tickets, search knowledge, and create drafts.
3. Customer deletion is denied.
4. A high-value refund requires owner approval.
5. Every decision and execution produces an audit event.

This single demo should prove identity, tenant scope, application permissions,
tool authorization, approval, and basic audit before broader agent
infrastructure is considered.

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
Generated-project CI and npm publishing readiness
     ↓
External developer validation
     ↓
AGENTS.md and the first three portable Agent Skills
     ↓
Coding-agent extension validation
     ↓
Agent identity and tool authorization
     ↓
Human + Agent multiplayer proof
     ↓
Demonstrated operational demand
     ↓
Smallest useful Sparkbase layer
```

Runtime agent primitives and MCP may remain experimental or move to version 0.2
if they would delay a useful version 0.1. Distribution and external validation
remain ahead of advanced agent functionality.

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

The equivalent coding-agent validation should ask multiple supported agents to
add the same organization-owned feature and record completion, passing checks,
tenant isolation, authorization, manual corrections, elapsed time, and confusing
instructions. Results must be measured rather than invented.

## Success measures

SparkKit should optimize for evidence rather than vanity metrics:

- **Core:** time to first working application, setup completion, repeated setup
  failures, real generated projects, and developers who return.
- **Agent-native DX:** feature completion, manual corrections, isolation and
  authorization preservation, passing verification, and time to completion.
- **Runtime agents:** ease of adding an agent and permissions, successful tool
  execution, correct approvals, and understandable activity history.

## What SparkKit is not

SparkKit is not trying to become:

- another Supabase, Vercel, or standalone identity provider;
- an LLM or multi-agent orchestration framework;
- an advanced AI-agent security, authority-analysis, or containment platform;
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

> **The open application foundation for software built with AI coding agents and
> designed for humans and agents to work together.**

Current promise:

> **Build small software that is ready to become real software.**

Ecosystem:

> **Build with SparkKit. Run it anywhere.**

Future agent direction:

> **Built with agents. Designed for humans and agents.**

Human + Agent applications:

> **Give agents identities, roles, permissions, and tools inside the same
> application model as users.**

Long-term narrative:

> AI made application code inexpensive to generate, but real software still
> needed identity, organizations, permissions, tenancy, and operational structure.
> SparkKit became the open foundation for that software. As agents became
> participants inside applications, SparkKit extended the same application model
> so humans and agents could share organizations, data, and tools safely. When
> teams asked for those workloads to be operated for them, Sparkbase emerged as
> the managed layer they had already earned the right to request.

## The immediate mission

> **Finish the generator, prove outsiders can use it, prove coding agents can
> extend it safely, then add the smallest runtime-agent primitives. Build
> Sparkbase only after real usage creates operational demand.**
