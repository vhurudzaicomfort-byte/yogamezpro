import type { WheelSegment } from '../../types';

/** SVG pie-slice geometry + landing-rotation math for the Lucky Wheel. */

export const WHEEL_VIEW = 300;
export const CENTER = WHEEL_VIEW / 2;
export const RADIUS = 138;

const toXY = (angleDeg: number, r: number) => {
  // 0deg = 12 o'clock, clockwise positive
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a) };
};

export interface Slice {
  path: string;
  labelX: number;
  labelY: number;
  labelAngle: number;
  midAngle: number;
  segment: WheelSegment;
  index: number;
}

/** Build slice paths for N segments, slice 0 starting at the top (pointer). */
export function buildSlices(segments: WheelSegment[]): Slice[] {
  const n = segments.length;
  const step = 360 / n;
  return segments.map((segment, i) => {
    const start = i * step;
    const end = start + step;
    const mid = start + step / 2;
    const p1 = toXY(start, RADIUS);
    const p2 = toXY(end, RADIUS);
    const large = step > 180 ? 1 : 0;
    const path = `M ${CENTER} ${CENTER} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${RADIUS} ${RADIUS} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
    const label = toXY(mid, RADIUS * 0.64);
    // rotate label so text runs outward along the slice
    const labelAngle = mid > 180 ? mid + 90 : mid - 90;
    return { path, labelX: label.x, labelY: label.y, labelAngle, midAngle: mid, segment, index: i };
  });
}

/**
 * Given the current absolute rotation and a target segment index, return the
 * next absolute rotation (deg) that brings that segment under the top pointer,
 * after at least `spins` full turns. A small in-slice jitter adds realism
 * without changing the (already decided) outcome.
 */
export function landingRotation(current: number, index: number, count: number, spins = 5, jitter = 0): number {
  const step = 360 / count;
  const mid = index * step + step / 2;
  // rotation that places slice `index` mid at the top (0deg)
  const targetMod = (360 - mid) % 360;
  const base = current - (((current % 360) + 360) % 360);
  let next = base + targetMod;
  while (next < current + spins * 360) next += 360;
  const maxJitter = step * 0.32;
  return next + Math.max(-maxJitter, Math.min(maxJitter, jitter));
}
