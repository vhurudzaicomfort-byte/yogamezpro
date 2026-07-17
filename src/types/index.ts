/** Shared domain types for YoGamezPro. */

export type CategoryKey =
  | 'arcade'
  | 'puzzle'
  | 'racing'
  | 'sports'
  | 'action'
  | 'strategy';

export interface Game {
  id: string;
  title: string;
  /** Registered icon component key (see icons/games). */
  icon: 'cashRider' | 'cryptoCrush' | 'gamewin' | 'zuma';
  category: CategoryKey;
  tagline: string;
  /** 0–5, one decimal. */
  rating: number;
  /** Raw play count; formatted for display at render time. */
  plays: number;
  isNew?: boolean;
}

/** The service prices in both currencies; the client only ever formats. */
export type CurrencyCode = 'USD' | 'ZWG';
export interface Money {
  USD: number;
  ZWG: number;
}

export interface PlanTier {
  id: 'daily' | 'weekly' | 'monthly';
  label: string;
  /** Both amounts supplied by the pricing service — never converted client-side. */
  price: Money;
  cadence: string;
  highlight?: string;
  recommended?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  /** Server-masked identifier, e.g. "+2637****6935". Never a name or full number. */
  maskedId: string;
  score: number;
  /** Rank change since the previous period. */
  movement?: 'up' | 'down' | 'same';
  /** Positions moved (for the movement indicator). */
  delta?: number;
  isYou?: boolean;
}

export type LeaderboardPeriod = 'daily' | 'weekly';

export interface PrizeRow {
  rank: number;
  /** Per-currency prize value, supplied by the prize service. */
  value: Money;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  icon: string;
  unlocked: boolean;
  /** For progress-ring achievements: 0–1. */
  progress?: number;
}

export interface WheelSegment {
  id: string;
  label: string;
  /** Selection weight — higher = more likely. */
  weight: number;
  kind: 'airtime' | 'none' | 'bonus';
  amount?: number;
}

export interface WheelResult {
  segmentId: string;
  segmentIndex: number;
  won: boolean;
  label: string;
}

export type Toast = {
  id: string;
  message: string;
  tone: 'info' | 'success' | 'danger';
};
