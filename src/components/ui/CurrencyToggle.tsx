import { motion } from 'framer-motion';
import { useId } from 'react';
import { useCurrency } from '../../hooks/useCurrency';
import { CURRENCIES } from '../../utils/currency';
import styles from './CurrencyToggle.module.css';

/**
 * The single USD / ZWG segmented control (correction §6). Shared state via the
 * currency context, so switching on Subscribe or Prizes is reflected on both.
 * Formatting only — it selects a currency, it never converts a value.
 */
export function CurrencyToggle({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { currency, setCurrency } = useCurrency();
  const gid = useId();
  return (
    <div className={`${styles.track} ${styles[size]}`} role="radiogroup" aria-label="Display currency">
      {CURRENCIES.map((c) => {
        const active = c === currency;
        return (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${styles.seg} ${active ? styles.active : ''}`}
            onClick={() => setCurrency(c)}
          >
            {active && (
              <motion.span
                layoutId={`cur-${gid}`}
                className={styles.pill}
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
              />
            )}
            <span className={styles.text}>{c}</span>
          </button>
        );
      })}
    </div>
  );
}
