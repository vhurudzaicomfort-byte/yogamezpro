import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { PlanTier } from '../types';

/**
 * Session/subscription state for the demo. Persists lightly so a refresh keeps
 * you signed in. Mirrors the production journey: enter MSISDN → OTP → auth →
 * subscribed. A real build swaps the setters for API-backed calls.
 */
interface SessionState {
  msisdn: string;          // E.164
  plan: PlanTier | null;
  authenticated: boolean;
}
interface SessionCtx extends SessionState {
  setMsisdn: (v: string) => void;
  setPlan: (p: PlanTier | null) => void;
  authenticate: () => void;
  signOut: () => void;
}

const Ctx = createContext<SessionCtx | null>(null);
const KEY = 'ygp.session';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw) as SessionState;
    } catch { /* ignore */ }
    return { msisdn: '', plan: null, authenticated: false };
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const value = useMemo<SessionCtx>(() => ({
    ...state,
    setMsisdn: (msisdn) => setState((s) => ({ ...s, msisdn })),
    setPlan: (plan) => setState((s) => ({ ...s, plan })),
    authenticate: () => setState((s) => ({ ...s, authenticated: true })),
    signOut: () => setState({ msisdn: '', plan: null, authenticated: false }),
  }), [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession(): SessionCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
