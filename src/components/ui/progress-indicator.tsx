'use client'

import { motion } from 'framer-motion'

interface ProgressIndicatorProps {
  current: number
  total: number
  memberColor?: string
}

export function ProgressIndicator({
  current,
  total,
  memberColor = 'var(--member-umuti)',
}: ProgressIndicatorProps) {
  const progress = (current / total) * 100

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step counter */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-[var(--text-muted)]">
          질문 {current} / {total}
        </span>
        <span className="text-sm" style={{ color: memberColor }}>
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar background */}
      <div className="h-1 bg-[var(--background-tertiary)] rounded-full overflow-hidden">
        {/* Animated progress bar */}
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: memberColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                i < current
                  ? memberColor
                  : i === current - 1
                    ? memberColor
                    : 'var(--background-tertiary)',
            }}
            initial={{ scale: 0.8 }}
            animate={{
              scale: i === current - 1 ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
