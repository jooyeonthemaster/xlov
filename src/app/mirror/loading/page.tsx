'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  useExperienceStore,
  useMirrorMember,
  useMirrorSelfie,
  useMirrorIntensity,
} from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { MIRROR_COLOR, STYLE_INTENSITIES } from '@/lib/constants/mirror-styles'
import { Button } from '@/components/ui/button'
import { RefreshCw, Sparkles } from 'lucide-react'

type LoadingPhase = 'analyzing' | 'styling' | 'scent' | 'complete' | 'error'

const phaseMessages: Record<LoadingPhase, string> = {
  analyzing: '이미지를 분석하고 있습니다...',
  styling: '멤버 스타일을 적용하고 있습니다...',
  scent: '어울리는 향을 조합하고 있습니다...',
  complete: '변신 완료!',
  error: '오류가 발생했습니다.',
}

export default function MirrorLoadingPage() {
  const router = useRouter()
  const memberId = useMirrorMember()
  const selfieUrl = useMirrorSelfie()
  const intensity = useMirrorIntensity()
  const { setMirrorResult, setMirrorScent, setIsGenerating, setError } =
    useExperienceStore()

  const [phase, setPhase] = useState<LoadingPhase>('analyzing')
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const hasStartedRef = useRef(false)

  const member = MEMBERS.find((m) => m.id === memberId)
  const intensityInfo = STYLE_INTENSITIES.find((i) => i.id === intensity)

  useEffect(() => {
    if (!member || !selfieUrl) {
      router.push('/mirror/select')
      return
    }

    if (hasStartedRef.current) return
    hasStartedRef.current = true

    generateTransformation()
  }, [])

  const generateTransformation = async () => {
    setIsGenerating(true)
    setPhase('analyzing')
    setProgress(0)

    // Phase progression simulation
    const phaseTimings = [
      { phase: 'analyzing' as LoadingPhase, duration: 2000, endProgress: 30 },
      { phase: 'styling' as LoadingPhase, duration: 3000, endProgress: 70 },
      { phase: 'scent' as LoadingPhase, duration: 2000, endProgress: 90 },
    ]

    let currentPhaseIndex = 0

    const updatePhase = () => {
      if (currentPhaseIndex < phaseTimings.length) {
        const { phase, endProgress } = phaseTimings[currentPhaseIndex]
        setPhase(phase)

        // Animate progress to end value
        const startProgress = currentPhaseIndex === 0 ? 0 : phaseTimings[currentPhaseIndex - 1].endProgress
        const duration = phaseTimings[currentPhaseIndex].duration
        const steps = 20
        const increment = (endProgress - startProgress) / steps
        const stepDuration = duration / steps

        let step = 0
        const progressInterval = setInterval(() => {
          step++
          setProgress(startProgress + increment * step)
          if (step >= steps) {
            clearInterval(progressInterval)
            currentPhaseIndex++
            if (currentPhaseIndex < phaseTimings.length) {
              updatePhase()
            }
          }
        }, stepDuration)
      }
    }

    updatePhase()

    try {
      // Extract base64 from data URL
      const base64Match = selfieUrl?.match(/^data:([^;]+);base64,(.+)$/)
      if (!base64Match) {
        throw new Error('Invalid selfie image format')
      }

      const [, mimeType, base64Data] = base64Match

      const response = await fetch('/api/mirror/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId,
          selfieBase64: base64Data,
          selfieMimeType: mimeType,
          intensity,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to transform image')
      }

      const data = await response.json()

      setProgress(100)
      setPhase('complete')
      setMirrorResult(data.result)
      setMirrorScent(data.scent)

      // Navigate to result page
      setTimeout(() => {
        router.push('/mirror/result')
      }, 1500)
    } catch (err) {
      setPhase('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRetry = () => {
    hasStartedRef.current = false
    setErrorMessage(null)
    generateTransformation()
  }

  if (!member || !selfieUrl) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-lg space-y-8 text-center">
        {/* Transformation Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto h-64 w-64"
        >
          {/* Before/After overlay effect */}
          <div className="relative h-full w-full overflow-hidden rounded-full">
            {/* Selfie */}
            <Image
              src={selfieUrl}
              alt="Your selfie"
              fill
              className="object-cover"
            />

            {/* Member style overlay */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{
                clipPath:
                  phase === 'complete'
                    ? 'inset(0 0 0 0)'
                    : `inset(${100 - progress}% 0 0 0)`,
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={member.placeholderImage}
                alt={member.name}
                fill
                className="object-cover opacity-40"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${member.accentColor}40 0%, transparent 100%)`,
                }}
              />
            </motion.div>

            {/* Animated border */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke={member.accentColor}
                strokeWidth="1"
                strokeDasharray={`${progress * 3.08} 308`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Sparkle effects */}
          {phase !== 'error' && (
            <>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-2 -top-2"
              >
                <Sparkles
                  className="h-6 w-6"
                  style={{ color: member.accentColor }}
                />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-2 -left-2"
              >
                <Sparkles
                  className="h-5 w-5"
                  style={{ color: MIRROR_COLOR }}
                />
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Status Message */}
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="font-korean text-2xl font-medium md:text-3xl">
            {phase === 'complete' ? (
              <>
                <span style={{ color: member.accentColor }}>{member.name}</span>
                으로 변신 완료!
              </>
            ) : phase === 'error' ? (
              '변신 중 문제가 발생했어요'
            ) : (
              <>
                <span style={{ color: member.accentColor }}>{member.name}</span>
                의 스타일을
                <br />
                입히는 중
              </>
            )}
          </h2>

          <p className="text-[var(--text-secondary)]">{phaseMessages[phase]}</p>

          {/* Intensity indicator */}
          {phase !== 'error' && phase !== 'complete' && (
            <p className="text-sm text-white/50">
              스타일 강도: {intensityInfo?.label}
            </p>
          )}

          {errorMessage && (
            <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
          )}
        </motion.div>

        {/* Progress Bar */}
        {phase !== 'error' && phase !== 'complete' && (
          <div className="mx-auto w-full max-w-xs">
            <div className="h-1 overflow-hidden rounded-full bg-[var(--background-secondary)]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: MIRROR_COLOR }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* Retry Button */}
        {phase === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="primary"
              onClick={handleRetry}
              className="gap-2"
              style={{ backgroundColor: MIRROR_COLOR }}
            >
              <RefreshCw className="h-4 w-4" />
              다시 시도하기
            </Button>
          </motion.div>
        )}

        {/* Phase indicators */}
        {phase !== 'error' && phase !== 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-2"
          >
            {['analyzing', 'styling', 'scent'].map((p, i) => {
              const isActive = phase === p
              const isComplete =
                ['analyzing', 'styling', 'scent'].indexOf(phase) > i

              return (
                <div
                  key={p}
                  className={`h-2 w-2 rounded-full transition-all ${
                    isActive
                      ? 'scale-125'
                      : isComplete
                      ? 'opacity-100'
                      : 'opacity-30'
                  }`}
                  style={{
                    backgroundColor: isActive || isComplete ? MIRROR_COLOR : 'white',
                  }}
                />
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}
