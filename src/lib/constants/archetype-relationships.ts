/**
 * XLOV Experience - Archetype Relationship Compatibility Matrix
 * 7×7×3 궁합표 (7 아키타입 × 7 아키타입 × 3 관계 타입)
 */

export type RelationType = 'friends' | 'lovers' | 'colleagues'
export type ArchetypeKey =
  | 'quiet_mist'
  | 'warm_mist'
  | 'blazing_lava'
  | 'quiet_ice'
  | 'sparkling_wave'
  | 'balanced_rainbow'
  | 'default'

export interface RelationshipScore {
  friends: number // 1-5 stars
  lovers: number // 1-5 stars
  colleagues: number // 1-5 stars
}

export interface RelationshipDetail {
  score: number
  summary: string
  description: string
}

/** 7×7 아키타입 궁합 매트릭스 */
export const ARCHETYPE_RELATIONSHIPS: Record<
  ArchetypeKey,
  Record<ArchetypeKey, RelationshipScore>
> = {
  // ========================================
  // 고요한 안개 (내향, 차분, 유연, 여유)
  // ========================================
  quiet_mist: {
    quiet_mist: { friends: 5, lovers: 3, colleagues: 4 },
    warm_mist: { friends: 4, lovers: 4, colleagues: 3 },
    blazing_lava: { friends: 2, lovers: 3, colleagues: 2 },
    quiet_ice: { friends: 4, lovers: 3, colleagues: 5 },
    sparkling_wave: { friends: 3, lovers: 4, colleagues: 3 },
    balanced_rainbow: { friends: 4, lovers: 4, colleagues: 5 },
    default: { friends: 3, lovers: 4, colleagues: 3 },
  },

  // ========================================
  // 따스한 안개 (내향, 열정, 유연, 여유)
  // ========================================
  warm_mist: {
    quiet_mist: { friends: 4, lovers: 4, colleagues: 3 },
    warm_mist: { friends: 5, lovers: 4, colleagues: 4 },
    blazing_lava: { friends: 3, lovers: 4, colleagues: 3 },
    quiet_ice: { friends: 3, lovers: 2, colleagues: 4 },
    sparkling_wave: { friends: 4, lovers: 5, colleagues: 4 },
    balanced_rainbow: { friends: 5, lovers: 5, colleagues: 5 },
    default: { friends: 4, lovers: 5, colleagues: 4 },
  },

  // ========================================
  // 빛나는 용암 (외향, 열정, 단단, 역동)
  // ========================================
  blazing_lava: {
    quiet_mist: { friends: 2, lovers: 3, colleagues: 2 },
    warm_mist: { friends: 3, lovers: 4, colleagues: 3 },
    blazing_lava: { friends: 4, lovers: 3, colleagues: 4 },
    quiet_ice: { friends: 1, lovers: 2, colleagues: 2 },
    sparkling_wave: { friends: 5, lovers: 4, colleagues: 5 },
    balanced_rainbow: { friends: 4, lovers: 4, colleagues: 5 },
    default: { friends: 3, lovers: 4, colleagues: 3 },
  },

  // ========================================
  // 고요한 얼음 (내향, 차분, 단단, 여유)
  // ========================================
  quiet_ice: {
    quiet_mist: { friends: 4, lovers: 3, colleagues: 5 },
    warm_mist: { friends: 3, lovers: 2, colleagues: 4 },
    blazing_lava: { friends: 1, lovers: 2, colleagues: 2 },
    quiet_ice: { friends: 5, lovers: 3, colleagues: 5 },
    sparkling_wave: { friends: 2, lovers: 3, colleagues: 3 },
    balanced_rainbow: { friends: 4, lovers: 4, colleagues: 5 },
    default: { friends: 3, lovers: 3, colleagues: 4 },
  },

  // ========================================
  // 반짝이는 파도 (외향, 차분, 유연, 역동)
  // ========================================
  sparkling_wave: {
    quiet_mist: { friends: 3, lovers: 4, colleagues: 3 },
    warm_mist: { friends: 4, lovers: 5, colleagues: 4 },
    blazing_lava: { friends: 5, lovers: 4, colleagues: 5 },
    quiet_ice: { friends: 2, lovers: 3, colleagues: 3 },
    sparkling_wave: { friends: 5, lovers: 4, colleagues: 5 },
    balanced_rainbow: { friends: 5, lovers: 5, colleagues: 5 },
    default: { friends: 4, lovers: 5, colleagues: 4 },
  },

  // ========================================
  // 조화로운 무지개 (모든 축 중립)
  // ========================================
  balanced_rainbow: {
    quiet_mist: { friends: 4, lovers: 4, colleagues: 5 },
    warm_mist: { friends: 5, lovers: 5, colleagues: 5 },
    blazing_lava: { friends: 4, lovers: 4, colleagues: 5 },
    quiet_ice: { friends: 4, lovers: 4, colleagues: 5 },
    sparkling_wave: { friends: 5, lovers: 5, colleagues: 5 },
    balanced_rainbow: { friends: 5, lovers: 5, colleagues: 5 },
    default: { friends: 5, lovers: 5, colleagues: 5 },
  },

  // ========================================
  // 신비로운 오로라 (예측 불가능)
  // ========================================
  default: {
    quiet_mist: { friends: 3, lovers: 4, colleagues: 3 },
    warm_mist: { friends: 4, lovers: 5, colleagues: 4 },
    blazing_lava: { friends: 3, lovers: 4, colleagues: 3 },
    quiet_ice: { friends: 3, lovers: 3, colleagues: 4 },
    sparkling_wave: { friends: 4, lovers: 5, colleagues: 4 },
    balanced_rainbow: { friends: 5, lovers: 5, colleagues: 5 },
    default: { friends: 4, lovers: 5, colleagues: 4 },
  },
}

