import { useNavigate } from 'react-router-dom';
import { GameIcon } from '../../icons/games/GameIcon';
import { Button } from '../ui/Button';
import { Ribbon } from '../ui/Ribbon';
import type { Game } from '../../types';
import styles from './HeroBanner.module.css';

/**
 * Layered hero composition (brief §9): gradient plate → atmosphere rays →
 * subject artwork → typographic block → single CTA. Self-contained (no raster
 * network cost); the subject is the featured game's vector icon.
 */
export function HeroBanner({ game, kicker = 'Continue Playing', onPlay }: { game: Game; kicker?: string; onPlay?: () => void }) {
  const navigate = useNavigate();
  const play = onPlay ?? (() => navigate(`/game/${game.id}`));

  return (
    <section className={styles.hero} aria-label={`${kicker}: ${game.title}`}>
      {/* atmosphere */}
      <span className={styles.rays} aria-hidden="true" />
      <span className={styles.orb} aria-hidden="true" />
      <span className={styles.rim} aria-hidden="true" />

      <div className={styles.body}>
        <span className={styles.kicker}><Ribbon variant="featured">{kicker}</Ribbon></span>
        <h2 className={styles.title}>{game.title}</h2>
        <p className={styles.copy}>Pick up where you left off and stand a chance to win your share of the prizes.</p>
        <Button variant="accent" size="md" iconLeft="play" onClick={play}>Play now</Button>
      </div>

      <div className={styles.subject} aria-hidden="true">
        <GameIcon game={game.icon} size={150} className={styles.subjectArt} />
      </div>
    </section>
  );
}
