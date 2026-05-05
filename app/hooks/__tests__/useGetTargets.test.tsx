import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetTargets } from '../useGetTargets';
import * as targetService from '../../services/targetService';
import { mockTargets } from '../../mocks/mockData';

vi.mock('../../services/targetService', () => ({
  fetchTargets: vi.fn(),
}));

describe('useGetTargets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Initial State', () => {
    it('should start with correct initial state', () => {
      vi.mocked(targetService.fetchTargets).mockImplementation(
        () => new Promise(() => {}),
      );
    });
    const { result } = renderHook(() => useGetTargets());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.targets).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  describe('Successful Fetch', () => {
    it('should fetch and set targets successfully', async () => {
      vi.mocked(targetService.fetchTargets).mockResolvedValue(mockTargets);

      const { result } = renderHook(() => useGetTargets());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.targets).toEqual([]);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.targets).toEqual(mockTargets);
      expect(result.current.error).toBe(null);

      expect(vi.mocked(targetService.fetchTargets)).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle Error with message', async () => {
      const errorMessage = 'Network failed';
      vi.mocked(targetService.fetchTargets).mockRejectedValue(
        new Error(errorMessage),
      );

      const { result } = renderHook(() => useGetTargets());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.targets).toEqual([]);
    });
  });
});
