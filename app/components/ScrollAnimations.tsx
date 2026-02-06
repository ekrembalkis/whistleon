'use client'

import { useEffect } from 'react'

export function ScrollAnimations() {
  useEffect(() => {
    const targets = document.querySelectorAll('section, .video-card, .playlist-card, .featured-card, .shorts-card')
    targets.forEach((el) => el.classList.add('animate-target'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
