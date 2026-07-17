import { useNavigate } from 'react-router-dom';
import { Icon } from '../../icons/Icon';
import { GameIcon } from '../../icons/games/GameIcon';
import { Chip } from '../ui/Chip';
import { Ribbon } from '../ui/Ribbon';
import { Star } from '../ui/Star';
import { CATEGORIES } from '../../config/catalogue';
import { formatPlays } from '../../utils/format';
import type { Game } from '../../types';
import styles from './GameCard.module.css';

export type CardVariant = 'hero' | 'featured' | 'rail' | 'grid' | 'compact';

interface GameCardProps {
  game: Game;
  variant?: CardVariant;
}

/**
 * The conversion unit. The whole card is the tap target (correction pass 2 §1);
 * Play is a compact affordance that solidifies on hover, deliberately kept away
 * from the rating so they don't compete. Rating is a single star + number — no
 * 5-star row on cards. Artwork clips to the plate's own corner radius so the
 * card corner fuses with the icon (§4).
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
        <span className={styles.playFab} aria-hidden="true"><Icon name="play" variant="solid" size={16} /></span>
      </div>

      {game.isNew && (
        <div className={styles.badges} aria-hidden="true">
          <Ribbon variant="new">New</Ribbon>
        </div>
      )}

      <div className={styles.info}>
        <div className={styles.meta}>
          <Chip static className={styles.catChip}>{cat.label}</Chip>
          <span className={styles.rating}>
            <Star state="filled" size={14} gid={`r-${game.id}`} />
            <span className={`${styles.ratingNum} num`}>{game.rating.toFixed(1)}</span>
            <span className={styles.plays}> · {formatPlays(game.plays)}</span>
          </span>
        </div>
        <h3 className={styles.title}>{game.title}</h3>
        {(variant === 'hero' || variant === 'featured') && <p className={styles.tagline}>{game.tagline}</p>}
      </div>
    </article>
  );
}
