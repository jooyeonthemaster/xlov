'use client'

import { motion } from 'framer-motion'
import { useMobile } from '@/hooks/use-mobile'

interface LoadingAnimationProps {
  status: 'analyzing' | 'generating' | 'saving' | 'complete' | 'error'
  memberColor: string
}

export function LoadingAnimation({ status, memberColor }: LoadingAnimationProps) {
  const { isMobile } = useMobile()

  // 모바일에서는 파티클 3개, 데스크톱에서는 6개
  const particleCount = isMobile ? 3 : 6
  const particleAngleStep = 360 / particleCount

  return (
    <div className="relative w-40 h-40 mx-auto">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: memberColor,
          borderRightColor: `${memberColor}50`,
          willChange: 'transform',
        }}
        animate={{
          rotate: status === 'complete' ? 0 : 360,
        }}
        transition={{
          duration: isMobile ? 2 : 1.5, // 모바일에서 느리게
          repeat: status === 'complete' ? 0 : Infinity,
          ease: 'linear',
        }}
      />

      {/* Middle pulsing ring - 모바일에서는 단순화 */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{
          border: `2px solid ${memberColor}30`,
        }}
        animate={{
          scale: status === 'complete' ? 1 : isMobile ? 1.05 : [1, 1.1, 1],
          opacity: status === 'complete' ? 1 : isMobile ? 0.7 : [0.5, 1, 0.5],
        }}
        transition={{
          duration: isMobile ? 2.5 : 2,
          repeat: status === 'complete' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner glow - 모바일에서 단순화 */}
      <motion.div
        className="absolute inset-8 rounded-full"
        style={{
          background: `radial-gradient(circle, ${memberColor}40 0%, transparent 70%)`,
        }}
        animate={{
          scale: status === 'complete' ? 1.2 : isMobile ? 1 : [0.8, 1.2, 0.8],
          opacity: status === 'complete' ? 0.8 : isMobile ? 0.5 : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: isMobile ? 3 : 2.5,
          repeat: status === 'complete' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {status === 'complete' ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 10 }}
          >
            <svg
              className="w-12 h-12"
              style={{ color: memberColor }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-12 h-12 text-red-400"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: memberColor }}
            animate={{
              scale: isMobile ? 1.1 : [1, 1.2, 1],
            }}
            transition={{
              duration: isMobile ? 1.5 : 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>

      {/* Floating particles - 모바일에서 개수 줄임 */}
      {status !== 'complete' && status !== 'error' && (
        <>
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: memberColor,
                left: '50%',
                top: '50%',
                willChange: 'transform, opacity',
              }}
              animate={{
                x: [0, Math.cos((i * particleAngleStep * Math.PI) / 180) * (isMobile ? 45 : 60)],
                y: [0, Math.sin((i * particleAngleStep * Math.PI) / 180) * (isMobile ? 45 : 60)],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: isMobile ? 2.5 : 2,
                repeat: Infinity,
                delay: i * (isMobile ? 0.5 : 0.3),
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
