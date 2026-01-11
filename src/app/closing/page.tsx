'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useExperienceStore } from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { Heart, RotateCcw, Share2, ExternalLink } from 'lucide-react'

export default function ClosingPage() {
  const router = useRouter()
  const [totalParticipants, setTotalParticipants] = useState(0)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  useEffect(() => {
    fetchStats()
    const timer = setTimeout(() => setIsAnimationComplete(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) {
        const data = await response.json()
        setTotalParticipants(data.totalParticipants || 0)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleTryAgain = () => {
    router.push('/')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'XLOV Experience',
          text: '나만의 XLOV를 만들어보세요! XLOV + EVOL = LOVE',
          url: window.location.origin,
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {MEMBERS.map((member, i) => (
          <motion.div
            key={member.id}
            className="absolute w-64 h-64 rounded-full blur-[100px]"
            style={{
              backgroundColor: member.accentColor,
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-12">
        {/* Heart animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart
              className="w-20 h-20 mx-auto"
              style={{
                fill: 'url(#heartGradient)',
                stroke: 'none',
              }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--member-umuti)" />
                  <stop offset="33%" stopColor="var(--member-rui)" />
                  <stop offset="66%" stopColor="var(--member-hyun)" />
                  <stop offset="100%" stopColor="var(--member-haru)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="font-korean text-4xl md:text-5xl font-medium leading-tight">
            당신의 시선이
            <br />
            <span className="text-gradient bg-gradient-to-r from-[var(--member-umuti)] via-[var(--member-rui)] via-[var(--member-hyun)] to-[var(--member-haru)] bg-clip-text text-transparent">
              XLOV를 완성합니다
            </span>
          </h1>

          <p className="text-[var(--text-secondary)] text-lg">
            XLOV + EVOL = LOVE
          </p>
        </motion.div>

        {/* Stats */}
        {totalParticipants > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="py-6 px-8 rounded-2xl bg-[var(--background-secondary)]/50 backdrop-blur-sm"
          >
            <div className="text-4xl md:text-5xl font-display font-bold text-gradient bg-gradient-to-r from-[var(--member-umuti)] to-[var(--member-haru)] bg-clip-text text-transparent mb-2">
              {totalParticipants.toLocaleString()}
            </div>
            <p className="text-[var(--text-muted)]">
              명의 팬이 XLOV의 세계를 함께 만들었습니다
            </p>
          </motion.div>
        )}

        {/* Thank you message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimationComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="text-[var(--text-secondary)]"
        >
          체험해주셔서 감사합니다.
          <br />
          당신의 상상력이 XLOV를 더욱 특별하게 만듭니다.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
        >
          <Button variant="secondary" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            친구에게 공유하기
          </Button>

          <Button
            variant="primary"
            onClick={handleTryAgain}
            className="gap-2 bg-gradient-to-r from-[var(--member-umuti)] to-[var(--member-haru)]"
          >
            <RotateCcw className="w-4 h-4" />
            다시 체험하기
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-12 text-[var(--text-muted)] text-sm"
        >
          <p>© 2025 XLOV Experience</p>
          <p className="mt-2">
            Made with{' '}
            <Heart className="w-3 h-3 inline-block text-red-400" fill="currentColor" />{' '}
            for EVOL
          </p>
        </motion.div>
      </div>
    </div>
  )
}
