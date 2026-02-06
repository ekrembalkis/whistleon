import { NextResponse } from 'next/server'
import { getYouTubeData, FALLBACK_DATA } from '@/lib/youtube'

export async function GET() {
  try {
    const data = await getYouTubeData()

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
    })
  } catch (error) {
    console.error('YouTube API route error:', error)
    return NextResponse.json(
      { ...FALLBACK_DATA, fetchedAt: new Date().toISOString() },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    )
  }
}
