import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wordmark } from '../components/layout/Wordmark';
import { BrandedLoader } from '../components/layout/BrandedLoader';
import { useSession } from '../hooks/useSession';
import styles from './Loading.module.css';

/**
 * Splash / boot. Preserves the timed boot sequence, then routes by session:
 * authenticated → Home, otherwise → Subscribe. (Elevated: branded loader.)
 */
export function Loading() {
  const navigate = useNavigate();
  const { authenticated } = useSession();

  useEffect(() => {
    const t = setTimeout(() => navigate(authenticated ? '/home' : '/subscribe', { replace: true }), 2100);
    return () => clearTimeout(t);
  }, [navigate, authenticated]);

  return (
    <div className={styles.wrap}>
      <span className={styles.rays} aria-hidden="true" />
      <motion.div
        className={styles.brand}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Wordmark size={44} plate />
        <p className={styles.tag}>Premium Mobile Gaming</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <BrandedLoader size={58} label="Starting YoGamezPro" />
      </motion.div>
    </div>
  );
}
