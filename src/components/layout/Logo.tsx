import darkMark from '../../assets/brand/yogamezpro-dark.svg';
import lightMark from '../../assets/brand/yogamezpro-light.svg';
import styles from './Logo.module.css';

/**
 * YoGamezPro brand mark — the real lockup cropped from the supplied 1080²
 * logo kit (no plate, no recolour, no filter). Light + dark variants are both
 * mounted; `surface` decides which shows:
 *   'auto'  → follow the page theme (default)
 *   'dark'  → always the dark-surface (light glyph) variant — for dark islands
 *             like the side menu, which stay dark even in light theme
 *   'light' → always the light-surface (dark glyph) variant
 * No flash of the wrong-theme mark on load or toggle. Aspect ratio preserved.
 */
export function Logo({ height = 26, surface = 'auto', className = '' }: { height?: number; surface?: 'auto' | 'dark' | 'light'; className?: string }) {
  const cls = surface === 'dark' ? styles.forceDark : surface === 'light' ? styles.forceLight : '';
  return (
    <span className={`${styles.logo} ${cls} ${className}`} role="img" aria-label="YoGamezPro" style={{ height }}>
      <img src={darkMark} alt="" aria-hidden="true" data-logo="dark" style={{ height }} />
      <img src={lightMark} alt="" aria-hidden="true" data-logo="light" style={{ height }} />
    </span>
  );
}
