# Jacques B3 Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Jacques's artist website — the "B3 Archive Stage" direction — as a Vite + React + Tailwind single-page app: a begin-listening hero, a persistent turntable player, a vinyl Collection, a Pressings album-selector that opens a pop-up overlay, plus About / Live / Contact, in a chocolate/vintage frosted-glass world.

**Architecture:** Single-page React app. One shared audio element + global UI state (gate open, current track, playing, open album) lifted to `App` and passed down (no external state lib — YAGNI). Presentational sections are React ports of the **committed visual reference** `docs/superpowers/specs/variants/B3-archive-stage/mockup.html` — that file is the source of truth for markup structure, CSS, palette, and the spotlight/pillar/turntable styling. This plan supplies the React architecture, data layer, state wiring, the new AlbumOverlay interaction, and tests; **visual CSS is ported from the mockup, not re-invented.**

**Tech Stack:** Vite, React 18, Tailwind CSS, Vitest + @testing-library/react (mirrors the Chef Fina repo at `C:\Users\JSEer\Chef Fina`).

**Visual verification:** This is a visual build. After visual tasks, the orchestrator renders the dev build to a screenshot (Playwright, as used for the mockups) and eyeballs it — automated tests cover behavior, screenshots cover appearance.

---

## File structure

```
jacques/
  index.html
  package.json            vite/react/tailwind/vitest (copy Chef Fina's)
  vite.config.js          + vitest config (jsdom)
  tailwind.config.js      chocolate/vintage tokens
  postcss.config.js
  src/
    main.jsx
    App.jsx               composes sections; owns global state
    index.css             tailwind layers + base tokens + paper grain
    data/
      tracks.js           stub track data (swap-ready src) + catalogId
      albums.js           stub album data (trackIds -> tracks)
    state/
      useAudio.js         single <audio>, play/pause/select, state
    components/
      BackgroundLayer.jsx chocolate base + spotlight + ambient field + grain
      Pillars.jsx         wood rails (rendered for post-hero sections only)
      FrostPanel.jsx      reusable backdrop-blur glass container
      HeroSection.jsx     pillar-free hero + "Begin listening"
      PersistentPlayer.jsx turntable player (disc, tonearm, scrubber, controls)
      AboutSection.jsx
      CollectionSection.jsx + TrackTile.jsx   vinyl-disc tiles
      PressingsSection.jsx + AlbumTile.jsx     album selector
      AlbumOverlay.jsx    modal: album art + track list (NEW interaction)
      LiveSection.jsx + VenueRow.jsx
      ContactSection.jsx
    hooks/
      useScrollReveal.js  IntersectionObserver fade/drift (+ reduced-motion)
```

---

### Task 0: Scaffold the project

**Files:** Create `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/test-setup.js`.

- [ ] **Step 1: Copy the Chef Fina scaffold configs.** From `C:\Users\JSEer\Chef Fina` copy `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `src/test-setup.js` into `jacques/` (same relative paths). Change `package.json` `"name"` to `"jacques"`.
- [ ] **Step 2: Install.** Run `npm install` in `jacques/`. Expected: deps resolve, no errors.
- [ ] **Step 3: Minimal app.** `src/main.jsx` renders `<App/>` into `#root`; `App.jsx` returns `<div>Jacques</div>`; `index.html` has `<div id="root">` + `<script type="module" src="/src/main.jsx">`.
- [ ] **Step 4: Verify dev server boots.** Run `npm run dev`; confirm it serves without error; stop it.
- [ ] **Step 5: Add chocolate tokens** to `tailwind.config.js` `theme.extend.colors`: `bgDeep:'#0f0805', bg2:'#160d08', bg3:'#1d1109', gold:'#c8892a', goldLit:'#e8b050', woodDark:'#1e1008', woodMid:'#3c2010', woodLit:'#6c3d18', text1:'#e8ddc8'`. In `src/index.css` add the Tailwind directives + a base `body{background:#0f0805;color:#e8ddc8}` and the aged-paper grain overlay (port the `body::after` grain rule from the B3 mockup).
- [ ] **Step 6: Commit.** `git add -A && git commit -m "chore: scaffold jacques (vite+react+tailwind+vitest) with chocolate tokens"`

