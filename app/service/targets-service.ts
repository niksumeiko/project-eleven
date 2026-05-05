import { convertDecimalToPercentage } from '../helpers/convertDecimalToPercentage';
import { convertSecondsToHumanTime } from '../helpers/convertSecondsToHumanTime';
import { toTitle } from '../helpers/toTitle';

export type Target = {
  id: string;
  name: string;
  signalClarity: number;
  duration: number;
  dimension: 'hawkins' | 'upside_down';
  lastKnownLocation: string;
  avatar: string;
};

type CreateTargetViewModelArgs = {
  targets?: Target[];
  isLoading: boolean;
};

function getTargetImage(name: string) {
  const images: Record<string, string> = {
    'Mike Wheeler': '/profiles/mike.png',
    'Will Byers': '/profiles/will.png',
    'Dustin Henderson': '/profiles/dustin.png',
    'Lucas Sinclair': '/profiles/lukas.png',
  };

  return images[name];
}

export type ConnectionStatus = 'Lost' | 'Connected' | 'Interference';

function getConnectionStatus(target: Target): {
  status: ConnectionStatus;
  message: string;
} {
  console.log({ target });
  if (target.signalClarity < 0.3 || target.duration > 1200) {
    return {
      status: 'Lost',
      message: 'Connection severed. Eleven needs to rest.',
    };
  }

  if (target.signalClarity >= 0.8 && target.dimension === 'hawkins') {
    return {
      status: 'Connected',
      message: 'Target located. Signal is strong.',
    };
  }

  return {
    status: 'Interference',
    message:
      'Something is blocking the signal. The Upside Down is interfering.',
  };
}

export function createTargetsViewModel({
  targets,
  isLoading,
}: CreateTargetViewModelArgs) {
  if (!targets?.length || isLoading) {
    return undefined;
  }

  return {
    targets: targets.map((target) => ({
      ...target,
      sessionDuration: convertSecondsToHumanTime(target.duration),
      signalClarity: convertDecimalToPercentage(target.signalClarity),
      dimension: {
        label: toTitle(target.dimension),
        value: target.dimension,
      },
      targetImage: getTargetImage(target.name),
      connectionStatus: getConnectionStatus(target),
    })),
  };
}
