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
  trending?: boolean;
  isNew?: boolean;
}

export interface PlanTier {
  id: 'daily' | 'weekly' | 'monthly';
  label: string;
  price: number;
  /** Currency code shown to the user. */
  currency: 'ZiG';
  cadence: string;
  perDay?: string;
  highlight?: string;
  recommended?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isYou?: boolean;
}

export type LeaderboardPeriod = 'daily' | 'weekly';

export interface PrizeRow {
  rank: number;
  value: number;
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
