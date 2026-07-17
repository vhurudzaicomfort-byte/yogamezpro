import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CurrencyCode } from '../types';

/**
 * Currency selection, shared across Subscribe and Prizes and persisted for the
 * session so the price the user chose is the price they see at confirmation
 * (correction §6). Selection only — no amounts or conversion live here.
 */
interface CurrencyCtx {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}
const Ctx = createContext<CurrencyCtx | null>(null);
const KEY = 'ygp.currency';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'USD' || saved === 'ZWG') return saved;
    } catch { /* ignore */ }
    return 'ZWG';
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, currency); } catch { /* ignore */ }
  }, [currency]);

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency(): CurrencyCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
