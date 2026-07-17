import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import styles from './Button.module.css';

type Variant = 'primary' | 'accent' | 'ghost' | 'outline' | 'reward';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  loading?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
}

/**
 * The one button. Ripple-free but glow-on-hover, GPU-composited press.
 * `primary` = Econet red commit action (preserved brand CTA colour).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', block, loading, iconLeft, iconRight, children, className = '', disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${block ? styles.block : ''} ${loading ? styles.loading : ''} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className={styles.sheen} aria-hidden="true" />
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.label}>
        {iconLeft && <Icon name={iconLeft} size={size === 'lg' ? 22 : 18} />}
        {children}
        {iconRight && <Icon name={iconRight} size={size === 'lg' ? 22 : 18} />}
      </span>
    </button>
  );
});
