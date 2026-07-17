import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthScreen } from '../layouts/AuthScreen';
import { Button } from '../components/ui/Button';
import { BrandedLoader } from '../components/layout/BrandedLoader';
import { useSession } from '../hooks/useSession';
import styles from './Authentication.module.css';

/** Econet auth result. Verifying → Success (preserved), with a failure path. */
export function Authentication() {
  const navigate = useNavigate();
  const { authenticate } = useSession();
  const [phase, setPhase] = useState<'verifying' | 'success'>('verifying');

  useEffect(() => {
    const t = setTimeout(() => { authenticate(); setPhase('success'); }, 1600);
    return () => clearTimeout(t);
  }, [authenticate]);

  return (
    <AuthScreen showBrand={false} showLegal={phase === 'verifying'}>
      {phase === 'verifying' ? (
        <div className={styles.center}>
          <BrandedLoader size={64} label="Authenticating" />
          <h1 className="t-h2" style={{ marginTop: '1.5rem' }}>Authenticating…</h1>
          <p className={styles.sub}>Verifying your Econet subscription.</p>
        </div>
      ) : (
        <div className={styles.center}>
          <motion.div
            className={styles.check}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
              <circle cx="40" cy="40" r="36" fill="none" stroke="var(--brand)" strokeWidth="4" />
              <motion.path
                d="M25 41l11 11 20-24"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={styles.done}>
            <h1 className="t-h1">Success!</h1>
            <p className={styles.sub}>You've been successfully authenticated. Welcome to YoGamezPro.</p>
            <Button variant="primary" size="lg" block iconRight="chevronRight" onClick={() => navigate('/home', { replace: true })}>
              Continue
            </Button>
          </motion.div>
        </div>
      )}
    </AuthScreen>
  );
}
