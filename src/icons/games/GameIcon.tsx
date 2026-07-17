import type { Game } from '../../types';

/**
 * Rebuilt game icons (brief §7). Authored as crisp vector art on ONE grid:
 * 512×512 artboard, 8% safe padding, unified 112px corner radius, consistent
 * top-left light direction and drop base. Silhouettes preserved from the
 * supplied logos (bike/coin/trophy/plank). No embedded rasters, no Safari-
 * breaking filters. Spec: documentation/ICON_SPEC.md.
 */

interface GameIconProps {
  game: Game['icon'];
  size?: number;
  className?: string;
}

const RADIUS = 112;

/** Shared tile + soft top-light + inner ring. `gid` namespaces gradient ids. */
function Tile({ gid, from, to, children }: { gid: string; from: string; to: string; children: React.ReactNode }) {
  return (
    <>
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={`${gid}-light`} cx="0.3" cy="0.18" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="8" y="8" width="496" height="496" rx={RADIUS} fill={`url(#${gid}-bg)`} />
      <rect x="8" y="8" width="496" height="496" rx={RADIUS} fill={`url(#${gid}-light)`} />
      {children}
      <rect x="14" y="14" width="484" height="484" rx={RADIUS - 6} fill="none" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="3" />
    </>
  );
}

function CryptoCrush() {
  return (
    <Tile gid="cc" from="#3a46a8" to="#141c52">
      <defs>
        <linearGradient id="cc-coin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.5" stopColor="#f5c344" />
          <stop offset="1" stopColor="#c9971f" />
        </linearGradient>
      </defs>
      <circle cx="256" cy="256" r="150" fill="#00121f" opacity="0.35" />
      <circle cx="256" cy="250" r="150" fill="url(#cc-coin)" />
      <circle cx="256" cy="250" r="150" fill="none" stroke="#fff4cf" strokeOpacity="0.7" strokeWidth="6" />
      <circle cx="256" cy="250" r="118" fill="none" stroke="#8a6410" strokeWidth="10" strokeOpacity="0.55" />
      <path d="M243 176h26v20h14c26 0 44 16 44 40 0 15-8 27-21 33 16 5 27 19 27 37 0 27-20 44-50 44h-14v20h-26v-20h-18v-174h18zm26 46v40h16c12 0 20-8 20-20s-8-20-20-20zm0 66v42h18c13 0 22-8 22-21s-9-21-22-21z" fill="#3a2a00" />
      <path d="M225 158h20v198h-20zM271 158h20v198h-20z" fill="#3a2a00" opacity="0.85" />
    </Tile>
  );
}

function CashRider() {
  return (
    <Tile gid="cr" from="#f28028" to="#b0121d">
      <defs>
        <linearGradient id="cr-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9eef5" />
          <stop offset="1" stopColor="#9aa8bd" />
        </linearGradient>
      </defs>
      {/* speed streaks */}
      <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="14" strokeLinecap="round">
        <path d="M70 150h120" /><path d="M60 210h90" /><path d="M74 350h120" />
      </g>
      {/* wheel */}
      <circle cx="256" cy="330" r="96" fill="#111820" />
      <circle cx="256" cy="330" r="96" fill="none" stroke="url(#cr-metal)" strokeWidth="14" />
      <circle cx="256" cy="330" r="46" fill="#1a2230" stroke="#c9971f" strokeWidth="10" />
      {/* rider helmet + body */}
      <path d="M256 96c46 0 78 30 78 70 0 16-6 30-16 40l14 60H180l14-60c-10-10-16-24-16-40 0-40 32-70 78-70z" fill="#1a2230" />
      <path d="M204 150c8-26 28-40 52-40s44 14 52 40z" fill="#5bc2e7" />
      <rect x="196" y="150" width="120" height="26" rx="13" fill="#0b1119" />
      {/* handlebars */}
      <path d="M150 250q40-24 60 0M362 250q-40-24-60 0" fill="none" stroke="#111820" strokeWidth="20" strokeLinecap="round" />
    </Tile>
  );
}

function Gamewin() {
  return (
    <Tile gid="gw" from="#2b368a" to="#111a4d">
      <defs>
        <linearGradient id="gw-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#d79b1c" />
        </linearGradient>
      </defs>
      {/* laurels */}
      <g fill="none" stroke="url(#gw-gold)" strokeWidth="12" strokeLinecap="round">
        <path d="M150 300c-30-24-40-70-24-118" />
        <path d="M362 300c30-24 40-70 24-118" />
      </g>
      <g fill="url(#gw-gold)">
        <path d="M138 210c-18 4-30 18-30 18s16 8 32 4zM150 250c-18 4-30 18-30 18s16 8 32 4zM374 210c18 4 30 18 30 18s-16 8-32 4zM362 250c18 4 30 18 30 18s-16 8-32 4z" />
      </g>
      {/* star */}
      <path d="m256 96 20 40 44 6-32 30 8 44-40-22-40 22 8-44-32-30 44-6z" fill="url(#gw-gold)" />
      {/* cup */}
      <path d="M196 196h120v40a60 60 0 0 1-120 0z" fill="url(#gw-gold)" />
      <path d="M196 200h-28v16a26 26 0 0 0 30 26M316 200h28v16a26 26 0 0 1-30 26" fill="none" stroke="url(#gw-gold)" strokeWidth="14" />
      <rect x="240" y="300" width="32" height="40" fill="url(#gw-gold)" />
      <rect x="200" y="338" width="112" height="26" rx="8" fill="url(#gw-gold)" />
    </Tile>
  );
}

function Zuma() {
  return (
    <Tile gid="zm" from="#0f7a5a" to="#0a3d40">
      <defs>
        <linearGradient id="zm-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8b678" />
          <stop offset="1" stopColor="#a67c43" />
        </linearGradient>
      </defs>
      {/* orbiting balls */}
      <circle cx="130" cy="150" r="30" fill="#5bc2e7" />
      <circle cx="392" cy="360" r="34" fill="#f28028" />
      <circle cx="150" cy="380" r="22" fill="#e92230" />
      {/* wooden plank sign */}
      <path d="M112 190q144-26 288 0v132q-144 26-288 0z" fill="url(#zm-wood)" stroke="#12324e" strokeWidth="14" strokeLinejoin="round" />
      <g stroke="#12324e" strokeOpacity="0.25" strokeWidth="6">
        <path d="M112 234q144-22 288 0" /><path d="M112 278q144 22 288 0" />
      </g>
      {/* Z */}
      <path d="M186 224h140l-96 66h96v22H176l96-66h-86z" fill="#f6fafc" stroke="#12324e" strokeWidth="8" strokeLinejoin="round" />
    </Tile>
  );
}

const MAP = {
  cryptoCrush: CryptoCrush,
  cashRider: CashRider,
  gamewin: Gamewin,
  zuma: Zuma,
} as const;

export function GameIcon({ game, size = 96, className }: GameIconProps) {
  const Art = MAP[game];
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
