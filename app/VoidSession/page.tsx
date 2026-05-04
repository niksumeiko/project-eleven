'use client';

import { useEffect, useState } from 'react';
import TargetCard from './TargetCard';
import { Target } from './types';
import { getTargetDetails, mapTargets } from './services/TargetService';
import { formatDimension, formatDuration, formatPercentage } from '../util';
import Image from 'next/image';

export default function VoidSession() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loadingTargets, setLoadingTargets] = useState(true);
  const [targetsError, setTargetsError] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);

  useEffect(() => {
    fetch('http://localhost:3210/targets')
      .then((response) => response.json())
      .then((data) => {
        setTargets(mapTargets(data));
        setLoadingTargets(false);
      })
      .catch((error) => {
        console.error('Error fetching targets:', error);
        setTargetsError(error);
        setLoadingTargets(false);
      });
  }, []);

  if (loadingTargets) {
    return <p>Loading targets...</p>;
  }

  if (targetsError) {
    return <p>Error loading targets. Please try again later.</p>;
  }

  if (selectedTarget) {
    const {
      avatar: avatarUrl,
      connectionStatus,
      copy,
      lastKnownLocation,
    } = getTargetDetails(selectedTarget);
    return (
      <div
        data-testid="selected-target"
        className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-16"
      >
        <h1 className="text-2xl font-bold" data-testid="selected-target-name">
          Eleven connects to {selectedTarget.name}
        </h1>

        <div className="flex items-center gap-4">
          <Image
            src={
              'https://raw.githubusercontent.com/niksumeiko/project-eleven/main/public/profiles/eleven.png'
            }
            width={100}
            height={100}
            alt="Eleven's avatar"
            className="rounded-full"
          />
          <span className="text-2xl text-gray-400">→</span>
          <Image
            src={avatarUrl}
            width={100}
            height={100}
            alt={`${selectedTarget.name}'s avatar`}
            className="rounded-full"
          />
        </div>

        <p>
          Status:{' '}
          <span data-testid="connection-status">{connectionStatus}</span>
        </p>
        <p data-testid="copy">{copy}</p>
        {connectionStatus === 'Connected' && (
          <p>Last Known Location: {lastKnownLocation}</p>
        )}

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-max"
          onClick={() => setSelectedTarget(null)}
        >
          Release
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-16">
      <h1 className="text-2xl font-bold">Void Session</h1>

      <div
        data-testid="targets-list"
        className="flex flex-col gap-4 w-full max-w-4xl items-start"
      >
        <p className="text-foreground text-lg font-medium">Targets</p>
        {targets.map((target) => {
          return (
            <TargetCard
              key={target.id}
              id={target.id}
              name={target.name}
              signalClarityPercentage={formatPercentage(target.signalClarity)}
              dimension={formatDimension(target.dimension)}
              sessionDuration={formatDuration(target.duration)}
              onTargetFocus={() => setSelectedTarget(target)}
            />
          );
        })}
      </div>
    </div>
  );
}
