import type { Target } from '../domain/target';

export type TargetViewModel = {
  id: string;
  name: string;
  signalClarity: string;
  duration: string;
  dimension: string;
  lastKnownLocation: string;
};

export type VoidSessionViewModel = {
  heading: string;
  copy: string;
  lastKnownLocation?: string;
};

export function toTargetsViewModel(
  targets: Target[],
  selectedTargetId?: string,
): TargetViewModel[] | VoidSessionViewModel {
  if (selectedTargetId) {
    const target = targets.find((t) => t.id === selectedTargetId)!;
    return toVoidSessionOutcome(target);
  }

  return targets.map((target) => ({
    id: target.id,
    name: target.name,
    signalClarity: `${Math.round(target.signalClarity * 100)}%`,
    duration: formatDuration(target.duration),
    dimension: formatDimension(target.dimension),
    lastKnownLocation: target.lastKnownLocation,
  }));
}

function toVoidSessionOutcome(target: Target): VoidSessionViewModel {
  if (target.signalClarity < 0.3 || target.duration > 1200) {
    return {
      heading: 'Lost',
      copy: 'Connection severed. Eleven needs to rest.',
    };
  }

  if (target.signalClarity >= 0.8 && target.dimension === 'hawkins') {
    return {
      heading: 'Connected',
      copy: 'Target located. Signal is strong.',
      lastKnownLocation: target.lastKnownLocation,
    };
  }

  return {
    heading: 'Interference',
    copy: 'Something is blocking the signal. The Upside Down is interfering.',
  };
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
