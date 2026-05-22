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
})
