'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface HeroProps {
  title: string
  description: string
}

export function Hero({ title, description }: HeroProps) {
  const [revealSubtitle, setRevealSubtitle] = useState(false)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const words = title.split(' ')

  useEffect(() => {
    const delay = words.length * 150 + 800
    const timer = setTimeout(() => setRevealSubtitle(true), delay)
    return () => clearTimeout(timer)
  }, [words.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = ctaRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 80
    if (dist < maxDist) {
      const factor = (maxDist - dist) / maxDist * 6
      btn.style.transform = `translate(${dx / maxDist * factor}px, ${dy / maxDist * factor}px)`
    }
  }

  const handleMouseLeave = () => {
    if (ctaRef.current) {
      ctaRef.current.style.transform = ''
    }
  }

  return (
    <section className="hero" id="hero">
      <Image
        src="/logo.png"
        alt={title}
        width={140}
        height={140}
        className="hero-avatar"
        priority
      />
      <h1 className="hero-title hero-title-reveal">
        {words.map((word, i) => (
          <span key={i} style={{ animationDelay: `${i * 150}ms` }}>
            {word}{' '}
          </span>
        ))}
      </h1>
      <p className={`hero-subtitle hero-subtitle-reveal${revealSubtitle ? ' reveal-in' : ''}`}>
        {description}
      </p>
      <a
        ref={ctaRef}
        href="https://www.youtube.com/@WhistleOnFootball"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cta"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        Subscribe on YouTube
      </a>
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </section>
  )
}
