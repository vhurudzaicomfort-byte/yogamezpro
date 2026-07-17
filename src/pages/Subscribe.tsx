import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthScreen } from '../layouts/AuthScreen';
import { AuthTabs } from '../components/layout/AuthTabs';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Icon } from '../icons/Icon';
import { PLANS } from '../config/catalogue';
import { formatZiG } from '../utils/format';
import { validateMsisdn, toE164, formatLocal, COUNTRY_CODE } from '../utils/msisdn';
import { subscribe } from '../services/authService';
import { useSession } from '../hooks/useSession';
import { itemVariants, listVariants } from '../animations/variants';
import type { PlanTier } from '../types';
import styles from './Subscribe.module.css';

/** Subscribe: pick a ZiG plan + enter MSISDN → OTP. Prices preserved (§3). */
export function Subscribe() {
  const navigate = useNavigate();
  const { setMsisdn, setPlan } = useSession();
  const [local, setLocal] = useState('');
  const [selected, setSelected] = useState<PlanTier>(PLANS.find((p) => p.recommended) ?? PLANS[0]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const err = validateMsisdn(local);
    if (err) { setError(err); return; }
    setBusy(true);
    const e164 = toE164(local);
    await subscribe(e164, selected.id);
    setMsisdn(e164);
    setPlan(selected);
    setBusy(false);
    navigate('/otp');
  };

  return (
    <AuthScreen>
      <AuthTabs active="subscribe" />

      <Input
        label="Econet mobile number"
        hideLabel
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="Enter your phone number"
        prefix={COUNTRY_CODE}
        value={formatLocal(local)}
        onChange={(e) => { setLocal(e.target.value); setError(null); }}
        error={error}
      />

      <div>
        <p className="t-overline" style={{ marginBottom: '0.6rem', textAlign: 'center' }}>Select package</p>
        <motion.ul className={styles.plans} variants={listVariants} initial="initial" animate="enter">
          {PLANS.map((plan) => {
            const active = plan.id === selected.id;
            return (
              <motion.li key={plan.id} variants={itemVariants}>
                <button
                  className={`${styles.plan} ${active ? styles.active : ''}`}
                  onClick={() => setSelected(plan)}
                  aria-pressed={active}
                >
                  <span className={styles.radio} aria-hidden="true">{active && <Icon name="check" size={14} />}</span>
                  <span className={styles.planMain}>
                    <span className={styles.planName}>{plan.label}</span>
                    {plan.highlight && <span className={styles.tagline}>{plan.highlight}</span>}
                  </span>
                  <span className={styles.planPrice}>
                    <span className={`${styles.price} num`}>{formatZiG(plan.price)}</span>
                    <span className={styles.cadence}>{plan.cadence}</span>
                  </span>
                  {plan.recommended && <span className={styles.ribbon}>Popular</span>}
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      <Button variant="primary" size="lg" block loading={busy} onClick={submit}>
        Subscribe — {formatZiG(selected.price)}
      </Button>
    </AuthScreen>
  );
}
