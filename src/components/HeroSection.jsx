// HeroSection — pillar-free hero with centered "JACQUES", warm spotlight,
// discipline line, and "Begin listening" vinyl-icon CTA.
// Visual CSS ported from docs/superpowers/specs/variants/B3-archive-stage/mockup.html.
// NO pillars here — pillars live in the post-hero sections wrapper only.

const styles = `
  @keyframes centerPulse {
    0%   { opacity: 0.55; transform: translate(-50%,-50%) scale(0.94); }
    100% { opacity: 1.0;  transform: translate(-50%,-50%) scale(1.07); }
  }
  @keyframes coneRise {
    0%   { opacity: 0; }
    30%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes poolRise {
    0%   { opacity: 0; }
    55%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes hintAppear { to { opacity: 0.28; } }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.20; }
    50%       { opacity: 0.60; }
  }
`

export default function HeroSection({ onBegin, gateOpen }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 40px 80px',
        position: 'relative',
        overflow: 'hidden',
        background: '#0f0805',
      }}
    >
      <style>{styles}</style>

      {/* Ambient center glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '720px', height: '640px',
          background: 'radial-gradient(ellipse at center, rgba(200,137,58,0.11) 0%, rgba(160,104,40,0.06) 42%, transparent 70%)',
          borderRadius: '50%',
          animation: 'centerPulse 7s ease-in-out infinite alternate',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Spotlight cone */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background: [
            'radial-gradient(ellipse 17% 56% at 50% 0%, rgba(232,176,96,0.22) 0%, rgba(200,137,58,0.13) 36%, transparent 76%)',
            'radial-gradient(ellipse 44% 62% at 50% 0%, rgba(200,137,58,0.08) 0%, transparent 62%)',
          ].join(','),
          animation: 'coneRise 2.4s ease-out forwards',
          opacity: 0,
        }}
      />

      {/* Stage floor pool */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%', top: '56%',
          transform: 'translateX(-50%)',
          width: '500px', height: '120px',
          background: 'radial-gradient(ellipse 100% 100% at 50% 20%, rgba(200,137,58,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'poolRise 3.0s ease-out forwards',
          opacity: 0,
        }}
      />

      {/* Artist name */}
      <h1
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: '7.4vw',
          fontWeight: 400,
          letterSpacing: '0.36em',
          color: '#f0e8dc',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 5,
          textShadow: '0 0 60px rgba(232,176,96,0.36), 0 0 120px rgba(200,137,58,0.20), 0 0 200px rgba(160,104,40,0.10)',
        }}
      >
        Jacques
      </h1>

      {/* Stage apron hairline rule */}
      <div
        aria-hidden="true"
        style={{
          width: 'min(520px, 55vw)',
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(200,137,58,0.18) 8%, rgba(200,137,58,0.55) 28%, rgba(232,176,96,0.65) 50%, rgba(200,137,58,0.55) 72%, rgba(200,137,58,0.18) 92%, transparent 100%)',
          margin: '34px auto 0',
          position: 'relative',
          zIndex: 5,
        }}
      />

      {/* Discipline line */}
      <p
        style={{
          fontFamily: 'system-ui, Arial, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.40em',
          textTransform: 'uppercase',
          color: 'rgba(138,122,104,0.40)',
          fontWeight: 300,
          marginTop: '22px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        Classical &nbsp;&nbsp;·&nbsp;&nbsp; Jazz &nbsp;&nbsp;·&nbsp;&nbsp; Composition
      </p>

      {/* Begin listening CTA */}
      <button
        onClick={onBegin}
        aria-label="Begin listening"
        style={{
          fontFamily: 'system-ui, Arial, sans-serif',
          fontSize: '9.5px',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: 'rgba(240,232,220,0.38)',
          fontWeight: 300,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 5,
          padding: '12px 0',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: gateOpen ? 0 : 1,
          pointerEvents: gateOpen ? 'none' : 'auto',
          transition: 'opacity 0.4s',
        }}
      >
        {/* Vinyl icon */}
        <span
          aria-hidden="true"
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1.5px solid rgba(200,137,58,0.55)',
            position: 'relative',
            flexShrink: 0,
            display: 'block',
          }}
        />
        Begin listening
      </button>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '44px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: 0,
          animation: 'hintAppear 1s ease-out 3.8s forwards',
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '8.5px',
            letterSpacing: '0.30em',
            textTransform: 'uppercase',
            color: '#8a7a68',
            fontStyle: 'italic',
          }}
        >
          Archive
        </span>
        <div
          style={{
            width: '1px', height: '28px',
            background: 'linear-gradient(to bottom, rgba(200,137,58,0.28), transparent)',
            animation: 'scrollPulse 2.6s ease-in-out 3.8s infinite',
          }}
        />
      </div>
    </section>
  )
}
