# YoGamezPro — Old Portal Audit

> Written before any component code. Sources: the 11 production screens in
> `/assets/old-ui/` (rendered from the supplied 591×1280 SVGs), the supplied
> logo kit, the Lucky Wheel reference art, and the client product brief.
> Purpose: capture the business logic, copy, data and user journeys that the
> 2.0 rebuild must preserve — you cannot preserve logic you have not read.

## Product summary

**YoGamezPro** is Econet Wireless Zimbabwe's premium HTML5 mobile-gaming VAS.
Subscribers get unlimited instant-play access to a catalogue of casual/arcade
games, compete on Daily & Weekly leaderboards, earn airtime/cash prizes, and
are onboarded through Econet's MSISDN + OTP subscription flow. Billing is in
**ZiG (Zimbabwe Gold)**; the dialing code is **+263**.

## Global patterns (every logged-in screen)

- **Header**: round brand/section glyph (left) · screen title · outlined
  **☰ Menu** pill (right) that opens the side drawer.
- **Bottom nav** (4 tabs): **Home · Profile · Leaderboard · Prizes**.
  *(The Leaderboard screen mislabels tab 2 as "Score" — an inconsistency; the
  rebuild standardises on Profile everywhere.)*
- **Primary CTA colour**: Econet **red** (`#E92230`) for commit actions
  (Login, Subscribe, Confirm, Continue).
- **Canvas today**: a light cyan radial "sunburst" gradient on every screen.
  → 2.0 inverts this to a **dark, `--ink-deep` gaming canvas** (brief §3).
- Persistent footer legal line on auth screens: *"By clicking subscribe, you
  have read, understood and agree to be bound by the YoGamezPro service's
  Terms & Conditions and FAQ's"*, with the **Econet Wireless** logo above it.

---

## Screen-by-screen

### 1. Loading / Splash (`Loading.svg`, `Loading-1.svg`)
- **Regions**: centered YoGamezPro glass-plate wordmark; circular dotted
  spinner low-centre.
- **Logic**: boot sequence + timing before the portal mounts.
- **Exit**: auto-advance to Home (subscribed) or Subscribe/Login (not).
- **Elevate**: branded animated loader → skeleton handoff, no dead spinner.

### 2. Login (`Login.svg`)
- **Regions**: wordmark · **Login | Subscribe** segmented tabs (underline
  indicator) · `+263` phone input placeholder "ENTER YOUR PHONE NUMBER" ·
  red **LOGIN** button · Econet logo + legal footer.
- **Data**: MSISDN only. **Validation**: Zimbabwe mobile number after +263.
- **Exit**: submit → OTP Verification.

