// AlbumOverlay — A1b "Programme" panel as a modal pop-up.
// Visual + interaction ported from docs/superpowers/specs/variants/A1b-recital-full/mockup.html
// (.program-container / .program-header / .program-row / .program-footer).
// Behavior preserved: Escape / scrim / × close it, body-scroll locked while open,
// row click plays or toggles the track.
// Responsive: desktop/tablet uses the 5-column program row (num / title / genre /
// duration / play); mobile re-flows the same elements via grid-template-areas
// into a 4-column 2-row layout (num and play span both rows, title on top,
// genre + duration share the bottom row).

import { useEffect } from 'react'
import { albumTracks } from '../data/albums'

const ROMAN = ['i.', 'ii.', 'iii.', 'iv.', 'v.', 'vi.', 'vii.', 'viii.', 'ix.', 'x.']

const overlayStyles = `
  @keyframes overlayScrimIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes programPopIn {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(18px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .overlay-scrim {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(8,4,2,0.78);
    animation: overlayScrimIn 0.32s ease forwards;
  }

  .program-modal {
    position: relative;
    width: 100%;
    max-width: 720px;
    max-height: 88vh;
    overflow-y: auto;
    background: rgba(255,235,210,0.04);
    border: 1px solid rgba(200,160,100,0.12);
    border-radius: 14px;
    backdrop-filter: blur(18px) saturate(1.3);
    -webkit-backdrop-filter: blur(18px) saturate(1.3);
    box-shadow:
      inset 0 1px 0 rgba(255,220,160,0.06),
      0 24px 80px rgba(0,0,0,0.75);
    transform-origin: center center;
    animation: programPopIn 0.5s cubic-bezier(0.18,0.89,0.32,1.28) forwards;
  }
  .program-modal::before {
    content: '';
    position: absolute;
    top: -50px; left: 50%;
    transform: translateX(-50%);
    width: 400px; height: 180px;
    background: radial-gradient(circle, rgba(200,137,58,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .program-modal-close {
    position: absolute;
    top: 14px; right: 14px;
    width: 32px; height: 32px;
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: rgba(240,232,220,0.55);
    font-size: 1.4rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease, background 0.3s ease;
    z-index: 5;
  }
  .program-modal-close:hover {
    color: rgba(240,232,220,0.95);
    background: rgba(255,235,210,0.05);
  }

  .program-modal-header {
    padding: 40px 60px 26px;
    text-align: center;
    border-bottom: 1px solid rgba(200,137,58,0.09);
    position: relative;
    z-index: 1;
  }
  .program-modal-eyebrow {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 0.72rem;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: rgba(200,137,58,0.55);
    font-weight: 400;
    margin: 0 0 6px;
  }
  .program-modal-title {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.35rem;
    font-weight: 400;
    letter-spacing: 0.10em;
    color: #f0e8dc;
    margin: 0;
  }
  .program-modal-year {
    margin: 8px 0 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    font-style: italic;
    font-size: 0.78rem;
    color: rgba(138,122,104,0.45);
    letter-spacing: 0.06em;
  }

  .program-modal-rows {
    padding: 0 60px;
    position: relative;
    z-index: 1;
  }
  .program-modal-row {
    width: 100%;
    display: grid;
    grid-template-columns: 38px 1fr auto auto 36px;
    grid-template-areas: "num title genre duration play";
    align-items: center;
    gap: 0 24px;
    padding: 20px 0;
    border: none;
    border-bottom: 1px solid rgba(200,137,58,0.07);
    background: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    text-align: left;
    position: relative;
    transition: background 0.28s ease;
  }
  .program-modal-row:last-child {
    border-bottom: none;
  }
  .program-modal-row:hover {
    background: rgba(255,235,210,0.025);
  }
  .program-modal-row::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(200,137,58,0.20), transparent);
    opacity: 0;
    transition: opacity 0.28s ease;
  }
  .program-modal-row:hover::after { opacity: 1; }

  .prog-num {
    grid-area: num;
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 0.78rem;
    color: rgba(200,137,58,0.45);
    letter-spacing: 0.06em;
    text-align: right;
  }
  .prog-title {
    grid-area: title;
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 1.05rem;
    font-weight: 400;
    color: #f0e8dc;
    letter-spacing: 0.02em;
    transition: color 0.28s ease;
  }
  .program-modal-row:hover .prog-title {
    color: #e8b060;
  }
  .prog-genre {
    grid-area: genre;
    font-family: system-ui, Arial, sans-serif;
    font-size: 10px;
    letter-spacing: 0.12em;
    color: #8a7a68;
    text-transform: uppercase;
  }
  .prog-duration {
    grid-area: duration;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 0.82rem;
    color: rgba(138,122,104,0.55);
    letter-spacing: 0.06em;
    text-align: right;
  }
  .prog-play {
    grid-area: play;
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(200,160,100,0.20);
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.28s ease, background 0.28s ease;
  }
  .program-modal-row:hover .prog-play {
    border-color: rgba(200,137,58,0.55);
    background: rgba(200,137,58,0.10);
  }

  .program-modal-footer {
    padding: 22px 60px 28px;
    text-align: center;
    border-top: 1px solid rgba(200,137,58,0.07);
    position: relative;
    z-index: 1;
  }
  .program-modal-footer span {
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
    font-size: 0.80rem;
    color: rgba(138,122,104,0.40);
    letter-spacing: 0.06em;
  }

  /* Tablet — same 5-col layout, tighter side padding */
  @media (min-width: 641px) and (max-width: 1024px) {
    .program-modal-header { padding: 32px 36px 22px; }
    .program-modal-rows { padding: 0 36px; }
    .program-modal-footer { padding: 18px 36px 22px; }
  }

  /* Mobile — 4-col, 2-row grid; num + play span both rows, genre+duration
     drop under the title on row 2. Same elements, just re-placed. */
  @media (max-width: 640px) {
    .overlay-scrim { padding: 16px; }
    .program-modal { max-height: 90vh; }
    .program-modal-header { padding: 28px 22px 18px; }
    .program-modal-title { font-size: 1.16rem; letter-spacing: 0.06em; }
    .program-modal-eyebrow { font-size: 0.62rem; letter-spacing: 0.26em; }
    .program-modal-rows { padding: 0 22px; }
    .program-modal-row {
      grid-template-columns: 24px 1fr auto 30px;
      grid-template-rows: auto auto;
      grid-template-areas:
        "num title    title    play"
        "num genre    duration play";
      column-gap: 14px;
      row-gap: 4px;
      padding: 14px 0;
    }
    .prog-num {
      align-self: center;
      font-size: 0.72rem;
    }
    .prog-title {
      font-size: 0.96rem;
    }
    .prog-genre {
      font-size: 9px;
      letter-spacing: 0.10em;
    }
    .prog-duration {
      font-size: 0.74rem;
    }
    .prog-play {
      align-self: center;
      width: 26px; height: 26px;
    }
    .program-modal-footer { padding: 16px 22px 22px; }
    .program-modal-footer span { font-size: 0.74rem; }
    .program-modal-close { top: 10px; right: 10px; }
  }
`

