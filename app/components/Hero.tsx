import Image from 'next/image'

interface HeroProps {
  title: string
  description: string
}

export function Hero({ title, description }: HeroProps) {
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
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{description}</p>
      <a
        href="https://www.youtube.com/@WhistleOnFootball"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cta"
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
