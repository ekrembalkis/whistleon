import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Videos } from './components/Videos'
import { Playlists } from './components/Playlists'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { ScrollAnimations } from './components/ScrollAnimations'
import { ScrollToTop } from './components/ScrollToTop'
import { getYouTubeData } from '@/lib/youtube'

export const revalidate = 3600

export default async function Home() {
  const data = await getYouTubeData()

  return (
    <>
      <ScrollProgress />
      <Nav />
      <ScrollAnimations />
      <main>
        <Hero
          title={data.stats.channelTitle}
          description={data.stats.channelDescription}
        />
        <div className="section-divider" />
        <Stats
          subscribers={data.stats.subscriberCount}
          views={data.stats.viewCount}
          videos={data.stats.videoCount}
        />
        <div className="section-divider" />
        <Videos videos={data.videos} />
        <div className="section-divider" />
        <Playlists playlists={data.playlists} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
