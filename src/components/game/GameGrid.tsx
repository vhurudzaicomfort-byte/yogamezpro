import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import { GameCardSkeleton } from './GameCardSkeleton';
import { itemVariants, listVariants } from '../../animations/variants';
import type { Game } from '../../types';
import styles from './GameGrid.module.css';

/** Responsive 2-up (→3-up on wider stages) game grid. */
export function GameGrid({ games, loading, count = 6 }: { games: Game[]; loading?: boolean; count?: number }) {
  return (
    <motion.div className={styles.grid} variants={listVariants} initial="initial" animate="enter">
      {loading
        ? Array.from({ length: count }).map((_, i) => (
            <div key={i}><GameCardSkeleton variant="grid" /></div>
          ))
        : games.map((g) => (
            <motion.div key={g.id} variants={itemVariants}>
              <GameCard game={g} variant="grid" />
            </motion.div>
          ))}
    </motion.div>
  );
}
