import Image from 'next/image';
import { Button } from './ui/button';
import { IFocusedTarget } from './targets-list';
import { ConnectionStatus } from '../service/targets-service';

type Props = {
  target: IFocusedTarget;
  onRelease: VoidFunction;
};

type StatusConfig = {
  heading: string;
  avatarClassName: string;
  outcomeClassName: string;
  headingClassName: string;
};

function getStatusConfig(status: ConnectionStatus): StatusConfig {
  if (status === 'Connected') {
    return {
      heading: 'Connected',
      avatarClassName: 'status-connected',
      outcomeClassName: 'outcome-connected',
      headingClassName: 'text-status-connected',
    };
  }

  if (status === 'Interference') {
    return {
      heading: 'Interference',
      avatarClassName: 'status-interference',
      outcomeClassName: 'outcome-interference',
      headingClassName: 'text-status-interference',
    };
  }

  return {
    heading: 'Lost',
    avatarClassName: 'status-lost',
    outcomeClassName: 'outcome-lost',
    headingClassName: 'text-status-lost',
  };
}

export function FocusedTarget({ target, onRelease }: Props) {
  const config = getStatusConfig(target.connectionStatus.status);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-sm tracking-widest uppercase text-muted">
        Eleven connects to{' '}
        <span className="font-semibold text-foreground">{target.name}</span>
        <span className="text-muted">...</span>
      </p>

      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <div className={`${config.avatarClassName} rounded-sm overflow-hidden border-2`}>
            <Image
              alt="Eleven"
              src="/profiles/eleven.png"
              width={140}
              height={140}
              className="block grayscale-20"
            />
          </div>
          <span className="text-xs uppercase tracking-widest text-muted">Eleven</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-mono text-muted opacity-50 tracking-widest">···</span>
          <span className="text-xs uppercase tracking-widest text-muted opacity-50">link</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className={`${config.avatarClassName} rounded-sm overflow-hidden border-2`}>
            <Image
              alt={target.name}
              src={target.imageUrl}
              width={140}
              height={140}
              className="block grayscale-20"
            />
          </div>
          <span className="text-xs uppercase tracking-widest text-muted">{target.name}</span>
        </div>
      </div>

      <div className={`${config.outcomeClassName} flex flex-col gap-3 px-6 py-5 rounded-sm w-full`}>
        <h2 className={`${config.headingClassName} text-2xl font-bold uppercase tracking-widest`}>
          {config.heading}
        </h2>
        <p className="text-sm text-muted-body leading-relaxed">
          {target.connectionStatus.message}
        </p>
        {target.connectionStatus.status === 'Connected' && (
          <p className="text-xs uppercase tracking-widest text-muted">
            Location <span className="font-mono text-foreground">{target.lastKnownLocation}</span>
          </p>
        )}
      </div>

      <Button onClick={onRelease}>Release</Button>
    </div>
  );
}
