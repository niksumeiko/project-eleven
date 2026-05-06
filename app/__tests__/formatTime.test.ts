import { describe, it, expect } from 'vitest';
import { formatTime } from '../../helpers/formatTime';

describe('formatTime', () => {
  it('should format a typical duration correctly', () => {
    expect(formatTime(90)).toBe('1m 30s');
  });

  it('should return 0m 0s for 0 seconds', () => {
    expect(formatTime(0)).toBe('0m 0s');
  });

  it('should handle duration less than a minute', () => {
    expect(formatTime(45)).toBe('0m 45s');
  });

  it('should handle an exact minute', () => {
    expect(formatTime(60)).toBe('1m 0s');
  });

  it('should round minutes correctly', () => {
    expect(formatTime(89)).toBe('1m 29s');
  });

  it('should handle large durations beyond an hour', () => {
    expect(formatTime(3600)).toBe('60m 0s');
  });
});
