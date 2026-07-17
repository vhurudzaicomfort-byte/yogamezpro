import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { SideMenu } from '../components/layout/SideMenu';
import { pageVariants } from '../animations/variants';
import styles from './AppLayout.module.css';

/** Route → header config. */
const TITLES: Record<string, { title?: string; brand?: boolean }> = {
  '/home': { brand: true },
  '/profile': { title: 'Profile' },
  '/leaderboard': { title: 'Leaderboard' },
  '/prizes': { title: 'Prizes' },
  '/search': { title: 'Search' },
  '/legal': { title: 'Terms & Conditions' },
  '/faq': { title: 'FAQs' },
  '/how-to': { title: 'How To' },
  '/privacy': { title: 'Privacy Policy' },
};

/**
 * Authenticated app shell — sticky header, animated page area, fixed bottom
 * nav, and the slide-in side menu. Game-detail routes render full-bleed.
 */
export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const base = '/' + location.pathname.split('/')[1];
  const cfg = TITLES[base] ?? { title: 'YoGamezPro' };
  const isDetail = base === '/game';

  return (
    <div className={styles.shell}>
      <a href="#main" className="skip-link">Skip to content</a>
      {!isDetail && <Header title={cfg.title} brand={cfg.brand} onMenu={() => setMenuOpen(true)} />}

      <main id="main" className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.page}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
