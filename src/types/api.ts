/**
 * XLOV Experience - API 응답 타입 정의
 * 모든 API 엔드포인트의 요청/응답 타입
 */

import type { ScentRecipe } from './scent'
import type { SpectrumResult, SpectrumAnswers } from './spectrum'
import type { MirrorResult, StyleIntensity } from './mirror'

/** 기본 API 응답 래퍼 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// ========================================
// Canvas API
// ========================================

/** Canvas 요청 데이터 */
export interface CanvasRequest {
  memberId: string
  responses: {
    color: string
    season: string
    timeOfDay: string
    texture: string
    emotion: string
    oneWord: string
  }
}

/** Canvas 응답 데이터 */
export interface CanvasResponseData {
  /** 생성된 AI 이미지 (base64 data URL) */
  generatedImage: string
  /** 향 레시피 */
  scent: ScentRecipe
}

/** Canvas API 응답 */
export type CanvasApiResponse = ApiResponse<CanvasResponseData>

/** Canvas Generate 엔드포인트 직접 응답 (래퍼 없음) */
export interface CanvasGenerateResponse {
  imageUrl: string
  scent: ScentRecipe
  memberId: string
  memberName: string
}

// ========================================
// Mirror API
// ========================================

/** Mirror 요청 데이터 */
export interface MirrorRequest {
  memberId: string
  selfieBase64: string
  selfieMimeType: string
  intensity: StyleIntensity
}

/** Mirror 응답 데이터 */
export interface MirrorResponseData {
  /** 변환 결과 */
  result: MirrorResult
  /** 향 레시피 */
  scent: ScentRecipe
}

/** Mirror API 응답 */
export type MirrorApiResponse = ApiResponse<MirrorResponseData>

// ========================================
// Spectrum API
// ========================================

/** Spectrum 요청 데이터 */
export interface SpectrumRequest {
  /** 문항별 답변 (-2 ~ +2) */
  answers: SpectrumAnswers
}

/** Spectrum 응답 데이터 */
export interface SpectrumResponseData {
  /** 분석 결과 */
  result: SpectrumResult
  /** 향 레시피 */
  scent: ScentRecipe
}

/** Spectrum API 응답 */
export type SpectrumApiResponse = ApiResponse<SpectrumResponseData>

// ========================================
// 공통 타입
// ========================================

/** 프로그램 타입 */
export type ProgramType = 'canvas' | 'mirror' | 'spectrum'

/** 프로그램 정보 */
export interface ProgramInfo {
  id: ProgramType
  name: string
  nameEn: string
  description: string
  icon: string
  accentColor: string
  route: string
}
