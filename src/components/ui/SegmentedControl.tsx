import { motion } from 'framer-motion';
import { useId } from 'react';
import styles from './SegmentedControl.module.css';

interface Segment<T extends string> {
  value: T;
  label: string;
}
interface Props<T extends string> {
  segments: Segment<T>[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}

/** Tab-style toggle with a sliding indicator (shared layout animation). */
export function SegmentedControl<T extends string>({ segments, value, onChange, ariaLabel }: Props<T>) {
  const groupId = useId();
  return (
    <div className={styles.track} role="tablist" aria-label={ariaLabel}>
      {segments.map((seg) => {
        const active = seg.value === value;
        return (
          <button
            key={seg.value}
            role="tab"
            aria-selected={active}
            className={`${styles.seg} ${active ? styles.active : ''}`}
            onClick={() => onChange(seg.value)}
          >
            {active && (
              <motion.span
                layoutId={`seg-${groupId}`}
                className={styles.pill}
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
              />
            )}
            <span className={styles.text}>{seg.label}</span>
          </button>
        );
      })}
    </div>
  );
}
