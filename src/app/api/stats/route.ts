import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get total participants count
    const { count: totalParticipants, error: countError } = await supabase
      .from('fan_responses')
      .select('*', { count: 'exact', head: true })

    // Get counts per member
    const { data: memberCounts, error: memberError } = await supabase
      .from('fan_responses')
      .select('member')

    // Calculate per-member stats
    const perMember: Record<string, number> = {}
    if (memberCounts) {
      memberCounts.forEach((row) => {
        perMember[row.member] = (perMember[row.member] || 0) + 1
      })
    }

    return NextResponse.json({
      totalParticipants: totalParticipants || 0,
      perMember,
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: 'Failed to get stats', totalParticipants: 0 },
      { status: 500 }
    )
  }
}
