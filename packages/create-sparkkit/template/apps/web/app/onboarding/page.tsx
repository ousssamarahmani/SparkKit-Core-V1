'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function updateName(value: string) {
    setName(value);
    setSlug(value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const response = await fetch('/api/organizations', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, slug }) });
    const result = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(result.error ?? 'Could not create the organization.');
      return;
    }
    router.push(`/dashboard?organization=${result.organization.id}`);
    router.refresh();
  }

  return (
    <main className="onboarding-page"><div className="onboarding-shell"><Link className="brand" href="/"><span className="brand-mark">S</span><span>SparkKit</span></Link><div className="onboarding-progress"><span className="done">1</span><i /><span className="active">2</span><i /><span>3</span></div><p className="kicker">Organization setup · Step 2 of 3</p><h1>Name your workspace</h1><p className="onboarding-intro">Your organization keeps members, projects, and data within one secure boundary. You will become its owner.</p><form className="onboarding-form" onSubmit={submit}><label>Organization name<input required minLength={2} maxLength={80} value={name} onChange={(event) => updateName(event.target.value)} placeholder="Acme Studio" /></label><label>Workspace URL<div className="slug-input"><span>sparkkit.local/</span><input required minLength={2} maxLength={63} value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="acme-studio" /></div></label><div className="owner-callout"><span className="owner-icon">✓</span><div><strong>You will be the owner</strong><p>Owners can manage the organization, members, roles, and all projects.</p></div></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" disabled={pending} type="submit">{pending ? 'Creating…' : 'Create workspace'}<span>→</span></button></form></div></main>
  );
}
