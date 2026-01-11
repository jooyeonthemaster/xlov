'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'

export default function IntroPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimationComplete(true),
      })

      // Initial state
      gsap.set('.letter', { opacity: 0, y: 100, rotateX: -90 })
      gsap.set('.subtitle-word', { opacity: 0, y: 30 })
      gsap.set('.cta-button', { opacity: 0, scale: 0.8 })

      // XLOV title animation - letter by letter
      tl.to('.letter', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      })

      // Subtitle animation - word by word
      tl.to(
        '.subtitle-word',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      )

      // CTA button animation
      tl.to(
        '.cta-button',
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      )

      // Ambient glow animation on title
      tl.to('.title-glow', {
        opacity: 0.6,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleStart = () => {
    router.push('/hub')
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--member-umuti)]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--member-rui)]/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--member-hyun)]/5 blur-[150px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-12 max-w-4xl">
        {/* Equation: XLOV + EVOL = LOVE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm tracking-[0.5em] text-[var(--text-muted)] uppercase mb-8"
        >
          XLOV + EVOL = LOVE
        </motion.div>

        {/* Main title: XLOV */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(5rem,20vw,12rem)] font-bold tracking-tight leading-none relative"
        >
          <span className="relative inline-block">
            {/* Glow effect behind text */}
            <span className="title-glow absolute inset-0 blur-2xl opacity-0 text-gradient bg-clip-text">
              XLOV
            </span>
            {/* Individual letters */}
            <span className="letter inline-block" style={{ color: 'var(--member-umuti)' }}>X</span>
            <span className="letter inline-block" style={{ color: 'var(--member-rui)' }}>L</span>
            <span className="letter inline-block" style={{ color: 'var(--member-hyun)' }}>O</span>
            <span className="letter inline-block" style={{ color: 'var(--member-haru)' }}>V</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
          <span className="subtitle-word inline-block mx-1">XLOV는</span>
          <span className="subtitle-word inline-block mx-1">아직</span>
          <span className="subtitle-word inline-block mx-1">완성되지</span>
          <span className="subtitle-word inline-block mx-1">않았습니다.</span>
          <br className="hidden sm:block" />
          <span className="subtitle-word inline-block mx-1 mt-2">당신이</span>
          <span className="subtitle-word inline-block mx-1">완성해주세요.</span>
        </p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimationComplete ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[var(--text-muted)] text-base md:text-lg max-w-md mx-auto"
        >
          당신의 시선으로 XLOV 멤버의 새로운 면을 발견해보세요.
          <br />
          팬덤의 상상력이 아이돌의 정체성을 완성합니다.
        </motion.p>

        {/* CTA Button */}
        <div className="cta-button pt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStart}
            className="group relative overflow-hidden px-12 py-6 text-lg font-medium"
          >
            <span className="relative z-10 flex items-center gap-3">
              체험 시작하기
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            {/* Button glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--member-umuti)] via-[var(--member-rui)] to-[var(--member-hyun)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </Button>
        </div>

        {/* Scroll indicator */}
        {isAnimationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[var(--text-muted)] text-sm flex flex-col items-center gap-2"
            >
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
