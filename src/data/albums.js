import { getTrack } from './tracks'
export const albums = [
  { id: 'reveries', title: 'Reveries', year: '2024', cover: null, trackIds: ['nocturne-eflat', 'still-water'] },
  { id: 'after-hours', title: 'After Hours', year: '2023', cover: null, trackIds: ['blue-reverie', 'cafe-trois'] },
]
export const albumTracks = (album) => album.trackIds.map(getTrack).filter(Boolean)
