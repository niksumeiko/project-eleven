import { getConnectionOutcome } from '@/helpers/getConnectionOutcome';
import { Outcome, Target } from '@/types';
import React, { Dispatch, SetStateAction } from 'react';

type TargetOutcomeProps = {
  outcome: Outcome;
  setOutcome: Dispatch<SetStateAction<Outcome>>;
  selectedTarget: Target;
  setSelectedTarget: Dispatch<SetStateAction<Target | null>>;
};
const TargetOutcome = ({
  outcome,
  setOutcome,
  selectedTarget,
  setSelectedTarget,
}: TargetOutcomeProps) => {
  return (
    <div data-testid="target-outcome">
      <p className="text-black">Eleven connects to {selectedTarget.name}...</p>
      <div className="flex justify-between gap-12 w-full mt-2">
        <img
          src="./profiles/eleven.png"
          alt="eleven image"
          className="h-30 object-cover"
        />
        <img
          src={selectedTarget.avatar}
          alt={`${selectedTarget.name}-logo`}
          className="object-cover h-30"
        />
      </div>
      {/* Display outcome */}
      {outcome && (
        <>
          <div
            className={`p-2 rounded-lg mb-4 flex justify-center w-50 mt-4 ${
              outcome === 'Connected'
                ? 'bg-green-100 text-green-700'
                : outcome === 'Lost'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            <p className="font-semibold">Status: {outcome}</p>
          </div>
          <p className="text-black mb-4 w-80">
            {getConnectionOutcome(outcome)}
          </p>
          {outcome === 'Connected' && (
            <p className="text-black mb-4">
              {selectedTarget.lastKnownLocation}
            </p>
          )}
        </>
      )}

      <button
        onClick={() => {
          setSelectedTarget(null);
          setOutcome('');
        }}
        className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-blue-300 text-blue-400 bg-transparent transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500 cursor-pointer capitalize"
      >
        release
      </button>
    </div>
  );
};

export default TargetOutcome;
