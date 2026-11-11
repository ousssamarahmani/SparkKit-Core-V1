export interface ProjectListItem {
  createdAt: string;
  description: string | null;
  name: string;
}

export type ProjectSortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

export function filterAndSortProjects<T extends ProjectListItem>(
  projects: readonly T[],
  query: string,
  sortOrder: ProjectSortOption,
): T[] {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery === '' ? projects : projects.filter((project) =>
    project.name.toLowerCase().includes(normalizedQuery)
      || (project.description ?? '').toLowerCase().includes(normalizedQuery),
  );

  return [...filtered].sort((a, b) => {
    switch (sortOrder) {
      case 'oldest': return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      case 'name-asc': return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      case 'name-desc': return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
      default: return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    }
  });
}
