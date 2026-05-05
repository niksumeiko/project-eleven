import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Outcome } from '@/types';
import { useOutcome } from '../useOutcome';
import { Target } from '@/types';

describe('useOutcome', () => {
  describe('Initial State', () => {
    it('should start with empty outcome', () => {
      const { result } = renderHook(() => useOutcome());

      expect(result.current.outcome).toBe('');
      expect(result.current.selectedTarget).toBe(null);
    });

    it('should provide all expected functions', () => {
      const { result } = renderHook(() => useOutcome());

      expect(typeof result.current.handleEvaluateConnection).toBe('function');
      expect(typeof result.current.setOutcome).toBe('function');
    });
  });

  describe('Connected Outcome', () => {
    it('should set outcome to "Connected" with signal clarity exactly 0.8 in hawkins', () => {
      const mockTarget = {
        id: 'st-001',
        name: 'Mike Wheeler',
        signalClarity: 0.92,
        duration: 185,
        dimension: 'hawkins',
        lastKnownLocation: 'Wheeler residence, Maple Street',
        avatar:
          'https://raw.githubusercontent.com/niksumeiko/project-eleven/main/public/profiles/mike.png',
      };

      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });

      expect(result.current.outcome).toBe('Connected');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });

    it('should NOT set "Connected" for high signal but wrong dimension', () => {
      const mockTarget = {
        id: 'st-002',
        name: 'Will Byers',
        signalClarity: 0.41,
        duration: 720,
        dimension: 'upside_down',
        lastKnownLocation: 'Castle Byers',
        avatar:
          'https://raw.githubusercontent.com/niksumeiko/project-eleven/main/public/profiles/will.png',
      };
      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });

      expect(result.current.outcome).not.toBe('Connected');
      expect(result.current.outcome).toBe('Interference');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });
  });

  describe('Lost Outcome', () => {
    it('should set outcome to "Lost" for low signal clarity', () => {
      const mockTarget = {
        id: 'st-002',
        name: 'Will Byers',
        dimension: 'upside_down',
        signalClarity: 0.25,
        duration: 720,
        lastKnownLocation: 'Castle Byers',
        avatar: 'https://example.com/avatar.png',
      };

      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });

      expect(result.current.outcome).toBe('Lost');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });

    it('should set outcome to "Lost" for long duration', () => {
      const mockTarget = {
        id: 'st-003',
        name: 'Eleven',
        dimension: 'hawkins',
        signalClarity: 0.85,
        duration: 1500,
        lastKnownLocation: 'Cabin',
        avatar: 'https://example.com/avatar.png',
      };

      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });
      expect(result.current.outcome).toBe('Lost');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });

    it('should set outcome to "Lost" with signal clarity exactly 0.29', () => {
      const mockTarget = {
        id: 'st-003',
        name: 'Eleven',
        dimension: 'hawkins',
        signalClarity: 0.29,
        duration: 100,
        lastKnownLocation: 'Cabin',
        avatar: 'https://example.com/avatar.png',
      };

      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });
      expect(result.current.outcome).toBe('Lost');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });

    it('should set outcome to "Lost" with duration exactly 1201', () => {
      const mockTarget = {
        id: 'st-003',
        name: 'Eleven',
        dimension: 'hawkins',
        signalClarity: 0.85,
        duration: 1201,
        lastKnownLocation: 'Cabin',
        avatar: 'https://example.com/avatar.png',
      };
      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });
      expect(result.current.outcome).toBe('Lost');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });
    it('should set outcome to "Lost" when both conditions are met', () => {
      const mockTarget = {
        id: 'st-003',
        name: 'Eleven',
        dimension: 'hawkins',
        signalClarity: 0.1,
        duration: 1300,
        lastKnownLocation: 'Cabin',
        avatar: 'https://example.com/avatar.png',
      };
      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });
      expect(result.current.outcome).toBe('Lost');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });
  });

  describe('Interference Outcome', () => {
    it('should set outcome to "Interference" for medium signal clarity', () => {
      const mockTarget = {
        id: 'st-002',
        name: 'Will Byers',
        signalClarity: 0.41,
        duration: 720,
        dimension: 'upside_down',
        lastKnownLocation: 'Castle Byers',
        avatar:
          'https://raw.githubusercontent.com/niksumeiko/project-eleven/main/public/profiles/will.png',
      };

      const { result } = renderHook(() => useOutcome());
      act(() => {
        result.current.handleEvaluateConnection(mockTarget);
      });
      expect(result.current.outcome).toBe('Interference');
      expect(result.current.selectedTarget).toEqual(mockTarget);
    });
  });
});
