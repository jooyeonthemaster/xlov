'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ProgramCard } from '@/components/program-card'
import { PROGRAMS } from '@/lib/constants'
import { useMobile } from '@/hooks/use-mobile'

export default function HubPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobile()

  useEffect(() => {
    // 모바일에서는 GSAP 애니메이션 완전히 비활성화
    if (isMobile) return

    const ctx = gsap.context(() => {
      gsap.to('.particle', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-6 py-16 md:py-24"
    >
      {/* Background gradient orbs - 모바일에서 완전히 제거 */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="particle absolute top-[10%] left-[15%] h-[400px] w-[400px] rounded-full bg-[var(--member-umuti)]/10 blur-[120px]" />
          <div className="particle absolute top-[60%] right-[10%] h-[350px] w-[350px] rounded-full bg-[var(--member-rui)]/10 blur-[100px]" />
          <div className="particle absolute bottom-[20%] left-[40%] h-[300px] w-[300px] rounded-full bg-[var(--member-hyun)]/8 blur-[110px]" />
          <div className="particle absolute top-[40%] right-[30%] h-[250px] w-[250px] rounded-full bg-[var(--member-haru)]/8 blur-[90px]" />

          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header - 모바일에서는 애니메이션 없이 */}
        {isMobile ? (
          <header className="mb-16 text-center md:mb-20">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <span className="text-xs tracking-[0.4em] text-white/50 uppercase">
                XLOV + EVOL = LOVE
              </span>
            </div>

            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient">Experience</span>
              <span className="text-white/90"> XLOV</span>
            </h1>

            <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
              당신만의 방식으로 XLOV를 경험하세요.
              <br className="hidden sm:block" />
              각 프로그램은 <span className="text-white/70">당신만의 향</span>으로 완성됩니다.
            </p>
          </header>
        ) : (
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-sm"
            >
              <span className="text-xs tracking-[0.4em] text-white/50 uppercase">
                XLOV + EVOL = LOVE
              </span>
            </motion.div>

            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient">Experience</span>
              <span className="text-white/90"> XLOV</span>
            </h1>

            <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
              당신만의 방식으로 XLOV를 경험하세요.
              <br className="hidden sm:block" />
              각 프로그램은 <span className="text-white/70">당신만의 향</span>으로 완성됩니다.
            </p>
          </motion.header>
        )}

        {/* Program cards grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {PROGRAMS.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        {/* Footer note - 모바일에서는 애니메이션 없이 */}
        {isMobile ? (
          <footer className="mt-16 text-center md:mt-20">
            <div className="inline-flex items-center gap-4 text-sm text-white/30">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
              <span>팬덤의 상상력이 아이돌의 정체성을 완성합니다</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </footer>
        ) : (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 text-center md:mt-20"
          >
            <div className="inline-flex items-center gap-4 text-sm text-white/30">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
              <span>팬덤의 상상력이 아이돌의 정체성을 완성합니다</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </motion.footer>
        )}
      </div>

      {/* Decorative corner elements - 모바일에서 제거 */}
      {!isMobile && (
        <>
          <div className="pointer-events-none absolute top-0 left-0 h-32 w-32 border-t border-l border-white/5" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 border-b border-r border-white/5" />
        </>
      )}
    </div>
  )
}
