# Base B — Noir-Led (Fusion)

## Concept / Mood

The visitor enters a recital hall in the instant before the first note — house lights extinguished, a single warm spotlight pooling out of deep chocolate shadow onto the name "Jacques," the whole room holding a reverent hush. Variant 2's theatrical near-darkness is the load-bearing foundation: cinematic, sparse, minimal-high-contrast, with lots of earned negative dark space. Over that Variant 4's ambient reverie breathes in: a faint warm chocolate-gold haze drifts softly through the black, frosted-glass panels float as if suspended mid-dream, and the scroll has a gentle, unhurried drift rather than a hard architectural snap. Cinematic and quiet first; dreamlike and soft second — the mirror of Base A.

---

## Begin-Listening Moment

Hero loads to near-total deep chocolate darkness (`#0f0805`). After a half-second pause, a radial amber-chocolate glow rises slowly from above and behind the name "Jacques" — a warm spotlight blooming from the dark, not a flash. The name sits large, still, unhurried — it does not animate, it simply becomes visible as the light arrives. Below it, a thin amber gradient rule, then "Begin listening" in dim spaced caps — a stage direction. On hover, a fine amber underline materialises. On click, a soft pulse ring ripples outward (CSS radial, warm amber-chocolate at low opacity), and the frosted bottom player slides up from below. Static frame intent: the spotlight glow is fully baked into static CSS — no animation required for the frame to read as gorgeous.

---

## Palette

| Role | Hex | Note |
|---|---|---|
| Base black | `#0f0805` | Deep rich chocolate-black; aged wood in total darkness |
| Deep shadow | `#160d08` | Secondary layer; warm near-black, not cool |
| Lifted shadow | `#1d1109` | Panel surfaces, card backgrounds |
| Spotlight amber-gold | `#c8892a` | Single warm light source; chocolate-gold, not harsh brass |
| Spotlight hot center | `#e8b050` | Hotspot at radial center; candlelight warmth |
| Warm haze echo | `rgba(180,110,30,0.10)` | Ambient field diffusion; barely-there breathing layer |
| Frosted glass | `rgba(29,20,12,0.58)` | Warm-dark panel; aged-wood undertone, not cool-blue |
| Frosted glass border | `rgba(200,140,60,0.08)` | Barely visible amber hairline; warmth, not ice |
| Body text | `#7a7068` | Muted warm-gray; recedes into the chocolate dark |
| High-contrast text | `#ede6d8` | Warm off-white; like aged paper in candlelight |
| Wood walnut dark | `#2c1a0e` | Column accent in shadow |
| Wood walnut lit | `#5c3520` | Column edge where spotlight grazes it |

---

## Typography

- **Display / Name:** `Georgia, 'Times New Roman', serif` — 108px, letter-spacing `0.18em`, weight 400; the name is not bold, it is present; warm amber text-shadow at low opacity
- **Section headings:** same serif, 28–32px, letter-spacing `0.10em`, subdued amber tint
- **Navigation / labels / "Begin listening":** `system-ui, Arial, sans-serif` — all caps, tracked `0.28–0.36em`, weight 300; whisper-weight stage directions
- **Body / captions:** same sans-serif, normal case, weight 400, warm-gray (`#7a7068`), line-height `1.8`
- **Track titles:** serif italic, slightly indented in setlist rows; amber underline emerges on hover

---

## Frosted Glass + Wood Treatment

**Glass panels:** `background: rgba(29, 20, 12, 0.58)` with `backdrop-filter: blur(18px)`. The frost is warm-dark (chocolate undertone), not the cool blue-gray of Variant 2's theater air — it reads like the felt-covered stage floor. Border: `1px solid rgba(200, 140, 60, 0.08)` — barely visible warm hairline. Panels float without drop shadows; depth is the surrounding darkness. On hover: border brightens fractionally to `rgba(200, 140, 60, 0.16)`.

**Wood accent:** A single narrow vertical column (`12px`) runs the left margin — CSS `repeating-linear-gradient` simulating walnut grain (dark chocolate stripes). Where the hero spotlight radial reaches it, the column edge lightens to `#5c3520`; deep in shadow it is nearly invisible at `#2c1a0e`. Variant 4's wood pillar reappears as a thin `3px` left-border accent on track cards, fading to transparent at top and bottom.

**Ambient breathing layer:** A faint warm-chocolate radial gradient drifts on a slow `14s` CSS animation loop — warm amber centered behind the hero name, diffusing outward into the black. Opacity stays low (`0.08–0.14`). The static frame sees it at its natural mid-point — already gorgeous without motion.

---

## Scroll / Motion Feel

Scroll is slow and deliberate — Variant 2's reverence. Sections breathe into view: `opacity 0→1`, `translateY 20px→0`, `0.9s ease-out`. The hero spotlight radial subtly shifts `~5px` on first `100px` of scroll (CSS background-position parallax), giving the sense the light holds ground as the hall moves. The ambient drift layer floats behind everything as a fixed field. Content panels do not snap — they surface from the dark like objects becoming visible as the eye adjusts.

---

## Section Interpretations

| Section | Interpretation |
|---|---|
| **Hero** | Deep chocolate-black with a single warm spotlight pooling on "Jacques" out of the dark; faint ambient warm haze breathes behind; reverent stillness |
| **Library** | A restrained backstage setlist — frosted warm-dark rows of serif italic track titles, wood-grain left border accent, amber play icon on hover; Variant 2's setlist discipline, with Variant 4's floating-glass softness |
| **About** | A quiet dressing-room card: frosted panel with a faint warm bleed left; bio in warm-gray body text on chocolate-dark glass; surfaces from the dark on scroll |
| **Live** | Minimal — venue and date lines on a near-black warm card; amber rule underlines each date; "The Coyote, Carlsbad Village" in tracked serif caps |
| **Contact** | A single centered address block in muted warm-gray — like a card left on the conductor's piano bench, deep in the haze |
