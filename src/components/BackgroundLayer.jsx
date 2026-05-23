// Fixed full-screen background: chocolate base + proscenium spotlight cone +
// warm ambient field + drifting animations. Paper grain is in index.css (body::after).
// All visual CSS ported from docs/superpowers/specs/variants/B3-archive-stage/mockup.html.

const styles = `
  @keyframes driftWarm {
    0%   { transform: translate(0%,0%) scale(1.00); opacity: 1.0; }
    33%  { transform: translate(1%,-2%) scale(1.02); }
    66%  { transform: translate(-1%,3%) scale(0.98); }
    100% { transform: translate(1%,-4%) scale(1.04); opacity: 0.84; }
  }
  @keyframes driftCool {
    0%   { transform: translate(0%,0%) scale(1.00); opacity: 0.88; }
    40%  { transform: translate(-2%,2%) scale(1.03); }
    70%  { transform: translate(2%,-3%) scale(0.97); }
    100% { transform: translate(-1%,4%) scale(1.05); opacity: 1.0; }
  }
  @keyframes centerPulse {
    0%   { opacity: 0.55; transform: translate(-50%,-50%) scale(0.94); }
    100% { opacity: 1.0;  transform: translate(-50%,-50%) scale(1.07); }
  }
  .bg-ambient-before {
    content: '';
    position: absolute;
    inset: -30%;
    background:
      radial-gradient(ellipse 56% 42% at 50% 54%, rgba(200,137,58,0.14) 0%, transparent 70%),
      radial-gradient(ellipse 36% 50% at 50% 28%, rgba(160,104,40,0.09) 0%, transparent 65%),
      radial-gradient(ellipse 26% 28% at 50% 82%, rgba(120,70,20,0.07) 0%, transparent 60%);
    animation: driftWarm 14s ease-in-out infinite alternate;
  }
  .bg-ambient-after {
    content: '';
    position: absolute;
    inset: -30%;
    background:
      radial-gradient(ellipse 44% 52% at 50% 44%, rgba(160,104,40,0.08) 0%, transparent 62%),
      radial-gradient(ellipse 48% 35% at 50% 72%, rgba(120,70,20,0.07) 0%, transparent 58%);
    animation: driftCool 18s ease-in-out infinite alternate-reverse;
  }
`

export default function BackgroundLayer() {
  return (
    <>
      <style>{styles}</style>
      {/* Chocolate base */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: '#0f0805',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient warm field — two drifting layers via SVG (matches mockup exactly) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Layer 1 — centered symmetric drift */}
        <div style={{
          position: 'absolute',
          inset: '-30%',
          background: [
            'radial-gradient(ellipse 56% 42% at 50% 54%, rgba(200,137,58,0.14) 0%, transparent 70%)',
            'radial-gradient(ellipse 36% 50% at 50% 28%, rgba(160,104,40,0.09) 0%, transparent 65%)',
            'radial-gradient(ellipse 26% 28% at 50% 82%, rgba(120,70,20,0.07) 0%, transparent 60%)',
          ].join(','),
          animation: 'driftWarm 14s ease-in-out infinite alternate',
        }} />
        {/* Layer 2 — deeper offset */}
        <div style={{
          position: 'absolute',
          inset: '-30%',
          background: [
            'radial-gradient(ellipse 44% 52% at 50% 44%, rgba(160,104,40,0.08) 0%, transparent 62%)',
            'radial-gradient(ellipse 48% 35% at 50% 72%, rgba(120,70,20,0.07) 0%, transparent 58%)',
          ].join(','),
          animation: 'driftCool 18s ease-in-out infinite alternate-reverse',
        }} />

        {/* Soft spotlight beam — believable stage light from above, built
            from elliptical CSS gradients (no hard polygon cone). The narrow
            inner core + wider halo creates the directional beam read; the
            floor pool gives it somewhere to land. Reads as gradient and
            realistic at every scroll position — hero or below. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: [
              // Inner bright core — tall narrow beam from above
              'radial-gradient(ellipse 14% 68% at 50% -6%, rgba(232,176,96,0.32) 0%, rgba(200,137,58,0.16) 24%, rgba(160,104,40,0.06) 56%, transparent 82%)',
              // Mid halo around the beam — softens the cone edges
              'radial-gradient(ellipse 32% 72% at 50% -4%, rgba(200,137,58,0.13) 0%, rgba(160,104,40,0.05) 44%, transparent 78%)',
              // Wider diffuse warmth — ambient room
              'radial-gradient(ellipse 62% 58% at 50% -8%, rgba(160,104,40,0.06) 0%, transparent 65%)',
              // Stage floor pool — where the beam lands
              'radial-gradient(ellipse 30% 16% at 50% 100%, rgba(200,137,58,0.11) 0%, rgba(160,104,40,0.04) 50%, transparent 78%)',
              // Center ambient — soft warmth in the middle of the scene
              'radial-gradient(ellipse 58% 52% at 50% 48%, rgba(160,104,40,0.05) 0%, transparent 70%)',
              // Side washes — barely-there room ambiance
              'radial-gradient(ellipse 28% 48% at 3% 56%, rgba(138,74,24,0.06) 0%, transparent 76%)',
              'radial-gradient(ellipse 28% 48% at 97% 56%, rgba(138,74,24,0.06) 0%, transparent 76%)',
            ].join(','),
          }}
        />
      </div>
    </>
  )
}
