import React from 'react';
import {
  ArrowRight, Bot, Boxes, Check, Cloud, Code2, Container, Database, Github,
  GitPullRequest, KeyRound, Menu, Network, Package, Server, ShieldCheck,
  Sparkles, Terminal, X,
} from 'lucide-react';

const githubUrl = 'https://github.com/ousssamarahmani/SparkKit-Core-V1';

const principles = [
  { icon: Package, title: 'Portable by default', text: 'Own the generated code, run it locally, and deploy it without requiring a Sparkbase account.' },
  { icon: ShieldCheck, title: 'Secure foundations', text: 'Authentication, organizations, authorization and tenant-aware data access are designed into the starter.' },
  { icon: Sparkles, title: 'AI-ready, not AI-required', text: 'Add a server-side AI provider when it helps. The application continues to work without one.' },
];

const foundation = [
  ['Web application', 'A maintained full-stack SaaS reference application.'],
  ['Authentication', 'User sessions, organizations and server-side authorization.'],
  ['Data package', 'PostgreSQL, migrations and tenant-scoped access.'],
  ['Optional AI', 'A provider-neutral server interface with safe secret handling.'],
  ['Project generator', 'A create-sparkkit CLI that produces code the developer owns.'],
  ['Quality system', 'Strict types, tests, CI, Docker and contributor documentation.'],
];

const workflow = [
  ['01', 'Create', 'npx create-sparkkit my-app', 'Generate one coherent application foundation.'],
  ['02', 'Develop', 'docker compose up -d && pnpm dev', 'Work locally with PostgreSQL and normal TypeScript tooling.'],
  ['03', 'Extend', 'pnpm add @sparkkit/ai', 'Add optional capabilities through small packages.'],
  ['04', 'Deploy', 'docker build -t my-app .', 'Use Docker, Kubernetes, any cloud, or Sparkbase Cloud in the future.'],
];

const localSetup = [
  ['01', 'Clone and install', 'git clone https://github.com/ousssamarahmani/SparkKit-Core-V1.git\ncd SparkKit-Core-V1\npnpm install --frozen-lockfile'],
  ['02', 'Start PostgreSQL', 'pnpm db:up'],
  ['03', 'Prepare the database', 'pnpm --filter @sparkkit/db db:migrate:deploy\npnpm --filter @sparkkit/db db:seed'],
  ['04', 'Run the project', 'pnpm dev:docs\n# Project page: http://localhost:3000\n\npnpm dev:web\n# Reference app: http://localhost:3001'],
] as const;

const developerPaths = [
  {
    icon: Code2,
    audience: 'Software developers',
    title: 'Start with the product foundation',
    description: 'Use SparkKit as the base for a focused SaaS product, internal tool, customer portal, operations dashboard, or team utility.',
    steps: ['Keep the Next.js application and shared TypeScript standards.', 'Build features on tenant-scoped PostgreSQL data access.', 'Use Better Auth sessions as the identity boundary.', 'Add organization onboarding and role checks as those milestones land.', 'Test, containerize, and deploy to infrastructure you control.'],
    outcome: 'You spend time on the product workflow instead of rebuilding authentication, tenancy, database conventions, and project tooling.',
  },
  {
    icon: Bot,
    audience: 'AI developers & agents',
    title: 'Build AI features on a safe application shell',
    description: 'Use the same foundation for assistants, document tools, workflow agents, extraction apps, and other purpose-built AI software.',
    steps: ['Let an AI coding agent inspect the roadmap, architecture, and typed workspace.', 'Implement the product flow inside the owned repository.', 'Keep model keys and provider calls on the server.', 'Scope prompts, tools, files, and generated data to the active organization.', 'Add budgets, timeouts, evaluation, and auditability before production use.'],
    outcome: 'AI accelerates implementation or becomes a product capability without replacing normal security, data isolation, tests, and deployment ownership.',
  },
] as const;

const roadmap = [
  ['01', 'Repository foundation', 'Complete', 'The real workspace, shared configuration, community files, tests and CI are established.'],
  ['02', 'Data and tenancy', 'Complete', 'Organizations, memberships, local PostgreSQL and verified tenant isolation are implemented.'],
  ['03', 'Authentication and reference SaaS', 'In progress', 'Email/password sessions work; organization onboarding, authorization and the complete UI are next.'],
  ['04', 'Project generator', 'Planned', 'Generate a clean application and validate that it installs, tests and builds.'],
];

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5" aria-label="SparkKit">
      <span className={`grid shrink-0 place-items-center rounded-full bg-white text-black ${compact ? 'h-7 w-7' : 'h-8 w-8'}`}>
        <svg aria-hidden="true" viewBox="0 0 32 32" className={compact ? 'h-4 w-4' : 'h-5 w-5'}>
          <path d="M18.9 2.8 7.8 17h7l-2.2 12.2L24.2 14h-7.1l1.8-11.2Z" fill="currentColor" />
        </svg>
      </span>
      <span className={`font-medium leading-none tracking-[-0.045em] text-white ${compact ? 'text-lg' : 'text-xl'}`}>
        SparkKit
      </span>
    </span>
  );
}

