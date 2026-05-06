export type Target = {
  avatar: string;
  dimension: string;
  duration: number;
  id: string;
  lastKnownLocation: string;
  name: string;
  signalClarity: number;
};

export type DimensionLabel = 'hawkins' | 'upside_down';

export const dimensions: Record<DimensionLabel, string> = {
  hawkins: 'Hawkins',
  upside_down: 'Upside Down',
};

export type Outcome = 'Lost' | 'Connected' | 'Interference' | '';

export const connectionOutcome: Record<Outcome, string> = {
  Lost: 'Connection severed. Eleven needs to rest.',
  Connected: 'Target locked. Signal is strong.',
  Interference:
    'Something is blocking the signal. The Upside Down is interfering.',
  '': '',
};
