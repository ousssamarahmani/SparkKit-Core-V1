import { redirect } from 'next/navigation';

import { AppShell } from '../../components/app-shell';
import { requireWorkspace } from '../../lib/workspace';

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ organization?: string }> }) {
  const [{ session, memberships }, query] = await Promise.all([requireWorkspace(), searchParams]);
  if (memberships.length === 0) redirect('/onboarding');
  const active = memberships.find(({ organizationId }) => organizationId === query.organization) ?? memberships[0];
  const organizations = memberships.map(({ organization, role }) => ({ id: organization.id, name: organization.name, role }));

  return (
    <AppShell user={session.user} organizations={organizations}>
      <main className="settings-page"><header className="page-header"><div><p className="kicker">Workspace settings</p><h1>Settings</h1><p>Manage the identity and access boundary for {active.organization.name}.</p></div></header><div className="settings-layout"><nav className="settings-nav"><a className="active" href="#general">General</a><a href="#members">Members & roles</a><a href="#security">Security</a></nav><div className="settings-sections"><section id="general" className="panel settings-panel"><div><p className="kicker">General</p><h2>Organization profile</h2><p>This information identifies the active tenant across the application.</p></div><label>Organization name<input readOnly value={active.organization.name} /></label><label>Workspace slug<input readOnly value={active.organization.slug} /></label><button className="secondary-button" type="button" disabled>Editing arrives in a later task</button></section><section id="members" className="panel settings-panel"><div><p className="kicker">Access</p><h2>Members & roles</h2><p>Your current access level is enforced at the database boundary.</p></div><div className="member-row"><div className="user-avatar">{session.user.name.slice(0, 1).toUpperCase()}</div><div><strong>{session.user.name}</strong><span>{session.user.email}</span></div><span className="role-badge">{active.role}</span></div></section><section id="security" className="panel settings-panel"><div><p className="kicker">Security</p><h2>Session protection</h2><p>Trusted origins, CSRF checks, secure production cookies, and sign-in throttling are enabled.</p></div><div className="security-status"><span>✓</span><div><strong>Security baseline active</strong><p>Milestone 2.4 verified</p></div></div></section></div></div></main>
    </AppShell>
  );
}
