import { convertDecimalToPercentage } from '../convertDecimalToPercentage';
import { describe, expect, it } from 'vitest';

describe('convertDecimalToPercentage', () => {
  it('should return decimal formatted correctly', () => {
    const result = convertDecimalToPercentage(0.9);

    expect(result).toBe('90%');
  });
});
