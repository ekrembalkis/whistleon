'use client'

import { useEffect, useCallback } from 'react'

interface VideoModalProps {
  videoId: string | null
  onClose: () => void
}

export function VideoModal({ videoId, onClose }: VideoModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (videoId) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [videoId, handleKey])

  if (!videoId) return null

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <iframe
          className="video-modal-frame"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video player"
        />
      </div>
    </div>
  )
}
