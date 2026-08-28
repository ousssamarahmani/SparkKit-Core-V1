import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createTenantDatabase } from '@sparkkit/db';

import { AppShell } from '../../components/app-shell';
import { ProjectManager } from '../../components/project-manager';
import { database } from '../../lib/database';
import { requireWorkspace } from '../../lib/workspace';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ organization?: string }> }) {
  const [{ session, memberships }, query] = await Promise.all([requireWorkspace(), searchParams]);
  if (memberships.length === 0) redirect('/onboarding');
  const active = memberships.find(({ organizationId }) => organizationId === query.organization) ?? memberships[0];
  const organizations = memberships.map(({ organization, role }) => ({ id: organization.id, name: organization.name, role }));
  const tenant = await createTenantDatabase(database, { organizationId: active.organizationId, userId: session.user.id });
  const projects = (await tenant.listProjects()).map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    createdAt: project.createdAt.toISOString(),
  }));

  return (
    <AppShell user={session.user} organizations={organizations}>
      <main className="dashboard-page"><header className="page-header"><div><p className="kicker">{active.organization.name}</p><h1>Good morning, {session.user.name.split(' ')[0]}.</h1><p>Here is what is happening across your workspace.</p></div></header><section className="metric-grid" aria-label="Workspace summary"><Metric label="Active projects" value={String(projects.length)} note={projects.length === 0 ? 'Ready for your first build' : 'Scoped to this workspace'} /><Metric label="Your role" value={active.role} note="Database-enforced access" /><Metric label="Environment" value="Local" note="PostgreSQL connected" /></section><section className="dashboard-grid"><ProjectManager organizationId={active.organizationId} initialProjects={projects} canDelete={active.role === 'OWNER' || active.role === 'ADMIN'} /><article className="panel activity-panel"><div className="panel-heading"><div><p className="kicker">Foundation</p><h2>Security checklist</h2></div></div><ul className="check-list"><li><span>✓</span><div><strong>Authentication enabled</strong><p>Database-backed sessions</p></div></li><li><span>✓</span><div><strong>Tenant boundary active</strong><p>Organization-scoped data</p></div></li><li><span>✓</span><div><strong>Role checks enabled</strong><p>Owner, admin, and member</p></div></li></ul><Link className="text-link" href={`/settings?organization=${active.organizationId}`}>Review workspace settings →</Link></article></section></main>
    </AppShell>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="metric-card"><p>{label}</p><strong>{value}</strong><span>{note}</span></article>;
}
