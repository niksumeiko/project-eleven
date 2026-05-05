import { Target } from '@/types';

export async function fetchTargets(): Promise<Target[]> {
  const response = await fetch('http://localhost:3210/targets');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch targets');
  }

  return response.json();
}
