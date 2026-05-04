import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={classNames(
        'font-semibold px-6 py-2 cursor-pointer text-xs uppercase tracking-widest transition-all duration-200',
        props.className,
      )}
      style={{
        background: 'transparent',
        border: '1px solid var(--btn-border)',
        color: 'var(--btn-color)',
        ...props.style,
      }}
    >
      {children}
    </button>
  );
}
