import React, { useState } from 'react';
import { roadmapMilestones } from '../data/roadmapData';
import { monetizationStrategy, openSourceStrategy, communityFlywheel } from '../data/strategyData';
import { Compass, CheckCircle2, Clock, Sparkles, DollarSign, Shield, Users, ArrowRight, Zap, Globe, Layers, Cloud } from 'lucide-react';

export const StrategyRoadmapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'monetization' | 'oss-community'>('roadmap');

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
          <Compass className="w-3.5 h-3.5 text-white" />
          <span>SparkKit Roadmap & Commercial Strategy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Product Evolution & Monetization Blueprint
        </h1>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          How SparkKit grows as a world-class open-source project while powering the commercial <strong>Sparkbase Cloud</strong> managed platform.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'roadmap'
              ? 'bg-white text-black'
              : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          Product Roadmap (v0.1 → v2.0)
        </button>
        <button
          onClick={() => setActiveTab('monetization')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'monetization'
              ? 'bg-white text-black'
              : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          Monetization & Sparkbase Cloud
        </button>
        <button
          onClick={() => setActiveTab('oss-community')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'oss-community'
              ? 'bg-white text-black'
              : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          Open Source & Community Flywheel
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmapMilestones.map((milestone) => (
              <div
                key={milestone.version}
                className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-xs font-bold font-mono text-white block">{milestone.version}</span>
                    <h3 className="font-extrabold text-lg text-white mt-0.5">{milestone.title}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border font-mono ${
                    milestone.status === 'released'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : milestone.status === 'in-progress'
                      ? 'bg-white/10 text-white border-white/20'
                      : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                  }`}>
                    {milestone.status} • {milestone.quarter}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {milestone.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">Deliverable Items:</span>
                  <div className="space-y-1.5">
                    {milestone.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        {feat.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <strong className="text-white">{feat.name}</strong> ({feat.category}):{' '}
                          <span className="text-zinc-400">{feat.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'monetization' && (
        <div className="space-y-8">
          {/* Pricing Tiers Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Sparkbase Cloud Pricing Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 font-mono uppercase font-bold">Free Forever</span>
                  <h3 className="text-2xl font-extrabold text-white">$0 / mo</h3>
                  <p className="text-xs text-zinc-400">Perfect for side projects and individual builders.</p>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                  <li className="flex items-center gap-2">✓ 1 Managed PostgreSQL DB (512MB)</li>
                  <li className="flex items-center gap-2">✓ Built-in pgvector extension</li>
                  <li className="flex items-center gap-2">✓ 100k AI Gateway Tokens / mo</li>
                  <li className="flex items-center gap-2">✓ Community Discord support</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900 border border-white/20 space-y-4 relative shadow-2xl">
                <span className="absolute -top-3 right-6 bg-white text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Most Popular
                </span>
                <div className="space-y-1">
                  <span className="text-xs text-white font-mono uppercase font-bold">Pro Team</span>
                  <h3 className="text-2xl font-extrabold text-white">$29 / mo</h3>
                  <p className="text-xs text-zinc-400">For startups and production SaaS teams.</p>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                  <li className="flex items-center gap-2">✓ Dedicated PostgreSQL instance</li>
                  <li className="flex items-center gap-2">✓ Unlimited preview environments</li>
                  <li className="flex items-center gap-2">✓ 5 Million AI Gateway Tokens</li>
                  <li className="flex items-center gap-2">✓ Custom domain & SSL certificates</li>
                  <li className="flex items-center gap-2">✓ Priority email & ticket support</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 font-mono uppercase font-bold">Enterprise Managed</span>
                  <h3 className="text-2xl font-extrabold text-white">$499 / mo</h3>
                  <p className="text-xs text-zinc-400">For high-volume business applications.</p>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                  <li className="flex items-center gap-2">✓ Dedicated VPC & SOC2 compliance</li>
                  <li className="flex items-center gap-2">✓ Multi-region DB failover & daily backups</li>
                  <li className="flex items-center gap-2">✓ Custom AI model fine-tuning</li>
                  <li className="flex items-center gap-2">✓ 24/7 SLA & dedicated solution architect</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Duality Strategy Cards */}
          <div className="space-y-4 pt-4">
            {monetizationStrategy.map((section) => (
              <div key={section.id} className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <h3 className="font-bold text-lg text-white">{section.title}</h3>
                <p className="text-xs text-zinc-400">{section.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {section.points.map((pt, idx) => (
                    <div key={idx} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-1 text-xs">
                      <span className="font-bold text-white block">{pt.title}</span>
                      <p className="text-zinc-400 leading-relaxed">{pt.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'oss-community' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-white" />
              <h3 className="font-bold text-lg text-white">Open Source Governance</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              SparkKit is committed to permissive open source licensing. All core packages are 100% MIT licensed forever with zero vendor lock-in.
            </p>
            <div className="space-y-2 pt-2">
              {openSourceStrategy[0].points.map((pt, idx) => (
                <div key={idx} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-xs">
                  <span className="font-bold text-white block">{pt.title}</span>
                  <span className="text-zinc-400">{pt.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-white" />
              <h3 className="font-bold text-lg text-white">20k+ Star Community Engine</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Driving organic growth through open templates, agency partner certifications, and developer content.
            </p>
            <div className="space-y-2 pt-2">
              {communityFlywheel[0].points.map((pt, idx) => (
                <div key={idx} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-xs">
                  <span className="font-bold text-white block">{pt.title}</span>
                  <span className="text-zinc-400">{pt.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
