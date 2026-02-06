export function Business() {
  const tags = ['Sponsorships', 'Brand Deals', 'Content Collaborations', 'Merch']

  return (
    <section className="business-section" id="business">
      <h2 className="section-title">Work With Us</h2>
      <p className="section-subtitle">Let&apos;s create something amazing together</p>
      <div className="business-card glass liquid-shine">
        <div className="business-inner">
          <div className="business-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <h3 className="business-heading">Partner with Whistle On</h3>
          <p className="business-description">
            With millions of engaged football fans across YouTube, Instagram, and TikTok, Whistle On
            offers unique opportunities for brands to connect with a passionate global audience.
            Whether it&apos;s a sponsorship, collaboration, or custom content — we&apos;re ready to play.
          </p>
          <div className="business-tags">
            {tags.map((tag) => (
              <span key={tag} className="business-tag">{tag}</span>
            ))}
          </div>
          <a href="mailto:business@whistleon.com" className="business-cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
