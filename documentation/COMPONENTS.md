# YoGamezPro 2.0 — Component & Hook Reference

API reference for the component library and context hooks. Props are documented as `name: type — description`. Optional props are marked `?`. Every component consumes design tokens only (semantic CSS custom properties) — there are no hardcoded colours anywhere in the component layer.

All types referenced below (`Game`, `PlanTier`, `WheelResult`, `Toast`, etc.) are defined in `src/types/index.ts`. `IconName` is defined in `src/icons/Icon.tsx`.

---

## ui/

Primitive UI kit in `src/components/ui/`.

### Button

The single button primitive. Glow-on-hover, GPU-composited press. `primary` is the preserved Econet-red commit CTA. Extends `ButtonHTMLAttributes<HTMLButtonElement>` and forwards a ref.

| Prop | Type | Description |
|---|---|---|
| `variant?` | `'primary' \| 'accent' \| 'ghost' \| 'outline' \| 'reward'` | Visual style (default `'primary'`) |
| `size?` | `'sm' \| 'md' \| 'lg'` | Size (default `'md'`) |
| `block?` | `boolean` | Full-width |
| `loading?` | `boolean` | Shows spinner, sets `aria-busy`, disables the button |
| `iconLeft?` | `IconName` | Leading icon |
| `iconRight?` | `IconName` | Trailing icon |
| `children?` | `ReactNode` | Label |

Usage: `<Button variant="reward" block iconLeft="play" onClick={play}>Play now</Button>`

### Input

Labelled text input with a prefix slot (used for the `+263` dial code), screen-reader-announced errors (never colour-only) and a cyan focus glow. Extends `InputHTMLAttributes` (minus `prefix`) and forwards a ref. Generates ids via `useId` and wires `aria-invalid` / `aria-describedby`.

| Prop | Type | Description |
|---|---|---|
| `label?` | `string` | Field label |
| `error?` | `string \| null` | Error text; rendered with `role="alert"` |
| `hint?` | `string` | Helper text (hidden when an error is shown) |
| `prefix?` | `ReactNode` | Content before the input (e.g. `+263`) |
| `hideLabel?` | `boolean` | Visually hide the label but keep it for AT |

Usage: `<Input label="Mobile number" prefix="+263" error={err} inputMode="tel" />`

### Card

Surface container. Extends `HTMLAttributes<HTMLDivElement>`.

| Prop | Type | Description |
|---|---|---|
| `as?` | `'div' \| 'section' \| 'article'` | Element tag (default `'div'`) |
| `glass?` | `boolean` | Frosted glass panel |
| `interactive?` | `boolean` | Hover-lift affordance |
| `children` | `ReactNode` | Contents |

Usage: `<Card glass interactive>…</Card>`

### Chip

Category / filter chip. Interactive by default (renders a `<button>` with `aria-pressed`); `static` renders a non-interactive `<span>` for labels and badges. Extends `ButtonHTMLAttributes`.

| Prop | Type | Description |
|---|---|---|
| `active?` | `boolean` | Selected state (sets `aria-pressed`) |
| `icon?` | `IconName` | Leading icon |
| `tone?` | `'default' \| 'live' \| 'reward'` | Colour tone; `'live'` adds a pulse dot (default `'default'`) |
| `static?` | `boolean` | Render a non-interactive label chip |
| `children` | `ReactNode` | Label |

Usage: `<Chip static tone="live">Trending</Chip>`

### Skeleton

Shimmer placeholder — size it to the final content for zero layout shift. Shimmer honours `prefers-reduced-motion`. Marked `aria-hidden`.

| Prop | Type | Description |
|---|---|---|
| `width?` | `number \| string` | Width |
| `height?` | `number \| string` | Height (default `16`) |
| `radius?` | `number \| string` | Corner radius (default `--r-sm`) |
| `circle?` | `boolean` | Force a circle |
| `className?` | `string` | Extra classes |
| `style?` | `CSSProperties` | Inline style overrides |

Usage: `<Skeleton width="70%" height={18} />`

### Modal

Accessible dialog: React portal, focus trap, Escape-to-close, body scroll lock, focus restore on close. Uses Framer Motion for entrance/exit.

| Prop | Type | Description |
|---|---|---|
| `open` | `boolean` | Visibility |
| `onClose` | `() => void` | Close handler (backdrop, Escape, close button) |
| `title?` | `string` | Header title (also `aria-label` when no `labelledBy`) |
| `bare?` | `boolean` | Hide the default header/close for bespoke dialogs (e.g. the wheel) |
| `labelledBy?` | `string` | `aria-labelledby` id |
| `describedBy?` | `string` | `aria-describedby` id |
| `children` | `ReactNode` | Dialog body |
| `size?` | `'sm' \| 'md' \| 'lg'` | Max content width (default `'md'`) |

