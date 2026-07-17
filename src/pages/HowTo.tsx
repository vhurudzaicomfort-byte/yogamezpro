import { Icon, type IconName } from '../icons/Icon';
import styles from './HowTo.module.css';

interface Guide {
  id: string;
  icon: IconName;
  title: string;
  intro: string;
  steps: string[];
}

/** How-To content. Copy is accurate to the live app (ZWG/USD, +263, 4-digit
 *  OTP, four games, Daily/Weekly boards, Lucky Wheel). */
const GUIDES: Guide[] = [
  {
    id: 'subscribe',
    icon: 'ticket',
    title: 'How to Subscribe',
    intro: 'Get unlimited access to every game, ad-free, on one Econet subscription.',
    steps: [
      'Open the Subscribe screen and enter your Econet number after the +263 prefix.',
      'Choose your billing currency with the USD / ZWG toggle — prices update instantly.',
      'Pick a plan: Daily, Weekly or Monthly. Weekly is the most popular.',
      'Tap Subscribe and confirm the one-time PIN sent to your phone to activate.',
    ],
  },
  {
    id: 'login',
    icon: 'user',
    title: 'How to Log In',
    intro: 'Already subscribed? Sign back in with your number — no password to remember.',
    steps: [
      'Open Login and type your mobile number after +263.',
      'We send a 4-digit one-time PIN to that number by SMS.',
      'Enter the PIN in the four boxes — it verifies automatically when complete.',
      'If it does not arrive within 60 seconds, tap Resend PIN to get a new one.',
    ],
  },
  {
    id: 'play',
    icon: 'play',
    title: 'How to Play',
    intro: 'Four premium titles — CryptoCrush, Cash Rider, Zuma and Gamewin — ready instantly.',
    steps: [
      'Tap any game card on Home to open its preview.',
      'Press Play now — games load in your browser with no download or install.',
      'Your score is tracked automatically as you play each session.',
      'Come back any time; the more you play, the higher you climb the boards.',
    ],
  },
  {
    id: 'leaderboard',
    icon: 'flag',
    title: 'How to Use the Leaderboard',
    intro: 'Two boards run at once — one resets daily, one weekly. Both count toward prizes.',
    steps: [
      'Open Leaderboard and switch between the Daily and Weekly tabs.',
      'Your own rank is pinned to the bottom so you never lose your place.',
      'The movement arrow shows how far you have climbed or slipped since last check.',
      'Score more points in any game to move up — the top ranks win the biggest rewards.',
    ],
  },
  {
    id: 'win',
    icon: 'gift',
    title: 'How to Win',
    intro: 'Finish high on the boards to earn airtime and cash, credited to your Econet line.',
    steps: [
      'The Daily top 10 win airtime; the Weekly top 10 share the grand cash pool.',
      'Prize values are shown per rank on the Prizes screen in your chosen currency.',
      'When you are eligible, a Claim button appears on the reward — tap it to collect.',
      'Claimed rewards are paid straight to your Econet balance; unclaimed ones expire.',
    ],
  },
  {
    id: 'promos',
    icon: 'sparkle',
    title: 'Promos',
    intro: 'Extra ways to win beyond the leaderboards, refreshed regularly for subscribers.',
    steps: [
      'Spin the Lucky Wheel once every day for a chance at instant airtime.',
      'Watch for seasonal campaigns and double-reward rounds announced in-app.',
      'Exclusive subscriber offers appear on Home and Prizes when a promo is live.',
      'Keep your subscription active to stay eligible for every promotion.',
    ],
  },
];

/** How To — a scannable, accordion guide to the whole subscriber journey. */
export function HowTo() {
  return (
    <div className={styles.page}>
      <p className={styles.intro}>
        New to YoGamezPro? These short guides walk you through everything — from subscribing
        to climbing the leaderboard and claiming your rewards.
      </p>

      <div className={styles.list}>
        {GUIDES.map((g) => (
          <details key={g.id} className={styles.item}>
            <summary className={styles.summary}>
              <span className={styles.badge}><Icon name={g.icon} size={20} /></span>
              <span className={styles.summaryText}>{g.title}</span>
              <Icon name="chevronRight" size={18} className={styles.chevron} />
            </summary>
            <div className={styles.body}>
              <p className={styles.itemIntro}>{g.intro}</p>
              <ol className={styles.steps}>
                {g.steps.map((s, i) => (
                  <li key={i} className={styles.step}>
                    <span className={styles.stepNo}>{i + 1}</span>
                    <span className={styles.stepText}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
