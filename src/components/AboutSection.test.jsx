import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AboutSection from './AboutSection'

beforeEach(() => {
  global.IntersectionObserver = vi.fn().mockImplementation(function() {
    return { observe: vi.fn(), disconnect: vi.fn() }
  })
  window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })
})

it('renders the artist bio', () => { render(<AboutSection />); expect(screen.getByText(/The Artist/i)).toBeInTheDocument() })
