'use client'

import { motion } from 'framer-motion'

interface FanReactionProps {
  reaction: string
  avatar?: string
  username?: string
  delay?: number
}

export function FanReaction({
  reaction,
  avatar,
  username = 'XLOV 팬',
  delay = 0,
}: FanReactionProps) {
  // Generate random avatar color if not provided
  const avatarColors = [
    '#9B6DFF',
    '#FF6B9D',
    '#4ECDC4',
    '#FFE066',
    '#FF8C42',
    '#A8E6CF',
  ]
  const randomColor =
    avatarColors[Math.floor(Math.random() * avatarColors.length)]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors duration-300"
    >
      {/* Avatar */}
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white shadow-md"
        style={{ backgroundColor: avatar || randomColor }}
      >
        {username.charAt(0).toUpperCase()}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-medium text-white/90">{username}</span>
          <span className="text-xs text-white/40">방금 전</span>
        </div>
        <p className="text-sm leading-relaxed text-white/80">{reaction}</p>

        {/* Interaction Buttons (Decorative) */}
        <div className="mt-2 flex gap-4 text-xs text-white/40">
          <button className="transition-colors hover:text-red-400">
            ❤️ {Math.floor(Math.random() * 50 + 10)}
          </button>
          <button className="transition-colors hover:text-blue-400">
            💬 {Math.floor(Math.random() * 20 + 5)}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