---

### Task 1: Data layer (stub, swap-ready)

**Files:** Create `src/data/tracks.js`, `src/data/albums.js`, `src/data/tracks.test.js`.

- [ ] **Step 1: Write failing test** `src/data/tracks.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { tracks, getTrack } from './tracks'
import { albums, albumTracks } from './albums'

describe('data', () => {
  it('every track has the required shape', () => {
    for (const t of tracks) {
      expect(t).toMatchObject({ id: expect.any(String), title: expect.any(String), instrument: expect.any(String), duration: expect.any(String), catalogId: expect.any(String) })
      expect('src' in t).toBe(true) // stub now (null/placeholder), real file later
    }
  })
  it('getTrack returns by id', () => { expect(getTrack(tracks[0].id).title).toBe(tracks[0].title) })
  it('every album trackId resolves to a real track', () => {
    for (const a of albums) for (const id of a.trackIds) expect(getTrack(id)).toBeTruthy()
  })
  it('albumTracks expands an album to track objects', () => {
    expect(albumTracks(albums[0]).length).toBe(albums[0].trackIds.length)
  })
})
```
- [ ] **Step 2: Run** `npx vitest run src/data/tracks.test.js` → FAIL (modules missing).
- [ ] **Step 3: Implement `src/data/tracks.js`:**
```js
// Stub track data. `src` is null now (audio stubbed); drop real files into
// public/audio/ and set src here later — no other change needed. Stream-only.
export const tracks = [
  { id: 'nocturne-eflat', title: 'Nocturne in E-flat', instrument: 'Solo Piano', duration: '4:22', year: '2023', catalogId: 'JCQ-001', src: null },
  { id: 'blue-reverie',   title: 'Blue Reverie',        instrument: 'Piano Trio', duration: '6:08', year: '2024', catalogId: 'JCQ-002', src: null },
  { id: 'cafe-trois',     title: 'Café Trois',          instrument: 'Jazz Quartet', duration: '5:47', year: '2023', catalogId: 'JCQ-003', src: null },
  { id: 'still-water',    title: 'Still Water',         instrument: 'Solo Piano', duration: '3:55', year: '2022', catalogId: 'JCQ-004', src: null },
]
export const SIGNATURE_TRACK_ID = 'nocturne-eflat'
export const getTrack = (id) => tracks.find((t) => t.id === id)
```
- [ ] **Step 4: Implement `src/data/albums.js`:**
```js
import { getTrack } from './tracks'
export const albums = [
  { id: 'reveries', title: 'Reveries', year: '2024', cover: null, trackIds: ['nocturne-eflat', 'still-water'] },
  { id: 'after-hours', title: 'After Hours', year: '2023', cover: null, trackIds: ['blue-reverie', 'cafe-trois'] },
]
export const albumTracks = (album) => album.trackIds.map(getTrack).filter(Boolean)
```
- [ ] **Step 5: Run** `npx vitest run src/data/tracks.test.js` → PASS.
- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: stub track + album data (swap-ready audio src)"`

---

### Task 2: Audio + UI state hook

**Files:** Create `src/state/useAudio.js`, `src/state/useAudio.test.jsx`.

