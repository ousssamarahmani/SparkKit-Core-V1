import { projectErrorResponse, rejectUntrustedMutation, requireProjectTenant } from '../../../lib/project-api';

export async function GET(request: Request): Promise<Response> {
  const organizationId = new URL(request.url).searchParams.get('organization');
  const context = await requireProjectTenant(request, organizationId);
  if (!context.ok) return context.response;

  return Response.json({ projects: await context.tenant.listProjects() });
}

export async function POST(request: Request): Promise<Response> {
  const originError = rejectUntrustedMutation(request);
  if (originError) return originError;

  try {
    const body = (await request.json()) as { description?: unknown; name?: unknown; organizationId?: unknown };
    const context = await requireProjectTenant(request, body.organizationId);
    if (!context.ok) return context.response;
    if (typeof body.name !== 'string') {
      return Response.json({ error: 'Project name is required.' }, { status: 400 });
    }

    const project = await context.tenant.createProject({
      name: body.name,
      description: typeof body.description === 'string' ? body.description : null,
    });
    return Response.json({ project }, { status: 201 });
  } catch (error) {
    const response = projectErrorResponse(error);
    if (response) return response;
    throw error;
  }
}
