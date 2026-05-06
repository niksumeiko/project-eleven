'use client';
import { useGetTargets } from '@/app/hooks/useGetTargets';
import { useOutcome } from '@/app/hooks/useOutcome';
import Targets from './targets';

import TargetOutcome from './targetOutcome';

const VoidSession = () => {
  const { error, isLoading, targets } = useGetTargets();
  const {
    outcome,
    setOutcome,
    handleEvaluateConnection,
    selectedTarget,
    setSelectedTarget,
  } = useOutcome();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <section className="w-full max-w-lg">
      <div>
        <h1
          data-testid="page-heading"
          className="text-black text-2xl font-bold capitalize"
        >
          void session
        </h1>
        <div className="py-4 w-full">
          {selectedTarget && (
            <TargetOutcome
              outcome={outcome}
              setOutcome={setOutcome}
              selectedTarget={selectedTarget}
              setSelectedTarget={setSelectedTarget}
            />
          )}

          {!selectedTarget && (
            <Targets
              targets={targets}
              handleEvaluateConnection={handleEvaluateConnection}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default VoidSession;