/** 궁합 점수별 설명 템플릿 */
export const RELATIONSHIP_SUMMARIES: Record<
  RelationType,
  Record<number, { emoji: string; title: string; description: string }>
> = {
  friends: {
    5: {
      emoji: '🎉',
      title: '완벽한 친구 케미!',
      description:
        '서로 이해하고 존중하며, 함께 있을 때 가장 편안해요. 말 안 해도 통하는 사이 ㅋㅋ',
    },
    4: {
      emoji: '😊',
      title: '편하게 지낼 수 있어요',
      description:
        '비슷한 점도 있고 다른 점도 있지만, 서로 배울 점이 많아요. 좋은 친구 관계 가능!',
    },
    3: {
      emoji: '🤝',
      title: '적당한 거리감이 좋아요',
      description:
        '가끔 만나면 좋은데 너무 자주는 피곤할 수 있어요. 서로 다른 점을 이해하면 괜찮아요.',
    },
    2: {
      emoji: '😅',
      title: '조금 조심스러운 관계',
      description:
        '성향 차이가 커서 서로 이해하기 어려울 수 있어요. 노력하면 친해질 수 있지만 시간이 필요해요.',
    },
    1: {
      emoji: '⚠️',
      title: '힘들 수 있어요',
      description:
        '완전 반대 성향이라 이해하기 어려워요 ㅠㅠ 억지로 친해지려 하지 말고 거리 두는 게 나아요.',
    },
  },

  lovers: {
    5: {
      emoji: '💕',
      title: '완전 소울메이트!',
      description:
        '서로를 완벽하게 보완해주는 관계! 부족한 부분을 채워주고 장점은 더 빛나게 해줘요 ㅋㅋㅋ',
    },
    4: {
      emoji: '💖',
      title: '좋은 연인 궁합',
      description:
        '서로 다른 점이 매력적으로 느껴져요. 노력하면 완벽한 커플 가능! 서로를 이해하려는 마음이 중요해요.',
    },
    3: {
      emoji: '💗',
      title: '노력이 필요한 관계',
      description:
        '좋을 때는 좋은데 안 맞을 때는 답답할 수 있어요. 서로 양보하고 배려하면 괜찮아요.',
    },
    2: {
      emoji: '💔',
      title: '어려운 연애',
      description:
        '성향 차이가 커서 자주 부딪힐 수 있어요. 서로를 바꾸려 하지 말고 있는 그대로 받아들여야 해요.',
    },
    1: {
      emoji: '⛔',
      title: '추천하지 않아요',
      description:
        '완전 상극 관계... 서로에게 스트레스만 줄 가능성이 높아요 ㅠ 다른 인연 찾는 게 나을 듯!',
    },
  },

  colleagues: {
    5: {
      emoji: '🏆',
      title: '최고의 업무 파트너!',
      description:
        '서로 보완하며 시너지를 내는 완벽한 조합! 프로젝트 성공률 99% ㅋㅋ',
    },
    4: {
      emoji: '👍',
      title: '좋은 협업 관계',
      description:
        '역할 분담이 잘 되고 서로 존중하며 일할 수 있어요. 좋은 팀워크 기대 가능!',
    },
    3: {
      emoji: '🤷',
      title: '보통의 동료 관계',
      description:
        '업무만 잘 분담하면 큰 문제 없어요. 너무 친하려 하지 말고 적당한 거리 유지하면 OK',
    },
    2: {
      emoji: '😰',
      title: '갈등 가능성 있음',
      description:
        '업무 스타일 차이로 자주 부딪힐 수 있어요. 명확한 역할 분담과 커뮤니케이션 필수!',
    },
    1: {
      emoji: '🚨',
      title: '피하는 게 좋아요',
      description:
        '일하는 방식이 완전 달라서 스트레스 폭발 예정 ㅠㅠ 가능하면 같은 팀 피하세요...',
    },
  },
}

