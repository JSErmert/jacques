# Jacques

A music artist site for the composer / pianist **Jacques** — single-listen browsing, persistent playback, album program-notes modal, and live-dates.

**Live (preview):** _pending Vercel deploy_
**Production:** _pending custom domain_

---

## What it is

A fully client-side React + Vite music artist site. One audio element shared across the whole UI; a fixed bottom player that follows the user across sections; a hero gate ("Begin Listening") that opens the player when the user enters the experience.

No backend. No accounts. No analytics. No trackers. No cookies.

---

## Tech stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 3 + inline component styles
- **Tests:** Vitest 4 + Testing Library + jsdom
- **Lint:** ESLint 9 (flat config) + `eslint-plugin-react-hooks`
- **Deploy:** Vercel (`framework: vite`, static SPA)
- **CI/CD:** GitHub Actions — lint + Vitest + Vite build + Trivy filesystem scan + gitleaks
- **Hooks:** Husky + lint-staged + local gitleaks (graceful skip if not installed)

Full architecture: [`ARCHITECTURE.md`](./ARCHITECTURE.md).
Security policy + pre-commit review checklist: [`SECURITY.md`](./SECURITY.md).

---

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

To test on a phone over the network, expose with ngrok (allowlisted in `vite.config.js`):

```bash
ngrok http 5173
```

### Environment variables

None. The site has no API keys, no secrets, no `.env.local`.

---

## Production build

```bash
npm run build
npm run preview
```

Build output lands in `dist/`. Bundle size as of the latest commit: ~73 kB gzipped JS + ~2.3 kB gzipped CSS.

---

## Tests

```bash
npm test          # one-shot Vitest run (used in CI + pre-commit)
npm run test:watch
```

37 tests across 15 files cover: app composition, every section component, every interactive element (player, navbar scroll state, album modal, track tile hover/play), data layer, scroll-reveal hook.

---

## Deployment

Push to `main` → Vercel auto-deploys. PRs get unique preview URLs. No manual deploy step.

GitHub Actions runs on every push/PR:

1. `validate` — ESLint, Vitest, Vite build
2. `security` — Trivy filesystem scan, SARIF uploaded to GitHub Security tab (blocks merge on HIGH / CRITICAL)
3. `secrets` — gitleaks full-history scan

Pre-commit (local):

1. `lint-staged` — ESLint `--fix` on staged JS/JSX
2. `vitest run` — full suite
3. `gitleaks protect --staged` — secret pattern scan on staged changes (gracefully skipped if not on PATH; CI catches the gap)

---

## Repository structure

```
jacques/
├── public/                 # static assets (audio/ pending real files, favicon TBD)
├── src/
│   ├── App.jsx             # root composition; wires global audio state to sections
│   ├── main.jsx            # ReactDOM entry
│   ├── index.css           # Tailwind import + global paper-grain + base typography
│   ├── components/         # 14 components (each with a sibling .test.jsx)
│   ├── data/               # tracks + albums (current stub data — see ARCHITECTURE §3)
│   ├── hooks/              # useScrollReveal
│   └── state/              # useAudio (single source of truth for playback)
├── docs/                   # design specs and B3-archive-stage mockups
├── .github/
│   ├── workflows/ci.yml    # lint + test + build + Trivy + gitleaks
│   └── dependabot.yml      # weekly grouped npm + github-actions updates
├── .husky/pre-commit       # local hook (lint-staged + tests + gitleaks)
├── ARCHITECTURE.md
├── SECURITY.md
├── README.md
├── eslint.config.js
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js          # ngrok allowedHosts, vitest config
├── vercel.json             # framework + HTTP security headers
└── package.json
```

---

## What's placeholder right now

The site is structurally complete but content is stubbed pending the artist's deliverables:

- **Audio files** — `public/audio/` is empty; `tracks.js` `src: null` for every track. The player is wired to no-op silently when `src` is null, so the UI is fully exercisable without real audio.
- **Track titles + metadata** — stub values in `src/data/tracks.js`.
- **Bio / About copy** — stub paragraph in `AboutSection.jsx`.
- **Contact email** — `hello@jacquesmusic.com` is a placeholder.
- **Live dates** — stub venue entries in `LiveSection.jsx`.
- **Favicon + OG image** — TBD.
- **Domain** — `jacquesmusic.com` not yet registered.

Swapping in real content is a data-layer edit only (no component changes required).

---

## License

Private. All rights reserved.

---

## Maintainer

Joshua Ermert · [jseermert@gmail.com](mailto:jseermert@gmail.com)

For security issues, see [`SECURITY.md`](./SECURITY.md) §10.
