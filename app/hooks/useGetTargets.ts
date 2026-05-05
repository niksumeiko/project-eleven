'use client';
import { Target } from '@/types';
import { useEffect, useState } from 'react';
import { fetchTargets } from '../services/targetService';

export function useGetTargets() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const loadTargets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTargets();
        if (!abortController.signal.aborted) {
          setTargets(data);
        }
      } catch (error: unknown) {
        if (!abortController.signal.aborted) {
          if (error instanceof Error) {
            setError(error.message || 'Failed to fetch targets');
          } else {
            setError('Failed to fetch targets');
          }
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadTargets();
    return () => abortController.abort();
  }, []);

  return {
    error,
    isLoading,
    targets,
  };
}
