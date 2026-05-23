// Fixed full-screen background: chocolate base + warm drifting ambient field +
// CSS-gradient spotlight (beam + floor pool + side washes) + SVG volumetric
// ray streaks layered on top for "different light reflections" texture.
//
// The beam and floor pool were originally SVG with a 1440x900 viewBox and
// xMidYMid-slice scaling, which on portrait phones blew the floor ellipse up
// past viewport width and let the polygon cone spread too wide on desktop.
// They're now built from CSS radial gradients sized in viewport percentages,
// so the look is consistent across desktop / tablet / phone — narrow
// concentrated beam, defined floor pool, no viewport-aspect quirks.
//
// Floor pool vertical position is SCROLL-AWARE: ~63% down on the hero so the
// CTA sits centered in it, easing to ~72% as you scroll past hero.

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
`

// Pool position interpolates linearly between these as scrollY moves from 0
// (top of hero) to viewport-height (hero scrolled out of view).
const POOL_PCT_HERO  = 63  // ~63% down — centered on Begin Listening
const POOL_PCT_AFTER = 72  // ~72% down — settled in bottom quartile

export default function BackgroundLayer() {
  const [poolPct, setPoolPct] = useState(POOL_PCT_HERO)

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1
      const p = Math.min(window.scrollY / vh, 1)
      setPoolPct(POOL_PCT_HERO + (POOL_PCT_AFTER - POOL_PCT_HERO) * p)
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

      {/* Drifting warm ambient field — two layers via CSS keyframes */}
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
        <div style={{
          position: 'absolute',
          inset: '-30%',
          background: [
            'radial-gradient(ellipse 44% 52% at 50% 44%, rgba(160,104,40,0.08) 0%, transparent 62%)',
            'radial-gradient(ellipse 48% 35% at 50% 72%, rgba(120,70,20,0.07) 0%, transparent 58%)',
          ].join(','),
          animation: 'driftCool 18s ease-in-out infinite alternate-reverse',
        }} />
      </div>

      {/* Spotlight: beam + floor pool + side washes + top vignette.
          All viewport-relative so the look stays consistent across sizes. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: [
            // Inner bright beam core — clamped so the absolute width stays
            // narrow even on wide desktops; mobile (43px = 11vw of 390) is
            // preserved by the min, desktop is capped by the max at ~55px.
            'radial-gradient(ellipse clamp(38px, 11vw, 55px) 76vh at 50% -8vh, rgba(232,176,96,0.34) 0%, rgba(200,137,58,0.17) 24%, rgba(160,104,40,0.06) 58%, transparent 82%)',
            // Mid halo — softens the cone, also clamped
            'radial-gradient(ellipse clamp(85px, 24vw, 125px) 78vh at 50% -5vh, rgba(200,137,58,0.13) 0%, rgba(160,104,40,0.05) 44%, transparent 80%)',
            // Outermost diffuse upper warmth — wider but still capped
            'radial-gradient(ellipse clamp(240px, 55vw, 360px) 55vh at 50% -12vh, rgba(160,104,40,0.06) 0%, transparent 65%)',
            // FLOOR POOL — viewport-relative ellipse, scroll-aware vertical
            // position. Clamped horizontally so desktop doesn't widen out.
            `radial-gradient(ellipse clamp(140px, 38vw, 320px) 14vh at 50% ${poolPct}%, rgba(232,176,96,0.20) 0%, rgba(200,137,58,0.11) 44%, rgba(160,104,40,0.04) 72%, transparent 92%)`,
            // Side washes — barely-there room ambiance
            'radial-gradient(ellipse 28% 50% at 3% 56%, rgba(138,74,24,0.07) 0%, transparent 76%)',
            'radial-gradient(ellipse 28% 50% at 97% 56%, rgba(138,74,24,0.07) 0%, transparent 76%)',
            // Top vignette — gentle darken at the top edge
            'linear-gradient(to bottom, rgba(15,8,5,0.55) 0%, transparent 14%)',
          ].join(','),
        }}
      />

      {/* Volumetric ray streaks — provide "different light reflections" texture
          inside the beam. SVG keeps Gaussian blur capability that CSS doesn't
          offer cleanly for backgrounds. xMidYMid slice means on portrait
          viewports the rays render in the center column at appropriate scale. */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lg-ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e8b060" stopOpacity="0.30"/>
            <stop offset="30%"  stopColor="#c8893a" stopOpacity="0.16"/>
            <stop offset="70%"  stopColor="#a06828" stopOpacity="0.06"/>
            <stop offset="100%" stopColor="#0f0805" stopOpacity="0"/>
          </linearGradient>
          <filter id="raySoften" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="14"/>
          </filter>
        </defs>
        <g filter="url(#raySoften)" opacity="0.65">
          <ellipse cx="688" cy="80"  rx="11" ry="700" fill="url(#lg-ray)" opacity="0.40"/>
          <ellipse cx="720" cy="40"  rx="7"  ry="760" fill="url(#lg-ray)" opacity="0.55"/>
          <ellipse cx="752" cy="100" rx="10" ry="680" fill="url(#lg-ray)" opacity="0.40"/>
          <ellipse cx="704" cy="200" rx="5"  ry="600" fill="url(#lg-ray)" opacity="0.32"/>
          <ellipse cx="740" cy="160" rx="6"  ry="640" fill="url(#lg-ray)" opacity="0.34"/>
        </g>
      </svg>
    </>
  )
}
