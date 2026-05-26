# Jacques — Architecture

**Version:** 1.0
**Last updated:** 2026-05-26
**Scope:** static React/Vite music artist site — no backend, no accounts, no LLM

This document is the structural reference: tech stack, runtime composition, state model, component tree, data layer, design constraints, and the rendering details that aren't obvious from the code.

For security posture: see [`SECURITY.md`](./SECURITY.md).
For day-to-day usage: see [`README.md`](./README.md).

---

## 1. Tech stack

| Layer | Technology | Version |
|---|---|---|
| UI library | React | 19.2 |
| Build tool | Vite | 8.0 |
| Styling | Tailwind CSS | 3.4 |
| Tests | Vitest + Testing Library + jsdom | 4.1 / 16 / 29 |
| Lint | ESLint (flat config) + `eslint-plugin-react-hooks` | 9.39 |
| Deploy target | Vercel (static SPA, `framework: vite`) | — |
| CI/CD | GitHub Actions (lint + test + build + Trivy + gitleaks) | — |
| Local hooks | Husky + lint-staged | 9 / 17 |

JS-with-JSX, not TypeScript — the codebase is small enough that the cost of TS scaffolding outweighs the safety gain for now. Migration to TS is reversible if/when the surface grows.

---

## 2. Runtime composition

The full app is rendered from `src/App.jsx`. There is one shared `<audio>` element and one source-of-truth state hook.

```
<App>
  <NavigationBar/>              ← scroll-aware frosted-glass on scrollY > 24
  <BackgroundLayer/>             ← fixed full-viewport spotlight + ambient field
  <HeroSection onBegin={...}/>   ← "JACQUES" + "Begin Listening" gate
  <main>
    <Pillars/>                   ← visual columns flanking post-hero content
    <AboutSection/>
    <CollectionSection.../>      ← track grid with hover + play
    <PressingsSection.../>       ← album tiles → opens modal
    <LiveSection/>
    <ContactSection/>
  </main>
  <PersistentPlayer.../>         ← fixed bottom bar; vinyl disc + tonearm
  <AlbumOverlay.../>             ← A1b "Programme" modal (Reveries / After Hours)
  <audio ref hidden onEnded={next}/>
</App>
```

Hero is OUTSIDE `<main>` so the Pillars decoration is scoped to post-hero scroll. The PersistentPlayer is rendered once at the App level and always present once `gateOpen` is true.

---

## 3. State model

All shared state lives in `src/state/useAudio.js`. This hook is invoked **once**, in `App.jsx`. Its return values are passed as props to whichever section needs them — there is no React Context, no Redux, no Zustand. The hook is small enough that prop-drilling is cleaner than abstraction.

### Hook surface

| State | Type | Set by | Read by |
|---|---|---|---|
| `audioRef` | `Ref<HTMLAudioElement>` | bound to the shared `<audio>` | hook internals only |
| `gateOpen` | `boolean` | `begin()` | HeroSection (mirror gate UI) |
| `currentTrackId` | `string \| null` | `play / next / prev / selectTrack` | PersistentPlayer, CollectionSection, AlbumOverlay |
| `isPlaying` | `boolean` | `play / togglePlay / next / prev` | PersistentPlayer (arm + icon), CollectionSection (tile state), AlbumOverlay (row state) |
| `openAlbumId` | `string \| null` | `openAlbum / closeAlbum` | AlbumOverlay (which album, or null = closed) |

### Action surface

| Action | Effect |
|---|---|
| `begin()` | Opens the gate and plays `SIGNATURE_TRACK_ID` (currently `'nocturne-eflat'`) |
| `selectTrack(id)` | Plays the given track |
| `togglePlay()` | Pauses or resumes the current `<audio>`; toggles `isPlaying` regardless (so stubs work) |
| `openAlbum(id)` / `closeAlbum()` | Open or close the Programme modal |
| `next()` / `prev()` | Wrap-around navigation across the `tracks[]` array |

