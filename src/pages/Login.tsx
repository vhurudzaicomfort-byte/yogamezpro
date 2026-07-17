import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthScreen } from '../layouts/AuthScreen';
import { AuthTabs } from '../components/layout/AuthTabs';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { validateMsisdn, toE164, formatLocal, COUNTRY_CODE } from '../utils/msisdn';
import { requestOtp } from '../services/authService';
import { useSession } from '../hooks/useSession';

/** Login: MSISDN → OTP. Validation rules preserved from production (§2). */
export function Login() {
  const navigate = useNavigate();
  const { setMsisdn } = useSession();
  const [local, setLocal] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const err = validateMsisdn(local);
    if (err) { setError(err); return; }
    setBusy(true);
    const e164 = toE164(local);
    await requestOtp(e164);
    setMsisdn(e164);
    setBusy(false);
    navigate('/otp');
  };

  return (
    <AuthScreen>
      <AuthTabs active="login" />
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Welcome back. Enter your Econet number to receive a login PIN.
      </p>
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
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
      <Button variant="primary" size="lg" block loading={busy} onClick={submit}>Login</Button>
    </AuthScreen>
  );
}
