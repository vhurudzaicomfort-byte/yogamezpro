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
 * Launch catalogue. The four titles ship with rebuilt vector icons; the
 * remaining entries reuse the icon set to demonstrate rails/grid at scale
 * (the real portal is catalogue-driven from the games service).
 */
export const GAMES: Game[] = [
  { id: 'crypto-crush', title: 'CryptoCrush', icon: 'cryptoCrush', category: 'puzzle', tagline: 'Match the coins, crush the chain.', rating: 4.7, plays: 128400, trending: true },
  { id: 'cash-rider', title: 'Cash Rider', icon: 'cashRider', category: 'racing', tagline: 'Outrun traffic, bank the cash.', rating: 4.6, plays: 98230, trending: true },
  { id: 'zuma', title: 'Zuma', icon: 'zuma', category: 'arcade', tagline: 'Fire, chain and clear the track.', rating: 4.8, plays: 156900 },
  { id: 'gamewin', title: 'Gamewin', icon: 'gamewin', category: 'arcade', tagline: 'Spin up wins, climb the ranks.', rating: 4.5, plays: 74110, isNew: true },
  { id: 'coin-blitz', title: 'Coin Blitz', icon: 'cryptoCrush', category: 'action', tagline: 'Blitz the board before the clock.', rating: 4.3, plays: 41220 },
  { id: 'turbo-lane', title: 'Turbo Lane', icon: 'cashRider', category: 'racing', tagline: 'Nitro corners, ghost rivals.', rating: 4.4, plays: 52880, isNew: true },
  { id: 'block-storm', title: 'Block Storm', icon: 'zuma', category: 'strategy', tagline: 'Stack, plan, survive the storm.', rating: 4.2, plays: 30140 },
  { id: 'goal-rush', title: 'Goal Rush', icon: 'gamewin', category: 'sports', tagline: 'Bend it into the top corner.', rating: 4.6, plays: 61540, trending: true },
];

export const FEATURED_ID = 'crypto-crush';

/**
 * Subscription plans — prices preserved exactly from the production
 * Subscribe screen (ZiG). See documentation/AUDIT.md §3.
 */
export const PLANS: PlanTier[] = [
  { id: 'daily', label: 'Daily', price: 0.84, currency: 'ZiG', cadence: 'per day', highlight: 'Try it out' },
  { id: 'weekly', label: 'Weekly', price: 5.88, currency: 'ZiG', cadence: 'per week', perDay: 'ZiG 0.84/day', recommended: true, highlight: 'Most popular' },
  { id: 'monthly', label: 'Monthly', price: 10.09, currency: 'ZiG', cadence: 'per month', perDay: 'ZiG 0.34/day', highlight: 'Best value' },
];

/** Prize ladders preserved exactly from the production Prizes screen (§10). */
export const DAILY_AIRTIME_PRIZES: PrizeRow[] = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  value: 50 - i * 5, // 50,45,…,5
}));

export const WEEKLY_CASH_PRIZES: PrizeRow[] = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  value: i === 9 ? 50 : 500 - i * 50, // 500,450,…,100,50
}));
