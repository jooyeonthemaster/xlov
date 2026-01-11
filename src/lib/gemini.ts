import { GoogleGenAI, Modality } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' })

export const IMAGE_MODEL = 'gemini-3-pro-image-preview'
export const TEXT_MODEL = 'gemini-3-flash-preview'

export interface GenerateImageOptions {
  prompt: string
  referenceImage?: {
    base64: string
    mimeType: string
  }
  /** Optional style reference image for style transfer */
  styleReference?: {
    base64: string
    mimeType: string
  }
}

export interface GenerateTextOptions {
  prompt: string
  systemInstruction?: string
}

export interface GenerateJSONOptions {
  prompt: string
  systemInstruction?: string
}

export async function generateText(options: GenerateTextOptions): Promise<string> {
  const { prompt, systemInstruction } = options

  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    })

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      throw new Error('No text generated in response')
    }

    return text
  } catch (error) {
    console.error('Gemini text generation error:', error)
    throw error
  }
}

export async function generateJSON<T>(options: GenerateJSONOptions): Promise<T> {
  const { prompt, systemInstruction } = options

  const jsonSystemInstruction = `${systemInstruction || ''}

CRITICAL: You MUST respond with ONLY valid JSON. No markdown, no code blocks, no explanations.
Your entire response must be parseable by JSON.parse().`

  const maxRetries = 3

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: prompt,
        config: {
          systemInstruction: jsonSystemInstruction,
        },
      })

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text
      if (!text) {
        throw new Error('No text generated in response')
      }

      // Advanced JSON cleaning
      let cleanedText = text.trim()

      // Remove markdown code blocks
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.slice(7)
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.slice(3)
      }
      if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.slice(0, -3)
      }
      cleanedText = cleanedText.trim()

      // Remove trailing commas before closing braces/brackets (common JSON error)
      cleanedText = cleanedText.replace(/,(\s*[}\]])/g, '$1')

      // Remove any leading/trailing whitespace and newlines
      cleanedText = cleanedText.replace(/^\s+|\s+$/g, '')

      // Parse JSON
      const parsed = JSON.parse(cleanedText) as T

      // Success! Return the parsed result
      if (attempt > 1) {
        console.log(`✅ JSON parsing succeeded on attempt ${attempt}`)
      }
      return parsed
    } catch (error) {
      console.error(`❌ Gemini JSON generation error (attempt ${attempt}/${maxRetries}):`, error)

      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        console.error('🚨 Failed to generate valid JSON after all retries')
        throw error
      }

      // Wait before retrying (exponential backoff: 1s, 2s, 3s)
      const waitTime = 1000 * attempt
      console.log(`⏳ Retrying in ${waitTime / 1000}s... (attempt ${attempt + 1}/${maxRetries})`)
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }
  }

  // This should never be reached, but TypeScript needs it
  throw new Error('Failed to generate valid JSON after maximum retries')
}

export async function generateImage(options: GenerateImageOptions): Promise<string> {
  const { prompt, referenceImage, styleReference } = options

  try {
    // Build contents array according to Gemini 3 Pro Image documentation
    // Format: [{ text: "prompt" }, { inlineData: { mimeType, data } }]
    const contents: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = []

    // Text prompt first, then reference images (per documentation example)
    contents.push({ text: prompt })

    if (referenceImage) {
      console.log('Reference image provided:', {
        mimeType: referenceImage.mimeType,
        dataLength: referenceImage.base64.length,
      })
      contents.push({
        inlineData: {
          mimeType: referenceImage.mimeType,
          data: referenceImage.base64,
        },
      })
    }

    // Add style reference image for style transfer
    if (styleReference) {
      console.log('Style reference image provided:', {
        mimeType: styleReference.mimeType,
        dataLength: styleReference.base64.length,
      })
      contents.push({
        inlineData: {
          mimeType: styleReference.mimeType,
          data: styleReference.base64,
        },
      })
    }

    console.log('Sending to Gemini 3 Pro Image with', contents.length, 'parts')

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        // Image configuration for Gemini 3 Pro Image Preview
        imageConfig: {
          aspectRatio: '3:4', // Portrait orientation for fashion/editorial
          imageSize: '2K',    // High quality output
        },
      },
    })

    // Extract image from response
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // Return base64 data URL
          const { mimeType, data } = part.inlineData
          return `data:${mimeType};base64,${data}`
        }
      }
    }

    throw new Error('No image generated in response')
  } catch (error) {
    console.error('Gemini image generation error:', error)
    throw error
  }
}

export { ai }
