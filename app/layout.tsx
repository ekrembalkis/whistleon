import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Whistle On | Football Means More Than Just a Game',
  description: 'Official website for Whistle On Football - Your source for the best football content, Ronaldo highlights, and viral football moments.',
  keywords: ['Whistle On', 'Football', 'Soccer', 'Ronaldo', 'YouTube', 'Shorts'],
  openGraph: {
    title: 'Whistle On Football',
    description: 'Football means more than just a game ⚽',
    type: 'website',
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
        <div className="bg-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        {children}
      </body>
    </html>
  )
}
