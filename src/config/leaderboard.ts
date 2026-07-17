import type { Achievement, LeaderboardEntry, LeaderboardPeriod } from '../types';

/** Player stats preserved from the production Profile/Leaderboard screens. */
export const PLAYER = {
  name: 'Player', // used only on Profile, never on the leaderboard
  dailyScore: 532,
  weeklyScore: 56555,
  dailyPosition: 25,
  weeklyPosition: 125,
  bestScoreToBeat: 610,
};

/**
 * Seed leaderboard rows. Identifiers are stored ALREADY MASKED — full MSISDNs
 * are never present in the client payload (correction §7). In production these
 * masked strings arrive from the server pre-masked; here they are fixed seed.
 */
const MASKED = [
  '+2637****6935', '+2637****1042', '+2638****7781', '+2637****3390', '+2637****5518',
  '+2638****2264', '+2637****9107', '+2637****4453', '+2638****8829', '+2637****6672',
  '+2637****0195', '+2638****3348',
];
const MOVES: LeaderboardEntry['movement'][] = ['up', 'same', 'down', 'up', 'up', 'down', 'same', 'up', 'down', 'up', 'same', 'down'];

const build = (top: number, spread: number): LeaderboardEntry[] =>
  MASKED.map((maskedId, i) => ({
    rank: i + 1,
    maskedId,
    score: Math.round(top - i * spread - (i % 3) * (spread * 0.18)),
    movement: MOVES[i],
    delta: MOVES[i] === 'same' ? 0 : 1 + (i % 3),
  }));

export const LEADERBOARDS: Record<LeaderboardPeriod, LeaderboardEntry[]> = {
  daily: build(4200, 118),
  weekly: build(98230, 3120),
};

/**
 * The current user's own row. `maskedId` is masked from their own session
 * number at render time (they legitimately hold their own number).
 */
export const YOUR_RANK: Record<LeaderboardPeriod, Omit<LeaderboardEntry, 'maskedId'>> = {
  daily: { rank: PLAYER.dailyPosition, score: PLAYER.dailyScore, movement: 'up', delta: 3, isYou: true },
  weekly: { rank: PLAYER.weeklyPosition, score: PLAYER.weeklyScore, movement: 'down', delta: 2, isYou: true },
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-blood', label: 'First Play', description: 'Played your first game', icon: 'play', unlocked: true },
  { id: 'streak-3', label: '3-Day Streak', description: 'Played 3 days running', icon: 'flame', unlocked: true },
  { id: 'top-100', label: 'Top 100', description: 'Break into the weekly top 100', icon: 'medal', unlocked: true },
  { id: 'high-roller', label: 'High Roller', description: 'Score over 1,000 in a session', icon: 'star', unlocked: false, progress: 0.53 },
  { id: 'collector', label: 'Collector', description: 'Play all four launch titles', icon: 'grid', unlocked: false, progress: 0.75 },
  { id: 'champion', label: 'Champion', description: 'Finish #1 on a daily board', icon: 'trophy', unlocked: false, progress: 0.2 },
];
