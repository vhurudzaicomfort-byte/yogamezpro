import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Confetti.module.css';

const COLORS = ['#5bc2e7', '#f28028', '#e92230', '#f5c344', '#2b368a', '#8ad6f0'];

/**
 * Lightweight DOM confetti burst (~44 pieces, transform/opacity only).
 * Renders nothing under prefers-reduced-motion (static celebration instead).
 */
export function Confetti({ pieces = 44 }: { pieces?: number }) {
  const reduced = useReducedMotion();
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }).map((_, i) => ({
        id: i,
        x: (i / pieces) * 100,
        dx: (Math.random() - 0.5) * 160,
        dy: 120 + Math.random() * 240,
        rot: Math.random() * 720 - 360,
        delay: Math.random() * 0.25,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
      })),
    [pieces],
  );

  if (reduced) return null;

  return (
    <div className={styles.field} aria-hidden="true">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className={styles.bit}
          style={{ left: `${b.x}%`, background: b.color, borderRadius: b.round ? '50%' : 2 }}
          initial={{ y: -20, x: 0, opacity: 1, rotate: 0 }}
          animate={{ y: b.dy, x: b.dx, opacity: [1, 1, 0], rotate: b.rot }}
          transition={{ duration: 1.5 + Math.random(), delay: b.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
