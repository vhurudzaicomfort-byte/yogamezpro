/**
 * Christmas Game On! · Beat the Boss — campaign layer.
 * Temporary seasonal skin: everything lives under src/campaign and is switched
 * on by `CAMPAIGN.enabled`, so removing the promo never touches core screens.
 * Copy and rules mirror the approved campaign proposal deck.
 */
export type Phase = 'teaser' | 'live' | 'results';

export const CAMPAIGN = {
  enabled: true,
  name: 'Christmas Game On!',
  challenge: 'Beat the Boss',
  dates: '1 December 2026 – 28 February 2027',
  // Sample values for mockups — the real Boss Score is published each week.
  week: 3,
  game: { id: 'zuma', title: 'Zuma' },
  bossScore: 48500,
  yourBest: 51240,
  closes: 'Sun 23:59',
};

export const LOOP = [
  { k: 'PLAY', t: 'Discover the weekly featured game and take on the published Boss Score.' },
  { k: 'BEAT', t: 'Play and submit a valid score that exceeds the target.' },
  { k: 'WIN', t: 'Eligible players are ranked; the highest validated scores win weekly airtime prizes.' },
];

export const WEEKLY_PRIZES = [
  { place: '1st', prize: 'Samsung Galaxy A17' },
  { place: '2nd', prize: 'Samsung Galaxy A07' },
  { place: '3rd', prize: 'ZTE Blade A56' },
  { place: '4th', prize: 'Airtime $20' },
  { place: '5th', prize: 'Airtime $10' },
];

export const RULES = [
  { k: 'Attempts', t: 'Multiple attempts during the weekly window. Only your best valid score counts.' },
  { k: 'Qualify', t: 'Score strictly above the published Boss Score to qualify.' },
  { k: 'Tie-break', t: 'If scores tie, the earliest timestamp for the final best score wins.' },
  { k: 'Eligibility', t: 'Daily pack: at least 6 successful renewals in a 7-day week. Weekly pack: paid subscription covers the week.' },
];

export const BOARD = [
  { rank: 1, name: '077 *** 4821', score: 63980 },
  { rank: 2, name: '078 *** 1190', score: 61205 },
  { rank: 3, name: '077 *** 7302', score: 58740 },
  { rank: 4, name: '071 *** 5566', score: 55310 },
  { rank: 5, name: '077 *** 0418', score: 53870 },
];
export const YOU = { rank: 7, name: 'You', score: CAMPAIGN.yourBest };

/** Demo/screenshot switches: ?phase=teaser|live|results&popup=…&theme=…&demo=1 */
export function param(name: string): string | null {
  try { return new URLSearchParams(window.location.search).get(name); } catch { return null; }
}
export function currentPhase(): Phase {
  const p = param('phase');
  return p === 'teaser' || p === 'results' ? p : 'live';
}
export const fmt = (n: number) => n.toLocaleString('en-US');

/** Runs before first render: demo sign-in + forced theme for review links. */
export function bootstrapDemo() {
  if (param('demo') === '1') {
    try {
      localStorage.setItem('ygp.session', JSON.stringify({ msisdn: '+263770000000', plan: 'weekly', authenticated: true }));
    } catch { /* ignore */ }
  }
  const theme = param('theme');
  if (theme === 'light' || theme === 'dark') {
    try { localStorage.setItem('ygp.theme', theme); } catch { /* ignore */ }
  }
  if (CAMPAIGN.enabled) document.documentElement.setAttribute('data-campaign', 'xmas');
}
