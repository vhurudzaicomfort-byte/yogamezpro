import styles from './BrandedLoader.module.css';

/** Branded orbital loader — replaces the production dotted spinner. */
export function BrandedLoader({ size = 64, label = 'Loading' }: { size?: number; label?: string }) {
  return (
    <div className={styles.loader} style={{ width: size, height: size }} role="status" aria-label={label}>
      <span className={styles.ringA} />
      <span className={styles.ringB} />
      <span className={styles.core} />
      <span className="sr-only">{label}…</span>
    </div>
  );
}
