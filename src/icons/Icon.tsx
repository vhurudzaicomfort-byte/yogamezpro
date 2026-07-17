import type { CSSProperties, ReactNode } from 'react';

/**
 * Custom SVG icon system. Single 24px grid, 1.5px stroke, rounded joins.
 * No icon fonts, no emoji, no mixed libraries (brief §7). Nav icons ship
 * `line` + `solid` pairs so active tabs fill in.
 */

export type IconName =
  | 'home' | 'user' | 'flag' | 'gift' | 'menu' | 'close' | 'search'
  | 'play' | 'chevronRight' | 'chevronLeft' | 'arrowLeft' | 'trophy'
  | 'medal' | 'star' | 'flame' | 'grid' | 'bell' | 'check' | 'edit'
  | 'chat' | 'logout' | 'filter' | 'clock' | 'sun' | 'moon' | 'sparkle'
  | 'shield' | 'bolt' | 'ticket';

type Variant = 'line' | 'solid';

interface IconProps {
  name: IconName;
  size?: number;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  /** Provide a label to expose the icon to AT; omit to hide it (default). */
  title?: string;
}

/* Each entry: line paths (stroked) and optional solid paths (filled). */
const LINE: Record<IconName, ReactNode> = {
  home: <path d="M4 11.5 12 4l8 7.5M6 10v9h4v-5h4v5h4v-9" />,
  user: <><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20c.6-3.6 3.2-5.5 6.5-5.5S18.4 16.4 19 20" /></>,
  flag: <path d="M6 21V4m0 1.5c4-2 8 2 12 0V13c-4 2-8-2-12 0" />,
  gift: <><path d="M4 11h16v9H4z" /><path d="M3.5 7.5h17V11h-17zM12 7.5V20" /><path d="M12 7.5C10.5 4 6.8 4.6 7.4 6.8 7.9 8 10 7.7 12 7.5Zm0 0c1.5-3.5 5.2-2.9 4.6-.7-.5 1.2-2.6.9-4.6.7Z" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: <><circle cx="11" cy="11" r="6" /><path d="m20 20-3.6-3.6" /></>,
  play: <path d="M8 5.5v13l11-6.5z" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  arrowLeft: <path d="M20 12H5m6-7-7 7 7 7" />,
  trophy: <><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9.5 14h5M9 20h6M12 14v3" /></>,
  medal: <><circle cx="12" cy="14" r="4.2" /><path d="M9 3.5 12 9l3-5.5M12 12.4l.9 1.7 1.9.2-1.4 1.3.4 1.9-1.8-1-1.8 1 .4-1.9L9.2 14.3l1.9-.2z" /></>,
  star: <path d="m12 3.5 2.6 5.4 5.9.6-4.4 4 1.3 5.8L12 21.4 6.6 24.3 7.9 18.5 3.5 14.5l5.9-.6z" transform="translate(0 -1.3)" />,
  flame: <path d="M12 3c1 3.5 5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.4 1.2 2 2 2 .5-2.5-1.5-4-1-7z" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  bell: <path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  edit: <path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4" />,
  chat: <path d="M5 5h14v11H9l-4 3.5V5Z" />,
  logout: <path d="M14 4H6v16h8M10 12h10m0 0-3.5-3.5M20 12l-3.5 3.5" />,
  filter: <path d="M4 6h16l-6 7v6l-4-2v-4z" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3.5 2" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />,
  sparkle: <path d="M12 3c.6 3.8 2.2 5.4 6 6-3.8.6-5.4 2.2-6 6-.6-3.8-2.2-5.4-6-6 3.8-.6 5.4-2.2 6-6ZM18.5 3.5c.2 1.3.7 1.8 2 2-1.3.2-1.8.7-2 2-.2-1.3-.7-1.8-2-2 1.3-.2 1.8-.7 2-2Z" />,
  shield: <path d="M12 3 5 6v5c0 5 3 7.5 7 9 4-1.5 7-4 7-9V6z" />,
  bolt: <path d="M13 3 5 13h5l-1 8 8-10h-5z" />,
  ticket: <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z M13 6v12" />,
};

const SOLID: Partial<Record<IconName, ReactNode>> = {
  home: <path d="M11.3 3.3a1 1 0 0 1 1.4 0l8 7.6a1 1 0 0 1-.7 1.7H19V20a1 1 0 0 1-1 1h-3v-5h-6v5H6a1 1 0 0 1-1-1v-7.4H3.9a1 1 0 0 1-.6-1.7z" />,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5.2 20.4C5.6 16.6 8.4 14 12 14s6.4 2.6 6.8 6.4a1 1 0 0 1-1 1.1H6.2a1 1 0 0 1-1-1.1Z" /></>,
  flag: <path d="M6 22a1 1 0 0 1-1-1V4a1 1 0 0 1 .6-.9c4-1.8 8 2 12 .2a1 1 0 0 1 1.4.9v7.6a1 1 0 0 1-.6.9c-3.8 1.7-7.6-1.7-11.4-.3V21a1 1 0 0 1-1 1Z" />,
  gift: <><path d="M3 11.5A1.5 1.5 0 0 1 4.5 10H11v11H6a2 2 0 0 1-2-2v-4.5H3.5A1.5 1.5 0 0 1 3 13zM13 21V10h6.5A1.5 1.5 0 0 1 21 11.5V13a1.5 1.5 0 0 1-1.5 1.5H20V19a2 2 0 0 1-2 2z" /><path d="M11 8.4C9.2 4.4 5.6 5 6.4 7.2 6.9 8.6 9.1 8.5 11 8.4Zm2 0c1.8-4 5.4-3.4 4.6-1.2-.5 1.4-2.7 1.3-4.6 1.2Z" /></>,
};

export function Icon({ name, size = 24, variant = 'line', className, style, title }: IconProps) {
  const solid = variant === 'solid';
  const body = solid ? SOLID[name] ?? LINE[name] : LINE[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid && SOLID[name] ? 'currentColor' : 'none'}
      stroke={solid && SOLID[name] ? 'none' : 'currentColor'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {body}
    </svg>
  );
}
