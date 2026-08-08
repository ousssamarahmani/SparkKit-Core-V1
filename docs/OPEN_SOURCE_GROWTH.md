# SparkKit Open-Source Growth Plan

## Objective

Build a trusted developer ecosystem around a useful product. GitHub stars are a
distribution signal, not the primary success metric.

SparkKit should launch broadly only after a developer can generate, run, test,
and understand a working application from a clean machine.

## Positioning

**Category:** Open-source foundation for Small Software and AI-powered
applications.

**Core promise:** SparkKit helps a developer or coding agent create a secure,
portable, multi-tenant application without rebuilding authentication, data
boundaries, testing, and deployment foundations.

> Build secure Small Software with developers or AI agents, then own the code
> and deploy it anywhere.

## Product gates before public launch

The version 0.1 launch requires all of the following:

1. `create-sparkkit` generates a project successfully.
2. A generated project installs, starts, tests, and builds from documented
   commands on a clean machine.
3. Authentication and organization onboarding work end to end.
4. Automated tests reject cross-tenant reads and writes.
5. Docker starts the required local services and reports healthy status.
6. The repository contains no real secrets or fabricated product metrics.
7. A versioned release and npm package are available.

## Proof through examples

Before the public launch, publish three maintained examples:

- an inventory or operations tracker;
- a team request or approval portal;
- an AI-assisted document tool with the AI feature kept optional.

Each example must include source code, screenshots, setup instructions, the
SparkKit version used, and a short demonstration. Examples must exercise the
same generated foundation rather than being unrelated showcase prototypes.

## Repository experience

The repository should make these questions answerable within one minute:

1. What problem does SparkKit solve?
2. Who is it for?
3. What works today?
4. How can I run it?
5. How can I contribute?

Required launch assets:

- concise README with an honest status section;
- 20-30 second product demonstration;
- screenshots of the generated application;
- stable repository description and topics;
- tagged releases and changelog;
- public roadmap and GitHub Discussions;
- scoped `good first issue` and `help wanted` work;
- responsive maintainer triage.

## Community model

- Welcome code, documentation, adapters, and template contributions.
- Keep issues small enough for an external contributor to finish.
- Explain package boundaries through architecture decision records.
- Recognize contributors in release notes.
- Publish regular progress updates with working artifacts.
- Route vulnerabilities privately through the security policy.
- Reject fake usage numbers, fake testimonials, and unsupported security or
  performance claims.

## Distribution sequence

### Private validation

Recruit ten developers who build internal tools, SaaS products, or AI-assisted
applications. Observe setup directly and fix every repeated failure.

### Release candidate

Publish installation instructions, examples, migration notes, and a short demo.
Ask testers for reproducible issues and missing documentation.

### Version 0.1 launch

Share the working release through technical communities, a detailed build post,
Hacker News, Product Hunt, and focused developer social channels. Each launch
artifact should demonstrate a real application rather than only asking for a
star.

### Ongoing growth

Publish useful releases, implementation notes, benchmarks when evidence exists,
and new community examples. Sustainable discovery comes from repeated utility,
not a one-day promotion campaign.

## Metrics

Track these in order:

1. Successful generated-project runs.
2. Median time from installation to a running application.
3. Clean-machine setup success rate.
4. Weekly active developers and npm downloads.
5. Applications and examples built with SparkKit.
6. Repeat contributors and merged community pull requests.
7. GitHub stars and forks.

No metric should be displayed publicly until its source and measurement method
are documented.

## Initial adoption targets

- Ten developers complete the full setup flow.
- Three real example applications are published.
- Five external contributors complete a documentation or code change.
- The first 100 stars come from demonstrated utility and direct developer
  feedback.
- Broader promotion begins only after the release gates remain green.
