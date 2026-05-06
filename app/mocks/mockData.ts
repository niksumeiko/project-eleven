import { Target } from '@/types';

export const mockTargets: Target[] = [
  {
    id: 'st-001',
    name: 'Mike Wheeler',
    signalClarity: 0.92,
    duration: 185,
    dimension: 'hawkins',
    lastKnownLocation: 'Wheeler residence, Maple Street',
    avatar:
      'https://raw.githubusercontent.com/niksumeiko/project-eleven/main/public/profiles/mike.png',
  },
  {
    id: 'st-002',
    name: 'Will Byers',
    signalClarity: 0.41,
    duration: 720,
    dimension: 'upside_down',
    lastKnownLocation: 'Castle Byers',
    avatar:
      'https://raw.githubusercontent.com/niksumeiko/project-eleven/main/public/profiles/will.png',
  },
];