Usage: `<Modal open={open} onClose={close} title="Confirm">…</Modal>`

### SegmentedControl

Tab-style toggle with a sliding indicator (Framer Motion shared layout). Generic over the value union `T extends string`. `role="tablist"` with `role="tab"` buttons.

| Prop | Type | Description |
|---|---|---|
| `segments` | `{ value: T; label: string }[]` | Options |
| `value` | `T` | Selected value |
| `onChange` | `(v: T) => void` | Selection handler |
| `ariaLabel` | `string` | Accessible name for the group |

Usage: `<SegmentedControl segments={periods} value={period} onChange={setPeriod} ariaLabel="Leaderboard period" />`

### StatPill

Compact label + value stat (leaderboard / profile). Values render with tabular figures.

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Caption |
| `value` | `string` | Value (formatted by caller) |
| `tone?` | `'brand' \| 'accent' \| 'reward'` | Colour tone (default `'brand'`) |

Usage: `<StatPill label="Weekly score" value="56,555" tone="reward" />`

### ProgressRing

SVG progress ring for milestone / achievement completion, with a centred slot. When `label` is given it exposes `role="img"` with that name.

| Prop | Type | Description |
|---|---|---|
| `progress` | `number` | Completion, 0–1 (clamped) |
| `size?` | `number` | Diameter in px (default `72`) |
| `stroke?` | `number` | Stroke width in px (default `7`) |
| `children?` | `ReactNode` | Centre content |
| `label?` | `string` | Accessible label |

Usage: `<ProgressRing progress={0.53} label="53% complete"><span>53%</span></ProgressRing>`

### EmptyState

Designed empty / error / offline state — never a bare string. Renders `role="status"`.

| Prop | Type | Description |
|---|---|---|
| `icon?` | `IconName` | Badge icon (default `'search'`) |
| `title` | `string` | Heading |
| `message` | `string` | Body copy |
| `action?` | `ReactNode` | Optional CTA |
| `tone?` | `'neutral' \| 'danger'` | Colour tone (default `'neutral'`) |

Usage: `<EmptyState title="No games found" message="Try a different search." action={<Button>Reset</Button>} />`

### OtpInput

Segmented one-time-PIN entry. Numeric `inputmode`, `one-time-code` autofill on the first box, paste-to-fill across all boxes, backspace-to-previous and arrow-key navigation. `role="group"`.

| Prop | Type | Description |
|---|---|---|
| `length` | `number` | Number of digit boxes (4 for YoGamezPro) |
| `value` | `string` | Current value (controlled) |
| `onChange` | `(v: string) => void` | Change handler |
| `onComplete?` | `(v: string) => void` | Fired when all boxes are filled |
| `invalid?` | `boolean` | Error styling |

Usage: `<OtpInput length={4} value={pin} onChange={setPin} onComplete={verify} invalid={!!err} />`

---

## icons/

### Icon

Custom SVG icon system in `src/icons/Icon.tsx` — one 24px grid, 1.5px stroke, rounded joins. No icon fonts, no emoji. Nav icons ship `line` + `solid` pairs so active tabs fill in. When `title` is given the icon is exposed to AT with `role="img"`; otherwise it is `aria-hidden`.

| Prop | Type | Description |
|---|---|---|
| `name` | `IconName` | Which glyph (see union below) |
| `size?` | `number` | px (default `24`) |
| `variant?` | `'line' \| 'solid'` | Falls back to line if no solid exists (default `'line'`) |
| `className?` | `string` | Extra classes |
| `style?` | `CSSProperties` | Inline style |
| `title?` | `string` | Accessible label; omit to hide the icon |

**`IconName` union:** `home`, `user`, `flag`, `gift`, `menu`, `close`, `search`, `play`, `chevronRight`, `chevronLeft`, `arrowLeft`, `trophy`, `medal`, `star`, `flame`, `grid`, `bell`, `check`, `edit`, `chat`, `logout`, `filter`, `clock`, `sun`, `moon`, `sparkle`, `shield`, `bolt`, `ticket`.

Solid variants currently exist for `home`, `user`, `flag`, `gift` (the bottom-nav set); all other names use their line glyph regardless of `variant`.

Usage: `<Icon name="star" variant="solid" size={14} />`

### games/GameIcon

Per-title game art in `src/icons/games/GameIcon.tsx` — the supplied upgraded, wordmarked vector art (512 grid, no rasters). Rendered as an `<img>`, decorative (`alt=""`, `aria-hidden`).

