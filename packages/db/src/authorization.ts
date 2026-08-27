import type {
  Membership,
  MembershipRole,
  PrismaClient,
} from './generated/prisma/client.js';

export type OrganizationPermission =
  | 'organization:read'
  | 'organization:update'
  | 'organization:delete'
  | 'membership:list'
  | 'membership:manage'
  | 'project:read'
  | 'project:create'
  | 'project:update'
  | 'project:delete';

const rolePermissions: Record<
  MembershipRole,
  ReadonlySet<OrganizationPermission>
> = {
  OWNER: new Set([
    'organization:read',
    'organization:update',
    'organization:delete',
    'membership:list',
    'membership:manage',
    'project:read',
    'project:create',
    'project:update',
    'project:delete',
  ]),
  ADMIN: new Set([
    'organization:read',
    'membership:list',
    'membership:manage',
    'project:read',
    'project:create',
    'project:update',
    'project:delete',
  ]),
  MEMBER: new Set([
    'organization:read',
    'membership:list',
    'project:read',
    'project:create',
    'project:update',
  ]),
};

export class OrganizationPermissionError extends Error {
  constructor(permission: OrganizationPermission) {
    super(`The active organization role does not grant ${permission}.`);
    this.name = 'OrganizationPermissionError';
  }
}

export function hasOrganizationPermission(
  role: MembershipRole,
  permission: OrganizationPermission,
): boolean {
  return rolePermissions[role].has(permission);
}

export function assertOrganizationPermission(
  role: MembershipRole,
  permission: OrganizationPermission,
): void {
  if (!hasOrganizationPermission(role, permission)) {
    throw new OrganizationPermissionError(permission);
  }
}

export async function requireOrganizationPermission(
  client: PrismaClient,
  organizationId: string,
  userId: string,
  permission: OrganizationPermission,
): Promise<Membership> {
  const membership = await client.membership.findUnique({
    where: {
      organizationId_userId: { organizationId, userId },
    },
  });

  if (membership === null) {
    throw new OrganizationPermissionError(permission);
  }

  assertOrganizationPermission(membership.role, permission);
  return membership;
}
