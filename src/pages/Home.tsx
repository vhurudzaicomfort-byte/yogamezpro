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
const trending = GAMES.filter((g) => g.trending);
const recentlyPlayed = [GAMES[1], GAMES[2], GAMES[0], GAMES[5]];
const recommended = GAMES.filter((g) => !g.trending).slice(0, 5);

/** Home — hero + content rails + category chips + grid (brief §5). */
export function Home() {
  const navigate = useNavigate();
  const { offerIfEligible } = useWheel();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    // Auto-offer the Lucky Wheel on land, honouring the once-per-day cap (§8).
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

      <GameRail title="Trending now" games={trending} loading={loading} action={{ label: 'See all', onClick: () => navigate('/search') }} />
      <GameRail title="Jump back in" games={recentlyPlayed} loading={loading} />

      <section className={styles.gridSection}>
        <div className={styles.gridHead}>
          <h2 className={styles.gridTitle}>All games</h2>
        </div>
        <GameGrid games={GAMES} loading={loading} count={6} />
      </section>

      <GameRail title="Recommended for you" games={recommended} loading={loading} />
    </div>
  );
}
