import React, { useState } from 'react';
import { NavSection } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { DocsViewer } from './components/DocsViewer';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { CliSimulator } from './components/CliSimulator';
import { TemplatesDirectory } from './components/TemplatesDirectory';
import { SchemaVisualizer } from './components/SchemaVisualizer';
import { AiAgentPlayground } from './components/AiAgentPlayground';
import { ReadmeViewer } from './components/ReadmeViewer';
import { StrategyRoadmapView } from './components/StrategyRoadmapView';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('landing');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(undefined);
  const [starCount, setStarCount] = useState<number>(21840);
  const [hasStarred, setHasStarred] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Header Navigation */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        starCount={starCount}
        setStarCount={setStarCount}
        hasStarred={hasStarred}
        setHasStarred={setHasStarred}
      />

      {/* Dynamic View Container */}
      <main className="flex-1">
        {activeSection === 'landing' && (
          <LandingPage
            setActiveSection={setActiveSection}
            setSelectedTemplateId={setSelectedTemplateId}
          />
        )}

        {activeSection === 'docs' && <DocsViewer />}

        {activeSection === 'architecture' && <ArchitectureExplorer />}

        {activeSection === 'cli' && <CliSimulator />}

        {activeSection === 'templates' && (
          <TemplatesDirectory selectedTemplateId={selectedTemplateId} />
        )}

        {activeSection === 'schema' && <SchemaVisualizer />}

        {activeSection === 'ai-playground' && <AiAgentPlayground />}

        {activeSection === 'readme' && (
          <ReadmeViewer
            starCount={starCount}
            setStarCount={setStarCount}
            hasStarred={hasStarred}
            setHasStarred={setHasStarred}
          />
        )}

        {activeSection === 'strategy' && <StrategyRoadmapView />}
      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