| Prop | Type | Description |
|---|---|---|
| `game` | `'cashRider' \| 'cryptoCrush' \| 'gamewin' \| 'zuma'` | Which title (`Game['icon']`) |
| `size?` | `number` | Fixed square px, ignored when `fill` (default `96`) |
| `fill?` | `boolean` | Fill the parent with `object-fit: cover` (card cover art) |
| `className?` | `string` | Extra classes |

Usage: `<GameIcon game={game.icon} fill />` (card) · `<GameIcon game="zuma" size={150} />` (hero subject)

---

## game/

Game presentation in `src/components/game/`.

### GameCard

The conversion unit — one component, five variants, layered depth (category-gradient artwork → scrim → glass info panel → CTA). Fully keyboard operable (`role="button"`, `tabIndex=0`, Enter/Space activate); navigates to `/game/:id` on activation. Hover/press motion is transform/opacity only. Category gradient is injected via the `--art` CSS variable from `config/catalogue.ts`.

| Prop | Type | Description |
|---|---|---|
| `game` | `Game` | Game record |
| `variant?` | `CardVariant` | Layout (default `'grid'`) |

**`CardVariant`** = `'hero' | 'featured' | 'rail' | 'grid' | 'compact'`. The `hero` and `featured` variants additionally render the game's tagline; all variants show category, play count, rating and a Play CTA, plus Trending/New badges when set.

Usage: `<GameCard game={g} variant="rail" />`

> **GameCardSkeleton** (`GameCardSkeleton.tsx`) — loading placeholder sized to `GameCard` for zero layout shift. Prop: `variant?: CardVariant` (default `'grid'`).

### GameRail

Horizontal snap-scroll rail with a titled header and optional action link. Staggered reveal via Framer Motion; renders 4 skeleton slides while loading.

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Section heading (also the section `aria-label`) |
| `games` | `Game[]` | Cards to render |
| `loading?` | `boolean` | Show skeleton slides |
| `action?` | `{ label: string; onClick: () => void }` | Optional header action (e.g. "See all") |

Usage: `<GameRail title="Trending now" games={trending} action={{ label: 'See all', onClick: go }} />`

### GameGrid

Responsive 2-up (→ 3-up on wider stages) grid. Staggered reveal; renders `count` skeletons while loading.

| Prop | Type | Description |
|---|---|---|
| `games` | `Game[]` | Cards to render |
| `loading?` | `boolean` | Show skeletons |
| `count?` | `number` | Skeleton count while loading (default `6`) |

Usage: `<GameGrid games={games} loading={loading} count={6} />`

### HeroBanner

Layered hero composition — gradient plate → atmosphere rays/orb/rim → subject artwork → typographic block → single CTA. Self-contained (no raster network cost); the subject is the featured game's vector icon.

| Prop | Type | Description |
|---|---|---|
| `game` | `Game` | Featured game |
| `kicker?` | `string` | Overline label (default `'Continue Playing'`) |
| `onPlay?` | `() => void` | Play handler (defaults to navigating to `/game/:id`) |

Usage: `<HeroBanner game={featured} kicker="Featured" />`

---

## wheel/

### LuckyWheel

The daily-reward Lucky Wheel in `src/components/wheel/LuckyWheel.tsx`. **Outcome is decided by `prizeService.drawPrize()` first**; the animation is then targeted at the returned segment (fast spin-up → long cubic-bezier deceleration → micro-settle bounce into the pointer detent) — the spin never chooses the prize. Rendered inside a bare `Modal` (focus trap + Escape), announces its result via an `aria-live="assertive"` region, honours `prefers-reduced-motion` (instant reveal, no spin) and enforces a persisted once-per-day frequency cap (`canSpin` / `markSpun`). Wins fire `Confetti` (motion-gated) and a toast. Segments and weights come from `config/wheel.ts`; slice/landing geometry from `wheelGeometry.ts`.

| Prop | Type | Description |
|---|---|---|
| `open` | `boolean` | Visibility |
| `onClose` | `() => void` | Close handler (blocked while spinning) |

Usage: hosted globally by `WheelProvider`; open it with `useWheel().open()`. Direct: `<LuckyWheel open={open} onClose={close} />`

> **Confetti** (`Confetti.tsx`) — decorative win celebration burst; no props. Not rendered under reduced motion.

---

## layout/

App chrome in `src/components/layout/`.

### Header

App header — brand/title (left) · theme toggle + menu (right). Reads `useTheme` for the sun/moon toggle.

