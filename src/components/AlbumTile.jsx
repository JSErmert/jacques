// AlbumTile — album-pressing tile with vinyl-disc motif + wood frame.
// Visual CSS ported from .album-tile in B3 mockup + B1 pressing look.
// Props: album { id, title, year }, onOpen(id)

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
        aspectRatio: '1 / 1',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: [
          '0 0 0 4px #1e1008',
          '0 0 0 7px #3c2010',
          '0 0 0 9px #6c3d18',
          '0 0 0 11px #3c2010',
          '0 0 0 14px #1e1008',
          '0 16px 44px rgba(0,0,0,0.72)',
        ].join(', '),
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = [
          '0 0 0 4px #1e1008',
          '0 0 0 7px #3c2010',
          '0 0 0 9px #6c3d18',
          '0 0 0 11px #3c2010',
          '0 0 0 14px #1e1008',
          '0 24px 64px rgba(0,0,0,0.82)',
        ].join(', ')
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = [
          '0 0 0 4px #1e1008',
          '0 0 0 7px #3c2010',
          '0 0 0 9px #6c3d18',
          '0 0 0 11px #3c2010',
          '0 0 0 14px #1e1008',
          '0 16px 44px rgba(0,0,0,0.72)',
        ].join(', ')
      }}
    >
      {/* Frosted glass surface */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255,235,210,0.04)',
        backdropFilter: 'blur(18px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
        border: '1px solid rgba(200,160,100,0.12)',
        boxShadow: 'inset 0 1px 0 rgba(255,220,160,0.06)',
      }} />

      {/* Warm ambient bleed */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: '-30px', left: '-30px',
        width: '160px', height: '160px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,137,58,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Vinyl-disc motif — top-right */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-38px', right: '-38px',
        width: '120px', height: '120px',
        borderRadius: '50%',
        background: [
          'radial-gradient(circle at 50% 50%,',
          'rgba(255,200,100,0.00) 0%, rgba(255,200,100,0.00) 30%,',
          'rgba(255,200,100,0.04) 31%, rgba(255,200,100,0.00) 33%,',
          'rgba(255,200,100,0.03) 37%, rgba(255,200,100,0.00) 40%,',
          'rgba(255,200,100,0.03) 43%, rgba(255,200,100,0.00) 46%',
          '), rgba(10,5,2,0.55)',
        ].join(' '),
        border: '1px solid rgba(200,137,58,0.08)',
        opacity: 0.65,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

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
          Pressing
        </p>
        <h3 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: 'italic',
          fontSize: '1.0rem',
          fontWeight: 400,
          color: '#f0e8dc',
          letterSpacing: '0.02em',
          lineHeight: 1.35,
        }}>
          {album.title}
        </h3>
        <p style={{
          fontSize: '10px',
          color: '#8a7a68',
          letterSpacing: '0.08em',
          marginTop: '4px',
        }}>
          {album.year}
        </p>
      </div>
    </div>
  )
}
