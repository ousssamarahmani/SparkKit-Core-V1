import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client.ts';

const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://sparkkit:sparkkit@localhost:5432/sparkkit';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const fixtures = [
  {
    user: {
      id: '11111111-1111-4111-8111-111111111111',
      email: 'owner@acme.test',
      name: 'Acme Owner',
    },
    organization: {
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      name: 'Acme Workshop',
      slug: 'acme-workshop',
    },
  },
  {
    user: {
      id: '22222222-2222-4222-8222-222222222222',
      email: 'owner@northstar.test',
      name: 'Northstar Owner',
    },
    organization: {
      id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      name: 'Northstar Studio',
      slug: 'northstar-studio',
    },
  },
] as const;

async function seedFixture(fixture: (typeof fixtures)[number]) {
  const user = await prisma.user.upsert({
    where: { email: fixture.user.email },
    update: { name: fixture.user.name },
    create: fixture.user,
  });

  const organization = await prisma.organization.upsert({
    where: { slug: fixture.organization.slug },
    update: { name: fixture.organization.name },
    create: fixture.organization,
  });

  await prisma.membership.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: user.id,
      },
    },
    update: { role: 'OWNER' },
    create: {
      id: `${user.id.slice(0, 8)}-${organization.id.slice(0, 4)}-4000-8000-000000000001`,
      organizationId: organization.id,
      userId: user.id,
      role: 'OWNER',
    },
  });
}

try {
  for (const fixture of fixtures) {
    await seedFixture(fixture);
  }

  console.log(`Seeded ${fixtures.length} deterministic SparkKit tenants.`);
} finally {
  await prisma.$disconnect();
}
