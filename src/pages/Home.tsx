import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner } from '../components/game/HeroBanner';
import { GameRail } from '../components/game/GameRail';
import { GameGrid } from '../components/game/GameGrid';
import { Chip } from '../components/ui/Chip';
import { useWheel } from '../hooks/useWheel';
import { GAMES, FEATURED_ID, CATEGORIES } from '../config/catalogue';
import type { CategoryKey } from '../types';
import styles from './Home.module.css';

const featured = GAMES.find((g) => g.id === FEATURED_ID)!;

/**
 * Recently-played history (correction §2). Empty array → the Jump Back In rail
 * is not rendered at all. Seeded with two titles here to represent a returning
 * player; a real build reads this from the play-history service.
 */
const recentlyPlayed = GAMES.filter((g) => g.id === 'cash-rider' || g.id === 'zuma');

/** Home — exactly two sections: Jump Back In (if any) + All Games (§2). */
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
      <HeroBanner game={featured} />

      <nav className={`${styles.chips} no-scrollbar`} aria-label="Categories">
        <Chip icon="grid" active onClick={() => navigate('/search')}>All</Chip>
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
          <Chip key={key} onClick={() => navigate(`/search?cat=${key}`)}>{CATEGORIES[key].label}</Chip>
        ))}
      </nav>

      {recentlyPlayed.length > 0 && (
        <GameRail title="Jump back in" games={recentlyPlayed} loading={loading} />
      )}

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
