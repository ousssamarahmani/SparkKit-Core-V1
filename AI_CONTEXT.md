# SparkKit AI Contributor Context

This file gives coding assistants a concise operating context. It does not replace
the architecture decisions, security documentation, task acceptance criteria, or
tests.

## Mission

SparkKit is an open-source TypeScript application foundation for portable Small
Software and AI-powered applications. The current priority is completing and
validating the application foundation and generator before expanding into runtime
agents or Sparkbase.

Read [`VISION.md`](./VISION.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md),
[`TASKS.md`](./TASKS.md), and relevant files under [`docs/adr`](./docs/adr) and
[`docs/security`](./docs/security) before changing architectural or security-sensitive
behavior.

## Preserve these invariants

- Organization-owned records carry an organization boundary.
- The server derives tenant scope from authenticated identity and verified membership.
- Client-provided organization identifiers are never sufficient authorization.
- Owner, admin, and member permissions remain deny-by-default and server-enforced.
- Secrets and provider SDKs remain server-side.
- Strict TypeScript, repository quality gates, portability, and provider neutrality remain intact.
- The application remains useful without AI and without Sparkbase.

## Working rules

1. Inspect existing architecture and tests before implementation.
2. Do not redesign unrelated systems or add speculative infrastructure.
3. Keep each change tied to explicit acceptance criteria.
4. Add proportionate tests for behavior and negative authorization cases.
5. Label planned behavior as planned; do not turn roadmap text into product claims.
6. Prefer explicit security checks over clever abstractions.
7. Do not create empty packages to represent future architecture.
8. Do not introduce a generalized human/agent `Principal` until real duplication justifies it.
9. Do not weaken tenant isolation to improve developer convenience.
10. Run the relevant lint, type-check, test, and build gates before completion.

## Current sequence

```text
Reference application completion
  → end-to-end smoke tests
  → reliable local setup
  → create-sparkkit generator
  → clean-machine and external-developer validation
  → agent identity and tool authorization proof
  → Human + Agent multiplayer proof
  → evidence-driven Sparkbase work
```

## Runtime-agent direction

Runtime agents are future application actors, not unrestricted model API keys.
Future work may introduce agent identity, organization ownership, permissions,
tenant scope, tool policies, approvals, and audit events. SparkKit should provide
the secure application boundary while remaining compatible with different model
providers and agent frameworks.

Do not implement the full Agent Harness unless the active task and acceptance
criteria explicitly require it.

## Definition of useful progress

> **Do not maximize the number of features. Maximize the probability that an
> external developer successfully builds real software with SparkKit.**

Remember:

```text
Planning is not implementation.
Implementation is not verification.
Verification is not adoption.
```
