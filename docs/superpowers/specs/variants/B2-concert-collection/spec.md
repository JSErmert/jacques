# B2 "Concert & Collection" — Variant Spec

**Concept:** Equal fusion of A1's formal recital dignity and A4's tactile vinyl warmth. Neither parent dominates — they hold the page at 50/50.

---

## Design Intent

A1 contributes the centered proscenium hero: symmetrical spotlight cone from above, the name held still like text on a printed program, the apron hairline rule, the "Begin listening" dissolve. A4 contributes the record collection section: square album tiles with vinyl-motif decoration, frosted glass surfaces, catalog numbers, and a turntable-touched persistent player. The bridge is achieved structurally — hero and nav carry A1's formal symmetry; the Library section adopts A4's grid vernacular at gallery pace rather than archive density; the player marries both (turntable disc + spinning animation from A4, hairline-amber minimal chrome from A1).

---

## Palette & Atmosphere

Identical to both parents: `#0f0805` deep background, amber `#c8893a` / hot `#e8b060` / aged `#a06828`, `#f0e8dc` primary text, `#8a7a68` secondary text. Dual animated ambient fields (fixed, behind all content). Warm spotlight cone from top center in hero. Real `backdrop-filter: blur(18–28px)` frosted glass on all panels and player bar. Symmetric thin wood pillars framing left and right viewport edges.

---

## Page Structure

| Section | Provenance | Character |
|---|---|---|
| **Nav** | A1 — centered symmetry | Brand left · links right; formal spacing |
| **Hero** | A1 — proscenium stage | Spotlight cone · still name · apron rule · Begin listening |
| **Library** | A4 — vinyl archive tiles | 4-col square grid · catalog numbers · vinyl-motif corners · play rings |
| **About** | Balanced bridge | Two-column panel (A4 layout) with centered heading block (A1 typography) |
| **Live** | Shared (identical in both) | Frosted glass panel · date / venue / location rows |
| **Contact** | Shared | Centered, amber email link |
| **Player** | A4 turntable + A1 chrome | Spinning disc · tonearm · hairline amber accent bar |

---

## Library Grid Calibration

Three standard tiles + one wide tile (spans 2 columns) to break rhythm without cluttering. Tiles use A4's `box-shadow` wood-frame rings, frosted-glass inner surface, vinyl-motif (top-right), album-glow (bottom-left), catalog number header, italic serif title, and bottom-right play ring. Grid padding is wider than A4 (130px → 100px) and tile gaps slightly larger (20px → 24px) to give the gallery a calmer breath matching A1's unhurried register.

---

## Player Bar

A4's mechanical elements (spinning grooved disc, tonearm settling on player reveal, wood plinth strip, catalog ID, groove-track progress with needle-head fill) combined with A1's hairline amber top-rule accent and centered amber rule at midpoint. Height 88px — matches A4. Waveform bars (3px wide, A4 style) sit between track info and progress track.

---

## Typography

- Headings / name / italic titles: `Georgia, 'Times New Roman', serif`
- All UI text / labels / eyebrows / nav: `system-ui, Arial, sans-serif`
- No network fonts.

---

## Interaction Notes (static mockup)

- "Begin listening" dissolves hero name, triggers player slide-up (A1 behavior)
- Scroll past 140px triggers player if not already open
- IntersectionObserver fade-in on all `.fade-in` elements
- Turntable disc animates (CSS `spinDisc` keyframe) when player bar has `.visible`
- Tonearm settles on `.visible` via CSS transition
