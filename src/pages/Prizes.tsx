import { useState } from 'react';
import { motion } from 'framer-motion';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { Button } from '../components/ui/Button';
import { Icon } from '../icons/Icon';
import { DAILY_AIRTIME_PRIZES, WEEKLY_CASH_PRIZES } from '../config/catalogue';
import { formatZiGWhole, ordinal } from '../utils/format';
import { itemVariants, listVariants } from '../animations/variants';
import { useWheel } from '../hooks/useWheel';
import type { PrizeRow } from '../types';
import styles from './Prizes.module.css';

type Ladder = 'airtime' | 'cash';

const LADDERS: Record<Ladder, { rows: PrizeRow[]; caption: string }> = {
  airtime: { rows: DAILY_AIRTIME_PRIZES, caption: 'Top 10 on the daily board win airtime — paid out every day.' },
  cash: { rows: WEEKLY_CASH_PRIZES, caption: 'Top 10 on the weekly board share the ZiG grand cash pool.' },
};

const MEDAL_TINT = ['var(--gold-500)', 'var(--neutral-300)', '#cd8b56'];

/** Prizes — WIN YOUR SHARE ladders + Lucky Wheel entry (preserved §10). */
export function Prizes() {
  const [ladder, setLadder] = useState<Ladder>('airtime');
  const { open } = useWheel();
  const { rows, caption } = LADDERS[ladder];
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.heroGlow} aria-hidden="true" />
        <p className="t-overline" style={{ color: 'rgba(255,255,255,0.85)' }}>Win your share</p>
        <h2 className={styles.heroTitle}>ZiG is the Grand Cash Prize</h2>
        <p className={styles.heroCopy}>Climb the leaderboard and enjoy daily airtime rewards.</p>
      </header>

      {/* Lucky Wheel entry */}
      <motion.section
        className={styles.wheelCard}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.wheelArt} aria-hidden="true">
          <span className={styles.wheelRing} />
          <Icon name="sparkle" variant="solid" size={30} />
        </div>
        <div className={styles.wheelBody}>
          <h3 className={styles.wheelTitle}>Spin the Lucky Wheel</h3>
          <p className={styles.wheelCopy}>Win instant airtime every day.</p>
          <Button variant="reward" size="lg" iconLeft="sparkle" onClick={open}>Play to Win Big</Button>
        </div>
      </motion.section>

      <div className={styles.switch}>
        <SegmentedControl
          segments={[{ value: 'airtime', label: 'Daily Airtime' }, { value: 'cash', label: 'Weekly Cash' }]}
          value={ladder}
          onChange={(v) => setLadder(v as Ladder)}
          ariaLabel="Prize ladder"
        />
      </div>
      <p className={styles.caption}>{caption}</p>

      {/* Podium — top 3 */}
      <motion.div className={styles.podium} variants={listVariants} initial="initial" animate="enter" key={ladder}>
        {podium.map((p, i) => (
          <motion.div key={p.rank} className={`${styles.podiumCard} ${i === 0 ? styles.first : ''}`} variants={itemVariants} style={{ ['--tint' as string]: MEDAL_TINT[i] }}>
            <span className={styles.medal}><Icon name="medal" variant="solid" size={22} /></span>
            <span className={styles.podiumRank}>{ordinal(p.rank)}</span>
            <span className={`${styles.podiumValue} num`}>{formatZiGWhole(p.value)}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Ranks 4–10 */}
      <motion.ul className={styles.list} variants={listVariants} initial="initial" animate="enter" key={`${ladder}-list`}>
        {rest.map((p) => (
          <motion.li key={p.rank} className={styles.row} variants={itemVariants}>
            <span className={`${styles.rowRank} num`}>{p.rank}</span>
            <span className={styles.rowLabel}>{ordinal(p.rank)} place</span>
            <span className={`${styles.rowValue} num`}>{formatZiGWhole(p.value)}</span>
          </motion.li>
        ))}
      </motion.ul>

      <section className={styles.explainer}>
        <h3 className={styles.explainerTitle}>How prizes work</h3>
        <ol className={styles.steps}>
          <li><span className={styles.stepNo}>1</span> Play any game to score points.</li>
          <li><span className={styles.stepNo}>2</span> Points rank you on the daily &amp; weekly boards.</li>
          <li><span className={styles.stepNo}>3</span> Finish in the top 10 to win airtime or ZiG cash.</li>
        </ol>
      </section>
    </div>
  );
}
