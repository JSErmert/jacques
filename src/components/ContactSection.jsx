// ContactSection — contact footer with email + booking note.
// Visual CSS ported from #contact in the B3 mockup.

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: '60px 64px 160px', textAlign: 'center' }}>
      <div style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
      }}>
        <p style={{
          fontFamily: 'system-ui, Arial, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.40em',
          textTransform: 'uppercase',
          color: 'rgba(200,137,58,0.50)',
          fontWeight: 300,
        }}>
          Contact
        </p>

        <a
          href="mailto:hello@jacquesmusic.com"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '1.05rem',
            fontWeight: 400,
            color: '#c8893a',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#e8b060' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#c8893a' }}
        >
          hello@jacquesmusic.com
        </a>

        <p style={{
          fontSize: '12px',
          color: 'rgba(138,122,104,0.38)',
          letterSpacing: '0.08em',
          fontStyle: 'italic',
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}>
          For bookings, collaborations, and questions left on a sleeve.
        </p>
      </div>
    </section>
  )
}
