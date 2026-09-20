#!/usr/bin/env node

import { createSparkKitProject } from './index.js';

const usage = `Create a new SparkKit project directory.

Usage:
  create-sparkkit <project-name>

Example:
  create-sparkkit customer-portal

Project names must use lowercase kebab-case. Existing targets are never overwritten.`;

async function main(args: string[]): Promise<void> {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(usage);
    return;
  }

  if (args.length !== 1) {
    throw new Error(`Expected exactly one project name.\n\n${usage}`);
  }

  const target = await createSparkKitProject(args[0] ?? '');
  console.log(`Created ${target}`);
  console.log('Next: copy .env.example to .env, run pnpm install, then follow README.md.');
}

main(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unable to create the project.';
  console.error(`Error: ${message}`);
  process.exitCode = 1;
});
