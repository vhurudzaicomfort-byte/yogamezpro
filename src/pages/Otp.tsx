import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthScreen } from '../layouts/AuthScreen';
import { OtpInput } from '../components/ui/OtpInput';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { OTP_LENGTH, OTP_TTL_SECONDS, verifyOtp, requestOtp } from '../services/authService';
import { useSession } from '../hooks/useSession';
import { useToast } from '../hooks/useToast';
import { clock } from '../utils/format';
import styles from './Otp.module.css';

/** OTP verification — 4 digits, 60s countdown, resend (preserved §4). */
export function Otp() {
  const navigate = useNavigate();
  const { msisdn } = useSession();
  const { push } = useToast();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [remaining, setRemaining] = useState(OTP_TTL_SECONDS);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const confirm = useCallback(async (value?: string) => {
    const entered = value ?? code;
    setBusy(true);
    setError(null);
    const res = await verifyOtp(entered);
    setBusy(false);
    if (res.ok) { navigate('/authenticating'); }
    else { setError(res.reason); setCode(''); }
  }, [code, navigate]);

  const resend = async () => {
    await requestOtp(msisdn);
    setRemaining(OTP_TTL_SECONDS);
    setCode('');
    setError(null);
    push('A new PIN has been sent via SMS.', 'success');
  };

  const expired = remaining <= 0;

  return (
    <AuthScreen showBrand={false}>
      <div className={styles.head}>
        <h1 className="t-h1">OTP Verification</h1>
        <p className={styles.sub}>
          We sent a one-time PIN to <strong>{msisdn || 'your number'}</strong> via SMS.
        </p>
      </div>

      <OtpInput length={OTP_LENGTH} value={code} onChange={(v) => { setCode(v); setError(null); }} onComplete={(v) => confirm(v)} invalid={!!error} />

      {error && <p className={styles.error} role="alert">{error}</p>}

      <div className={styles.timer}>
        <ProgressRing progress={remaining / OTP_TTL_SECONDS} size={44} stroke={4}>
          <span className={`${styles.count} num`}>{expired ? '0:00' : clock(remaining)}</span>
        </ProgressRing>
        <span aria-live="polite">
          {expired ? 'PIN expired — request a new one.' : `Expires in ${clock(remaining)}`}
        </span>
      </div>

      <Button variant="primary" size="lg" block loading={busy} disabled={code.length < OTP_LENGTH} onClick={() => confirm()}>
        Confirm
      </Button>

      <div className={styles.recover}>
        <p>Lost your PIN? Didn't receive it? Expired?</p>
        <button className={styles.retry} onClick={resend}>Resend PIN</button>
      </div>
    </AuthScreen>
  );
}
