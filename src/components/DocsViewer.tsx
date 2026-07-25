import React, { useState } from 'react';
import { docsArticles } from '../data/docsData';
import { DocArticle } from '../types';
import { Search, BookOpen, Copy, Check, ChevronRight, Sparkles, Code2, ArrowLeft } from 'lucide-react';

export const DocsViewer: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedArticle = docsArticles.find(a => a.id === selectedArticleId) || docsArticles[0];

  const filteredArticles = docsArticles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(docsArticles.map(a => a.category)));

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] flex flex-col md:flex-row border-t border-white/5">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-black border-r border-white/5 p-4 shrink-0 space-y-6">
        {/* Search Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white" />
            <h2 className="font-bold text-base text-white">SparkKit Docs</h2>
            <span className="text-[10px] bg-zinc-900 text-zinc-400 font-mono px-1.5 py-0.5 rounded border border-zinc-800 ml-auto">
              v1.2.0
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
          {categories.map((cat) => {
            const catArticles = filteredArticles.filter(a => a.category === cat);
            if (catArticles.length === 0) return null;

            return (
              <div key={cat} className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-2">
                  {cat}
                </h3>
                <div className="space-y-1">
                  {catArticles.map((art) => {
                    const isSelected = art.id === selectedArticleId;
                    return (
                      <button
                        key={art.id}
                        onClick={() => setSelectedArticleId(art.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-white/10 text-white font-bold border border-white/20'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                      >
                        <span className="truncate">{art.title}</span>
                        {isSelected && <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Article Content Viewer */}
      <main className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
        {/* Category Badge & Title */}
        <div className="space-y-3 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-xs font-bold border border-white/10 uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <span className="text-xs text-zinc-500 font-mono">sparkkit/docs/{selectedArticle.id}.md</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {selectedArticle.title}
          </h1>

          <p className="text-sm text-zinc-400 leading-relaxed">
            {selectedArticle.description}
          </p>
        </div>

        {/* Content Prose */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line space-y-4">
          {selectedArticle.content}
        </div>

        {/* Code Snippets Section */}
        {selectedArticle.codeSnippets && selectedArticle.codeSnippets.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Reference Implementation Code</span>
            </h3>

            {selectedArticle.codeSnippets.map((snippet, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{snippet.filename}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(snippet.code, idx)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 font-mono text-xs text-zinc-200 bg-zinc-950 overflow-x-auto">
                  <pre>{snippet.code}</pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Next / Previous Footer */}
        <div className="pt-8 border-t border-white/5 flex items-center justify-between text-xs">
          <div className="text-zinc-500 font-mono">
            Need help? Ask in the Discord community or run <code className="text-zinc-300">spark doctor</code>
          </div>
        </div>
      </main>
    </div>
  );
};
