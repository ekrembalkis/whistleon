'use client'

import { useRef, useCallback, useState } from 'react'
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

function FeaturedCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }, [])

  return (
    <div
      ref={cardRef}
      className="glass glass-hover featured-card card-3d"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
    >
      <div className="featured-thumbnail">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
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
        <span className="featured-badge">Fan Favorite</span>
        {video.viewCount && (
          <span className="video-views">{formatViews(video.viewCount)}</span>
        )}
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
      </div>
    </div>
  )
}

export function Featured({ videos }: { videos: Video[] }) {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null)

  if (!videos.length) return null

  return (
    <section className="featured-section" id="featured">
      <h2 className="section-title">Fan Favorites</h2>
      <p className="section-subtitle">The most-watched moments our fans can&apos;t stop replaying</p>
      <div className="featured-grid">
        {videos.map((video) => (
          <FeaturedCard
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
