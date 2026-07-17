/**
 * The ONE star in the product (correction pass 2, items 1 & 5). Geometrically
 * true: outer points at 72° intervals from −90° (point up), inner radius =
 * 0.382 × outer, on a vertical axis, uniform stroke. Every star — card meta,
 * preview stat block, review list, review composer — renders from this single
 * path. There must be no second star implementation anywhere.
 */

const OUTER = 9.4;
const INNER = OUTER * 0.382;
const C = 10;

export const STAR_PATH = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? OUTER : INNER;
    const a = (-90 + i * 36) * (Math.PI / 180);
    pts.push(`${(C + r * Math.cos(a)).toFixed(3)},${(C + r * Math.sin(a)).toFixed(3)}`);
  }
  return `M${pts.join('L')}Z`;
})();

export type StarState = 'filled' | 'half' | 'outline';

interface StarProps {
  /** filled / half / outline, or a raw 0–1 fill fraction for aggregates. */
  state?: StarState;
  fill?: number;
  size?: number;
  /** Unique id fragment so gradient defs don't collide. */
  gid: string;
  className?: string;
}

const fromState = (s?: StarState): number => (s === 'filled' ? 1 : s === 'half' ? 0.5 : 0);

export function Star({ state, fill, size = 16, gid, className }: StarProps) {
  const frac = Math.max(0, Math.min(1, fill ?? fromState(state)));
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid}>
          <stop offset={`${frac * 100}%`} stopColor="var(--reward)" />
          <stop offset={`${frac * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill="none" stroke="var(--border-strong)" strokeWidth="1.1" />
      <path d={STAR_PATH} fill={`url(#${gid})`} />
    </svg>
  );
}
