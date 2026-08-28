import { projectErrorResponse, rejectUntrustedMutation, requireProjectTenant } from '../../../../lib/project-api';

interface ProjectRouteContext {
  params: Promise<{ projectId: string }>;
}

export async function PATCH(request: Request, { params }: ProjectRouteContext): Promise<Response> {
  const originError = rejectUntrustedMutation(request);
  if (originError) return originError;

  try {
    const [body, { projectId }] = await Promise.all([
      request.json() as Promise<{ description?: unknown; name?: unknown; organizationId?: unknown }>,
      params,
    ]);
    const context = await requireProjectTenant(request, body.organizationId);
    if (!context.ok) return context.response;

    const project = await context.tenant.updateProject(projectId, {
      ...(typeof body.name === 'string' ? { name: body.name } : {}),
      ...(typeof body.description === 'string' || body.description === null
        ? { description: body.description }
        : {}),
    });
    return Response.json({ project });
  } catch (error) {
    const response = projectErrorResponse(error);
    if (response) return response;
    throw error;
  }
}

export async function DELETE(request: Request, { params }: ProjectRouteContext): Promise<Response> {
  const originError = rejectUntrustedMutation(request);
  if (originError) return originError;

  try {
    const body = (await request.json()) as { organizationId?: unknown };
    const context = await requireProjectTenant(request, body.organizationId);
    if (!context.ok) return context.response;
    const { projectId } = await params;
    await context.tenant.deleteProject(projectId);
    return new Response(null, { status: 204 });
  } catch (error) {
    const response = projectErrorResponse(error);
    if (response) return response;
    throw error;
  }
}
