// VenueRow — a single live show row: date, venue, city.
// Visual CSS ported from .live-row in the B3 mockup.
// Props: show { date, venue, city }
// Mobile: stacks to 2 rows (date+city / venue) cleanly without overflow.

const venueRowStyles = `
  .venue-row {
    display: grid;
    grid-template-columns: 90px 1fr auto;
    align-items: center;
    gap: 28px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(200,137,58,0.08);
  }
  .venue-city {
    white-space: nowrap;
  }
  @media (max-width: 600px) {
    .venue-row {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      padding: 16px 0;
    }
    .venue-city {
      white-space: normal;
    }
  }
`

export default function VenueRow({ show }) {
  return (
    <>
      <style>{venueRowStyles}</style>
      <div className="venue-row">
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
        <span
          className="venue-city"
          style={{
            fontSize: '10px',
            color: '#8a7a68',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
          }}
        >
          {show.city}
        </span>
      </div>
    </>
  )
}
