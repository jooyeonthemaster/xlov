import { NextRequest, NextResponse } from 'next/server'
import { generateJSON } from '@/lib/gemini'
import {
  SPECTRUM_QUESTIONS,
  SPECTRUM_AXES,
  MEMBER_SPECTRUM_PROFILES,
  ARCHETYPES,
} from '@/lib/constants'
import { MEMBERS } from '@/lib/constants'
import type {
  SpectrumAnswers,
  SpectrumResult,
  SpectrumAxis,
  MemberSpectrumProfile,
  PersonalityScenarios,
  ChemistryStory,
  PersonalityAnalysis,
} from '@/types/spectrum'
import type { ScentRecipe } from '@/types/scent'

interface SpectrumScentResponse {
  name: string
  description: string
  top: Array<{ name: string; nameEn: string; intensity: number; color: string }>
  middle: Array<{ name: string; nameEn: string; intensity: number; color: string }>
  base: Array<{ name: string; nameEn: string; intensity: number; color: string }>
  mood: string[]
  season: string
  timeOfDay: string
}

/** Calculate spectrum values from answers */
function calculateSpectrumValues(answers: SpectrumAnswers): Record<string, number> {
  const axisScores: Record<string, { sum: number; count: number }> = {}

  // Initialize scores for each axis
  SPECTRUM_AXES.forEach((axis) => {
    axisScores[axis.id] = { sum: 0, count: 0 }
  })

  // Sum up answers per axis
  SPECTRUM_QUESTIONS.forEach((question) => {
    const answer = answers[question.id]
    if (answer !== undefined) {
      axisScores[question.axis].sum += answer
      axisScores[question.axis].count += 1
    }
  })

  // Convert to 0-100 scale (each axis has 3 questions, -2 to +2 range)
  // Total range per axis: -6 to +6, convert to 0-100
  const spectrumValues: Record<string, number> = {}

  Object.entries(axisScores).forEach(([axisId, scores]) => {
    if (scores.count > 0) {
      // Average of -2 to +2 range, then convert to 0-100
      const avgScore = scores.sum / scores.count
      // Map -2..+2 to 0..100
      spectrumValues[axisId] = Math.round(((avgScore + 2) / 4) * 100)
    } else {
      spectrumValues[axisId] = 50 // Default to neutral
    }
  })

  return spectrumValues
}

/** Determine archetype based on spectrum values */
function determineArchetype(values: Record<string, number>) {
  const getLevel = (value: number): 'low' | 'mid' | 'high' => {
    if (value < 35) return 'low'
    if (value > 65) return 'high'
    return 'mid'
  }

  const levels = {
    light: getLevel(values.light),
    temperature: getLevel(values.temperature),
    texture: getLevel(values.texture),
    time: getLevel(values.time),
  }

  // Find matching archetype
  for (const [key, archetype] of Object.entries(ARCHETYPES)) {
    if (key === 'default') continue

    const conditions = archetype.conditions as Record<string, string>
    const matches = Object.entries(conditions).every(
      ([axis, level]) => levels[axis as keyof typeof levels] === level
    )

    if (matches) {
      return { name: archetype.name, description: archetype.description, emoji: archetype.emoji }
    }
  }

  // Return default archetype
  return ARCHETYPES.default
}

