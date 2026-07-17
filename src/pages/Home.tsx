import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner } from '../components/game/HeroBanner';
import { GameGrid } from '../components/game/GameGrid';
import { Chip } from '../components/ui/Chip';
import { useWheel } from '../hooks/useWheel';
import { GAMES, CATEGORIES } from '../config/catalogue';
import type { CategoryKey } from '../types';
import styles from './Home.module.css';

/**
 * Home — rotating hero + category chips + a single content block: All Games as
 * a full 2×2 grid. With a four-title catalogue there is no separate "Jump Back
 * In" rail; re-showing the same games above the grid would make the user scroll
 * past them twice in one viewport.
 */
export function Home() {
  const navigate = useNavigate();
  const { offerIfEligible } = useWheel();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    // Auto-offer the Lucky Wheel on land, honouring the once-per-day cap.
    const w = setTimeout(() => offerIfEligible(), 1400);
    return () => { clearTimeout(t); clearTimeout(w); };
  }, [offerIfEligible]);

  return (
    <div className={styles.home}>
      <HeroBanner />

      <nav className={`${styles.chips} no-scrollbar`} aria-label="Categories">
        <Chip icon="grid" active onClick={() => navigate('/search')}>All</Chip>
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
          <Chip key={key} onClick={() => navigate(`/search?cat=${key}`)}>{CATEGORIES[key].label}</Chip>
        ))}
      </nav>

      <section className={styles.gridSection}>
        <div className={styles.gridHead}>
          <h2 className={styles.gridTitle}>All games</h2>
          <span className={styles.count}>{GAMES.length} titles</span>
        </div>
        <GameGrid games={GAMES} loading={loading} count={4} />
      </section>
    </div>
  );
}
