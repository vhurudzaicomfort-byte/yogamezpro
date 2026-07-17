import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { CurrencyToggle } from '../components/ui/CurrencyToggle';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { Icon } from '../icons/Icon';
import { DAILY_AIRTIME_PRIZES, WEEKLY_CASH_PRIZES } from '../config/catalogue';
import { ordinal } from '../utils/format';
import { formatMoney } from '../utils/currency';
import { useCurrency } from '../hooks/useCurrency';
import { useWheel } from '../hooks/useWheel';
import { useToast } from '../hooks/useToast';
import { itemVariants, listVariants } from '../animations/variants';
import type { CurrencyCode, Money, PrizeRow } from '../types';
import styles from './Prizes.module.css';

type Ladder = 'airtime' | 'cash';

const LADDERS: Record<Ladder, { rows: PrizeRow[]; caption: string }> = {
  airtime: { rows: DAILY_AIRTIME_PRIZES, caption: 'Top 10 on the daily board win airtime — paid out every day.' },
  cash: { rows: WEEKLY_CASH_PRIZES, caption: 'Top 10 on the weekly board share the grand cash pool.' },
};

const MEDAL_TINT = ['var(--gold-500)', 'var(--neutral-300)', '#cd8b56'];

/** A personal reward with a claim lifecycle. */
type RewardState = 'unclaimed' | 'claimed' | 'expired';
interface Reward {
  id: string;
  label: string;
  value: Money;
  state: RewardState;
}
const MY_REWARDS: Reward[] = [
  { id: 'r1', label: 'Lucky Wheel — Airtime', value: { ZWG: 3, USD: 0.2 }, state: 'unclaimed' },
  { id: 'r2', label: 'Daily streak bonus', value: { ZWG: 2, USD: 0.1 }, state: 'claimed' },
  { id: 'r3', label: 'Weekend airtime drop', value: { ZWG: 5, USD: 0.2 }, state: 'expired' },
];

function fmt(v: Money, c: CurrencyCode) {
  return formatMoney(v, c, { whole: true });
}

/** Prizes — identity band, personal claimable rewards, currency-aware ladders,
 *  and the Lucky Wheel entry. Populated + skeleton + designed states (§5, §6). */
export function Prizes() {
  const { currency } = useCurrency();
  const { open } = useWheel();
  const { push } = useToast();
  const [ladder, setLadder] = useState<Ladder>('airtime');
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const { rows, caption } = LADDERS[ladder];
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);

  const claim = (r: Reward) => {
    setClaimed((s) => new Set(s).add(r.id));
    push(`Claimed ${fmt(r.value, currency)} — credited to your Econet line.`, 'success');
  };
  const stateOf = (r: Reward): RewardState => (claimed.has(r.id) ? 'claimed' : r.state);

  return (
    <div className={styles.page}>
      {/* Identity band */}
      <header className={styles.band}>
        <div className={styles.bandRow}>
          <div>
            <p className={styles.bandKicker}>Win your share</p>
            <h2 className={styles.bandTitle}>Prizes</h2>
          </div>
          <span className={styles.bandGift} aria-hidden="true"><Icon name="gift" variant="solid" size={26} /></span>
        </div>
        <p className={styles.bandCopy}>Climb the leaderboard for daily airtime and the grand cash pool.</p>
      </header>

      <div className={styles.currencyRow}>
        <span className={styles.currencyLabel}>Show values in</span>
        <CurrencyToggle size="sm" />
      </div>

      {/* Your claimable rewards */}
      <section className={styles.rewards} aria-label="Your rewards">
        <h3 className={styles.sectionTitle}>Your rewards</h3>
        {loading ? (
          <div className={styles.rewardGrid}>
            {[0, 1, 2].map((i) => <Skeleton key={i} height={92} radius="var(--r-lg)" />)}
          </div>
        ) : (
          <motion.div className={styles.rewardGrid} variants={listVariants} initial="initial" animate="enter">
            {MY_REWARDS.map((r) => {
              const st = stateOf(r);
              return (
                <motion.div key={r.id} className={`${styles.reward} ${styles[st]}`} variants={itemVariants}>
                  <span className={`${styles.rewardValue} num`}>{fmt(r.value, currency)}</span>
                  <span className={styles.rewardLabel}>{r.label}</span>
                  {st === 'unclaimed' && <Button size="sm" variant="reward" onClick={() => claim(r)}>Claim</Button>}
                  {st === 'claimed' && <span className={styles.stateChip}><Icon name="check" size={13} /> Claimed</span>}
                  {st === 'expired' && <span className={`${styles.stateChip} ${styles.expiredChip}`}>Expired</span>}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

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

      {/* Prize ladders */}
      <div className={styles.switch}>
        <SegmentedControl
          segments={[{ value: 'airtime', label: 'Daily Airtime' }, { value: 'cash', label: 'Weekly Cash' }]}
          value={ladder}
          onChange={(v) => setLadder(v as Ladder)}
          ariaLabel="Prize ladder"
        />
      </div>
      <p className={styles.caption}>{caption}</p>

      {loading ? (
        <div className={styles.podium}>
          {[0, 1, 2].map((i) => <Skeleton key={i} height={132} radius="var(--r-lg)" />)}
        </div>
      ) : (
        <motion.div className={styles.podium} variants={listVariants} initial="initial" animate="enter" key={ladder}>
          {podium.map((p, i) => (
            <motion.div key={p.rank} className={`${styles.podiumCard} ${i === 0 ? styles.first : ''}`} variants={itemVariants} style={{ ['--tint' as string]: MEDAL_TINT[i] }}>
              <span className={styles.medal}><Icon name="medal" variant="solid" size={22} /></span>
              <span className={styles.podiumRank}>{ordinal(p.rank)}</span>
              <span className={`${styles.podiumValue} num`}>{fmt(p.value, currency)}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && (
        <motion.ul className={styles.list} variants={listVariants} initial="initial" animate="enter" key={`${ladder}-list`}>
          {rest.map((p) => (
            <motion.li key={p.rank} className={styles.row} variants={itemVariants}>
              <span className={`${styles.rowRank} num`}>{p.rank}</span>
              <span className={styles.rowLabel}>{ordinal(p.rank)} place</span>
              <span className={`${styles.rowValue} num`}>{fmt(p.value, currency)}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      <section className={styles.explainer}>
        <h3 className={styles.explainerTitle}>How prizes work</h3>
        <ol className={styles.steps}>
          <li><span className={styles.stepNo}>1</span> Play any game to score points.</li>
          <li><span className={styles.stepNo}>2</span> Points rank you on the daily &amp; weekly boards.</li>
          <li><span className={styles.stepNo}>3</span> Finish in the top 10 to win airtime or cash.</li>
        </ol>
      </section>
    </div>
  );
}
