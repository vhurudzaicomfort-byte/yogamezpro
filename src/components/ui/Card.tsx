import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article';
  glass?: boolean;
  interactive?: boolean;
  children: ReactNode;
}

/** Surface container. `glass` = frosted panel; `interactive` = hover lift. */
export function Card({ as: Tag = 'div', glass, interactive, className = '', children, ...rest }: CardProps) {
  return (
    <Tag
      className={`${styles.card} ${glass ? styles.glass : ''} ${interactive ? styles.interactive : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
