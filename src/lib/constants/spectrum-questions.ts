/**
 * XLOV Experience - Spectrum 성격 검사 문항
 * 4축 스펙트럼 기반 12문항
 */

import type {
  SpectrumQuestion,
  SpectrumAxis,
  MemberSpectrumProfile,
} from '@/types/spectrum'

/** 스펙트럼 축 기본 정보 */
export const SPECTRUM_AXES: Omit<SpectrumAxis, 'value'>[] = [
  {
    id: 'light',
    label: '빛의 방향',
    leftLabel: '달',
    rightLabel: '태양',
    leftIcon: '🌙',
    rightIcon: '☀️',
  },
  {
    id: 'temperature',
    label: '감정의 온도',
    leftLabel: '이슬',
    rightLabel: '불꽃',
    leftIcon: '💧',
    rightIcon: '🔥',
  },
  {
    id: 'texture',
    label: '존재의 질감',
    leftLabel: '물',
    rightLabel: '바위',
    leftIcon: '🌊',
    rightIcon: '🪨',
  },
  {
    id: 'time',
    label: '시간의 결',
    leftLabel: '새벽',
    rightLabel: '황혼',
    leftIcon: '🌅',
    rightIcon: '🌇',
  },
]

/** Spectrum 검사 문항 (12문항) */
export const SPECTRUM_QUESTIONS: SpectrumQuestion[] = [
  // ========================================
  // 빛의 방향 (Light) - 3문항
  // ========================================
  {
    id: 'light-1',
    text: '에너지를 얻는 방식은?',
    axis: 'light',
    options: [
      { value: -2, label: '혼자만의 시간이 절대적으로 필요해' },
      { value: -1, label: '대체로 혼자 있을 때 충전돼' },
      { value: 0, label: '상황에 따라 달라' },
      { value: 1, label: '사람들과 있을 때 기운이 나' },
      { value: 2, label: '사람들 속에서 에너지가 폭발해' },
    ],
  },
  {
    id: 'light-2',
    text: '새로운 사람을 만날 때?',
    axis: 'light',
    options: [
      { value: -2, label: '많이 긴장되고 피하고 싶어' },
      { value: -1, label: '조금 긴장되지만 괜찮아' },
      { value: 0, label: '상대에 따라 다르게 느껴' },
      { value: 1, label: '새로운 만남이 기대돼' },
      { value: 2, label: '새 친구를 사귀는 게 너무 좋아' },
    ],
  },
  {
    id: 'light-3',
    text: '주말에 가장 하고 싶은 건?',
    axis: 'light',
    options: [
      { value: -2, label: '집에서 나만의 시간 보내기' },
      { value: -1, label: '조용한 카페에서 책 읽기' },
      { value: 0, label: '그때그때 달라' },
      { value: 1, label: '친구들과 가볍게 만나기' },
      { value: 2, label: '많은 사람들과 파티하기' },
    ],
  },

  // ========================================
  // 감정의 온도 (Temperature) - 3문항
  // ========================================
  {
    id: 'temp-1',
    text: '감정을 표현하는 방식은?',
    axis: 'temperature',
    options: [
      { value: -2, label: '거의 표현하지 않아' },
      { value: -1, label: '절제해서 표현하는 편' },
      { value: 0, label: '상황에 맞게 조절해' },
      { value: 1, label: '솔직하게 표현하는 편' },
      { value: 2, label: '감정이 바로바로 드러나' },
    ],
  },
  {
    id: 'temp-2',
    text: '누군가 힘들어할 때?',
    axis: 'temperature',
    options: [
      { value: -2, label: '거리를 두고 지켜봐' },
      { value: -1, label: '조용히 곁에 있어줘' },
      { value: 0, label: '상대가 원하는 대로 맞춰' },
      { value: 1, label: '따뜻한 말로 위로해' },
      { value: 2, label: '꼭 안아주고 싶어' },
    ],
  },
  {
    id: 'temp-3',
    text: '좋아하는 분위기는?',
    axis: 'temperature',
    options: [
      { value: -2, label: '쿨하고 절제된 분위기' },
      { value: -1, label: '차분하고 정돈된 분위기' },
      { value: 0, label: '어떤 분위기든 괜찮아' },
      { value: 1, label: '따뜻하고 편안한 분위기' },
      { value: 2, label: '정열적이고 뜨거운 분위기' },
    ],
  },

  // ========================================
  // 존재의 질감 (Texture) - 3문항
  // ========================================
  {
    id: 'texture-1',
    text: '변화에 대한 태도는?',
    axis: 'texture',
    options: [
      { value: -2, label: '변화가 자연스럽고 좋아' },
      { value: -1, label: '유연하게 적응하는 편' },
      { value: 0, label: '상황에 따라 달라' },
      { value: 1, label: '안정적인 게 더 좋아' },
      { value: 2, label: '확고한 것이 좋아' },
    ],
  },
  {
    id: 'texture-2',
    text: '결정을 내릴 때?',
    axis: 'texture',
    options: [
      { value: -2, label: '흐름에 맡기는 편' },
      { value: -1, label: '직감을 따르는 편' },
      { value: 0, label: '때에 따라 다르게' },
      { value: 1, label: '신중하게 고민하는 편' },
      { value: 2, label: '원칙과 논리로 결정해' },
    ],
  },
  {
    id: 'texture-3',
    text: '나를 표현하자면?',
    axis: 'texture',
    options: [
      { value: -2, label: '흐르는 물처럼 유연해' },
      { value: -1, label: '부드럽게 맞춰가는 편' },
      { value: 0, label: '상황에 따라 달라져' },
      { value: 1, label: '꽤 단단한 편이야' },
      { value: 2, label: '바위처럼 흔들리지 않아' },
    ],
  },

  // ========================================
  // 시간의 결 (Time) - 3문항
  // ========================================
  {
    id: 'time-1',
    text: '일을 처리하는 방식은?',
    axis: 'time',
    options: [
      { value: -2, label: '천천히 완벽하게' },
      { value: -1, label: '여유롭게 진행하는 편' },
      { value: 0, label: '상황에 맞게 조절해' },
      { value: 1, label: '빠르게 처리하는 편' },
      { value: 2, label: '에너지 넘치게 돌진해' },
    ],
  },
  {
    id: 'time-2',
    text: '하루 중 가장 좋아하는 시간?',
    axis: 'time',
    options: [
      { value: -2, label: '고요한 새벽이 좋아' },
      { value: -1, label: '조용한 아침이 좋아' },
      { value: 0, label: '딱히 상관없어' },
      { value: 1, label: '활기찬 오후가 좋아' },
      { value: 2, label: '화려한 밤이 좋아' },
    ],
  },
  {
    id: 'time-3',
    text: '이상적인 삶의 템포는?',
    axis: 'time',
    options: [
      { value: -2, label: '느리고 깊은 삶' },
      { value: -1, label: '여유로운 흐름' },
      { value: 0, label: '균형 잡힌 리듬' },
      { value: 1, label: '활발한 일상' },
      { value: 2, label: '역동적이고 빠른 삶' },
    ],
  },
]

