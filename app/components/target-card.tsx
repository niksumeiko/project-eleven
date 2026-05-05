import cx from 'classnames';
import { Button } from './ui/button';

type Props = {
  name: string;
  signalClarity: string;
  sessionDuration: string;
  dimension: { label: string; value: 'hawkins' | 'upside_down' };
  onFocus: VoidFunction;
};

export function TargetCard(props: Props) {
  return (
    <div data-testid="target-card" className="flex justify-between items-center p-5 w-full bg-card border-void transition-colors duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <p data-testid="target-name" className="text-base font-semibold tracking-wide text-foreground">
            {props.name}
          </p>
          <span
            data-testid="target-dimension"
            className={cx(
              'px-2 py-0.5 text-xs font-semibold uppercase tracking-widest',
              {
                'badge-upside': props.dimension.value === 'upside_down',
                'badge-hawkins': props.dimension.value === 'hawkins',
              },
            )}
          >
            {props.dimension.label}
          </span>
        </div>
        <div className="flex gap-6">
          <p className="text-xs text-muted-value">
            Signal{' '}
            <span data-testid="target-signal" className="font-mono text-foreground">
              {props.signalClarity}
            </span>
          </p>
          <p className="text-xs text-muted-value">
            Duration{' '}
            <span data-testid="target-duration" className="font-mono text-foreground">
              {props.sessionDuration}
            </span>
          </p>
        </div>
      </div>
      <Button onClick={props.onFocus}>Focus</Button>
    </div>
  );
}
