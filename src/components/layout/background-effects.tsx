'use client'

import { motion } from 'framer-motion'

interface BackgroundEffectsProps {
  memberColor?: string
  variant?: 'default' | 'subtle' | 'intense'
}

export function BackgroundEffects({
  memberColor,
  variant = 'default',
}: BackgroundEffectsProps) {
  const opacityMap = {
    default: 0.15,
    subtle: 0.08,
    intense: 0.25,
  }

  const opacity = opacityMap[variant]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main gradient mesh */}
      <div className="gradient-mesh absolute inset-0" />

      {/* Animated orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[128px]"
        style={{
          background: memberColor || 'var(--member-umuti)',
          opacity,
        }}
        animate={{
          x: ['-25%', '25%', '-25%'],
          y: ['-25%', '25%', '-25%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        initial={{ top: '10%', left: '10%' }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: 'var(--member-rui)',
          opacity: opacity * 0.8,
        }}
        animate={{
          x: ['25%', '-25%', '25%'],
          y: ['25%', '-25%', '25%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        initial={{ bottom: '10%', right: '10%' }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{
          background: 'var(--member-hyun)',
          opacity: opacity * 0.6,
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['20%', '-20%', '20%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        initial={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-muted) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}
