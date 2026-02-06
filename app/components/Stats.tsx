'use client'

import { useEffect, useRef, useState } from 'react'

interface StatsProps {
  subscribers: string
  views: string
  videos: string
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const stepTime = duration / steps
          let current = 0

          timerRef.current = setInterval(() => {
            current += 1
            const progress = current / steps
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(target * eased))

            if (current >= steps) {
              setCount(target)
              if (timerRef.current) clearInterval(timerRef.current)
              timerRef.current = null
            }
          }, stepTime)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      observer.disconnect()
    }
  }, [target])

  return (
    <div ref={ref} className="stat-value counter-animate" aria-live="polite">
      {formatNumber(count)}{suffix}
    </div>
  )
}

export function Stats({ subscribers, views, videos }: StatsProps) {
  const subCount = parseInt(subscribers) || 0
  const viewCount = parseInt(views) || 0
  const videoCount = parseInt(videos) || 0

  const milestone = 2_000_000
  const progressPct = Math.min((subCount / milestone) * 100, 100)

  return (
    <section className="stats-section" id="stats">
      <h2 className="section-title">Channel Stats</h2>
      <p className="section-subtitle">Growing every day with the football community</p>
      <div className="stats-dashboard glass liquid-shine">
        <div className="stat-column">
          <AnimatedCounter target={subCount} />
          <div className="stat-label-group">
            <div className="stat-label">Subscribers</div>
          </div>
          <div className="stat-milestone">
            <div className="milestone-bar">
              <div className="milestone-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="milestone-text">{Math.round(progressPct)}% to 2M</div>
          </div>
        </div>

        <div className="stats-divider" />

        <div className="stat-column">
          <AnimatedCounter target={viewCount} />
          <div className="stat-label-group">
            <div className="stat-label">Total Views</div>
          </div>
        </div>

        <div className="stats-divider" />

        <div className="stat-column">
          <AnimatedCounter target={videoCount} />
          <div className="stat-label-group">
            <div className="stat-label">Videos</div>
          </div>
        </div>
      </div>
    </section>
  )
}
