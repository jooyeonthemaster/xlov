'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  useExperienceStore,
  useMirrorMember,
  useMirrorResult,
  useMirrorScent,
  useMirrorIntensity,
} from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { MIRROR_COLOR, STYLE_INTENSITIES } from '@/lib/constants/mirror-styles'
import { ScentPyramid } from '@/components/scent-pyramid'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  RotateCcw,
  Download,
  Share2,
  Sparkles,
  ArrowLeftRight,
} from 'lucide-react'

type TabType = 'transform' | 'scent'

export default function MirrorResultPage() {
  const router = useRouter()
  const memberId = useMirrorMember()
  const result = useMirrorResult()
  const scent = useMirrorScent()
  const intensity = useMirrorIntensity()
  const { resetMirror } = useExperienceStore()

  const [activeTab, setActiveTab] = useState<TabType>('transform')
  const [showComparison, setShowComparison] = useState(false)

  const member = MEMBERS.find((m) => m.id === memberId)
  const intensityInfo = STYLE_INTENSITIES.find((i) => i.id === intensity)

  useEffect(() => {
    if (!member || !result) {
      router.push('/mirror/select')
    }
  }, [member, result, router])

  const handleTryAgain = () => {
    resetMirror()
    router.push('/hub')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member?.name} 스타일로 변신 - XLOV Experience`,
          text: `${member?.name}의 스타일로 변신한 나를 확인해보세요!`,
          url: window.location.href,
        })
      } catch {
        console.log('Share cancelled')
      }
    }
  }

  const handleDownload = async () => {
    if (!result?.transformedImage) return

    try {
      const response = await fetch(result.transformedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${member?.name}-mirror-transform.png`
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

  if (!member || !result) {
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
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em]"
            style={{
              backgroundColor: `${MIRROR_COLOR}20`,
              color: MIRROR_COLOR,
            }}
          >
            MIRROR RESULT
          </span>

          <h1 className="font-korean mb-4 text-3xl font-medium md:text-4xl lg:text-5xl">
            <span style={{ color: member.accentColor }}>{member.name}</span>
            으로 변신 완료
          </h1>

          <p className="text-[var(--text-secondary)]">
            {intensityInfo?.label} 강도로 {member.name}의 스타일이 적용되었습니다
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
            onClick={() => setActiveTab('transform')}
            className={`flex-1 rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              activeTab === 'transform'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            변신 결과
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
          {/* Transform Tab */}
          {activeTab === 'transform' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Before/After comparison */}
              <div className="relative mx-auto max-w-2xl">
                {/* Comparison toggle */}
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="absolute -top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-black"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  {showComparison ? '변신 결과 보기' : '비교하기'}
                </button>

                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                  <AnimatePresence mode="wait">
                    {showComparison ? (
                      <motion.div
                        key="comparison"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative h-full w-full"
                      >
                        {/* Split view */}
                        <div className="absolute inset-0 flex">
                          {/* Before */}
                          <div className="relative h-full w-1/2 overflow-hidden">
                            <Image
                              src={result.originalImage}
                              alt="Before"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur-sm">
                              BEFORE
                            </div>
                          </div>

                          {/* After */}
                          <div className="relative h-full w-1/2 overflow-hidden">
                            <Image
                              src={result.transformedImage}
                              alt="After"
                              fill
                              className="object-cover"
                            />
                            <div
                              className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs backdrop-blur-sm"
                              style={{ backgroundColor: `${member.accentColor}CC` }}
                            >
                              AFTER
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/50" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative h-full w-full"
                      >
                        {/* Transformed image */}
                        <Image
                          src={result.transformedImage}
                          alt="Transformed"
                          fill
                          className="object-cover"
                        />

                        {/* Glow effect */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-30"
                          style={{
                            background: `radial-gradient(circle at center, ${member.accentColor}40 0%, transparent 70%)`,
                          }}
                        />

                        {/* Style applied overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: member.accentColor }}
                              />
                              <span className="text-sm text-white/70">
                                {member.name} 스타일 • {result.memberInfluence}% 적용
                              </span>
                            </div>
                            <p className="text-sm text-white/80">
                              {result.styleApplied.mood}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Applied Style Details */}
              <div className="mx-auto grid max-w-xl gap-4 md:grid-cols-2">
                {/* Makeup */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <h3 className="mb-3 text-sm font-medium text-white/70">
                    적용된 메이크업
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.styleApplied.makeup.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                          backgroundColor: `${member.accentColor}20`,
                          color: member.accentColor,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Styling */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <h3 className="mb-3 text-sm font-medium text-white/70">
                    적용된 스타일링
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.styleApplied.styling.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                          backgroundColor: `${MIRROR_COLOR}20`,
                          color: MIRROR_COLOR,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Influence meter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-white/70">스타일 영향도</span>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: member.accentColor }}
                  >
                    {result.memberInfluence}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/50">나</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.memberInfluence}%` }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: member.accentColor }}
                    />
                  </div>
                  <span className="text-xs text-white/50">{member.name}</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Scent Tab */}
          {activeTab === 'scent' && scent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
            >
              <ScentPyramid recipe={scent} showDetails animated />
            </motion.div>
          )}

          {/* No scent fallback */}
          {activeTab === 'scent' && !scent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-white/30" />
              <p className="text-white/50">향 레시피를 불러오지 못했습니다</p>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
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
            style={{ backgroundColor: MIRROR_COLOR }}
          >
            완료하기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
