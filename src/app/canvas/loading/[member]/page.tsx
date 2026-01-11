'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { LoadingAnimation } from '@/components/steps/loading-animation'
import {
  useExperienceStore,
  useCanvasResponses,
} from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import type { CanvasGenerateResponse } from '@/types/api'

type LoadingStatus = 'generating' | 'complete' | 'error'

const statusMessages: Record<LoadingStatus, string> = {
  generating: '당신만의 이미지와 향을 생성하고 있습니다...',
  complete: '완성되었습니다!',
  error: '오류가 발생했습니다.',
}

export default function LoadingPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = params.member as string

  const responses = useCanvasResponses()
  const { setCanvasImageUrl, setCanvasScent, setIsGenerating, setError } =
    useExperienceStore()

  const [status, setStatus] = useState<LoadingStatus>('generating')
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Prevent double API call in React Strict Mode
  const hasStartedRef = useRef(false)

  const member = MEMBERS.find((m) => m.id === memberId)

  useEffect(() => {
    if (!member) {
      router.push('/canvas/select')
      return
    }

    // Prevent duplicate calls
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    generateCanvas()
  }, [])

  const generateCanvas = async () => {
    setIsGenerating(true)
    setStatus('generating')
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 10
      })
    }, 800)

    try {
      const response = await fetch('/api/canvas/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId,
          responses,
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to generate canvas')
      }

      const data: CanvasGenerateResponse = await response.json()

      setProgress(100)
      setCanvasImageUrl(data.imageUrl)
      setCanvasScent(data.scent)
      setStatus('complete')

      // Navigate to result page after completion animation
      setTimeout(() => {
        router.push(`/canvas/result/${memberId}`)
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
    generateCanvas()
  }

  if (!member) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-lg space-y-8 text-center">
        {/* Loading Animation */}
        <LoadingAnimation status={status} memberColor={member.accentColor} />

        {/* Status Message */}
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="font-korean text-2xl font-medium md:text-3xl">
            {status === 'generating' && (
              <>
                <span style={{ color: member.accentColor }}>{member.name}</span>
                의 새로운 모습과 향을
                <br />
                만들고 있습니다
              </>
            )}
            {status === 'complete' && '완성!'}
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
        {status === 'generating' && (
          <div className="mx-auto w-full max-w-xs">
            <div className="h-1 overflow-hidden rounded-full bg-[var(--background-secondary)]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: member.accentColor }}
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
              style={{ backgroundColor: member.accentColor }}
            >
              <RefreshCw className="h-4 w-4" />
              다시 시도하기
            </Button>
          </motion.div>
        )}

        {/* Tip */}
        {status === 'generating' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-sm text-[var(--text-muted)]"
          >
            AI가 당신의 선택을 분석하고 있습니다.
            <br />
            이미지와 향을 동시에 생성하고 있어요...
          </motion.p>
        )}
      </div>
    </div>
  )
}
