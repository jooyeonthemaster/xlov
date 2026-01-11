/**
 * XLOV Experience - Mirror 스타일 상수
 */

import type { StyleIntensityInfo, MemberStyleGuide } from '@/types/mirror'

/** 스타일 강도 옵션 */
export const STYLE_INTENSITIES: StyleIntensityInfo[] = [
  {
    id: 'light',
    label: '은은하게',
    labelEn: 'Light',
    description: '자연스러운 터치로 멤버의 분위기만 살짝',
  },
  {
    id: 'medium',
    label: '적당히',
    labelEn: 'Medium',
    description: '멤버의 스타일과 나의 개성이 조화롭게',
  },
  {
    id: 'bold',
    label: '과감하게',
    labelEn: 'Bold',
    description: '멤버의 시그니처 스타일로 강렬한 변신',
  },
]

/** 멤버별 스타일 가이드 */
export const MEMBER_STYLE_GUIDES: Record<string, MemberStyleGuide> = {
  umuti: {
    memberId: 'umuti',
    memberName: '우무티',
    makeupFeatures: [
      '깊은 스모키 아이',
      '강렬한 아이라이너',
      '볼드 립',
      '컨투어링',
    ],
    stylingFeatures: [
      '다크 시크',
      '엣지있는 액세서리',
      '레더 디테일',
      '올블랙 룩',
    ],
    colorPalette: ['#1a1a2e', '#16213e', '#0f0f23', '#e94560'],
    moodKeywords: ['미스터리', '카리스마', '강렬함', '섹시'],
  },
  rui: {
    memberId: 'rui',
    memberName: '루이',
    makeupFeatures: [
      '청순한 내추럴 메이크업',
      '투명 글로시 립',
      '은은한 블러셔',
      '청초한 눈매',
    ],
    stylingFeatures: [
      '로맨틱 무드',
      '파스텔 톤',
      '플로럴 디테일',
      '소프트한 질감',
    ],
    colorPalette: ['#fdf5e6', '#f8e8ee', '#d4a5a5', '#9a8c98'],
    moodKeywords: ['청순', '우아', '로맨틱', '소프트'],
  },
  hyun: {
    memberId: 'hyun',
    memberName: '현',
    makeupFeatures: [
      '내추럴한 그루밍',
      '깔끔한 눈썹',
      '건강한 피부 톤',
      '남성적 컨투어',
    ],
    stylingFeatures: [
      '캐주얼 시크',
      '스트릿 무드',
      '스포티 액센트',
      '데님 스타일',
    ],
    colorPalette: ['#2d3436', '#636e72', '#b2bec3', '#dfe6e9'],
    moodKeywords: ['시크', '댄디', '스마트', '쿨'],
  },
  haru: {
    memberId: 'haru',
    memberName: '하루',
    makeupFeatures: [
      '생기있는 복숭아 메이크업',
      '스파클 아이',
      '글리터 포인트',
      '러블리 입술',
    ],
    stylingFeatures: [
      '큐트 팝',
      '비비드 컬러',
      '유니크한 액세서리',
      '플레이풀 레이어링',
    ],
    colorPalette: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'],
    moodKeywords: ['활발', '귀여움', '에너지', '유쾌'],
  },
}

/** Mirror 프로그램 색상 */
export const MIRROR_COLOR = '#FF6B9D'
