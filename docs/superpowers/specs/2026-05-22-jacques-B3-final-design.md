# Jacques — Final Design Spec (B3 "Archive Stage")

**Date:** 2026-05-22
**Supersedes** the generic site spec for the *build direction*. Visual source of truth: `docs/superpowers/specs/variants/B3-archive-stage/mockup.html` (+ its `spec.md`). Audio/experience basis: `2026-05-22-jacques-music-site-design.md`.

## Direction
**B3 "Archive Stage"** — a record collection *arranged on a stage*: tactile vinyl/turntable analog charm (dominant) composed with formal, centered, proscenium-spotlight dignity (the frame). Deep **chocolate / vintage-shadow** palette, warm spotlight, drifting warm ambient field, **real frosted glass** (`backdrop-filter: blur`), wood-grain accents, dreamlike scroll. Reverent, premium, warm-dark — classical heritage through a modern glass form.

## Palette (from B3)
Deep chocolate-black base (`#0f0805` / `#160d08` / `#1d1109`), warm chocolate-gold spotlight/accent (`#c8892a` / `#e8b050`), wood grain (`#1e1008` / `#3c2010` / `#6c3d18`), light text (`#e8ddc8`-ish). Aged paper grain overlay.

## Experience flow (locked)
Enter on a dark, still **begin-listening hero** → click **"Begin listening"** → Jacques's signature piece starts → drift down through the world, music staying via the **persistent turntable player**. Sections fade/drift in on scroll.

**Section order:**
1. **Hero** — centered "JACQUES" under a warm proscenium spotlight, "Begin listening." **No side pillars in the hero** (pillars begin only on sections below).
2. **About** — his background, frosted panel surfacing from the dark.
3. **Collection** — the works as vinyl-disc tiles (Nocturne, Blue Reverie, Café Trois, Still Water…), each tap-to-play in the player. Stream-only (unreleased).
4. **Pressings** *(new — from B1)* — an **album selector**: album-pressing tiles. **Clicking an album opens a pop-up overlay** showing that album's detail + track list (each track playable). Modal overlay (frosted, chocolate), dismissible.
5. **Live** — venues / upcoming engagements (The Coyote, Carlsbad Village…).
6. **Contact** — quiet contact / booking.

## Structural rules
- **Wood pillars:** absent on the hero; present (left + right, subtle, masked) on every section after the hero.
- **Persistent player:** turntable styling — spinning disc + tonearm, track title + catalog id, groove/scrubber, prev/play/next, volume. Reads global audio state; docked bottom; appears once listening begins.

## Components / architecture (Vite + React + Tailwind — Chef-Fina scaffold)
- `App.jsx` — orchestrates sections + global state `{ gateOpen, currentTrackId, isPlaying, openAlbumId }`.
- `BeginGate` / `HeroSection` — pillar-free hero + begin-listening.
- `BackgroundLayer` — chocolate base + warm spotlight + drifting ambient field + paper grain.
- `Pillars` — wood rails, rendered for post-hero sections only.
- `FrostPanel` — reusable real-backdrop-blur glass container.
- `AboutSection`.
- `CollectionSection` + `TrackTile` (vinyl-disc tiles).
- `PressingsSection` + `AlbumTile` → `AlbumOverlay` (modal: album art, track list, play).
- `LiveSection` + `VenueRow`.
- `ContactSection`.
- `PersistentPlayer` (turntable).
- hooks: `useScrollFadeIn`, `useScrollZoom` (Chef-Fina), reduced-motion guard.
- data: `tracks.js` (`{id,title,instrument,duration,src,catalogId}`) + `albums.js` (`{id,title,year,cover,trackIds[]}`) — **stub data + placeholder/sample `src` now; real audio files swap into `public/audio/` later with zero rework.** Stream-only (no download UI).

## Tech
Vite + React + Tailwind + Vitest (mirror Chef Fina). Standalone `jacques` repo. Deploy (Vercel/Netlify) later.

## Out of scope (future)
Real audio files (stubbed), CMS, merch/e-commerce, streaming deep-links, real domain/deploy.

## Success criteria
- A built site Jacques can open that delivers the full experience (enter → music → drift → Collection → open an album in the Pressings overlay → Live → Contact).
- Hero is pillar-free; pillars present after; turntable player persists.
- Real audio swaps in with no structural rework.
- B3 chocolate/vintage/frosted-glass/dreamlike aesthetic faithfully realized.