export default function AlbumOverlay({
  album,
  onClose,
  onSelectTrack,
  currentTrackId,
  isPlaying,
  onTogglePlay,
}) {
  useEffect(() => {
    if (!album) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [album, onClose])

  if (!album) return null

  const tracks = albumTracks(album)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${album.title} programme`}
      onClick={onClose}
      className="overlay-scrim"
    >
      <style>{overlayStyles}</style>

      <div className="program-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="program-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header — matches the in-page program-container header */}
        <div className="program-modal-header">
          <p className="program-modal-eyebrow">{album.title}</p>
          <p className="program-modal-title">
            {album.subtitle || 'Works for Piano, Trio & Quartet'}
          </p>
          {album.year && <p className="program-modal-year">{album.year}</p>}
        </div>

        {/* Rows — A1b program-row layout, click to play / toggle */}
        <div className="program-modal-rows">
          {tracks.map((t, i) => {
            const isCurrent = t.id === currentTrackId
            const isCurrentAndPlaying = isCurrent && isPlaying
            const handleClick = () => {
              if (isCurrent) onTogglePlay()
              else onSelectTrack(t.id)
            }
            return (
              <button
                key={t.id}
                type="button"
                className="program-modal-row"
                onClick={handleClick}
                aria-label={isCurrent && isPlaying ? `Pause ${t.title}` : `Play ${t.title}`}
              >
                <span className="prog-num">{ROMAN[i] ?? `${i + 1}.`}</span>
                <span className="prog-title">{t.title}</span>
                <span className="prog-genre">{t.instrument}</span>
                <span className="prog-duration">{t.duration}</span>
                <span className="prog-play" aria-hidden="true">
                  {isCurrentAndPlaying ? (
                    <svg width="9" height="11" viewBox="0 0 12 14" fill="none">
                      <rect x="1"   y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
                      <rect x="7.5" y="1" width="3.5" height="12" rx="1.5" fill="#e8b060" opacity="0.90"/>
                    </svg>
                  ) : (
                    <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                      <path d="M1.2 1.0l6.6 4.0-6.6 4.0V1.0z" fill="#e8b060" opacity="0.82"/>
                    </svg>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Footer — matches in-page program footer */}
        <div className="program-modal-footer">
          <span>Offered as they were made — unguarded, unhurried.</span>
        </div>
      </div>
    </div>
  )
}
