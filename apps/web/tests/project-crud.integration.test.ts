import assert from 'node:assert/strict';
import test from 'node:test';

import { createDatabaseClient } from '@sparkkit/db';
import { DELETE, PATCH } from '../app/api/projects/[projectId]/route.js';
import { GET, POST } from '../app/api/projects/route.js';
import { POST as createOrganization } from '../app/api/organizations/route.js';
import { auth } from '../lib/auth.js';

const databaseUrl = process.env.DATABASE_URL ?? 'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';
const database = createDatabaseClient(databaseUrl);
const unique = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const email = `m3-2-${unique}@example.com`;
const slug = `m3-2-${unique}`;
const foreignSlug = `m3-2-foreign-${unique}`;
let cookie = '';
let organizationId = '';

function request(path: string, method = 'GET', body?: unknown) {
  return new Request(`http://localhost:3001${path}`, {
    method,
    headers: { cookie, origin: 'http://localhost:3001', ...(body === undefined ? {} : { 'content-type': 'application/json' }) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

test.before(async () => {
  const registration = await auth.handler(request('/api/auth/sign-up/email', 'POST', {
    name: 'Project Owner', email, password: 'SparkKit-test-password-123!',
  }));
  assert.equal(registration.status, 200);
  cookie = registration.headers.get('set-cookie')?.split(';', 1)[0] ?? '';
  assert.ok(cookie);

  const organization = await createOrganization(request('/api/organizations', 'POST', {
    name: 'M3.2 Projects', slug,
  }));
  assert.equal(organization.status, 201);
  organizationId = (await organization.json()).organization.id;
});

test.after(async () => {
  await database.organization.deleteMany({ where: { slug: { in: [slug, foreignSlug] } } });
  await database.user.deleteMany({ where: { email } });
  await database.$disconnect();
});

test('an authenticated owner can create, list, update, and delete a tenant project', async () => {
  const createdResponse = await POST(request('/api/projects', 'POST', {
    organizationId, name: 'Customer portal', description: 'A focused customer workflow.',
  }));
  assert.equal(createdResponse.status, 201);
  const created = (await createdResponse.json()).project;
  assert.equal(created.organizationId, organizationId);

  const listedResponse = await GET(request(`/api/projects?organization=${organizationId}`));
  assert.equal(listedResponse.status, 200);
  assert.equal((await listedResponse.json()).projects.length, 1);

  const updatedResponse = await PATCH(request(`/api/projects/${created.id}`, 'PATCH', {
    organizationId, name: 'Customer workspace', description: 'Updated safely.',
  }), { params: Promise.resolve({ projectId: created.id }) });
  assert.equal(updatedResponse.status, 200);
  assert.equal((await updatedResponse.json()).project.name, 'Customer workspace');

  const deletedResponse = await DELETE(request(`/api/projects/${created.id}`, 'DELETE', {
    organizationId,
  }), { params: Promise.resolve({ projectId: created.id }) });
  assert.equal(deletedResponse.status, 204);
  assert.equal(await database.project.count({ where: { id: created.id } }), 0);
});

test('project routes reject an organization outside the authenticated membership', async () => {
  const foreign = await database.organization.create({ data: { id: crypto.randomUUID(), name: 'Foreign tenant', slug: foreignSlug } });
  const response = await GET(request(`/api/projects?organization=${foreign.id}`));
  assert.equal(response.status, 403);
});
