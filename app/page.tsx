import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { ShortsCarousel } from './components/ShortsCarousel'
import { Featured } from './components/Featured'
import { AboutUs } from './components/AboutUs'
import { Newsletter } from './components/Newsletter'
import { Business } from './components/Business'
import { RequestForm } from './components/RequestForm'
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
        <ShortsCarousel videos={data.videos} />
        <div className="section-divider" />
        <Featured videos={data.popularVideos} />
        <div className="section-divider" />
        <AboutUs />
        <div className="section-divider" />
        <Newsletter />
        <div className="section-divider" />
        <Business />
        <div className="section-divider" />
        <RequestForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
