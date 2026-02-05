import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Videos } from './components/Videos'
import { Playlists } from './components/Playlists'
import { Footer } from './components/Footer'
import { getYouTubeData } from '@/lib/youtube'

export const revalidate = 3600

export default async function Home() {
  const data = await getYouTubeData()

  return (
    <>
      <Nav avatar={data.stats.channelAvatar} />
      <main>
        <Hero
          title={data.stats.channelTitle}
          description={data.stats.channelDescription}
          avatar={data.stats.channelAvatar}
        />
        <Stats
          subscribers={data.stats.subscriberCount}
          views={data.stats.viewCount}
          videos={data.stats.videoCount}
        />
        <Videos videos={data.videos} />
        <Playlists playlists={data.playlists} />
      </main>
      <Footer />
    </>
  )
}
