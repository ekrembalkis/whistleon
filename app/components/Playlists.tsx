interface Playlist {
  id: string
  title: string
  thumbnail: string
  itemCount: number
}

const PLAYLIST_ICONS: Record<string, string> = {
  'IShowSpeed x Ronaldo': '⚡',
  'Respect Moments': '🤝',
  'Emotional Moments': '💚',
  'Football Moments': '⚽',
  'Saddest Injuries in Football': '🏥',
}

export function Playlists({ playlists }: { playlists: Playlist[] }) {
  if (!playlists || playlists.length === 0) return null

  return (
    <section className="playlists-section" id="playlists">
      <h2 className="section-title">Playlists</h2>
      <p className="section-subtitle">Curated collections of the best football content</p>
      <div className="playlists-grid">
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={`https://www.youtube.com/playlist?list=${playlist.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover shimmer playlist-card"
          >
            <div className="playlist-icon">
              {PLAYLIST_ICONS[playlist.title] || '📋'}
            </div>
            <h3 className="playlist-title">{playlist.title}</h3>
            <p className="playlist-count">{playlist.itemCount} videos</p>
          </a>
        ))}
      </div>
    </section>
  )
}
