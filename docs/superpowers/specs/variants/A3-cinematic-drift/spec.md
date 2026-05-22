# A3 — Cinematic Drift

## Concept & Mood

This is the atmosphere pushed to its limit. Where the Base A dreamscape grounds the visitor with a focused spotlight and readable panels, A3 dissolves the ground entirely — you are inside the warm chocolate haze, not looking at it. Three to four translucent depth planes overlap across the field: a far background of near-black chocolate, a mid-atmosphere of slow-drifting amber bloom, a near plane of frosted panels floating without anchoring shadows, and a foreground of barely-visible UI chrome. The result feels less like a website and more like a memory of a late-night session: warm, vast, softly lit, slightly out of time.

## Begin-Listening Moment

The visitor lands on darkness. Deep chocolate-black, near-silent. A wide luminous amber bloom — not a tight spotlight, a field — gently glows at center-screen, diffuse and enormous (covering ~60% of viewport width). "JACQUES" sits inside that bloom in very large tracked serif, its edges already partly absorbed by the warm haze — letter-spacing so wide the name nearly dissolves into the space between letters. A hairline amber line, barely there. "Begin listening" in near-invisible tracked caps, a whisper. On click: the name opacity drops to zero while filter:blur grows from 0 to 32px simultaneously over 1.6s; the warm bloom brightens once then settles; the bottom player rises; scroll unlocks.

## Palette

| Role | Hex |
|---|---|
| Background abyss | `#0a0603` |
| Background deep | `#0f0805` |
| Background shadow layer | `#160d08` |
| Mid-field haze layer | `#1e1208` |
| Warm amber bloom (primary) | `#c8893a` |
| Hot bloom center | `#e8b060` |
| Aged amber (far atmosphere) | `#a06828` |
| Deep ember (low atmosphere) | `#7a4e1a` |
| Glass panel surface | `rgba(255, 235, 210, 0.035)` |
| Glass panel hover | `rgba(255, 235, 210, 0.072)` |
| Glass border (hairline) | `rgba(200, 160, 100, 0.10)` |
| Glass inner highlight | `rgba(255, 220, 160, 0.05)` |
| Text primary | `#f0e8dc` |
| Text secondary | `#7a6a58` |
| Text ghost (UI labels) | `rgba(138, 122, 104, 0.40)` |
| Wood dark grain | `#1e1008` |
| Wood mid grain | `#3c2010` |
| Wood lit grain | `#6c3d18` |

## Typography

- **Display / "JACQUES":** `Georgia, 'Times New Roman', serif` — very large (8–9 vw), letter-spacing `0.44em`, weight 400, all-caps; text-shadow is a wide diffuse amber glow (not tight); the name reads as atmosphere, not label
- **Section headings:** same serif, 1.6–1.9 rem, letter-spacing `0.12em`, amber-tinted barely (`#d4a06a`)
- **Nav / labels / CTA:** `system-ui, Arial, sans-serif` — all-caps, tracked wide (`0.28em`), weight 200, near-ghost opacity (`0.35–0.45`)
- **Body / track meta:** same sans, normal case, weight 400, `var(--text-2)`, line-height 1.9, smaller (13–14px)
- **Track titles:** serif italic — warm, unhurried

## Frosted Glass + Wood Treatment

**Depth planes are the organizing principle, not panels-on-dark.** Each glass surface blurs more aggressively (`backdrop-filter: blur(28px) saturate(1.2)`) and uses a lower surface opacity so the warm background field shows through strongly. Borders are near-invisible hairlines (`rgba(200, 160, 100, 0.10)`) — panels float rather than frame. No drop shadows. Depth is implied by scale: hero text is enormous (near-plane), Library cards are slightly smaller (mid-plane), about text is intimate (far-plane suggestion). The overall read: layers of gauze in warm candlelight.

**Wood accent:** the left-edge pillar from Base A is retained but reduced to 3px and dropped to 45% opacity — it should register as texture, not structure. Card left-border wood accents are kept at 2px, 50% opacity.

## Motion Feel (Static Frame Implication)

In a live build: three ambient radial layers drift on 18s, 24s, and 32s loops at different x/y offsets, never aligning. In the static mockup: the three layers are rendered at a single moment where the largest bloom is slightly off-center-right and the secondary bloom drifts lower-left — so the field reads as mid-drift, not centered/symmetrical. The Library cards are rendered at slight vertical scale variation (the 3rd card fractionally smaller, suggesting parallax depth). The hero name has letter-spacing wide enough that in the still frame it appears to be in the act of dissolving — on the threshold.

## Section Interpretations

| Section | Interpretation |
|---|---|
| **Hero** | Full-bleed chocolate abyss + enormous off-center warm bloom; "JACQUES" with 0.44em letter-spacing absorbing into the field; near-invisible CTA whisper; atmospheric dominance — UI serves the field, not the reverse |
| **Library** | Cards emerge out of the haze with almost no hard edge — low glass opacity, aggressive blur, large warm background field visible through them; cards feel discovered, not displayed |
| **About** | Single wide frosted panel floating in the mid-field; bio as liner-note prose; warm amber left-corner bleed bled further (larger radius, lower opacity) so the panel barely separates from the field |
| **Live** | Minimal glass strip — dates and venue names at maximum restraint, amber rule lines nearly invisible; the data feels found in the atmosphere rather than presented |
| **Contact** | Two lines in near-darkness; email in amber at low opacity until hover; the note-left-on-a-piano-bench interpretation taken to its quietest extreme |
