// Reveal styling convention: consumers apply
//   style={{opacity: visible?1:0, transform: visible?'none':'translateY(28px)', transition:'opacity .9s ease, transform .9s ease'}}
import { useEffect, useRef, useState } from 'react'
export function useScrollReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(!!reduced)
  useEffect(() => {
    if (reduced || !ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [reduced, threshold])
  return { ref, visible }
}
