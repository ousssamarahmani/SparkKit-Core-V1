'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authClient } from '../../lib/auth-client';

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'sign-in' | 'register'>('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = mode === 'register'
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });
    setPending(false);

    if (result.error) {
      setError(result.error.message ?? 'Authentication failed. Please try again.');
      return;
    }

    router.push(mode === 'register' ? '/onboarding' : '/dashboard');
    router.refresh();
  }

  return (
    <main className="auth-page">
      <section className="auth-story"><Link className="brand" href="/"><span className="brand-mark">S</span><span>SparkKit</span></Link><div><p className="kicker">Small software, serious foundation</p><h1>Build the useful thing. Keep the code.</h1><p>Authentication, organizations, tenant-safe data, and a clean path from local development to deployment.</p></div><p className="auth-note">Open source · Portable · AI-ready</p></section>
      <section className="auth-panel"><div className="auth-card"><div className="auth-tabs" role="tablist" aria-label="Authentication mode"><button type="button" className={mode === 'sign-in' ? 'active' : ''} onClick={() => setMode('sign-in')}>Sign in</button><button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Create account</button></div><div className="auth-heading"><p className="kicker">Welcome to SparkKit</p><h2>{mode === 'register' ? 'Create your workspace' : 'Continue building'}</h2><p>{mode === 'register' ? 'Start with your account, then name your organization.' : 'Sign in to your organization workspace.'}</p></div><form onSubmit={submit}>{mode === 'register' && <label>Full name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ada Lovelace" /></label>}<label>Email address<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" /></label><label>Password<input required minLength={8} type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" disabled={pending} type="submit">{pending ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}<span>→</span></button></form><p className="legal-copy">Early-stage reference application. Use production credentials only in a secured deployment.</p></div></section>
    </main>
  );
}
