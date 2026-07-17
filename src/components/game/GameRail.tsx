import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import { GameCardSkeleton } from './GameCardSkeleton';
import { itemVariants, listVariants } from '../../animations/variants';
import type { Game } from '../../types';
import styles from './GameRail.module.css';

interface GameRailProps {
  title: string;
  games: Game[];
  loading?: boolean;
  action?: { label: string; onClick: () => void };
}

/** Horizontal snap-scroll rail with a titled header (brief §5). */
export function GameRail({ title, games, loading, action }: GameRailProps) {
  return (
    <section className={styles.rail} aria-label={title}>
      <header className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        {action && <button className={styles.action} onClick={action.onClick}>{action.label}</button>}
      </header>
      <motion.div
        className={`${styles.track} no-scrollbar`}
        variants={listVariants}
        initial="initial"
        animate="enter"
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.slide}><GameCardSkeleton variant="rail" /></div>
            ))
          : games.map((g) => (
              <motion.div key={g.id} className={styles.slide} variants={itemVariants}>
                <GameCard game={g} variant="rail" />
              </motion.div>
            ))}
      </motion.div>
    </section>
  );
}
