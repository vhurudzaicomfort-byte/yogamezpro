import styles from './Privacy.module.css';

/**
 * Privacy Policy — dedicated route, standard legal-document layout with a
 * readable measure (~68ch). Placeholder copy, clearly marked pending Econet
 * Legal review (correction pass 2, §7). Linked from the side menu and footer.
 */
export function Privacy() {
  return (
    <div className={styles.page}>
      <div className={styles.placeholder} role="note">
        <strong>Placeholder</strong> — sample copy pending review and approval by Econet Legal.
      </div>

      <div className={styles.doc}>
        <p className={styles.intro}>
          This Privacy Policy explains how the YoGamezPro premium gaming service, a Value Added
          Service provided by Econet Wireless Zimbabwe, collects, uses, and protects your
          information. By subscribing to and using the service you agree to the practices described here.
        </p>

        <section className={styles.section}>
          <h2 className={styles.h}>1. Information we collect</h2>
          <p className={styles.p}>
            We collect your mobile number (MSISDN) and subscription status to activate and bill the
            service, along with gameplay data such as scores, leaderboard position, achievements, and
            Lucky Wheel activity. We also collect basic device and session information needed to
            deliver the games reliably.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h}>2. How we use your information</h2>
          <p className={styles.p}>
            Your information is used to authenticate you as an Econet subscriber, manage your
            subscription and billing in ZWG or USD, operate the daily and weekly leaderboards, award
            and deliver airtime and cash prizes, and improve the quality and performance of the games.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h}>3. MSISDN &amp; subscription data</h2>
          <p className={styles.p}>
            Your mobile number is used to identify your account and process recurring charges to your
            Econet line. On public surfaces such as the leaderboard your number is always shown masked
            (for example, +2637****6935) — your full number is never displayed to other players.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h}>4. Cookies &amp; local storage</h2>
          <p className={styles.p}>
            The service stores small amounts of data on your device — such as your theme preference,
            selected display currency, and session state — so the experience is consistent between
            visits. This data stays on your device and is not used for cross-site tracking.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h}>5. Data sharing</h2>
          <p className={styles.p}>
            We do not sell your personal information. Information may be shared with Econet Wireless
            and service providers strictly to operate billing, prize fulfilment, and the gaming
            platform, and where required by applicable Zimbabwean law.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h}>6. Your rights</h2>
          <p className={styles.p}>
            You may unsubscribe at any time from the side menu, which stops further billing. You may
            request access to, correction of, or deletion of your personal information subject to the
            record-keeping obligations Econet is required to meet.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h}>7. Data retention</h2>
          <p className={styles.p}>
            We retain your information for as long as your subscription is active and for a limited
            period afterward as required for billing, dispute resolution, and legal compliance, after
            which it is deleted or anonymised.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h}>8. Contact</h2>
          <p className={styles.p}>
            For questions about this policy or your data, contact Econet Wireless customer care
            through the official Econet channels. This document will be updated as the service evolves
            and following review by Econet Legal.
          </p>
        </section>
      </div>
    </div>
  );
}
