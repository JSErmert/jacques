# B3 "Archive Stage" — Spec

**Variant:** B3 (bridge)
**Date:** 2026-05-22
**Lineage:** A4 (Vinyl Archive) dominant × A1 (Recital Hall) frame

---

## Concept

A4's tactile vinyl identity is the primary experience. A1's symmetric, centered, proscenium staging is the container. The result: a record collection _presented as a recital_ — the archive displayed on a stage, lit from directly above, composed with the formal symmetry of a concert hall but smelling of pressed vinyl and aged wood.

The governing metaphor is a **curated archive performance**: each record tile is placed on the stage floor rather than scattered on a shelf, arranged in a centered grid the way a pianist might lay out scores. The turntable occupies the stage center the way a Steinway would. The spotlight falls from above — tight, proscenium-style — illuminating the collection rather than a performer.

---

## Design Decisions

**Tactile palette (A4 dominant):**
- Full vinyl disc tiles in a 4-up grid, wood-frame box-shadows, aged-paper grain overlay
- Spinning turntable player bar with tonearm, groove progress track, disc-label detail
- A4's broader wood grain pillar (5 px, left only) retained but mirrored symmetrically (right side added, A1 rule)
- Vinyl motif in tile top-right corner, catalog number typography (JCQ-001 style)

**Formal staging (A1 frame):**
- All sections centered via `max-width` columns and `margin: 0 auto` — A1's core layout discipline
- Proscenium spotlight cone from A1: narrow hot beam from `50% 0%`, broader ambient wash behind it
- Section headings carry A1's centered eyebrow + heading + amber hairline rule beneath
- Symmetric left + right wood pillar (A1 mirror), subdued opacity to let vinyl tiles breathe
- Hero uses A1's static, non-floating name treatment (the name stands still on a stage)
- About section as centered single-column glass panel (A1 pattern) with A4's decorative vinyl disc motif

**Player bar:**
- Full A4 turntable bar: spinning disc, tonearm, wood plinth accent, groove track, waveform
- Centered amber hairline rule at top of bar (A1 detail) added

**Library:**
- A4 album-art tile grid (4 columns), centered within `max-width: 1100px` stage frame
- Tiles retain full A4 wood-frame shadow and vinyl motif
- Grid container gets A1's centered heading block above it

**Palette & texture:** identical to both parents — `#0f0805` deep background, amber `#c8893a` / `#e8b060`, frosted glass `rgba(255,235,210,0.04)`, ambient warm drift animation.

---

## What B3 Is Not

- Not A4: the left-aligned, shelf-browsing layout is replaced by centered stage arrangement
- Not A1: the concert-program list is replaced entirely by the vinyl tile grid; the turntable player replaces the minimal progress bar
- Not a compromise: tactile is the dominant sensibility; staging is the organizing principle

---

## Section Map

| Section | A4 source | A1 source | B3 treatment |
|---|---|---|---|
| Hero | Name + vinyl icon CTA | Static centered name + apron rule | A1 staging (static name, apron rule, proscenium spot) + A4 vinyl icon CTA |
| Library | 4-col album tile grid | Concert program list | A4 tile grid, A1 centered heading + stage frame |
| About | Left-split liner notes panel | Centered single-column panel | A1 centered panel + A4 decorative vinyl disc, inline liner-label detail |
| Live | Left-aligned glass panel | Centered glass panel | A1 centered panel, A4 date/venue typography |
| Contact | Left text | Centered | Centered (A1) |
| Player | Full turntable bar | Minimal progress bar | Full A4 turntable bar + A1 centered top-rule accent |
