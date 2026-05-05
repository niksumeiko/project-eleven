import { describe, it, expect } from 'vitest';
import { getConnectionOutcome } from '../../helpers/getConnectionOutcome';
import { connectionOutcome } from '../../types';

describe('getConnectionOutcome', () => {
  it('should return the correct message for Connected', () => {
    expect(getConnectionOutcome('Connected')).toBe(
      connectionOutcome['Connected'],
    );
  });

  it('should return the correct message for Lost', () => {
    expect(getConnectionOutcome('Lost')).toBe(connectionOutcome['Lost']);
  });

  it('should return the correct message for Interference', () => {
    expect(getConnectionOutcome('Interference')).toBe(
      connectionOutcome['Interference'],
    );
  });

  it('should return an empty string for empty string input', () => {
    expect(getConnectionOutcome('')).toBe('');
  });
});
