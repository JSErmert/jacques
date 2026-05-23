// TrackTile — vinyl-disc tile for a single track.
// Props: track (object), onPlay (fn).
// Clicking anywhere on the tile calls onPlay(track.id).
// Visual CSS ported from .album-tile, .album-tile-inner, .vinyl-motif,
// .album-content, .album-play in the B3 mockup, INCLUDING the hover state
// (lift + deeper shadow + glass brighten + vinyl pop + title warm + play
// ring glow). Hover-state CSS is scoped to (hover:hover) so touch devices
// don't get a stuck hover after tap; :active gives them a tactile press.

const woodBoxShadow = [
  '0 0 0 4px #1e1008',
  '0 0 0 7px #3c2010',
  '0 0 0 9px #6c3d18',
  '0 0 0 11px #3c2010',
  '0 0 0 14px #1e1008',
  '0 16px 44px rgba(0,0,0,0.72)',
].join(', ')

const tileHoverStyles = `
  @media (hover: hover) {
    .track-tile:hover {
      transform: translateY(-5px);
      box-shadow:
        0 0 0 4px #1e1008,
        0 0 0 7px #3c2010,
        0 0 0 9px #6c3d18,
        0 0 0 11px #3c2010,
        0 0 0 14px #1e1008,
        0 24px 64px rgba(0,0,0,0.82) !important;
    }
    .track-tile:hover .track-tile-inner {
      background: rgba(255,235,210,0.075) !important;
    }
    .track-tile:hover .track-tile-vinyl {
      opacity: 0.90 !important;
    }
    .track-tile:hover .track-tile-title {
      color: #e8b060 !important;
    }
    .track-tile:hover .track-tile-play {
      border-color: rgba(200,160,100,0.55) !important;
      background: rgba(200,137,58,0.10) !important;
    }
  }
  .track-tile:active {
    transform: translateY(-2px);
  }
  .track-tile-inner { transition: background 0.35s ease; }
  .track-tile-vinyl { transition: opacity 0.35s ease; }
  .track-tile-title { transition: color 0.30s ease; }
  .track-tile-play  { transition: border-color 0.3s ease, background 0.3s ease; }
`

const vinylBg = `radial-gradient(circle at 50% 50%,
  rgba(255,200,100,0.00) 0%,
  rgba(255,200,100,0.00) 30%,
  rgba(255,200,100,0.04) 31%,
  rgba(255,200,100,0.00) 33%,
  rgba(255,200,100,0.03) 37%,
  rgba(255,200,100,0.00) 40%,
  rgba(255,200,100,0.03) 43%,
  rgba(255,200,100,0.00) 46%
), rgba(10,5,2,0.55)`

export default function TrackTile({ track, onPlay, currentTrackId, isPlaying, onTogglePlay }) {
  const isCurrentAndPlaying = track.id === currentTrackId && isPlaying
  const handleClick = () => {
    if (track.id === currentTrackId) {
      onTogglePlay()
    } else {
      onPlay(track.id)
    }
  }
  return (
    <div
      className="track-tile"
      onClick={handleClick}
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: woodBoxShadow,
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
      }}
    >
      <style>{tileHoverStyles}</style>

      {/* Frosted glass surface */}
      <div
        className="track-tile-inner"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,235,210,0.04)',
          backdropFilter: 'blur(18px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
          border: '1px solid rgba(200,160,100,0.12)',
          boxShadow: 'inset 0 1px 0 rgba(255,220,160,0.06)',
        }}
      />

      {/* Warm ambient bleed */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-30px', left: '-30px',
          width: '160px', height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,137,58,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Vinyl-disc motif — top-right */}
      <div
        aria-hidden="true"
        className="track-tile-vinyl"
        style={{
          position: 'absolute',
          top: '-38px', right: '-38px',
          width: '120px', height: '120px',
          borderRadius: '50%',
          background: vinylBg,
          border: '1px solid rgba(200,137,58,0.08)',
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '22px', height: '22px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,58,26,0.60) 0%, rgba(200,137,58,0.30) 55%, transparent 100%)',
        }} />
      </div>

      {/* Tile content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        padding: '22px 20px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <p style={{
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(200,137,58,0.55)',
          fontWeight: 300,
          marginBottom: '6px',
        }}>
          {track.catalogId} &nbsp;·&nbsp; {track.instrument}
        </p>
        <h3
          className="track-tile-title"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: 'italic',
            fontSize: '1.0rem',
            fontWeight: 400,
            color: '#f0e8dc',
            letterSpacing: '0.02em',
            lineHeight: 1.35,
          }}
        >
          {track.title}
        </h3>
        <p style={{
          fontSize: '10px',
          color: '#8a7a68',
          letterSpacing: '0.08em',
          marginTop: '4px',
        }}>
          {track.duration} &nbsp;·&nbsp; {track.year}
        </p>
      </div>

      {/* Play/Pause ring — bottom-right */}
      <div
        className="track-tile-play"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '18px', right: '18px',
          zIndex: 4,
          width: '34px', height: '34px',
          borderRadius: '50%',
          border: '1px solid rgba(200,160,100,0.18)',
          background: 'rgba(255,235,210,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isCurrentAndPlaying ? (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
            <rect x="1"   y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
            <rect x="7.5" y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
            <path d="M1.5 1.2l7.2 4.4-7.2 4.4V1.2z" fill="#e8b060" opacity="0.85"/>
          </svg>
        )}
      </div>
    </div>
  )
}
