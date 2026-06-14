import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NavigationBar from './NavigationBar'

describe('NavigationBar', () => {
  it('renders the JACQUES wordmark', () => {
    render(<NavigationBar />)
    expect(screen.getByText(/jacques/i)).toBeInTheDocument()
  })

  it('renders all nav links with correct hrefs, in page order', () => {
    render(<NavigationBar />)
    const aboutLink      = screen.getByRole('link', { name: /about/i })
    const collectionLink = screen.getByRole('link', { name: /collection/i })
    const pressingsLink  = screen.getByRole('link', { name: /pressings/i })
    const liveLink       = screen.getByRole('link', { name: /live/i })
    const contactLink    = screen.getByRole('link', { name: /contact/i })

    expect(aboutLink).toHaveAttribute('href', '#about')
    expect(collectionLink).toHaveAttribute('href', '#library')
    expect(pressingsLink).toHaveAttribute('href', '#archive')
    expect(liveLink).toHaveAttribute('href', '#live')
    expect(contactLink).toHaveAttribute('href', '#contact')

    // About comes before Pressings
    const links = screen.getAllByRole('link').map((a) => a.textContent)
    expect(links.indexOf('About')).toBeLessThan(links.indexOf('Pressings'))
  })
})
