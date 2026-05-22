import { useEffect } from 'react'
import FrostPanel from './FrostPanel'
import { albumTracks } from '../data/albums'

const overlayStyles = `
  .overlay-panel {
    max-width: 32rem;
    width: 90%;
    padding: 2rem;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
  }
  @media (max-width: 768px) {
    .overlay-panel {
      width: 92vw;
      padding: 1.25rem 1rem;
      max-height: 85vh;
    }
  }
`

export default function AlbumOverlay({ album, onClose, onSelectTrack, currentTrackId, isPlaying, onTogglePlay }) {
  useEffect(() => {
    if (!album) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [album, onClose])
  if (!album) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={`${album.title} tracks`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(8,4,2,0.72)' }}>
      <style>{overlayStyles}</style>
      <FrostPanel className="overlay-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
        <button aria-label="Close" onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,232,220,0.70)', fontSize: '1.4rem', lineHeight: 1 }}>×</button>
        <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '1.5rem', color: '#f0e8dc', marginBottom: '4px', paddingRight: '2rem' }}>{album.title}</h3>
        <p style={{ color: 'rgba(240,232,220,0.50)', fontSize: '0.8rem', marginBottom: '1.25rem', letterSpacing: '0.06em' }}>{album.year}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {albumTracks(album).map((t) => {
            const isCurrentAndPlaying = t.id === currentTrackId && isPlaying
            const handleTrackClick = () => {
              if (t.id === currentTrackId) {
                onTogglePlay()
              } else {
                onSelectTrack(t.id)
              }
            }
            return (
              <li key={t.id}>
                <button onClick={handleTrackClick} style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(200,137,58,0.08)',
                  cursor: 'pointer',
                  color: 'rgba(240,232,220,0.85)',
                  textAlign: 'left',
                  gap: '12px',
                }}>
                  {isCurrentAndPlaying ? (
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <rect x="1"   y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
                      <rect x="7.5" y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
                    </svg>
                  ) : (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="M1.5 1.2l7.2 4.4-7.2 4.4V1.2z" fill="#e8b060" opacity="0.85"/>
                    </svg>
                  )}
                  <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: 'italic', flex: 1 }}>{t.title}</span>
                  <span style={{ color: 'rgba(240,232,220,0.40)', fontSize: '0.8rem', flexShrink: 0 }}>{t.duration}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </FrostPanel>
    </div>
  )
}
