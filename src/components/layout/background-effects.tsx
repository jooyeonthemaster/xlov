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

  const opacityMap = {
    default: 0.15,
    subtle: 0.08,
    intense: 0.25,
  }

  const opacity = opacityMap[variant]

  // 모바일에서는 blur와 크기를 대폭 줄임
  const mobileConfig = {
    sizes: ['200px', '150px', '120px'],
    blurs: ['40px', '30px', '25px'],
    duration: '30s', // CSS animation duration
  }

  const desktopConfig = {
    sizes: ['600px', '500px', '400px'],
    blurs: ['128px', '100px', '80px'],
    duration: '20s',
  }

  const config = isMobile ? mobileConfig : desktopConfig

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main gradient mesh */}
      <div className="gradient-mesh absolute inset-0" />

      {/* Animated orbs - CSS animation으로 변경 (더 성능 좋음) */}
      <div
        className="absolute rounded-full animate-float-1"
        style={{
          width: config.sizes[0],
          height: config.sizes[0],
          filter: `blur(${config.blurs[0]})`,
          background: memberColor || 'var(--member-umuti)',
          opacity,
          top: '10%',
          left: '10%',
          willChange: 'transform',
          animationDuration: config.duration,
        }}
      />

      <div
        className="absolute rounded-full animate-float-2"
        style={{
          width: config.sizes[1],
          height: config.sizes[1],
          filter: `blur(${config.blurs[1]})`,
          background: 'var(--member-rui)',
          opacity: opacity * 0.8,
          bottom: '10%',
          right: '10%',
          willChange: 'transform',
          animationDuration: `calc(${config.duration} * 1.25)`,
        }}
      />

      {/* 모바일에서는 세 번째 orb 제거 */}
      {!isMobile && (
        <div
          className="absolute rounded-full animate-float-3"
          style={{
            width: config.sizes[2],
            height: config.sizes[2],
            filter: `blur(${config.blurs[2]})`,
            background: 'var(--member-hyun)',
            opacity: opacity * 0.6,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
            animationDuration: `calc(${config.duration} * 1.5)`,
          }}
        />
      )}

      {/* Subtle grid pattern - 모바일에서 제거 */}
      {!isMobile && (
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
      )}
    </div>
  )
}
