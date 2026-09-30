#!/usr/bin/env node

import {
  createSparkKitProject,
  parseCliArguments,
  setupSparkKitProject,
} from './index.js';

const usage = `Create a new SparkKit project directory.

Usage:
  create-sparkkit <project-name> [options]

Options:
  --package-manager, --pm <pnpm|npm|yarn|bun>  Package manager (default: pnpm)
  --install | --no-install                       Install dependencies (default: no)
  --git | --no-git                               Initialize Git (default: no)
  --help, -h                                     Show this help

Example:
  create-sparkkit customer-portal --pm pnpm --install --git

Project names must use lowercase kebab-case. Existing targets are never overwritten.`;

async function main(args: string[]): Promise<void> {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(usage);
    return;
  }

  const options = parseCliArguments(args);
  const target = await createSparkKitProject(options.projectName, {
    packageManager: options.packageManager,
  });
  console.log(`Created ${target}`);
  await setupSparkKitProject(target, options);

  if (options.install) {
    console.log(`Installed dependencies with ${options.packageManager}.`);
  } else {
    console.log(`Next: copy .env.example to .env, run ${options.packageManager} install, then follow README.md.`);
  }
  if (options.initializeGit) {
    console.log('Initialized an empty Git repository.');
  }
}

main(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unable to create the project.';
  console.error(`Error: ${message}`);
  process.exitCode = 1;
});
