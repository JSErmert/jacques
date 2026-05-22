# A1 — Recital Hall

## Concept & Mood

The page is a recital stage: everything is centered, symmetric, and held to formal classical proportions — the way a program note is spaced, the way a Steinway sits centered under a single proscenium light. The hero reads as curtain-rise rather than dream-entrance; the name receives a cone of warm theatrical light from directly above, as if a follow-spot has just found its mark. Reverence is structural, not atmospheric: it lives in the margins, the deliberate vertical rhythm, the serif-only hierarchy, and the restraint that never tips into coldness.

## Begin-Listening Moment

The visitor arrives to a near-black chocolate field; a narrow proscenium follow-spot descends silently to center, illuminating "JACQUES" in large tracked serif — perfectly centered, no eyebrow, nothing competing. A single hairline amber rule runs horizontally beneath the name like the edge of a stage apron. Below it, "Begin listening" in whisper spaced caps. On click: the name holds for a beat, then resolves to a gentle glow (opacity 0 → 0.12 warm fill), the player slides up from below, and the page becomes scrollable — as though the overture has started.

## Palette

Identical warm chocolate base from the A foundation, unchanged.

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

- **Display / "JACQUES":** `Georgia, 'Times New Roman', serif` — large (7.4 vw), letter-spacing `0.35em`, all-caps, weight 400; text-shadow warm amber glow; centered with deliberate vertical breathing room above and below
- **Section headings:** same serif, 1.6–1.9 rem, letter-spacing `0.12em`, centered alignment throughout
- **Program labels / running numbers:** same serif, italic, small (0.85 rem), amber-tinted — like printed program annotations
- **Nav / eyebrows / "Begin listening":** `system-ui, Arial, sans-serif` — all-caps, tracked wide (`0.28em`), weight 300, whisper
- **Body:** same sans, 14px, normal case, `var(--text-2)`, line-height 1.95; used sparingly (bio copy only)
- **Track titles:** serif italic — the typographic center of each program row

## Frosted Glass + Wood Treatment

**Glass panels:** same formula as base — `backdrop-filter: blur(18px) saturate(1.3)`, warm near-transparent surface, hairline amber-gold border. In A1, panels are full-width centered columns rather than left-aligned, reading like a framed program rather than a shelf. Inner highlight is `inset 0 1px 0 rgba(255, 220, 160, 0.06)`. No drop shadows; depth from surrounding chocolate dark.

**Wood accent:** A centered 2px horizontal amber-rule divider (not a vertical pillar) runs beneath the hero name — evoking the stage apron edge. Individual program rows in the Library use a subtle warm underline rule rather than a card left-border. The left-edge pillar from the base is retained but reduced to 3px and 0.45 opacity, framing without competing.

## Motion Feel

Ambient warm field drifts identically to the base (14s/18s slow loops) — unchanged. Spotlight cone descends on load with the same `coneRise` ease-out, but is narrower (17% ellipse) and more precisely centered, evoking a single follow-spot rather than general fill. Panels enter with `translateY(20px) → 0, opacity 0 → 1` at 0.6s — measured, unhurried. No floating or lateral motion; everything resolves to rest. The overall feel is a breath held before a recital begins, then the quiet warmth of a hall settling into music.

## Sections

| Section | A1 Interpretation |
|---|---|
| **Hero** | Full viewport, perfectly centered; single follow-spot cone; "JACQUES" in wide-tracked serif; horizontal amber apron rule; "Begin listening" in whisper caps |
| **About** | Centered single-column glass panel, max-width 760px; section heading centered above prose; reads like a program biography insert |
| **Library** | Centered "Concert Program" — two-column rows, not cards; each row = track number (serif italic) + title (serif italic) + duration + genre; amber horizontal rule between rows; elegant, printed-program density |
| **Live** | Centered single-column glass panel; dates in serif + amber rule underline; venue prominent in serif; reads like a season calendar page |
| **Contact** | Two centered lines in the deep warm haze; `mailto` in amber serif; italic note beneath |
