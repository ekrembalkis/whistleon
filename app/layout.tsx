import type { Metadata, Viewport } from 'next'
import { ParallaxBlobs } from './components/ParallaxBlobs'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://whistleonfootball.com'),
  title: 'Whistle On | Football Means More Than Just a Game',
  description: 'Official website for Whistle On Football - Your source for the best football content, Ronaldo highlights, and viral football moments.',
  keywords: ['Whistle On', 'Football', 'Soccer', 'Ronaldo', 'YouTube', 'Shorts'],
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Whistle On Football',
    description: 'Football means more than just a game ⚽',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whistle On Football',
    description: 'Football means more than just a game ⚽',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Whistle On Football',
  url: 'https://whistleonfootball.com',
  logo: 'https://whistleonfootball.com/logo.png',
  sameAs: [
    'https://www.youtube.com/@WhistleOnFootball',
    'https://www.instagram.com/whistleonfootball',
    'https://www.tiktok.com/@whistleonfootball',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ParallaxBlobs />
        {children}
      </body>
    </html>
  )
}
