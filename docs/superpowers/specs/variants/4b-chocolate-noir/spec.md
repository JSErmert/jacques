# Direction 4b — Chocolate Noir

> Variant 4 (Dreamscape Ambient) atmosphere + Variant 2 (Concert-Hall Noir) drama, repalettized to deep chocolate/vintage warmth.

---

## Concept & Mood

A concert hall in the last moment before the lights drop: deep chocolate shadow fills the room, and a single amber-candlelight beam pools on the name "Jacques" as if rising from the floor of a recital stage. The ambient field is not cool and cosmic (Variant 4's indigo is gone) — it breathes warm, like old wood and candlewax, a hall that has absorbed a century of performances. Content panels float in this chocolate haze: modern frosted glass given a vintage soul, classical heritage expressed through a contemporary dreamlike form.

---

## Begin-Listening Moment

The visitor arrives on a near-total chocolate-black field — warmer than black, darker than brown — with a single slow amber glow blooming at center, as if a spotlight has been lowering for the last sixty seconds before the pianist walks on. "Jacques" sits in the middle, serif, luminous against the deep shadow, its letterforms touched by warm candlelight. Beneath it: "Begin listening" in fine spaced caps, a faint amber underline the only call to action. On click: the name dissolves into the ambient warmth (opacity + blur fade, 1.2s), the chocolate field pulses once with expanded amber radial light, and the persistent bottom player materializes from below. The rest of the page becomes scrollable. This is a threshold — not a button press, but a permission to enter.

---

## Palette

| Role | Hex | Note |
|---|---|---|
| Background base | `#0f0805` | Deep chocolate-black; the hall before the lights |
| Background mid | `#160d08` | Lifted chocolate; the floor, the walls |
| Background surface | `#241510` | Warm near-black; panel depth reference |
| Warm amber / spotlight | `#c8873a` | The single light source; candlelight, not neon |
| Amber hot-center | `#e8a84a` | Spotlight hotspot; used sparingly at center glows |
| Aged gold accent | `#b07838` | Track titles on hover, section headers — tarnished, not shiny |
| Glass panel surface | `rgba(255, 220, 160, 0.04)` | Warm-tinted frost, not cool white |
| Glass panel hover | `rgba(255, 220, 160, 0.07)` | Fractionally warmer on hover |
| Glass border | `rgba(255, 200, 120, 0.10)` | Amber hairline edge |
| Text primary | `#f0ece4` | Warm off-white; slightly ivory |
| Text secondary | `#8a7a68` | Warm muted brown-gray |
| Wood dark (grain shadow) | `#1e0e06` | Deep reclaimed wood; near-black |
| Wood mid (grain body) | `#3c1e0a` | Rich chocolate mahogany |
| Wood lit (grain highlight) | `#6e3c18` | Where the candle beam catches the edge |

---

## Typography

- **Display / name "Jacques"**: `Georgia, 'Times New Roman', serif` — large, letter-spacing `0.24em`, weight 400 (not bold — present, not shouting); rendered at ~7.5vw in hero. Section headings at 1.9–2.2rem, letter-spacing `0.10em`, subdued amber tint.
- **Body / nav / labels / "Begin listening"**: `system-ui, Arial, sans-serif` — all caps where labeling, tracked wide (`0.22–0.28em`), weight 300–400; whisper-weight but legible.
- **Track titles**: serif italic inside cards; amber underline on hover.
- Hero name dissolves via `opacity 1→0, filter blur(0→16px)` over 1.2s on Begin Listening click.

---

## Frosted Glass + Wood Treatment

**Glass panels**: `backdrop-filter: blur(18px) saturate(1.3)` with a warm-tinted near-transparent surface (`rgba(255, 220, 160, 0.04)`). Border: `1px solid rgba(255, 200, 120, 0.10)` — a faint amber hairline, as if the panel edge is catching candle glow. Panels have `border-radius: 16–20px` and a faint inner warm shadow. On hover, panel warms fractionally.

**Wood accent pillar**: 4px wide, fixed left edge, full viewport height. CSS linear-gradient banding simulates mahogany grain (`#1e0e06 → #3c1e0a → #6e3c18 → #3c1e0a → #1e0e06`). Fades into the ambient haze at top and bottom via `mask-image` transparent gradient. Reappears as a 3px left-border accent on each track card — the same wood column, present throughout as an architectural constant.

---

## Scroll / Motion Feel

Two slow-drifting radial gradient layers on ~14s and ~18s CSS keyframe loops, both warm (amber/brown), offset so they never fully align — no cool indigo anywhere. Panels fade in from slight vertical offset (`translateY 24px → 0; opacity 0→1; 0.7s ease`) on scroll-enter. `scroll-behavior: smooth`. The whole experience reads as a single continuous warm dream, a hall you are moving through rather than a website you are scrolling.

---

## Section Interpretations

| Section | Direction Interpretation |
|---|---|
| **Hero** | Deep chocolate shadow + one slow amber glow blooming at center; "Jacques" letterforms catching the beam; stillness before first note |
| **About** | Frosted panel, wide two-column layout, a warm amber radial bleed left-of-center — intimate; bio reads like liner notes on an old LP sleeve |
| **Library** | Frosted track cards in a 3-column grid, each with the mahogany wood-grain left-border accent; serif italic track titles; amber play-glow on hover |
| **Live** | Minimal list in a single tall glass panel; venue names in serif tracked wide; dates in sans; amber rule underlines each entry; field warms further, deeper in the hall |
| **Contact** | Two sparse centered lines deep in the chocolate haze — a card left on the piano bench, available only to those who stayed till the end |
