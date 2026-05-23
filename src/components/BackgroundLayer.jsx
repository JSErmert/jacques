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

        {/* Atmospheric lighting — soft radial blobs only, no hard cone polygons.
            The old proscenium polygons read as a "cheap spotlight" once the
            hero scrolled out from under them; this gradient-only approach
            stays gradient and realistic at every scroll position. */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 1 }}
          aria-hidden="true"
        >
          <defs>
            {/* Soft warm spotlight from above — replaces the hard polygons.
                Centered just above the viewport so the falloff carries warmth
                gently down through the whole scene. */}
            <radialGradient id="rg-spotlight" cx="50%" cy="-8%" r="62%">
              <stop offset="0%"   stopColor="#e8b060" stopOpacity="0.22"/>
              <stop offset="22%"  stopColor="#c8893a" stopOpacity="0.10"/>
              <stop offset="55%"  stopColor="#a06828" stopOpacity="0.04"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            {/* Center ambient pool — wide, very soft */}
            <radialGradient id="rg-center" cx="50%" cy="48%" r="52%">
              <stop offset="0%"   stopColor="#c8893a" stopOpacity="0.12"/>
              <stop offset="48%"  stopColor="#a06828" stopOpacity="0.05"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            {/* Floor warmth — soft pool, no hard ellipse edges */}
            <radialGradient id="rg-floor" cx="50%" cy="104%" r="60%">
              <stop offset="0%"   stopColor="#c8893a" stopOpacity="0.10"/>
              <stop offset="55%"  stopColor="#a06828" stopOpacity="0.04"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            {/* Side washes — barely-there room-light ambiance */}
            <radialGradient id="rg-left" cx="4%" cy="56%" r="46%">
              <stop offset="0%"   stopColor="#8a4a18" stopOpacity="0.07"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="rg-right" cx="96%" cy="56%" r="46%">
              <stop offset="0%"   stopColor="#8a4a18" stopOpacity="0.07"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="#0f0805"/>
          <rect width="1440" height="900" fill="url(#rg-spotlight)"/>
          <rect width="1440" height="900" fill="url(#rg-center)"/>
          <rect width="1440" height="900" fill="url(#rg-floor)"/>
          <rect width="1440" height="900" fill="url(#rg-left)"/>
          <rect width="1440" height="900" fill="url(#rg-right)"/>
        </svg>
      </div>
    </>
  )
}
