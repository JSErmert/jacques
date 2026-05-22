# Direction 2 — Concert-Hall Noir

## Concept / Mood

The visitor enters a concert hall in the moment just before the performance begins — house lights dropped to nothing, a single warm spotlight cutting through the dark, the whole room holding its breath. Everything is shadow except the name "Jacques," illuminated as if by that one beam of theatrical light; the darkness is not empty but weighted, reverent, expectant. This is cinematic stillness, not minimalism for its own sake — the black earns its space by making every lit detail feel precious.

---

## Begin-Listening Moment

The hero loads to near-total darkness. After a half-second pause, a slow radial glow blooms from behind the name "Jacques" — soft amber-gold, as if a spotlight is rising from above. The name itself is set large and still, no animation, just suddenly visible as the light arrives. Below it, in fine spaced capitals, "Begin listening" sits in a dim cool-white — a stage direction, not a button. On click, a CSS pulse ripples outward from the text (simulating a spotlight expanding), and the music begins. The whole effect evokes a conductor stepping into position: anticipation, then presence.

---

## Palette

| Role | Hex | Note |
|---|---|---|
| Base black | `#0a0a0b` | Near-absolute; ink, not gray |
| Deep shadow | `#111114` | Slight blue-black tint; depth without coldness |
| Spotlight amber | `#c8922a` | Warm theatrical gold; the single light source |
| Spotlight glow | `#f0c060` | Hotspot at center of radial; slightly brighter |
| Cool frost | `#b8c4d0` | Glass panels catch a cold secondary bounce light |
| Body text / caption | `#7a8494` | Muted cool-gray; recedes into shadow |
| High-contrast text | `#e8e2d6` | Off-white, slightly warm; comfortable on dark |
| Wood walnut dark | `#2c1f14` | Near-black brown; only readable where spotlight touches |
| Wood walnut lit | `#5c3d22` | Mid-brown where the column edge catches the beam |

---

## Typography

- **Display / Name:** `Georgia, 'Times New Roman', serif` — large, wide letter-spacing (`0.18em`), normal weight; the name is not bold, it is present
- **Section headings:** same serif family, smaller, letter-spacing `0.12em`, subdued amber tint
- **Navigation / labels / "Begin listening":** `system-ui, Arial, sans-serif` — all caps, tracked wide (`0.25em`), weight 300; whisper-weight
- **Body / captions:** same sans-serif, normal case, weight 400, cool-gray, generous line-height (`1.8`)
- **Track titles:** serif italic, slightly indented, dimly lit until hover brings a subtle amber underline

---

## Frosted Glass + Wood Treatment

**Glass panels:** `background: rgba(14, 16, 22, 0.55)` with `backdrop-filter: blur(18px)`. The frost is cool-tinted (blue-gray undertone), not warm — it reads like cold theater air. Border: `1px solid rgba(184, 196, 208, 0.08)` — barely visible edge, a whisper of structure. Panels float without drop shadows; depth comes from the ambient darkness surrounding them.

**Wood accent:** A single vertical column edge runs the left margin — a narrow strip (`12px` wide) of dark walnut texture achieved via a CSS `linear-gradient` banding pattern (dark stripes simulating grain). Where the spotlight radial reaches it, the column lightens to `#5c3d22`; in shadow it is nearly invisible at `#2c1f14`. It does not repeat or tile; it is one column, one edge, one presence — like the wing of a Steinway just catching the light.

---

## Scroll / Motion Feel

Scroll is slow and deliberate. Sections do not snap — they breathe into view. Content panels fade up (`opacity 0 → 1`, `translateY 20px → 0`) on scroll-enter with a `0.9s ease-out` delay. The spotlight radial gradient on the hero subtly shifts position by `~5px` as the user scrolls the first 100px (parallax via CSS `background-position`), giving the impression that the beam of light holds its ground as the hall moves. The persistent bottom music player appears with a `blur(20px)` frosted strip, floating above the content without intruding.

---

## Section Interpretations

| Section | Interpretation |
|---|---|
| **Hero** | The concert hall at the moment of ignition — one name, one light, infinite dark |
| **About** | A quiet dressing-room card; warm text in a cool-frost panel; the story behind the spotlight |
| **Library** | Track cards like a setlist posted backstage — rows of titles in dim serif, a play icon that glows amber on hover |
| **Live** | Venue details on a near-black card; location names in tracked caps; an amber rule underlines each date |
| **Contact** | A single centered address block in cold gray — like a card left on a conductor's stand |
