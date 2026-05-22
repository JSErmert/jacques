// LiveSection — "Upcoming Engagements" venue rows.
// Data inline. Visual CSS ported from #live, .live-panel in the B3 mockup.
// Uses useScrollReveal for fade-in.
// Mobile: reduced section padding, reduced panel padding.

import { useScrollReveal } from '../hooks/useScrollReveal'
import VenueRow from './VenueRow'

const shows = [
  { date: 'Jun 14', venue: 'The Coyote', city: 'Carlsbad Village, CA' },
  { date: 'Jul 02', venue: 'The Coyote', city: 'Carlsbad Village, CA' },
  { date: 'Jul 19', venue: 'The Coyote', city: 'Carlsbad Village, CA' },
]

const liveStyles = `
  .live-section { padding: 0 64px 80px; }
  .live-panel { padding: 44px 60px; }
  @media (max-width: 768px) {
    .live-section { padding: 0 16px 56px; }
    .live-panel { padding: 24px 20px; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .live-section { padding: 0 32px 64px; }
    .live-panel { padding: 32px 32px; }
  }
`

export default function LiveSection() {
  const { ref: headRef, visible: headVisible } = useScrollReveal()
  const { ref: panelRef, visible: panelVisible } = useScrollReveal()

  return (
    <section id="live" className="live-section">
      <style>{liveStyles}</style>

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
          Live
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
          Upcoming Engagements
        </h2>
        <div style={{
          width: '60px', height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,137,58,0.45), transparent)',
          margin: '0 auto 44px',
        }} />
      </div>

      {/* Live panel */}
      <div
        ref={panelRef}
        className="live-panel"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          background: 'rgba(255,235,210,0.04)',
          border: '1px solid rgba(200,160,100,0.12)',
          borderRadius: '16px',
          backdropFilter: 'blur(18px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
          boxShadow: 'inset 0 1px 0 rgba(255,220,160,0.06), 0 12px 40px rgba(0,0,0,0.55)',
          opacity: panelVisible ? 1 : 0,
          transform: panelVisible ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        {shows.map((show, i) => (
          <VenueRow key={i} show={show} />
        ))}
      </div>
    </section>
  )
}
