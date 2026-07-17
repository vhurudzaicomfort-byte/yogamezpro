import { useState } from 'react';
import { GAMES, RECENTLY_PLAYED_IDS, PLAYED_IDS, gamesByIds } from '../config/catalogue';
import { PLAYER } from '../config/leaderboard';
import type { Game } from '../types';

/**
 * Rotating home-banner selector (correction pass 2, §3).
 *
 * Rules honoured here:
 * - Rotates on every fresh mount (page open / refresh / return), but is picked
 *   ONCE per mount and held — no reshuffle on re-render, no flicker.
 * - Only eligible variants are considered (never "Continue Playing" with no
 *   history, never "Haven't Tried Yet" when all four are played).
 * - Weighted, not uniform: engaged users skew to resume/compete, new users to
 *   discovery.
 * - Never the same variant twice in a row, and never the same game on
 *   consecutive opens, when alternatives exist (persisted in localStorage).
 * - "Game of the Day" is date-seeded — identical for the whole calendar day.
 */

export type BannerVariantId = 'continue' | 'gotd' | 'untried' | 'leaderboard' | 'promo';

export interface HeroBannerData {
  variant: BannerVariantId;
  kicker: string;
  copy: string;
  cta: string;
  game: Game;
}

const LAST_KEY = 'ygp.banner.last';

/** Deterministic pick of the day-stable Game of the Day. */
function gameOfTheDay(): Game {
  const key = new Date().toDateString();
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return GAMES[h % GAMES.length];
}

interface Candidate extends HeroBannerData {
  weight: number;
}

function buildCandidates(): Candidate[] {
  const recent = gamesByIds(RECENTLY_PLAYED_IDS);
  const untried = GAMES.filter((g) => !PLAYED_IDS.includes(g.id));
  const engaged = recent.length > 0;
  const gotd = gameOfTheDay();
  const out: Candidate[] = [];

  if (recent.length > 0) {
    out.push({
      variant: 'continue',
      kicker: 'Continue Playing',
      copy: 'Pick up where you left off and defend your daily score.',
      cta: 'Resume',
      game: recent[0],
      weight: engaged ? 5 : 1,
    });
  }
  out.push({
    variant: 'gotd',
    kicker: 'Game of the Day',
    copy: "Today's featured title — fresh pick, big scores on offer.",
    cta: 'Play now',
    game: gotd,
    weight: 2,
  });
  if (untried.length > 0) {
    out.push({
      variant: 'untried',
      kicker: "Haven't Tried Yet",
      copy: `New to you — give ${untried[0].title} a spin and climb from zero.`,
      cta: 'Try it',
      game: untried[0],
      weight: engaged ? 2 : 5,
    });
  }
  if (recent.length > 0) {
    out.push({
      variant: 'leaderboard',
      kicker: 'Climb the Leaderboard',
      copy: `You're ${PLAYER.dailyPosition}th today — a few good runs move you up.`,
      cta: 'View ranks',
      game: recent[0],
      weight: 3,
    });
  }
  out.push({
    variant: 'promo',
    kicker: 'Win Your Share',
    copy: 'Spin the Lucky Wheel for instant airtime, then play for prizes.',
    cta: 'Open prizes',
    game: gotd,
    weight: 3,
  });
  return out;
}

function pick(): HeroBannerData {
  const candidates = buildCandidates();
  let last: { variant?: string; gameId?: string } = {};
  try { last = JSON.parse(localStorage.getItem(LAST_KEY) || '{}'); } catch { /* ignore */ }

  // Avoid repeating the same variant, then the same game — but only when doing
  // so still leaves something to show.
  let pool = candidates;
  const noVariant = pool.filter((c) => c.variant !== last.variant);
  if (noVariant.length) pool = noVariant;
  const noGame = pool.filter((c) => c.game.id !== last.gameId);
  if (noGame.length) pool = noGame;

  const total = pool.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * total;
  let chosen = pool[pool.length - 1];
  for (const c of pool) { r -= c.weight; if (r <= 0) { chosen = c; break; } }

  try { localStorage.setItem(LAST_KEY, JSON.stringify({ variant: chosen.variant, gameId: chosen.game.id })); } catch { /* ignore */ }
  const { weight: _w, ...data } = chosen;
  void _w;
  return data;
}

/** Pick once per mount and hold (stable within the session view). */
export function useHeroBanner(): HeroBannerData {
  const [data] = useState<HeroBannerData>(pick);
  return data;
}
