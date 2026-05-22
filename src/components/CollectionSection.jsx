// CollectionSection — "The Collection" heading + 4-up vinyl-disc tile grid.
// Maps tracks -> TrackTile. Clicking a tile calls onPlay(track.id).
// Visual CSS ported from #library, .album-grid, .stage-note in the B3 mockup.
// Uses useScrollReveal for section fade-in.
// Mobile: 1-col; tablet: 2-col; desktop: 4-col.

import { tracks } from '../data/tracks'
import { useScrollReveal } from '../hooks/useScrollReveal'
import TrackTile from './TrackTile'

const collectionStyles = `
  .collection-section { padding: 96px 64px 100px; }
  .collection-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
    width: 100%;
  }
  @media (max-width: 768px) {
    .collection-section { padding: 64px 24px 72px; }
    /* Tiles carry a ~14px layered wood-frame box-shadow on every side, so the
       gap must clear 28px (both frames) for them to sit cleanly stacked. */
    .collection-grid { grid-template-columns: 1fr; gap: 20px; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .collection-section { padding: 72px 32px 80px; }
    .collection-grid { grid-template-columns: repeat(2, 1fr); gap: 36px; }
  }
`

export default function CollectionSection({ onPlay, currentTrackId, isPlaying, onTogglePlay }) {
  const { ref: headRef, visible: headVisible } = useScrollReveal()
  const { ref: gridRef, visible: gridVisible } = useScrollReveal()

  return (
    <section
      id="library"
      className="collection-section"
    >
      <style>{collectionStyles}</style>
      {/* Section heading */}
      <div
        ref={headRef}
        style={{
          marginBottom: '44px',
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
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
          Archive
        </p>
        <h2 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: '1.80rem',
          fontWeight: 400,
          letterSpacing: '0.10em',
          color: '#f0e8dc',
          textAlign: 'center',
          marginBottom: '14px',
        }}>
          The Collection
        </h2>
        <div style={{
          width: '60px', height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,137,58,0.45), transparent)',
          margin: '0 auto 44px',
        }} />
      </div>

      {/* 4-column tile grid */}
      <div
        ref={gridRef}
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: gridVisible ? 1 : 0,
          transform: gridVisible ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        <div className="collection-grid">
          {tracks.map((track) => (
            <TrackTile
              key={track.id}
              track={track}
              onPlay={onPlay}
              currentTrackId={currentTrackId}
              isPlaying={isPlaying}
              onTogglePlay={onTogglePlay}
            />
          ))}
        </div>

        {/* Stage note */}
        <p style={{
          textAlign: 'center',
          marginTop: '38px',
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: 'italic',
          fontSize: '0.82rem',
          color: 'rgba(138,122,104,0.35)',
          letterSpacing: '0.06em',
        }}>
          Pressings, sessions, and live recordings. Offered as they were made.
        </p>
      </div>
    </section>
  )
}
