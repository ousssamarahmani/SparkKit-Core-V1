'use client';

import { useState } from 'react';

interface ProjectView {
  createdAt: string;
  description: string | null;
  id: string;
  name: string;
}

interface ProjectManagerProps {
  canDelete: boolean;
  initialProjects: ProjectView[];
  organizationId: string;
}

export function ProjectManager({ canDelete, initialProjects, organizationId }: ProjectManagerProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState<ProjectView | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pending, setPending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  function openCreate() {
    setEditing(null); setName(''); setDescription(''); setError(''); setShowForm(true);
  }

  function openEdit(project: ProjectView) {
    setEditing(project); setName(project.name); setDescription(project.description ?? ''); setError(''); setShowForm(true);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError('');
    if (name.trim().length === 0) { setError('Enter a project name.'); setPending(false); return; }
    try {
      const url = editing ? `/api/projects/${editing.id}` : '/api/projects';
      const response = await fetch(url, {
        method: editing ? 'PATCH' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ organizationId, name: name.trim(), description: description.trim() }),
      });
      const result = await readProjectResponse(response);
      if (!response.ok || !result.project) { setError(result.error ?? 'The project could not be saved.'); return; }
      setProjects((current) => editing ? current.map((item) => item.id === result.project?.id ? result.project : item) : [...current, result.project!]);
      setShowForm(false);
    } catch {
      setError('SparkKit could not reach the workspace service. Check the connection and try again.');
    } finally {
      setPending(false);
    }
  }

  async function remove(project: ProjectView) {
    if (!window.confirm(`Delete ${project.name}? This cannot be undone.`)) return;
    setDeletingId(project.id); setError('');
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ organizationId }),
      });
      if (response.ok) setProjects((current) => current.filter(({ id }) => id !== project.id));
      else setError((await readProjectResponse(response)).error ?? 'The project could not be deleted.');
    } catch {
      setError('SparkKit could not reach the workspace service. The project was not deleted.');
    } finally {
      setDeletingId(null);
    }
  }

  return <>
    <article className="panel project-panel"><div className="panel-heading"><div><p className="kicker">Projects</p><h2>Your workspace</h2></div><div className="project-heading-actions"><span className="status-pill">{projects.length} active</span><button className="primary-button compact" type="button" onClick={openCreate}>New project <span>＋</span></button></div></div>
      {projects.length === 0 ? <div className="empty-state"><div className="empty-icon">◇</div><h3>Create your first small software project</h3><p>Start with one focused workflow. SparkKit keeps it inside the active organization.</p><button className="secondary-button" type="button" onClick={openCreate}>Create a project →</button></div> : <div className="project-list">{projects.map((project) => <article className="project-row" key={project.id}><div><strong>{project.name}</strong><p>{project.description || 'No description yet.'}</p><span>Created {new Date(project.createdAt).toLocaleDateString()}</span></div><div className="project-actions"><button disabled={deletingId === project.id} type="button" onClick={() => openEdit(project)}>Edit</button>{canDelete && <button className="danger-link" disabled={deletingId === project.id} type="button" onClick={() => remove(project)}>{deletingId === project.id ? 'Deleting…' : 'Delete'}</button>}</div></article>)}</div>}
      {error && !showForm && <div className="inline-error" role="alert"><span aria-hidden="true">!</span><p>{error}</p><button type="button" onClick={() => setError('')}>Dismiss</button></div>}
    </article>
    {showForm && <div className="dialog-backdrop" role="presentation"><section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title"><div className="panel-heading"><div><p className="kicker">{editing ? 'Update project' : 'New project'}</p><h2 id="project-dialog-title">{editing ? 'Edit the project' : 'Create a project'}</h2></div><button className="dialog-close" type="button" disabled={pending} onClick={() => setShowForm(false)} aria-label="Close">×</button></div><form className="project-form" onSubmit={save} aria-busy={pending}><label>Project name<input required minLength={1} maxLength={100} value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? 'project-form-error' : undefined} autoFocus /></label><label>Description<textarea maxLength={500} rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What useful workflow will this project support?" /></label>{error && <p className="form-error" id="project-form-error" role="alert">{error}</p>}<div className="dialog-actions"><button className="secondary-button" disabled={pending} type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button compact" disabled={pending} type="submit">{pending ? 'Saving…' : editing ? 'Save changes' : 'Create project'}</button></div></form></section></div>}
  </>;
}

async function readProjectResponse(response: Response): Promise<{ error?: string; project?: ProjectView }> {
  try {
    return (await response.json()) as { error?: string; project?: ProjectView };
  } catch {
    return { error: response.ok ? undefined : 'The workspace returned an unexpected response.' };
  }
}
