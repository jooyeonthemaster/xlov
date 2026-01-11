import { NextRequest, NextResponse } from 'next/server'
import { generateImage, generateJSON } from '@/lib/gemini'
import { buildImagePrompt } from '@/lib/utils/prompt-builder'
import { MEMBERS } from '@/lib/constants'
import { getMemberSignatureScent, SCENT_NOTES } from '@/lib/constants'
import { readFile } from 'fs/promises'
import path from 'path'
import type { ScentRecipe, ScentNote, MemberInfluence } from '@/types/scent'
import type { CanvasGenerateResponse } from '@/types/api'

interface ScentGenerationResult {
  name: string
  description: string
  top: Array<{ name: string; nameEn: string; intensity: number }>
  middle: Array<{ name: string; nameEn: string; intensity: number }>
  base: Array<{ name: string; nameEn: string; intensity: number }>
  mood: string[]
  season: string
  timeOfDay: string
  memberInfluence: Record<string, number>
}

// Build scent generation prompt based on user responses and member
function buildScentPrompt(
  memberId: string,
  memberName: string,
  responses: Record<string, string>
): string {
  const memberScent = getMemberSignatureScent(memberId)

  // Get available scent notes for reference
  const availableNotes = Object.values(SCENT_NOTES)
    .flat()
    .map((n) => `${n.name}(${n.nameEn})`)
    .join(', ')

  return `You are a master perfumer creating a custom fragrance based on user responses about a K-pop idol member.

MEMBER: ${memberName} (ID: ${memberId})
MEMBER'S SIGNATURE SCENT: ${memberScent?.name || 'Unknown'} - ${memberScent?.description || ''}

USER'S RESPONSES ABOUT THE MEMBER:
${Object.entries(responses)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

AVAILABLE SCENT NOTES (choose from these):
${availableNotes}

Based on the user's creative interpretation of the member, create a unique fragrance that:
1. Reflects the user's vision of the member
2. Incorporates elements from the member's signature scent
3. Creates a cohesive olfactory story

OUTPUT FORMAT (JSON only):
{
  "name": "Creative fragrance name in English",
  "description": "Poetic Korean description of the scent (1-2 sentences)",
  "top": [
    { "name": "향료 한글명", "nameEn": "Note English Name", "intensity": 70-90 }
  ],
  "middle": [
    { "name": "향료 한글명", "nameEn": "Note English Name", "intensity": 60-85 }
  ],
  "base": [
    { "name": "향료 한글명", "nameEn": "Note English Name", "intensity": 70-95 }
  ],
  "mood": ["감성키워드1", "감성키워드2", "감성키워드3", "감성키워드4"],
  "season": "봄/여름/가을/겨울",
  "timeOfDay": "새벽/아침/오후/저녁/밤",
  "memberInfluence": { "${memberId}": 70, "user": 30 }
}

Create 2 notes for top, 2 for middle, and 2-3 for base.
Intensity values should range from 50-100 based on prominence.`
}

// Map generated scent data to ScentRecipe with colors
function mapToScentRecipe(
  generated: ScentGenerationResult,
  memberId: string
): ScentRecipe {
  const allNotes = Object.values(SCENT_NOTES).flat()

  const mapNotes = (notes: Array<{ name: string; nameEn: string; intensity: number }>): ScentNote[] => {
    return notes.map((note) => {
      // Find matching note in our library for color
      const libraryNote = allNotes.find(
        (n) => n.nameEn.toLowerCase() === note.nameEn.toLowerCase() ||
               n.name === note.name
      )

      return {
        name: note.name,
        nameEn: note.nameEn,
        intensity: note.intensity,
        color: libraryNote?.color || '#FFFFFF',
      }
    })
  }

  // Calculate member influence
  const memberInfluence: MemberInfluence = {
    umuti: 0,
    rui: 0,
    hyun: 0,
    haru: 0,
  }

  // Set the selected member's influence
  const memberKey = memberId as keyof MemberInfluence
  if (generated.memberInfluence[memberId]) {
    memberInfluence[memberKey] = generated.memberInfluence[memberId]
  } else {
    memberInfluence[memberKey] = 70 // Default
  }

  return {
    name: generated.name,
    description: generated.description,
    top: mapNotes(generated.top),
    middle: mapNotes(generated.middle),
    base: mapNotes(generated.base),
    memberInfluence,
    mood: generated.mood,
    season: generated.season,
    timeOfDay: generated.timeOfDay,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberId, responses } = body

    // Validate member
    const member = MEMBERS.find((m) => m.id === memberId)
    if (!member) {
      return NextResponse.json(
        { error: 'Invalid member ID' },
        { status: 400 }
      )
    }

    // Read reference image from public folder
    const imagePath = path.join(process.cwd(), 'public', member.placeholderImage)
    console.log('Reading reference image from:', imagePath)

    const imageBuffer = await readFile(imagePath)
    const base64Image = imageBuffer.toString('base64')

    // Determine mime type from extension
    const ext = path.extname(member.placeholderImage).toLowerCase()
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg'

    // Build prompts
    const imagePrompt = buildImagePrompt(member, responses)
    const scentPrompt = buildScentPrompt(memberId, member.name, responses)

    // Generate image and scent in parallel
    const [imageUrl, scentData] = await Promise.all([
      generateImage({
        prompt: imagePrompt,
        referenceImage: {
          base64: base64Image,
          mimeType,
        },
      }),
      generateJSON<ScentGenerationResult>({
        prompt: scentPrompt,
        systemInstruction: 'You are a master perfumer. Respond only with valid JSON.',
      }),
    ])

    // Map scent data to proper recipe format
    const scentRecipe = mapToScentRecipe(scentData, memberId)

    const response: CanvasGenerateResponse = {
      imageUrl,
      scent: scentRecipe,
      memberId,
      memberName: member.name,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Canvas generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate canvas result',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
