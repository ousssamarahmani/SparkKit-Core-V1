import React from 'react';
import { ArrowRight, Boxes, Check, Cloud, Code2, FileText, Github, Menu, Sparkles, X } from 'lucide-react';

const githubUrl = 'https://github.com/ousssamarahmani/SparkKit-Core-V1';

const currentState = [
  ['Interactive concept', 'A React prototype communicating the direction, interface ideas, and intended developer experience.', Code2],
  ['Open planning documents', 'A scoped architecture, implementation sequence, and task backlog that separate current work from future goals.', FileText],
  ['Public repository', 'Development happens in public without invented adoption numbers, releases, or community metrics.', Github],
] as const;

const foundation = [
  'A working create-sparkkit project generator',
  'One maintained SaaS starter template',
  'PostgreSQL and organization-based tenancy',
  'Authentication and server-side authorization',
  'An optional server-side AI integration',
  'Tests, CI, Docker, and contributor documentation',
];

const roadmap = [
  ['01', 'Foundation', 'Next', 'Establish the real monorepo, shared configuration, tests, CI, and package boundaries.'],
  ['02', 'Working starter', 'Planned', 'Build one complete starter with authentication, organizations, PostgreSQL, and tenant-isolation tests.'],
  ['03', 'Project generator', 'Planned', 'Create and validate a CLI that generates a clean, runnable SparkKit project.'],
  ['04', 'Optional AI', 'Planned', 'Add one provider-neutral server-side AI example with limits, timeouts, and safe secret handling.'],
] as const;

export default function HonestSite() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [['about', 'About'], ['architecture', 'Architecture'], ['roadmap', 'Roadmap'], ['sparkbase', 'Sparkbase Cloud']];

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-amber-300 selection:text-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black"><Sparkles className="h-4 w-4" /></span>
            SparkKit
            <span className="hidden rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-200 sm:inline">Early stage</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            {links.map(([id, label]) => <a key={id} className="transition hover:text-white" href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium transition hover:bg-white hover:text-black sm:flex"><Github className="h-4 w-4" /> View GitHub</a>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/15 p-2 md:hidden" aria-label="Toggle navigation">{menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
          </div>
        </div>
        {menuOpen && <nav className="grid gap-3 border-t border-white/10 px-5 py-4 text-sm text-zinc-300 md:hidden">{links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.13),transparent_42%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />The first open-source project from Sparkbase</div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl lg:text-[92px]">The platform for <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Modern SaaS &amp; AI apps</span></h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">SparkKit is an early-stage open-source project exploring a simpler foundation for SaaS and AI applications. The repository is currently a concept prototype and planning foundation—not a finished toolkit or production release.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"><Github className="h-4 w-4" /> Follow the project</a>
              <a href="#roadmap" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm text-zinc-200 transition hover:bg-white/5">See the plan <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section id="about" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Honest project status</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What exists today</h2><p className="mt-5 leading-7 text-zinc-400">SparkKit is at the idea and prototype stage. Future capabilities are clearly labeled as planned.</p></div>
            <div className="grid gap-4 md:grid-cols-3">{currentState.map(([title, description, Icon]) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><Icon className="h-5 w-5 text-amber-200" /><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p></article>)}</div>
          </div>
        </section>

        <section id="architecture" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 max-w-2xl"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"><Boxes className="h-4 w-4" /> Planned architecture</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A focused first release</h2><p className="mt-5 leading-7 text-zinc-400">Version 0.1 will focus on one complete vertical slice. Billing, RAG, agent orchestration, multiple templates, and managed cloud deployment are not implemented today.</p></div>
            <div className="grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-2">
              <div className="border-b border-white/10 bg-white/[0.025] p-7 sm:p-9 lg:border-b-0 lg:border-r"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Target foundation</p><div className="mt-7 grid gap-4">{foundation.map(item => <div key={item} className="flex items-start gap-3 text-sm text-zinc-300"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/15"><Check className="h-3 w-3" /></span>{item}</div>)}</div></div>
              <div className="bg-black p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Proposed flow</p><div className="mt-7 space-y-3 font-mono text-sm">{['create-sparkkit CLI', 'Generated SaaS application', 'Auth + organization access', 'Prisma + PostgreSQL', 'Optional AI provider'].map((label, i) => <div key={label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"><span className="text-zinc-600">0{i + 1}</span>{label}</div>)}</div></div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-b border-white/10 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-12 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Open roadmap</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Build the proof before the promise</h2><p className="mt-5 leading-7 text-zinc-400">No release dates or completed-feature claims are shown until the corresponding code and tests exist publicly.</p></div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">{roadmap.map(([step, title, status, description]) => <article key={step} className="bg-[#0a0a0a] p-6"><div className="flex justify-between"><span className="font-mono text-xs text-zinc-600">{step}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400">{status}</span></div><h3 className="mt-10 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p></article>)}</div>
          </div>
        </section>

        <section id="sparkbase" className="relative overflow-hidden py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(59,130,246,0.12),transparent_35%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"><Cloud className="h-4 w-4" /> Sparkbase Cloud</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The company thesis behind SparkKit</h2><p className="mt-5 max-w-md leading-7 text-zinc-400">SparkKit is the first open-source project from Sparkbase. Sparkbase Cloud is the planned commercial platform and investment thesis—not a currently available cloud service.</p></div>
            <div className="space-y-4">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Investment thesis</p><p className="mt-5 text-xl leading-8 sm:text-2xl sm:leading-9">AI agents generate millions of micro-applications daily. Sparkbase Cloud captures the value of this software paradigm shift by providing the default infrastructure where those applications live.</p></article>
              <article className="rounded-2xl border border-blue-300/20 bg-blue-400/[0.06] p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">YC one-sentence description</p><blockquote className="mt-5 text-xl font-medium leading-8 sm:text-2xl sm:leading-9">“Sparkbase Cloud is Google Docs for software—the zero-DevOps cloud platform where humans and AI agents instantly deploy, secure, and share small software applications with a link.”</blockquote></article>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="flex items-center gap-2 text-zinc-300"><Sparkles className="h-4 w-4" /> SparkKit by Sparkbase</span><span>Early-stage open-source project. Planned capabilities are not yet implemented.</span><a className="flex items-center gap-2 text-zinc-300 hover:text-white" href={githubUrl} target="_blank" rel="noreferrer"><Github className="h-4 w-4" /> GitHub</a></div></footer>
    </div>
  );
}
