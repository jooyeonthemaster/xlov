'use client'

import { useMobile } from '@/hooks/use-mobile'

interface BackgroundEffectsProps {
  memberColor?: string
  variant?: 'default' | 'subtle' | 'intense'
}

export function BackgroundEffects({
  memberColor,
  variant = 'default',
}: BackgroundEffectsProps) {
  const { isMobile } = useMobile()

  // 모바일에서는 배경 효과 완전히 비활성화
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* 모바일: 단순 그라디언트 배경만 */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${memberColor || 'var(--member-umuti)'}15 0%, transparent 50%)`,
          }}
        />
      </div>
    )
  }

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

      {/* Animated orbs - CSS animation (데스크톱만) */}
      <div
        className="absolute rounded-full animate-float-1"
        style={{
          width: '600px',
          height: '600px',
          filter: 'blur(128px)',
          background: memberColor || 'var(--member-umuti)',
          opacity,
          top: '10%',
          left: '10%',
          willChange: 'transform',
        }}
      />

      <div
        className="absolute rounded-full animate-float-2"
        style={{
          width: '500px',
          height: '500px',
          filter: 'blur(100px)',
          background: 'var(--member-rui)',
          opacity: opacity * 0.8,
          bottom: '10%',
          right: '10%',
          willChange: 'transform',
        }}
      />

      <div
        className="absolute rounded-full animate-float-3"
        style={{
          width: '400px',
          height: '400px',
          filter: 'blur(80px)',
          background: 'var(--member-hyun)',
          opacity: opacity * 0.6,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
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
