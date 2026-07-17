import type { WheelSegment } from '../types';

/**
 * Lucky Wheel configuration — fully data-driven (brief §8). Segments, weights
 * and copy live here; the render + physics never hard-code a prize. Change a
 * prize by editing this array only.
 *
 * Current live prizes: Airtime $0.10 and $0.20, interleaved with "no win"
 * segments so the wheel reads as an 8-slice board. Weights bias the outcome
 * toward "Try Again" (house-realistic) while keeping wins visible.
 */
export const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: 'a10-a', label: 'Airtime\n$0.10', weight: 14, kind: 'airtime', amount: 0.1 },
  { id: 'miss-a', label: 'Try\nAgain', weight: 26, kind: 'none' },
  { id: 'a20-a', label: 'Airtime\n$0.20', weight: 6, kind: 'airtime', amount: 0.2 },
  { id: 'miss-b', label: 'Try\nAgain', weight: 26, kind: 'none' },
  { id: 'a10-b', label: 'Airtime\n$0.10', weight: 14, kind: 'airtime', amount: 0.1 },
  { id: 'miss-c', label: 'Try\nAgain', weight: 26, kind: 'none' },
  { id: 'a20-b', label: 'Airtime\n$0.20', weight: 6, kind: 'airtime', amount: 0.2 },
  { id: 'bonus', label: 'Bonus\nSpin', weight: 8, kind: 'bonus' },
];

/** Frequency cap: how often a returning user is offered the wheel. */
export const WHEEL_CAP = {
  /** 'session' = once per browser session, 'day' = once per calendar day. */
  mode: 'day' as 'session' | 'day',
  storageKey: 'ygp.wheel.lastSpin',
};
