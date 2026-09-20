import {
  createTenantDatabase,
  OrganizationPermissionError,
  TenantAccessError,
  type TenantDatabase,
} from '@sparkkit/db';

import { auth } from './auth';
import { getAuthEnvironment, isTrustedRequestOrigin } from './auth-environment';
import { database } from './database';

type ProjectTenantResult =
  | { ok: false; response: Response }
  | { ok: true; tenant: TenantDatabase };

export async function requireProjectTenant(request: Request, organizationId: unknown): Promise<ProjectTenantResult> {
  const session = await auth.api.getSession({ headers: request.headers });

  if (session === null) {
    return { ok: false, response: Response.json({ error: 'Authentication is required.' }, { status: 401 }) };
  }

  if (typeof organizationId !== 'string' || organizationId.trim().length === 0) {
    return { ok: false, response: Response.json({ error: 'Organization is required.' }, { status: 400 }) };
  }

  try {
    const tenant = await createTenantDatabase(database, {
      organizationId,
      userId: session.user.id,
    });
    return { ok: true, tenant };
  } catch (error) {
    if (error instanceof TenantAccessError || error instanceof OrganizationPermissionError) {
      return { ok: false, response: Response.json({ error: 'The organization is not accessible.' }, { status: 403 }) };
    }
    throw error;
  }
}

export function rejectUntrustedMutation(request: Request): Response | null {
  if (!isTrustedRequestOrigin(request, getAuthEnvironment().trustedOrigins)) {
    return Response.json({ error: 'The request origin is not trusted.' }, { status: 403 });
  }
  return null;
}

export function projectErrorResponse(error: unknown): Response | null {
  if (error instanceof TenantAccessError) {
    return Response.json({ error: 'The project is not accessible.' }, { status: 404 });
  }
  if (error instanceof OrganizationPermissionError) {
    return Response.json({ error: error.message }, { status: 403 });
  }
  if (error instanceof TypeError || error instanceof SyntaxError) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return null;
}
