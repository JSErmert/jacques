// useIsMobile — returns true when viewport width is ≤ 768px.
// SSR-safe: defaults to false when window is unavailable (jsdom env or SSR).
// Updates on resize via matchMedia listener.

import { useState, useEffect } from 'react'

const QUERY = '(max-width: 768px)'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    if (!window.matchMedia) return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(QUERY)
    const handler = (e) => setIsMobile(e.matches)
    // Use addEventListener with event type for modern browsers
    if (mql.addEventListener) {
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    } else {
      // Fallback for older Safari
      mql.addListener(handler)
      return () => mql.removeListener(handler)
    }
  }, [])

  return isMobile
}
