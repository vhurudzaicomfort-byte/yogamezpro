import type { ReactNode } from 'react';
import styles from './Ribbon.module.css';

type RibbonVariant = 'new' | 'featured' | 'live';

/**
 * Solid mounted ribbon — replaces the old floating-outline "eyebrow" pills.
 * Real tag geometry with a notched tail, a fold wedge at the mount, a contact
 * shadow, and top-left-lit fill. No offset stroke arcs, no bleeding glow.
 * `live` carries a solid status dot with a subtle opacity pulse (no ring).
 */
export function Ribbon({ variant = 'new', children }: { variant?: RibbonVariant; children: ReactNode }) {
  return (
    <span className={`${styles.ribbon} ${styles[variant]}`}>
      {variant === 'live' && <span className={styles.dot} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </span>
  );
}
