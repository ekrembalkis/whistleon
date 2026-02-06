'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
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
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M views'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K views'
  return num + ' views'
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = useRef(false)

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouchDevice.current) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick()
  }

  const handleAuxClick = (e: React.MouseEvent) => {
    if (e.button === 1) {
      window.open(`https://www.youtube.com/shorts/${video.id}`, '_blank')
    }
  }

  return (
    <div
      ref={cardRef}
      className="glass glass-hover video-card card-3d"
      onClick={handleClick}
      onAuxClick={handleAuxClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
    >
      <div className="video-thumbnail">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
          }}>
            ⚽
          </div>
        )}
        <div className="video-play-btn">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        {video.viewCount && (
          <span className="video-views">{formatViews(video.viewCount)}</span>
        )}
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-date">{formatDate(video.publishedAt)}</p>
      </div>
    </div>
  )
}

export function Videos({ videos }: { videos: Video[] }) {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null)

  if (!videos || videos.length === 0) return null

  return (
    <section className="videos-section" id="videos">
      <h2 className="section-title">Latest Shorts</h2>
      <p className="section-subtitle">Catch the most viral football moments</p>
      <div className="videos-grid">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setModalVideoId(video.id)}
          />
        ))}
      </div>
      <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />
    </section>
  )
}
