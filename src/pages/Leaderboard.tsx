import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { StatPill } from '../components/ui/StatPill';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Ribbon } from '../components/ui/Ribbon';
import { Icon } from '../icons/Icon';
import { LEADERBOARDS, YOUR_RANK, PLAYER } from '../config/leaderboard';
import { useSession } from '../hooks/useSession';
import { maskMsisdn } from '../utils/msisdn';
import { formatScore, ordinal } from '../utils/format';
import { itemVariants, listVariants } from '../animations/variants';
import type { LeaderboardEntry, LeaderboardPeriod } from '../types';
import styles from './Leaderboard.module.css';

/** Small rank-movement indicator built from movement + delta. */
function Movement({ movement, delta }: { movement?: LeaderboardEntry['movement']; delta?: number }) {
  if (!movement || movement === 'same') return <span className={styles.moveSame} aria-label="No change">—</span>;
  const up = movement === 'up';
  return (
    <span className={`${styles.move} ${up ? styles.up : styles.down} num`} aria-label={`${up ? 'Up' : 'Down'} ${delta} place${delta === 1 ? '' : 's'}`}>
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
        <path d={up ? 'M4 1 7 6 1 6z' : 'M4 7 1 2 7 2z'} fill="currentColor" />
      </svg>
      {delta}
    </span>
  );
}

const PODIUM_ORDER = [1, 0, 2]; // 2nd · 1st · 3rd
const PODIUM_TONE = ['silver', 'gold', 'bronze'] as const;

/**
 * Leaderboard (correction §5, §7). Light + dark, never empty: brand header
 * band, Daily/Monthly tabs, top-3 podium, a masked ranked list (no names, ever)
 * with movement indicators, and the current user's own row pinned above the
 * bottom nav. Includes a loading skeleton and a designed empty state.
 */
export function Leaderboard() {
  const [period, setPeriod] = useState<LeaderboardPeriod>('daily');
  const [loading, setLoading] = useState(true);
  const { msisdn } = useSession();

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [period]);

  const rows = LEADERBOARDS[period];
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);
  const you = YOUR_RANK[period];
  const ownMask = msisdn ? maskMsisdn(msisdn) : '+2637****0000';

  const score = period === 'daily' ? PLAYER.dailyScore : PLAYER.monthlyScore;
  const position = period === 'daily' ? PLAYER.dailyPosition : PLAYER.monthlyPosition;

  return (
    <div className={styles.page}>
      {/* Brand header band */}
      <header className={styles.band}>
        <div className={styles.bandTop}>
          <div className={styles.bandTitle}>
            <Icon name="trophy" variant="solid" size={22} />
            <h1>Leaderboard</h1>
          </div>
          <Ribbon variant="live">Live</Ribbon>
        </div>
        <p className={styles.bandSub}>Climb the ranks and defend your position.</p>
      </header>

      <div className={styles.controls}>
        <SegmentedControl
          segments={[{ value: 'daily', label: 'Daily' }, { value: 'monthly', label: 'Monthly' }]}
          value={period}
          onChange={(v) => setPeriod(v)}
          ariaLabel="Leaderboard period"
        />
      </div>

      <div className={styles.stats}>
        <StatPill label={`Your ${period} score`} value={formatScore(score)} tone="brand" />
        <StatPill label={`Your ${period} rank`} value={ordinal(position)} tone="reward" />
      </div>

      {loading ? (
        <div className={styles.skeletonWrap} aria-hidden="true">
          <div className={styles.podiumSkeleton}>
            {[64, 88, 52].map((h, i) => <Skeleton key={i} width="30%" height={h + 120} radius="var(--r-lg)" />)}
          </div>
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} width="100%" height={56} radius="var(--r-md)" />)}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState icon="trophy" title="No rankings yet" message="Play a game to put yourself on the board and start climbing." />
      ) : (
        <motion.div key={period} variants={listVariants} initial="initial" animate="enter">
          {/* Podium */}
          <div className={styles.podium}>
            {PODIUM_ORDER.map((idx, col) => {
              const entry = podium[idx];
              if (!entry) return null;
              const tone = PODIUM_TONE[col];
              return (
                <motion.div key={entry.rank} className={`${styles.pillar} ${styles[tone]}`} variants={itemVariants}>
                  <span className={styles.medal}>
                    {entry.rank === 1 ? <Icon name="trophy" variant="solid" size={22} /> : <Icon name="medal" variant="solid" size={20} />}
                  </span>
                  <span className={styles.pAvatar} aria-hidden="true"><Icon name="user" variant="solid" size={22} /></span>
                  <span className={`${styles.pId} num`}>{entry.maskedId}</span>
                  <span className={`${styles.pScore} num`}>{formatScore(entry.score)}</span>
                  <span className={styles.pRank}>{entry.rank}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Ranked list */}
          <ul className={styles.list}>
            {rest.map((entry) => (
              <motion.li key={entry.rank} className={styles.row} variants={itemVariants}>
                <span className={`${styles.rank} num`}>{entry.rank}</span>
                <Movement movement={entry.movement} delta={entry.delta} />
                <span className={styles.rowAvatar} aria-hidden="true"><Icon name="user" size={16} /></span>
                <span className={`${styles.id} num`}>{entry.maskedId}</span>
                <span className={`${styles.score} num`}>{formatScore(entry.score)}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Own row pinned above the bottom nav */}
      {!loading && rows.length > 0 && (
        <div className={styles.ownRow}>
          <span className={`${styles.rank} num`}>{you.rank}</span>
          <Movement movement={you.movement} delta={you.delta} />
          <span className={styles.rowAvatar} aria-hidden="true"><Icon name="user" variant="solid" size={16} /></span>
          <span className={styles.youId}>
            <span className={styles.youTag}>You</span>
            <span className={`${styles.id} num`}>{ownMask}</span>
          </span>
          <span className={`${styles.score} num`}>{formatScore(score)}</span>
        </div>
      )}
    </div>
  );
}
