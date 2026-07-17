import { useNavigate } from 'react-router-dom';
import { GameIcon } from '../../icons/games/GameIcon';
import { Icon } from '../../icons/Icon';
import { Chip } from '../ui/Chip';
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
 * The conversion unit. One component, five variants. Layered depth:
 * category-gradient artwork plate → scrim → glass info panel → CTA. All
 * hover/press motion is transform/opacity only (GPU) and has a distinct
 * keyboard focus state. Titles stay legible via the scrim.
 */
export function GameCard({ game, variant = 'grid' }: GameCardProps) {
  const navigate = useNavigate();
  const cat = CATEGORIES[game.category];
  const open = () => navigate(`/game/${game.id}`);

  return (
    <article
      className={`${styles.card} ${styles[variant]}`}
      style={{ ['--art' as string]: cat.grad }}
      tabIndex={0}
      role="button"
      aria-label={`${game.title}, ${cat.label}. Play now.`}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
    >
      <div className={styles.art} aria-hidden="true">
        <span className={styles.artGlow} />
        <GameIcon game={game.icon} size={variant === 'hero' ? 132 : variant === 'rail' ? 84 : 96} className={styles.icon} />
        <span className={styles.scrim} />
      </div>

      <div className={styles.badges} aria-hidden="true">
        {game.trending && <Chip static tone="live" className={styles.badge}>Trending</Chip>}
        {game.isNew && <Chip static tone="reward" className={styles.badge}>New</Chip>}
      </div>

      <div className={styles.info}>
        <div className={styles.meta}>
          <Chip static className={styles.catChip}>{cat.label}</Chip>
          <span className={styles.plays}><Icon name="user" size={13} /> {formatPlays(game.plays)}</span>
        </div>
        <h3 className={styles.title}>{game.title}</h3>
        {(variant === 'hero' || variant === 'featured') && <p className={styles.tagline}>{game.tagline}</p>}
        <div className={styles.footer}>
          <span className={styles.rating}><Icon name="star" variant="solid" size={14} /> {game.rating.toFixed(1)}</span>
          <span className={styles.play}><Icon name="play" variant="solid" size={14} /> Play</span>
        </div>
      </div>
    </article>
  );
}
