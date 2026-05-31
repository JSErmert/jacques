// Fixed full-screen background: chocolate base + proscenium spotlight cone +
// warm ambient field + drifting animations. Paper grain is in index.css (body::after).
// Floor pool position is SCROLL-AWARE: pushed up on the hero so the Begin
// Listening CTA sits centered in the pool; eases to its post-hero position
// once you scroll past the hero. Beam carries subtle volumetric ray streaks
// matching the floor's "light reflection" texture.

import { useEffect, useState } from 'react'

const styles = `
  @keyframes driftWarm {
    0%   { transform: translate(0%,0%) scale(1.00); opacity: 1.0; }
    33%  { transform: translate(1%,-2%) scale(1.02); }
    66%  { transform: translate(-1%,3%) scale(0.98); }
    100% { transform: translate(1%,-4%) scale(1.04); opacity: 0.84; }
  }
  @keyframes driftCool {
    0%   { transform: translate(0%,0%) scale(1.00); opacity: 0.88; }
    40%  { transform: translate(-2%,2%) scale(1.03); }
    70%  { transform: translate(2%,-3%) scale(0.97); }
    100% { transform: translate(-1%,4%) scale(1.05); opacity: 1.0; }
  }
  @keyframes centerPulse {
    0%   { opacity: 0.55; transform: translate(-50%,-50%) scale(0.94); }
    100% { opacity: 1.0;  transform: translate(-50%,-50%) scale(1.07); }
  }
  .bg-ambient-before {
    content: '';
    position: absolute;
    inset: -30%;
    background:
      radial-gradient(ellipse 56% 42% at 50% 54%, rgba(200,137,58,0.14) 0%, transparent 70%),
      radial-gradient(ellipse 36% 50% at 50% 28%, rgba(160,104,40,0.09) 0%, transparent 65%),
      radial-gradient(ellipse 26% 28% at 50% 82%, rgba(120,70,20,0.07) 0%, transparent 60%);
    animation: driftWarm 14s ease-in-out infinite alternate;
  }
  .bg-ambient-after {
    content: '';
    position: absolute;
    inset: -30%;
    background:
      radial-gradient(ellipse 44% 52% at 50% 44%, rgba(160,104,40,0.08) 0%, transparent 62%),
      radial-gradient(ellipse 48% 35% at 50% 72%, rgba(120,70,20,0.07) 0%, transparent 58%);
    animation: driftCool 18s ease-in-out infinite alternate-reverse;
  }
`

// Pool position interpolates linearly between these as scrollY moves from 0
// (top of hero) to viewport-height (hero scrolled out of view).
// Hero pool sits BELOW the button center (visual peak of the cone bleed plus
// the pool gradient combines higher than the pool's geometric center, so the
// pool's center is anchored low on the "stage floor" to put the perceived
// spotlight directly behind the button rather than above it).
const POOL_CY_HERO = 645   // ~72% down — pool center on floor below button
const POOL_CY_AFTER = 720  // ~80% down — settled deeper for post-hero stage feel

