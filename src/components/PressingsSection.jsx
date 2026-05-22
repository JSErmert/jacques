// PressingsSection — "Recital Pressings" look ported from B1 mockup.
// Formal program container: frosted outer shell, program-header, 2-col pressing-tile grid,
// vinyl-disc motifs, catalog numbers, italic serif titles, program-footer.
// Clicking a tile calls onOpen(album.id) — AlbumOverlay behavior unchanged.
// Uses useScrollReveal for section fade-in.

import { useScrollReveal } from '../hooks/useScrollReveal'
import AlbumTile from './AlbumTile'

export default function PressingsSection({ albums, onOpen }) {
  const { ref: headRef, visible: headVisible } = useScrollReveal()
  const { ref: bodyRef, visible: bodyVisible } = useScrollReveal()

  return (
    <section id="archive" style={{ padding: '96px 80px 80px' }}>
      {/* Section heading */}
      <div
        ref={headRef}
        style={{
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
          marginBottom: '40px',
        }}
      >
        <p style={{
          fontFamily: 'system-ui, Arial, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.40em',
          textTransform: 'uppercase',
          color: 'rgba(200,137,58,0.50)',
          fontWeight: 300,
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          Library
        </p>
        <h2 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: '1.75rem',
          fontWeight: 400,
          letterSpacing: '0.12em',
          color: '#f0e8dc',
          textAlign: 'center',
          marginBottom: '14px',
        }}>
          Pressings
        </h2>
        <div style={{
          width: '60px', height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,137,58,0.45), transparent)',
          margin: '0 auto',
        }} />
      </div>

      {/* Program container — frosted outer shell (B1) */}
      <div
        ref={bodyRef}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          background: 'rgba(255,235,210,0.04)',
          border: '1px solid rgba(200,160,100,0.12)',
          borderRadius: '14px',
          backdropFilter: 'blur(18px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
          boxShadow: 'inset 0 1px 0 rgba(255,220,160,0.06), 0 20px 60px rgba(0,0,0,0.65)',
          overflow: 'hidden',
          position: 'relative',
          opacity: bodyVisible ? 1 : 0,
          transform: bodyVisible ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        {/* Top ambient bloom */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px', left: '50%',
            transform: 'translateX(-50%)',
            width: '500px', height: '200px',
            background: 'radial-gradient(circle, rgba(200,137,58,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Program header */}
        <div style={{
          padding: '42px 60px 32px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(200,137,58,0.09)',
          position: 'relative',
          zIndex: 1,
        }}>
          <p style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '0.72rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(200,137,58,0.50)',
            fontWeight: 400,
            marginBottom: '6px',
          }}>
            An Evening with Jacques
          </p>
          <p style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '1.35rem',
            fontWeight: 400,
            letterSpacing: '0.10em',
            color: '#f0e8dc',
          }}>
            Works for Piano, Trio &amp; Quartet
          </p>
        </div>

        {/* 2-column pressing tile grid (B1) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: 'rgba(200,137,58,0.07)',
          position: 'relative',
          zIndex: 1,
        }}>
          {albums.map((album) => (
            <AlbumTile key={album.id} album={album} onOpen={onOpen} />
          ))}
        </div>

        {/* Program footer */}
        <div style={{
          padding: '20px 60px 26px',
          textAlign: 'center',
          borderTop: '1px solid rgba(200,137,58,0.07)',
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: 'italic',
            fontSize: '0.80rem',
            color: 'rgba(138,122,104,0.35)',
            letterSpacing: '0.06em',
          }}>
            Offered as they were made — unguarded, unhurried.
          </span>
        </div>
      </div>
    </section>
  )
}
