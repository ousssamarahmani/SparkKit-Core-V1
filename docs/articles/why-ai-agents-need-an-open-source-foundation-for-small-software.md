# Why AI Agents Need an Open-Source Foundation for Small Software

**AI has made purpose-built applications easier to create. Shipping them safely,
sharing them with a team, and maintaining them over time is still too difficult.**

![A central AI spark connecting several small application interfaces, databases,
and workflow components](./assets/why-ai-agents-small-software-cover-with-logo.png)

Software is becoming smaller.

For most of the history of the software industry, building an application was
expensive enough that it needed a large audience or an important business case.
Teams spent weeks defining requirements, setting up infrastructure, and writing
the first version before anyone could learn whether the tool was useful.

AI coding agents are changing that equation.

A developer can now describe a narrow problem and quickly produce a dashboard,
an approval workflow, a data viewer, a personal AI assistant, or a small internal
tool. A product manager can prototype a workflow without waiting for the next
engineering cycle. An operations team can create software that matches how it
actually works instead of adapting its process to a generic product.

This emerging category is **Small Software**: purpose-built applications created
for one person, one team, or one specific workflow.

The applications may be small, but the opportunity is not.

## Building became easier. Shipping did not.

Generating a working interface is only the beginning.

The moment someone wants to use an application outside a local development
environment, familiar infrastructure questions appear:

- How does a user sign in?
- Who is allowed to see each workspace or record?
- Where is the data stored?
- How are secrets protected?
- How are schema changes applied safely?
- What happens when a deployment fails?
- Can another person understand and maintain the generated code?
- Can the application move to different infrastructure later?

AI can generate code quickly, but speed does not automatically create good
boundaries, safe authorization, repeatable deployments, or maintainable systems.
In fact, when the number of generated applications increases, these foundations
become more important.

We have reduced the cost of producing application code without reducing the cost
of operating that code responsibly.

That is the new bottleneck.

## Big-cloud abstractions are a poor default for Small Software

AWS, Azure, and Google Cloud are extraordinary platforms. They were designed to
support a vast range of workloads, including complex systems serving millions of
users. Their flexibility is a strength when a team needs that scale and control.

But flexibility also creates decisions.

A small internal application should not require its creator to become an expert
in networks, identity policies, container orchestration, secrets infrastructure,
observability pipelines, and deployment topology before sharing a useful tool
with five colleagues.

Small Software needs a different default abstraction.

The experience should begin with the application and its users:

1. Build the tool with a developer or AI agent.
2. Run it locally with clear, reproducible dependencies.
3. Add identity, permissions, and data using safe defaults.
4. Deploy it without redesigning the application around one provider.
5. Share it with the right people.

Complex infrastructure should remain available when it is genuinely needed.
It should not be the admission price for publishing a small application.

## The missing layer is an open application foundation

The answer is not another collection of screenshots presented as a finished
platform. It is also not a boilerplate repository that becomes obsolete the day
it is copied.

AI agents need a maintained, inspectable foundation that teaches them—and the
humans working with them—how an application in this category should be assembled.

That foundation should provide:

- a coherent project structure;
- typed application and database boundaries;
- authentication and organization-aware authorization;
- tested tenant isolation;
- repeatable local development;
- replaceable integrations;
- optional AI capabilities that do not compromise the rest of the application;
- a clear path from generated code to a maintained product.

It should also be open source.

If an AI agent is going to generate software that handles a team's data and
workflows, the team should be able to inspect the foundation, run it locally,
change it, and deploy it somewhere else. Portability is not simply a deployment
feature. It is part of the trust model.

## This is the idea behind SparkKit

[SparkKit](https://github.com/ousssamarahmani/SparkKit-Core-V1) is an early-stage
open-source project exploring this foundation for Small Software and AI-powered
applications.

The intended developer experience is deliberately simple:

```bash
npx create-sparkkit my-app
cd my-app
pnpm dev
```

That command is a target, not a currently published promise.

Today, the repository contains the pnpm and Turborepo foundation, a public
documentation site, a Next.js reference application shell, shared strict
TypeScript and ESLint configuration, continuous integration, and the initial
Prisma/PostgreSQL package boundary.

Authentication, organization onboarding, tenant-isolation helpers, the complete
reference application, and the `create-sparkkit` package remain active roadmap
work. They will not be described as released until they work together and pass
clean-machine verification.

That distinction matters. Open-source credibility comes from working artifacts,
clear limitations, and reproducible evidence—not from presenting a roadmap as a
feature list.

## Designed for developers and agents together

SparkKit is not based on the idea that AI agents replace developers. It is based
on the observation that both need better primitives.

An agent benefits from conventions it can reliably discover: package boundaries,
validation commands, architecture decisions, security rules, and focused tasks
with acceptance criteria. A developer benefits from exactly the same things.

The ideal workflow looks like this:

```text
Human defines a narrow problem
        ↓
Agent and developer build on known primitives
        ↓
Automated checks verify the application
        ↓
The team owns and runs the resulting code
```

The goal is not to generate the largest possible system. It is to make the
smallest useful system safe to continue owning.

## Open source first, managed convenience later

SparkKit is also the open-source foundation for a longer-term idea called
Sparkbase Cloud.

The two projects have different responsibilities:

- **SparkKit** should help developers create portable applications they own.
- **Sparkbase Cloud** is the planned managed experience for deploying, securing,
  sharing, and operating those applications with less infrastructure work.

The relationship must remain optional. SparkKit should be useful when deployed
locally, on a developer's chosen cloud, or eventually on Sparkbase Cloud. The
managed platform should earn adoption because it is easier—not because the open
source project creates lock-in.

This separation is important for another reason: the open-source project can
establish the application contract before the commercial platform exists. The
cloud becomes an implementation of that contract, not the definition of it.

## What success would look like

The first meaningful milestone is not a large GitHub star count.

It is a developer going from an idea to a running, organization-aware application
in minutes, then understanding what was generated well enough to maintain it.

Success should be measured through questions such as:

- Can a new developer complete setup from a clean machine?
- How long does it take to reach a running application?
- Do automated tests prevent cross-organization data access?
- Can the application operate normally without enabling AI?
- Can a team replace an integration or choose different infrastructure?
- Do external contributors understand where and how to help?

These are less exciting than a long feature list. They are also the foundations
of a project developers can trust.

## A new software category needs new defaults

AI agents will not only help companies build their next major product. They will
create thousands of narrow tools that would previously have been too expensive
to justify: one-off research interfaces, custom operations dashboards, approval
systems, team portals, personal knowledge tools, and software for workflows that
last only as long as the problem does.

The cloud platforms we already have will continue to power the underlying
infrastructure. The missing opportunity is a simpler application layer designed
for this new volume and shape of software.

Small Software should be easy to create, but it should also be safe to share,
clear to maintain, and possible to own.

That is the foundation SparkKit is trying to build.

SparkKit is being developed in public. If you build internal tools, focused SaaS
products, or AI-assisted applications, explore the
[architecture](https://github.com/ousssamarahmani/SparkKit-Core-V1/blob/main/ARCHITECTURE.md),
review the
[roadmap](https://github.com/ousssamarahmani/SparkKit-Core-V1/blob/main/TASKS.md),
and tell us which foundations would make your next small application easier to
ship responsibly.
