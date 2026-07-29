export type NavSection =
  | 'landing'
  | 'docs'
  | 'architecture'
  | 'cli'
  | 'templates'
  | 'schema'
  | 'ai-playground'
  | 'readme'
  | 'strategy';

export interface DocArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  codeSnippets?: {
    language: string;
    filename: string;
    code: string;
  }[];
}

export interface MonorepoNode {
  name: string;
  type: 'directory' | 'file';
  path: string;
  description?: string;
  children?: MonorepoNode[];
  content?: string;
  packageDetails?: {
    version: string;
    description: string;
    exports: string[];
    dependencies: string[];
  };
}

export interface CliCommand {
  command: string;
  description: string;
  args?: string;
  options?: { flag: string; description: string }[];
  exampleOutput: string[];
  interactivePrompts?: {
    question: string;
    options?: string[];
    default?: string;
  }[];
}

export interface SparkTemplate {
  id: string;
  name: string;
  category: 'AI' | 'SaaS' | 'Internal' | 'Enterprise' | 'CMS';
  description: string;
  badge: string;
  features: string[];
  stack: string[];
  cliCommand: string;
  routeStructure: string[];
  mockData: {
    title: string;
    subtitle: string;
    metrics?: { label: string; value: string; change: string }[];
    actions?: string[];
  };
}

export interface SchemaModel {
  name: string;
  description: string;
  category: 'Auth' | 'Tenancy' | 'AI & Vector' | 'Billing' | 'System';
  fields: {
    name: string;
    type: string;
    attributes?: string[];
    isPrimary?: boolean;
    isRelation?: boolean;
    description: string;
  }[];
  relations: string[];
}

export interface RoadmapMilestone {
  version: string;
  quarter: string;
  title: string;
  status: 'released' | 'in-progress' | 'planned' | 'future';
  summary: string;
  features: { name: string; category: string; description: string; completed: boolean }[];
}

export interface StrategySection {
  id: string;
  title: string;
  summary: string;
  points: { title: string; description: string; tag?: string }[];
}
