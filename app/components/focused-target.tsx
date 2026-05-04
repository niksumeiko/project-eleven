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
  className: string;
  headingStyle: React.CSSProperties;
  wrapperStyle: React.CSSProperties;
};

function getStatusConfig(status: ConnectionStatus): StatusConfig {
  if (status === 'Connected') {
    return {
      heading: 'Connected',
      className: 'status-connected',
      headingStyle: { color: '#27ae60', textShadow: '0 0 16px rgba(39,174,96,0.5)' },
      wrapperStyle: { background: 'rgba(39,174,96,0.04)', border: '1px solid rgba(39,174,96,0.2)' },
    };
  }

  if (status === 'Interference') {
    return {
      heading: 'Interference',
      className: 'status-interference',
      headingStyle: { color: '#e67e22', textShadow: '0 0 16px rgba(230,126,34,0.5)' },
      wrapperStyle: { background: 'rgba(230,126,34,0.04)', border: '1px solid rgba(230,126,34,0.2)' },
    };
  }

  return {
    heading: 'Lost',
    className: 'status-lost',
    headingStyle: { color: '#c0392b', textShadow: '0 0 16px rgba(192,57,43,0.6)' },
    wrapperStyle: { background: 'rgba(192,57,43,0.04)', border: '1px solid rgba(192,57,43,0.2)' },
  };
}

export function FocusedTarget({ target, onRelease }: Props) {
  const config = getStatusConfig(target.connectionStatus.status);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.2em' }}>
        Eleven connects to{' '}
        <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{target.name}</span>
        <span style={{ color: 'var(--muted)' }}>...</span>
      </p>

      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <div
            className={`${config.className} rounded-sm overflow-hidden`}
            style={{ border: '2px solid', padding: 2 }}
          >
            <Image
              alt="Eleven"
              src="/profiles/eleven.png"
              width={140}
              height={140}
              style={{ display: 'block', filter: 'grayscale(20%)' }}
            />
          </div>
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Eleven</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-mono" style={{ color: 'var(--void-border)', letterSpacing: '0.1em' }}>
            ···
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '0.2em', opacity: 0.5 }}>link</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={`${config.className} rounded-sm overflow-hidden`}
            style={{ border: '2px solid', padding: 2 }}
          >
            <Image
              alt={target.name}
              src={target.imageUrl}
              width={140}
              height={140}
              style={{ display: 'block', filter: 'grayscale(20%)' }}
            />
          </div>
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{target.name}</span>
        </div>
      </div>

      <div
        className="flex flex-col gap-3 px-6 py-5 rounded-sm w-full"
        style={config.wrapperStyle}
      >
        <h2
          className="text-2xl font-bold uppercase tracking-widest"
          style={config.headingStyle}
        >
          {config.heading}
        </h2>
        <p className="text-sm" style={{ color: 'var(--muted-body)', lineHeight: 1.7 }}>
          {target.connectionStatus.message}
        </p>
        {target.connectionStatus.status === 'Connected' && (
          <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '0.2em' }}>
            Location{' '}
            <span className="font-mono" style={{ color: 'var(--foreground)' }}>
              {target.lastKnownLocation}
            </span>
          </p>
        )}
      </div>

      <Button onClick={onRelease}>
        Release
      </Button>
    </div>
  );
}
