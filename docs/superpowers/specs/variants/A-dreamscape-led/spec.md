# Base A — Dreamscape-Led (Fusion)

## Concept & Mood

Variant 4's immersive, drifting-light world is the foundation — the page breathes like a living field, content panels float in warm haze rather than sitting on a surface, and the experience reads as atmosphere first, website second. Layered over this, Variant 2 contributes a single focused act of theatrical drama: a warm chocolate-gold spotlight pools on the name "Jacques" from above, deepening the surrounding shadows into rich walnut dark, so the ambient softness gains a cinematic axis. The result is old-recital-hall warmth — candlelight through frosted glass — reverent and premium without weight.

## Begin-Listening Moment

The visitor arrives on a near-still dark field of deep chocolate-black; a soft warm glow breathes at center and a narrow spotlight cone descends silently from above to illuminate the name. "Jacques" sits in large tracked serif, lit by that warm beam, with a hairline amber divider beneath and "Begin listening" in whisper-weight spaced caps below that. On click: the name dissolves (opacity + blur CSS transition over 1.2s) into the field which brightens once; the persistent bottom player slides up from below; the page becomes scrollable.

## Palette

| Role | Hex |
|---|---|
| Background deep base | `#0f0805` |
| Background warm shadow | `#160d08` |
| Background mid shadow | `#241510` |
| Warm spotlight / amber-gold light | `#c8893a` |
| Hot spotlight center | `#e8b060` |
| Aged amber glow (ambient) | `#a06828` |
| Glass panel surface | `rgba(255, 235, 210, 0.04)` |
| Glass panel surface hover | `rgba(255, 235, 210, 0.08)` |
| Glass border | `rgba(200, 160, 100, 0.12)` |
| Text primary | `#f0e8dc` |
| Text secondary | `#8a7a68` |
| Wood dark grain | `#1e1008` |
| Wood mid grain | `#3c2010` |
| Wood lit grain | `#6c3d18` |

## Typography

- **Display / "Jacques":** `Georgia, 'Times New Roman', serif` — large (7–8 vw), letter-spacing `0.25em`, weight 400; not bold, just present; text-shadow warm amber glow
- **Section headings:** same serif, 1.8–2.2 rem, letter-spacing `0.10em`, slightly amber-tinged
- **Nav / labels / "Begin listening":** `system-ui, Arial, sans-serif` — all-caps, tracked wide (`0.26em`), weight 300, whisper-weight
- **Body / captions / track meta:** same sans, normal case, weight 400, `var(--text-2)`, line-height 1.8
- **Track titles in Library:** serif italic

## Frosted Glass + Wood Treatment

**Glass panels:** `backdrop-filter: blur(18px) saturate(1.3)` over a warm-tinted near-transparent surface (`rgba(255, 235, 210, 0.04)`). Border: `1px solid rgba(200, 160, 100, 0.12)` — hairline edge in aged gold rather than cool white. Inner highlight: `inset 0 1px 0 rgba(255, 220, 160, 0.06)`. On hover, surface brightens fractionally. No drop shadows; depth comes from the surrounding chocolate darkness.

**Wood accent:** A 4px vertical pillar runs left edge full viewport height — CSS `linear-gradient` simulating grain in warm browns (`#1e1008 → #3c2010 → #6c3d18 → #3c2010 → #1e1008`), fading to transparent at top and bottom. Reappears as a 3px left-border accent on Library track cards.

## Scroll / Motion Feel

Two ambient radial gradient layers drift on a slow ~14s loop — both warm now (amber-gold and deep amber), offset so they never fully align, giving a breathing candlelit quality. Panels fade in from slight vertical offset (translateY 24px → 0, opacity 0 → 1, 0.7s ease) as sections enter view. Scroll is smooth and unhurried. Everything reads as a single continuous warm dream.

## Section Interpretations

| Section | Interpretation |
|---|---|
| **Hero** | Chocolate-black field + descending spotlight cone + name in warm amber light; dissolves into field on click |
| **About** | Frosted warm-glass panel, 2-column; intimate bio like liner notes; warm amber bleed from left |
| **Library** | Frosted track cards in a 3-column grid; wood-grain left-border accent; serif italic track titles; play glyphs amber on hover |
| **Live** | Minimal glass panel; venue names in serif, dates in sans; amber rule underlines each date row |
| **Contact** | Two sparse lines deep in the warm haze; mailto in amber; note left on a piano bench |
