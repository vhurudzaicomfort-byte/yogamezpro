import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../icons/Icon';
import styles from './content.module.css';

const FAQS = [
  { q: 'What is YoGamezPro?', a: "It's Econet's premium mobile gaming service — unlimited, ad-free access to a growing library of HTML5 games, with leaderboards and daily airtime rewards. No downloads, just tap and play." },
  { q: 'How do I subscribe?', a: 'Enter your Econet number on the Subscribe screen, pick a Daily, Weekly or Monthly plan, and confirm the one-time PIN we send by SMS. You’ll be playing in seconds.' },
  { q: 'How much does it cost?', a: 'Plans are billed in ZWG or USD to your Econet line: Daily ZWG 0.84, Weekly ZWG 5.88, or Monthly ZWG 10.09. Subscriptions renew automatically until you cancel.' },
  { q: 'How do I win prizes?', a: 'Score points by playing. Your points rank you on the daily and weekly leaderboards — finish in the top 10 to win airtime or cash. You also get a free daily Lucky Wheel spin.' },
  { q: 'What is the Lucky Wheel?', a: 'A free daily spin for a chance to win instant Econet airtime. One spin per day — come back tomorrow for another.' },
  { q: 'How do I cancel?', a: 'Open the side menu and tap Unsubscribe, or use your Econet self-service channel. You keep access until the end of your paid period.' },
  { q: 'Do I need to download anything?', a: 'No. Every game runs instantly in your browser on Android, tablet or desktop — nothing to install or update.' },
];

/** FAQ accordion. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={styles.page}>
      <p className={styles.intro}>Answers to the questions subscribers ask most.</p>
      <div className={styles.acc}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
              <button className={styles.q} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                {f.q}
                <Icon name="chevronRight" size={18} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.a}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {f.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
