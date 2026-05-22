import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import HeroSection from './HeroSection'
describe('HeroSection', () => {
  it('shows the name and triggers onBegin', async () => {
    const onBegin = vi.fn()
    render(<HeroSection onBegin={onBegin} gateOpen={false} />)
    expect(screen.getByText(/jacques/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /begin listening/i }))
    expect(onBegin).toHaveBeenCalledOnce()
  })
  it('shows "Now Playing" label with track title after gate opens', () => {
    render(<HeroSection onBegin={() => {}} gateOpen={true} nowPlayingTitle="Nocturne in E-flat" />)
    expect(screen.getByText(/now playing.*nocturne in e-flat/i)).toBeInTheDocument()
  })
  it('does not show Now Playing text before gate opens', () => {
    render(<HeroSection onBegin={() => {}} gateOpen={false} nowPlayingTitle={null} />)
    expect(screen.queryByText(/now playing/i)).not.toBeVisible()
  })
})
