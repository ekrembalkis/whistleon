import Image from 'next/image'

export function Nav({ avatar }: { avatar: string }) {
  return (
    <nav className="nav">
      <a href="#" className="nav-logo">
        {avatar && (
          <Image src={avatar} alt="Whistle On" width={28} height={28} style={{ borderRadius: '50%' }} />
        )}
        WHISTLE ON
      </a>
      <a href="#stats" className="nav-link active">Stats</a>
      <a href="#videos" className="nav-link">Videos</a>
      <a href="#playlists" className="nav-link">Playlists</a>
    </nav>
  )
}
