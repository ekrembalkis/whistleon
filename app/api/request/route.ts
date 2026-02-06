import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : ''
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : ''
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    let supabase
    try {
      supabase = getSupabase()
    } catch {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const { error } = await supabase
      .from('requests')
      .insert({ name, email: email.toLowerCase(), message, created_at: new Date().toISOString() })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save request' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
