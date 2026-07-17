import type { CardVariant } from './GameCard';
import { Skeleton } from '../ui/Skeleton';
import styles from './GameCard.module.css';

/** Skeleton sized to the real GameCard for zero layout shift (brief §13). */
export function GameCardSkeleton({ variant = 'grid' }: { variant?: CardVariant }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.art}><Skeleton width="100%" height="100%" radius={0} /></div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <Skeleton width={54} height={16} radius="var(--r-pill)" />
          <Skeleton width={34} height={12} />
        </div>
        <Skeleton width="70%" height={18} />
        <div className={styles.footer}>
          <Skeleton width={40} height={14} />
          <Skeleton width={54} height={22} radius="var(--r-pill)" />
        </div>
      </div>
    </div>
  );
}