### Audio playback contract

The single `<audio>` element is mutated imperatively when a track has a real `src`. When `src: null` (current stub state), all play/pause calls are no-ops — but state still advances so the UI stays interactive. This is what lets the site be fully exercisable without any audio files in `public/audio/`.

```
selectTrack(id) → setCurrentTrackId(id)
                → setIsPlaying(true)
                → if src: audio.src = src; audio.play()
                  else: no-op (stub mode)
```

---

## 4. Data layer

Two flat ES module exports, no fetching, no async, no database.

### `src/data/tracks.js`

```js
[
  { id, title, instrument, duration, year, catalogId, src }
]
```

Plus `SIGNATURE_TRACK_ID` (the track that auto-plays on "Begin Listening") and `getTrack(id)`.

### `src/data/albums.js`

```js
[
  { id, title, year, cover, trackIds: [...] }
]
```

Plus `albumTracks(album)` which resolves IDs to full track objects via `getTrack`.

Track IDs are stable lookup keys; album IDs are URL-safe slugs. Adding a real track is **one edit** in `tracks.js` (set `src` to a path under `public/audio/`); no component change required.

---

## 5. Component layer

Every section is a self-contained component with a sibling `.test.jsx` covering its render and interaction surface. Components colocate their own styles via inline objects + a single `<style>` block (no CSS modules; Tailwind handles the global utility layer).

### Sections

| Component | Responsibility |
|---|---|
| `NavigationBar` | Fixed top bar with JACQUES wordmark + 4 nav anchors. Adds `.scrolled` frosted-glass class on `scrollY > 24` |
| `HeroSection` | Centered "JACQUES" + discipline line + "Begin Listening" CTA. CTA text swaps in-place to "Now Playing — [title]" once the gate opens, with the vinyl-icon circle persisting and the button width animating between measured text widths |
| `Pillars` | Decorative columns flanking post-hero sections |
| `AboutSection` | Bio paragraph + concert-program eyebrow |
| `CollectionSection` | Grid of `TrackTile` — hover effects scoped to `(hover: hover)`; active tile reflects `isPlaying` |
| `PressingsSection` | Album tile grid (`AlbumTile`); clicking opens `AlbumOverlay` |
| `AlbumOverlay` | A1b "Programme" modal — pop-in animation, responsive 5-col / 4-col-2-row grid, escape/scrim/× close, row click plays-or-toggles |
| `LiveSection` | Venue date rows (`VenueRow`) |
| `ContactSection` | mailto link only — no form submission |
| `PersistentPlayer` | Fixed bottom bar; vinyl disc spins via CSS animation; tonearm uses `armEngaged` state to lift-and-place on every play/track-change |
| `BackgroundLayer` | Full-viewport fixed; scroll-aware spotlight floor pool (`POOL_CY_HERO` 565 → `POOL_CY_AFTER` 651) + SVG cone with Gaussian-blur softening + volumetric ray streaks |
| `FrostPanel` | Reusable frosted-glass container for the sections |

### Hooks

| Hook | Purpose |
|---|---|
| `useAudio` | Single source of truth for playback (see §3) |
| `useScrollReveal` | IntersectionObserver-based reveal-on-scroll for section entrances |

---

## 6. Rendering details that aren't obvious

### Tonearm lift-and-place

The arm is parked-or-engaged via the `armEngaged` boolean. When `isPlaying` toggles or `track?.id` changes:

1. Park immediately (`setArmEngaged(false)`)
2. Set a 80ms `setTimeout` to engage (`setArmEngaged(true)`)

