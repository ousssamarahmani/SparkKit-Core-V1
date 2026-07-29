import React, { useState } from 'react';
import { officialTemplates } from '../data/templatesData';
import { SparkTemplate } from '../types';
import { LayoutGrid, Sparkles, Copy, Check, Terminal, ExternalLink, ArrowRight, Play, Layers, X, Bot, Users, DollarSign, Send, Database, Shield } from 'lucide-react';

interface TemplatesDirectoryProps {
  selectedTemplateId?: string;
}

export const TemplatesDirectory: React.FC<TemplatesDirectoryProps> = ({ selectedTemplateId }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<SparkTemplate | null>(
    officialTemplates.find(t => t.id === selectedTemplateId) || null
  );
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Interactive Mock UI State inside the modal preview
  const [mockChatMessage, setMockChatMessage] = useState('');
  const [mockChatLogs, setMockChatLogs] = useState<{ role: string; text: string }[]>([
    { role: 'assistant', text: 'Hello! I am your SparkKit AI Copilot. How can I assist your SaaS workspace today?' }
  ]);

  const categories = ['All', 'AI', 'SaaS', 'Internal', 'Enterprise', 'CMS'];

  const filtered = activeCategory === 'All'
    ? officialTemplates
    : officialTemplates.filter(t => t.category === activeCategory);

  const copyCli = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleSendMockChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockChatMessage.trim()) return;

    const userText = mockChatMessage;
    setMockChatLogs(prev => [...prev, { role: 'user', text: userText }]);
    setMockChatMessage('');

    setTimeout(() => {
      setMockChatLogs(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `⚡ [SparkKit AI Agent response for "${userText}"]: Executed tool \`vectorSearch\` on database. Retrieved 3 context documents from PostgreSQL. Refilled token credits.`
        }
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
          <LayoutGrid className="w-3.5 h-3.5 text-white" />
          <span>Official SparkKit Templates Catalog</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          10 Production-Ready Starter Architectures
        </h1>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Pre-built Turborepo starter templates for AI SaaS, CRM, Internal Backoffice, Multi-Tenant Enterprise, and Headless CMS. Scaffold instantly with <code className="text-zinc-200 font-mono">npx create-sparkkit</code>.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeCategory === cat
                ? 'bg-white text-black'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tmpl) => (
          <div
            key={tmpl.id}
            className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-bold border border-white/10 uppercase tracking-wider">
                  {tmpl.badge}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">{tmpl.category}</span>
              </div>

              <h3 className="font-bold text-lg text-white group-hover:text-zinc-300 transition-colors">
                {tmpl.name}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {tmpl.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 pt-1">
                {tmpl.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0"></span>
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-900 space-y-3">
              {/* Command box */}
              <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300 truncate mr-2">{tmpl.cliCommand}</span>
                <button
                  onClick={() => copyCli(tmpl.cliCommand)}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white shrink-0"
                  title="Copy command"
                >
                  {copiedCmd === tmpl.cliCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={() => setPreviewTemplate(tmpl)}
                className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-zinc-800"
              >
                <Play className="w-3.5 h-3.5 fill-current text-white" />
                <span>Launch Interactive Mock UI</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Drawer for Interactive Live Mock App Preview */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-xs font-bold border border-white/10 uppercase tracking-wider">
                  Interactive Live App Mock
                </span>
                <span className="text-xs text-zinc-500 font-mono">{previewTemplate.category} Template</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">{previewTemplate.name}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">{previewTemplate.description}</p>
            </div>

            {/* Interactive Mock Dashboard Workspace */}
            <div className="bg-black border border-zinc-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="font-bold text-base text-white">{previewTemplate.mockData.title}</h3>
                  <p className="text-xs text-zinc-400">{previewTemplate.mockData.subtitle}</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/20">
                  LIVE MOCK
                </span>
              </div>

              {/* Metrics Grid */}
              {previewTemplate.mockData.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {previewTemplate.mockData.metrics.map((m, idx) => (
                    <div key={idx} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <span className="text-[11px] text-zinc-400 block">{m.label}</span>
                      <span className="font-bold text-base text-white block">{m.value}</span>
                      <span className="text-[10px] text-emerald-400 block">{m.change}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Interactive AI Chat Mock if AI or Agent template */}
              {previewTemplate.category === 'AI' ? (
                <div className="space-y-3 bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-emerald-400" /> SparkKit AI Agent Playground
                  </span>

                  <div className="space-y-2 max-h-40 overflow-y-auto text-xs font-mono text-zinc-300">
                    {mockChatLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg ${
                          log.role === 'user' ? 'bg-white/10 text-white text-right ml-6' : 'bg-black text-zinc-300 mr-6'
                        }`}
                      >
                        {log.text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMockChat} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Ask the AI agent..."
                      value={mockChatMessage}
                      onChange={(e) => setMockChatMessage(e.target.value)}
                      className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
                    />
                    <button type="submit" className="px-3 py-1.5 bg-white text-black font-bold rounded-lg text-xs flex items-center gap-1">
                      <Send className="w-3 h-3" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* General Workspace Interactive Actions */
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-400 block">Template Quick Actions</span>
                  <div className="flex flex-wrap gap-2">
                    {previewTemplate.mockData.actions?.map((act, idx) => (
                      <button key={idx} className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs border border-zinc-800 transition-colors">
                        {act}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Route Tree */}
              <div className="pt-2 border-t border-zinc-800 space-y-1 text-xs">
                <span className="text-zinc-400 font-semibold block">App Router Routes Included:</span>
                <div className="flex flex-wrap gap-1 font-mono text-[11px] text-zinc-300">
                  {previewTemplate.routeStructure.map((r, idx) => (
                    <span key={idx} className="bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scaffold Callout */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-white block">Ready to build with this template?</span>
                <span className="text-zinc-400 font-mono">{previewTemplate.cliCommand}</span>
              </div>
              <button
                onClick={() => copyCli(previewTemplate.cliCommand)}
                className="px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-zinc-200 transition-colors shrink-0"
              >
                Copy Command
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
