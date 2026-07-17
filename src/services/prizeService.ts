import { WHEEL_SEGMENTS, WHEEL_CAP } from '../config/wheel';
import type { WheelResult, WheelSegment } from '../types';

/**
 * Prize service. In production this is a server call. The critical contract
 * (brief §8): **the outcome is decided here FIRST**; the wheel animation is
 * then targeted to land on the returned segment. The animation never decides
 * the prize. This mock mirrors that shape (async, weighted draw) so swapping
 * in a real endpoint is a one-line change.
 */

const weightedPick = (segments: WheelSegment[]): number => {
  const total = segments.reduce((s, seg) => s + seg.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < segments.length; i++) {
    r -= segments[i].weight;
    if (r <= 0) return i;
  }
  return segments.length - 1;
};

/** Resolve the spin outcome. Returns the winning segment + index. */
export async function drawPrize(): Promise<WheelResult> {
  // Simulated network latency of the prize service.
  await new Promise((res) => setTimeout(res, 260));
  const index = weightedPick(WHEEL_SEGMENTS);
  const seg = WHEEL_SEGMENTS[index];
  return {
    segmentId: seg.id,
    segmentIndex: index,
    won: seg.kind !== 'none',
    label: seg.label.replace('\n', ' '),
  };
}

/** Frequency capping — persisted so returning users are not nagged (§8). */
export function canSpin(now = new Date()): boolean {
  try {
    const last = localStorage.getItem(WHEEL_CAP.storageKey);
    if (!last) return true;
    if (WHEEL_CAP.mode === 'session') return false;
    // 'day' mode: allowed once the calendar day rolls over.
    return new Date(last).toDateString() !== now.toDateString();
  } catch {
    return true;
  }
}

export function markSpun(now = new Date()): void {
  try {
    localStorage.setItem(WHEEL_CAP.storageKey, now.toISOString());
  } catch {
    /* storage unavailable — fail open, wheel simply re-offers */
  }
}
