import { NextRequest, NextResponse } from 'next/server'
import { generateImage, generateJSON } from '@/lib/gemini'
import { MEMBERS } from '@/lib/constants'
import { MEMBER_STYLE_GUIDES, STYLE_INTENSITIES } from '@/lib/constants/mirror-styles'
import { getMemberSignatureScent, SCENT_NOTES } from '@/lib/constants'
import { readFile } from 'fs/promises'
import path from 'path'
import type { ScentRecipe, ScentNote, MemberInfluence } from '@/types/scent'
import type { StyleIntensity, AppliedStyle, MirrorResult } from '@/types/mirror'

interface MirrorScentResult {
  name: string
  description: string
  top: Array<{ name: string; nameEn: string; intensity: number }>
  middle: Array<{ name: string; nameEn: string; intensity: number }>
  base: Array<{ name: string; nameEn: string; intensity: number }>
  mood: string[]
  season: string
  timeOfDay: string
}

interface StyleAnalysisResult {
  makeup: string[]
  styling: string[]
  mood: string
}

/** Build image transformation prompt */
function buildTransformPrompt(
  memberName: string,
  styleGuide: typeof MEMBER_STYLE_GUIDES[string],
  intensity: StyleIntensity
): string {
  const intensityInfo = STYLE_INTENSITIES.find((i) => i.id === intensity)

  const intensityLevel = intensity === 'light' ? '30%' : intensity === 'medium' ? '60%' : '90%'
  const intensityDescription = intensity === 'light'
    ? 'subtle, natural enhancement keeping the original look mostly intact'
    : intensity === 'medium'
    ? 'balanced blend of original features with the members style'
    : 'dramatic transformation heavily featuring the members signature style'

  return `Transform this selfie photo with ${memberName}'s signature style at ${intensityLevel} intensity.

STYLE GUIDE FOR ${memberName.toUpperCase()}:
- Makeup Features: ${styleGuide.makeupFeatures.join(', ')}
- Styling Features: ${styleGuide.stylingFeatures.join(', ')}
- Color Palette: ${styleGuide.colorPalette.join(', ')}
- Mood Keywords: ${styleGuide.moodKeywords.join(', ')}

INTENSITY: ${intensityInfo?.label} (${intensityInfo?.labelEn}) - ${intensityDescription}

IMPORTANT GUIDELINES:
1. Preserve the person's identity and facial features
2. Apply ${memberName}'s makeup style subtly at ${intensityLevel} strength
3. Adjust lighting and color grading to match the mood
4. Keep the image natural-looking and flattering
5. For ${intensity} intensity: ${intensityInfo?.description}

Create a beautiful, harmonious transformation that feels authentic to both the person and ${memberName}'s aesthetic.`
}

/** Build scent prompt based on transformation */
function buildScentPrompt(
  memberName: string,
  styleGuide: typeof MEMBER_STYLE_GUIDES[string],
  intensity: StyleIntensity
): string {
  const memberScent = getMemberSignatureScent(styleGuide.memberId)
  const availableNotes = Object.values(SCENT_NOTES)
    .flat()
    .map((n) => `${n.name}(${n.nameEn})`)
    .join(', ')

  const intensityPercent = intensity === 'light' ? 30 : intensity === 'medium' ? 60 : 90

  return `You are a master perfumer creating a custom fragrance that captures the essence of a style transformation.

TRANSFORMATION CONTEXT:
- Member Style: ${memberName}
- Mood Keywords: ${styleGuide.moodKeywords.join(', ')}
- Color Palette: ${styleGuide.colorPalette.join(', ')}
- Base Scent Reference: ${memberScent?.name || 'Unknown'} - ${memberScent?.description || ''}
- Style Intensity: ${intensity} (${intensityPercent}% of member's influence)

AVAILABLE SCENT NOTES:
${availableNotes}

Create a fragrance that:
1. Blends the user's natural essence with ${memberName}'s signature style
2. Reflects the ${intensity} transformation intensity
3. Captures the ${styleGuide.moodKeywords.slice(0, 2).join(' and ')} mood

OUTPUT FORMAT (JSON only):
{
  "name": "Creative fragrance name in English",
  "description": "향수의 감성적인 한국어 설명 (1-2문장)",
  "top": [
    { "name": "향료 한글명", "nameEn": "Note English Name", "intensity": 70-90 }
  ],
  "middle": [
    { "name": "향료 한글명", "nameEn": "Note English Name", "intensity": 60-85 }
  ],
  "base": [
    { "name": "향료 한글명", "nameEn": "Note English Name", "intensity": 70-95 }
  ],
  "mood": ["분위기1", "분위기2", "분위기3"],
  "season": "봄/여름/가을/겨울",
  "timeOfDay": "새벽/아침/오후/저녁/밤"
}

Create 2 notes for top, 2 for middle, and 2 for base.`
}

