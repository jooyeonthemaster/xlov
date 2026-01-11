/**
 * XLOV Experience - 프로그램 정보
 * 허브 페이지에서 사용되는 프로그램 메타데이터
 */

import type { ProgramInfo } from '@/types/api'

/** 체험 프로그램 목록 */
export const PROGRAMS: ProgramInfo[] = [
  {
    id: 'canvas',
    name: 'CANVAS',
    nameEn: 'Canvas',
    description: '내가 그린 멤버의 향',
    icon: '🎨',
    accentColor: '#C9A962', // 우무티 골드 베이스
    route: '/canvas/select',
  },
  {
    id: 'mirror',
    name: 'MIRROR',
    nameEn: 'Mirror',
    description: '내가 된 멤버의 향',
    icon: '💄',
    accentColor: '#D4A5A5', // 현 로즈 베이스
    route: '/mirror/select',
  },
  {
    id: 'spectrum',
    name: 'SPECTRUM',
    nameEn: 'Spectrum',
    description: '나다움의 향',
    icon: '🔮',
    accentColor: '#7B9ED9', // 루이 블루 베이스
    route: '/spectrum/questions',
  },
]

/** 프로그램 ID로 정보 가져오기 */
export function getProgramById(id: string): ProgramInfo | undefined {
  return PROGRAMS.find((p) => p.id === id)
}

/** 프로그램 라우트로 정보 가져오기 */
export function getProgramByRoute(route: string): ProgramInfo | undefined {
  return PROGRAMS.find((p) => route.startsWith(p.route.split('/')[1]))
}
