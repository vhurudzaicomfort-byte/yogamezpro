# YoGamezPro 2.0 — Style Guide

The design system for YoGamezPro 2.0. Everything visual derives from CSS custom properties in two files:

- **`src/styles/tokens.css`** — brand *primitives* (raw hex) plus theme-agnostic scales (spacing, radii, elevation, typography, motion). Components must **never** reference the raw primitives directly.
- **`src/styles/themes.css`** — *semantic* tokens (`--bg`, `--surface-1`, `--text`, `--brand`, …) mapped from the primitives, defined once for dark and once for light. Components reference **only** these.

This separation is what lets a single component render correctly on both canvases without any conditional styling.

---

## 1. Brand primitive tokens

Raw values from `tokens.css`. These are the palette; they are consumed through the semantic layer, not directly.

| Token | Hex | Role |
|---|---|---|
| `--econet-blue` | `#2b368a` | Core Econet navy; brand ink, light-theme brand |
| `--econet-blue-600` | `#232c76` | Darker navy shade |
| `--econet-blue-400` | `#3a46a8` | Lighter navy (gradients, ring gradient stop) |
| `--econet-cyan` | `#5bc2e7` | Signature cyan; dark-theme brand/accent |
| `--econet-cyan-300` | `#8ad6f0` | Light cyan tint |
| `--econet-cyan-600` | `#33a7d1` | Deeper cyan; light-theme accent |
| `--ink-deep` | `#00263a` | Deepest canvas navy (hero gradients) |
| `--ink-900` | `#001824` | Dark-theme page background |
| `--ink-800` | `#002b40` | Raised dark ink |
| `--signal-red` | `#e92230` | Econet red; primary commit CTA / danger (dark) |
| `--signal-red-600` | `#c8121f` | Deeper red; danger (light) |
| `--signal-orange` | `#f28028` | Reward / prize accent |
| `--signal-orange-300` | `#ffa458` | Light orange tint |
| `--neutral-050 … 900` | `#f6f9fc … #10161f` | Cool neutral ramp tuned to the navy canvas |
| `--gold-300` | `#ffe08a` | Light gold (trophies, wheel rim) |
| `--gold-500` | `#f5c344` | Gold accent (dark theme) |
| `--gold-700` | `#c9971f` | Deep gold (light theme) |

Derived brand layers also live in `tokens.css`: glows (`--glow-cyan`, `--glow-cyan-soft`), gradients (`--grad-hero`, `--grad-brand`, `--grad-reward`, `--grad-cyan-rim`) and the six per-category card gradients (`--cat-arcade`, `--cat-puzzle`, `--cat-racing`, `--cat-sports`, `--cat-action`, `--cat-strategy`).

---

## 2. Semantic tokens

Components reference these only. Both themes are defined in `themes.css`; dark is the default (`:root, [data-theme='dark']`).

### Dark theme (default)

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#001824` (`--ink-900`) | Page background |
| `--bg-elev` | radial gradient `#063a56 → --ink-900` | Elevated app backdrop (`#root`) |
| `--surface-1` | `rgba(255,255,255,.045)` | Lowest raised surface |
| `--surface-2` | `rgba(255,255,255,.075)` | Mid surface |
| `--surface-3` | `rgba(255,255,255,.11)` | Highest surface / track fills |
| `--surface-solid` | `#0f2233` | Opaque surface |
| `--surface-glass` | `rgba(6,22,34,.72)` | Frosted panels |
| `--border` | `rgba(255,255,255,.1)` | Hairline border |
| `--border-strong` | `rgba(255,255,255,.2)` | Emphasised border |
| `--text` | `#eaf3fb` | Primary text |
| `--text-muted` | `#9fb4c9` | Secondary text |
| `--text-dim` | `#6c8199` | Tertiary / disabled text |
| `--text-on-brand` | `#ffffff` | Text on brand/red fills |
| `--text-on-accent` | `#04222f` | Text on cyan/accent fills |
| `--brand` | `#5bc2e7` (cyan) | Brand foreground |
| `--brand-ink` | `#2b368a` (navy) | Brand-on-light ink |
| `--accent` | `#5bc2e7` (cyan) | Interactive accent |
| `--danger` | `#e92230` | Errors / destructive |
| `--reward` | `#f28028` | Prizes / rewards |
| `--gold` | `#f5c344` | Trophy / wheel gold |
| `--focus-ring` | cyan double-ring + glow | `:focus-visible` outline |

