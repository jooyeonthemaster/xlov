/**
 * XLOV Experience - Spectrum 성격 검사 타입 정의
 * 4축 스펙트럼 기반 성격 유형 검사
 */

/** 스펙트럼 축 ID */
export type SpectrumAxisId = 'light' | 'temperature' | 'texture' | 'time'

/** 스펙트럼 축 값 (0-100, 50이 중립) */
export interface SpectrumAxis {
  /** 축 ID */
  id: SpectrumAxisId
  /** 축 이름 (한국어) */
  label: string
  /** 0-100 값 */
  value: number
  /** 왼쪽 극단 라벨 */
  leftLabel: string
  /** 오른쪽 극단 라벨 */
  rightLabel: string
  /** 왼쪽 아이콘 (이모지) */
  leftIcon: string
  /** 오른쪽 아이콘 (이모지) */
  rightIcon: string
}

/** 스펙트럼 검사 문항 옵션 */
export interface SpectrumQuestionOption {
  /** -2 ~ +2 값 */
  value: number
  /** 옵션 라벨 */
  label: string
}

/** 스펙트럼 검사 문항 */
export interface SpectrumQuestion {
  /** 문항 ID */
  id: string
  /** 질문 텍스트 */
  text: string
  /** 해당 축 */
  axis: SpectrumAxisId
  /** 선택 옵션 (5개, -2 ~ +2) */
  options: SpectrumQuestionOption[]
}

/** 아키타입 정보 */
export interface SpectrumArchetype {
  /** 유형 이름 (예: "고요한 불꽃") */
  name: string
  /** 짧은 설명 */
  description: string
  /** 대표 이모지 */
  emoji: string
}

/** 멤버 매칭 결과 단일 항목 */
export interface MemberMatchItem {
  /** 멤버 ID */
  memberId: string
  /** 매칭 퍼센트 */
  percentage: number
  /** 매칭 이유 */
  reason: string
}

/** 멤버 매칭 결과 */
export interface MemberMatch {
  /** 가장 잘 맞는 멤버 */
  soulMate: MemberMatchItem
  /** 반대 에너지 멤버 */
  opposite: MemberMatchItem
  /** 숨겨진 연결 멤버 */
  hidden: MemberMatchItem
}

/** 스펙트럼 검사 결과 */
export interface SpectrumResult {
  /** 4축 스펙트럼 값 */
  axes: SpectrumAxis[]
  /** 아키타입 정보 */
  archetype: SpectrumArchetype
  /** 멤버 매칭 결과 */
  memberMatch: MemberMatch
}

/** 스펙트럼 검사 응답 (문항별 답변) */
export type SpectrumAnswers = Record<string, number>

/** 멤버별 스펙트럼 프로필 */
export interface MemberSpectrumProfile {
  light: number
  temperature: number
  texture: number
  time: number
}

/** 성격 시나리오 (4가지 상황) - AI 생성 */
export interface PersonalityScenarios {
  /** 갈등 상황에서 */
  conflict: string
  /** 스트레스 받을 때 */
  stress: string
  /** 새로운 도전 앞에서 */
  challenge: string
  /** 휴식이 필요할 때 */
  rest: string
}

/** 케미 스토리 (Soul Mate와의 관계) - AI 생성 */
export interface ChemistryStory {
  /** 함께 여행 간다면? */
  travel: string
  /** 같이 일한다면? */
  work: string
  /** 힘든 일 생겼을 때? */
  support: string
}

/** 성격 분석 데이터 (AI 생성) */
export interface PersonalityAnalysis {
  /** 4가지 시나리오 */
  scenarios: PersonalityScenarios
  /** Soul Mate와의 케미 스토리 */
  chemistry: ChemistryStory
}

/** 확장된 스펙트럼 결과 (성격 분석 포함) */
export interface EnhancedSpectrumResult extends SpectrumResult {
  /** 성격 분석 데이터 (선택적) */
  personality?: PersonalityAnalysis
}
