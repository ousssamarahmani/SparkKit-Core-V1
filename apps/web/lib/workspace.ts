import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from './auth';
import { database } from './database';

export async function requireWorkspace() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session === null) {
    redirect('/sign-in');
  }

  const memberships = await database.membership.findMany({
    where: { userId: session.user.id },
    include: { organization: true },
    orderBy: { createdAt: 'asc' },
  });

  return { session, memberships };
}