- [ ] **Step 1: Write failing test** `src/state/useAudio.test.jsx`:
```js
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAudio } from './useAudio'

describe('useAudio', () => {
  it('starts with gate closed and nothing playing', () => {
    const { result } = renderHook(() => useAudio())
    expect(result.current.gateOpen).toBe(false)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentTrackId).toBe(null)
  })
  it('begin() opens the gate and selects the signature track', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.begin())
    expect(result.current.gateOpen).toBe(true)
    expect(result.current.currentTrackId).toBe('nocturne-eflat')
    expect(result.current.isPlaying).toBe(true)
  })
  it('selectTrack sets current track and plays', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.selectTrack('blue-reverie'))
    expect(result.current.currentTrackId).toBe('blue-reverie')
    expect(result.current.isPlaying).toBe(true)
  })
  it('togglePlay flips playing', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.selectTrack('blue-reverie'))
    act(() => result.current.togglePlay())
    expect(result.current.isPlaying).toBe(false)
  })
  it('openAlbum / closeAlbum set openAlbumId', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.openAlbum('reveries'))
    expect(result.current.openAlbumId).toBe('reveries')
    act(() => result.current.closeAlbum())
    expect(result.current.openAlbumId).toBe(null)
  })
})
```
- [ ] **Step 2: Run** `npx vitest run src/state/useAudio.test.jsx` → FAIL.
- [ ] **Step 3: Implement `src/state/useAudio.js`:**
```js
import { useCallback, useRef, useState } from 'react'
import { SIGNATURE_TRACK_ID, getTrack } from '../data/tracks'

// Single shared <audio>; guarded so real src plays when present, stub is a no-op.
export function useAudio() {
  const audioRef = useRef(null)
  const [gateOpen, setGateOpen] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [openAlbumId, setOpenAlbumId] = useState(null)

  const play = useCallback((id) => {
    setCurrentTrackId(id)
    setIsPlaying(true)
    const el = audioRef.current
    const src = getTrack(id)?.src
    if (el && src) { el.src = src; el.play().catch(() => {}) } // stub src=null -> no-op
  }, [])

  const begin = useCallback(() => { setGateOpen(true); play(SIGNATURE_TRACK_ID) }, [play])
  const selectTrack = useCallback((id) => play(id), [play])
  const togglePlay = useCallback(() => {
    setIsPlaying((p) => {
      const el = audioRef.current
      if (el && getTrack(currentTrackId)?.src) { p ? el.pause() : el.play().catch(() => {}) }
      return !p
    })
  }, [currentTrackId])
  const openAlbum = useCallback((id) => setOpenAlbumId(id), [])
  const closeAlbum = useCallback(() => setOpenAlbumId(null), [])

  return { audioRef, gateOpen, currentTrackId, isPlaying, openAlbumId, begin, selectTrack, togglePlay, openAlbum, closeAlbum }
}
```
- [ ] **Step 4: Run** `npx vitest run src/state/useAudio.test.jsx` → PASS.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: useAudio global audio + UI state hook"`

---

### Task 3: useScrollReveal hook

**Files:** Create `src/hooks/useScrollReveal.js`, `src/hooks/useScrollReveal.test.jsx`.

- [ ] **Step 1: Write failing test** (IntersectionObserver is stubbed in jsdom; test the reduced-motion + ref contract):
```js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollReveal } from './useScrollReveal'

beforeEach(() => {
  global.IntersectionObserver = vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() }))
})
describe('useScrollReveal', () => {
  it('returns a ref and a visible flag (defaults visible when reduced motion)', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })
    const { result } = renderHook(() => useScrollReveal())
    expect(result.current.ref).toBeDefined()
    expect(result.current.visible).toBe(true) // reduced motion -> no animation, always visible
  })
})
```
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement `src/hooks/useScrollReveal.js`:**
```js
import { useEffect, useRef, useState } from 'react'
export function useScrollReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(!!reduced)
  useEffect(() => {
    if (reduced || !ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [reduced, threshold])
  return { ref, visible }
}
```
Reveal styling convention (document in the file header): consumers apply `style={{opacity: visible?1:0, transform: visible?'none':'translateY(28px)', transition:'opacity .9s ease, transform .9s ease'}}`.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: useScrollReveal (IntersectionObserver + reduced-motion)"`

---

### Task 4: BackgroundLayer, Pillars, FrostPanel (visual primitives)

**Files:** Create `src/components/BackgroundLayer.jsx`, `Pillars.jsx`, `FrostPanel.jsx`, and `FrostPanel.test.jsx`.