This **intentionally** causes a cascading render (React's `react-hooks/set-state-in-effect` linter flags it; the rule is disabled with a comment on the effect). The cascade IS the feature — it forces the CSS transition to replay on every action, not just on the first.

### Hero CTA in-place text swap

`HeroSection.jsx` uses `useLayoutEffect` to measure both texts via refs before paint. The button is `position: relative` with `width: ctaWidth` animating between the two measured widths via `cubic-bezier(0.22, 1, 0.36, 1)`. Both text spans live inside the button with `position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)` and crossfade via opacity — so text stays dead-centered in the spotlight, and the vinyl circle hangs off to the left via `right: calc(100% + 12px)`.

### Spotlight beam (absolute size across viewports)

The hero spotlight cone is sized with `clamp(50px, 17vw, 70px)` (inner) and `clamp(140px, 44vw, 185px)` (halo) so it stays at **mobile's natural absolute width** (~66px / ~172px) on every viewport. On larger screens the beam doesn't scale up proportionally — it reads as proportionally narrower, which is the intended cinematic look.

The post-hero BackgroundLayer uses SVG polygons inside a 1440×900 viewBox with `preserveAspectRatio="xMidYMid slice"`, plus a Gaussian-blur filter (`stdDeviation="42"`) to feather the cone edges into volumetric falloff. The floor pool's vertical position is scroll-aware: anchored at 565 / 1440x900 (~63% down) on the hero so the CTA sits centered in it, easing to 651 (~72% down) once the hero scrolls out.

### Modal pop-in

`AlbumOverlay` uses CSS `@keyframes` with a `cubic-bezier(0.18, 0.89, 0.32, 1.28)` overshoot for the entrance. The modal grid reflows between desktop (5 cols: num / title / genre / duration / play) and mobile (4 cols × 2 rows: num + play span both rows; genre + duration drop under title) via `grid-template-areas` — same DOM, different placement.

### Scroll-aware navbar

`NavigationBar` adds a `.scrolled` class on `scrollY > 24`, which applies `background: rgba(28,16,8,0.74); backdrop-filter: blur(22px) saturate(1.3); border-bottom: 1px solid rgba(...)` — dark chocolate frosted glass that prevents the wordmark from overlapping incoming section text.

---

## 7. Build + deploy

### Vite

`vite.config.js` configures:
- React plugin
- Vitest test environment (`jsdom`, setupTests, globals: true)
- `server.allowedHosts` — ngrok subdomains allowlisted for phone testing

### Vercel

`vercel.json` declares:
- `framework: "vite"` (Vercel auto-detects but the explicit declaration is documentation)
- `buildCommand: "npm run build"`, `outputDirectory: "dist"`, `installCommand: "npm ci"`
- HTTP security headers for every route (see `SECURITY.md` §6)

Deployment is auto on `main` push. PRs get preview URLs.

### CI

`.github/workflows/ci.yml` runs three parallel jobs:
- `validate` — `npm ci` → ESLint → Vitest → `vite build`
- `security` — Trivy filesystem scan, SARIF upload to GitHub Security tab; blocks merge on HIGH/CRITICAL
- `secrets` — gitleaks full-history scan

All three must pass before merge to `main`.

---

## 8. What's not built yet

Tracked here so future contributors know what's intentionally absent vs. accidentally missing.

| Item | Why deferred |
|---|---|
| Real audio files | Pending artist deliverables; player no-ops gracefully on `src: null` |
| Real track titles + bio | Pending artist deliverables |
| Custom domain (`jacquesmusic.com`) | Pending registration after preview-deploy review |
| Favicon + OG / social-card images | Pending design pass |
| Server-side anything (contact form, newsletter, analytics) | Out of v1 scope; would require a new chapter in SECURITY.md |
| TypeScript migration | Codebase too small to justify; revisit if surface grows |
| E2E browser tests (Playwright) | Vitest + Testing Library cover the interaction surface; revisit if visual regression starts costing time |

---

## 9. Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-05-26 | Initial ARCHITECTURE.md authored covering React 19 + Vite 8 + Vitest baseline; documents the single-`useAudio`-hook state model, the scroll-aware BackgroundLayer + hero-cone clamp pattern, the in-place CTA text swap, and the rendering details that the JSX alone doesn't explain. |
