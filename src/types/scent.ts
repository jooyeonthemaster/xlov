/**
 * XLOV Experience - 향 시스템 타입 정의
 * 모든 체험 프로그램에서 공통으로 사용되는 향 관련 타입
 */

/** 향 노트 단일 항목 */
export interface ScentNote {
  /** 향료 이름 (한국어) */
  name: string
  /** 향료 이름 (영문) */
  nameEn: string
  /** 강도 0-100 */
  intensity: number
  /** 시각화용 색상 HEX */
  color: string
}

/** 멤버 영향도 (합계 100%) */
export interface MemberInfluence {
  umuti: number
  rui: number
  hyun: number
  haru: number
}

/** 향 레시피 전체 */
export interface ScentRecipe {
  /** 향 이름 (영문, 2-4단어) */
  name: string
  /** 짧은 설명 (한국어, 1-2문장) */
  description: string

  /** TOP 노트 (2-3개, 첫인상) */
  top: ScentNote[]
  /** MIDDLE 노트 (2-3개, 핵심 캐릭터) */
  middle: ScentNote[]
  /** BASE 노트 (2-3개, 지속성) */
  base: ScentNote[]

  /** 멤버 영향도 (합계 100%) */
  memberInfluence: MemberInfluence

  /** 분위기 키워드 (3-5개) */
  mood: string[]
  /** 어울리는 계절 */
  season: string
  /** 어울리는 시간대 */
  timeOfDay: string
}

/** 멤버 시그니처 향 */
export interface MemberSignatureScent {
  memberId: string
  signatureName: string
  recipe: ScentRecipe
}

/** 향 노트 카테고리 */
export type ScentNoteCategory =
  | 'citrus'
  | 'floral'
  | 'green'
  | 'woody'
  | 'warm'
  | 'musk'
  | 'cool'
  | 'spicy'

/** 향 노트 라이브러리 항목 */
export interface ScentNoteLibraryItem {
  name: string
  nameEn: string
  color: string
}

/** 향 노트 라이브러리 (카테고리별) */
export type ScentNoteLibrary = Record<ScentNoteCategory, ScentNoteLibraryItem[]>