function Label({ children, blue = false }: { children: React.ReactNode; blue?: boolean }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${blue ? 'text-blue-300' : 'text-amber-200'}`}>{children}</p>;
}

export default function SparkKitSite() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [['vision', 'Vision'], ['use-cases', 'Who it is for'], ['setup', 'Get started'], ['architecture', 'Architecture'], ['roadmap', 'Roadmap']];

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-amber-300 selection:text-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="SparkKit home">
            <BrandLogo />
            <span className="hidden rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-200 sm:inline">Early stage</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-400 lg:flex">
            {links.map(([id, label]) => <a key={id} className="transition hover:text-white" href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium transition hover:bg-white hover:text-black sm:flex"><Github className="h-4 w-4" /> View GitHub</a>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/15 p-2 lg:hidden" aria-label="Toggle navigation">{menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
          </div>
        </div>
        {menuOpen && <nav className="grid gap-3 border-t border-white/10 px-5 py-4 text-sm text-zinc-300 lg:hidden">{links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.14),transparent_43%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />The first open-source project from Sparkbase</div>
            <h1 className="max-w-6xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
              The open-source foundation
              <span className="mt-2 block text-[0.82em] leading-[1.02] text-zinc-300">for Small Software &amp; AI apps</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">Build purpose-built applications with developers or AI agents. Add authentication, organizations, data and optional AI—then own the code, run it locally and deploy anywhere.</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500">SparkKit is an early-stage implementation. The workspace, PostgreSQL data layer, tenant isolation and email/password sessions work today. The complete application UI, project generator, optional AI package and deployment profiles are planned, not released.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"><Github className="h-4 w-4" /> Follow the project</a>
              <a href="#workflow" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm text-zinc-200 transition hover:bg-white/5">See the developer flow <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section id="vision" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div><Label>Product vision</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">A reliable starting point for small, useful software.</h2><p className="mt-5 leading-7 text-zinc-400">SparkKit is for applications that are narrower than a large enterprise platform but deserve the same care around identity, data ownership, isolation, testing, and deployment.</p></div>
            <div className="grid gap-4 sm:grid-cols-2"><VisionCard number="01" title="Humans and agents build together" text="A software developer can work directly in the codebase or delegate bounded work to an AI coding agent using the same architecture and quality gates." /><VisionCard number="02" title="The application stays yours" text="SparkKit produces a normal TypeScript project. Your product is not trapped inside a proprietary builder or required managed cloud." /><VisionCard number="03" title="AI is a capability, not the foundation" text="Add models where they improve the product while authentication, tenancy, permissions and data remain ordinary application concerns." /><VisionCard number="04" title="Proof before promises" text="Features move from planned to available only when code, tests and documentation exist in the public repository." /></div>
          </div>
        </section>

        <section id="use-cases" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-12 max-w-3xl"><Label>Who SparkKit is for</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Two development paths. One secure foundation.</h2><p className="mt-5 leading-7 text-zinc-400">Use SparkKit to build software with AI assistance, to build AI into the product, or both. The engineering boundary stays the same.</p></div><div className="grid gap-5 lg:grid-cols-2">{developerPaths.map(({ icon: Icon, audience, title, description, steps, outcome }) => <article key={audience} className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black"><Icon className="h-5 w-5 text-amber-200" /></span><p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{audience}</p></div><h3 className="mt-6 text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-zinc-400">{description}</p><ol className="mt-7 grid gap-3">{steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-300"><span className="font-mono text-xs text-zinc-600">0{index + 1}</span>{step}</li>)}</ol><p className="mt-7 border-t border-white/10 pt-6 text-sm leading-6 text-zinc-400"><span className="font-medium text-white">Outcome: </span>{outcome}</p></article>)}</div></div>
        </section>

        <section id="setup" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-12 max-w-3xl"><Label>Use the repository today</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Local setup, step by step</h2><p className="mt-5 leading-7 text-zinc-400">Requirements: Node.js 24 or 26, pnpm 11, Git, and Docker Desktop. These commands run the current source repository; the shorter <code className="text-zinc-300">create-sparkkit</code> flow remains a future milestone.</p></div><div className="grid gap-4 lg:grid-cols-2">{localSetup.map(([number, title, command]) => <article key={number} className="overflow-hidden rounded-2xl border border-white/10 bg-black"><div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><span className="font-mono text-xs text-zinc-600">{number}</span><h3 className="font-medium">{title}</h3></div><pre className="overflow-x-auto whitespace-pre-wrap p-5 font-mono text-xs leading-6 text-amber-100">{command}</pre></article>)}</div><div className="mt-6 rounded-2xl border border-blue-300/20 bg-blue-300/[0.05] p-6 text-sm leading-6 text-zinc-300"><strong className="text-white">Before production:</strong> replace the local authentication secret, use a production PostgreSQL connection, review cookie and CSRF settings, configure rate limits, and run <code>pnpm check</code>. Those hardening tasks are tracked openly in Milestone 2.4.</div></div>
        </section>

        <section className="border-b border-white/10 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><Icon className="h-5 w-5 text-amber-200" /><h2 className="mt-5 font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p></article>)}
          </div>
        </section>

        <section id="workflow" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 max-w-3xl"><Label>Planned developer experience</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">From an empty folder to owned software</h2><p className="mt-5 max-w-2xl leading-7 text-zinc-400">SparkKit should feel like normal software development with fewer foundation decisions. It generates source code and conventions—not a dependency on a proprietary editor.</p></div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
              {workflow.map(([step, title, command, text]) => <article key={step} className="bg-[#0a0a0a] p-6"><div className="flex items-center justify-between"><span className="font-mono text-xs text-zinc-600">{step}</span><Terminal className="h-4 w-4 text-zinc-600" /></div><h3 className="mt-8 text-lg font-semibold">{title}</h3><code className="mt-4 block overflow-x-auto rounded-lg border border-white/10 bg-black px-3 py-2 text-[11px] text-amber-100">{command}</code><p className="mt-4 text-sm leading-6 text-zinc-400">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="architecture" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 max-w-3xl"><Label>Planned core architecture</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Small packages. One coherent foundation.</h2><p className="mt-5 max-w-2xl leading-7 text-zinc-400">Version 0.1 focuses on one complete SaaS vertical slice. Billing, RAG, agent orchestration and a large template catalog stay outside the initial release.</p></div>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Target foundation</p><div className="mt-7 grid gap-5">{foundation.map(([title, text]) => <div key={title} className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/15"><Check className="h-3 w-3" /></span><div><h3 className="text-sm font-medium text-zinc-200">{title}</h3><p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p></div></div>)}</div></div>
              <div className="rounded-3xl border border-white/10 bg-black p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Application dependency flow</p><div className="mt-7 grid gap-3"><div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4"><div className="flex items-center gap-3"><Code2 className="h-4 w-4 text-amber-200" /><span className="font-mono text-sm">Generated SparkKit application</span></div></div><div className="mx-auto h-5 border-l border-white/15" /><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"><KeyRound className="mx-auto h-4 w-4 text-zinc-400" /><span className="mt-2 block text-xs">Auth</span></div><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"><Database className="mx-auto h-4 w-4 text-zinc-400" /><span className="mt-2 block text-xs">PostgreSQL</span></div><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"><Sparkles className="mx-auto h-4 w-4 text-zinc-400" /><span className="mt-2 block text-xs">Optional AI</span></div></div><div className="mx-auto h-5 border-l border-white/15" /><div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"><span className="font-mono text-xs text-zinc-300">Docker · Kubernetes · Any cloud · Sparkbase Cloud</span></div></div></div>
            </div>
          </div>
        </section>

        <section id="deployment" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div className="max-w-3xl"><Label blue>Optional deployment profiles</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Portable first. Managed when useful.</h2></div><p className="max-w-md text-sm leading-6 text-zinc-400">AWS and Kubernetes are deployment targets, not SparkKit requirements. The AWS/EKS profile comes after the local application and Docker image are proven.</p></div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <DeployCard icon={Container} title="Docker" status="First profile" text="Local and single-server deployments." />
              <DeployCard icon={Server} title="Self-hosted" status="Portable" text="Run on infrastructure the developer controls." />
              <DeployCard icon={Network} title="AWS + EKS" status="Planned" text="A documented production deployment example." />
              <DeployCard icon={Cloud} title="Sparkbase Cloud" status="Future" text="Managed sharing, deployment and operations." />
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.025] px-6 py-4"><div><p className="text-sm font-medium">Planned AWS and Kubernetes reference</p><p className="mt-1 text-xs text-zinc-500">Infrastructure example—not part of the core runtime</p></div><span className="rounded-full border border-blue-300/20 bg-blue-300/[0.06] px-3 py-1 text-[10px] uppercase tracking-wider text-blue-300">Planned</span></div><div className="grid gap-px bg-white/10 md:grid-cols-3"><InfraColumn title="Edge" items={['Route 53', 'CloudFront + WAF', 'Application Load Balancer']} /><InfraColumn title="Amazon EKS" items={['Web and API deployments', 'Worker and migration jobs', 'Autoscaling and health checks']} /><InfraColumn title="Managed services" items={['RDS PostgreSQL + S3', 'ECR + Secrets Manager', 'SQS + CloudWatch']} /></div></div>
          </div>
        </section>

        <section id="roadmap" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-12 max-w-3xl"><Label>Open roadmap</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Build the proof before the promise</h2><p className="mt-5 leading-7 text-zinc-400">A milestone is complete only after its code, tests and documentation exist publicly.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">{roadmap.map(([step, title, status, text]) => <article key={step} className="bg-[#0a0a0a] p-6"><div className="flex justify-between"><span className="font-mono text-xs text-zinc-600">{step}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400">{status}</span></div><h3 className="mt-10 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p></article>)}</div></div>
        </section>

        <section id="sparkbase" className="relative overflow-hidden py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(59,130,246,0.12),transparent_35%)]" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-12 max-w-3xl"><Label blue>SparkKit and Sparkbase</Label><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Open-source foundation. Optional managed cloud.</h2></div><div className="grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-2"><Relationship icon={Boxes} title="SparkKit" text="The open-source developer foundation. Build locally, own the source and deploy to infrastructure you choose." points={['Portable application code', 'Local development and Docker', 'No required cloud account']} /><article className="bg-blue-400/[0.045] p-7 sm:p-9"><div className="flex items-center gap-3"><Cloud className="h-5 w-5 text-blue-300" /><h3 className="text-xl font-semibold">Sparkbase Cloud</h3></div><p className="mt-5 leading-7 text-zinc-400">The planned commercial experience for deploying, securing, sharing and operating small software without exposing infrastructure complexity.</p><blockquote className="mt-7 border-l border-blue-300/30 pl-4 text-sm leading-6 text-zinc-300">“Google Docs for software—a cloud where humans and AI agents turn code into secure, shareable applications with a link.”</blockquote></article></div><div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-black p-6 sm:flex-row sm:items-center"><div><p className="font-medium">The relationship stays optional.</p><p className="mt-1 text-sm text-zinc-500">SparkKit works independently. Sparkbase Cloud earns adoption through a better managed experience.</p></div><a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm text-zinc-300 hover:text-white"><GitPullRequest className="h-4 w-4" /> Follow development</a></div></div>
        </section>
      </main>

      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="flex items-center gap-3 text-zinc-300"><BrandLogo compact /><span>by Sparkbase</span></span><span>Early-stage open-source project. Roadmap capabilities are clearly labelled.</span><a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-300 hover:text-white"><Github className="h-4 w-4" /> GitHub</a></div></footer>
    </div>
  );
}

function DeployCard({ icon: Icon, title, status, text }: { icon: typeof Container; title: string; status: string; text: string }) {
  return <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><div className="flex items-start justify-between"><Icon className="h-5 w-5 text-blue-300" /><span className="rounded-full border border-white/10 px-2 py-1 text-[9px] uppercase tracking-wider text-zinc-500">{status}</span></div><h3 className="mt-6 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p></article>;
}

function InfraColumn({ title, items }: { title: string; items: string[] }) {
  return <div className="bg-[#090909] p-6"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">{title}</p><div className="mt-4 space-y-2 text-sm text-zinc-300">{items.map(item => <p key={item}>{item}</p>)}</div></div>;
}

function Relationship({ icon: Icon, title, text, points }: { icon: typeof Boxes; title: string; text: string; points: string[] }) {
  return <article className="border-b border-white/10 bg-white/[0.025] p-7 sm:p-9 lg:border-b-0 lg:border-r"><div className="flex items-center gap-3"><Icon className="h-5 w-5 text-amber-200" /><h3 className="text-xl font-semibold">{title}</h3></div><p className="mt-5 leading-7 text-zinc-400">{text}</p><div className="mt-7 grid gap-3 text-sm text-zinc-300">{points.map(point => <p key={point} className="flex items-center gap-2"><Check className="h-4 w-4 text-zinc-500" />{point}</p>)}</div></article>;
}

function VisionCard({ number, title, text }: { number: string; title: string; text: string }) {
  return <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><span className="font-mono text-xs text-zinc-600">{number}</span><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p></article>;
}
