import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  circle?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Shimmer placeholder. Always size these to the final content so there is
 * zero layout shift (brief §13). Shimmer honours prefers-reduced-motion.
 */
export function Skeleton({ width, height = 16, radius, circle, className = '', style }: SkeletonProps) {
  return (
    <span
      className={`${styles.sk} ${className}`}
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : radius ?? 'var(--r-sm)',
        ...style,
      }}
    />
  );
}
