'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type {
  StrengthItem,
  WeaknessItem,
} from '@/lib/constants/archetype-content'

interface StrengthBadgeProps {
  strengths: StrengthItem[]
  weaknesses: WeaknessItem[]
}

export function StrengthBadge({ strengths, weaknesses }: StrengthBadgeProps) {
  const [hoveredStrength, setHoveredStrength] = useState<number | null>(null)
  const [hoveredWeakness, setHoveredWeakness] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Strengths Section */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">💪 강점</h3>
          <span className="text-sm text-white/60">당신의 빛나는 부분!</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onHoverStart={() => setHoveredStrength(index)}
              onHoverEnd={() => setHoveredStrength(null)}
              className="group relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 hover:from-green-500/20 hover:to-emerald-500/10"
            >
              <div className="relative z-10">
                <div className="mb-2 text-3xl">{strength.icon}</div>
                <h4 className="mb-2 font-semibold text-white">
                  {strength.title}
                </h4>
                <p
                  className={`text-sm text-white/70 transition-all duration-300 ${
                    hoveredStrength === index ? 'opacity-100' : 'opacity-80'
                  }`}
                >
                  {strength.description}
                </p>
              </div>

              {/* Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-400/0 transition-all duration-300 ${
                  hoveredStrength === index
                    ? 'from-green-400/10 to-emerald-400/10'
                    : ''
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weaknesses Section */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">
            💡 성장 포인트
          </h3>
          <span className="text-sm text-white/60">
            이렇게 보완하면 좋아요!
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {weaknesses.map((weakness, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              onHoverStart={() => setHoveredWeakness(index)}
              onHoverEnd={() => setHoveredWeakness(null)}
              className="group relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:from-amber-500/20 hover:to-orange-500/10"
            >
              <div className="relative z-10">
                <div className="mb-2 text-3xl">{weakness.icon}</div>
                <h4 className="mb-2 font-semibold text-white">
                  {weakness.title}
                </h4>
                <div
                  className={`rounded-lg border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200 transition-all duration-300 ${
                    hoveredWeakness === index
                      ? 'border-amber-400/40 bg-amber-500/20'
                      : ''
                  }`}
                >
                  <span className="font-medium">TIP:</span> {weakness.tip}
                </div>
              </div>

              {/* Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-amber-400/0 to-orange-400/0 transition-all duration-300 ${
                  hoveredWeakness === index
                    ? 'from-amber-400/10 to-orange-400/10'
                    : ''
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
