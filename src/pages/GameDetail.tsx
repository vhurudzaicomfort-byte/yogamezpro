import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameIcon } from '../icons/games/GameIcon';
import { Icon } from '../icons/Icon';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/Button';
import { GameCard } from '../components/game/GameCard';
import { Reviews } from '../components/game/Reviews';
import { EmptyState } from '../components/ui/EmptyState';
import { GAMES, CATEGORIES } from '../config/catalogue';
import { aggregate } from '../config/reviews';
import { formatPlays } from '../utils/format';
import { useToast } from '../hooks/useToast';
import styles from './GameDetail.module.css';

/** Immersive game shell: hero → meta → launch gating → related games (§5). */
export function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { push } = useToast();
  const [launching, setLaunching] = useState(false);
  const game = useMemo(() => GAMES.find((g) => g.id === id), [id]);

  if (!game) {
    return (
      <div className={styles.missing}>
        <EmptyState icon="grid" title="Game not found" message="That title isn't in the catalogue right now." action={<Button variant="accent" onClick={() => navigate('/home')}>Back to games</Button>} />
      </div>
    );
  }

  const cat = CATEGORIES[game.category];
  const related = GAMES.filter((g) => g.category === game.category && g.id !== game.id).concat(GAMES.filter((g) => g.category !== game.category)).slice(0, 4);
  const agg = aggregate(game.id);
  const shownRating = agg.count > 0 ? agg.avg : game.rating;

  const launch = () => {
    setLaunching(true);
    setTimeout(() => { setLaunching(false); push(`${game.title} is loading — enjoy your session!`, 'success'); }, 1400);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ ['--art' as string]: cat.grad }}>
        <button className={styles.back} onClick={() => navigate(-1)} aria-label="Go back"><Icon name="arrowLeft" size={22} /></button>
        <span className={styles.heroGlow} aria-hidden="true" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
          <GameIcon game={game.icon} size={150} className={styles.icon} />
        </motion.div>
      </div>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          <Chip static>{cat.label}</Chip>
          {game.isNew && <Chip static tone="reward">New</Chip>}
        </div>
        <h1 className={styles.title}>{game.title}</h1>
        <p className={styles.tagline}>{game.tagline}</p>

        <div className={styles.stats}>
          <div className={styles.stat}><Icon name="star" variant="solid" size={18} /><span className="num">{shownRating.toFixed(1)}</span><small>Rating</small></div>
          <div className={styles.stat}><Icon name="user" size={18} /><span className="num">{formatPlays(game.plays)}</span><small>Players</small></div>
          <div className={styles.stat}><Icon name="bolt" size={18} /><span>Instant</span><small>No install</small></div>
        </div>

        <Button variant="primary" size="lg" block iconLeft="play" loading={launching} onClick={launch}>
          {launching ? 'Launching…' : 'Play now'}
        </Button>

        <p className={styles.desc}>
          Jump straight in — no download, no wait. Rack up points, climb the daily and weekly
          leaderboards, and turn your best runs into airtime and ZWG cash rewards.
        </p>

        <section className={styles.related}>
          <h2 className={styles.relTitle}>More like this</h2>
          <div className={styles.relGrid}>
            {related.map((g) => <GameCard key={g.id} game={g} variant="compact" />)}
          </div>
        </section>

        <Reviews gameId={game.id} />
      </div>
    </div>
  );
}
