import { useNavigate } from 'react-router-dom';
import { GameIcon } from '../../icons/games/GameIcon';
import { Chip } from '../ui/Chip';
import { Ribbon } from '../ui/Ribbon';
import { Star } from '../ui/Star';
import { CATEGORIES } from '../../config/catalogue';
import type { Game } from '../../types';
import styles from './GameCard.module.css';

export type CardVariant = 'hero' | 'featured' | 'rail' | 'grid' | 'compact';

interface GameCardProps {
  game: Game;
  variant?: CardVariant;
}

/**
 * The conversion unit. The whole card is the tap target — no separate play
 * button colliding with the artwork's own wordmark. Text block leads with the
 * TITLE (the thing being scanned for), then a single, non-wrapping meta line:
 * category chip · star · rating. Play count is deliberately omitted so the row
 * never overloads. Artwork clips to the plate's own corner radius so the card
 * corner fuses with the icon.
 */
export function GameCard({ game, variant = 'grid' }: GameCardProps) {
  const navigate = useNavigate();
  const cat = CATEGORIES[game.category];
  const open = () => navigate(`/game/${game.id}`);

  return (
    <article
      className={`${styles.card} ${styles[variant]}`}
      tabIndex={0}
      role="button"
      aria-label={`${game.title}, ${cat.label}, rated ${game.rating.toFixed(1)} out of 5. Open.`}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
    >
      <div className={styles.art}>
        <GameIcon game={game.icon} fill className={styles.icon} />
      </div>

      {game.isNew && (
        <div className={styles.badges} aria-hidden="true">
          <Ribbon variant="new">New</Ribbon>
        </div>
      )}

      <div className={styles.info}>
        <h3 className={styles.title}>{game.title}</h3>
        {(variant === 'hero' || variant === 'featured') && <p className={styles.tagline}>{game.tagline}</p>}
        <div className={styles.meta}>
          <Chip static className={styles.catChip}>{cat.label}</Chip>
          <span className={styles.rating}>
            <Star state="filled" size={14} gid={`r-${game.id}`} className={styles.star} />
            <span className={`${styles.ratingNum} num`}>{game.rating.toFixed(1)}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
