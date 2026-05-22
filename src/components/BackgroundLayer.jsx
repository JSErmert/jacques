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

        {/* Proscenium spotlight — SVG from mockup for fidelity */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 1 }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="rg-center" cx="50%" cy="47%" r="44%">
              <stop offset="0%"   stopColor="#c8893a" stopOpacity="0.15"/>
              <stop offset="42%"  stopColor="#a06828" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="lg-cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#e8b060" stopOpacity="0.18"/>
              <stop offset="30%"  stopColor="#c8893a" stopOpacity="0.10"/>
              <stop offset="70%"  stopColor="#a06828" stopOpacity="0.04"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </linearGradient>
            <radialGradient id="rg-floor" cx="50%" cy="100%" r="50%">
              <stop offset="0%"   stopColor="#c8893a" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="rg-left" cx="14%" cy="62%" r="34%">
              <stop offset="0%"   stopColor="#a06828" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="rg-right" cx="86%" cy="62%" r="34%">
              <stop offset="0%"   stopColor="#a06828" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="lg-horizon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#a06828" stopOpacity="0"/>
              <stop offset="30%"  stopColor="#c8893a" stopOpacity="0.04"/>
              <stop offset="50%"  stopColor="#e8b060" stopOpacity="0.03"/>
              <stop offset="70%"  stopColor="#c8893a" stopOpacity="0.04"/>
              <stop offset="100%" stopColor="#a06828" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="lg-topvign" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0f0805" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="#0f0805"/>
          <rect width="1440" height="900" fill="url(#rg-center)"/>
          {/* Proscenium cone — tight from top center */}
          <polygon points="720,0 500,900 940,900" fill="url(#lg-cone)" opacity="0.65"/>
          <polygon points="720,0 260,900 1180,900" fill="url(#lg-cone)" opacity="0.28"/>
          {/* Stage floor glow */}
          <ellipse cx="720" cy="900" rx="500" ry="150" fill="url(#rg-floor)" opacity="0.9"/>
          {/* Symmetric side blooms */}
          <rect width="1440" height="900" fill="url(#rg-left)"/>
          <rect width="1440" height="900" fill="url(#rg-right)"/>
          {/* Horizon band */}
          <ellipse cx="720" cy="445" rx="880" ry="42" fill="url(#lg-horizon)" opacity="0.9"/>
          {/* Top vignette */}
          <rect width="1440" height="110" fill="url(#lg-topvign)"/>
        </svg>
      </div>
    </>
  )
}
