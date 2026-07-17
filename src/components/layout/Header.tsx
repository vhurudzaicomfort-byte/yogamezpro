import { Icon } from '../../icons/Icon';
import { useTheme } from '../../hooks/useTheme';
import { useScrolled } from '../../hooks/useScrolled';
import { Logo } from './Logo';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  onMenu: () => void;
  /** Show the wordmark instead of a title (Home). */
  brand?: boolean;
}

/** App header: brand/title (left) · theme toggle + menu (right). */
export function Header({ title, onMenu, brand }: HeaderProps) {
  const { theme, toggle } = useTheme();
  const scrolled = useScrolled();
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        {brand ? <Logo height={24} /> : <h1 className={styles.title}>{title}</h1>}
      </div>
      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={21} />
        </button>
        <button className={styles.menuBtn} onClick={onMenu} aria-label="Open menu" aria-haspopup="dialog">
          <Icon name="menu" size={20} />
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
}