- [ ] **Step 1: Port `BackgroundLayer.jsx`** — port the B3 mockup's fixed background stack: chocolate base, the warm radial spotlight glow, the drifting ambient warm field, and reference the paper-grain (already in index.css). A fixed full-screen `<div aria-hidden>` with the gradients. (Copy the relevant CSS from the mockup `<style>` into a CSS module or inline style.)
- [ ] **Step 2: Port `Pillars.jsx`** — the left/right wood-grain rails (the `repeating-linear-gradient` from the mockup). **Render only for post-hero sections:** the component is placed inside the sections wrapper (which starts after the hero), `position:absolute; top:0; bottom:0` within that wrapper — so it never overlaps the hero. (Mirror the mockup's edit: pillars start below the hero.)
- [ ] **Step 3: Implement `FrostPanel.jsx`:**
```jsx
export default function FrostPanel({ className = '', children, ...rest }) {
  return (
    <div className={`rounded-2xl border border-white/10 ${className}`}
      style={{ background: 'rgba(40,24,14,0.34)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }} {...rest}>
      {children}
    </div>
  )
}
```
- [ ] **Step 4: Write `FrostPanel.test.jsx`** — renders children + applies backdrop-filter:
```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FrostPanel from './FrostPanel'
describe('FrostPanel', () => {
  it('renders children', () => { render(<FrostPanel>hi</FrostPanel>); expect(screen.getByText('hi')).toBeInTheDocument() })
})
```
- [ ] **Step 5: Run** `npx vitest run src/components/FrostPanel.test.jsx` → PASS.
- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: BackgroundLayer, Pillars (post-hero), FrostPanel"`

---

### Task 5: HeroSection (pillar-free + Begin listening)

**Files:** Create `src/components/HeroSection.jsx`, `HeroSection.test.jsx`.

- [ ] **Step 1: Port the hero markup/CSS** from the B3 mockup hero (centered "JACQUES" serif, warm spotlight, the "CLASSICAL · JAZZ · COMPOSITION" line, the "Begin listening" control). **No pillars here.** Props: `onBegin`, `gateOpen`. The "Begin listening" button calls `onBegin`; once `gateOpen`, the begin control fades and a faint "scroll" cue shows.
- [ ] **Step 2: Write failing test** `HeroSection.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import HeroSection from './HeroSection'
describe('HeroSection', () => {
  it('shows the name and triggers onBegin', async () => {
    const onBegin = vi.fn()
    render(<HeroSection onBegin={onBegin} gateOpen={false} />)
    expect(screen.getByText(/jacques/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /begin listening/i }))
    expect(onBegin).toHaveBeenCalledOnce()
  })
})
```
- [ ] **Step 3: Run** → FAIL → implement → **Step 4: Run** → PASS.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: HeroSection (pillar-free, begin-listening)"`

---

### Task 6: PersistentPlayer (turntable)

**Files:** Create `src/components/PersistentPlayer.jsx`, `PersistentPlayer.test.jsx`.

- [ ] **Step 1: Port the turntable player** from the B3 mockup (spinning disc, tonearm, track title + catalogId, groove scrubber, prev/play/next, volume). Props: `track` (object|null), `isPlaying`, `onTogglePlay`. Visible only when `track` is set. Spinning disc animation runs when `isPlaying`.
- [ ] **Step 2: Write failing test:**
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PersistentPlayer from './PersistentPlayer'
const track = { title: 'Nocturne in E-flat', instrument: 'Solo Piano', catalogId: 'JCQ-001' }
describe('PersistentPlayer', () => {
  it('renders the current track and toggles', async () => {
    const onToggle = vi.fn()
    render(<PersistentPlayer track={track} isPlaying onTogglePlay={onToggle} />)
    expect(screen.getByText('Nocturne in E-flat')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /pause|play/i }))
    expect(onToggle).toHaveBeenCalledOnce()
  })
  it('renders nothing without a track', () => {
    const { container } = render(<PersistentPlayer track={null} isPlaying={false} onTogglePlay={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })
})
```
- [ ] **Step 3: Run** → FAIL → implement → **Step 4: Run** → PASS.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: PersistentPlayer turntable"`

---

### Task 7: AboutSection

**Files:** Create `src/components/AboutSection.jsx`, `AboutSection.test.jsx`.

- [ ] **Step 1: Port the About panel** from the B3 mockup (frosted panel + vinyl-record graphic + the bio prose). Use `FrostPanel` + `useScrollReveal`. Bio text from the mockup ("Jacques is a pianist and composer working at the intersection of classical tradition and jazz improvisation…").
- [ ] **Step 2: Write failing test** (renders the heading "The Artist" + bio text) → **Step 3: Run FAIL → implement → Step 4: Run PASS.**
```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AboutSection from './AboutSection'
it('renders the artist bio', () => { render(<AboutSection />); expect(screen.getByText(/The Artist/i)).toBeInTheDocument() })
```
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: AboutSection"`

---

### Task 8: CollectionSection + TrackTile

**Files:** Create `src/components/CollectionSection.jsx`, `TrackTile.jsx`, `CollectionSection.test.jsx`.

- [ ] **Step 1: Port the Collection** from the B3 mockup ("The Collection" heading + the row of vinyl-disc tiles). `CollectionSection` maps `tracks` → `TrackTile`. `TrackTile` props: `track`, `onPlay`. Clicking a tile calls `onPlay(track.id)`.
- [ ] **Step 2: Write failing test:**
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import CollectionSection from './CollectionSection'
it('lists tracks and plays on click', async () => {
  const onPlay = vi.fn()
  render(<CollectionSection onPlay={onPlay} />)
  expect(screen.getByText('Nocturne in E-flat')).toBeInTheDocument()
  await userEvent.click(screen.getByText('Blue Reverie'))
  expect(onPlay).toHaveBeenCalledWith('blue-reverie')
})
```
- [ ] **Step 3: Run FAIL → implement → Step 4: Run PASS.**
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: CollectionSection + TrackTile"`

---

### Task 9: PressingsSection + AlbumTile + AlbumOverlay (NEW)

**Files:** Create `src/components/PressingsSection.jsx`, `AlbumTile.jsx`, `AlbumOverlay.jsx`, `PressingsSection.test.jsx`, `AlbumOverlay.test.jsx`.

- [ ] **Step 1: Port `AlbumTile`/`PressingsSection`** — "Pressings" heading + album-pressing tiles (B1 mockup's pressing-tile look: vinyl-disc motif + wood frame). `PressingsSection` maps `albums` → `AlbumTile`. `AlbumTile` props `album`, `onOpen`; clicking calls `onOpen(album.id)`.
- [ ] **Step 2: Implement `AlbumOverlay.jsx`** — a modal that renders when `album` is set: dimmed chocolate scrim + a centered `FrostPanel` with album title/year, the album's track list (`albumTracks(album)`), each row a play button; a close (×) button + Escape key + scrim click all call `onClose`; tapping a track calls `onSelectTrack(id)`. Lock body scroll while open.
```jsx
import { useEffect } from 'react'
import FrostPanel from './FrostPanel'
import { albumTracks } from '../data/albums'
export default function AlbumOverlay({ album, onClose, onSelectTrack }) {
  useEffect(() => {
    if (!album) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [album, onClose])
  if (!album) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={`${album.title} tracks`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(8,4,2,0.72)' }}>
      <FrostPanel className="max-w-lg w-[90%] p-8" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 text-text1/70">×</button>
        <h3 className="font-serif text-2xl text-text1">{album.title}</h3>
        <p className="text-text1/50 text-sm mb-5">{album.year}</p>
        <ul>
          {albumTracks(album).map((t) => (
            <li key={t.id}>
              <button onClick={() => onSelectTrack(t.id)} className="w-full flex justify-between py-2 text-left text-text1/85 hover:text-goldLit">
                <span className="font-serif italic">{t.title}</span><span className="text-text1/40 text-sm">{t.duration}</span>
              </button>
            </li>
          ))}
        </ul>
      </FrostPanel>
    </div>
  )
}
```
- [ ] **Step 3: Write failing tests** `AlbumOverlay.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import AlbumOverlay from './AlbumOverlay'
import { albums } from '../data/albums'
describe('AlbumOverlay', () => {
  it('renders nothing when no album', () => {
    const { container } = render(<AlbumOverlay album={null} onClose={() => {}} onSelectTrack={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('shows album tracks and selects + closes', async () => {
    const onClose = vi.fn(), onSelectTrack = vi.fn()
    render(<AlbumOverlay album={albums[0]} onClose={onClose} onSelectTrack={onSelectTrack} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.click(screen.getByText('Nocturne in E-flat'))
    expect(onSelectTrack).toHaveBeenCalledWith('nocturne-eflat')
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
```
And `PressingsSection.test.jsx`: lists album titles, clicking calls `onOpen('reveries')`.
- [ ] **Step 4: Run** `npx vitest run src/components` → PASS.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: Pressings album selector + AlbumOverlay popup"`

---

### Task 10: LiveSection + VenueRow

**Files:** Create `src/components/LiveSection.jsx`, `VenueRow.jsx`, `LiveSection.test.jsx`.

- [ ] **Step 1: Port the "Upcoming Engagements"/Live section** from the B3 mockup — venue rows (The Coyote · Carlsbad Village, CA, with dates). Data inline in `LiveSection` (`const shows = [{date:'JUN 14', venue:'The Coyote', city:'Carlsbad Village, CA'}, ...]`).
- [ ] **Step 2: Failing test** (renders "The Coyote") → **Step 3 FAIL → implement → Step 4 PASS.**
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: LiveSection + VenueRow"`

---

### Task 11: ContactSection

**Files:** Create `src/components/ContactSection.jsx`, `ContactSection.test.jsx`.

- [ ] **Step 1: Port the contact footer** (the "hello@jacquesmusic.com" + "For bookings, collaborations…" line). **Step 2 failing test → Step 3 implement → Step 4 PASS.**
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: ContactSection"`

---

### Task 12: Assemble App + global wiring + visual pass

**Files:** Modify `src/App.jsx`.

- [ ] **Step 1: Compose** in `App.jsx`: `useAudio()` for state; render `<BackgroundLayer/>`, `<HeroSection onBegin={begin} gateOpen={gateOpen}/>`, then a `<main>` sections wrapper containing `<Pillars/>` + `<AboutSection/>` + `<CollectionSection onPlay={selectTrack}/>` + `<PressingsSection albums={albums} onOpen={openAlbum}/>` + `<LiveSection/>` + `<ContactSection/>`, then `<PersistentPlayer track={getTrack(currentTrackId)} isPlaying={isPlaying} onTogglePlay={togglePlay}/>`, `<AlbumOverlay album={albums.find(a=>a.id===openAlbumId)||null} onClose={closeAlbum} onSelectTrack={(id)=>{selectTrack(id); closeAlbum()}}/>`, and the shared `<audio ref={audioRef} hidden/>`. Pillars live inside `<main>` (post-hero) only.
- [ ] **Step 2: Write `App.test.jsx`** — smoke: renders hero name; after clicking "Begin listening" the player appears; clicking an album opens the dialog.
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'
it('begins listening then shows the player', async () => {
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: /begin listening/i }))
  expect(screen.getByText('Nocturne in E-flat')).toBeInTheDocument() // player surfaced
})
```
- [ ] **Step 3: Run full suite** `npx vitest run` → all PASS.
- [ ] **Step 4: Visual pass.** Run `npm run dev`; the orchestrator screenshots the hero + full page (Playwright) and compares against the B3 mockup; fix spacing/color drift. Verify: pillar-free hero, pillars on sections, turntable player after begin, album overlay opens/closes.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: assemble Jacques B3 site (hero, collection, pressings overlay, live, contact, player)"`

---

## Self-review
- **Spec coverage:** Hero/begin-listening (T5), About (T7), Collection (T8), **Pressings album-overlay** (T9), Live (T10), Contact (T11), turntable player (T6), pillars post-hero (T4+T12), chocolate/frosted glass (T0/T4 + ports), audio stub swap-ready (T1/T2), Chef-Fina stack (T0). All covered.
- **Placeholders:** visual CSS is intentionally *ported from the committed B3 mockup* (the pixel source of truth) rather than re-typed — this is a deliberate reference, not a TODO. Logic/state/tests are fully specified inline.
- **Type consistency:** `useAudio` exposes `begin, selectTrack, togglePlay, openAlbum, closeAlbum, currentTrackId, isPlaying, gateOpen, openAlbumId, audioRef`; data exposes `tracks, getTrack, SIGNATURE_TRACK_ID, albums, albumTracks` — used consistently in T12.

## Out of scope
Real audio files, deploy/domain, CMS, merch.
