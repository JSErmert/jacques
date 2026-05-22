import { describe, it, expect } from 'vitest'
import { tracks, getTrack } from './tracks'
import { albums, albumTracks } from './albums'

describe('data', () => {
  it('every track has the required shape', () => {
    for (const t of tracks) {
      expect(t).toMatchObject({ id: expect.any(String), title: expect.any(String), instrument: expect.any(String), duration: expect.any(String), catalogId: expect.any(String) })
      expect('src' in t).toBe(true) // stub now (null/placeholder), real file later
    }
  })
  it('getTrack returns by id', () => { expect(getTrack(tracks[0].id).title).toBe(tracks[0].title) })
  it('every album trackId resolves to a real track', () => {
    for (const a of albums) for (const id of a.trackIds) expect(getTrack(id)).toBeTruthy()
  })
  it('albumTracks expands an album to track objects', () => {
    expect(albumTracks(albums[0]).length).toBe(albums[0].trackIds.length)
  })
})
