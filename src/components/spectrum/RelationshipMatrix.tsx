'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ARCHETYPE_RELATIONSHIPS,
  ARCHETYPE_NAMES,
  RELATIONSHIP_SUMMARIES,
  getRelationshipScore,
  getScoreEmoji,
  type ArchetypeKey,
  type RelationType,
} from '@/lib/constants/archetype-relationships'

interface RelationshipMatrixProps {
  userArchetype: string
  color?: string
}

export function RelationshipMatrix({
  userArchetype,
  color = '#9B6DFF',
}: RelationshipMatrixProps) {
  const [selectedRelation, setSelectedRelation] =
    useState<RelationType>('friends')
  const [hoveredCell, setHoveredCell] = useState<{
    archetype: ArchetypeKey
    relation: RelationType
  } | null>(null)

  // Convert user archetype name to key
  const getUserArchetypeKey = (): ArchetypeKey => {
    const nameToKey: Record<string, ArchetypeKey> = {
      '고요한 안개': 'quiet_mist',
      '따스한 안개': 'warm_mist',
      '빛나는 용암': 'blazing_lava',
      '고요한 얼음': 'quiet_ice',
      '반짝이는 파도': 'sparkling_wave',
      '조화로운 무지개': 'balanced_rainbow',
      '신비로운 오로라': 'default',
    }
    return nameToKey[userArchetype] || 'default'
  }

  const userKey = getUserArchetypeKey()
  const archetypeKeys: ArchetypeKey[] = [
    'quiet_mist',
    'warm_mist',
    'blazing_lava',
    'quiet_ice',
    'sparkling_wave',
    'balanced_rainbow',
    'default',
  ]

  const relationTypes: { key: RelationType; label: string; icon: string }[] = [
    { key: 'friends', label: '친구', icon: '👥' },
    { key: 'lovers', label: '연인', icon: '💕' },
    { key: 'colleagues', label: '동료', icon: '💼' },
  ]

  const getScoreColor = (score: number): string => {
    const colors = {
      5: '#10B981', // green-500
      4: '#84CC16', // lime-500
      3: '#EAB308', // yellow-500
      2: '#F97316', // orange-500
      1: '#EF4444', // red-500
    }
    return colors[score as keyof typeof colors] || '#6B7280'
  }

  return (
    <div className="space-y-6">
      {/* Relation Type Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {relationTypes.map(({ key, label, icon }) => (
          <motion.button
            key={key}
            onClick={() => setSelectedRelation(key)}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all ${
              selectedRelation === key
                ? 'text-white shadow-lg'
                : 'border border-white/20 bg-white/5 text-white/60 hover:bg-white/10'
            }`}
            style={{
              backgroundColor:
                selectedRelation === key ? color : undefined,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">{icon}</span>
            <span>{label} 궁합</span>
          </motion.button>
        ))}
      </div>

      {/* Matrix Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold text-white">
              {ARCHETYPE_NAMES[userKey]} ×{' '}
              {relationTypes.find((r) => r.key === selectedRelation)?.label}{' '}
              궁합표
            </h3>
            <p className="mt-1 text-sm text-white/60">
              각 아키타입과의 궁합을 확인해보세요
            </p>
          </div>

          {/* Grid */}
          <div className="space-y-3">
            {archetypeKeys.map((archetype, index) => {
              const score = getRelationshipScore(
                userKey,
                archetype,
                selectedRelation
              )
              const isUser = archetype === userKey
              const emoji = getScoreEmoji(score, selectedRelation)
              const summary = RELATIONSHIP_SUMMARIES[selectedRelation][score]

              return (
                <motion.div
                  key={archetype}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onHoverStart={() =>
                    setHoveredCell({ archetype, relation: selectedRelation })
                  }
                  onHoverEnd={() => setHoveredCell(null)}
                  className={`group relative overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 ${
                    isUser
                      ? 'border-white/30 bg-white/15'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {/* Archetype Name */}
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{emoji}</div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {ARCHETYPE_NAMES[archetype]}
                          {isUser && (
                            <span
                              className="ml-2 rounded-full px-2 py-0.5 text-xs"
                              style={{
                                backgroundColor: `${color}40`,
                                color: color,
                              }}
                            >
                              나
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-white/60">{summary.title}</p>
                      </div>
                    </div>

                    {/* Score Stars */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              duration: 0.2,
                              delay: index * 0.05 + i * 0.05,
                            }}
                            className="text-lg"
                            style={{
                              color:
                                i < score
                                  ? getScoreColor(score)
                                  : 'rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            ⭐
                          </motion.div>
                        ))}
                      </div>
                      <div
                        className="rounded-full px-3 py-1 text-sm font-bold"
                        style={{
                          backgroundColor: `${getScoreColor(score)}20`,
                          color: getScoreColor(score),
                        }}
                      >
                        {score}/5
                      </div>
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredCell?.archetype === archetype && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-0 bottom-full z-10 mb-2 rounded-lg border border-white/20 bg-black/90 p-3 text-sm text-white shadow-xl backdrop-blur-md"
                    >
                      {summary.description}
                    </motion.div>
                  )}

                  {/* Progress Bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-full"
                    style={{ backgroundColor: getScoreColor(score) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / 5) * 100}%` }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: '#10B981' }}
          />
          <span>5점: 완벽한 궁합</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: '#84CC16' }}
          />
          <span>4점: 좋은 궁합</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: '#EAB308' }}
          />
          <span>3점: 보통</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: '#F97316' }}
          />
          <span>2점: 조심스러움</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: '#EF4444' }}
          />
          <span>1점: 어려움</span>
        </div>
      </div>
    </div>
  )
}
