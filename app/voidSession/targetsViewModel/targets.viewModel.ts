import type { Target } from '../domain/target';

export type TargetViewModel = {
  signalClarity: string;
  duration: string;
  dimension: string;
};

export function toTargetsViewModel(targets: Target[]): TargetViewModel[] {
  return targets.map((target) => ({
    signalClarity: `${Math.round(target.signalClarity * 100)}%`,
    duration: formatDuration(target.duration),
    dimension: formatDimension(target.dimension),
  }));
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
}

function formatDimension(dimension: string): string {
  return dimension
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
