/** Display formatters. Keep number/score formatting consistent app-wide. */

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const grouped = new Intl.NumberFormat('en-US');

/** 128400 → "128.4K". Used on play counts. */
export const formatPlays = (n: number): string => compact.format(n);

/** 56555 → "56,555". Used on scores / leaderboard. */
export const formatScore = (n: number): string => grouped.format(n);

/** Airtime USD, two decimals. 0.1 → "$0.10". */
export const formatUsd = (n: number): string => `$${n.toFixed(2)}`;

/** 1 → "1st", 2 → "2nd"… ordinal ranks. */
export const ordinal = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

/** mm:ss from seconds. */
export const clock = (secs: number): string => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};
