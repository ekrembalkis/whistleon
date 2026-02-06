import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-number">404</div>
      <h1 className="not-found-title">Off Target!</h1>
      <p className="not-found-text">
        That shot went wide. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="not-found-btn">
        Back to Home
      </Link>
    </div>
  )
}
