import React, { useState } from 'react';
import { githubReadmeMarkdown } from '../data/readmeData';
import { Github, Star, Copy, Check, ExternalLink, Code2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface ReadmeViewerProps {
  starCount: number;
  setStarCount: React.Dispatch<React.SetStateAction<number>>;
  hasStarred: boolean;
  setHasStarred: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReadmeViewer: React.FC<ReadmeViewerProps> = ({
  starCount,
  setStarCount,
  hasStarred,
  setHasStarred
}) => {
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');

  const toggleStar = () => {
    if (hasStarred) {
      setStarCount(prev => prev - 1);
      setHasStarred(false);
    } else {
      setStarCount(prev => prev + 1);
      setHasStarred(true);
    }
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(githubReadmeMarkdown);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto border-t border-white/5">
      {/* GitHub Repo Header Card */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-black border border-zinc-800 flex items-center justify-center text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-white">sparkbase/sparkkit</span>
                <span className="text-[10px] bg-zinc-900 text-zinc-300 font-mono px-2 py-0.5 rounded border border-zinc-800">
                  Public Repository
                </span>
              </div>
              <p className="text-xs text-zinc-400">The fastest way to build production-ready SaaS and AI apps.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Star Counter Simulator */}
            <button
              onClick={toggleStar}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border transition-colors ${
                hasStarred
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Star className={`w-4 h-4 ${hasStarred ? 'fill-black text-black' : 'text-zinc-400'}`} />
              <span>{hasStarred ? 'Starred' : 'Star Repository'}</span>
              <span className="bg-zinc-800 px-2 py-0.5 rounded font-mono text-[11px]">
                {starCount.toLocaleString()}
              </span>
            </button>

            <button
              onClick={copyMarkdown}
              className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
            >
              {copiedRaw ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedRaw ? 'Copied' : 'Copy README.md'}</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Formatted GitHub Render
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'raw'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Raw Markdown Source
          </button>
        </div>
      </div>

      {/* Render Area */}
      {activeTab === 'preview' ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 space-y-8 shadow-2xl">
          {/* Header Banner */}
          <div className="text-center space-y-4 border-b border-zinc-800 pb-8">
            <h1 className="text-4xl font-extrabold text-white">⚡ SparkKit</h1>
            <p className="text-lg text-zinc-300 font-semibold">
              The fastest way to build production-ready SaaS and AI applications.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="px-3 py-1 rounded bg-white/10 text-zinc-200 font-bold border border-white/10">
                ★ {starCount.toLocaleString()} GitHub Stars
              </span>
              <span className="px-3 py-1 rounded bg-white/10 text-zinc-200 font-bold border border-white/10">
                License: MIT
              </span>
              <span className="px-3 py-1 rounded bg-white/10 text-zinc-200 font-bold border border-white/10">
                v1.2.0 NPM
              </span>
            </div>
          </div>

          {/* Why Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-2">
              💡 Why Developers Choose SparkKit
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                    <th className="p-3">Feature</th>
                    <th className="p-3">Next.js Starters</th>
                    <th className="p-3">Supabase</th>
                    <th className="p-3 text-white font-bold">SparkKit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  <tr>
                    <td className="p-3 font-semibold text-white">Monorepo Architecture</td>
                    <td className="p-3 text-rose-400">❌ Single App</td>
                    <td className="p-3 text-rose-400">❌ Service</td>
                    <td className="p-3 text-emerald-400 font-bold">✅ Turborepo Native</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Passkeys & Multi-Tenancy</td>
                    <td className="p-3 text-zinc-500">Partial</td>
                    <td className="p-3 text-zinc-500">Partial</td>
                    <td className="p-3 text-emerald-400 font-bold">✅ Better Auth Built-in</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Native AI Agent & RAG SDK</td>
                    <td className="p-3 text-rose-400">❌ Manual</td>
                    <td className="p-3 text-rose-400">❌ Manual</td>
                    <td className="p-3 text-emerald-400 font-bold">✅ Vercel AI + Gemini Native</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">End-to-End Type Safety</td>
                    <td className="p-3 text-zinc-500">Partial</td>
                    <td className="p-3 text-zinc-500">Partial</td>
                    <td className="p-3 text-emerald-400 font-bold">✅ tRPC + Prisma + Zod</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quickstart in README */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-2">
              📦 Quickstart
            </h2>
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs space-y-2 text-zinc-300">
              <div className="text-zinc-500"># Scaffold project in under 60 seconds</div>
              <div className="text-white font-bold">npx create-sparkkit@latest my-awesome-app</div>
              <div className="pt-2 text-zinc-500"># Start Turborepo HMR server</div>
              <div className="text-white font-bold">cd my-awesome-app && spark dev</div>
            </div>
          </div>
        </div>
      ) : (
        /* Raw Source */
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 font-mono text-xs text-zinc-200 overflow-x-auto shadow-2xl">
          <pre>{githubReadmeMarkdown}</pre>
        </div>
      )}
    </div>
  );
};