### Light theme (`[data-theme='light']`)

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#eef5fb` | Page background |
| `--bg-elev` | radial gradient `#d5ecf8 → #eef5fb` | Elevated app backdrop |
| `--surface-1` | `#ffffff` | Lowest raised surface |
| `--surface-2` | `#f3f7fc` | Mid surface |
| `--surface-3` | `#e7eef7` | Highest surface / track fills |
| `--surface-solid` | `#ffffff` | Opaque surface |
| `--surface-glass` | `rgba(255,255,255,.82)` | Frosted panels |
| `--border` | `rgba(11,37,63,.12)` | Hairline border |
| `--border-strong` | `rgba(11,37,63,.24)` | Emphasised border |
| `--text` | `#0b2540` | Primary text |
| `--text-muted` | `#3f5872` | Secondary text |
| `--text-dim` | `#6a7f97` | Tertiary / disabled text |
| `--text-on-brand` | `#ffffff` | Text on brand/red fills |
| `--text-on-accent` | `#04222f` | Text on cyan/accent fills |
| `--brand` | `#2b368a` (navy) | Brand foreground |
| `--brand-ink` | `#2b368a` (navy) | Brand ink |
| `--accent` | `#33a7d1` (cyan-600) | Interactive accent |
| `--danger` | `#c8121f` | Errors / destructive |
| `--reward` | `#f28028` | Prizes / rewards |
| `--gold` | `#c9971f` | Trophy / gold |
| `--focus-ring` | navy double-ring + glow | `:focus-visible` outline |

---

## 3. WCAG AA contrast

Ratios below are computed with the WCAG 2.1 relative-luminance formula against the concrete resolved colours. Thresholds: **4.5:1** for normal body text, **3:1** for large text (≥ 24px, or ≥ 18.66px bold) and non-text UI components.

### Dark theme

| Foreground | Background | Ratio | Body (4.5) | Large/UI (3.0) |
|---|---|---:|:---:|:---:|
| `--text` `#eaf3fb` | `--bg` `#001824` | 16.18 | PASS | PASS |
| `--text-muted` `#9fb4c9` | `--bg` `#001824` | 8.52 | PASS | PASS |
| `--brand` cyan `#5bc2e7` | `--bg` `#001824` | 8.92 | PASS | PASS |
| `--text-dim` `#6c8199` | `--bg` `#001824` | 4.53 | PASS (just clears) | PASS |
| white `#ffffff` | signal-red `#e92230` | 4.43 | **FAIL** (borderline, 0.07 short) | PASS |
| `--text-on-accent` `#04222f` | econet-cyan `#5bc2e7` | 8.09 | PASS | PASS |

### Light theme

| Foreground | Background | Ratio | Body (4.5) | Large/UI (3.0) |
|---|---|---:|:---:|:---:|
| `--text` `#0b2540` | `--bg` `#eef5fb` | 14.11 | PASS | PASS |
| `--text-muted` `#3f5872` | `--bg` `#eef5fb` | 6.70 | PASS | PASS |
| `--brand` navy `#2b368a` | `--bg` `#eef5fb` | 9.56 | PASS | PASS |
| `--text-dim` `#6a7f97` | `--bg` `#eef5fb` | 3.75 | **FAIL** | PASS |
| white `#ffffff` | signal-red-600 `#c8121f` (light `--danger`) | 5.90 | PASS | PASS |
| `--text-on-accent` `#04222f` | econet-cyan `#5bc2e7` | 8.09 | PASS | PASS |
| `--accent` cyan-600 `#33a7d1` | `--bg` `#eef5fb` | 2.52 | **FAIL** | **FAIL** |

### Notes — read these honestly

- **White on Econet red (`#e92230`) is 4.43:1 — it does not quite clear the 4.5:1 body threshold** (it is 0.07 short). This is the preserved production brand CTA colour, so it is retained. It is safe for the large/bold button labels it is actually used on (which only need 3:1), but it should not be used for small red-background body text. The light theme's deeper red (`#c8121f`) clears body text comfortably at 5.90:1 and is the danger token there.
- **`--text-dim` is a tertiary/disabled tone**, not body text. It clears 3:1 in both themes (dark 4.53, light 3.75) but only the dark value clears the 4.5:1 body threshold; use it for de-emphasised, non-essential, or large text only.
- **Light `--accent` (cyan-600 `#33a7d1`) at 2.52:1 must not be used as text or as an essential UI outline on the page background.** It is intended for fills, large graphic accents (progress arcs, chips with their own solid fill) and decorative use — pair text with `--text-on-accent` on top of an accent fill (8.09:1), not accent-coloured text on the page.

---

## 4. Typography

Two Fontsource variable families, declared in `tokens.css`:

- **Display** — `--font-display`: Fredoka Variable (rounded, heavy) for headings, the wordmark and display numerals.
- **UI** — `--font-ui`: Manrope Variable for body and controls.
- **Numerals** — `.num` utility applies `font-variant-numeric: tabular-nums` for aligned scores and prices.

Weights: `--fw-regular` 400 · `--fw-medium` 500 · `--fw-semibold` 600 · `--fw-bold` 700.

### Fluid type scale

