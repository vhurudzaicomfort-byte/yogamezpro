import cashRider from '../../assets/games/CashRider.svg';
import cryptoCrush from '../../assets/games/CryptoCrush.svg';
import gamewin from '../../assets/games/Gamewin.svg';
import zuma from '../../assets/games/Zuma.svg';
import type { Game } from '../../types';

/**
 * Game icons — the supplied upgraded, wordmarked vector art (512 grid, no
 * rasters). One consistent set: branded rounded-square plate per title with the
 * game name locked up. `fill` renders the plate as edge-to-edge cover art
 * inside a GameCard; otherwise it renders as a fixed-size floating subject
 * (hero banner / game detail).
 */

const MAP: Record<Game['icon'], string> = {
  cashRider,
  cryptoCrush,
  gamewin,
  zuma,
};

interface GameIconProps {
  game: Game['icon'];
  /** Fixed square size in px (ignored when `fill`). */
  size?: number;
  /** Fill the parent (object-fit: cover) — used for card artwork. */
  fill?: boolean;
  className?: string;
}

export function GameIcon({ game, size = 96, fill, className }: GameIconProps) {
  return (
    <img
      src={MAP[game]}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : { width: size, height: size }}
    />
  );
}
