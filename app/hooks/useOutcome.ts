import { Outcome, Target } from '@/types';
import { useState } from 'react';

export function useOutcome() {
  const [outcome, setOutcome] = useState<Outcome>('');
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);

  const handleEvaluateConnection = (target: Target) => {
    setSelectedTarget(target);
    if (target.signalClarity < 0.3 || target.duration > 1200) {
      setOutcome('Lost');
    } else if (target.signalClarity >= 0.8 && target.dimension === 'hawkins') {
      setOutcome('Connected');
    } else {
      setOutcome('Interference');
    }
  };

  return {
    outcome,
    setOutcome,
    selectedTarget,
    handleEvaluateConnection,
    setSelectedTarget,
  };
}
