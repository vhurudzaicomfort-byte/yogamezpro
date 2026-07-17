# YoGamezPro — Icon Specification

Two icon systems, one visual language. New titles and new UI actions slot in
without a redesign by following these rules.

---

## 1. Game icons (`src/icons/games/GameIcon.tsx`)

Rebuilt from the supplied logos as crisp vector art — **never upscaled raster**
(brief §7). Silhouettes preserved so a subscriber still recognises the title.

| Property | Value |
|---|---|
| Artboard | **512 × 512** |
| Safe padding | **8%** (≈41px) — nothing critical outside |
| Tile corner radius | **112px** (unified across the whole set) |
| Tile treatment | vertical brand gradient + top-left radial light + 3px inner ring |
| Light direction | **top-left**, single source, consistent across all icons |
| Depth | soft drop shadow on the subject (`drop-shadow`, Safari-safe — no SVG filters) |
| Format | inline SVG React component, no embedded rasters, no `<filter>` blurs |
| Colour | brand hex derived from tokens (navy/cyan/red/orange/gold) |

### Current set
| Icon | Tile gradient | Subject |
|---|---|---|
| `cryptoCrush` | indigo → navy | gold Bitcoin-stamped coin |
| `cashRider` | orange → red | helmeted rider, wheel, speed streaks |
| `gamewin` | blue → deep-blue | gold trophy + star + laurels |
| `zuma` | green → teal | carved wooden "Z" plank + orbiting balls |

### Adding a new title
1. Add a `<NewGame/>` function in `GameIcon.tsx` using the `<Tile gid from to>`
   wrapper (guarantees the shared tile, light and ring).
2. Keep the subject inside the 8% safe area, lit from the top-left.
3. Register it in the `MAP` object and add the key to `Game['icon']` in
   `src/types/index.ts`.
4. Reference it from the catalogue (`src/config/catalogue.ts`).

---

## 2. UI icons (`src/icons/Icon.tsx`)

A single custom SVG set. **No icon fonts, no emoji, no mixed libraries** (§7).

| Property | Value |
|---|---|
| Grid | **24 × 24** |
| Stroke | **1.5px**, `round` caps + joins |
| Style pairs | `line` (default) + `solid` (filled) for nav-active states |
| Colour | `currentColor` — inherits text colour, themeable |
| A11y | `aria-hidden` by default; pass `title` to expose with `role="img"` |

### Usage
```tsx
<Icon name="home" />                    {/* line */}
<Icon name="home" variant="solid" />    {/* filled — active tab */}
<Icon name="trophy" title="Leaderboard" size={20} />
```

### Adding a UI icon
Add a `line` entry (and optional `solid`) to the `LINE` / `SOLID` maps in
`Icon.tsx`, keyed by a new name added to the `IconName` union. Draw on the 24px
grid at 1.5px stroke so it sits consistently beside the rest of the set.

Nav icons that appear in the bottom bar **must** ship a `solid` variant so the
active tab fills in.
