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

        {/* ORIGINAL proscenium cone restored — recognizable spotlight SHAPE.
            Polygons run through a Gaussian-blur filter so the hard cone
            edges feather into soft volumetric falloff. Polygons extend
            beyond the viewBox (y=-80..980) so the blur tails dissolve past
            the visible area instead of clipping. */}
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
            {/* Beam stops bumped ~+25% intensity */}
            <linearGradient id="lg-cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#e8b060" stopOpacity="0.28"/>
              <stop offset="30%"  stopColor="#c8893a" stopOpacity="0.15"/>
              <stop offset="70%"  stopColor="#a06828" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </linearGradient>
            {/* Floor pool — gradient peak now anchored to ellipse CENTER
                (was 100%, which put the bright spot at the bbox bottom and
                made the visible portion read as dilute mid-screen warmth).
                Three-stop falloff gives a defined pool with soft edges. */}
            <radialGradient id="rg-floor" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#e8b060" stopOpacity="0.18"/>
              <stop offset="45%"  stopColor="#c8893a" stopOpacity="0.10"/>
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
            {/* Heavy blur — turns the polygon cones into soft volumetric light */}
            <filter id="coneSoften" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="42"/>
            </filter>
            {/* Gentle blur — feathers horizon line + floor pool edges */}
            <filter id="atmoSoften" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="14"/>
            </filter>
          </defs>
          <rect width="1440" height="900" fill="#0f0805"/>
          <rect width="1440" height="900" fill="url(#rg-center)"/>
          {/* Proscenium cone — Gaussian-feathered, polygons extended past viewBox */}
          <g filter="url(#coneSoften)">
            <polygon points="720,-80 460,980 980,980" fill="url(#lg-cone)" opacity="0.68"/>
            <polygon points="720,-80 220,980 1220,980" fill="url(#lg-cone)" opacity="0.30"/>
          </g>
          {/* Stage floor glow — center positioned at SVG y=820 (~91% down)
              so the BRIGHT peak of the gradient lands deep in the bottom
              quartile of the viewport, where a real floor pool would be. */}
          <g filter="url(#atmoSoften)">
            <ellipse cx="720" cy="820" rx="560" ry="135" fill="url(#rg-floor)" opacity="1.0"/>
          </g>
          {/* Symmetric side blooms */}
          <rect width="1440" height="900" fill="url(#rg-left)"/>
          <rect width="1440" height="900" fill="url(#rg-right)"/>
          {/* Horizon band — gently feathered so it doesn't read as a hard line */}
          <g filter="url(#atmoSoften)">
            <ellipse cx="720" cy="445" rx="880" ry="42" fill="url(#lg-horizon)" opacity="0.9"/>
          </g>
          {/* Top vignette */}
          <rect width="1440" height="110" fill="url(#lg-topvign)"/>
        </svg>

        {/* Atmospheric haze — volumetric warmth scattered in the beam path,
            and a soft upper-air glow. Adds the "light through air" feel
            on top of the cone shape. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: [
              // Warmth concentrated inside the beam — volumetric scattering feel (+25%)
              'radial-gradient(ellipse 28% 62% at 50% 32%, rgba(232,176,96,0.075) 0%, rgba(200,137,58,0.031) 55%, transparent 82%)',
              // Upper-air bloom — light hitting the haze near the source (+25%)
              'radial-gradient(ellipse 78% 32% at 50% 12%, rgba(200,137,58,0.056) 0%, transparent 72%)',
            ].join(','),
          }}
        />
      </div>
    </>
  )
}
