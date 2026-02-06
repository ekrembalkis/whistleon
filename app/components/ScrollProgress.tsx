'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      if (fillRef.current) {
        fillRef.current.style.width = `${pct}%`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress-bar">
      <div ref={fillRef} className="scroll-progress-fill" />
    </div>
  )
}
