import Image from 'next/image'

export function Nav({ avatar }: { avatar: string }) {
  return (
    <nav className="nav">
      <a href="#" className="nav-logo">
        {avatar ? (
          <Image src={avatar} alt="Whistle On" width={32} height={32} />
        ) : (
          <Image src="/icon.png" alt="Whistle On" width={32} height={32} />
        )}
        WHISTLE ON
      </a>
      <a href="#stats" className="nav-link active">Stats</a>
      <a href="#videos" className="nav-link">Videos</a>
      <a href="#playlists" className="nav-link">Playlists</a>
    </nav>
  )
}
