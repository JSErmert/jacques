# A2 — Salon

## Concept & Mood

A private late-night jazz salon — the feeling of arriving after closing time, finding the host still at the piano, a glass of something amber on the lid. Everything is close. The layout is asymmetric and left-weighted: the name is not centered but anchored left-of-center, surrounded by generous editorial darkness rather than stage space. This is a *room*, not a theatre. The editorial voice — mixed serif display with a crisp sans body — reads like a record label's sleeve notes or a late-night magazine spread printed on warm stock. Intimacy over ceremony.

## Begin-Listening Moment

The visitor lands on a near-still deep chocolate field. A warm ambient bloom sits off-left, low, behind where the name will settle. "Jacques" appears large in the left-weighted column — not centered, roughly at 30–35% from left — in warm amber-lit serif, with a salon-style vertical rule to its right separating it from a sparse byline column. Below the name: a thin amber hairline, then "Begin listening" in whisper-weight tracked sans, left-aligned. The asymmetry reads immediately as intentional — editorial, not broken. On click: the name dissolves as in the base (opacity + blur); the field gains a brief warm exhale; the player slides up. The right column holds three sparse lines — genre, city, year — in small tracked sans, mid-shadow color, the way liner notes place marginal data.

## Palette

| Role | Hex |
|---|---|
| Background deep base | `#0f0805` |
| Background warm shadow | `#160d08` |
| Background mid shadow | `#241510` |
| Warm spotlight / amber-gold | `#c8893a` |
| Hot spotlight center | `#e8b060` |
| Aged amber glow (ambient) | `#a06828` |
| Glass panel surface | `rgba(255, 235, 210, 0.04)` |
| Glass panel surface hover | `rgba(255, 235, 210, 0.08)` |
| Glass border | `rgba(200, 160, 100, 0.12)` |
| Glass inner highlight | `rgba(255, 220, 160, 0.06)` |
| Text primary | `#f0e8dc` |
| Text secondary | `#8a7a68` |
| Text tertiary / marginal | `rgba(138, 122, 104, 0.45)` |
| Wood dark grain | `#1e1008` |
| Wood mid grain | `#3c2010` |
| Wood lit grain | `#6c3d18` |

Identical chocolate base as A. The differentiation is layout and typographic register, not hue.

## Typography

- **Display / "Jacques":** `Georgia, 'Times New Roman', serif` — large (9–10 vw), letter-spacing `0.18em`, weight 400; slightly less tracked than base A (closer, more intimate); text-shadow warm amber glow
- **Section headings:** serif, 1.6–1.9 rem, minimal tracking, weight 400
- **Editorial byline / marginal data:** `system-ui, Arial, sans-serif` — tracked caps (`0.20–0.26em`), weight 300, very small (9–10px); this is the distinct Salon voice — the sans appears as labels, bylines, dates, metadata, never as body text
- **Body paragraphs (About):** sans, 14px, normal weight, `var(--text-2)`, line-height 1.95 — readable but recessive; the serif headlines carry the warmth
- **Track titles in Library:** serif italic, as in base A
- **Track metadata:** sans, 11px, `var(--text-2)` — the editorial register's label layer

## Frosted Glass + Wood Treatment

Identical specification to base A — `backdrop-filter: blur(18px) saturate(1.3)`, hairline amber border, `inset 0 1px 0 rgba(255, 220, 160, 0.06)` inner highlight. The editorial differentiation is in *layout and scale of panels* rather than glass treatment. Library cards vary in size (one spans two columns, one is taller) so the frosted surface creates a mosaic rather than a grid — more magazine spread than discography list. The 4px wood pillar remains on the left edge. A second thin wood rule (1px) appears as a vertical divider in the hero between the name column and the byline column.

## Motion Feel

The ambient warm field from base A is retained unchanged — two drifting warm radial layers on 14s / 18s cycles, candlelit breathing. Panel fade-in is the same (translateY 24px → 0, 0.7s ease). The hero dissolve is the same (blur + opacity, 1.2s). What *slows* is implicit — there are more pauses between elements. Generous spacing is the equivalent of a long breath. Nothing rushes. The salon does not ask you to keep up.

## Section Interpretations

| Section | A2 Salon interpretation |
|---|---|
| **Hero** | Asymmetric: name left-weighted (col ~1/3), amber spotlight bloom from lower-left; right column holds sparse genre/city/year byline in tiny tracked sans; vertical wood rule between columns; "Begin listening" left-aligned below name |
| **About** | Single editorial column, not 2-column grid; wider measure, more liner-note in character; amber accent line left margin; no formal panel border — text floats in the warm field |
| **Library** | Asymmetric card mosaic: row 1 = wide feature card (2/3 width, taller) + narrow secondary card; row 2 = three equal cards; closest/most personal spacing of any variant; varied card heights deliberately mismatched |
| **Live** | Minimal as base; left-flush, no panel border; venue as large serif, date in small amber sans, city in tertiary; each row separated by a hairline amber rule only |
| **Contact** | Two sparse lines, left-aligned; mailto in amber serif; note in italic tertiary; no centered treatment — the salon doesn't announce itself |
