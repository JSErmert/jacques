import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollReveal } from './useScrollReveal'

beforeEach(() => {
  global.IntersectionObserver = vi.fn(() => ({ observe: vi.fn(), disconnect: vi.fn() }))
})
describe('useScrollReveal', () => {
  it('returns a ref and a visible flag (defaults visible when reduced motion)', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })
    const { result } = renderHook(() => useScrollReveal())
    expect(result.current.ref).toBeDefined()
    expect(result.current.visible).toBe(true) // reduced motion -> no animation, always visible
  })
})
