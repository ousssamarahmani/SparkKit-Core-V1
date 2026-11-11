import assert from 'node:assert/strict';
import test from 'node:test';
import { filterAndSortProjects } from '../lib/project-list';

const projects = [
  { id: '1', name: 'Gamma', description: 'design tool', createdAt: '2025-03-01T00:00:00.000Z' },
  { id: '2', name: 'alpha', description: 'reports', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: '3', name: 'Beta', description: 'Design system', createdAt: '2025-02-01T00:00:00.000Z' },
];

test('sorts projects newest first', () => {
  assert.deepEqual(filterAndSortProjects(projects, '', 'newest').map(({ id }) => id), ['1', '3', '2']);
});

test('sorts projects oldest first', () => {
  assert.deepEqual(filterAndSortProjects(projects, '', 'oldest').map(({ id }) => id), ['2', '3', '1']);
});

test('sorts project names A–Z without case sensitivity', () => {
  assert.deepEqual(filterAndSortProjects(projects, '', 'name-asc').map(({ id }) => id), ['2', '3', '1']);
});

test('sorts project names Z–A without case sensitivity', () => {
  assert.deepEqual(filterAndSortProjects(projects, '', 'name-desc').map(({ id }) => id), ['1', '3', '2']);
});

test('applies search and sorting together and leaves the input array unchanged', () => {
  const original = [...projects];
  const result = filterAndSortProjects(projects, ' DESIGN ', 'name-asc');

  assert.deepEqual(result.map(({ id }) => id), ['3', '1']);
  assert.deepEqual(projects, original);
});
