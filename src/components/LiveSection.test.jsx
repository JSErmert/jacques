import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LiveSection from './LiveSection'

beforeEach(() => {
  global.IntersectionObserver = vi.fn().mockImplementation(function() {
    return { observe: vi.fn(), disconnect: vi.fn() }
  })
  window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })
})

describe('LiveSection', () => {
  it('renders venue rows', () => {
    render(<LiveSection />)
    const coyotes = screen.getAllByText('The Coyote')
    expect(coyotes.length).toBeGreaterThan(0)
    expect(screen.getAllByText('Carlsbad Village, CA').length).toBeGreaterThan(0)
  })
  it('renders Upcoming Engagements heading', () => {
    render(<LiveSection />)
    expect(screen.getByText('Upcoming Engagements')).toBeInTheDocument()
  })
})
