import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import styles from './Chip.module.css';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: IconName;
  tone?: 'default' | 'live' | 'reward';
  /** Non-interactive label chip (renders a span). */
  static?: boolean;
  children: ReactNode;
}

/** Category / filter chip. Interactive by default; `static` for labels/badges. */
export function Chip({ active, icon, tone = 'default', static: isStatic, children, className = '', ...rest }: ChipProps) {
  const cls = `${styles.chip} ${styles[tone]} ${active ? styles.active : ''} ${className}`;
  const content = (
    <>
      {tone === 'live' && <span className={styles.pulse} aria-hidden="true" />}
      {icon && <Icon name={icon} size={15} />}
      {children}
    </>
  );
  if (isStatic) return <span className={`${cls} ${styles.staticChip}`}>{content}</span>;
  return (
    <button type="button" className={cls} aria-pressed={active} {...rest}>
      {content}
    </button>
  );
}
