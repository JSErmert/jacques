# A4 — Vinyl Archive

## Concept & Mood

The page is a private record room — shelves of warm wood, sleeve spines, aged paper, the faint chemical
smell of an old pressing. Everything in the Base A dreamscape world is preserved (chocolate-black field,
drifting amber light, candlelit frosted glass) but the tactile register shifts upward: heavier grain
textures, pressed-label typography, album-cover tiles in the Library, and a turntable bottom player
whose spinning disc and swung tonearm replace the abstract progress bar. The visitor feels they are
browsing a personal archive, not a streaming service — discovering a collection rather than a catalog.

## Begin-Listening Moment

Arrival is identical to Base A: near-still chocolate field, descending spotlight cone, "Jacques" in
warm tracked serif. The "Begin listening" CTA carries a miniature vinyl-disc icon (concentric rings,
label dot). On click the name dissolves as before, the field brightens once — and the turntable bar
rises from below, its disc already spinning, tonearm swung into groove position.

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
| Text primary | `#f0e8dc` |
| Text secondary | `#8a7a68` |
| Wood dark grain | `#1e1008` |
| Wood mid grain | `#3c2010` |
| Wood lit grain | `#6c3d18` |
| Aged paper / label cream | `#d4c4a0` |
| Label rust accent | `#8b3a1a` |

## Typography

- **Display / "Jacques":** `Georgia, 'Times New Roman', serif` — large (7–8 vw), letter-spacing `0.25em`,
  weight 400; warm amber text-shadow
- **Section headings + album titles:** same serif, 1.8–2.2 rem, letter-spacing `0.10em`; serif italic
  for track/album names throughout
- **Label copy (record number, catalog ID):** `system-ui, Arial, sans-serif` — all-caps, tracked wide
  (`0.22em`), weight 300, aged amber tint — imitates vintage pressing label typography
- **Nav / eyebrows / CTA:** same sans, all-caps, whisper-weight, `0.26em` tracking
- **Body / liner notes:** same sans, normal case, weight 400, `var(--text-2)`, line-height 1.85

## Frosted Glass + Wood Treatment

**Glass panels:** `backdrop-filter: blur(18px) saturate(1.3)` over `rgba(255, 235, 210, 0.04)`. Hairline
border in aged gold `rgba(200, 160, 100, 0.12)`. Inner top highlight `rgba(255, 220, 160, 0.06)`.
Hover: surface brightens fractionally. No drop shadows; depth is the surrounding dark.

**Wood accent:** 4 px left-pillar runs full viewport height via CSS linear-gradient grain. Album-art
tiles carry a full wood-frame border (4 px all sides, same grain treatment). The turntable plinth is
a wider wood-grain rectangle (`repeating-linear-gradient` at ~88deg) giving real horizontal grain
character. Aged-paper texture on vinyl label circles via CSS noise (repeating-linear-gradient hairlines).

## Motion Feel

Two ambient warm radial gradient layers drift on a 14s / 18s loop (identical to Base A — the chocolate
dreamscape is structural). Album tiles fade up on section entry. The turntable disc spins continuously
on a 1.8s linear CSS `@keyframes` once the player is visible. Tonearm swings in from parked position
(CSS `rotate` transition, 1.2s ease-out) when listening begins. All other transitions unhurried.

## Section Interpretations

| Section | Interpretation |
|---|---|
| **Hero** | Identical chocolate dreamscape + spotlight; "Begin listening" CTA carries vinyl-ring icon |
| **Library** | Album-art tile grid: square frosted tiles with wood-frame border, vinyl-disc motif top-right corner of each, catalog-number label typography, album title in serif italic; 4-up grid |
| **Turntable Player** | Persistent bottom bar replaced by a turntable plinth: spinning CSS disc (concentric grooves, center label circle), swinging tonearm SVG, track info as liner-note label text |
| **About** | Frosted glass panel; bio written as liner-note prose; "liner notes" eyebrow label |
| **Live** | Minimal glass panel; venue in serif, dates amber-labeled as catalog entries |
| **Contact** | Two lines deep in warm haze; email in amber; note written on a sleeve |
