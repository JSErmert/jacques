# Direction 4 — Dreamscape Ambient

## Concept & Mood

Music made visible as atmospheric light: the page exists inside a slowly breathing luminous dark field — soft aurora-like glows drift across the background, blending warm amber and cool indigo the way candlelight does in a concert hall at night. Content panels float in this haze rather than sitting on it, as if suspended mid-dream. The experience is closer to closing your eyes and listening than to browsing a website.

## Palette

| Role | Hex |
|---|---|
| Background base | `#08090f` |
| Warm light echo (amber/gold) | `#c8873a` |
| Cool light echo (indigo/slate) | `#3a5fc8` |
| Accent violet-lilac | `#8a6fc8` |
| Glass panel surface | `rgba(255,255,255,0.05)` |
| Glass border | `rgba(255,255,255,0.10)` |
| Text primary | `#f0ede8` |
| Text secondary | `#8a8880` |
| Wood grain accent | `#5c3d1e` (base) with `rgba(255,220,160,0.15)` light bleed |

## Typography

- **Display / name "Jacques"**: `Georgia, 'Times New Roman', serif` — large, tracked wide (letter-spacing 0.25em), feather-light weight for the hero; standard weight for section headers.
- **Body / labels / nav**: `system-ui, Arial, sans-serif` — small, neutral, generous line-height (1.8).
- Hero name renders at ~6–8 vw; on the Begin Listening trigger it dissolves via opacity+blur CSS transition (opacity 1→0, filter blur 0→16px over 1.2s) while the glowing field brightens.

## Begin Listening Moment

The visitor arrives on a still dark field with a single soft warm glow at center. "Jacques" sits in the middle, serif, luminous. Beneath it: "Begin listening" in small spaced sans-serif, a faint underline the only call to action. On click: the name dissolves into the ambient field (CSS transition: opacity + blur fade), the background glows pulse once with expanded radial light, and the persistent bottom player materializes (slides up from below). The rest of the page becomes scrollable. The moment is a threshold, not a button press.

## Frosted Glass Treatment

All content panels use `backdrop-filter: blur(18px) saturate(1.4)` with a near-transparent white surface (`rgba(255,255,255,0.05)`) and a hairline border (`rgba(255,255,255,0.10)`). Panels have generous border-radius (16–20px) and a faint inner shadow that suggests depth without weight. On hover, glass brightens fractionally (`rgba(255,255,255,0.09)`).

## Wood Accent

A narrow vertical "sculpture pillar" runs along the left edge — approximately 4px wide, full viewport height, rendered as a CSS linear-gradient simulating grain (warm browns `#5c3d1e → #8c6030 → #3c2010`). It fades into the ambient haze at top and bottom via a transparent gradient mask, as if the pillar is half-dissolved. It reappears subtly as a decorative left border on Library track cards.

## Scroll / Motion Feel

The background generative field uses CSS `@keyframes` to slowly drift two radial gradient layers on a ~12s loop — one warm, one cool — offset so they never fully align. No jarring transitions. As sections enter the viewport, panels fade in from slight vertical offset (transform: translateY(24px) → 0; opacity 0→1; 0.7s ease). The scroll itself is `scroll-behavior: smooth`. Everything reads as a single continuous dream, not a sequence of pages.

## Section Interpretations

| Section | Direction Interpretation |
|---|---|
| **Hero** | Black field + one warm glow; name dissolves on click; absolute stillness before the music begins |
| **About** | Frosted panel, wide-set, with a faint warm gradient bleed left — intimate; bio reads like liner notes |
| **Library** | A column of frosted track cards with the wood-grain left border accent; "stream only" tracks marked with a faint lock glyph in the secondary palette |
| **Live** | Minimal list inside a single tall glass panel; venue names in serif, dates in sans; the ambient field cools slightly (more indigo) in this section |
| **Contact** | Sparse — two lines of text, one mailto link, deep in the haze; feels like a note left on a piano bench |
