/**
 * XLOV Experience - Spectrum 성격 Insights
 * 4축별 3단계 해석 (재미있고 공감되는 MBTI 밈 스타일)
 */

import type { SpectrumAxisId } from '@/types/spectrum'

export interface AxisLevelInsight {
  title: string
  traits: string[]
  behaviors: string[]
  emoji: string
}

export interface PersonalityAxisInsight {
  axisId: SpectrumAxisId
  ranges: {
    low: AxisLevelInsight    // 0-35
    mid: AxisLevelInsight    // 35-65
    high: AxisLevelInsight   // 65-100
  }
}

/** 4축별 성격 해석 */
export const PERSONALITY_INSIGHTS: Record<SpectrumAxisId, PersonalityAxisInsight> = {
  // ========================================
  // 빛의 방향 (Light) - 내향 ↔ 외향
  // ========================================
  light: {
    axisId: 'light',
    ranges: {
      low: {
        title: '완전 달 인간 🌙',
        emoji: '🌙',
        traits: [
          '혼자만의 시간이 꼭 필요함',
          '깊은 대화를 선호하는 스타일',
          '조용한 공간에서 에너지 충전',
        ],
        behaviors: [
          '파티보다는 소규모 모임이 편해요 ㅋㅋ',
          '새로운 사람 만나기 전엔 에너지 준비 필수',
          '주말엔 집이 최고! 나가면 피곤함 ㅠㅠ',
          '갑자기 약속 잡히면 멘탈 나가요...',
        ],
      },
      mid: {
        title: '상황 맞춤형 인간 🌓',
        emoji: '🌓',
        traits: [
          '상황에 따라 유연하게 적응',
          '내향과 외향 사이를 자유롭게 이동',
          '사람 보고 에너지 모드 전환',
        ],
        behaviors: [
          '모임 규모 상관없이 즐길 수 있어요',
          '분위기 파악 빠르고 적응력 굿 👍',
          '혼자도 좋고 같이도 좋음 ㅋㅋ',
          '때에 따라 완전 달라지는 타입',
        ],
      },
      high: {
        title: '완전 태양 인간 ☀️',
        emoji: '☀️',
        traits: [
          '사람들 속에서 빛나는 타입',
          '에너지가 넘쳐흐름',
          '새로운 만남이 즐거워요',
        ],
        behaviors: [
          '혼자 있으면 심심해서 못 견뎌 ㅋㅋ',
          '파티 최고! 사람 많은 곳이 좋아요',
          '주말에 약속 없으면 불안함 ㅠ',
          '친구야 나와~ 이거 맨날 외침 ㅋㅋㅋ',
        ],
      },
    },
  },

  // ========================================
  // 감정의 온도 (Temperature) - 차분 ↔ 열정
  // ========================================
  temperature: {
    axisId: 'temperature',
    ranges: {
      low: {
        title: '쿨한 이슬 타입 💧',
        emoji: '💧',
        traits: [
          '감정 표현을 절제하는 편',
          '냉정하고 이성적인 판단',
          '차분하게 상황을 관찰',
        ],
        behaviors: [
          '감정 표현 별로 안 해요 ㅋㅋ 쿨함',
          '화나도 표정 안 바뀌는 포커페이스',
          '속마음은 나만 알지롱~ 비밀 유지 잘함',
          '친구: 너 화났어? 나: 아닌데? (진짜 안 남)',
        ],
      },
      mid: {
        title: '적당히 따듯한 타입 🌸',
        emoji: '🌸',
        traits: [
          '상황에 맞게 감정 조절',
          '필요할 때만 열정 발휘',
          '균형 잡힌 감정 표현',
        ],
        behaviors: [
          '표현할 건 하는데 과하진 않아요',
          'TPO 맞춰서 반응하는 스타일',
          '진짜 좋을 때만 텐션 올라감 ㅋㅋ',
          '감정 기복 별로 없는 편 (안정적)',
        ],
      },
      high: {
        title: '불꽃 같은 열정 🔥',
        emoji: '🔥',
        traits: [
          '감정을 솔직하게 표현',
          '열정이 넘쳐흐름',
          '뜨겁게 반응하는 타입',
        ],
        behaviors: [
          '감정 표현? 나한테 맡겨! 다 드러남 ㅋㅋㅋ',
          '좋으면 완전 좋아하고 싫으면 티 나요',
          '속마음 다 얼굴에 써있음 ㅠㅠ 포커페이스 불가',
          '텐션 높음 주의! 리액션 맛집 ㅋㅋ',
        ],
      },
    },
  },

  // ========================================
  // 존재의 질감 (Texture) - 유연 ↔ 단단
  // ========================================
  texture: {
    axisId: 'texture',
    ranges: {
      low: {
        title: '물처럼 유연한 타입 🌊',
        emoji: '🌊',
        traits: [
          '변화에 빠르게 적응',
          '융통성 있는 사고방식',
          '상황에 따라 모양을 바꿈',
        ],
        behaviors: [
          '계획 안 짜도 OK! 즉흥 최고 ㅋㅋ',
          '갑자기 바뀌어도 전혀 문제없음',
          '이것도 좋고 저것도 좋음 (결정장애 주의)',
          '흐름에 몸을 맡기는 스타일~',
        ],
      },
      mid: {
        title: '적당히 굳은 타입 🌿',
        emoji: '🌿',
        traits: [
          '원칙은 지키되 융통성 발휘',
          '중요한 건 지키고 나머진 유연',
          '균형 잡힌 의사결정',
        ],
        behaviors: [
          '계획 세우는 건 좋은데 바뀌어도 괜찮아요',
          '핵심은 지키되 디테일은 조정 가능',
          '상황 보고 판단하는 타입',
          '딱딱하지도 물렁하지도 않음 (적절함)',
        ],
      },
      high: {
        title: '바위처럼 단단한 타입 🪨',
        emoji: '🪨',
        traits: [
          '원칙을 중시하는 성격',
          '한번 결정하면 밀고 나감',
          '확고한 신념 보유',
        ],
        behaviors: [
          '계획 짜면 무조건 실행! 변경 싫어함',
          '내 원칙 있음! 이건 안 바뀜 ㅋㅋ',
          '급하게 바뀌면 스트레스 받아요 ㅠ',
          '한번 시작한 건 끝까지 가는 스타일',
        ],
      },
    },
  },

  // ========================================
  // 시간의 결 (Time) - 여유 ↔ 역동
  // ========================================
  time: {
    axisId: 'time',
    ranges: {
      low: {
        title: '새벽처럼 여유로운 타입 🌅',
        emoji: '🌅',
        traits: [
          '느긋한 삶의 템포',
          '천천히 깊이 생각',
          '서두르지 않는 스타일',
        ],
        behaviors: [
          '빨리빨리? 그게 뭐야 ㅋㅋ 천천히 갈래',
          '급하게 재촉하면 더 느려짐...',
          '멀티태스킹 별로 안 좋아해요',
          '하나씩 차근차근 하는 게 좋아 😌',
        ],
      },
      mid: {
        title: '오후처럼 적당한 타입 ☀️',
        emoji: '☀️',
        traits: [
          '상황에 맞춰 템포 조절',
          '빠를 땐 빠르고 느릴 땐 느리게',
          '균형 잡힌 에너지 배분',
        ],
        behaviors: [
          '급할 땐 빠르게 처리 가능!',
          '여유 있을 땐 천천히 해요',
          '상황 보고 속도 조절하는 타입',
          '멀티도 하고 싱글도 하고 (유연)',
        ],
      },
      high: {
        title: '황혼처럼 역동적인 타입 🌇',
        emoji: '🌇',
        traits: [
          '빠른 삶의 템포',
          '여러 일 동시에 처리',
          '다이내믹한 에너지',
        ],
        behaviors: [
          '빨리빨리가 몸에 배임! 느린 거 못 참아 ㅋㅋ',
          '멀티태스킹 완전 잘함 👍',
          '한 번에 여러 개 하는 게 더 재밌어요',
          '가만히 있으면 답답함 ㅠ 뭐라도 해야 함',
        ],
      },
    },
  },
}

/**
 * 값에 따라 적절한 인사이트 레벨 반환
 */
export function getInsightLevel(value: number): 'low' | 'mid' | 'high' {
  if (value < 35) return 'low'
  if (value > 65) return 'high'
  return 'mid'
}

/**
 * 축과 값에 따라 인사이트 가져오기
 */
export function getInsightForAxis(
  axisId: SpectrumAxisId,
  value: number
): AxisLevelInsight {
  const axisInsights = PERSONALITY_INSIGHTS[axisId]
  const level = getInsightLevel(value)
  return axisInsights.ranges[level]
}
