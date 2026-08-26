import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createDatabaseClient,
  createTenantDatabase,
  TenantAccessError,
} from '../src/index.ts';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';

const acme = {
  organizationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  userId: '11111111-1111-4111-8111-111111111111',
};

const northstar = {
  organizationId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  userId: '22222222-2222-4222-8222-222222222222',
};

test('tenant helpers reject cross-organization reads and writes', async () => {
  const client = createDatabaseClient(databaseUrl);
  let projectId: string | undefined;

  try {
    const acmeDb = await createTenantDatabase(client, acme);
    const northstarDb = await createTenantDatabase(client, northstar);
    const project = await acmeDb.createProject({
      name: 'Acme private project',
      description: 'Visible only inside Acme Workshop.',
    });
    projectId = project.id;

    assert.equal((await acmeDb.requireProject(projectId)).organizationId, acme.organizationId);
    assert.equal((await northstarDb.listProjects()).some(({ id }) => id === projectId), false);

    await assert.rejects(
      northstarDb.requireProject(projectId),
      TenantAccessError,
    );
    await assert.rejects(
      northstarDb.updateProject(projectId, { name: 'Unauthorized rename' }),
      TenantAccessError,
    );
    await assert.rejects(
      northstarDb.deleteProject(projectId),
      TenantAccessError,
    );

    assert.equal((await acmeDb.requireProject(projectId)).name, 'Acme private project');
  } finally {
    if (projectId !== undefined) {
      await client.project.deleteMany({ where: { id: projectId } });
    }
    await client.$disconnect();
  }
});

test('tenant context rejects a user without membership', async () => {
  const client = createDatabaseClient(databaseUrl);

  try {
    await assert.rejects(
      createTenantDatabase(client, {
        organizationId: northstar.organizationId,
        userId: acme.userId,
      }),
      TenantAccessError,
    );
  } finally {
    await client.$disconnect();
  }
});
