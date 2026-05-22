// VenueRow — a single live show row: date, venue, city.
// Visual CSS ported from .live-row in the B3 mockup.
// Props: show { date, venue, city }

export default function VenueRow({ show }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr auto',
      alignItems: 'center',
      gap: '28px',
      padding: '20px 0',
      borderBottom: '1px solid rgba(200,137,58,0.08)',
    }}>
      {/* Date */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#c8893a',
          fontWeight: 300,
        }}>
          {show.date}
        </span>
        <div style={{ width: '22px', height: '1px', background: 'rgba(200,137,58,0.40)' }} />
      </div>

      {/* Venue */}
      <span style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: '1.02rem',
        fontWeight: 400,
        color: '#f0e8dc',
        letterSpacing: '0.04em',
      }}>
        {show.venue}
      </span>

      {/* City */}
      <span style={{
        fontSize: '10px',
        color: '#8a7a68',
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {show.city}
      </span>
    </div>
  )
}
