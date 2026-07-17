import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string | null;
  hint?: string;
  prefix?: ReactNode;
  /** Visually hide the label but keep it for screen readers. */
  hideLabel?: boolean;
}

/**
 * Labelled text input with prefix slot (used for the +263 dialing code),
 * announced error text (never colour-only), and cyan focus glow.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, prefix, hideLabel, id, className = '', ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errId = `${inputId}-err`;
  const hintId = `${inputId}-hint`;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={hideLabel ? 'sr-only' : styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.control} ${error ? styles.invalid : ''}`}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? errId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
      </div>
      {hint && !error && <p id={hintId} className={styles.hint}>{hint}</p>}
      {error && (
        <p id={errId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
