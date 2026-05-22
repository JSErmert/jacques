# Jacques — Music Artist Site Design

**Date:** 2026-05-22
**For:** Jacques, a classical / jazz artist (built for him by the operator).
**Goal:** An immersive, dreamlike artist site that introduces Jacques, plays his music from the moment a visitor enters, and lets them explore his library, story, and where he plays.

## Purpose / #1 job
A visitor enters, **his music begins**, and they drift through his world — hearing him while they read his story, then exploring his full collection, then finding where to hear him live. The experience itself is the deliverable (not commerce/booking-first). Built to **show Jacques the realized vision now**, with real audio files dropping in later.

## Experience arc
Dark, still entry → **"Jacques"** in elegant type with one quiet **"Begin listening."** → click starts his signature piece + the gate dissolves → visitor scrolls downward through sections that **fade and drift in** (dreamlike, never abrupt) → music stays with them via a **persistent bottom player** the whole way.

## Sections (locked order)
1. **Hero** — name set elegantly, "Begin listening" entry. Full-bleed dark, faint atmospheric light-echo, one wood-sculpture pillar accent. Reverent, restrained.
2. **About** — his background, in a frosted-glass panel floating over the dark field; drifts in on scroll. (Placed before the Library so the signature piece — already playing from the Hero — scores his story.)
3. **Library** — his tracks (classical/jazz, incl. unreleased) as a collection of frosted cards; tap any to play it in the persistent player. **Stream-only** (no downloads) given unreleased work.
4. **Live** — where to hear him (The Coyote, Carlsbad Village…) as elegant venue cards.
5. **Contact** — quiet contact / booking.

## Aesthetic (carried from the ProjectVisionary deck language)
- **Dark atmospheric base** (near-black) with a **faint colored light-echo** (gentle ambient gradient).
- **Frosted-glass panels** for content — and unlike the deck (pptx can't blur), the web gives us **true frosted glass via CSS `backdrop-filter: blur`** (the Apple-notification effect, for real).
- **Wood-grain "sculpture pillar" motif** as the structural accent — warm/vintage against the sleek/futuristic dark.
- **Apple-music-clean** typography & spacing: a clean sans for body + an elegant serif/display for "Jacques."
- **Dreamlike scroll**: fade + drift + soft parallax/zoom (Chef Fina's `useScrollFadeIn` / `useScrollZoom` pattern). Respects `prefers-reduced-motion`.

## Audio (swap-ready)
- `src/tracks.js` — track data `{ id, title, src, cover? }` with **placeholder srcs now** (silent/sample clip) so the experience is demoable. Real files later drop into `public/audio/` and replace the `src` paths — **zero rework**.
- Global audio state in `App` (`{ gateOpen, currentTrackId, isPlaying }`); BeginGate, Library, and PersistentPlayer read/update it. One shared `<audio>` element.
- Stream-only (no download UI) to protect unreleased work.

## Components / architecture
- `App.jsx` — orchestrates sections + global audio/gate state.
- `BeginGate.jsx` — entry overlay (name + "Begin listening"); on click starts the signature track and dissolves.
- `BackgroundLayer.jsx` — dark base + faint light-echo.
- `FrostPanel.jsx` — reusable frosted-glass container (the deck's `TextFrame`, now real backdrop-blur).
- `WoodPillar.jsx` — wood-sculpture accent motif.
- `HeroSection`, `AboutSection`, `LibrarySection` (+ `TrackCard`), `LiveSection` (+ `VenueCard`), `ContactSection`.
- `PersistentPlayer.jsx` — docked bottom; play/pause, title, scrubber; reads global audio state.
- hooks: `useScrollFadeIn`, `useScrollZoom` (from Chef Fina), reduced-motion guard.

## Tech stack
Vite + React + Tailwind (matches the **Chef Fina** scaffold) + Vitest component tests (same pattern). Standalone repo `jacques`. Deploy (Vercel/Netlify) is a later step.

## Out of scope (future)
Real audio files (stubbed now), CMS, merch/e-commerce, streaming-service deep-linking, real domain/deploy.

## Success criteria
- Jacques can open a built site that conveys the full immersive experience (enter → music → drift → explore).
- Real audio swaps in with no structural rework.
- Dark / frosted-glass / wood-sculpture / dreamlike-scroll aesthetic realized; clean and reverent, not busy.
