import type {
  Membership,
  Organization,
  PrismaClient,
} from './generated/prisma/client.js';

export interface CreateOrganizationInput {
  name: string;
  slug?: string;
}

export interface CreatedOrganization {
  organization: Organization;
  membership: Membership;
}

export class OrganizationSlugConflictError extends Error {
  constructor(slug: string) {
    super(`The organization slug "${slug}" is already in use.`);
    this.name = 'OrganizationSlugConflictError';
  }
}

function normalizeName(name: string): string {
  const normalized = name.trim();

  if (normalized.length < 2 || normalized.length > 80) {
    throw new TypeError('Organization name must contain 2 to 80 characters.');
  }

  return normalized;
}

function normalizeSlug(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (normalized.length < 2 || normalized.length > 63) {
    throw new TypeError('Organization slug must contain 2 to 63 characters.');
  }

  return normalized;
}

export async function createOrganizationForUser(
  client: PrismaClient,
  userId: string,
  input: CreateOrganizationInput,
): Promise<CreatedOrganization> {
  const name = normalizeName(input.name);
  const slug = normalizeSlug(input.slug ?? name);

  return client.$transaction(async (transaction) => {
    const existing = await transaction.organization.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing !== null) {
      throw new OrganizationSlugConflictError(slug);
    }

    const organization = await transaction.organization.create({
      data: { name, slug },
    });
    const membership = await transaction.membership.create({
      data: {
        organizationId: organization.id,
        userId,
        role: 'OWNER',
      },
    });

    return { organization, membership };
  });
}
