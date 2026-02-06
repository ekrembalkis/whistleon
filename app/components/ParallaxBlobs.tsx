'use client'

import { useEffect, useRef } from 'react'

export function ParallaxBlobs() {
  const blob1 = useRef<HTMLDivElement>(null)
  const blob2 = useRef<HTMLDivElement>(null)
  const blob3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (blob1.current) blob1.current.style.transform = `translateY(${y * 0.03}px)`
      if (blob2.current) blob2.current.style.transform = `translateY(${y * -0.05}px)`
      if (blob3.current) blob3.current.style.transform = `translateY(${y * 0.06}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-blobs" aria-hidden="true">
      <div ref={blob1} className="blob blob-1" />
      <div ref={blob2} className="blob blob-2" />
      <div ref={blob3} className="blob blob-3" />
    </div>
  )
}
