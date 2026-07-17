import type { CardVariant } from './GameCard';
import { Skeleton } from '../ui/Skeleton';
import styles from './GameCard.module.css';

/** Skeleton sized to the real GameCard for zero layout shift (brief §13). */
export function GameCardSkeleton({ variant = 'grid' }: { variant?: CardVariant }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.art}><Skeleton width="100%" height="100%" radius="var(--r-plate) var(--r-plate) 0 0" /></div>
      <div className={styles.info}>
        <Skeleton width="72%" height={18} />
        <div className={styles.meta}>
          <Skeleton width={54} height={16} radius="var(--r-pill)" />
          <Skeleton width={40} height={14} />
        </div>
      </div>
    </div>
  );
}
