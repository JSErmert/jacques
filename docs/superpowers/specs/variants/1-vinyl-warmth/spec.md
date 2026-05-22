# Direction 1 — Vinyl Warmth

## Concept & Mood
This direction treats Jacques's music like a rare vinyl pressing discovered in a warm-lit record shop: tactile, reverent, and intimate. The site feels as though it exists in amber — not cold digital space — evoking the scratch and weight of an analog medium, a saxophonist in a candlelit room, and the hushed ceremony of lowering a needle onto wax. Every surface suggests something handmade and worth sitting with.

---

## Begin-Listening Moment
The hero sits in near-darkness, centered. The name "Jacques" is set large in a warm-cream serif, slightly letter-spaced — not a logo, a proper noun. Below it, "Begin listening" appears in a smaller italic, barely lit, like a stage direction. A thin amber underline pulses slowly beneath it (CSS keyframe breath, not a progress bar). When clicked, a faint vinyl crackle sound cue plays (or is implied via a brief UI micro-flash), and the persistent bottom player materializes with a warm-glow border. The illusion: a needle has just dropped.

---

## Palette

| Role | Name | Hex |
|---|---|---|
| Background base | Umber Black | `#1A1008` |
| Surface warm dark | Deep Walnut | `#231508` |
| Panel / frosted glass tint | Amber Haze | `#3D2208` (at ~30% opacity, blur behind) |
| Primary text | Aged Cream | `#EDE0C4` |
| Secondary text | Warm Dusk | `#A08060` |
| Accent / glow | Amber Ember | `#C07830` |
| Wood grain highlight | Pale Grain | `#8B6040` |
| Player bar background | Charred Wood | `#0F0A04` |

---

## Typography

- **Display (Jacques name, section headers):** `Georgia, 'Times New Roman', serif` — set at large sizes with generous tracking (`letter-spacing: 0.12em`), weight normal, never bold. Colored in Aged Cream.
- **Body / UI labels:** `system-ui, Arial, sans-serif` — small, light weight (300–400), Warm Dusk tone. Keeps the prose readable without competing with the serif gravitas.
- **"Begin listening" CTA:** Georgia italic, 1.1rem, Amber Ember color, softly underlined.
- **Track titles:** Georgia regular, slightly larger than body, Aged Cream.
- **Metadata (duration, year, venue):** system-ui, 0.75rem, Warm Dusk, uppercase with wide tracking.

---

## Frosted-Glass + Wood Treatment

**Frosted glass:** Panels use `background: rgba(61, 34, 8, 0.30)` with `backdrop-filter: blur(18px)` and a `1px solid rgba(192, 120, 48, 0.18)` border. The result is a warm amber-tinted scrim — not the cold blue-grey of iOS glass, but something closer to candlelight through a dusty window. On hover, the border opacity lifts slightly.

**Wood accent (sculpture pillar):** A vertical strip, ~8–12px wide, runs down the left edge of content sections. It is rendered as a CSS linear-gradient cycling between `#5C3A18`, `#8B6040`, `#3D2010`, `#7A5030` — coarse grain, not smooth. On the hero, a wider wood-grain block anchors the bottom-left corner, creating a physical "stage floor" reference.

---

## Scroll & Motion Feel

Motion is slow and weighted. Sections fade in with a long `opacity` + `translateY(20px)` transition (800ms ease-out) triggered by IntersectionObserver — each panel arrives like a stage light coming up. The scroll itself is native (no JS hijacking). The bottom player slides up once on first "Begin listening" click and stays pinned. No parallax tricks; depth comes from layered blur and glow, not movement speed differentials.

---

## Section Interpretations

| Section | Vinyl Warmth Interpretation |
|---|---|
| **Hero** | Near-blackout stage; "Jacques" in warm cream on silence; the begin-listening click is the needle drop. |
| **About** | A frosted amber panel set beside the wood pillar — reads like liner notes on the inside of an album sleeve. |
| **Library** | Track cards arranged like record sleeves in a crate: each a frosted amber tile with track title in serif, metadata below in small caps, a warm play-circle button. Stream-only tracks have a subtle "unreleased" ribbon. |
| **Live** | Venue listings feel like a hand-typed tour bill — Georgia caps, amber ruling lines between dates, The Coyote in Carlsbad Village listed with quiet ceremony. |
| **Contact** | Minimal — a single serif prompt ("Get in touch"), an understated form, warm ember submit button. Feels like leaving a note at the stage door. |
