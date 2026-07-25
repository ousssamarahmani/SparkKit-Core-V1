import React, { useState } from 'react';
import { Bot, Sparkles, Send, Cpu, Database, Play, RefreshCw, Zap, Check, ArrowRight, Layers, FileText } from 'lucide-react';

export const AiAgentPlayground: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState<string>(
    'You are SparkBot, an AI Copilot built with @sparkkit/ai and Gemini 2.5 Flash. You have access to pgvector RAG document search and database tools.'
  );
  const [selectedModel, setSelectedModel] = useState<'gemini-2.5-flash' | 'gpt-4o' | 'claude-3-5-sonnet'>('gemini-2.5-flash');
  const [promptInput, setPromptInput] = useState<string>('Search knowledge base for subscription pricing and summarize our enterprise features.');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [responseOutput, setResponseOutput] = useState<string>('');
  const [metrics, setMetrics] = useState<{ tokens: number; latencyMs: number } | null>(null);

  const handleRunAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isExecuting) return;

    setIsExecuting(true);
    setExecutionLogs([]);
    setResponseOutput('');
    setMetrics(null);

    const logs = [
      '⚡ Initializing @sparkkit/ai agent context...',
      `[Model Selected]: ${selectedModel}`,
      '🔍 Executing pgvector similarity search on table "knowledge_docs" (orgId: org_acme)...',
      '✔ Found 3 relevant document chunks (Similarity score: 0.942, 0.887, 0.851)',
      '⚡ Injecting system prompt + retrieved vector context into Gemini 2.5 Flash model...',
      '🤖 Streaming AI agent completion...'
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < logs.length) {
        setExecutionLogs(prev => [...prev, logs[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setResponseOutput(
          `Based on our SparkKit Knowledge Base documents:\n\n1. **Enterprise Plan**: $499/month includes dedicated PostgreSQL database, unlimited preview environments, SOC2 compliance, and priority 24/7 SLA.\n2. **AI Gateway**: Gemini 2.5 Flash is enabled natively with prompt caching and cost tracking.\n3. **Pro Plan**: $29/month per workspace with 5M token credits included.`
        );
        setMetrics({ tokens: 482, latencyMs: 240 });
        setIsExecuting(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
          <Bot className="w-3.5 h-3.5 text-white" />
          <span>@sparkkit/ai Agent SDK & RAG Tester</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Native Agent Orchestration
        </h1>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Test drive SparkKit's built-in Vercel AI SDK wrappers, Gemini 2.5 Flash model integration, pgvector RAG document search, and tool invocation execution logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Configuration Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
              Agent Configuration
            </h3>

            {/* Model Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-semibold block">Select LLM Engine</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-zinc-700"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended - Fastest)</option>
                <option value="gpt-4o">OpenAI GPT-4o</option>
                <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
              </select>
            </div>

            {/* System Prompt */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-semibold block">System Instruction Prompt</label>
              <textarea
                rows={4}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 font-mono focus:outline-none focus:border-zinc-700"
              />
            </div>

            {/* RAG Vector Settings */}
            <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-white" />
                  <span>pgvector Document RAG</span>
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-500/20">
                  ENABLED
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Automatically queries table <code className="text-zinc-200">knowledge_docs</code> using 1536-dim vector embeddings before generating answers.
              </p>
            </div>
          </div>
        </div>

        {/* Right Test Execution Canvas */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prompt Form */}
          <form onSubmit={handleRunAgent} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-semibold block">User Input Prompt</label>
              <div className="relative">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Enter query for agent..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-4 pr-32 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
                <button
                  type="submit"
                  disabled={isExecuting}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-white text-black font-bold rounded-lg text-xs flex items-center gap-1.5 hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Agent</span>
                </button>
              </div>
            </div>
          </form>

          {/* Execution Logs */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-400" /> Agent Execution Telemetry
              </span>
              {metrics && (
                <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                  <span>Tokens: <strong className="text-white">{metrics.tokens}</strong></span>
                  <span>Latency: <strong className="text-emerald-400">{metrics.latencyMs}ms</strong></span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-zinc-300 max-h-40 overflow-y-auto">
              {executionLogs.map((log, idx) => (
                <div key={idx} className="text-[12px] leading-relaxed">
                  {log}
                </div>
              ))}
              {isExecuting && (
                <div className="text-zinc-400 animate-pulse">⚡ Agent processing...</div>
              )}
              {executionLogs.length === 0 && !isExecuting && (
                <div className="text-zinc-600 text-center py-4">
                  Click "Run Agent" to stream agent execution trace and pgvector search.
                </div>
              )}
            </div>
          </div>

          {/* Output Response Box */}
          {responseOutput && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-[10px] uppercase tracking-widest text-zinc-400">
                  Agent Response Output
                </span>
                <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                  {selectedModel}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line font-sans">
                {responseOutput}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
