import type { Achievement, LeaderboardEntry, LeaderboardPeriod } from '../types';

/** Player stats preserved from the production Profile/Leaderboard screens. */
export const PLAYER = {
  name: 'Player',
  dailyScore: 532,
  weeklyScore: 56555,
  dailyPosition: 25,
  weeklyPosition: 125,
  bestScoreToBeat: 610,
};

const NAMES = [
  'Tariro M.', 'Kuda Z.', 'Rufaro N.', 'Blessing C.', 'Nyasha T.',
  'Farai M.', 'Chipo D.', 'Tendai R.', 'Simba K.', 'Rutendo P.',
  'Munashe H.', 'Anesu V.',
];

const build = (seed: number, top: number): LeaderboardEntry[] => {
  const rows: LeaderboardEntry[] = NAMES.map((name, i) => ({
    rank: i + 1,
    name,
    score: Math.round(top - i * (top / 22) - (i % 3) * seed),
  }));
  // Pin "You" at the player's known position for each period.
  return rows;
};

export const LEADERBOARDS: Record<LeaderboardPeriod, LeaderboardEntry[]> = {
  daily: build(7, 4200),
  weekly: build(19, 98230),
};

export const YOUR_RANK: Record<LeaderboardPeriod, LeaderboardEntry> = {
  daily: { rank: PLAYER.dailyPosition, name: 'You', score: PLAYER.dailyScore, isYou: true },
  weekly: { rank: PLAYER.weeklyPosition, name: 'You', score: PLAYER.weeklyScore, isYou: true },
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-blood', label: 'First Play', description: 'Played your first game', icon: 'play', unlocked: true },
  { id: 'streak-3', label: '3-Day Streak', description: 'Played 3 days running', icon: 'flame', unlocked: true },
  { id: 'top-100', label: 'Top 100', description: 'Break into the weekly top 100', icon: 'medal', unlocked: true },
  { id: 'high-roller', label: 'High Roller', description: 'Score over 1,000 in a session', icon: 'star', unlocked: false, progress: 0.53 },
  { id: 'collector', label: 'Collector', description: 'Play all launch titles', icon: 'grid', unlocked: false, progress: 0.75 },
  { id: 'champion', label: 'Champion', description: 'Finish #1 on a daily board', icon: 'trophy', unlocked: false, progress: 0.2 },
];