export default function BackgroundLayer() {
  const [poolCy, setPoolCy] = useState(POOL_CY_HERO)

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1
      const p = Math.min(window.scrollY / vh, 1)
      setPoolCy(POOL_CY_HERO + (POOL_CY_AFTER - POOL_CY_HERO) * p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{styles}</style>
      {/* Chocolate base */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: '#0f0805',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient warm field — two drifting layers via SVG (matches mockup exactly) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Layer 1 — centered symmetric drift */}
        <div style={{
          position: 'absolute',
          inset: '-30%',
          background: [
            'radial-gradient(ellipse 56% 42% at 50% 54%, rgba(200,137,58,0.14) 0%, transparent 70%)',
            'radial-gradient(ellipse 36% 50% at 50% 28%, rgba(160,104,40,0.09) 0%, transparent 65%)',
            'radial-gradient(ellipse 26% 28% at 50% 82%, rgba(120,70,20,0.07) 0%, transparent 60%)',
          ].join(','),
          animation: 'driftWarm 14s ease-in-out infinite alternate',
        }} />
        {/* Layer 2 — deeper offset */}
        <div style={{
          position: 'absolute',
          inset: '-30%',
          background: [
            'radial-gradient(ellipse 44% 52% at 50% 44%, rgba(160,104,40,0.08) 0%, transparent 62%)',
            'radial-gradient(ellipse 48% 35% at 50% 72%, rgba(120,70,20,0.07) 0%, transparent 58%)',
          ].join(','),
          animation: 'driftCool 18s ease-in-out infinite alternate-reverse',
        }} />

        {/* ORIGINAL proscenium cone restored — recognizable spotlight SHAPE.
            Polygons run through a Gaussian-blur filter so the hard cone
            edges feather into soft volumetric falloff. Polygons extend
            beyond the viewBox (y=-80..980) so the blur tails dissolve past
            the visible area instead of clipping. */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 1 }}
          aria-hidden="true"
        >
          <defs>
            {/* Beam stops (~+25% intensity from the mockup baseline) */}
            <linearGradient id="lg-cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#e8b060" stopOpacity="0.28"/>
              <stop offset="30%"  stopColor="#c8893a" stopOpacity="0.15"/>
              <stop offset="70%"  stopColor="#a06828" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </linearGradient>
            {/* Floor pool — gradient peak anchored to ellipse CENTER + soft 3-stop falloff */}
            <radialGradient id="rg-floor" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#e8b060" stopOpacity="0.18"/>
              <stop offset="45%"  stopColor="#c8893a" stopOpacity="0.10"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="rg-left" cx="14%" cy="62%" r="34%">
              <stop offset="0%"   stopColor="#a06828" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="rg-right" cx="86%" cy="62%" r="34%">
              <stop offset="0%"   stopColor="#a06828" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="lg-topvign" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0f0805" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
            </linearGradient>
            {/* Heavy blur — turns the polygon cones into soft volumetric light */}
            <filter id="coneSoften" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="42"/>
            </filter>
            {/* Gentle blur — feathers horizon line + floor pool edges */}
            <filter id="atmoSoften" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="14"/>
            </filter>
          </defs>
          <rect width="1440" height="900" fill="#0f0805"/>
          {/* Proscenium cone — Gaussian-feathered, polygons extended past viewBox */}
          <g filter="url(#coneSoften)">
            <polygon points="720,-80 460,980 980,980" fill="url(#lg-cone)" opacity="0.68"/>
            <polygon points="720,-80 220,980 1220,980" fill="url(#lg-cone)" opacity="0.30"/>
          </g>
          {/* Volumetric "rays" within the beam — same atmoSoften blur as the
              floor pool so they carry the same banded/light-reflection texture
              the operator likes on the floor. Thin tall ellipses offset
              slightly across the cone width = subtle dust-in-light streaks. */}
          <g filter="url(#atmoSoften)" opacity="0.65">
            <ellipse cx="688" cy="80"  rx="11" ry="700" fill="url(#lg-cone)" opacity="0.40"/>
            <ellipse cx="720" cy="40"  rx="7"  ry="760" fill="url(#lg-cone)" opacity="0.55"/>
            <ellipse cx="752" cy="100" rx="10" ry="680" fill="url(#lg-cone)" opacity="0.40"/>
            <ellipse cx="704" cy="200" rx="5"  ry="600" fill="url(#lg-cone)" opacity="0.32"/>
            <ellipse cx="740" cy="160" rx="6"  ry="640" fill="url(#lg-cone)" opacity="0.34"/>
          </g>
          {/* Stage floor glow — cy is scroll-aware (see useEffect above):
              POOL_CY_HERO (565, hero) -> POOL_CY_AFTER (651, post-hero). */}
          <g filter="url(#atmoSoften)">
            <ellipse cx="720" cy={poolCy} rx="560" ry="135" fill="url(#rg-floor)" opacity="1.0"/>
          </g>
          {/* Symmetric side blooms */}
          <rect width="1440" height="900" fill="url(#rg-left)"/>
          <rect width="1440" height="900" fill="url(#rg-right)"/>
          {/* Top vignette */}
          <rect width="1440" height="110" fill="url(#lg-topvign)"/>
        </svg>

        {/* Atmospheric haze — volumetric warmth scattered in the beam path,
            and a soft upper-air glow. Adds the "light through air" feel
            on top of the cone shape. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: [
              // Warmth concentrated inside the beam — volumetric scattering feel (+25%)
              'radial-gradient(ellipse 28% 62% at 50% 32%, rgba(232,176,96,0.075) 0%, rgba(200,137,58,0.031) 55%, transparent 82%)',
              // Upper-air bloom — light hitting the haze near the source (+25%)
              'radial-gradient(ellipse 78% 32% at 50% 12%, rgba(200,137,58,0.056) 0%, transparent 72%)',
            ].join(','),
          }}
        />
      </div>
    </>
  )
}
