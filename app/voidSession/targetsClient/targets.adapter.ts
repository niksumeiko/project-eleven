import type { Target } from '../domain/target';

export async function fetchTargets(): Promise<Target[]> {
  const response = await fetch('http://localhost:3210/targets');
  if (!response.ok) {
    throw new Error(`Failed to fetch targets: ${response.status}`);
  }
  return response.json();
}
