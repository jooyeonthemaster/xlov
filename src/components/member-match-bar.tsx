'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { MEMBERS } from '@/lib/constants'

interface MemberMatchItem {
  memberId: string
  similarity: number
  reason: string
}

interface MemberMatchBarProps {
  /** Array of member matches sorted by similarity */
  matches: MemberMatchItem[]
  /** Show percentage values */
  showPercentage?: boolean
  /** Animate on mount */
  animated?: boolean
  /** Highlight the best match */
  highlightBest?: boolean
}

interface SingleBarProps {
  match: MemberMatchItem
  index: number
  isHighlighted: boolean
  showPercentage: boolean
  animated: boolean
  maxSimilarity: number
}

function SingleBar({
  match,
  index,
  isHighlighted,
  showPercentage,
  animated,
  maxSimilarity,
}: SingleBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const member = MEMBERS.find((m) => m.id === match.memberId)

  if (!member) return null

  const normalizedWidth = (match.similarity / maxSimilarity) * 100

  useEffect(() => {
    if (!animated || !barRef.current) return

    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      {
        width: `${normalizedWidth}%`,
        duration: 1,
        delay: index * 0.15,
        ease: 'power3.out',
      }
    )
  }, [animated, normalizedWidth, index])

  return (
    <motion.div
      initial={animated ? { opacity: 0, x: -20 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`group relative ${isHighlighted ? 'z-10' : ''}`}
    >
      {/* Member info row */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Member avatar */}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-transform duration-300 ${isHighlighted ? 'scale-110' : 'group-hover:scale-105'}`}
            style={{
              background: `linear-gradient(135deg, ${member.accentColor}40, ${member.accentColor}20)`,
              border: `2px solid ${member.accentColor}${isHighlighted ? '' : '60'}`,
              boxShadow: isHighlighted
                ? `0 0 20px ${member.accentColor}40`
                : undefined,
            }}
          >
            <span className="text-sm font-bold" style={{ color: member.accentColor }}>
              {member.name.charAt(0)}
            </span>
          </div>

          {/* Member name */}
          <div>
            <span
              className={`font-medium ${isHighlighted ? 'text-white' : 'text-white/80'}`}
              style={isHighlighted ? { color: member.accentColor } : undefined}
            >
              {member.name}
            </span>
            <span className="ml-2 text-xs text-white/40">{member.englishName}</span>
          </div>
        </div>

        {/* Percentage */}
        {showPercentage && (
          <motion.span
            initial={animated ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            className={`font-mono text-sm ${isHighlighted ? 'font-bold' : 'text-white/60'}`}
            style={isHighlighted ? { color: member.accentColor } : undefined}
          >
            {match.similarity.toFixed(1)}%
          </motion.span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative h-3 overflow-hidden rounded-full bg-white/5">
        {/* Animated fill */}
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 rounded-full transition-shadow duration-300"
          style={{
            width: animated ? '0%' : `${normalizedWidth}%`,
            background: `linear-gradient(90deg, ${member.accentColor}80, ${member.accentColor})`,
            boxShadow: isHighlighted
              ? `0 0 15px ${member.accentColor}60, inset 0 0 10px rgba(255,255,255,0.2)`
              : `inset 0 0 10px rgba(255,255,255,0.1)`,
          }}
        />

        {/* Shimmer effect for highlighted */}
        {isHighlighted && (
          <motion.div
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '500%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      {/* Match reason */}
      {match.reason && isHighlighted && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-2 text-xs text-white/50"
        >
          {match.reason}
        </motion.p>
      )}
    </motion.div>
  )
}

export function MemberMatchBar({
  matches,
  showPercentage = true,
  animated = true,
  highlightBest = true,
}: MemberMatchBarProps) {
  const maxSimilarity = Math.max(...matches.map((m) => m.similarity))

  // Sort by similarity descending
  const sortedMatches = [...matches].sort(
    (a, b) => b.similarity - a.similarity
  )

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <motion.div
        initial={animated ? { opacity: 0, y: -10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <h4 className="text-sm font-medium text-white/70">멤버 유사도</h4>
        {highlightBest && sortedMatches[0] && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs"
          >
            <span className="text-white/50">Best Match</span>
            <span
              className="font-medium"
              style={{
                color:
                  MEMBERS.find((m) => m.id === sortedMatches[0].memberId)
                    ?.accentColor || 'white',
              }}
            >
              {MEMBERS.find((m) => m.id === sortedMatches[0].memberId)?.name}
            </span>
          </motion.span>
        )}
      </motion.div>

      {/* Match bars */}
      <div className="space-y-4">
        {sortedMatches.map((match, index) => (
          <SingleBar
            key={match.memberId}
            match={match}
            index={index}
            isHighlighted={highlightBest && index === 0}
            showPercentage={showPercentage}
            animated={animated}
            maxSimilarity={maxSimilarity}
          />
        ))}
      </div>
    </div>
  )
}

// Compact version for smaller spaces
export function MemberMatchCompact({
  matches,
  animated = true,
}: {
  matches: MemberMatchItem[]
  animated?: boolean
}) {
  const sortedMatches = [...matches].sort(
    (a, b) => b.similarity - a.similarity
  )
  const topMatch = sortedMatches[0]
  const member = MEMBERS.find((m) => m.id === topMatch?.memberId)

  if (!member || !topMatch) return null

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9 } : false}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
    >
      {/* Member mini avatar */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: `linear-gradient(135deg, ${member.accentColor}40, ${member.accentColor}20)`,
          border: `2px solid ${member.accentColor}`,
        }}
      >
        <span className="font-bold" style={{ color: member.accentColor }}>
          {member.name.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{member.name}</span>
          <span className="text-xs text-white/40">{member.englishName}</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={animated ? { width: 0 } : false}
              animate={{ width: `${topMatch.similarity}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ backgroundColor: member.accentColor }}
            />
          </div>
          <span
            className="font-mono text-xs"
            style={{ color: member.accentColor }}
          >
            {topMatch.similarity.toFixed(0)}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
