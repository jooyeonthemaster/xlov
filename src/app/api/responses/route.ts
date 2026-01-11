import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberId, responses, generatedImageUrl } = body

    const supabase = await createClient()

    const { data, error } = await supabase.from('fan_responses').insert({
      member: memberId,
      color: responses.color,
      season: responses.season,
      time_of_day: responses.timeOfDay,
      texture: responses.texture,
      emotion: responses.emotion,
      one_word: responses.oneWord,
      generated_image_url: generatedImageUrl,
    }).select()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Save response error:', error)
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('member')

    const supabase = await createClient()

    let query = supabase.from('fan_responses').select('*')

    if (memberId) {
      query = query.eq('member', memberId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Get responses error:', error)
    return NextResponse.json(
      { error: 'Failed to get responses' },
      { status: 500 }
    )
  }
}
