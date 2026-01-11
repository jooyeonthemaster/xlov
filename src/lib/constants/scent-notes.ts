/**
 * XLOV Experience - 향 노트 라이브러리
 * 모든 향 생성에 사용되는 향료 데이터
 */

import type { ScentNoteLibrary } from '@/types/scent'

export const SCENT_NOTES: ScentNoteLibrary = {
  citrus: [
    { name: '베르가못', nameEn: 'Bergamot', color: '#FFD700' },
    { name: '자몽', nameEn: 'Grapefruit', color: '#FF6B6B' },
    { name: '오렌지', nameEn: 'Orange', color: '#FFA500' },
    { name: '레몬', nameEn: 'Lemon', color: '#FFF44F' },
    { name: '유자', nameEn: 'Yuzu', color: '#F0E68C' },
    { name: '그린애플', nameEn: 'Green Apple', color: '#7CFC00' },
    { name: '만다린', nameEn: 'Mandarin', color: '#FF8C00' },
  ],
  floral: [
    { name: '로즈', nameEn: 'Rose', color: '#FFB6C1' },
    { name: '재스민', nameEn: 'Jasmine', color: '#FFFACD' },
    { name: '피오니', nameEn: 'Peony', color: '#FFD1DC' },
    { name: '매그놀리아', nameEn: 'Magnolia', color: '#FFF5EE' },
    { name: '아이리스', nameEn: 'Iris', color: '#E6E6FA' },
    { name: '바이올렛', nameEn: 'Violet', color: '#EE82EE' },
    { name: '일랑일랑', nameEn: 'Ylang Ylang', color: '#FFFFE0' },
    { name: '프리지아', nameEn: 'Freesia', color: '#FFFAF0' },
    { name: '오렌지 블로썸', nameEn: 'Orange Blossom', color: '#FFF8DC' },
    { name: '네롤리', nameEn: 'Neroli', color: '#FAFAD2' },
    { name: '튜베로즈', nameEn: 'Tuberose', color: '#FFFAFA' },
  ],
  green: [
    { name: '그린티', nameEn: 'Green Tea', color: '#90EE90' },
    { name: '대나무', nameEn: 'Bamboo', color: '#7CFC00' },
    { name: '민트', nameEn: 'Mint', color: '#98FF98' },
    { name: '바질', nameEn: 'Basil', color: '#228B22' },
    { name: '갈바넘', nameEn: 'Galbanum', color: '#9ACD32' },
    { name: '그린 리프', nameEn: 'Green Leaf', color: '#32CD32' },
  ],
  woody: [
    { name: '샌달우드', nameEn: 'Sandalwood', color: '#C19A6B' },
    { name: '시더우드', nameEn: 'Cedarwood', color: '#8B4513' },
    { name: '베티버', nameEn: 'Vetiver', color: '#556B2F' },
    { name: '화이트시더', nameEn: 'White Cedar', color: '#D2B48C' },
    { name: '캐시미어우드', nameEn: 'Cashmere Wood', color: '#DEB887' },
    { name: '오드우드', nameEn: 'Oud Wood', color: '#4A3728' },
    { name: '파촐리', nameEn: 'Patchouli', color: '#6B4423' },
  ],
  warm: [
    { name: '앰버', nameEn: 'Amber', color: '#FFBF00' },
    { name: '바닐라', nameEn: 'Vanilla', color: '#F3E5AB' },
    { name: '시나몬', nameEn: 'Cinnamon', color: '#D2691E' },
    { name: '통카빈', nameEn: 'Tonka Bean', color: '#8B4513' },
    { name: '카라멜', nameEn: 'Caramel', color: '#FFD700' },
    { name: '허니', nameEn: 'Honey', color: '#EB9605' },
  ],
  musk: [
    { name: '화이트머스크', nameEn: 'White Musk', color: '#FFFAFA' },
    { name: '머스크', nameEn: 'Musk', color: '#F5F5DC' },
    { name: '프레시머스크', nameEn: 'Fresh Musk', color: '#F0FFFF' },
    { name: '스킨머스크', nameEn: 'Skin Musk', color: '#FFE4E1' },
    { name: '파우더리머스크', nameEn: 'Powdery Musk', color: '#FFF0F5' },
  ],
  cool: [
    { name: '라벤더', nameEn: 'Lavender', color: '#E6E6FA' },
    { name: '유칼립투스', nameEn: 'Eucalyptus', color: '#87CEEB' },
    { name: '아쿠아', nameEn: 'Aqua', color: '#00CED1' },
    { name: '씨솔트', nameEn: 'Sea Salt', color: '#B0E0E6' },
    { name: '오존', nameEn: 'Ozone', color: '#ADD8E6' },
    { name: '마린', nameEn: 'Marine', color: '#4682B4' },
  ],
  spicy: [
    { name: '핑크페퍼', nameEn: 'Pink Pepper', color: '#FF69B4' },
    { name: '카다멈', nameEn: 'Cardamom', color: '#DAA520' },
    { name: '인센스', nameEn: 'Incense', color: '#696969' },
    { name: '진저', nameEn: 'Ginger', color: '#FFD700' },
    { name: '사프란', nameEn: 'Saffron', color: '#FF4500' },
    { name: '블랙페퍼', nameEn: 'Black Pepper', color: '#2F4F4F' },
  ],
}

/** 향 노트 검색 (이름으로) */
export function findScentNote(name: string) {
  for (const category of Object.values(SCENT_NOTES)) {
    const found = category.find(
      (note) => note.name === name || note.nameEn.toLowerCase() === name.toLowerCase()
    )
    if (found) return found
  }
  return null
}

/** 카테고리별 향 노트 가져오기 */
export function getScentNotesByCategory(category: keyof typeof SCENT_NOTES) {
  return SCENT_NOTES[category] || []
}
