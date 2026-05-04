'use client';
import { useState } from 'react';
import { useTargets } from '../hooks/use-targets';
import { FocusedTarget } from './focused-target';
import { TargetCard } from './target-card';
import { ConnectionStatus } from '../service/targets-service';

export type IFocusedTarget = {
  name: string;
  imageUrl: string;
  connectionStatus: {
    message: string;
    status: ConnectionStatus;
  };
};

export function TargetsList() {
  const [focusedTarget, setFocusedTarget] = useState<IFocusedTarget>();
  const viewModel = useTargets();

  if (!viewModel) {
    return null;
  }

  if (focusedTarget) {
    return (
      <FocusedTarget
        target={focusedTarget}
        onRelease={() => setFocusedTarget(undefined)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {viewModel.targets?.map((target) => (
        <TargetCard
          key={target.id}
          name={target.name}
          sessionDuration={target.sessionDuration}
          signalClarity={target.signalClarity}
          dimension={target.dimension}
          onFocus={() =>
            setFocusedTarget({
              imageUrl: target.targetImage,
              name: target.name,
              connectionStatus: target.connectionStatus,
            })
          }
        />
      ))}
    </div>
  );
}
