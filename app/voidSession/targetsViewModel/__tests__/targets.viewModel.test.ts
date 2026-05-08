import { describe, expect, test } from 'vitest';
import { toTargetsViewModel } from '../targets.viewModel';
import type { Target } from '../../domain/target';

test('maps an array of targets to their view models', () => {
  const targets: Target[] = [
    {
      id: 'st-001',
      name: 'Mike Wheeler',
      signalClarity: 0.92,
      duration: 185,
      dimension: 'hawkins',
      lastKnownLocation: 'Wheeler residence, Maple Street',
    },
    {
      id: 'st-002',
      name: 'Will Byers',
      signalClarity: 0.756,
      duration: 45,
      dimension: 'upside-down',
      lastKnownLocation: 'Unknown',
    },
  ];

  expect(toTargetsViewModel(targets)).toEqual([
    {
      id: 'st-001',
      name: 'Mike Wheeler',
      signalClarity: '92%',
      duration: '3m 5s',
      dimension: 'Hawkins',
      lastKnownLocation: 'Wheeler residence, Maple Street',
    },
    {
      id: 'st-002',
      name: 'Will Byers',
      signalClarity: '76%',
      duration: '0m 45s',
      dimension: 'Upside Down',
      lastKnownLocation: 'Unknown',
    },
  ]);
});

describe('void session outcome', () => {
  test('returns Lost when signal clarity is below 0.3', () => {
    const targets: Target[] = [
      {
        id: 'st-002',
        name: 'Mike Wheeler',
        signalClarity: 0.92,
        duration: 185,
        dimension: 'hawkins',
        lastKnownLocation: 'Wheeler residence, Maple Street',
      },
      {
        id: 'st-001',
        name: 'Will Byers',
        signalClarity: 0.2,
        duration: 300,
        dimension: 'upside_down',
        lastKnownLocation: 'Castle Byers',
      },
    ];

    expect(toTargetsViewModel(targets, 'st-001')).toEqual({
      heading: 'Lost',
      copy: 'Connection severed. Eleven needs to rest.',
    });
  });

  test('returns Lost when duration exceeds 1200 seconds', () => {
    const targets: Target[] = [
      {
        id: 'st-001',
        name: 'Will Byers',
        signalClarity: 0.85,
        duration: 1201,
        dimension: 'hawkins',
        lastKnownLocation: 'Castle Byers',
      },
    ];

    expect(toTargetsViewModel(targets, 'st-001')).toEqual({
      heading: 'Lost',
      copy: 'Connection severed. Eleven needs to rest.',
    });
  });

  test('returns Connected when signal clarity is at least 0.8 and dimension is hawkins', () => {
    const targets: Target[] = [
      {
        id: 'st-001',
        name: 'Mike Wheeler',
        signalClarity: 0.8,
        duration: 185,
        dimension: 'hawkins',
        lastKnownLocation: 'Wheeler residence, Maple Street',
      },
    ];

    expect(toTargetsViewModel(targets, 'st-001')).toEqual({
      heading: 'Connected',
      copy: 'Target located. Signal is strong.',
      lastKnownLocation: 'Wheeler residence, Maple Street',
    });
  });
});
