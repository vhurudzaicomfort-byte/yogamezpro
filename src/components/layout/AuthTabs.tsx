import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './AuthTabs.module.css';

/** Login | Subscribe switch, preserved from the production auth screens. */
export function AuthTabs({ active }: { active: 'login' | 'subscribe' }) {
  const navigate = useNavigate();
  const tabs = [
    { id: 'login', label: 'Login', to: '/login' },
    { id: 'subscribe', label: 'Subscribe', to: '/subscribe' },
  ] as const;
  return (
    <div className={styles.tabs} role="tablist" aria-label="Account">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          className={`${styles.tab} ${active === t.id ? styles.active : ''}`}
          onClick={() => navigate(t.to)}
        >
          {t.label}
          {active === t.id && <motion.span layoutId="authTabInk" className={styles.ink} />}
        </button>
      ))}
    </div>
  );
}
