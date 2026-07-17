import type { ReactNode } from 'react';
import { Logo } from '../components/layout/Logo';
import { EconetLogo } from '../components/layout/EconetLogo';
import styles from './AuthScreen.module.css';

/**
 * Shell for the pre-auth journey (Loading/Login/Subscribe/OTP/Authentication):
 * branded canvas, centered stage, persistent Econet + legal footer preserved
 * from production.
 */
export function AuthScreen({ children, showLegal = true, showBrand = true }: { children: ReactNode; showLegal?: boolean; showBrand?: boolean }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.rays} aria-hidden="true" />
      <div className={styles.stage}>
        {showBrand && (
          <div className={styles.brand}>
            <Logo height={44} />
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
      {showLegal && (
        <footer className={styles.footer}>
          <EconetLogo height={24} />
          <p className={styles.legal}>
            By continuing, you agree to the YoGamezPro service's{' '}
            <a href="/legal">Terms &amp; Conditions</a>, <a href="/privacy">Privacy Policy</a>{' '}
            and <a href="/faq">FAQs</a>.
          </p>
        </footer>
      )}
    </div>
  );
}
