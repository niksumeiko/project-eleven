import cx from 'classnames';
import { Button } from './ui/button';

type Props = {
  name: string;
  signalClarity: string;
  sessionDuration: string;
  dimension: { label: string; value: 'hawkins' | 'upside_down' };
  onFocus: VoidFunction;
};

export function TargetCard({
  name,
  sessionDuration,
  signalClarity,
  dimension,
  onFocus,
}: Props) {
  return (
    <div
      className="flex justify-between items-center p-5 w-full"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--void-border)',
        transition: 'border-color 0.2s',
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <p
            className="text-base font-semibold tracking-wide"
            style={{ color: 'var(--foreground)' }}
          >
            {name}
          </p>
          <span
            className={cx(
              'px-2 py-0.5 text-xs font-semibold uppercase tracking-widest',
              {
                'badge-upside': dimension.value === 'upside_down',
                'badge-hawkins': dimension.value === 'hawkins',
              },
            )}
          >
            {dimension.label}
          </span>
        </div>
        <div className="flex gap-6">
          <p className="text-xs" style={{ color: 'var(--muted-value)' }}>
            Signal{' '}
            <span className="font-mono" style={{ color: 'var(--foreground)' }}>
              {signalClarity}
            </span>
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-value)' }}>
            Duration{' '}
            <span className="font-mono" style={{ color: 'var(--foreground)' }}>
              {sessionDuration}
            </span>
          </p>
        </div>
      </div>
      <Button onClick={onFocus}>Focus</Button>
    </div>
  );
}
