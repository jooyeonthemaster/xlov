import { NextRequest, NextResponse } from 'next/server'
import { generateImage } from '@/lib/gemini'
import { buildImagePrompt } from '@/lib/utils/prompt-builder'
import { MEMBERS } from '@/lib/constants'
import { readFile } from 'fs/promises'
import path from 'path'

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
    console.log('Reference image read successfully, base64 length:', base64Image.length)

    // Determine mime type from extension
    const ext = path.extname(member.placeholderImage).toLowerCase()
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg'
    console.log('Image mime type:', mimeType)

    // Build prompt from responses
    const prompt = buildImagePrompt(member, responses)
    console.log('Prompt built, length:', prompt.length)

    // Generate image using Gemini with reference image
    const imageUrl = await generateImage({
      prompt,
      referenceImage: {
        base64: base64Image,
        mimeType,
      },
    })

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
