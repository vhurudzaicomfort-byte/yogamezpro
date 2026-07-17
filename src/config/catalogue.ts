import type { CategoryKey, Game, PlanTier, PrizeRow } from '../types';

/** Category display metadata. `grad` maps to a token gradient in tokens.css. */
export const CATEGORIES: Record<CategoryKey, { label: string; grad: string }> = {
  arcade: { label: 'Arcade', grad: 'var(--cat-arcade)' },
  puzzle: { label: 'Puzzle', grad: 'var(--cat-puzzle)' },
  racing: { label: 'Racing', grad: 'var(--cat-racing)' },
  sports: { label: 'Sports', grad: 'var(--cat-sports)' },
  action: { label: 'Action', grad: 'var(--cat-action)' },
  strategy: { label: 'Strategy', grad: 'var(--cat-strategy)' },
};

/**
 * The catalogue — exactly four launch titles, each with its own supplied
 * wordmarked vector icon. No placeholders, no filler (correction §11).
 */
export const GAMES: Game[] = [
  { id: 'crypto-crush', title: 'CryptoCrush', icon: 'cryptoCrush', category: 'puzzle', tagline: 'Match the coins, crush the chain.', rating: 4.7, plays: 128400 },
  { id: 'cash-rider', title: 'Cash Rider', icon: 'cashRider', category: 'racing', tagline: 'Outrun traffic, bank the cash.', rating: 4.6, plays: 98230 },
  { id: 'zuma', title: 'Zuma', icon: 'zuma', category: 'arcade', tagline: 'Fire, chain and clear the track.', rating: 4.8, plays: 156900 },
  { id: 'gamewin', title: 'Gamewin', icon: 'gamewin', category: 'arcade', tagline: 'Spin up wins, climb the ranks.', rating: 4.5, plays: 74110, isNew: true },
];

export const FEATURED_ID = 'crypto-crush';

/**
 * Subscription plans. The ZWG amounts are preserved exactly from the
 * production Subscribe screen (AUDIT §3); the USD amounts are the pricing
 * service's own USD tariff. Both are supplied per currency — the client never
 * converts (correction §6).
 */
export const PLANS: PlanTier[] = [
  { id: 'daily', label: 'Daily', price: { ZWG: 0.84, USD: 0.05 }, cadence: 'per day', highlight: 'Try it out' },
  { id: 'weekly', label: 'Weekly', price: { ZWG: 5.88, USD: 0.35 }, cadence: 'per week', recommended: true, highlight: 'Most popular' },
  { id: 'monthly', label: 'Monthly', price: { ZWG: 10.09, USD: 0.6 }, cadence: 'per month', highlight: 'Best value' },
];

/**
 * Prize ladders. ZWG values preserved exactly from the production Prizes
 * screen (§10); USD values are the service's USD prize tariff. Supplied per
 * currency — never converted client-side.
 */
export const DAILY_AIRTIME_PRIZES: PrizeRow[] = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  value: { ZWG: 50 - i * 5, USD: Number((2 - i * 0.2).toFixed(2)) }, // ZWG 50→5 · USD 2.00→0.20
}));

export const WEEKLY_CASH_PRIZES: PrizeRow[] = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  value: { ZWG: i === 9 ? 50 : 500 - i * 50, USD: i === 9 ? 2 : 20 - i * 2 }, // ZWG 500→50 · USD 20→2
}));
