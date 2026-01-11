'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LoadingAnimation } from '@/components/steps/loading-animation'
import {
  useExperienceStore,
  useSpectrumAnswers,
} from '@/hooks/use-experience-store'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import type { SpectrumResult, PersonalityAnalysis } from '@/types/spectrum'
import type { ScentRecipe } from '@/types/scent'

type LoadingStatus = 'analyzing' | 'generating' | 'complete' | 'error'

const SPECTRUM_COLOR = '#9B6DFF'

const statusMessages: Record<LoadingStatus, string> = {
  analyzing: '당신의 감각 스펙트럼을 분석하고 있습니다...',
  generating: '맞춤 향을 조합하고 있습니다...',
  complete: '분석이 완료되었습니다!',
  error: '오류가 발생했습니다.',
}

interface SpectrumApiResponse {
  result: SpectrumResult
  scent: ScentRecipe
  personality: PersonalityAnalysis
}

export default function SpectrumLoadingPage() {
  const router = useRouter()
  const answers = useSpectrumAnswers()
  const {
    setSpectrumResult,
    setSpectrumScent,
    setSpectrumPersonality,
    setIsGenerating,
    setError,
  } = useExperienceStore()

  const [status, setStatus] = useState<LoadingStatus>('analyzing')
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Prevent double API call
  const hasStartedRef = useRef(false)

  useEffect(() => {
    // Check if we have answers
    if (Object.keys(answers).length === 0) {
      router.push('/spectrum/questions')
      return
    }

    // Prevent duplicate calls
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    analyzeSpectrum()
  }, [])

  const analyzeSpectrum = async () => {
    setIsGenerating(true)
    setStatus('analyzing')
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        // Slow down progress over time
        const increment = Math.max(1, 10 - prev / 10)
        return Math.min(90, prev + increment * Math.random())
      })
    }, 500)

    try {
      // Phase 1: Analyzing
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('generating')
      setProgress(50)

      const response = await fetch('/api/spectrum/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to analyze spectrum')
      }

      const data: SpectrumApiResponse = await response.json()

      setProgress(100)
      setSpectrumResult(data.result)
      setSpectrumScent(data.scent)
      setSpectrumPersonality(data.personality)
      setStatus('complete')

      // Navigate to result page
      setTimeout(() => {
        router.push('/spectrum/result')
      }, 1500)
    } catch (err) {
      clearInterval(progressInterval)
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRetry = () => {
    hasStartedRef.current = false
    setErrorMessage(null)
    analyzeSpectrum()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-lg space-y-8 text-center">
        {/* Loading Animation */}
        <LoadingAnimation status={status} memberColor={SPECTRUM_COLOR} />

        {/* Status Message */}
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="font-korean text-2xl font-medium md:text-3xl">
            {status === 'analyzing' && (
              <>
                당신의{' '}
                <span style={{ color: SPECTRUM_COLOR }}>감각 스펙트럼</span>을
                <br />
                분석하고 있습니다
              </>
            )}
            {status === 'generating' && (
              <>
                맞춤{' '}
                <span style={{ color: SPECTRUM_COLOR }}>향 레시피</span>를
                <br />
                조합하고 있습니다
              </>
            )}
            {status === 'complete' && '분석 완료!'}
            {status === 'error' && '앗, 문제가 발생했어요'}
          </h2>

          <p className="text-[var(--text-secondary)]">
            {statusMessages[status]}
          </p>

          {errorMessage && (
            <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
          )}
        </motion.div>

        {/* Progress Bar */}
        {(status === 'analyzing' || status === 'generating') && (
          <div className="mx-auto w-full max-w-xs">
            <div className="h-1 overflow-hidden rounded-full bg-[var(--background-secondary)]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: SPECTRUM_COLOR }}
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
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="primary"
              onClick={handleRetry}
              className="gap-2"
              style={{ backgroundColor: SPECTRUM_COLOR }}
            >
              <RefreshCw className="h-4 w-4" />
              다시 시도하기
            </Button>
          </motion.div>
        )}

        {/* Analysis phases */}
        {(status === 'analyzing' || status === 'generating') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-center gap-3 text-sm">
              <div
                className={`h-2 w-2 rounded-full ${
                  status === 'analyzing' || status === 'generating'
                    ? 'bg-green-400'
                    : 'bg-white/20'
                }`}
              />
              <span
                className={
                  status === 'analyzing' || status === 'generating'
                    ? 'text-white/80'
                    : 'text-white/40'
                }
              >
                감각 패턴 분석
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm">
              <div
                className={`h-2 w-2 rounded-full ${
                  status === 'generating' ? 'bg-green-400' : 'bg-white/20'
                }`}
              />
              <span
                className={
                  status === 'generating' ? 'text-white/80' : 'text-white/40'
                }
              >
                멤버 매칭 계산
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <span className="text-white/40">향 레시피 생성</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
