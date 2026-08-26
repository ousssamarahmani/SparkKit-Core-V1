import type { PrismaClient, Project } from './generated/prisma/client.js';

export interface TenantContext {
  organizationId: string;
  userId: string;
}

export interface CreateTenantProjectInput {
  name: string;
  description?: string | null;
}

export interface UpdateTenantProjectInput {
  name?: string;
  description?: string | null;
}

export class TenantAccessError extends Error {
  constructor(message = 'The requested tenant resource is not accessible.') {
    super(message);
    this.name = 'TenantAccessError';
  }
}

function requireName(name: string): string {
  const normalizedName = name.trim();

  if (normalizedName.length === 0) {
    throw new TypeError('Project name must not be empty.');
  }

  return normalizedName;
}

export interface TenantDatabase {
  readonly organizationId: string;
  readonly userId: string;
  listProjects(): Promise<Project[]>;
  requireProject(projectId: string): Promise<Project>;
  createProject(input: CreateTenantProjectInput): Promise<Project>;
  updateProject(
    projectId: string,
    input: UpdateTenantProjectInput,
  ): Promise<Project>;
  deleteProject(projectId: string): Promise<void>;
}

class ScopedTenantDatabase implements TenantDatabase {
  readonly organizationId: string;
  readonly userId: string;

  constructor(
    private readonly client: PrismaClient,
    context: TenantContext,
  ) {
    this.organizationId = context.organizationId;
    this.userId = context.userId;
  }

  listProjects(): Promise<Project[]> {
    return this.client.project.findMany({
      where: { organizationId: this.organizationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async requireProject(projectId: string): Promise<Project> {
    const project = await this.client.project.findFirst({
      where: {
        id: projectId,
        organizationId: this.organizationId,
      },
    });

    if (project === null) {
      throw new TenantAccessError();
    }

    return project;
  }

  createProject(input: CreateTenantProjectInput): Promise<Project> {
    return this.client.project.create({
      data: {
        organizationId: this.organizationId,
        name: requireName(input.name),
        description: input.description,
      },
    });
  }

  async updateProject(
    projectId: string,
    input: UpdateTenantProjectInput,
  ): Promise<Project> {
    const result = await this.client.project.updateMany({
      where: {
        id: projectId,
        organizationId: this.organizationId,
      },
      data: {
        ...(input.name === undefined ? {} : { name: requireName(input.name) }),
        ...(input.description === undefined
          ? {}
          : { description: input.description }),
      },
    });

    if (result.count !== 1) {
      throw new TenantAccessError();
    }

    return this.requireProject(projectId);
  }

  async deleteProject(projectId: string): Promise<void> {
    const result = await this.client.project.deleteMany({
      where: {
        id: projectId,
        organizationId: this.organizationId,
      },
    });

    if (result.count !== 1) {
      throw new TenantAccessError();
    }
  }
}

export async function createTenantDatabase(
  client: PrismaClient,
  context: TenantContext,
): Promise<TenantDatabase> {
  const membership = await client.membership.findUnique({
    where: {
      organizationId_userId: {
        organizationId: context.organizationId,
        userId: context.userId,
      },
    },
    select: { id: true },
  });

  if (membership === null) {
    throw new TenantAccessError('The user is not a member of this organization.');
  }

  return new ScopedTenantDatabase(client, context);
}