/** Calculate member similarity */
function calculateMemberMatch(
  userValues: Record<string, number>
): Array<{ memberId: string; percentage: number; reason: string }> {
  const matches: Array<{ memberId: string; percentage: number; distance: number }> = []

  for (const [memberId, profile] of Object.entries(MEMBER_SPECTRUM_PROFILES)) {
    // Calculate Euclidean distance
    let distance = 0
    for (const axis of SPECTRUM_AXES) {
      const userVal = userValues[axis.id] || 50
      const memberVal = profile[axis.id as keyof MemberSpectrumProfile]
      distance += Math.pow(userVal - memberVal, 2)
    }
    distance = Math.sqrt(distance)

    // Convert distance to percentage (max distance is sqrt(4 * 100^2) = 200)
    const maxDistance = 200
    const percentage = Math.round(Math.max(0, (1 - distance / maxDistance) * 100))

    matches.push({ memberId, percentage, distance })
  }

  // Sort by percentage (highest first)
  matches.sort((a, b) => b.percentage - a.percentage)

  // Generate reasons based on profile comparison
  return matches.map((match) => {
    const member = MEMBERS.find((m) => m.id === match.memberId)
    const profile = MEMBER_SPECTRUM_PROFILES[match.memberId]

    // Find most similar axis
    let closestAxis = ''
    let minDiff = Infinity
    for (const axis of SPECTRUM_AXES) {
      const diff = Math.abs(
        (userValues[axis.id] || 50) - profile[axis.id as keyof MemberSpectrumProfile]
      )
      if (diff < minDiff) {
        minDiff = diff
        closestAxis = axis.label
      }
    }

    return {
      memberId: match.memberId,
      percentage: match.percentage,
      reason: `${closestAxis}에서 가장 유사한 감각을 공유합니다`,
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers } = body as { answers: SpectrumAnswers }

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { message: 'Answers are required' },
        { status: 400 }
      )
    }

    // Calculate spectrum values
    const spectrumValues = calculateSpectrumValues(answers)

    // Build axes array
    const axes: SpectrumAxis[] = SPECTRUM_AXES.map((axis) => ({
      ...axis,
      value: spectrumValues[axis.id] || 50,
    }))

    // Determine archetype
    const archetype = determineArchetype(spectrumValues)

    // Calculate member matches
    const memberMatches = calculateMemberMatch(spectrumValues)

    // Build member match structure
    const memberMatch = {
      soulMate: memberMatches[0], // Highest match
      opposite: memberMatches[memberMatches.length - 1], // Lowest match
      hidden: memberMatches[1] || memberMatches[0], // Second highest
    }

    // Generate scent recipe based on spectrum result
    const scentPrompt = `당신은 조향사입니다. 사용자의 성격 스펙트럼을 기반으로 맞춤 향수 레시피를 생성해주세요.

사용자 스펙트럼:
- 빛의 방향 (달↔태양): ${spectrumValues.light}/100 (${spectrumValues.light < 50 ? '내향적' : '외향적'})
- 감정의 온도 (이슬↔불꽃): ${spectrumValues.temperature}/100 (${spectrumValues.temperature < 50 ? '차분' : '열정적'})
- 존재의 질감 (물↔바위): ${spectrumValues.texture}/100 (${spectrumValues.texture < 50 ? '유연' : '단단'})
- 시간의 결 (새벽↔황혼): ${spectrumValues.time}/100 (${spectrumValues.time < 50 ? '여유로움' : '역동적'})

아키타입: ${archetype.name} - ${archetype.description}

가장 유사한 멤버: ${MEMBERS.find((m) => m.id === memberMatch.soulMate.memberId)?.name} (${memberMatch.soulMate.percentage}%)

다음 JSON 형식으로 응답해주세요:
{
  "name": "향수 이름 (영문 2-4단어)",
  "description": "이 향의 설명 (한국어, 1-2문장)",
  "top": [
    {"name": "한국어 이름", "nameEn": "English Name", "intensity": 60-90, "color": "#HEX"}
  ],
  "middle": [
    {"name": "한국어 이름", "nameEn": "English Name", "intensity": 50-80, "color": "#HEX"}
  ],
  "base": [
    {"name": "한국어 이름", "nameEn": "English Name", "intensity": 40-70, "color": "#HEX"}
  ],
  "mood": ["분위기1", "분위기2", "분위기3"],
  "season": "어울리는 계절",
  "timeOfDay": "어울리는 시간대"
}

규칙:
- TOP 노트 2-3개: 첫인상의 향 (시트러스, 허브, 그린 계열)
- MIDDLE 노트 2-3개: 핵심 캐릭터 (플로럴, 스파이시, 프루티 계열)
- BASE 노트 2-3개: 지속성 (우디, 앰버, 머스크 계열)
- 빛 값이 낮으면 차분하고 신비로운 향, 높으면 밝고 발랄한 향
- 온도 값이 낮으면 쿨하고 프레시한 향, 높으면 따뜻하고 관능적인 향
- 질감 값이 낮으면 가볍고 유연한 향, 높으면 묵직하고 깊은 향
- 시간 값이 낮으면 청량하고 새벽 느낌, 높으면 풍부하고 저녁 느낌`

    const scentData = await generateJSON<SpectrumScentResponse>({
      prompt: scentPrompt,
      systemInstruction: '당신은 전문 조향사입니다. 성격 분석을 기반으로 맞춤 향수 레시피를 생성합니다.',
    })

    // Build scent recipe with member influence
    const scent: ScentRecipe = {
      name: scentData.name,
      description: scentData.description,
      top: scentData.top,
      middle: scentData.middle,
      base: scentData.base,
      memberInfluence: {
        umuti: memberMatches.find((m) => m.memberId === 'umuti')?.percentage || 0,
        rui: memberMatches.find((m) => m.memberId === 'rui')?.percentage || 0,
        hyun: memberMatches.find((m) => m.memberId === 'hyun')?.percentage || 0,
        haru: memberMatches.find((m) => m.memberId === 'haru')?.percentage || 0,
      },
      mood: scentData.mood,
      season: scentData.season,
      timeOfDay: scentData.timeOfDay,
    }

    // Generate personality scenarios (4가지 상황에서의 행동 패턴)
    const scenariosPrompt = `당신은 성격 분석 전문가입니다. 사용자의 성격 스펙트럼을 기반으로 4가지 상황에서 어떻게 행동할지 재미있고 공감되게 묘사해주세요.

사용자 프로필:
- 빛의 방향 (달↔태양): ${spectrumValues.light}/100 (${spectrumValues.light < 35 ? '완전 내향' : spectrumValues.light > 65 ? '완전 외향' : '중립'})
- 감정의 온도 (이슬↔불꽃): ${spectrumValues.temperature}/100 (${spectrumValues.temperature < 35 ? '쿨함' : spectrumValues.temperature > 65 ? '뜨거움' : '적당함'})
- 존재의 질감 (물↔바위): ${spectrumValues.texture}/100 (${spectrumValues.texture < 35 ? '유연함' : spectrumValues.texture > 65 ? '단단함' : '균형'})
- 시간의 결 (새벽↔황혼): ${spectrumValues.time}/100 (${spectrumValues.time < 35 ? '여유로움' : spectrumValues.time > 65 ? '역동적' : '적당함'})

아키타입: ${archetype.emoji} ${archetype.name}
특징: ${archetype.description}

다음 4가지 상황에서 이 사용자가 어떻게 행동할지 재미있고 공감되게 묘사해주세요 (각 2-3문장, 이모지 활용):

1. 갈등 상황에서: 친구와 의견이 충돌했을 때 어떻게 반응할까요?
2. 스트레스 받을 때: 압박감이 심할 때 어떻게 대처할까요?
3. 새로운 도전 앞에서: 처음 해보는 일을 제안받았을 때 어떻게 반응할까요?
4. 휴식이 필요할 때: 재충전이 필요할 때 어떤 방식으로 쉴까요?

톤앤매너: 친구가 설명해주듯 재미있게, MBTI 밈 스타일 ("완전 이거다 ㅋㅋ", "아 맞아! 이게 나지!")

JSON 형식으로 응답:
{
  "conflict": "갈등 상황 설명 (2-3문장, 이모지 포함)",
  "stress": "스트레스 상황 설명 (2-3문장, 이모지 포함)",
  "challenge": "도전 상황 설명 (2-3문장, 이모지 포함)",
  "rest": "휴식 방법 설명 (2-3문장, 이모지 포함)"
}`

    const scenarios = await generateJSON<PersonalityScenarios>({
      prompt: scenariosPrompt,
      systemInstruction:
        '당신은 재미있고 공감되는 성격 분석 전문가입니다. MBTI 밈 스타일로 성격을 묘사하며, 사용자가 "아 맞아! 완전 나야!"라고 반응하게 만듭니다.',
    })

    // Generate chemistry story with soul mate member
    const soulMateMember = MEMBERS.find((m) => m.id === memberMatch.soulMate.memberId)
    const soulMateProfile = soulMateMember
      ? MEMBER_SPECTRUM_PROFILES[soulMateMember.id]
      : null

    const chemistryPrompt = `당신은 K-POP 팬픽 작가입니다. 사용자와 가장 궁합이 좋은 멤버의 케미스트리를 구체적이고 재미있게 상상해서 작성해주세요.

사용자 프로필:
- 빛: ${spectrumValues.light}/100, 온도: ${spectrumValues.temperature}/100, 질감: ${spectrumValues.texture}/100, 시간: ${spectrumValues.time}/100
- 아키타입: ${archetype.emoji} ${archetype.name}

Soul Mate 멤버: ${soulMateMember?.name || 'Unknown'}
- 빛: ${soulMateProfile?.light || 50}/100, 온도: ${soulMateProfile?.temperature || 50}/100, 질감: ${soulMateProfile?.texture || 50}/100, 시간: ${soulMateProfile?.time || 50}/100
- 유사도: ${memberMatch.soulMate.percentage}%

다음 3가지 에피소드를 구체적으로 상상해서 작성 (각 3-4문장, 이모지 활용):

1. 함께 여행 간다면?: 어디로 가고, 무엇을 하며, 어떤 케미가 발생할까요?
2. 같이 일한다면?: 프로젝트를 함께 진행할 때 어떤 시너지가 날까요?
3. 힘든 일 생겼을 때?: 한 명이 힘들 때 다른 한 명은 어떻게 도와줄까요?

톤앤매너: "완전 케미 ㅋㅋ", "아 이거 진짜!", "소울메이트 맞네" 같은 공감 표현 사용

JSON 형식으로 응답:
{
  "travel": "여행 에피소드 (3-4문장, 이모지 포함)",
  "work": "협업 에피소드 (3-4문장, 이모지 포함)",
  "support": "위로 에피소드 (3-4문장, 이모지 포함)"
}`

    const chemistry = await generateJSON<ChemistryStory>({
      prompt: chemistryPrompt,
      systemInstruction:
        '당신은 K-POP 팬픽 작가입니다. 구체적이고 재미있는 에피소드를 상상하며, 팬들이 공감하고 설레는 스토리를 만듭니다.',
    })

    // Build personality analysis
    const personality: PersonalityAnalysis = {
      scenarios,
      chemistry,
    }

    // Build result
    const result: SpectrumResult = {
      axes,
      archetype,
      memberMatch,
    }

    return NextResponse.json({ result, scent, personality })
  } catch (error) {
    console.error('Spectrum analysis error:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to analyze spectrum' },
      { status: 500 }
    )
  }
}
