import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon, type IconName } from '../../icons/Icon';
import styles from './BottomNav.module.css';

const TABS: { to: string; label: string; icon: IconName }[] = [
  { to: '/home', label: 'Home', icon: 'home' },
  { to: '/profile', label: 'Profile', icon: 'user' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'flag' },
  { to: '/prizes', label: 'Prizes', icon: 'gift' },
];

/** Persistent 4-tab bottom navigation (preserved from production). */
export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {TABS.map((tab) => (
        <NavLink key={tab.to} to={tab.to} className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}>
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span layoutId="navGlow" className={styles.glow} transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
              <Icon name={tab.icon} variant={isActive ? 'solid' : 'line'} size={23} />
              <span className={styles.label}>{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
