import React, { useState } from 'react';
import { prismaSchemaRaw, schemaModels } from '../data/databaseSchemaData';
import { SchemaModel } from '../types';
import { Database, Code2, Copy, Check, Filter, ArrowRight, Layers, Lock, ShieldCheck, Cpu } from 'lucide-react';

export const SchemaVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'erd' | 'code'>('erd');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedModel, setSelectedModel] = useState<SchemaModel>(schemaModels[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All', 'Auth', 'Tenancy', 'AI & Vector', 'Billing', 'System'];

  const filteredModels = selectedCategory === 'All'
    ? schemaModels
    : schemaModels.filter(m => m.category === selectedCategory);

  const handleCopy = () => {
    navigator.clipboard.writeText(prismaSchemaRaw);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
          <Database className="w-3.5 h-3.5 text-white" />
          <span>Production Prisma PostgreSQL Schema</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Database & Multi-Tenancy Architecture
        </h1>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Interactive Entity-Relationship Diagram and Prisma schema. Features built-in <code className="text-zinc-200 font-mono">pgvector</code> support for AI embeddings, organization isolation, Better Auth models, and Stripe subscriptions.
        </p>
      </div>

      {/* Tabs & Category Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        {/* ERD vs Code Toggle */}
        <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('erd')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'erd'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Interactive ERD Map</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Raw Prisma Schema</span>
          </button>
        </div>

        {/* Category Pills */}
        {activeTab === 'erd' && (
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white/10 text-white font-bold border border-white/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content View */}
      {activeTab === 'erd' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Models Node Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredModels.map((model) => {
              const isSelected = selectedModel.name === model.name;
              return (
                <div
                  key={model.name}
                  onClick={() => setSelectedModel(model)}
                  className={`p-5 rounded-xl bg-zinc-950 border cursor-pointer transition-colors space-y-3 ${
                    isSelected
                      ? 'border-white bg-zinc-900'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-white">{model.name}</span>
                    <span className="text-[10px] bg-black text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 font-mono">
                      {model.category}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{model.fields.length} Fields</span>
                    <span className="text-zinc-300">Relations: {model.relations.length}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Model Details Inspector */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-6 shadow-2xl">
            <div className="border-b border-zinc-800 pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-2xl text-white">{selectedModel.name} Model</h3>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-bold border border-white/10 uppercase tracking-wider">
                  {selectedModel.category}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                {selectedModel.description}
              </p>
            </div>

            {/* Fields List */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                Model Fields & Attributes
              </h4>

              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {selectedModel.fields.map((field, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs space-y-1 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">
                        {field.name}
                        {field.isPrimary && <span className="ml-1 text-[10px] text-rose-400 font-sans">(PK)</span>}
                        {field.isRelation && <span className="ml-1 text-[10px] text-sky-400 font-sans">(FK)</span>}
                      </span>
                      <span className="text-zinc-400">{field.type}</span>
                    </div>
                    <p className="text-[11px] font-sans text-zinc-400">
                      {field.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relations List */}
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                Connected Models
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedModel.relations.map((rel, idx) => (
                  <span key={idx} className="bg-zinc-900 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded-lg text-xs font-mono">
                    ↔ {rel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Code View */
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs font-mono">
            <span className="text-zinc-300">packages/db/prisma/schema.prisma</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied to Clipboard' : 'Copy Schema'}</span>
            </button>
          </div>

          <div className="p-6 font-mono text-xs sm:text-sm text-zinc-200 bg-zinc-950 overflow-x-auto max-h-[600px]">
            <pre>{prismaSchemaRaw}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
