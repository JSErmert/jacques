import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PersistentPlayer from './PersistentPlayer'
const track = { title: 'Nocturne in E-flat', instrument: 'Solo Piano', catalogId: 'JCQ-001' }
describe('PersistentPlayer', () => {
  it('renders the current track and toggles', async () => {
    const onToggle = vi.fn()
    render(<PersistentPlayer track={track} isPlaying onTogglePlay={onToggle} />)
    expect(screen.getByText('Nocturne in E-flat')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /pause|play/i }))
    expect(onToggle).toHaveBeenCalledOnce()
  })
  it('renders nothing without a track', () => {
    const { container } = render(<PersistentPlayer track={null} isPlaying={false} onTogglePlay={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })
})
