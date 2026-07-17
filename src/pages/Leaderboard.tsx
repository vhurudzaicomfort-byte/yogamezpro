import { useState } from 'react';
import { motion } from 'framer-motion';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { Chip } from '../components/ui/Chip';
import { StatPill } from '../components/ui/StatPill';
import { Icon } from '../icons/Icon';
import { LEADERBOARDS, YOUR_RANK, PLAYER } from '../config/leaderboard';
import { formatScore, ordinal } from '../utils/format';
import { itemVariants, listVariants } from '../animations/variants';
import type { LeaderboardEntry, LeaderboardPeriod } from '../types';
import styles from './Leaderboard.module.css';

/** Initials from a display name, e.g. "Tariro M." -> "TM", "You" -> "YOU". */
function initials(name: string): string {
  if (name === 'You') return 'YOU';
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const PODIUM_ORDER = [1, 0, 2]; // render 2nd, 1st, 3rd left→right
const MEDAL_CLASS = ['gold', 'silver', 'bronze'] as const;

/**
 * Leaderboard — Daily / Weekly ranking with podium, own-rank pinning and a live
 * pulse. Preserves the production score/position stat block (AUDIT.md §9) and
 * elevates it with a podium treatment and animated board transitions.
 */
export function Leaderboard() {
  const [period, setPeriod] = useState<LeaderboardPeriod>('daily');

  const board = LEADERBOARDS[period];
  const you = YOUR_RANK[period];
  const top3 = board.slice(0, 3);
  const rest = board.slice(3);

  const score = period === 'daily' ? PLAYER.dailyScore : PLAYER.weeklyScore;
  const position = period === 'daily' ? PLAYER.dailyPosition : PLAYER.weeklyPosition;
  const periodLabel = period === 'daily' ? 'Daily' : 'Weekly';

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div className={styles.titleRow}>
          <h2 className={styles.h2}>Rankings</h2>
          <Chip static tone="live">Live</Chip>
        </div>
        <SegmentedControl
          segments={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
          ]}
          value={period}
          onChange={setPeriod}
          ariaLabel="Leaderboard period"
        />
      </div>

      <div className={styles.stats}>
        <StatPill label={`Your ${periodLabel} Score`} value={formatScore(score)} tone="accent" />
        <StatPill label={`Your ${periodLabel} Rank`} value={ordinal(position)} tone="reward" />
      </div>

      <motion.div
        key={period}
        className={styles.board}
        variants={listVariants}
        initial="initial"
        animate="enter"
      >
        {/* Podium — top 3 */}
        <ol className={styles.podium} aria-label={`Top 3 — ${periodLabel}`}>
          {PODIUM_ORDER.map((idx) => {
            const entry = top3[idx];
            if (!entry) return null;
            const medal = MEDAL_CLASS[idx];
            return (
              <motion.li
                key={entry.rank}
                variants={itemVariants}
                className={`${styles.pillar} ${styles[medal]} ${idx === 0 ? styles.first : ''}`}
              >
                <span className={styles.crown}>
                  {idx === 0 ? <Icon name="trophy" variant="solid" size={22} /> : <Icon name="medal" variant="solid" size={20} />}
                </span>
                <span className={styles.avatar} aria-hidden="true">{initials(entry.name)}</span>
                <span className={styles.pName}>{entry.name}</span>
                <span className={`${styles.pScore} num`}>{formatScore(entry.score)}</span>
                <span className={styles.plinth} aria-hidden="true">{entry.rank}</span>
              </motion.li>
            );
          })}
        </ol>

        {/* Ranked list — 4th onward */}
        <motion.ul className={styles.list} variants={listVariants} initial="initial" animate="enter">
          {rest.map((entry: LeaderboardEntry) => (
            <motion.li key={entry.rank} variants={itemVariants} className={styles.row}>
              <span className={`${styles.rank} num`}>{entry.rank}</span>
              <span className={styles.rowAvatar} aria-hidden="true">{initials(entry.name)}</span>
              <span className={styles.name}>{entry.name}</span>
              <span className={`${styles.score} num`}>{formatScore(entry.score)}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Own-rank pin */}
      <div className={styles.pin} aria-label="Your position">
        <span className={`${styles.rank} num`}>{you.rank}</span>
        <span className={`${styles.rowAvatar} ${styles.youAvatar}`} aria-hidden="true">YOU</span>
        <span className={styles.name}>You</span>
        <span className={`${styles.score} num`}>{formatScore(you.score)}</span>
      </div>
    </div>
  );
}