/** 아키타입 이름 맵핑 (한국어) */
export const ARCHETYPE_NAMES: Record<ArchetypeKey, string> = {
  quiet_mist: '고요한 안개',
  warm_mist: '따스한 안개',
  blazing_lava: '빛나는 용암',
  quiet_ice: '고요한 얼음',
  sparkling_wave: '반짝이는 파도',
  balanced_rainbow: '조화로운 무지개',
  default: '신비로운 오로라',
}

/**
 * 두 아키타입의 관계 점수 가져오기
 */
export function getRelationshipScore(
  archetype1: ArchetypeKey,
  archetype2: ArchetypeKey,
  relationType: RelationType
): number {
  const relationship = ARCHETYPE_RELATIONSHIPS[archetype1]?.[archetype2]
  if (!relationship) return 3 // 기본값

  return relationship[relationType]
}

/**
 * 두 아키타입의 관계 상세 정보 가져오기
 */
export function getRelationshipDetail(
  archetype1: ArchetypeKey,
  archetype2: ArchetypeKey,
  relationType: RelationType
): RelationshipDetail {
  const score = getRelationshipScore(archetype1, archetype2, relationType)
  const summary = RELATIONSHIP_SUMMARIES[relationType][score]

  return {
    score,
    summary: summary.title,
    description: summary.description,
  }
}

/**
 * 특정 아키타입의 모든 관계 궁합 가져오기
 */
export function getAllRelationships(
  archetype: ArchetypeKey,
  relationType: RelationType
): Array<{
  archetype: ArchetypeKey
  name: string
  score: number
  summary: string
}> {
  const archetypeKeys: ArchetypeKey[] = [
    'quiet_mist',
    'warm_mist',
    'blazing_lava',
    'quiet_ice',
    'sparkling_wave',
    'balanced_rainbow',
    'default',
  ]

  return archetypeKeys.map((targetArchetype) => {
    const score = getRelationshipScore(archetype, targetArchetype, relationType)
    const detail = getRelationshipDetail(archetype, targetArchetype, relationType)

    return {
      archetype: targetArchetype,
      name: ARCHETYPE_NAMES[targetArchetype],
      score,
      summary: detail.summary,
    }
  })
}

/**
 * 최고/최악 궁합 찾기
 */
export function getBestAndWorstMatches(
  archetype: ArchetypeKey,
  relationType: RelationType
): {
  best: Array<{ archetype: ArchetypeKey; name: string; score: number }>
  worst: Array<{ archetype: ArchetypeKey; name: string; score: number }>
} {
  const allRelationships = getAllRelationships(archetype, relationType)

  // 자기 자신 제외
  const filtered = allRelationships.filter((r) => r.archetype !== archetype)

  // 점수로 정렬
  const sorted = [...filtered].sort((a, b) => b.score - a.score)

  return {
    best: sorted.slice(0, 2), // 최고 궁합 2개
    worst: sorted.slice(-2).reverse(), // 최악 궁합 2개
  }
}

/**
 * 궁합 점수에 따른 이모지 가져오기
 */
export function getScoreEmoji(score: number, relationType: RelationType): string {
  return RELATIONSHIP_SUMMARIES[relationType][score]?.emoji || '🤔'
}

/**
 * 궁합 점수를 별점 문자열로 변환
 */
export function getStarRating(score: number): string {
  return '⭐'.repeat(score)
}

/**
 * 궁합도를 백분율로 변환 (1-5 → 20-100%)
 */
export function scoreToPercentage(score: number): number {
  return score * 20
}
