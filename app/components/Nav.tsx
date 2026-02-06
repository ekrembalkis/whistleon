'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const sections = ['hero', 'stats', 'videos', 'playlists'] as const

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="nav">
      <a href="/" className="nav-logo">
        <Image src="/logo.png" alt="Whistle On" width={32} height={32} />
        WHISTLE ON
      </a>
      <a href="#stats" className={`nav-link${activeSection === 'stats' ? ' active' : ''}`}>Stats</a>
      <a href="#videos" className={`nav-link${activeSection === 'videos' ? ' active' : ''}`}>Videos</a>
      <a href="#playlists" className={`nav-link${activeSection === 'playlists' ? ' active' : ''}`}>Playlists</a>
    </nav>
  )
}
