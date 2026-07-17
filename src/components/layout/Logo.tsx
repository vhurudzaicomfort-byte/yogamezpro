import darkMark from '../../assets/brand/yogamezpro-dark.svg';
import lightMark from '../../assets/brand/yogamezpro-light.svg';
import styles from './Logo.module.css';

/**
 * YoGamezPro brand mark — the real lockup cropped from the supplied 1080²
 * logo kit (no plate, no button styling, no effects). Light + dark variants
 * are both mounted and swapped by theme via CSS, so there is no flash of the
 * wrong-theme mark on load or toggle. Aspect ratio is preserved (880×140).
 */
export function Logo({ height = 26, className = '' }: { height?: number; className?: string }) {
  return (
    <span className={`${styles.logo} ${className}`} role="img" aria-label="YoGamezPro" style={{ height }}>
      <img src={darkMark} alt="" aria-hidden="true" data-logo="dark" style={{ height }} />
      <img src={lightMark} alt="" aria-hidden="true" data-logo="light" style={{ height }} />
    </span>
  );
}
