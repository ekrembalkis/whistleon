interface Playlist {
  id: string
  title: string
  thumbnail: string
  itemCount: number
}

function PlaylistIcon({ title }: { title: string }) {
  const t = title.toLowerCase()

  if (t.includes('speed') || t.includes('ronaldo')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  }

  if (t.includes('respect')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M7 15s1.5 2 5 2 5-2 5-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  }

  if (t.includes('emotional') || t.includes('sad')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }

  if (t.includes('injur')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  }

  // Default: football / play icon
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
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
            className="glass glass-hover playlist-card"
          >
            <div className="playlist-icon">
              <PlaylistIcon title={playlist.title} />
            </div>
            <h3 className="playlist-title">{playlist.title}</h3>
            <p className="playlist-count">{playlist.itemCount} videos</p>
          </a>
        ))}
      </div>
    </section>
  )
}
