import React from 'react';
import { NavSection } from '../types';
import { Sparkles, Github, Terminal, BookOpen, Layers, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveSection: (section: NavSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  return (
    <footer className="bg-black border-t border-white/5 text-zinc-400 text-sm py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold">
              <div className="w-3 h-3 bg-black rotate-45"></div>
            </div>
            <span className="font-bold text-white text-base">SparkKit</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The open-source developer toolkit for production-ready SaaS and AI applications. Built for Next.js 15, Better Auth, Vercel AI SDK, and Sparkbase Cloud.
          </p>
          <div className="text-xs text-zinc-500 font-mono">
            License: Apache-2.0 Open Source
          </div>
        </div>

        {/* Deliverables Navigation */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">Ecosystem</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveSection('docs')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Official Docs
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('architecture')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Turborepo Architecture
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('cli')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> CLI Tooling (spark)
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection('templates')} className="hover:text-white transition-colors">
                10 Official Templates
              </button>
            </li>
          </ul>
        </div>

        {/* Stack & Tools */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">Core Stack</h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>Next.js 15 App Router + React 19</li>
            <li>Better Auth + Passkeys + OAuth</li>
            <li>Prisma ORM + PostgreSQL + pgvector</li>
            <li>Vercel AI SDK + Gemini 2.5 Flash</li>
            <li>tRPC + Zod Type Safety</li>
          </ul>
        </div>

        {/* Cloud & Github */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">Sparkbase Cloud</h4>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            Ready to deploy? Self-host anywhere or push to Sparkbase Cloud managed infrastructure.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveSection('strategy')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-white hover:border-zinc-700 transition-colors w-fit"
            >
              <span>Cloud Monetization & Specs</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveSection('readme')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors w-fit"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub 20k Star Spec</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
        <div>© 2026 Sparkbase Inc. Open source under Apache-2.0.</div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0 font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sparkbase Cloud Status: 100% Operational
          </span>
        </div>
      </div>
    </footer>
  );
};
