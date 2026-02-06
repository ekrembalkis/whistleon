import type { Metadata } from 'next'
import { ParallaxBlobs } from './components/ParallaxBlobs'
import './globals.css'

export const metadata: Metadata = {
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ParallaxBlobs />
        {children}
      </body>
    </html>
  )
}