All heading sizes use `clamp()` to scale between a ~360px and ~1024px viewport (min · preferred · max).

| Token | `clamp()` | Range |
|---|---|---|
| `--fs-display` | `clamp(2.75rem, 1.9rem + 4.2vw, 4.5rem)` | 44 → 72px |
| `--fs-h1` | `clamp(1.9rem, 1.5rem + 2vw, 2.6rem)` | ~30 → 42px |
| `--fs-h2` | `clamp(1.45rem, 1.2rem + 1.2vw, 1.9rem)` | ~23 → 30px |
| `--fs-h3` | `clamp(1.15rem, 1rem + 0.7vw, 1.4rem)` | ~18 → 22px |
| `--fs-body-lg` | `clamp(1.05rem, 1rem + 0.3vw, 1.2rem)` | ~17 → 19px |
| `--fs-body` | `1rem` | 16px |
| `--fs-caption` | `0.8125rem` | 13px |
| `--fs-overline` | `0.6875rem` | 11px |

Line heights: `--lh-tight` 1.05 · `--lh-heading` 1.15 · `--lh-body` 1.55. Tracking: `--tr-tight` -0.02em (headings) · `--tr-wide` 0.14em (overlines).

Utility classes in `globals.css`: `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-body-lg`, `.t-caption`, `.t-overline`, `.num`.

---

## 5. Spacing

4pt base scale (`--sp-*`, in `rem`):

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--sp-1` | 0.25rem (4px) | | `--sp-6` | 1.5rem (24px) |
| `--sp-2` | 0.5rem (8px) | | `--sp-8` | 2rem (32px) |
| `--sp-3` | 0.75rem (12px) | | `--sp-10` | 2.5rem (40px) |
| `--sp-4` | 1rem (16px) | | `--sp-12` | 3rem (48px) |
| `--sp-5` | 1.25rem (20px) | | `--sp-16` | 4rem (64px) |
| | | | `--sp-20` | 5rem (80px) |

Layout tokens: `--app-max` 480px (mobile-first stage, capped on desktop), `--header-h` 60px, `--bottomnav-h` 68px. Z-index scale: `--z-nav` 40 · `--z-drawer` 60 · `--z-modal` 80 · `--z-toast` 100.

---

## 6. Radii

| Token | Value |
|---|---|
| `--r-xs` | 6px |
| `--r-sm` | 10px |
| `--r-md` | 14px |
| `--r-lg` | 20px |
| `--r-xl` | 28px |
| `--r-pill` | 999px |

---

## 7. Elevation

Shadow scale plus theme-specific composite shadows.

| Token | Value |
|---|---|
| `--shadow-1` | `0 1px 2px rgba(0,0,0,.3)` |
| `--shadow-2` | `0 6px 16px rgba(0,0,0,.35)` |
| `--shadow-3` | `0 14px 40px rgba(0,0,0,.45)` |
| `--card-hover-shadow` | dark: deep drop + cyan glow · light: soft blue-grey drop |
| `--glow-cyan` / `--glow-cyan-soft` | cyan focus/hover glows (from `tokens.css`) |

---

## 8. Motion

### Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150ms | Micro-interactions, exits |
| `--dur-base` | 250ms | Standard enter transitions |
| `--dur-slow` | 400ms | Larger reveals |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default ease-out |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric moves |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot (modals) |

These are mirrored for Framer Motion in `src/animations/variants.ts` (`DUR`, `EASE_OUT`, `EASE_SPRING`) so CSS and JS animation stay in lockstep. Shared variants there cover page transitions, staggered list/rail reveals, modal, backdrop and drawer.

### Rules

- **Animate transform and opacity only** — everything hover/press/reveal is GPU-composited; no animating layout properties.
- **`prefers-reduced-motion` is honoured globally.** `globals.css` has a media-query kill-switch that reduces all animation/transition durations to ~0 and disables smooth scroll. Component logic also branches on it — most importantly the Lucky Wheel, which skips the spin entirely and reveals its (already-decided) outcome instantly.
- **Focus is always visible.** `:focus-visible` renders `--focus-ring`; `:focus` (mouse) is suppressed.

---

## 9. Theming

`useTheme` (`src/hooks/useTheme.tsx`) owns the theme. It:

1. Reads a saved preference from `localStorage` (`ygp.theme`), otherwise defaults to **dark** (dark-canvas-first).
2. Writes the current value to `document.documentElement` as `data-theme="dark|light"` and persists it.
3. Exposes `{ theme, toggle }`; the header's sun/moon button calls `toggle`.

Because every component reads only semantic tokens, and both token sets are keyed off `[data-theme]`, switching the attribute re-themes the entire app instantly with no component re-render logic. `color-scheme` is set per theme so native form controls and scrollbars match. The Econet logo additionally swaps its light/dark artwork via `[data-theme]` selectors in `globals.css`.
