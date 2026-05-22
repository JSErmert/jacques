// PersistentPlayer — fixed turntable player bar.
// Renders nothing when track is null.
// Visual CSS ported from docs/superpowers/specs/variants/B3-archive-stage/mockup.html
// (.player-bar, .turntable-disc, .tonearm, .player-controls, etc.)
// Props: track (object|null), isPlaying (bool), onTogglePlay (fn)

const styles = `
  @keyframes spinDisc {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`

const woodGradientH = `repeating-linear-gradient(
  88deg,
  #1e1008 0px,  #1e1008 1px,
  #3c2010 2px,  #3c2010 4px,
  #6c3d18 5px,  #6c3d18 6px,
  #3c2010 7px,  #3c2010 9px,
  #1e1008 10px, #1e1008 12px,
  #4a2810 13px, #4a2810 15px,
  #6c3d18 16px, #6c3d18 17px
)`

// Waveform bar heights from the mockup
const WAVE_HEIGHTS = [10,18,8,26,14,6,22,10,30,16,8,24,12,6,20,10,28,14,8,22,12,34,18,10,26,13,8,24,16,10,32,14,6,20,10,26,8,18,14,7,24]
const PLAYED_FRAC = 0.24

export default function PersistentPlayer({ track, isPlaying, onTogglePlay }) {
  if (!track) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: '88px',
        background: 'rgba(11,6,3,0.92)',
        borderTop: '1px solid rgba(200,137,58,0.10)',
        backdropFilter: 'blur(28px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 52px',
        gap: '36px',
        // A1 centered amber rule at top
        boxSizing: 'border-box',
      }}
    >
      <style>{styles}</style>

      {/* A1 centered amber rule at very top of bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: '140px', height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,137,58,0.40), transparent)',
        }}
      />

      {/* Wood plinth accent */}
      <div
        aria-hidden="true"
        style={{
          width: '9px', height: '56px',
          borderRadius: '2px',
          backgroundImage: woodGradientH,
          opacity: 0.70,
          flexShrink: 0,
        }}
      />

      {/* Spinning disc + tonearm */}
      <div aria-hidden="true" style={{ position: 'relative', width: '62px', height: '62px', flexShrink: 0 }}>
        {/* Vinyl disc */}
        <div
          style={{
            width: '62px', height: '62px',
            borderRadius: '50%',
            background: [
              'radial-gradient(circle at 50% 50%,',
              '#080402 0%, #080402 20%,',
              'rgba(255,190,70,0.07) 21%, #080402 23%,',
              'rgba(255,190,70,0.06) 27%, #080402 30%,',
              'rgba(255,190,70,0.055) 33%, #080402 36%,',
              'rgba(255,190,70,0.05) 40%, #080402 44%,',
              'rgba(255,190,70,0.04) 47%, #080402 50%,',
              'rgba(255,190,70,0.035) 53%, #080402 57%,',
              'rgba(255,190,70,0.03) 60%, #080402 64%,',
              'rgba(255,190,70,0.025) 67%, #080402 72%)',
            ].join(' '),
            border: '1px solid rgba(200,137,58,0.14)',
            position: 'absolute',
            inset: 0,
            animation: `spinDisc 1.8s linear infinite`,
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        >
          {/* Disc label center */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '20px', height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,58,26,0.85) 0%, rgba(200,137,58,0.45) 60%, transparent 100%)',
            zIndex: 2,
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '4px', height: '4px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.80)',
            }} />
          </div>
        </div>

        {/* Tonearm — parked (~-28deg) when not playing, engaged (0deg) when playing */}
        <div style={{
          position: 'absolute',
          top: '4px', right: '-10px',
          width: '32px', height: '44px',
          transformOrigin: '24px 6px',
          transform: isPlaying ? 'rotate(0deg)' : 'rotate(-28deg)',
          transition: 'transform 1.2s ease-out',
          zIndex: 5,
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            top: '6px', left: '22px',
            width: '2px', height: '38px',
            background: 'linear-gradient(to bottom, rgba(200,137,58,0.70), rgba(200,137,58,0.28))',
            borderRadius: '1px',
            transformOrigin: 'top center',
            transform: 'rotate(-12deg)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0, left: '14px',
            width: '10px', height: '5px',
            borderRadius: '1px',
            background: 'rgba(200,137,58,0.55)',
          }} />
          <div style={{
            position: 'absolute',
            top: 0, left: '18px',
            width: '10px', height: '10px',
            borderRadius: '50%',
            border: '1.5px solid rgba(200,137,58,0.45)',
            background: 'rgba(10,5,2,0.8)',
          }} />
        </div>
      </div>

      {/* Track info */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '220px' }}>
        <span style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: 'italic',
          fontSize: '14px',
          color: '#f0e8dc',
          letterSpacing: '0.03em',
        }}>
          {track.title}
        </span>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#8a7a68',
          marginTop: '2px',
        }}>
          {track.instrument} &nbsp;·&nbsp; Jacques
        </span>
        <span style={{
          fontSize: '9px',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: 'rgba(200,137,58,0.40)',
          marginTop: '3px',
          fontWeight: 300,
        }}>
          {track.catalogId}
        </span>
      </div>

      {/* Transport controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          aria-label="Previous"
          style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3v10M13 3.5L7 8l6 4.5V3.5z" stroke="#f0e8dc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: '40px', height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(200,137,58,0.28)',
            background: 'rgba(255,235,210,0.03)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {isPlaying ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <rect x="1"   y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
              <rect x="7.5" y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M1.5 1.2l7.2 4.4-7.2 4.4V1.2z" fill="#e8b060" opacity="0.85"/>
            </svg>
          )}
        </button>

        <button
          aria-label="Next"
          style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 3v10M3 3.5L9 8l-6 4.5V3.5z" stroke="#f0e8dc" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Waveform */}
      <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '30px', flexShrink: 0 }}>
        {WAVE_HEIGHTS.map((h, i) => {
          const played = (i / WAVE_HEIGHTS.length) < PLAYED_FRAC
          return (
            <span
              key={i}
              style={{
                display: 'block',
                width: '3px',
                height: `${h}px`,
                borderRadius: '2px',
                opacity: played ? 0.85 : 0.18,
                background: played
                  ? 'linear-gradient(to top, #a06828, #c8893a, #e8b060)'
                  : 'linear-gradient(to top, #1e1008, #3c2010)',
              }}
            />
          )
        })}
      </div>

      {/* Groove progress track */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(200,137,58,0.40)',
          fontWeight: 300,
          marginBottom: '2px',
        }}>
          Side A &nbsp;·&nbsp; Track 1
        </div>
        <div style={{
          height: '3px',
          background: 'rgba(138,122,104,0.10)',
          borderRadius: '2px',
          overflow: 'visible',
          position: 'relative',
        }}>
          <div style={{
            height: '100%',
            width: '24%',
            background: 'linear-gradient(to right, #a06828, #c8893a, #e8b060)',
            borderRadius: '2px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              right: '-4px', top: '50%',
              transform: 'translateY(-50%)',
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: '#e8b060',
              boxShadow: '0 0 6px rgba(232,176,96,0.55)',
            }} />
          </div>
        </div>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.10em',
          color: 'rgba(138,122,104,0.38)',
          textAlign: 'right',
        }}>
          1:04 &nbsp;·&nbsp; {track.duration || '—'}
        </div>
      </div>

      {/* Volume */}
      <button
        aria-label="Volume"
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.38, flexShrink: 0 }}
      >
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
          <path d="M1 5h3l5-4v14l-5-4H1V5z" stroke="#f0e8dc" strokeWidth="1.1" strokeLinejoin="round" fill="none"/>
          <path d="M13 4c1.5 1.2 2.5 2.9 2.5 4.5s-1 3.3-2.5 4.5" stroke="#f0e8dc" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
        </svg>
      </button>
    </div>
  )
}
