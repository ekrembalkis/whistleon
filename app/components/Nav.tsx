import Image from 'next/image'

export function Nav() {
  return (
    <nav className="nav">
      <a href="#" className="nav-logo">
        <Image src="/logo.png" alt="Whistle On" width={32} height={32} />
        WHISTLE ON
      </a>
      <a href="#stats" className="nav-link active">Stats</a>
      <a href="#videos" className="nav-link">Videos</a>
      <a href="#playlists" className="nav-link">Playlists</a>
    </nav>
  )
}
