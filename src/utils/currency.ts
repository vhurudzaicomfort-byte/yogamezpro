import type { CurrencyCode, Money } from '../types';

/**
 * Currency formatting — the ONLY place currency is turned into a string.
 * There is deliberately NO conversion here and no FX rate anywhere in the
 * codebase (correction §6): both amounts are supplied by the pricing/prize
 * service and this util just formats the one for the active currency.
 */

const CONFIG: Record<CurrencyCode, { symbol: string; label: string; minFrac: number }> = {
  USD: { symbol: '$', label: 'USD', minFrac: 2 },
  ZWG: { symbol: 'ZWG ', label: 'ZWG', minFrac: 2 },
};

export const CURRENCIES: CurrencyCode[] = ['USD', 'ZWG'];

/** Format a raw amount already denominated in `currency`. */
export function formatCurrency(amount: number, currency: CurrencyCode, opts?: { whole?: boolean }): string {
  const cfg = CONFIG[currency];
  const frac = opts?.whole && Number.isInteger(amount) ? 0 : cfg.minFrac;
  const num = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  }).format(amount);
  return `${cfg.symbol}${num}`;
}

/** Pick + format the amount for the active currency from a Money pair. */
export function formatMoney(money: Money, currency: CurrencyCode, opts?: { whole?: boolean }): string {
  return formatCurrency(money[currency], currency, opts);
}

export const currencyLabel = (c: CurrencyCode): string => CONFIG[c].label;
