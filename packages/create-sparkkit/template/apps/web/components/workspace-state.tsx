import Link from 'next/link';

interface WorkspaceStateProps {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  eyebrow: string;
  title: string;
}

export function WorkspaceState({
  actionHref = '/dashboard',
  actionLabel = 'Return to workspace',
  description,
  eyebrow,
  title,
}: WorkspaceStateProps) {
  return (
    <main className="workspace-state-page">
      <section className="panel workspace-state" role="status">
        <div className="state-icon" aria-hidden="true">◇</div>
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <Link className="primary-button compact" href={actionHref}>{actionLabel} →</Link>
      </section>
    </main>
  );
}
