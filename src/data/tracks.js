// Stub track data. `src` is null now (audio stubbed); drop real files into
// public/audio/ and set src here later — no other change needed. Stream-only.
export const tracks = [
  { id: 'nocturne-eflat', title: 'Nocturne in E-flat', instrument: 'Solo Piano', duration: '4:22', year: '2023', catalogId: 'JCQ-001', src: null },
  { id: 'blue-reverie',   title: 'Blue Reverie',        instrument: 'Piano Trio', duration: '6:08', year: '2024', catalogId: 'JCQ-002', src: null },
  { id: 'cafe-trois',     title: 'Café Trois',          instrument: 'Jazz Quartet', duration: '5:47', year: '2023', catalogId: 'JCQ-003', src: null },
  { id: 'still-water',    title: 'Still Water',         instrument: 'Solo Piano', duration: '3:55', year: '2022', catalogId: 'JCQ-004', src: null },
]
export const SIGNATURE_TRACK_ID = 'nocturne-eflat'
export const getTrack = (id) => tracks.find((t) => t.id === id)
