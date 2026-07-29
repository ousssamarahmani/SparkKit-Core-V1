const foundations = [
  "Next.js 16 and React 19",
  "Strict shared TypeScript",
  "pnpm and Turborepo",
  "Portable deployment by default",
];

export default function HomePage() {
  return (
    <main>
      <section className="shell">
        <p className="eyebrow">SparkKit · implementation workspace</p>
        <h1>The reference application starts here.</h1>
        <p className="intro">
          This deliberately small shell proves the monorepo boundary before database,
          authentication, and organization features are added.
        </p>
        <ul>
          {foundations.map((foundation) => (
            <li key={foundation}>{foundation}</li>
          ))}
        </ul>
        <p className="status">Milestone 0.2 · workspace foundation</p>
      </section>
    </main>
  );
}
