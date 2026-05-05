import { describe, expect, it } from 'vitest';
import { toTitle } from '../toTitle';

describe('toTitle', () => {
  it('should convert strings to title', () => {
    const result = toTitle('hawkins');

    expect(result).toBe('Hawkins');
  });

  it('should convert compound words', () => {
    const result = toTitle('upside_down');

    expect(result).toBe('Upside Down');
  });
});
