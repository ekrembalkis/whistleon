'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const sections = ['hero', 'stats', 'shorts', 'playlists', 'featured', 'about', 'request'] as const

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [menuOpen, setMenuOpen] = useState(false)

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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { id: 'stats', label: 'Stats' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'featured', label: 'Featured' },
    { id: 'about', label: 'About' },
    { id: 'request', label: 'Request' },
  ]

  return (
    <>
      <nav className="nav">
        <a href="/" className="nav-logo">
          <Image src="/logo.png" alt="Whistle On" width={32} height={32} />
          WHISTLE ON
        </a>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`nav-link${activeSection === link.id ? ' active' : ''}`}
          >
            {link.label}
          </a>
        ))}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-icon${menuOpen ? ' open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`mobile-menu-link${activeSection === link.id ? ' active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
