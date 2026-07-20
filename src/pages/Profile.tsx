import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Icon, type IconName } from '../icons/Icon';
import { PLAYER, ACHIEVEMENTS } from '../config/leaderboard';
import { formatScore, ordinal } from '../utils/format';
import { listVariants, itemVariants } from '../animations/variants';
import styles from './Profile.module.css';

const LEVEL = 12;
const LEVEL_PROGRESS = 0.53;
const GAMES_PLAYED = 48;
const DAY_STREAK = 3;

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

/** Gamer profile — identity, score-to-beat progress, and an achievement wall. */
export function Profile() {
  const navigate = useNavigate();
  const userScore = PLAYER.dailyScore;
  const beatScore = PLAYER.bestScoreToBeat;
  const scoreProgress = Math.min(1, userScore / beatScore);

  return (
    <motion.div className={styles.page} variants={listVariants} initial="initial" animate="enter">
      {/* Identity */}
      <motion.header className={styles.identity} variants={itemVariants}>
        <div className={styles.avatarWrap}>
          <ProgressRing progress={LEVEL_PROGRESS} size={104} stroke={6} label={`Level ${LEVEL}, 53% to next level`}>
            <span className={styles.avatar} aria-hidden="true">{initials(PLAYER.name)}</span>
          </ProgressRing>
          <span className={styles.levelBadge}>Lv {LEVEL}</span>
        </div>
        <div className={styles.greeting}>
          <p className={styles.hi}>Hi, {PLAYER.name}</p>
          <p className={styles.congrats}>Congratulations on your new score!</p>
          <span className={styles.rankChip}>
            <Icon name="flag" variant="solid" size={14} />
            Monthly rank {ordinal(PLAYER.monthlyPosition)}
          </span>
        </div>
      </motion.header>

      {/* Quick stats */}
      <motion.div className={styles.quickStats} variants={itemVariants}>
        {[
          { label: 'Games played', value: GAMES_PLAYED },
          { label: 'Day streak', value: DAY_STREAK },
          { label: 'Best score', value: formatScore(PLAYER.monthlyScore) },
        ].map((s) => (
          <div key={s.label} className={styles.quickStat}>
            <span className={`${styles.quickValue} num`}>{s.value}</span>
            <span className={styles.quickLabel}>{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Score to beat */}
      <motion.section className={styles.scoreCard} variants={itemVariants} aria-label="Score to beat">
        <div className={styles.scoreRow}>
          <div className={styles.scoreBlock}>
            <span className={styles.scoreLabel}>Your score</span>
            <span className={`${styles.scoreValue} num`}>{formatScore(userScore)}</span>
          </div>
          <span className={styles.trophy} aria-hidden="true"><Icon name="trophy" variant="solid" size={26} /></span>
          <div className={`${styles.scoreBlock} ${styles.scoreRight}`}>
            <span className={styles.scoreLabel}>Best to beat</span>
            <span className={`${styles.scoreValue} ${styles.beat} num`}>{formatScore(beatScore)}</span>
          </div>
        </div>
        <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={beatScore} aria-valuenow={userScore}>
          <motion.span
            className={styles.barFill}
            initial={{ width: 0 }}
            animate={{ width: `${scoreProgress * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className={styles.beatHint}>Beat the best score &amp; become the highest!</p>
      </motion.section>

      {/* Achievements */}
      <motion.section className={styles.achSection} variants={itemVariants} aria-label="Achievements">
        <h2 className={styles.sectionTitle}>Achievements</h2>
        <motion.ul className={styles.achGrid} variants={listVariants}>
          {ACHIEVEMENTS.map((a) => (
            <motion.li
              key={a.id}
              className={`${styles.badge} ${a.unlocked ? styles.unlocked : styles.locked}`}
              variants={itemVariants}
            >
              <span className={styles.badgeIcon}>
                {a.unlocked ? (
                  <Icon name={a.icon as IconName} variant="solid" size={26} />
                ) : (
                  <ProgressRing progress={a.progress ?? 0} size={46} stroke={4}>
                    <Icon name={a.icon as IconName} size={18} />
                  </ProgressRing>
                )}
              </span>
              <span className={styles.badgeLabel}>{a.label}</span>
              <span className={styles.badgeDesc}>{a.description}</span>
              {!a.unlocked && a.progress != null && (
                <span className={styles.badgePct}>{Math.round(a.progress * 100)}%</span>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.div className={styles.cta} variants={itemVariants}>
        <Button variant="primary" size="lg" block iconRight="play" onClick={() => navigate('/home')}>
          Continue Playing
        </Button>
      </motion.div>
    </motion.div>
  );
}