| Prop | Type | Description |
|---|---|---|
| `title?` | `string` | Screen title (shown when not `brand`) |
| `onMenu` | `() => void` | Opens the side menu |
| `brand?` | `boolean` | Show the `Wordmark` instead of a title (Home) |

Usage: `<Header title="Prizes" onMenu={openMenu} />`

### BottomNav

Persistent 4-tab bottom navigation (Home · Profile · Leaderboard · Prizes), preserved from production. Uses `NavLink`; the active tab fills its icon (solid variant) and slides a shared-layout glow. No props.

Usage: `<BottomNav />`

### SideMenu

Slide-in navigation drawer (React portal) preserving all production destinations (Home, Profile, Leaderboard, Prizes, Ts & Cs, FAQ) plus an Unsubscribe action that signs out (`useSession`) and returns to `/subscribe`. Escape-to-close, focus-first on open, `role="dialog"` + `aria-modal`.

| Prop | Type | Description |
|---|---|---|
| `open` | `boolean` | Visibility |
| `onClose` | `() => void` | Close handler |

Usage: `<SideMenu open={menuOpen} onClose={closeMenu} />`

### Wordmark

YoGamezPro wordmark reproduced in live text (no raster): `Yo` + `Gamez` (cyan accent) + `Pro`. Exposed as `role="img"` with `aria-label="YoGamezPro"`.

| Prop | Type | Description |
|---|---|---|
| `size?` | `number` | Font size in px (default `28`) |
| `plate?` | `boolean` | Render on a raised plate background |

Usage: `<Wordmark size={40} plate />`

### BrandedLoader

Branded orbital loader (replaces the production dotted spinner). `role="status"` with an SR-only label.

| Prop | Type | Description |
|---|---|---|
| `size?` | `number` | Diameter in px (default `64`) |
| `label?` | `string` | Accessible label (default `'Loading'`) |

Usage: `<BrandedLoader size={54} />`

### EconetLogo

Official Econet Wireless mark. Ships two supplied artwork variants (light-bg blue and dark-bg) swapped by theme via `[data-theme]` CSS so it stays legible on both canvases.

| Prop | Type | Description |
|---|---|---|
| `height?` | `number` | Height in px, width auto (default `26`) |

Usage: `<EconetLogo height={24} />`

### AuthTabs

Login | Subscribe switch preserved from the production auth screens. `role="tablist"`; navigates on select and slides a shared-layout ink underline.

| Prop | Type | Description |
|---|---|---|
| `active` | `'login' \| 'subscribe'` | Which tab is current |

Usage: `<AuthTabs active="subscribe" />`

---

## hooks/

Context providers in `src/hooks/`. All are mounted in `src/main.tsx` in the order Theme → Session → Toast → Wheel, and each hook throws if used outside its provider.

### useTheme

Theme state and toggle. Defaults to dark (dark-canvas-first), persists to `localStorage` (`ygp.theme`), and reflects the value as `data-theme` on `<html>`.

- **Provider:** `ThemeProvider`
- **Returns:** `{ theme: 'dark' | 'light'; toggle: () => void }`

Usage: `const { theme, toggle } = useTheme();`

### useToast

Transient toast notifications rendered in an `aria-live="polite"` region; auto-dismiss after ~3.8s. Tones map to an icon (info→bell, success→check, danger→shield).

- **Provider:** `ToastProvider`
- **Returns:** `{ push: (message: string, tone?: 'info' | 'success' | 'danger') => void }`

Usage: `push('You won Airtime $0.10!', 'success');`

### useSession

Session / subscription state for the demo, persisted to `localStorage` (`ygp.session`) so a refresh keeps you signed in. Mirrors the production journey (MSISDN → OTP → authenticated → subscribed); a real build swaps the setters for API-backed calls.

- **Provider:** `SessionProvider`
- **Returns:** `{ msisdn: string; plan: PlanTier | null; authenticated: boolean; setMsisdn(v): void; setPlan(p): void; authenticate(): void; signOut(): void }`

Usage: `const { setMsisdn, authenticate } = useSession();`

### useWheel

Global Lucky Wheel host and visibility controller. The `LuckyWheel` owns spin/physics/celebration/capping; this hook just controls visibility and exposes the frequency-cap gate (`canSpin` from `prizeService`).

- **Provider:** `WheelProvider` (also renders the `LuckyWheel`)
- **Returns:** `{ open: () => void; offerIfEligible: () => void; eligible: boolean }` — `open` shows it unconditionally; `offerIfEligible` shows it only if the daily cap allows.

Usage: `const { open, eligible } = useWheel(); … <Button onClick={open}>Spin</Button>`
