import styles from './ProgressRing.module.css';

interface ProgressRingProps {
  progress: number; // 0–1
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
  label?: string;
}

/** SVG progress ring for milestone/achievement completion. */
export function ProgressRing({ progress, size = 72, stroke = 7, children, label }: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <div className={styles.ring} style={{ width: size, height: size }} role={label ? 'img' : undefined} aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden={label ? undefined : true}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className={styles.arc}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--econet-cyan)" />
            <stop offset="1" stopColor="var(--econet-blue-400)" />
          </linearGradient>
        </defs>
      </svg>
      <span className={styles.center}>{children}</span>
    </div>
  );
}
