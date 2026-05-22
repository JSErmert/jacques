import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FrostPanel from './FrostPanel'
describe('FrostPanel', () => {
  it('renders children', () => { render(<FrostPanel>hi</FrostPanel>); expect(screen.getByText('hi')).toBeInTheDocument() })
})
