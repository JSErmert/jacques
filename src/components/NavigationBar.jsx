// NavigationBar — fixed top bar ported from B3 Archive Stage mockup.
// Left: "JACQUES" wordmark with "ARCHIVE" eyebrow.
// Right: nav links anchoring to #archive / #about / #live / #contact.

export default function NavigationBar() {
  return (
    <nav
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        padding: '30px 68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left — wordmark + eyebrow */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '12px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(240,232,220,0.45)',
          }}
        >
          Jacques
        </span>
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(200,137,58,0.36)',
            fontWeight: 300,
            marginLeft: '10px',
            fontFamily: 'system-ui, Arial, sans-serif',
          }}
        >
          Archive
        </span>
      </div>

      {/* Right — nav links */}
      <ul
        style={{
          display: 'flex',
          gap: '40px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {[
          { label: 'Archive', href: '#archive' },
          { label: 'About',   href: '#about' },
          { label: 'Live',    href: '#live' },
          { label: 'Contact', href: '#contact' },
        ].map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              style={{
                fontSize: '9.5px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#8a7a68',
                textDecoration: 'none',
                fontWeight: 300,
                fontFamily: 'system-ui, Arial, sans-serif',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#f0e8dc' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8a7a68' }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
