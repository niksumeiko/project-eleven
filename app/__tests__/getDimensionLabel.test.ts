import { describe, it, expect } from 'vitest';
import { getDimensionLabel } from '../../helpers/getDimensionLabel';
import { dimensions } from '../../types';

describe('getDimensionLabel', () => {
  it('should return the correct label for hawkins', () => {
    expect(getDimensionLabel('hawkins')).toBe(dimensions['hawkins']);
  });

  it('should return the correct label for upside_down', () => {
    expect(getDimensionLabel('upside_down')).toBe(dimensions['upside_down']);
  });
});
