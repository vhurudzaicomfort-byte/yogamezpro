import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameIcon } from '../../icons/games/GameIcon';
import { Button } from '../ui/Button';
import { Ribbon } from '../ui/Ribbon';
import { useHeroBanner, type BannerVariantId } from '../../hooks/useHeroBanner';
import { useWheel } from '../../hooks/useWheel';
import styles from './HeroBanner.module.css';

/** Where each variant's CTA leads. */
function useCtaAction(variant: BannerVariantId, gameId: string) {
  const navigate = useNavigate();
  const { open } = useWheel();
  return () => {
    if (variant === 'leaderboard') navigate('/leaderboard');
    else if (variant === 'promo') { navigate('/prizes'); open(); }
    else navigate(`/game/${gameId}`);
  };
}

/**
 * Rotating home hero (correction pass 2, §3). One component; the variant, game,
 * copy, hue and CTA all come from `useHeroBanner`, which rotates on each fresh
 * open and holds within the view. Background derives from the chosen game's own
 * plate hue. Ribbon per pass-1 §1 (solid, structured). Cross-fades in on mount.
 */
export function HeroBanner() {
  const { variant, kicker, copy, cta, game } = useHeroBanner();
  const onCta = useCtaAction(variant, game.id);

  return (
    <motion.section
      key={variant + game.id}
      className={styles.hero}
      style={{ ['--hue' as string]: game.hue }}
      aria-label={`${kicker}: ${game.title}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.bloom} aria-hidden="true" />
      <span className={styles.rim} aria-hidden="true" />

      <div className={styles.body}>
        <span className={styles.kicker}><Ribbon variant="featured">{kicker}</Ribbon></span>
        <h2 className={styles.title}>{game.title}</h2>
        <p className={styles.copy}>{copy}</p>
        <Button variant="accent" size="md" iconLeft="play" onClick={onCta}>{cta}</Button>
      </div>

      <div className={styles.subject} aria-hidden="true">
        <GameIcon game={game.icon} size={150} className={styles.subjectArt} />
      </div>
    </motion.section>
  );
}
