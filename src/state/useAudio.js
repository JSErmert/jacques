import { useCallback, useRef, useState } from 'react'
import { SIGNATURE_TRACK_ID, getTrack } from '../data/tracks'

// Single shared <audio>; guarded so real src plays when present, stub is a no-op.
export function useAudio() {
  const audioRef = useRef(null)
  const [gateOpen, setGateOpen] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [openAlbumId, setOpenAlbumId] = useState(null)

  const play = useCallback((id) => {
    setCurrentTrackId(id)
    setIsPlaying(true)
    const el = audioRef.current
    const src = getTrack(id)?.src
    if (el && src) { el.src = src; el.play().catch(() => {}) } // stub src=null -> no-op
  }, [])

  const begin = useCallback(() => { setGateOpen(true); play(SIGNATURE_TRACK_ID) }, [play])
  const selectTrack = useCallback((id) => play(id), [play])
  const togglePlay = useCallback(() => {
    setIsPlaying((p) => {
      const el = audioRef.current
      if (el && getTrack(currentTrackId)?.src) { p ? el.pause() : el.play().catch(() => {}) }
      return !p
    })
  }, [currentTrackId])
  const openAlbum = useCallback((id) => setOpenAlbumId(id), [])
  const closeAlbum = useCallback(() => setOpenAlbumId(null), [])

  return { audioRef, gateOpen, currentTrackId, isPlaying, openAlbumId, begin, selectTrack, togglePlay, openAlbum, closeAlbum }
}
