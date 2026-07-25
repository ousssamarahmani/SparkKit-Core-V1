import React, { useState } from 'react';
import { NavSection } from '../types';
import { Sparkles, Terminal, BookOpen, Layers, Database, LayoutGrid, Bot, Star, Cloud, ArrowRight, Github, Code2, Compass } from 'lucide-react';

interface HeaderProps {
  activeSection: NavSection;
  setActiveSection: (section: NavSection) => void;
  starCount: number;
  setStarCount: React.Dispatch<React.SetStateAction<number>>;
  hasStarred: boolean;
  setHasStarred: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  starCount,
  setStarCount,
  hasStarred,
  setHasStarred
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStarClick = () => {
    if (hasStarred) {
      setStarCount(prev => prev - 1);
      setHasStarred(false);
    } else {
      setStarCount(prev => prev + 1);
      setHasStarred(true);
    }
  };

  const navItems: { id: NavSection; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Overview', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'docs', label: 'Docs', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'architecture', label: 'Monorepo', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'cli', label: 'CLI Simulator', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'templates', label: 'Templates', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'schema', label: 'Prisma DB', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'ai-playground', label: 'AI Agent SDK', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'readme', label: 'GitHub Spec', icon: <Github className="w-3.5 h-3.5" /> },
    { id: 'strategy', label: 'Roadmap & Strategy', icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/90 border-b border-white/5 text-[#F2F2F2]">
      {/* Top Banner */}
      <div className="bg-zinc-900/80 border-b border-white/5 py-1.5 px-4 text-xs text-center flex items-center justify-center gap-2 text-zinc-300">
        <span className="bg-white/10 text-zinc-300 font-bold px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase border border-white/10">
          Open Source + Cloud
        </span>
        <span className="hidden sm:inline">SparkKit is free & open-source. Deploys natively to <strong>Sparkbase Cloud</strong>.</span>
        <button
          onClick={() => setActiveSection('strategy')}
          className="underline hover:text-white font-medium inline-flex items-center gap-1 transition-colors ml-1"
        >
          View Cloud Strategy <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('landing')}>
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-black rotate-45"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">SparkKit</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  v1.2.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 -mt-0.5">by Sparkbase</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {/* GitHub Star Button */}
            <button
              onClick={handleStarClick}
              className={`flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                hasStarred ? 'text-white bg-white/15 border-white/30' : 'text-zinc-300 hover:bg-white/10'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${hasStarred ? 'fill-white text-white' : 'text-zinc-500'}`} />
              <span>{starCount.toLocaleString()}</span>
            </button>

            {/* Deploy CTA */}
            <button
              onClick={() => setActiveSection('cli')}
              className="flex items-center gap-1.5 bg-white text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-zinc-200 transition-colors"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Deploy App</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              <Code2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium ${
                activeSection === item.id
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-zinc-400 hover:bg-zinc-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