/** 멤버별 스펙트럼 프로필 (0-100 값) */
export const MEMBER_SPECTRUM_PROFILES: Record<string, MemberSpectrumProfile> = {
  umuti: { light: 75, temperature: 85, texture: 70, time: 80 }, // 태양, 불꽃, 바위쪽, 황혼
  rui: { light: 25, temperature: 20, texture: 75, time: 30 }, // 달, 이슬, 바위, 새벽
  hyun: { light: 35, temperature: 65, texture: 25, time: 25 }, // 달쪽, 불꽃쪽, 물, 새벽
  haru: { light: 80, temperature: 50, texture: 30, time: 85 }, // 태양, 중립, 물쪽, 황혼
}

/** 아키타입 정의 (스펙트럼 조합별) */
export const ARCHETYPES = {
  // 달 + 이슬 + 물 + 새벽 = 고요한 안개
  quiet_mist: {
    name: '고요한 안개',
    description: '깊은 내면에서 잔잔하게 퍼져나가는 부드러운 존재',
    emoji: '🌫️',
    conditions: { light: 'low', temperature: 'low', texture: 'low', time: 'low' },
  },
  // 달 + 불꽃 + 물 + 새벽 = 따스한 안개
  warm_mist: {
    name: '따스한 안개',
    description: '고요한 외면 속에 따뜻한 마음을 품은 존재',
    emoji: '🕯️',
    conditions: { light: 'low', temperature: 'high', texture: 'low', time: 'low' },
  },
  // 태양 + 불꽃 + 바위 + 황혼 = 빛나는 용암
  blazing_lava: {
    name: '빛나는 용암',
    description: '뜨겁고 강렬한 에너지로 주변을 밝히는 존재',
    emoji: '🌋',
    conditions: { light: 'high', temperature: 'high', texture: 'high', time: 'high' },
  },
  // 달 + 이슬 + 바위 + 새벽 = 고요한 얼음
  quiet_ice: {
    name: '고요한 얼음',
    description: '차분하고 단단한 내면을 지닌 깊은 존재',
    emoji: '🧊',
    conditions: { light: 'low', temperature: 'low', texture: 'high', time: 'low' },
  },
  // 태양 + 이슬 + 물 + 황혼 = 반짝이는 파도
  sparkling_wave: {
    name: '반짝이는 파도',
    description: '밝고 유연하게 세상을 누비는 자유로운 존재',
    emoji: '🌊',
    conditions: { light: 'high', temperature: 'low', texture: 'low', time: 'high' },
  },
  // 중립 = 조화로운 무지개
  balanced_rainbow: {
    name: '조화로운 무지개',
    description: '다양한 색을 품고 균형을 이루는 존재',
    emoji: '🌈',
    conditions: { light: 'mid', temperature: 'mid', texture: 'mid', time: 'mid' },
  },
  // 기본 폴백
  default: {
    name: '신비로운 오로라',
    description: '예측할 수 없는 아름다움을 지닌 독특한 존재',
    emoji: '✨',
    conditions: {},
  },
}

/** 문항 ID로 문항 가져오기 */
export function getSpectrumQuestionById(id: string): SpectrumQuestion | undefined {
  return SPECTRUM_QUESTIONS.find((q) => q.id === id)
}

/** 축별 문항 가져오기 */
export function getQuestionsByAxis(axis: SpectrumQuestion['axis']): SpectrumQuestion[] {
  return SPECTRUM_QUESTIONS.filter((q) => q.axis === axis)
}

/** 축 정보 가져오기 */
export function getAxisInfo(axisId: string) {
  return SPECTRUM_AXES.find((a) => a.id === axisId)
}
