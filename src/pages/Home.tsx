import { useEffect, useState } from 'react';
import { HeroBanner } from '../components/game/HeroBanner';
import { GameGrid } from '../components/game/GameGrid';
import { useWheel } from '../hooks/useWheel';
import { GAMES } from '../config/catalogue';
import styles from './Home.module.css';

/**
 * Home — rotating hero and a single content block: All Games as a full 2×2
 * grid. With a four-title catalogue there is no category filter (a filter over
 * four games spanning three categories only ever hides titles or returns empty
 * results) and no separate "Jump Back In" rail; the grid shows every title at
 * once, directly beneath the hero.
 */
export function Home() {
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
