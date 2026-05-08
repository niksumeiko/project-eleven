'use client';

import { useEffect, useState } from 'react';
import type { Target } from './voidSession/domain/target';
import { fetchTargets } from './voidSession/targetsClient/targets.adapter';
import { toTargetsViewModel } from './voidSession/targetsViewModel/targets.viewModel';

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);

  useEffect(() => {
    fetchTargets().then(setTargets);
  }, []);

  const viewModels = toTargetsViewModel(targets);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Void Session</h1>
        <ul>
          {viewModels.map((vm) => (
            <li key={vm.id}>
              <h2>{vm.name}</h2>
              <p>Signal clarity: {vm.signalClarity}</p>
              <p>Duration: {vm.duration}</p>
              <p>{vm.dimension}</p>
              <button type="button">Focus</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