### 3. Subscribe (`Subscribe.svg`)
- **Regions**: wordmark · Login/**Subscribe** tabs · `+263` phone input ·
  **SELECT PACKAGE** heading · three plan rows · red **SUBSCRIBE** · Econet +
  legal.
- **Plans (preserve exactly)**:
  | Plan | Price |
  |---|---|
  | Daily | ZiG 0.84 |
  | Weekly | ZiG 5.88 |
  | Monthly | ZiG 10.09 |
- **Logic**: pick one package (single-select) + MSISDN → subscribe → OTP.
- **Exit**: submit → OTP Verification → Authentication success.

### 4. OTP Verification (`OTP Verification.svg`)
- **Copy**: "OTP Verification" · "We have sent the one time pin to
  **+263XXXXXXXXX** via SMS."
- **Input**: **4** segmented digit boxes (sample shows `8 5 2 _`, 3rd active).
- **Timer**: "Time remaining: **58 seconds**" → 60s countdown.
- **CTA**: red **CONFIRM**.
- **Recovery**: "LOST PIN? / HAVEN'T RECEIVED PIN YET? / PIN EXPIRED?" →
  **RETRY HERE** (resend).
- **Exit**: correct OTP → Authentication.
- **Elevate**: paste support, `autocomplete="one-time-code"`, numeric inputmode,
  autofocus/advance, visible countdown ring.

### 5. Authentication (`Authentication.svg`)
- **Regions**: red ring + check glyph · **Success!** · "Congratulations! You
  have been successfully authenticated" · red **CONTINUE**.
- **Logic**: terminal state of Econet subscriber auth / header enrichment.
- **Exit**: Continue → Home. *(Rebuild also designs the failure path.)*

### 6. Home (`Home.svg`)
- **Regions**: header (Home · Menu) · **Continue Playing** hero banner
  ("And stand a chance to win yo share of prizes!" · **Play now!** · game coin
  art · **More Games** chip · ▶ launch) · 2×2 **game grid** · bottom nav.
- **Games shown**: Gamewin, Zuma, Cash Rider, CrytoCrush *(sic — spelled
  "CrytoCrush" on the card; correct brand is CryptoCrush)*. Each card = icon +
  title + **▶ Play Now** button.
- **Elevate**: hero banner, Featured / Trending / Recently Played / Recommended
  rails with snap-scroll + skeletons (brief §5).
- **Exit**: card/Play → Game Detail / launch.

### 7. Side Menu (`Side Menu.svg`)
- **Header**: wordmark + "Games Portal".
- **Destinations**: Home Page · Profile · Leaderboard · Prizes · **Ts & Cs** ·
  **FAQ's** · **Unsubscribe** (destructive) · ✕ close.
- **Footer**: "Copyright © 2024 YoGamezPro".
- **Elevate**: drawer slide, active state, custom iconography.

### 8. Profile (`Profile.svg`)
- **Regions**: avatar · **Hi Player** · "Congratulations on your new score!" ·
  3-star flourish over **User Score:** panel · "Beat the best score & become the
  highest!" · trophy + **Best Score to Beat:** panel · **Continue Playing**.
- **Data**: gamer name, current user score, best score to beat.
- **Elevate**: badge/achievement system, milestone progress rings, real stats.

### 9. Leaderboard (`Leaderboard.svg`)
- **Stat pills (2×2)**: Your Daily Score `532` · Your Monthly Score `56555` ·
  Your Daily Position `25` · Your Monthly Position `125`.
- **Table**: columns **Position · Daily Score · Monthly Score**; rows 1–10;
  **medals** on ranks 1/2/3 (gold/silver/bronze) + avatars; **Continue
  Playing** CTA.
- **Note**: old UI ranks Daily + **Monthly**; the brief mandates **Daily +
  Weekly** tabs. Rebuild ships **Daily + Weekly** tabs (product vision) and
  keeps the score/position stat block.
- **Elevate**: podium for top 3, own-rank pinning, tab transition, live pulse.

### 10. Prizes (`Prizes.svg`)
- **Copy**: **WIN YOUR SHARE** · "ZiG is the Grand Cash Prize! Enjoy Daily
  Airtime Rewards!"
- **Two prize tables (preserve values)**:
  | Rank | Daily Airtime | Monthly Cash |
  |---|---|---|
  | 1 | ZiG 50 | ZiG 500 |
  | 2 | ZiG 45 | ZiG 450 |
  | 3 | ZiG 40 | ZiG 400 |
  | 4 | ZiG 35 | ZiG 350 |
  | 5 | ZiG 30 | ZiG 300 |
  | 6 | ZiG 25 | ZiG 250 |
  | 7 | ZiG 20 | ZiG 200 |
  | 8 | ZiG 15 | ZiG 150 |
  | 9 | ZiG 10 | ZiG 100 |
  | 10 | ZiG 5 | ZiG 50 |
- **Art**: exploding gift box. **CTA**: **Play to Win Big**.
- **Elevate**: reward cards, claim flow, celebration state.

### 11. Lucky Wheel (reference art `wheel.svg`, `Lucky Wheel Banner.svg`)
- **Reference**: 8-segment wheel, alternating red/blue, **gold metallic bolted
  rim**, central round **SPIN** button, gold pointer/detent on the right edge.
- **Live prizes (brief §8)**: Airtime **$0.10**, Airtime **$0.20** — plus
  "no win" segments. Data-driven config; **prize decided by service first**,
  animation targeted to the result.

---

## Games catalogue (from supplied logos)

| Game | Silhouette to preserve | Category |
|---|---|---|
| **Cash Rider** | Helmeted rider on an orange motorbike, "CASH RIDER" | Racing / Endless Runner |
| **CryptoCrush** | Gold Bitcoin-stamped coin, "CRYPTO CRUSH" | Puzzle / Match |
| **Gamewin** | Gold trophy + star + laurel on a ribbon banner | Arcade / Casual |
| **Zuma** | "ZUMA" carved into a tan wooden plank sign | Arcade / Shooter |

## Brand wordmark
`Yo` (ink) · `Gamez` (**cyan `#5BC2E7`**) · `Pro` (ink) — rounded, heavy,
friendly geometric display face. Rebuild pairs a rounded display face
(**Fredoka**) for headings/scores with a legible UI face (**Manrope**, tabular
figures for scores/leaderboard).

## What the SVGs miss (cross-referenced against product brief)
Empty states, error/offline states, toasts, search & filters, game-detail
shell, achievements, subscription confirmation, and reduced-motion behaviour —
all undefined today and **designed fresh** in 2.0 (brief §5, §12).

## Preserve / Elevate contract
**Preserve**: MSISDN+OTP auth, 4-digit OTP + 60s resend, three ZiG plans,
subscription→OTP→auth→home journey, Daily/Weekly ranking, prize ladders, the
four launch titles, Ts&Cs/FAQ/Unsubscribe destinations, ZiG/+263 conventions.
**Elevate**: everything visual, motion, a11y, performance, and the wheel.
