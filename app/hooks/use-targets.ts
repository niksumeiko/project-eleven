'use client';

import { useEffect, useState } from 'react';
import { fetchTarget } from '../domain/target/targets-adapter';
import { createTargetsViewModel, Target } from '../service/targets-service';

export function useTargets() {
  const [targets, setTargets] = useState<Target[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTarget()
      .then(setTargets)
      .finally(() => setIsLoading(false));
  }, []);

  return createTargetsViewModel({ targets, isLoading });
}
