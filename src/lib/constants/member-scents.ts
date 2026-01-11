/**
 * XLOV Experience - 멤버 시그니처 향
 * 각 멤버의 고유한 향 레시피
 */

import type { ScentRecipe } from '@/types/scent'

/** 멤버별 시그니처 향 레시피 */
export const MEMBER_SIGNATURE_SCENTS: Record<string, ScentRecipe> = {
  umuti: {
    name: 'Warm Embrace',
    description: '따뜻한 황금빛 포옹처럼 감싸주는 향',
    top: [
      { name: '베르가못', nameEn: 'Bergamot', intensity: 85, color: '#FFD700' },
      { name: '오렌지', nameEn: 'Orange', intensity: 70, color: '#FFA500' },
    ],
    middle: [
      { name: '재스민', nameEn: 'Jasmine', intensity: 75, color: '#FFFACD' },
      { name: '일랑일랑', nameEn: 'Ylang Ylang', intensity: 60, color: '#FFFFE0' },
    ],
    base: [
      { name: '앰버', nameEn: 'Amber', intensity: 90, color: '#FFBF00' },
      { name: '샌달우드', nameEn: 'Sandalwood', intensity: 80, color: '#C19A6B' },
      { name: '바닐라', nameEn: 'Vanilla', intensity: 50, color: '#F3E5AB' },
    ],
    memberInfluence: { umuti: 100, rui: 0, hyun: 0, haru: 0 },
    mood: ['따뜻한', '포근한', '황금빛', '포용적인'],
    season: '가을',
    timeOfDay: '오후',
  },

  rui: {
    name: 'Midnight Blue',
    description: '차가운 달빛 아래 신비로운 밤의 향',
    top: [
      { name: '라벤더', nameEn: 'Lavender', intensity: 80, color: '#E6E6FA' },
      { name: '민트', nameEn: 'Mint', intensity: 65, color: '#98FF98' },
    ],
    middle: [
      { name: '아이리스', nameEn: 'Iris', intensity: 85, color: '#E6E6FA' },
      { name: '바이올렛', nameEn: 'Violet', intensity: 70, color: '#EE82EE' },
    ],
    base: [
      { name: '머스크', nameEn: 'Musk', intensity: 90, color: '#F5F5DC' },
      { name: '시더우드', nameEn: 'Cedarwood', intensity: 75, color: '#8B4513' },
      { name: '베티버', nameEn: 'Vetiver', intensity: 60, color: '#556B2F' },
    ],
    memberInfluence: { umuti: 0, rui: 100, hyun: 0, haru: 0 },
    mood: ['차가운', '신비로운', '세련된', '깊은'],
    season: '겨울',
    timeOfDay: '밤',
  },

  hyun: {
    name: 'Dawn Mist',
    description: '새벽 안개처럼 부드럽고 몽환적인 향',
    top: [
      { name: '피오니', nameEn: 'Peony', intensity: 85, color: '#FFD1DC' },
      { name: '프리지아', nameEn: 'Freesia', intensity: 70, color: '#FFFAF0' },
    ],
    middle: [
      { name: '로즈', nameEn: 'Rose', intensity: 80, color: '#FFB6C1' },
      { name: '매그놀리아', nameEn: 'Magnolia', intensity: 65, color: '#FFF5EE' },
    ],
    base: [
      { name: '화이트머스크', nameEn: 'White Musk', intensity: 90, color: '#FFFAFA' },
      { name: '캐시미어우드', nameEn: 'Cashmere Wood', intensity: 70, color: '#DEB887' },
    ],
    memberInfluence: { umuti: 0, rui: 0, hyun: 100, haru: 0 },
    mood: ['부드러운', '몽환적인', '로맨틱한', '새벽빛'],
    season: '봄',
    timeOfDay: '새벽',
  },

  haru: {
    name: 'Spring Breeze',
    description: '싱그러운 봄바람처럼 생기 넘치는 향',
    top: [
      { name: '자몽', nameEn: 'Grapefruit', intensity: 85, color: '#FF6B6B' },
      { name: '그린애플', nameEn: 'Green Apple', intensity: 75, color: '#7CFC00' },
    ],
    middle: [
      { name: '그린티', nameEn: 'Green Tea', intensity: 80, color: '#90EE90' },
      { name: '대나무', nameEn: 'Bamboo', intensity: 65, color: '#7CFC00' },
    ],
    base: [
      { name: '화이트시더', nameEn: 'White Cedar', intensity: 75, color: '#D2B48C' },
      { name: '프레시머스크', nameEn: 'Fresh Musk', intensity: 85, color: '#F0FFFF' },
    ],
    memberInfluence: { umuti: 0, rui: 0, hyun: 0, haru: 100 },
    mood: ['싱그러운', '생기있는', '청량한', '활발한'],
    season: '봄',
    timeOfDay: '아침',
  },
}

/** 멤버 ID로 시그니처 향 가져오기 */
export function getMemberSignatureScent(memberId: string): ScentRecipe | null {
  return MEMBER_SIGNATURE_SCENTS[memberId] || null
}

/** 모든 멤버 시그니처 향 목록 */
export function getAllMemberScents(): Array<{ memberId: string; scent: ScentRecipe }> {
  return Object.entries(MEMBER_SIGNATURE_SCENTS).map(([memberId, scent]) => ({
    memberId,
    scent,
  }))
}
