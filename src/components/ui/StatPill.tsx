import styles from './StatPill.module.css';

/** Compact label + value stat (leaderboard/profile). Values use tabular figures. */
export function StatPill({ label, value, tone = 'brand' }: { label: string; value: string; tone?: 'brand' | 'accent' | 'reward' }) {
  return (
    <div className={`${styles.pill} ${styles[tone]}`}>
      <span className={`${styles.value} num`}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
