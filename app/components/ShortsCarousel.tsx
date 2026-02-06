'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { VideoModal } from './VideoModal'

interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount?: string
}

function formatViews(views: string): string {
  const num = parseInt(views)
  if (isNaN(num)) return views
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return String(num)
}

export function ShortsCarousel({ videos }: { videos: Video[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [modalVideoId, setModalVideoId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: false })

  const shorts = videos.slice(0, 10)

  const scroll = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const amount = direction === 'left' ? -300 : 300
    track.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const track = trackRef.current
    if (!track) return
    setIsDragging(true)
    dragState.current = { startX: e.pageX - track.offsetLeft, scrollLeft: track.scrollLeft, moved: false }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const track = trackRef.current
    if (!track) return
    e.preventDefault()
    const x = e.pageX - track.offsetLeft
    const walk = x - dragState.current.startX
    if (Math.abs(walk) > 5) dragState.current.moved = true
    track.scrollLeft = dragState.current.scrollLeft - walk
  }, [isDragging])

  const onMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleCardClick = useCallback((videoId: string) => {
    if (!dragState.current.moved) {
      setModalVideoId(videoId)
    }
  }, [])

  if (!shorts.length) return null

  return (
    <section className="shorts-section" id="shorts">
      <h2 className="section-title">Shorts</h2>
      <p className="section-subtitle">Quick hits of football magic</p>
      <div className="shorts-carousel">
        <button className="shorts-nav shorts-nav-left" onClick={() => scroll('left')} aria-label="Scroll left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div
          ref={trackRef}
          className={`shorts-track${isDragging ? ' dragging' : ''}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {shorts.map((video) => (
            <div
              key={video.id}
              className="shorts-card glass glass-hover"
              onClick={() => handleCardClick(video.id)}
              role="button"
              tabIndex={0}
            >
              <div className="shorts-thumb">
                {video.thumbnail ? (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="180px"
                    style={{ objectFit: 'cover' }}
                    draggable={false}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}>
                    ⚽
                  </div>
                )}
                <div className="shorts-play">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M8 5v14l11-7z" fill="currentColor"/>
                  </svg>
                </div>
                {video.viewCount && (
                  <span className="shorts-views">{formatViews(video.viewCount)}</span>
                )}
              </div>
              <p className="shorts-title">{video.title}</p>
            </div>
          ))}
        </div>
        <button className="shorts-nav shorts-nav-right" onClick={() => scroll('right')} aria-label="Scroll right">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />
    </section>
  )
}
