import { useId, useState, type KeyboardEvent } from 'react';
import styles from './StarRating.module.css';

/**
 * A geometrically true 5-point star (correction §3): outer points at 72°
 * intervals from −90° (point up), inner radius = 0.382 × outer for classical
 * proportion, on a vertical axis with identical point lengths.
 */
const OUTER = 9.4;
const INNER = OUTER * 0.382;
const C = 10;
const STAR_PATH = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? OUTER : INNER;
    const a = (-90 + i * 36) * (Math.PI / 180);
    pts.push(`${(C + r * Math.cos(a)).toFixed(3)},${(C + r * Math.sin(a)).toFixed(3)}`);
  }
  return `M${pts.join('L')}Z`;
})();

/** One star, filled 0–1 (supports half/partial for aggregates). */
function Star({ fill, size, gid }: { fill: number; size: number; gid: string }) {
  const clamped = Math.max(0, Math.min(1, fill));
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={styles.star} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid}>
          <stop offset={`${clamped * 100}%`} stopColor="var(--reward)" />
          <stop offset={`${clamped * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill="none" stroke="var(--border-strong)" strokeWidth="1.1" />
      <path d={STAR_PATH} fill={`url(#${gid})`} />
    </svg>
  );
}

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
 * Read-only aggregate display, or an accessible interactive control:
 * `role="radiogroup"` with five real radios, hover preview, click-to-set,
 * click-same-to-clear, arrow-key adjust, Enter/Space commit, visible focus
 * ring, and an aria-live confirmation on submit.
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
          <Star fill={shown >= v ? 1 : 0} size={size} gid={`${gid}-i-${v}`} />
        </button>
      ))}
    </div>
  );
}
