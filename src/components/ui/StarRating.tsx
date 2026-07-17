import { useId, useState, type KeyboardEvent } from 'react';
import { Star } from './Star';
import styles from './StarRating.module.css';

interface StarRatingProps {
  /** Current value 0–5 (fractional allowed in readOnly for aggregates). */
  value: number;
  /** Display only — no interaction, supports half stars. */
  readOnly?: boolean;
  /** Called with the chosen whole value (1–5), or 0 when cleared. */
  onChange?: (v: number) => void;
  size?: number;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * Star display / input, rendered entirely from the shared `<Star>` component.
 * Read-only mode shows a half-star-accurate aggregate. Interactive mode is a
 * real `role="radiogroup"` with five radios — reserved for INPUT only
 * (review composer / rating widget), never for card meta (correction §1).
 * Hover preview, click-to-set, click-same-to-clear, arrow-key adjust, visible
 * focus ring, aria-live confirmation on the wrapping composer.
 */
export function StarRating({ value, readOnly, onChange, size = 20, ariaLabel = 'Rating', disabled }: StarRatingProps) {
  const gid = useId();
  const [hover, setHover] = useState<number | null>(null);

  if (readOnly || !onChange) {
    return (
      <span className={styles.row} role="img" aria-label={ariaLabel}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={value - i} size={size} gid={`${gid}-${i}`} />
        ))}
      </span>
    );
  }

  const shown = hover ?? value;
  const commit = (v: number) => {
    if (disabled) return;
    onChange(v === value ? 0 : v); // click same to clear
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); onChange(Math.min(5, value + 1)); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); onChange(Math.max(0, value - 1)); }
  };

  return (
    <div
      className={`${styles.row} ${styles.interactive} ${disabled ? styles.disabled : ''}`}
      role="radiogroup"
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKey}
      onMouseLeave={() => setHover(null)}
    >
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          aria-label={`${v} star${v > 1 ? 's' : ''}`}
          className={styles.starBtn}
          disabled={disabled}
          onMouseEnter={() => setHover(v)}
          onFocus={() => setHover(v)}
          onBlur={() => setHover(null)}
          onClick={() => commit(v)}
        >
          <Star state={shown >= v ? 'filled' : 'outline'} size={size} gid={`${gid}-i-${v}`} />
        </button>
      ))}
    </div>
  );
}
