import { describe, expect, it } from 'vitest';
import { convertSecondsToHumanTime } from '../convertSecondsToHumanTime';

describe('convertSecondsToHumanTime', () => {
  it('should return human time correctly', () => {
    const result = convertSecondsToHumanTime(185);

    expect(result).toBe('3m 5s');
  });
});
