import styles from './Wordmark.module.css';

/**
 * YoGamezPro wordmark. Reproduces the logo-kit lockup in live text (no raster):
 * `Yo` + `Gamez`(cyan) + `Pro`, rounded heavy display face. Scales with `size`.
 */
export function Wordmark({ size = 28, plate = false }: { size?: number; plate?: boolean }) {
  return (
    <span
      className={`${styles.mark} ${plate ? styles.plate : ''}`}
      style={{ fontSize: size }}
      aria-label="YoGamezPro"
      role="img"
    >
      <span aria-hidden="true">Yo</span>
      <span aria-hidden="true" className={styles.accent}>Gamez</span>
      <span aria-hidden="true">Pro</span>
    </span>
  );
}
