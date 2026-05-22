# A1b — Recital Hall · Full Composition

**Parent:** A1 Recital Hall — identity, palette, typography, motion, and glass treatment unchanged.

## What Changed and Why

A1 rendered with ~1000 px of empty vertical space between the hero and Library, and sparse inter-section gaps, making the page feel unfinished on a full-height render. A1b tightens every vertical joint while keeping the formal symmetry and centered proscenium logic entirely intact.

### Vertical Composition Fixes

| Element | A1 | A1b |
|---|---|---|
| Hero height | `100vh` (full viewport, content centered) | `min-height: 100vh`, but bottom-padding reduced to `60px` so the next section starts immediately below the fold with no dead zone |
| Library top padding | `100px` | `64px` — still breathes, no void |
| About section | `padding: 80px 80px 80px` | `padding: 56px 80px 56px` |
| Live section | `padding: 0 80px 80px` (no top) | `padding: 0 80px 64px` — absorbed into about's bottom |
| Contact | `padding: 60px 80px 160px` | `padding: 52px 80px 100px` — generous but not cavernous |
| Section `section-rule` margin-bottom | `40px` | `28px` — content meets heading sooner |
| Program container | full-width 960px max | same — unchanged |
| Player bar | slides in on scroll / button | same — unchanged |

### Content Additions (A1b only)

- **Live / Upcoming Engagements:** three The Coyote (Carlsbad Village, CA) dates — Jun 14, Jul 2, Jul 19 — plus a fourth anchoring residency row for late summer.
- **Contact:** closing note clarified to "For bookings, residency inquiries, and notes left on the bench."

### What Is Preserved Identically

Palette, all CSS custom properties, typefaces (`Georgia`/`Times New Roman` + `system-ui`/`Arial`), backdrop-filter glass, proscenium spotlight + cone + pool, ambient SVG field, waveform bars, player bar, wood pillar accents, fade-in observer behavior, all four tracks and their metadata.

## Still Shots

A1b should read completely full and composed from top to bottom at 1440 px wide: the hero occupies one viewport, the Library program sits tightly below, About-Live-Contact flow with measured classical spacing, and the page-fade dissolves cleanly into the player bar.
