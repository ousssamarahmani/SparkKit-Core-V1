export default function DashboardLoading() {
  return (
    <main className="dashboard-page" aria-busy="true" aria-label="Loading workspace">
      <header className="page-header loading-header"><div><span className="skeleton skeleton-kicker" /><span className="skeleton skeleton-title" /><span className="skeleton skeleton-copy" /></div></header>
      <section className="metric-grid" aria-hidden="true">
        {[0, 1, 2].map((item) => <article className="metric-card loading-card" key={item}><span className="skeleton skeleton-copy" /><span className="skeleton skeleton-metric" /></article>)}
      </section>
      <section className="dashboard-grid" aria-hidden="true"><article className="panel loading-panel"><span className="skeleton skeleton-title" /><span className="skeleton skeleton-row" /><span className="skeleton skeleton-row" /></article><article className="panel loading-panel"><span className="skeleton skeleton-copy" /><span className="skeleton skeleton-row" /></article></section>
      <span className="sr-only">Loading your SparkKit workspace.</span>
    </main>
  );
}
