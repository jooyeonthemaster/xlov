/**
 * XLOV Experience - Mirror 스타일 변환 타입 정의
 * 셀카 업로드 → 멤버 스타일 변환
 */

/** 스타일 강도 옵션 */
export type StyleIntensity = 'light' | 'medium' | 'bold'

/** 스타일 강도 정보 */
export interface StyleIntensityInfo {
  id: StyleIntensity
  label: string
  labelEn: string
  description: string
}

/** Mirror 입력 데이터 */
export interface MirrorInput {
  /** 선택된 멤버 ID */
  memberId: string
  /** 셀카 이미지 base64 */
  selfieBase64: string
  /** 이미지 MIME 타입 */
  selfieMimeType: string
  /** 스타일 강도 */
  intensity: StyleIntensity
}

/** 적용된 스타일 정보 */
export interface AppliedStyle {
  /** 적용된 메이크업 요소 */
  makeup: string[]
  /** 적용된 스타일링 요소 */
  styling: string[]
  /** 전체 분위기 */
  mood: string
}

/** Mirror 결과 */
export interface MirrorResult {
  /** 원본 이미지 base64 */
  originalImage: string
  /** 변환된 이미지 base64 */
  transformedImage: string
  /** 적용된 스타일 정보 */
  styleApplied: AppliedStyle
  /** 멤버 스타일 영향도 % */
  memberInfluence: number
}

/** 멤버별 스타일 가이드 */
export interface MemberStyleGuide {
  memberId: string
  memberName: string
  /** 메이크업 특징 */
  makeupFeatures: string[]
  /** 스타일링 특징 */
  stylingFeatures: string[]
  /** 컬러 팔레트 */
  colorPalette: string[]
  /** 전체 무드 키워드 */
  moodKeywords: string[]
}
