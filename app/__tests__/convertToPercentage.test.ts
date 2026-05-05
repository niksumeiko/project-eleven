import { convertToPercentage } from '../../helpers/convertToPercentage';
import { describe, it, expect } from 'vitest';

describe('convertToPercentage', () => {
  it('should convert a decimal to a percentage', () => {
    expect(convertToPercentage(0.5)).toBe(50);
  });

  it('should convert 0 to 0', () => {
    expect(convertToPercentage(0)).toBe(0);
  });

  it('should convert 1 to 100', () => {
    expect(convertToPercentage(1)).toBe(100);
  });

  it('should handle negative values', () => {
    expect(convertToPercentage(-0.5)).toBe(-50);
  });

  it('should handle values greater than 1', () => {
    expect(convertToPercentage(1.5)).toBe(150);
  });
});
