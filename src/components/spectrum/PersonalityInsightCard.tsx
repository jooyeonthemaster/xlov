'use client'

import { motion } from 'framer-motion'
import type { SpectrumAxis } from '@/types/spectrum'
import type { AxisLevelInsight } from '@/lib/constants/personality-insights'

interface PersonalityInsightCardProps {
  axis: SpectrumAxis
  insight: AxisLevelInsight
  delay?: number
}

export function PersonalityInsightCard({
  axis,
  insight,
  delay = 0,
}: PersonalityInsightCardProps) {
  // Determine gradient color based on axis ID
  const axisColors: Record<string, { from: string; to: string }> = {
    light: { from: '#FFE066', to: '#FFA500' }, // Yellow to Orange
    temperature: { from: '#FF6B9D', to: '#C239B3' }, // Pink to Purple
    texture: { from: '#4ECDC4', to: '#44A08D' }, // Cyan to Teal
    time: { from: '#A8E6CF', to: '#56AB91' }, // Light green to Deep green
  }

  const colors = axisColors[axis.id] || { from: '#9B6DFF', to: '#7B4FE8' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
    >
      {/* Gradient Header */}
      <div
        className="mb-6 rounded-xl p-4"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-medium text-white/80">
              {axis.label}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{insight.emoji}</span>
              <span className="text-xl font-bold text-white">
                {insight.title}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white/90">
              {axis.value}
            </div>
            <div className="text-xs text-white/60">/ 100</div>
          </div>
        </div>

        {/* Axis Range Indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-white/70">
          <span>
            {axis.leftIcon} {axis.leftLabel}
          </span>
          <span>
            {axis.rightLabel} {axis.rightIcon}
          </span>
        </div>
      </div>

      {/* Traits Section */}
      <div className="mb-6">
        <h4 className="mb-3 text-sm font-medium text-white/80">주요 특징</h4>
        <div className="flex flex-wrap gap-2">
          {insight.traits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.1 + index * 0.05 }}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/90"
            >
              {trait}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Behaviors Section */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-white/80">
          이런 모습이에요
        </h4>
        <ul className="space-y-2">
          {insight.behaviors.map((behavior, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: delay + 0.2 + index * 0.05,
              }}
              className="flex items-start gap-2 text-sm text-white/80"
            >
              <span className="mt-0.5 text-green-400">✓</span>
              <span>{behavior}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.from}, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}
