# Icon Specification

Two icon systems ship in YoGamezPro: **game icons** (the branded title art) and
the **UI icon set** (interface glyphs). No emoji, no icon fonts, no mixed
libraries — anywhere.

---

## 1. Game icons

The four launch titles use supplied **upgraded, wordmarked vector icons**
(`src/assets/games/`): `CashRider.svg`, `CryptoCrush.svg`, `Gamewin.svg`,
`Zuma.svg`. They replace the old low-resolution rasters from the production
portal.

### Grid spec

| Property | Value |
|---|---|
| Artboard | `512 × 512` (`viewBox="0 0 512 512"`) |
| Format | Optimised SVG — **no embedded rasters**, no Safari-breaking filters |
| Shape | Rounded-square "plate" per title |
| Plate fill | Per-title gradient derived from the brand palette |
| Lockup | Game **wordmark** locked into the lower third of each plate |
| Light | Consistent top-left key light + radial highlight across the set |
| Silhouette | Recognisable per title (coin / car+coin / trophy / frog + ball chain) |

### Per-title base colours

| Title | Plate gradient | Motif |
|---|---|---|
| CashRider | Econet green → deep green | Car + cash coin, speed lines |
| CryptoCrush | Orange → deep amber | Coin "C" with spark |
| Gamewin | Econet blue → deep navy | Trophy + ribbon banner |
| Zuma | Signal red → deep maroon | Frog shooter + ball chain |

### How they are used

The icons are self-contained plates, so they render as **cover art**, not a
floating glyph on a coloured tile:

- **`GameCard`** — `<GameIcon game={...} fill />` fills the card's **square**
  art region edge-to-edge (`object-fit: cover`). Square art matches the square
  plates, so the wordmark is never cropped and no background bleeds through.
- **`HeroBanner` / `GameDetail`** — `<GameIcon game={...} size={n} />` renders
  the plate as a fixed-size floating subject with a drop shadow.

### Adding a new title

1. Author the icon to the grid spec above (512 artboard, plate + wordmark,
   consistent light) and export optimised SVG.
2. Drop it in `src/assets/games/`.
3. Add the import + map entry in `src/icons/games/GameIcon.tsx`, a new `icon`
   key on the `Game` type, and a catalogue entry. Nothing else changes — cards,
   rails, hero and detail pick it up automatically.

---

## 2. UI icon set

A single custom SVG set in `src/icons/Icon.tsx`, rendered by the `<Icon>`
component.

| Property | Value |
|---|---|
| Grid | `24 × 24` |
| Stroke | `1.5px`, round caps + joins |
| Variants | `line` (default) and `solid` — nav tabs fill in when active |
| Colour | `currentColor` — inherits text colour, themeable |
| A11y | `title` prop exposes a label; otherwise `aria-hidden` + `focusable="false"` |

Registered names (`IconName`): `home, user, flag, gift, menu, close, search,
play, chevronRight, chevronLeft, arrowLeft, trophy, medal, star, flame, grid,
bell, check, edit, chat, logout, filter, clock, sun, moon, sparkle, shield,
bolt, ticket`.

Nav icons (`home`, `user`, `flag`, `gift`) ship `line` + `solid` pairs so the
active `BottomNav` tab renders filled. Add an icon by appending its path to the
`LINE` map (and `SOLID` if it needs a filled variant) and extending the
`IconName` union.