/** Analyze applied style */
function buildStyleAnalysisPrompt(
  memberName: string,
  styleGuide: typeof MEMBER_STYLE_GUIDES[string],
  intensity: StyleIntensity
): string {
  return `Based on ${memberName}'s style applied at ${intensity} intensity, describe the transformation:

MEMBER STYLE:
- Makeup: ${styleGuide.makeupFeatures.join(', ')}
- Styling: ${styleGuide.stylingFeatures.join(', ')}
- Mood: ${styleGuide.moodKeywords.join(', ')}

OUTPUT (JSON only):
{
  "makeup": ["적용된 메이크업 1", "적용된 메이크업 2", "적용된 메이크업 3"],
  "styling": ["적용된 스타일링 1", "적용된 스타일링 2"],
  "mood": "전체적인 분위기 한 문장 설명"
}`
}

/** Map generated scent to ScentRecipe */
function mapToScentRecipe(
  generated: MirrorScentResult,
  memberId: string,
  intensity: StyleIntensity
): ScentRecipe {
  const allNotes = Object.values(SCENT_NOTES).flat()

  const mapNotes = (notes: Array<{ name: string; nameEn: string; intensity: number }>): ScentNote[] => {
    return notes.map((note) => {
      const libraryNote = allNotes.find(
        (n) => n.nameEn.toLowerCase() === note.nameEn.toLowerCase() || n.name === note.name
      )
      return {
        name: note.name,
        nameEn: note.nameEn,
        intensity: note.intensity,
        color: libraryNote?.color || '#FFFFFF',
      }
    })
  }

  // Calculate member influence based on intensity
  const intensityValue = intensity === 'light' ? 30 : intensity === 'medium' ? 60 : 90
  const memberInfluence: MemberInfluence = {
    umuti: 0,
    rui: 0,
    hyun: 0,
    haru: 0,
  }
  const memberKey = memberId as keyof MemberInfluence
  memberInfluence[memberKey] = intensityValue

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
    const { memberId, selfieBase64, selfieMimeType, intensity } = body as {
      memberId: string
      selfieBase64: string
      selfieMimeType: string
      intensity: StyleIntensity
    }

    // Validate inputs
    if (!memberId || !selfieBase64 || !intensity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const member = MEMBERS.find((m) => m.id === memberId)
    if (!member) {
      return NextResponse.json(
        { error: 'Invalid member ID' },
        { status: 400 }
      )
    }

    const styleGuide = MEMBER_STYLE_GUIDES[memberId]
    if (!styleGuide) {
      return NextResponse.json(
        { error: 'Style guide not found for member' },
        { status: 400 }
      )
    }

    // Read member reference image
    const memberImagePath = path.join(process.cwd(), 'public', member.placeholderImage)
    const memberImageBuffer = await readFile(memberImagePath)
    const memberImageBase64 = memberImageBuffer.toString('base64')
    const memberMimeType = member.placeholderImage.endsWith('.png') ? 'image/png' : 'image/jpeg'

    // Build prompts
    const transformPrompt = buildTransformPrompt(member.name, styleGuide, intensity)
    const scentPrompt = buildScentPrompt(member.name, styleGuide, intensity)
    const styleAnalysisPrompt = buildStyleAnalysisPrompt(member.name, styleGuide, intensity)

    // Generate all in parallel
    const [transformedImageUrl, scentData, styleAnalysis] = await Promise.all([
      // Generate transformed image
      generateImage({
        prompt: transformPrompt,
        referenceImage: {
          base64: selfieBase64,
          mimeType: selfieMimeType,
        },
        styleReference: {
          base64: memberImageBase64,
          mimeType: memberMimeType,
        },
      }),
      // Generate scent
      generateJSON<MirrorScentResult>({
        prompt: scentPrompt,
        systemInstruction: 'You are a master perfumer. Respond only with valid JSON.',
      }),
      // Analyze applied style
      generateJSON<StyleAnalysisResult>({
        prompt: styleAnalysisPrompt,
        systemInstruction: 'Respond only with valid JSON describing the applied style.',
      }),
    ])

    // Map scent to proper format
    const scent = mapToScentRecipe(scentData, memberId, intensity)

    // Calculate member influence percentage
    const influencePercent = intensity === 'light' ? 30 : intensity === 'medium' ? 60 : 90

    // Build result
    const result: MirrorResult = {
      originalImage: `data:${selfieMimeType};base64,${selfieBase64}`,
      transformedImage: transformedImageUrl,
      styleApplied: {
        makeup: styleAnalysis.makeup,
        styling: styleAnalysis.styling,
        mood: styleAnalysis.mood,
      },
      memberInfluence: influencePercent,
    }

    return NextResponse.json({
      result,
      scent,
      memberId,
      memberName: member.name,
    })
  } catch (error) {
    console.error('Mirror transformation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to transform image',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
