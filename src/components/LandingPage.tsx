import React, { useState } from 'react';
import { NavSection } from '../types';
import { officialTemplates } from '../data/templatesData';
import { Sparkles, Copy, Check, Terminal, ArrowRight, ShieldCheck, Cpu, Database, Zap, Layers, Lock, Bot, Github, Cloud, Code2, Globe, Server, Star, Users } from 'lucide-react';

interface LandingPageProps {
  setActiveSection: (section: NavSection) => void;
  setSelectedTemplateId?: (id: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveSection, setSelectedTemplateId }) => {
  const [copiedCli, setCopiedCli] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'sparkkit' | 'traditional'>('sparkkit');

  const copyCommand = () => {
    navigator.clipboard.writeText('npx create-sparkkit@latest');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>SparkKit v1.2.0 Production Ready</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 font-normal">Next.js 15 + React 19 + Better Auth + Gemini</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-[76px] leading-[0.95] font-bold tracking-tighter text-white">
              The Platform for <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                Modern SaaS & AI Apps.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
              SparkKit is an open-source developer toolkit built on Next.js 15, Vercel AI SDK, and tRPC. Ship production-ready applications in minutes, not months.
            </p>

            {/* CLI Callout Input */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <div className="w-full flex items-center justify-between px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-sm text-zinc-300 group hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-zinc-500 font-bold">$</span>
                  <span>npx create-sparkkit@latest</span>
                </div>
                <button
                  onClick={copyCommand}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-2"
                  title="Copy command"
                >
                  {copiedCli ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={() => setActiveSection('cli')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                <span>Run Simulator</span>
              </button>
            </div>

            {/* Secondary Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500 pt-2">
              <button onClick={() => setActiveSection('templates')} className="hover:text-white underline flex items-center gap-1 transition-colors">
                Explore 10 Official Templates
              </button>
              <span>•</span>
              <button onClick={() => setActiveSection('docs')} className="hover:text-white underline flex items-center gap-1 transition-colors">
                Read Documentation
              </button>
              <span>•</span>
              <button onClick={() => setActiveSection('architecture')} className="hover:text-white underline flex items-center gap-1 transition-colors">
                Inspect Turborepo Monorepo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Experience Showcase / Code Comparison */}
      <section className="py-16 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Developer Experience</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Zero Boilerplate. Absolute Type-Safety.
            </p>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Compare configuring Auth, Prisma, tRPC, Gemini AI, and RBAC manually vs SparkKit's unified modular packages.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Code Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="text-xs font-mono text-zinc-400 ml-2">sparkkit.config.ts</span>
              </div>

              {/* Code Toggle Tabs */}
              <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveCodeTab('sparkkit')}
                  className={`px-3 py-1 rounded-md font-bold transition-colors ${
                    activeCodeTab === 'sparkkit'
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  SparkKit (5 Lines)
                </button>
                <button
                  onClick={() => setActiveCodeTab('traditional')}
                  className={`px-3 py-1 rounded-md font-bold transition-colors ${
                    activeCodeTab === 'traditional'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Manual Setup (300+ Lines)
                </button>
              </div>
            </div>

            {/* Code Display Box */}
            <div className="p-6 font-mono text-xs sm:text-sm overflow-x-auto text-zinc-300 bg-zinc-950">
              {activeCodeTab === 'sparkkit' ? (
                <pre className="text-zinc-200 leading-relaxed">
{`import { createSparkKit } from '@sparkkit/core';
import { authPlugin } from '@sparkkit/auth';
import { aiPlugin } from '@sparkkit/ai';
import { stripePlugin } from '@sparkkit/plugin-stripe';

export default createSparkKit({
  appName: 'Acme SaaS',
  plugins: [
    authPlugin({ passkeys: true, oauth: ['github', 'google'], rbac: true }),
    aiPlugin({ model: 'gemini-2.5-flash', vectorRAG: true }),
    stripePlugin({ meteredBilling: true })
  ]
});

// ✅ Auth, Multi-Tenancy, Passkeys, tRPC, Prisma & Gemini AI configured & 100% type-safe!`}
                </pre>
              ) : (
                <pre className="text-zinc-500 leading-relaxed">
{`// ❌ Manual setup requires writing 300+ lines across 12 files:
// 1. NextAuth / Lucia config file
// 2. Prisma client initialization & adapter mapping
// 3. Manual WebAuthn / Passkeys handlers
// 4. Manual Organization tenant middleware
// 5. Custom Gemini API fetch wrappers & vector embeddings handler
// 6. Stripe Webhook route & signature verification logic
// 7. tRPC router context builder & Zod procedure schemas
// ... 290 more lines of boilerplate before writing your first feature!`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles & Features Grid */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Batteries Included</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Everything required to scale from zero to $10M ARR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Better Auth & Multi-Tenancy</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Passkeys, WebAuthn, GitHub/Google OAuth, Organization switching, and granular RBAC roles (Owner, Admin, Member, Viewer).
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Native AI SDK & Gemini RAG</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Powered by Gemini 2.5 Flash, Vercel AI SDK, pgvector embedding storage, prompt template management, and agent tool execution.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Prisma + PostgreSQL Pool</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Production Prisma schema with automated tenant isolation extensions, indexing, and seamless Cloud Run connection pooling.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">End-to-End tRPC API</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero-codegen type safety between backend services and Next.js React 19 UI components with automatic batching.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Turborepo Architecture</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Modular monorepo structure with apps/web, apps/api, packages/core, packages/auth, packages/ai, packages/ui, packages/cli.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Sparkbase Cloud Ready</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Deploy with single command <code className="text-zinc-300 font-mono">spark deploy</code> or self-host anywhere using Docker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Official Templates Section */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Starter Ecosystem</h2>
              <p className="text-3xl font-extrabold text-white tracking-tight mt-1">
                10 Official Production Templates
              </p>
            </div>
            <button
              onClick={() => setActiveSection('templates')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-colors border border-zinc-800 w-fit"
            >
              <span>Explore All Templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officialTemplates.slice(0, 6).map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  if (setSelectedTemplateId) setSelectedTemplateId(template.id);
                  setActiveSection('templates');
                }}
                className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 text-[10px] font-bold border border-white/10 uppercase tracking-wider">
                      {template.badge}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">{template.category}</span>
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-zinc-300 transition-colors">
                    {template.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {template.stack.map((item, idx) => (
                      <span key={idx} className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400 pt-1 truncate">
                    {template.cliCommand}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SparkKit vs Sparkbase Cloud Section */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                  <Globe className="w-3.5 h-3.5" />
                  <span>The Open Source + Cloud Engine</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  Free Open Source Engine. <br />
                  Managed Scale on Sparkbase.
                </h2>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  Anyone can use SparkKit for free forever. Self-host on your own servers or deploy with one command to Sparkbase Cloud for managed PostgreSQL, pgvector storage, AI cost gateway, and zero-ops scaling.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveSection('strategy')}
                    className="px-5 py-2.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2"
                  >
                    <span>View Monetization Strategy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveSection('readme')}
                    className="px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Spec</span>
                  </button>
                </div>
              </div>

              {/* Cloud Card Graphic */}
              <div className="bg-black border border-zinc-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-white" />
                    <span className="font-bold text-sm text-white">Sparkbase Cloud</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                    CONNECTED
                  </span>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-400">Managed Postgres:</span>
                    <span className="text-white font-bold">Primary US-East + pgvector</span>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-400">Unified AI Gateway:</span>
                    <span className="text-emerald-400 font-bold">Gemini 2.5 Flash Proxy</span>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-400">Background Worker:</span>
                    <span className="text-white font-bold">Redis Queue @sparkkit/queue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
