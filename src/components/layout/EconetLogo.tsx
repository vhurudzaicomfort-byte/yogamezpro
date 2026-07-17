import light from '../../assets/econet.svg';
import dark from '../../assets/econet-dark.svg';
import styles from './EconetLogo.module.css';

/**
 * Official Econet Wireless mark (supplied light-bg + dark-bg variants, used
 * as-is — never recoloured, filtered, or blended). `surface` picks the variant:
 * 'auto' follows the theme; 'dark'/'light' force it for surfaces that don't
 * follow the theme (e.g. the always-dark side menu footer).
 */
export function EconetLogo({ height = 26, surface = 'auto' }: { height?: number; surface?: 'auto' | 'dark' | 'light' }) {
  const cls = surface === 'dark' ? styles.forceDark : surface === 'light' ? styles.forceLight : '';
  return (
    <span className={`${styles.econet} ${cls}`} style={{ height }} role="img" aria-label="Econet Wireless">
      <img src={dark} alt="" aria-hidden="true" data-econet="dark" style={{ height, width: 'auto' }} />
      <img src={light} alt="" aria-hidden="true" data-econet="light" style={{ height, width: 'auto' }} />
    </span>
  );
}
