/* eslint-disable @next/next/no-img-element */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/logo.png" alt="Whistle On" className="footer-logo-img" />
          WHISTLE ON
        </div>
        <p className="footer-text">Football means more than just a game ⚽</p>
        <a
          href="https://www.youtube.com/@WhistleOnFootball"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-yt-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Visit YouTube Channel
        </a>
        <p className="footer-copy">&copy; {year} Whistle On. All rights reserved.</p>
      </div>
    </footer>
  )
}
