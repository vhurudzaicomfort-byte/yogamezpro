import type { ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import styles from './EmptyState.module.css';

/** Designed empty/error/offline state — never a bare string (brief §5, §12). */
export function EmptyState({ icon = 'search', title, message, action, tone = 'neutral' }: {
  icon?: IconName;
  title: string;
  message: string;
  action?: ReactNode;
  tone?: 'neutral' | 'danger';
}) {
  return (
    <div className={`${styles.wrap} ${styles[tone]}`} role="status">
      <span className={styles.badge}><Icon name={icon} size={30} /></span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.msg}>{message}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
