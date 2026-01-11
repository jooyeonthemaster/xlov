'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import {
  useExperienceStore,
  useCanvasImage,
  useCanvasResponses,
  useCanvasScent,
} from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ScentPyramid } from '@/components/scent-pyramid'
import { ArrowRight, Share2, RotateCcw, Download, Sparkles } from 'lucide-react'

export default function ResultPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = params.member as string

  const generatedImageUrl = useCanvasImage()
  const responses = useCanvasResponses()
  const scentRecipe = useCanvasScent()
  const { resetCanvas } = useExperienceStore()

  const [activeTab, setActiveTab] = useState<'image' | 'scent'>('image')

  const member = MEMBERS.find((m) => m.id === memberId)

  useEffect(() => {
    if (!member || !generatedImageUrl) {
      router.push('/canvas/select')
      return
    }
  }, [member, generatedImageUrl, router])

  const handleTryAgain = () => {
    resetCanvas()
    router.push('/hub')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나의 ${member?.name} - XLOV Experience`,
          text: `내가 상상한 ${member?.name}의 모습과 향을 확인해보세요!`,
          url: window.location.href,
        })
      } catch {
        console.log('Share cancelled')
      }
    }
  }

  const handleDownload = async () => {
    if (!generatedImageUrl) return

    try {
      const response = await fetch(generatedImageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${member?.name}-xlov-canvas.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleComplete = () => {
    router.push('/closing')
  }

  if (!member || !generatedImageUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-[var(--text-muted)]">
          결과를 불러오는 중...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Canvas Result
          </span>
          <h1 className="font-korean mb-4 text-3xl font-medium md:text-4xl lg:text-5xl">
            당신이 그린{' '}
            <span style={{ color: member.accentColor }}>{member.name}</span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            AI가 당신의 상상을 이미지와 향으로 완성했습니다
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-8 flex max-w-md justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-1"
        >
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              activeTab === 'image'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            이미지
          </button>
          <button
            onClick={() => setActiveTab('scent')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              activeTab === 'scent'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            향 레시피
          </button>
        </motion.div>

        {/* Content Area */}
        <div className="mx-auto max-w-4xl">
          {/* Image Tab */}
          {activeTab === 'image' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative mx-auto mb-8 max-w-2xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--background-secondary)]">
                {/* Glow effect */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-30"
                  style={{
                    background: `radial-gradient(circle at center, ${member.accentColor}40 0%, transparent 70%)`,
                  }}
                />

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={generatedImageUrl}
                    alt={`${member.name} - AI Generated`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Label overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <h3 className="font-korean mb-1 text-xl font-medium text-white">
                      나의 시선으로 그린 {member.name}
                    </h3>
                    <p className="text-sm text-white/70">
                      당신의 상상이 담긴 이미지
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Scent Tab */}
          {activeTab === 'scent' && scentRecipe && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
            >
              <ScentPyramid recipe={scentRecipe} showDetails animated />
            </motion.div>
          )}

          {/* No scent fallback */}
          {activeTab === 'scent' && !scentRecipe && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-white/30" />
              <p className="text-white/50">
                향 레시피를 불러오지 못했습니다
              </p>
            </motion.div>
          )}
        </div>

        {/* User's selections summary */}
        {responses && Object.keys(responses).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-12 max-w-2xl"
          >
            <h3 className="mb-4 text-center text-sm text-[var(--text-muted)]">
              당신이 선택한 키워드
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(responses).map(([key, value]) => (
                <span
                  key={key}
                  className="rounded-full px-3 py-1 text-sm"
                  style={{
                    backgroundColor: `${member.accentColor}20`,
                    color: member.accentColor,
                  }}
                >
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button variant="ghost" onClick={handleTryAgain} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            다른 체험하기
          </Button>

          <Button variant="secondary" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            이미지 저장
          </Button>

          <Button variant="secondary" onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            공유하기
          </Button>

          <Button
            variant="primary"
            onClick={handleComplete}
            className="gap-2"
            style={{ backgroundColor: member.accentColor }}
          >
            완료하기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
