import { PLANS } from '../config/catalogue';
import { formatZiG } from '../utils/format';
import styles from './content.module.css';

/** Terms & Conditions — reflects the preserved ZiG billing model. */
export function Legal() {
  return (
    <div className={styles.page}>
      <p className={styles.intro}>
        These terms govern your use of the YoGamezPro premium gaming service, a Value Added
        Service provided by Econet Wireless Zimbabwe. By subscribing you agree to be bound by them.
      </p>

      <div className={styles.section}>
        <h2 className={styles.h}>1. The service</h2>
        <p className={styles.p}>
          YoGamezPro gives active subscribers unlimited, ad-free access to a catalogue of premium
          HTML5 games, leaderboards and daily rewards, playable on Android and web with no downloads.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h}>2. Subscription &amp; billing</h2>
        <p className={styles.p}>
          Plans are billed in Zimbabwe Gold (ZiG) to your Econet line: <strong>Daily {formatZiG(PLANS[0].price)}</strong>,{' '}
          <strong>Weekly {formatZiG(PLANS[1].price)}</strong> and <strong>Monthly {formatZiG(PLANS[2].price)}</strong>.
          Subscriptions renew automatically each period until cancelled and require sufficient airtime balance.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h}>3. Eligibility &amp; authentication</h2>
        <p className={styles.p}>
          You must be an Econet mobile subscriber. Access is authenticated via your MSISDN and a
          one-time PIN sent by SMS. Keep your PIN confidential; do not share it with anyone.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h}>4. Prizes &amp; rewards</h2>
        <p className={styles.p}>
          Airtime and ZiG cash prizes are awarded based on leaderboard rank and Lucky Wheel outcomes.
          Rewards are credited to your Econet line and have no cash-alternative unless stated.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h}>5. Cancellation</h2>
        <p className={styles.p}>
          You may unsubscribe at any time from the side menu, or via your Econet self-service
          channel. Access continues until the end of the current paid period.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h}>6. Fair use &amp; conduct</h2>
        <p className={styles.p}>
          Automated play, exploitation of bugs, or attempts to manipulate scores may result in
          suspension. Econet may update the catalogue, prizes and these terms from time to time.
        </p>
      </div>
    </div>
  );
}
