// Wood-grain pillar rails — left and right edges.
// Placed INSIDE the post-hero sections wrapper (position:relative),
// so they NEVER overlap the hero section above.
// CSS ported from the B3 mockup body::before / .pillar-right rules.

const woodGradient = `repeating-linear-gradient(
  180deg,
  #1e1008 0px,  #1e1008 2px,
  #3c2010 3px,  #3c2010 6px,
  #6c3d18 7px,  #6c3d18 9px,
  #3c2010 10px, #3c2010 14px,
  #1e1008 15px, #1e1008 18px,
  #4a2810 19px, #4a2810 22px,
  #6c3d18 23px, #6c3d18 25px,
  #2a1408 26px, #2a1408 30px,
  #5a3418 31px, #5a3418 33px
)`

const pillarBase = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '5px',
  backgroundImage: woodGradient,
  opacity: 0.55,
  zIndex: 50,
  pointerEvents: 'none',
  maskImage: 'linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)',
}

export default function Pillars() {
  return (
    <>
      {/* Left pillar */}
      <div aria-hidden="true" style={{ ...pillarBase, left: 0 }} />
      {/* Right pillar */}
      <div aria-hidden="true" style={{ ...pillarBase, right: 0 }} />
    </>
  )
}
