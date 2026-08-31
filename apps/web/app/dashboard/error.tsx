'use client';

import { useEffect } from 'react';

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Workspace rendering failed', error);
  }, [error]);

  return (
    <main className="workspace-state-page">
      <section className="panel workspace-state" role="alert">
        <div className="state-icon error" aria-hidden="true">!</div>
        <p className="kicker">Unexpected error</p>
        <h1>The workspace could not be loaded.</h1>
        <p>Your data has not been changed. Retry the request, or return after checking the local services.</p>
        <button className="primary-button compact" type="button" onClick={reset}>Try again →</button>
      </section>
    </main>
  );
}
