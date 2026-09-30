import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { promisify } from 'node:util';

const validProjectName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const windowsReservedName = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;
const supportedPackageManagers = ['pnpm', 'npm', 'yarn', 'bun'] as const;
const execFileAsync = promisify(execFile);

export type PackageManager = (typeof supportedPackageManagers)[number];

export interface CliArguments {
  projectName: string;
  packageManager: PackageManager;
  install: boolean;
  initializeGit: boolean;
}

export type CommandRunner = (
  command: string,
  args: readonly string[],
  cwd: string,
) => Promise<void>;

export class ProjectNameError extends Error {
  override name = 'ProjectNameError';
}

export class ProjectTargetExistsError extends Error {
  override name = 'ProjectTargetExistsError';
}

export class ProjectTemplateError extends Error {
  override name = 'ProjectTemplateError';
}

export class ProjectSetupError extends Error {
  override name = 'ProjectSetupError';
}

export interface CreateSparkKitProjectOptions {
  cwd?: string;
  templateDirectory?: string;
  packageManager?: PackageManager;
}

export interface SetupSparkKitProjectOptions {
  packageManager?: PackageManager;
  install?: boolean;
  initializeGit?: boolean;
  runCommand?: CommandRunner;
}

const packagedTemplateDirectory = fileURLToPath(new URL('../template', import.meta.url));
const tokenizedFiles = ['package.json', 'README.md', 'compose.yaml'];

const packageManagerVersions: Record<PackageManager, string> = {
  pnpm: 'pnpm@11.9.0',
  npm: 'npm@11',
  yarn: 'yarn@4',
  bun: 'bun@1',
};

export function parseCliArguments(args: string[]): CliArguments {
  let packageManager: PackageManager = 'pnpm';
  let install = false;
  let initializeGit = false;
  let installChoiceSeen = false;
  let gitChoiceSeen = false;
  const positional: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index] ?? '';

    if (argument === '--package-manager' || argument === '--pm') {
      const value = args[index + 1];
      if (!value) {
        throw new Error(`${argument} requires one of: ${supportedPackageManagers.join(', ')}.`);
      }
      if (!supportedPackageManagers.includes(value as PackageManager)) {
        throw new Error(`Unsupported package manager "${value}". Choose: ${supportedPackageManagers.join(', ')}.`);
      }
      packageManager = value as PackageManager;
      index += 1;
      continue;
    }

    if (argument.startsWith('--package-manager=') || argument.startsWith('--pm=')) {
      const value = argument.slice(argument.indexOf('=') + 1);
      if (!supportedPackageManagers.includes(value as PackageManager)) {
        throw new Error(`Unsupported package manager "${value}". Choose: ${supportedPackageManagers.join(', ')}.`);
      }
      packageManager = value as PackageManager;
      continue;
    }

    if (argument === '--install' || argument === '--no-install') {
      if (installChoiceSeen) {
        throw new Error('Choose only one of --install or --no-install.');
      }
      install = argument === '--install';
      installChoiceSeen = true;
      continue;
    }

    if (argument === '--git' || argument === '--no-git') {
      if (gitChoiceSeen) {
        throw new Error('Choose only one of --git or --no-git.');
      }
      initializeGit = argument === '--git';
      gitChoiceSeen = true;
      continue;
    }

    if (argument.startsWith('-')) {
      throw new Error(`Unknown option: ${argument}`);
    }

    positional.push(argument);
  }

  if (positional.length !== 1) {
    throw new Error('Expected exactly one project name.');
  }

  return {
    projectName: validateProjectName(positional[0] ?? ''),
    packageManager,
    install,
    initializeGit,
  };
}

export function validateProjectName(projectName: string): string {
  if (projectName.length === 0) {
    throw new ProjectNameError('Enter a project name, for example: create-sparkkit my-app');
  }

  if (projectName.length > 214) {
    throw new ProjectNameError('Project names must contain no more than 214 characters.');
  }

  if (!validProjectName.test(projectName)) {
    throw new ProjectNameError(
      'Use a lowercase kebab-case name such as my-app. Paths, spaces, uppercase letters, and special characters are not allowed.',
    );
  }

  if (windowsReservedName.test(projectName)) {
    throw new ProjectNameError(`"${projectName}" is reserved by Windows. Choose another project name.`);
  }

  return projectName;
}

export function resolveProjectTarget(projectName: string, cwd = process.cwd()): string {
  return path.resolve(cwd, validateProjectName(projectName));
}

export async function createProjectDirectory(
  projectName: string,
  cwd = process.cwd(),
): Promise<string> {
  const target = resolveProjectTarget(projectName, cwd);

  try {
    await mkdir(target, { recursive: false });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      throw new ProjectTargetExistsError(
        `Refusing to overwrite existing target: ${target}`,
      );
    }

    throw error;
  }

  return target;
}

