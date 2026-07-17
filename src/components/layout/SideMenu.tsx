import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { backdropVariants, drawerVariants } from '../../animations/variants';
import { Icon, type IconName } from '../../icons/Icon';
import { Logo } from './Logo';
import { EconetLogo } from './EconetLogo';
import { useSession } from '../../hooks/useSession';
import styles from './SideMenu.module.css';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const DESTINATIONS: { label: string; icon: IconName; to: string }[] = [
  { label: 'Home', icon: 'home', to: '/home' },
  { label: 'Profile', icon: 'user', to: '/profile' },
  { label: 'Leaderboard', icon: 'flag', to: '/leaderboard' },
  { label: 'Prizes', icon: 'gift', to: '/prizes' },
  { label: 'Ts & Cs', icon: 'edit', to: '/legal' },
  { label: "FAQ's", icon: 'chat', to: '/faq' },
];

/** Slide-in navigation drawer (preserves all production destinations §7). */
export function SideMenu({ open, onClose }: SideMenuProps) {
  const navigate = useNavigate();
  const { signOut } = useSession();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>('a,button')?.focus(), 40);
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(t); };
  }, [open, onClose]);

  const go = (to: string) => { onClose(); navigate(to); };
  const unsubscribe = () => { onClose(); signOut(); navigate('/subscribe'); };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className={styles.overlay} variants={backdropVariants} initial="initial" animate="enter" exit="exit" onClick={onClose}>
          <motion.aside
            ref={ref}
            className={styles.drawer}
            variants={drawerVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.top}>
              <Logo height={28} />
              <button className={styles.close} onClick={onClose} aria-label="Close menu">
                <Icon name="close" size={22} />
              </button>
            </div>
            <p className={styles.sub}>Games Portal</p>

            <nav className={styles.links} aria-label="All destinations">
              {DESTINATIONS.map((d) => (
                <button key={d.to} className={styles.link} onClick={() => go(d.to)}>
                  <span className={styles.linkIcon}><Icon name={d.icon} size={22} /></span>
                  <span>{d.label}</span>
                  <Icon name="chevronRight" size={18} className={styles.chev} />
                </button>
              ))}
            </nav>

            <div className={styles.footer}>
              <button className={styles.unsub} onClick={unsubscribe}>
                <Icon name="logout" size={20} />
                Unsubscribe
              </button>
              <EconetLogo height={22} />
              <p className={styles.copy}>© 2024 YoGamezPro · Econet Wireless</p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
