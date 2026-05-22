// NavigationBar — fixed top bar ported from B3 Archive Stage mockup.
// Left: "JACQUES" wordmark with "ARCHIVE" eyebrow.
// Right: nav links anchoring to #archive / #about / #live / #contact.
// Mobile (<= 768px): condensed padding, smaller link gap, eyebrow hidden.

const navStyles = `
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 90;
    padding: 30px 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-links {
    display: flex;
    gap: 40px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-eyebrow {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(200,137,58,0.36);
    font-weight: 300;
    margin-left: 10px;
    font-family: system-ui, Arial, sans-serif;
  }
  @media (max-width: 768px) {
    .nav-bar {
      padding: 18px 20px;
    }
    .nav-links {
      gap: 18px;
    }
    .nav-eyebrow {
      display: none;
    }
  }
`

export default function NavigationBar() {
  return (
    <nav aria-label="Site navigation" className="nav-bar">
      <style>{navStyles}</style>

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
        <span className="nav-eyebrow">
          Archive
        </span>
      </div>

      {/* Right — nav links */}
      <ul className="nav-links">
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
