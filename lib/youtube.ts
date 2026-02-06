const CHANNEL_ID = 'UCTGiHNXyFPBX_PJaF8WKE6w'
const API_BASE = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeChannelStats {
  subscriberCount: string
  viewCount: string
  videoCount: string
  channelTitle: string
  channelDescription: string
  channelAvatar: string
  channelBanner: string
}

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount?: string
}

export interface YouTubePlaylist {
  id: string
  title: string
  thumbnail: string
  itemCount: number
}

export interface YouTubeData {
  stats: YouTubeChannelStats
  videos: YouTubeVideo[]
  playlists: YouTubePlaylist[]
  cached: boolean
  fetchedAt: string
}

export const FALLBACK_DATA: YouTubeData = {
  stats: {
    subscriberCount: '1980000',
    viewCount: '1212458444',
    videoCount: '431',
    channelTitle: 'Whistle On',
    channelDescription: 'Football means more than just a game \u26bd',
    channelAvatar: 'https://yt3.googleusercontent.com/tPJJ9uFpwM2csT07d1BRkd-uW8zIMyO2NOjAYopjK1C2CFCgVqm3w7GwkX-CNqoNfBFixBpQ=s900-c-k-c0x00ffffff-no-rj',
    channelBanner: 'https://yt3.googleusercontent.com/x3bPIcrQu1TSnm1BjbVEeStyY3iBG0wwJEx3XvBDwAwiL6Lp0bWluZlE4SS9bXftQStMHqfUp00=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
  },
  videos: [
    { id: '1', title: 'Ronaldo Respects This Kid More Than Miss Portugal', thumbnail: '', publishedAt: '2025-12-20', viewCount: '100000000' },
    { id: '2', title: 'IShowSpeed and Football Players Cold Bath Challenge + HIM', thumbnail: '', publishedAt: '2025-12-22', viewCount: '14000000' },
    { id: '3', title: 'Ronaldo Celebration Made Her Stop', thumbnail: '', publishedAt: '2025-12-28', viewCount: '9800000' },
    { id: '4', title: 'Ronaldo Level 0 vs Level 999 Ball Control', thumbnail: '', publishedAt: '2026-01-10', viewCount: '10000000' },
    { id: '5', title: 'IShowSpeed vs Ronaldo & Messi Debate', thumbnail: '', publishedAt: '2026-01-15', viewCount: '6400000' },
    { id: '6', title: "Ronaldo and Son's Change Over Time", thumbnail: '', publishedAt: '2026-01-18', viewCount: '4800000' },
    { id: '7', title: 'Ronaldo Finally Respects IShowSpeed', thumbnail: '', publishedAt: '2026-02-01', viewCount: '2500000' },
    { id: '8', title: 'Players Level 1 vs Level 100 Gifts', thumbnail: '', publishedAt: '2026-02-02', viewCount: '655000' },
  ],
  playlists: [
    { id: 'pl1', title: 'IShowSpeed x Ronaldo', thumbnail: '', itemCount: 25 },
    { id: 'pl2', title: 'Respect Moments', thumbnail: '', itemCount: 40 },
    { id: 'pl3', title: 'Emotional Moments', thumbnail: '', itemCount: 35 },
    { id: 'pl4', title: 'Football Moments', thumbnail: '', itemCount: 50 },
    { id: 'pl5', title: 'Saddest Injuries in Football', thumbnail: '', itemCount: 20 },
  ],
  cached: false,
  fetchedAt: new Date().toISOString(),
}

async function fetchWithTimeout(url: string, options: RequestInit & { next?: { revalidate: number } } = {}): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    return res
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchChannelStats(apiKey: string): Promise<YouTubeChannelStats> {
  const url = `${API_BASE}/channels?part=snippet,statistics,brandingSettings&id=${CHANNEL_ID}&key=${apiKey}`
  const res = await fetchWithTimeout(url, { next: { revalidate: 3600 } })

  if (!res.ok) throw new Error(`Channel API failed: ${res.status}`)

  const data = await res.json()
  const channel = data.items?.[0]
  if (!channel) throw new Error('Channel not found')

  return {
    subscriberCount: channel.statistics?.subscriberCount || '0',
    viewCount: channel.statistics?.viewCount || '0',
    videoCount: channel.statistics?.videoCount || '0',
    channelTitle: channel.snippet?.title || 'Whistle On',
    channelDescription: channel.snippet?.description || '',
    channelAvatar: channel.snippet?.thumbnails?.high?.url || channel.snippet?.thumbnails?.default?.url || '',
    channelBanner: channel.brandingSettings?.image?.bannerExternalUrl || '',
  }
}

async function fetchRecentVideos(apiKey: string): Promise<YouTubeVideo[]> {
  const searchUrl = `${API_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&order=date&maxResults=12&type=video&key=${apiKey}`
  const searchRes = await fetchWithTimeout(searchUrl, { next: { revalidate: 3600 } })

  if (!searchRes.ok) throw new Error(`Search API failed: ${searchRes.status}`)

  const searchData = await searchRes.json()
  const videoIds = searchData.items?.map((item: { id: { videoId: string } }) => item.id?.videoId).filter(Boolean).join(',')
  if (!videoIds) return []

  const statsUrl = `${API_BASE}/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
  const statsRes = await fetchWithTimeout(statsUrl, { next: { revalidate: 3600 } })

  if (!statsRes.ok) throw new Error(`Video stats API failed: ${statsRes.status}`)

  const statsData = await statsRes.json()

  return statsData.items?.map((video: {
    id: string
    snippet: { title: string; thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } }; publishedAt: string }
    statistics: { viewCount?: string }
  }) => ({
    id: video.id,
    title: video.snippet?.title || '',
    thumbnail: video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url || '',
    publishedAt: video.snippet?.publishedAt || '',
    viewCount: video.statistics?.viewCount || '0',
  })) || []
}

async function fetchPlaylists(apiKey: string): Promise<YouTubePlaylist[]> {
  const url = `${API_BASE}/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=10&key=${apiKey}`
  const res = await fetchWithTimeout(url, { next: { revalidate: 3600 } })

  if (!res.ok) throw new Error(`Playlists API failed: ${res.status}`)

  const data = await res.json()

  return data.items?.map((pl: {
    id: string
    snippet: { title: string; thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } } }
    contentDetails: { itemCount: number }
  }) => ({
    id: pl.id,
    title: pl.snippet?.title || '',
    thumbnail: pl.snippet?.thumbnails?.high?.url || pl.snippet?.thumbnails?.medium?.url || '',
    itemCount: pl.contentDetails?.itemCount || 0,
  })) || []
}

export async function getYouTubeData(): Promise<YouTubeData> {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    return { ...FALLBACK_DATA, fetchedAt: new Date().toISOString() }
  }

  try {
    const [stats, videos, playlists] = await Promise.all([
      fetchChannelStats(apiKey),
      fetchRecentVideos(apiKey),
      fetchPlaylists(apiKey),
    ])

    return {
      stats,
      videos,
      playlists,
      cached: false,
      fetchedAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error('YouTube API Error:', error)
    return { ...FALLBACK_DATA, fetchedAt: new Date().toISOString() }
  }
}
