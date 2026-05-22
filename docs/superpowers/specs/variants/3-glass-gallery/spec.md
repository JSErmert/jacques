# Direction 3 — Glass Gallery

## Concept / Mood

A gallery of light — as though Jacques's music exists inside a museum of sound, where the walls are frosted glass and the air is still. The atmosphere is graphite-cool and architectural: generous negative space, crisp edges, and panels that float rather than sit. The warmth is a single vertical wood rail — a single breath of mahogany against the cool grey — restoring the human hand in a space that could otherwise feel too perfect.

## Begin-Listening Moment

The hero is a full-viewport graphite field. The name "Jacques" appears centered in large serif — unhurried, no animation. Below it, a perfectly-proportioned frosted-glass card (roughly 420×160 px) floats at mid-screen, containing only a circular play affordance and the line "Begin listening." On click, the music starts and the card's glass brightens almost imperceptibly. Nothing else moves. The entry is a pause, not a transition.

## Palette

| Role | Hex |
|---|---|
| Base (graphite) | `#1A1C1F` |
| Surface dark | `#212428` |
| Glass tint | `rgba(255,255,255,0.06)` |
| Glass border | `rgba(255,255,255,0.12)` |
| Glass highlight | `rgba(255,255,255,0.18)` |
| Wood rail | `#6B4226` (dark mahogany) |
| Wood grain light | `#8B5E3C` |
| Text primary | `#F0EDE8` (warm white) |
| Text secondary | `#8E8E93` (graphite-grey) |
| Accent/active | `#C8B89A` (pale gold) |
| Player bar | `#0D0F11` |

## Typography

- **Display (name, section titles):** `Georgia, 'Times New Roman', serif` — light weight, generous tracking (`letter-spacing: 0.08em`), no bold. The name "Jacques" at ~96px on hero.
- **Body / UI:** `system-ui, Arial, sans-serif` — 15–16px, weight 300–400, `letter-spacing: 0.02em`.
- **Track titles:** serif at ~18px. Labels and metadata in sans at 13px, `#8E8E93`.

## Frosted Glass Treatment

Every content panel is a frosted-glass card: `background: rgba(255,255,255,0.06)`, `backdrop-filter: blur(20px) saturate(160%)`, `border: 1px solid rgba(255,255,255,0.12)`, `border-radius: 16px`. Hover state lifts the glass slightly (`rgba(255,255,255,0.10)`, `box-shadow: 0 8px 32px rgba(0,0,0,0.4)`). The hero begin-listening card is slightly brighter glass (`rgba(255,255,255,0.10)`) to read as the primary object.

## Wood Accent

One slim vertical rail — `8px` wide, full viewport height, fixed to the left edge of the content column. Dark mahogany (`#6B4226`) with a subtle CSS `linear-gradient` to simulate grain. No other wood surface exists anywhere in the design.

## Scroll / Motion Feel

Scroll is linear, no parallax heaviness. Each section fades in from `opacity: 0, translateY(24px)` to resting state as it enters the viewport (`IntersectionObserver`, 400ms ease-out). The persistent player bar at bottom is `8px` tall collapsed and `72px` expanded — frosted glass on the darkest base, matching the hero card material. No bouncing, no gestures, no horizontal motion. Stillness is the scroll idiom.

## Section Interpretations

| Section | Treatment |
|---|---|
| **Hero** | Full-viewport graphite field; name in large serif; one floating glass play card |
| **About** | Single wide frosted panel, centered, portrait photo on left (glass-masked circle), 3–4 lines of biography on right |
| **Library** | Clean 3-column track grid of equal-height glass cards; each card: track title (serif), duration, a minimal play button; unreleased tracks carry a subtle "Stream only" label |
| **Live** | Narrow list of upcoming dates — each date row is a low-profile glass strip with venue name, date, city; "The Coyote, Carlsbad Village" as first entry |
| **Contact** | Minimal frosted form panel with two fields (Name, Email) + a message area; one pale-gold submit button; no decorative elements |
