import Image from 'next/image'

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

export function Videos({ videos }: { videos: Video[] }) {
  if (!videos || videos.length === 0) return null

  return (
    <section className="videos-section" id="videos">
      <h2 className="section-title">Latest Shorts</h2>
      <p className="section-subtitle">Catch the most viral football moments</p>
      <div className="videos-grid">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/shorts/${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover video-card"
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
          </a>
        ))}
      </div>
    </section>
  )
}
