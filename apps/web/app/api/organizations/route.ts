import {
  createOrganizationForUser,
  OrganizationSlugConflictError,
} from '@sparkkit/db';

import { auth } from '../../../lib/auth';
import {
  getAuthEnvironment,
  isTrustedRequestOrigin,
} from '../../../lib/auth-environment';
import { database } from '../../../lib/database';

export async function POST(request: Request): Promise<Response> {
  if (!isTrustedRequestOrigin(request, getAuthEnvironment().trustedOrigins)) {
    return Response.json({ error: 'The request origin is not trusted.' }, { status: 403 });
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (session === null) {
    return Response.json({ error: 'Authentication is required.' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { name?: unknown; slug?: unknown };

    if (typeof body.name !== 'string') {
      return Response.json(
        { error: 'Organization name is required.' },
        { status: 400 },
      );
    }

    const result = await createOrganizationForUser(database, session.user.id, {
      name: body.name,
      ...(typeof body.slug === 'string' ? { slug: body.slug } : {}),
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof OrganizationSlugConflictError) {
      return Response.json({ error: error.message }, { status: 409 });
    }

    if (error instanceof TypeError || error instanceof SyntaxError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    throw error;
  }
}
