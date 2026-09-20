import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const validProjectName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const windowsReservedName = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;

export class ProjectNameError extends Error {
  override name = 'ProjectNameError';
}

export class ProjectTargetExistsError extends Error {
  override name = 'ProjectTargetExistsError';
}

export class ProjectTemplateError extends Error {
  override name = 'ProjectTemplateError';
}

export interface CreateSparkKitProjectOptions {
  cwd?: string;
  templateDirectory?: string;
}

const packagedTemplateDirectory = fileURLToPath(new URL('../template', import.meta.url));
const tokenizedFiles = ['package.json', 'README.md', 'compose.yaml'];

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

async function personalizeTemplate(target: string, projectName: string): Promise<void> {
  await Promise.all(
    tokenizedFiles.map(async (relativePath) => {
      const filePath = path.join(target, relativePath);
      const contents = await readFile(filePath, 'utf8');
      await writeFile(filePath, contents.replaceAll('{{PROJECT_NAME}}', projectName));
    }),
  );
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

  try {
    await copyTemplate(templateDirectory, target);
    await personalizeTemplate(target, projectName);
    return target;
  } catch (error) {
    await rm(target, { recursive: true, force: true });
    const reason = error instanceof Error ? error.message : 'Unknown template error';
    throw new ProjectTemplateError(`Unable to generate the SparkKit template: ${reason}`);
  }
}
