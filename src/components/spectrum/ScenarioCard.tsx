'use client'

import { motion } from 'framer-motion'

interface ScenarioCardProps {
  title: string
  icon: string
  description: string
  delay?: number
  accentColor?: string
}

export function ScenarioCard({
  title,
  icon,
  description,
  delay = 0,
  accentColor = '#9B6DFF',
}: ScenarioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
    >
      {/* Icon Header */}
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          style={{
            background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
            border: `1px solid ${accentColor}30`,
          }}
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      {/* Description */}
      <div className="relative">
        <p className="leading-relaxed text-white/80">{description}</p>

        {/* Decorative Quote Mark */}
        <div
          className="absolute -left-2 -top-2 text-6xl opacity-10"
          style={{ color: accentColor }}
        >
          "
        </div>
      </div>

      {/* Gradient Glow on Hover */}
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)`,
        }}
      />

      {/* Bottom Border Accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: accentColor }}
      />
    </motion.div>
  )
}
