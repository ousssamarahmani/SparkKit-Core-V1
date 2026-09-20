import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createDatabaseClient,
  createTenantDatabase,
  hasOrganizationPermission,
  OrganizationPermissionError,
  requireOrganizationPermission,
} from '../src/index.js';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';
const database = createDatabaseClient(databaseUrl);
const unique = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const slug = `m2-3-${unique}`;

test.after(async () => {
  await database.organization.deleteMany({ where: { slug } });
  await database.user.deleteMany({
    where: { email: { endsWith: `-${unique}@example.com` } },
  });
  await database.$disconnect();
});

test('owner, admin, and member permissions follow the role matrix', async () => {
  assert.equal(hasOrganizationPermission('OWNER', 'organization:delete'), true);
  assert.equal(hasOrganizationPermission('ADMIN', 'organization:delete'), false);
  assert.equal(hasOrganizationPermission('ADMIN', 'membership:manage'), true);
  assert.equal(hasOrganizationPermission('MEMBER', 'membership:manage'), false);
  assert.equal(hasOrganizationPermission('MEMBER', 'project:update'), true);
  assert.equal(hasOrganizationPermission('MEMBER', 'project:delete'), false);
});

test('database-backed authorization resolves and enforces every role', async () => {
  const organization = await database.organization.create({
    data: { name: 'M2.3 Authorization', slug },
  });
  const roles = ['OWNER', 'ADMIN', 'MEMBER'] as const;

  const users = await Promise.all(
    roles.map(async (role) => {
      const user = await database.user.create({
        data: {
          email: `${role.toLowerCase()}-${unique}@example.com`,
          name: `${role} User`,
        },
      });
      await database.membership.create({
        data: { organizationId: organization.id, userId: user.id, role },
      });
      return { role, user };
    }),
  );

  for (const { user } of users) {
    const membership = await requireOrganizationPermission(
      database,
      organization.id,
      user.id,
      'project:read',
    );
    assert.equal(membership.userId, user.id);
  }

  const member = users.find(({ role }) => role === 'MEMBER');
  assert.ok(member);
  await assert.rejects(
    requireOrganizationPermission(
      database,
      organization.id,
      member.user.id,
      'membership:manage',
    ),
    OrganizationPermissionError,
  );

  const admin = users.find(({ role }) => role === 'ADMIN');
  assert.ok(admin);
  const owner = users.find(({ role }) => role === 'OWNER');
  assert.ok(owner);
  const ownerDatabase = await createTenantDatabase(database, {
    organizationId: organization.id,
    userId: owner.user.id,
  });
  const memberDatabase = await createTenantDatabase(database, {
    organizationId: organization.id,
    userId: member.user.id,
  });
  const adminDatabase = await createTenantDatabase(database, {
    organizationId: organization.id,
    userId: admin.user.id,
  });
  const project = await ownerDatabase.createProject({
    name: 'Role-protected project',
  });

  await assert.rejects(
    memberDatabase.deleteProject(project.id),
    OrganizationPermissionError,
  );
  await adminDatabase.deleteProject(project.id);
  assert.equal(
    await database.project.findUnique({ where: { id: project.id } }),
    null,
  );
});
