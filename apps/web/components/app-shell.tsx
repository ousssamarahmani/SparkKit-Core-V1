'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';

import { authClient } from '../lib/auth-client';

const projectUrl = process.env.NEXT_PUBLIC_PROJECT_URL ?? 'http://localhost:3000';

interface AppShellProps {
  children: ReactNode;
  organizations: Array<{ id: string; name: string; role: string }>;
  user: { email: string; name: string };
}

export function AppShell({ children, organizations, user }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('organization') ?? organizations[0]?.id;
  const active = organizations.find(({ id }) => id === selectedId) ?? organizations[0];
  const query = active ? `?organization=${active.id}` : '';

  async function signOut() {
    await authClient.signOut();
    router.push('/sign-in');
    router.refresh();
  }

  return (
    <div className="workspace-layout">
      <aside className="sidebar">
        <Link className="brand" href={`/dashboard${query}`} aria-label="SparkKit dashboard"><span className="brand-mark">S</span><span>SparkKit</span></Link>
        <div className="organization-picker"><label htmlFor="organization">Workspace</label><select id="organization" value={active?.id ?? ''} onChange={(event) => router.push(`${pathname}?organization=${event.target.value}`)}>{organizations.map((organization) => <option key={organization.id} value={organization.id}>{organization.name}</option>)}</select>{active && <span>{active.role.toLowerCase()}</span>}</div>
        <nav className="primary-nav" aria-label="Workspace navigation"><Link className={pathname === '/dashboard' ? 'active' : ''} href={`/dashboard${query}`}><span aria-hidden="true">⌂</span> Overview</Link><Link className={pathname === '/settings' ? 'active' : ''} href={`/settings${query}`}><span aria-hidden="true">⚙</span> Settings</Link><a className="project-link" href={projectUrl}><span aria-hidden="true">↗</span> SparkKit Project</a></nav>
        <div className="sidebar-footer"><div className="user-avatar">{user.name.slice(0, 1).toUpperCase()}</div><div className="user-copy"><strong>{user.name}</strong><span>{user.email}</span></div><button type="button" onClick={signOut} aria-label="Sign out">↗</button></div>
      </aside>
      <div className="workspace-content"><header className="mobile-header"><Link className="brand" href={`/dashboard${query}`}><span className="brand-mark">S</span>SparkKit</Link><nav><Link href={`/dashboard${query}`}>Overview</Link><Link href={`/settings${query}`}>Settings</Link><a href={projectUrl}>Project ↗</a></nav></header>{children}</div>
    </div>
  );
}
