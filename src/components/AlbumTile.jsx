// AlbumTile — pressing tile re-skinned to B1 "Recital Pressings" look.
// Vinyl-disc motif, catalog number, italic serif title, genre/duration meta,
// play ring button. Clicking calls onOpen(album.id).
// Props: album { id, title, year, catalogId?, genre?, duration?, unreleased? }, onOpen(id)

export default function AlbumTile({ album, onOpen }) {
  return (
    <div
      onClick={() => onOpen(album.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(album.id) }}
      aria-label={`Open ${album.title}`}
      style={{
        position: 'relative',
        background: 'rgba(255,235,210,0.04)',
        padding: '34px 38px 30px',
        cursor: 'pointer',
        overflow: 'hidden',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'background 0.3s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,235,210,0.075)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,235,210,0.04)' }}
    >
      {/* Vinyl-disc motif — upper-right (B1 vocabulary) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-44px', right: '-44px',
          width: '130px', height: '130px',
          borderRadius: '50%',
          background: [
            'radial-gradient(circle at 50% 50%,',
            'rgba(255,200,100,0.00) 0%, rgba(255,200,100,0.00) 28%,',
            'rgba(255,200,100,0.04) 29%, rgba(255,200,100,0.00) 32%,',
            'rgba(255,200,100,0.035) 36%, rgba(255,200,100,0.00) 39%,',
            'rgba(255,200,100,0.03) 43%, rgba(255,200,100,0.00) 46%,',
            'rgba(255,200,100,0.025) 50%, rgba(255,200,100,0.00) 53%',
            '), rgba(10,5,2,0.45)',
          ].join(' '),
          border: '1px solid rgba(200,137,58,0.08)',
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Warm lower-left glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-24px', left: '-24px',
          width: '140px', height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,137,58,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {album.catalogId && (
          <p style={{
            fontFamily: 'system-ui, Arial, sans-serif',
            fontSize: '8.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(200,137,58,0.48)',
            fontWeight: 300,
            marginBottom: '8px',
          }}>
            {album.catalogId}
          </p>
        )}
        <h3 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: 'italic',
          fontSize: '1.08rem',
          fontWeight: 400,
          color: '#f0e8dc',
          letterSpacing: '0.02em',
          lineHeight: 1.3,
        }}>
          {album.title}
          {album.unreleased && (
            <span style={{
              display: 'inline-block',
              fontFamily: 'system-ui, Arial, sans-serif',
              fontSize: '7.5px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(200,137,58,0.55)',
              border: '1px solid rgba(200,137,58,0.20)',
              borderRadius: '2px',
              padding: '2px 6px',
              marginLeft: '6px',
              verticalAlign: 'middle',
            }}>
              Unreleased
            </span>
          )}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
          {album.genre && (
            <span style={{
              fontFamily: 'system-ui, Arial, sans-serif',
              fontSize: '9.5px',
              letterSpacing: '0.14em',
              color: '#8a7a68',
              textTransform: 'uppercase',
            }}>
              {album.genre}
            </span>
          )}
          {album.duration && (
            <span style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: '0.80rem',
              color: 'rgba(138,122,104,0.45)',
              letterSpacing: '0.06em',
              fontStyle: 'italic',
            }}>
              {album.duration}
            </span>
          )}
          {album.year && (
            <span style={{
              fontFamily: 'system-ui, Arial, sans-serif',
              fontSize: '9.5px',
              letterSpacing: '0.14em',
              color: '#8a7a68',
              textTransform: 'uppercase',
            }}>
              {album.year}
            </span>
          )}
        </div>
      </div>

      {/* Play ring — lower-right corner */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '20px', right: '20px',
          zIndex: 3,
          width: '30px', height: '30px',
          borderRadius: '50%',
          border: '1px solid rgba(200,160,100,0.15)',
          background: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true">
          <path d="M1.2 1.0l6.6 4.0-6.6 4.0V1.0z" fill="#e8b060" opacity="0.82" />
        </svg>
      </div>

      {/* Bottom amber hairline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,137,58,0.18), transparent)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
