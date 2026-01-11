'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import type { ProgramInfo } from '@/types/api'

interface ProgramCardProps {
  program: ProgramInfo
  index: number
}

export function ProgramCard({ program, index }: ProgramCardProps) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Move glow effect to cursor position
    gsap.to(glowRef.current, {
      x: x - 150,
      y: y - 150,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseEnter = () => {
    if (!glowRef.current) return
    gsap.to(glowRef.current, {
      opacity: 0.4,
      scale: 1.2,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!glowRef.current) return
    gsap.to(glowRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleClick = () => {
    router.push(program.route)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 0.2 + index * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative cursor-pointer perspective-1000"
    >
      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl"
        style={{
          boxShadow: `0 0 60px -15px ${program.accentColor}20`,
        }}
      >
        {/* Animated glow effect following cursor */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[300px] w-[300px] rounded-full opacity-0"
          style={{
            background: `radial-gradient(circle, ${program.accentColor}40 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${program.accentColor}, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10">
          {/* Icon with animated ring */}
          <div className="relative mb-6 inline-block">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${program.accentColor}30, transparent)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{
                background: `linear-gradient(135deg, ${program.accentColor}20, ${program.accentColor}05)`,
                border: `1px solid ${program.accentColor}30`,
              }}
            >
              {program.icon}
            </div>
          </div>

          {/* Program name */}
          <div className="mb-3">
            <h3
              className="font-display text-2xl font-bold tracking-tight transition-colors duration-300 md:text-3xl"
              style={{ color: program.accentColor }}
            >
              {program.name}
            </h3>
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">
              {program.nameEn}
            </span>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
            {program.description}
          </p>

          {/* CTA Arrow */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm text-white/40 transition-colors duration-300 group-hover:text-white/60">
              체험하기
            </span>
            <motion.span
              className="text-lg"
              style={{ color: program.accentColor }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to top, ${program.accentColor}10, transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}
