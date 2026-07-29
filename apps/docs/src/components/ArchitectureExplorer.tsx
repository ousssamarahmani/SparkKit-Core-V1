import React, { useState } from 'react';
import { monorepoTree } from '../data/architectureData';
import { MonorepoNode } from '../types';
import { Folder, FileCode, Layers, Box, Copy, Check, ChevronRight, ChevronDown, Package, Code2, Cpu } from 'lucide-react';

export const ArchitectureExplorer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<MonorepoNode>(
    monorepoTree.children?.[1]?.children?.[0] || monorepoTree
  );
  const [expandedPaths, setExpandedPaths] = useState<Record<string, boolean>>({
    '/': true,
    '/apps': true,
    '/apps/web': true,
    '/packages': true,
    '/packages/core': true,
    '/packages/auth': true,
    '/packages/ai': true,
    '/packages/db': true
  });
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleExpand = (path: string) => {
    setExpandedPaths(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (node: MonorepoNode) => {
    const isDir = node.type === 'directory';
    const isExpanded = expandedPaths[node.path];
    const isSelected = selectedNode.path === node.path;

    return (
      <div key={node.path} className="text-xs select-none">
        <div
          onClick={() => {
            if (isDir) toggleExpand(node.path);
            setSelectedNode(node);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? 'bg-white/10 text-white font-bold border border-white/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          {isDir ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              )}
              <Folder className="w-4 h-4 text-white shrink-0" />
            </>
          ) : (
            <>
              <span className="w-3.5 h-3.5 shrink-0" />
              <FileCode className="w-4 h-4 text-zinc-500 shrink-0" />
            </>
          )}
          <span className="truncate">{node.name}</span>
          {node.packageDetails && (
            <span className="text-[10px] bg-zinc-900 text-zinc-400 font-mono px-1 rounded ml-auto">
              v{node.packageDetails.version}
            </span>
          )}
        </div>

        {isDir && isExpanded && node.children && (
          <div className="pl-4 border-l border-zinc-800 ml-3 space-y-0.5 mt-0.5">
            {node.children.map(child => renderTree(child))}
          </div>
        )}
      </div>
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
          <Layers className="w-3.5 h-3.5 text-white" />
          <span>Turborepo Monorepo Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Scalable Package Workspace
        </h1>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Inspect SparkKit's Turborepo monorepo file structure. Explore workspace package exports across <code className="text-zinc-200 font-mono">@sparkkit/core</code>, <code className="text-zinc-200 font-mono">@sparkkit/auth</code>, <code className="text-zinc-200 font-mono">@sparkkit/ai</code>, and <code className="text-zinc-200 font-mono">@sparkkit/db</code>.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Tree Explorer */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-4 shadow-xl max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Workspace Directory Tree
            </span>
            <span className="text-[10px] font-mono bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded border border-zinc-800">
              turborepo
            </span>
          </div>

          <div className="space-y-1">
            {renderTree(monorepoTree)}
          </div>
        </div>

        {/* Right Node Inspector / Code Viewer */}
        <div className="lg:col-span-7 space-y-6">
          {/* Node Metadata Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-white" />
                <h3 className="font-bold text-lg text-white">{selectedNode.name}</h3>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                {selectedNode.path}
              </span>
            </div>

            {selectedNode.description && (
              <p className="text-xs text-zinc-400 leading-relaxed">
                {selectedNode.description}
              </p>
            )}

            {/* Package Details if available */}
            {selectedNode.packageDetails && (
              <div className="pt-2 border-t border-zinc-800 space-y-3 text-xs">
                <div>
                  <span className="text-zinc-400 font-semibold block mb-1">Exported APIs:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.packageDetails.exports.map((exp, idx) => (
                      <span key={idx} className="bg-white/10 text-zinc-300 border border-white/10 px-2 py-0.5 rounded font-mono text-[11px]">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 font-semibold block mb-1">Dependencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.packageDetails.dependencies.map((dep, idx) => (
                      <span key={idx} className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded font-mono text-[11px]">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Code Content Box if node has content */}
          {selectedNode.content ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl space-y-0">
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs font-mono">
                <span className="text-zinc-300">{selectedNode.name}</span>
                <button
                  onClick={() => handleCopy(selectedNode.content!)}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 font-mono text-xs text-zinc-200 bg-zinc-950 overflow-x-auto max-h-[400px]">
                <pre>{selectedNode.content}</pre>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center space-y-3">
              <Code2 className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-xs text-zinc-500">
                Select a file node in the tree to inspect its source code implementation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