function workspaceScript(
  packageManager: PackageManager,
  workspace: string,
  script: string,
): string {
  switch (packageManager) {
    case 'npm':
      return `npm run ${script} --workspace=${workspace}`;
    case 'yarn':
      return `yarn workspace ${workspace} ${script}`;
    case 'bun':
      return `bun --filter ${workspace} ${script}`;
    default:
      return `pnpm --filter ${workspace} ${script}`;
  }
}

async function personalizeTemplate(
  target: string,
  projectName: string,
  packageManager: PackageManager,
): Promise<void> {
  const replacements: Record<string, string> = {
    '{{PROJECT_NAME}}': projectName,
    '{{PACKAGE_MANAGER}}': packageManager,
  };

  await Promise.all(
    tokenizedFiles.map(async (relativePath) => {
      const filePath = path.join(target, relativePath);
      let contents = await readFile(filePath, 'utf8');
      for (const [token, value] of Object.entries(replacements)) {
        contents = contents.replaceAll(token, value);
      }
      await writeFile(filePath, contents);
    }),
  );

  const packagePath = path.join(target, 'package.json');
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8')) as {
    packageManager?: string;
    scripts: Record<string, string>;
  };
  packageJson.packageManager = packageManagerVersions[packageManager];
  packageJson.scripts.check = `${packageManager} run lint && ${packageManager} run typecheck && ${packageManager} run test && ${packageManager} run build`;
  packageJson.scripts.typecheck = `${workspaceScript(packageManager, '@sparkkit/db', 'db:generate')} && turbo run typecheck`;
  packageJson.scripts['dev:web'] = workspaceScript(packageManager, '@sparkkit/web', 'dev');
  packageJson.scripts['db:migrate'] = workspaceScript(packageManager, '@sparkkit/db', 'db:migrate:deploy');
  packageJson.scripts['db:seed'] = workspaceScript(packageManager, '@sparkkit/db', 'db:seed');
  await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

  if (packageManager === 'npm') {
    const workspacePackagePaths = [
      'apps/web/package.json',
      'packages/db/package.json',
      'tooling/eslint/package.json',
    ];
    await Promise.all(
      workspacePackagePaths.map(async (relativePath) => {
        const workspacePackagePath = path.join(target, relativePath);
        const workspacePackage = JSON.parse(
          await readFile(workspacePackagePath, 'utf8'),
        ) as Record<string, unknown>;

        for (const section of ['dependencies', 'devDependencies']) {
          const dependencies = workspacePackage[section];
          if (!dependencies || typeof dependencies !== 'object') {
            continue;
          }
          for (const [name, version] of Object.entries(dependencies)) {
            if (version === 'workspace:*') {
              (dependencies as Record<string, string>)[name] = '0.0.0';
            }
          }
        }

        await writeFile(
          workspacePackagePath,
          `${JSON.stringify(workspacePackage, null, 2)}\n`,
        );
      }),
    );
  }
}

async function copyTemplate(templateDirectory: string, target: string): Promise<void> {
  const entries = await readdir(templateDirectory);

  await Promise.all(
    entries.map((entry) =>
      cp(path.join(templateDirectory, entry), path.join(target, entry), {
        recursive: true,
        force: false,
        errorOnExist: true,
      }),
    ),
  );
}

export async function createSparkKitProject(
  projectName: string,
  options: CreateSparkKitProjectOptions = {},
): Promise<string> {
  const target = await createProjectDirectory(projectName, options.cwd);
  const templateDirectory = options.templateDirectory ?? packagedTemplateDirectory;
  const packageManager = options.packageManager ?? 'pnpm';

  try {
    await copyTemplate(templateDirectory, target);
    await personalizeTemplate(target, projectName, packageManager);
    return target;
  } catch (error) {
    await rm(target, { recursive: true, force: true });
    const reason = error instanceof Error ? error.message : 'Unknown template error';
    throw new ProjectTemplateError(`Unable to generate the SparkKit template: ${reason}`);
  }
}

const defaultCommandRunner: CommandRunner = async (command, args, cwd) => {
  const executable =
    process.platform === 'win32' && ['npm', 'pnpm', 'yarn'].includes(command)
      ? `${command}.cmd`
      : command;
  await execFileAsync(executable, [...args], { cwd });
};

export async function setupSparkKitProject(
  target: string,
  options: SetupSparkKitProjectOptions = {},
): Promise<void> {
  const packageManager = options.packageManager ?? 'pnpm';
  const runCommand = options.runCommand ?? defaultCommandRunner;

  try {
    if (options.install) {
      await runCommand(packageManager, ['install'], target);
    }
    if (options.initializeGit) {
      await runCommand('git', ['init'], target);
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown setup error';
    throw new ProjectSetupError(
      `Project files were generated, but optional setup failed: ${reason}`,
    );
  }
}
