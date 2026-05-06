import { convertToPercentage } from '@/helpers/convertToPercentage';
import { formatTime } from '@/helpers/formatTime';
import { getDimensionLabel } from '@/helpers/getDimensionLabel';
import { DimensionLabel, Target } from '@/types';
import React from 'react';

type TargetProps = {
  targets: Target[];
  handleEvaluateConnection: (target: Target) => void;
};

const Targets = ({ targets, handleEvaluateConnection }: TargetProps) => {
  return (
    <>
      <h2 className="font-semibold text-gray-800 mb-3">Targets</h2>
      <ul className="flex flex-col gap-4" data-testid="targets-list">
        {targets.map((target) => (
          <li
            key={target.id}
            className="group odd:bg-[#daeef7] even:bg-white  rounded-xl px-3 py-3 flex items-center justify-between gap-3 border-b border-blue-100 last:border-b-0"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-base">
                  {target.name}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    getDimensionLabel(target.dimension as DimensionLabel) ===
                    'Upside Down'
                      ? 'bg-red-200 text-red-700'
                      : 'bg-green-300 text-green-800'
                  }`}
                >
                  {getDimensionLabel(target.dimension as DimensionLabel)}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Signal clarity: {convertToPercentage(target.signalClarity)}
              </p>
              <p className="text-xs text-gray-600">
                Session duration: {formatTime(target.duration)}
              </p>
            </div>

            <button
              onClick={() => handleEvaluateConnection(target)}
              className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-blue-300 text-blue-400 bg-transparent transition-colors group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 cursor-pointer"
            >
              Focus
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Targets;
