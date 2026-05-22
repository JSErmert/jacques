import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAudio } from './useAudio'

describe('useAudio', () => {
  it('starts with gate closed and nothing playing', () => {
    const { result } = renderHook(() => useAudio())
    expect(result.current.gateOpen).toBe(false)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentTrackId).toBe(null)
  })
  it('begin() opens the gate and selects the signature track', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.begin())
    expect(result.current.gateOpen).toBe(true)
    expect(result.current.currentTrackId).toBe('nocturne-eflat')
    expect(result.current.isPlaying).toBe(true)
  })
  it('selectTrack sets current track and plays', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.selectTrack('blue-reverie'))
    expect(result.current.currentTrackId).toBe('blue-reverie')
    expect(result.current.isPlaying).toBe(true)
  })
  it('togglePlay flips playing', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.selectTrack('blue-reverie'))
    act(() => result.current.togglePlay())
    expect(result.current.isPlaying).toBe(false)
  })
  it('openAlbum / closeAlbum set openAlbumId', () => {
    const { result } = renderHook(() => useAudio())
    act(() => result.current.openAlbum('reveries'))
    expect(result.current.openAlbumId).toBe('reveries')
    act(() => result.current.closeAlbum())
    expect(result.current.openAlbumId).toBe(null)
  })
})
