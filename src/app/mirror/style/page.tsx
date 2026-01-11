'use client'

import { useEffect, useState } from 'react'
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
import {
  MIRROR_COLOR,
  STYLE_INTENSITIES,
  MEMBER_STYLE_GUIDES,
} from '@/lib/constants/mirror-styles'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import type { StyleIntensity } from '@/types/mirror'

export default function MirrorStylePage() {
  const router = useRouter()
  const memberId = useMirrorMember()
  const selfieUrl = useMirrorSelfie()
  const currentIntensity = useMirrorIntensity()
  const { setMirrorStyleIntensity } = useExperienceStore()

  const [selected, setSelected] = useState<StyleIntensity>(currentIntensity)

  const member = MEMBERS.find((m) => m.id === memberId)
  const styleGuide = memberId ? MEMBER_STYLE_GUIDES[memberId] : null

  useEffect(() => {
    if (!member || !selfieUrl) {
      router.push('/mirror/select')
    }
  }, [member, selfieUrl, router])

  const handleSelect = (intensity: StyleIntensity) => {
    setSelected(intensity)
  }

  const handleContinue = () => {
    setMirrorStyleIntensity(selected)
    router.push('/mirror/loading')
  }

  const handleBack = () => {
    router.push('/mirror/upload')
  }

  if (!member || !selfieUrl) {
    return null
  }

  // Intensity visualization scale
  const getIntensityScale = (id: StyleIntensity) => {
    switch (id) {
      case 'light':
        return 0.3
      case 'medium':
        return 0.6
      case 'bold':
        return 1
      default:
        return 0.5
    }
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
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
            STEP 2 OF 2
          </span>

          <h1 className="font-korean mb-4 text-3xl font-medium md:text-4xl">
            스타일 강도를 선택하세요
          </h1>

          <p className="text-[var(--text-secondary)]">
            <span style={{ color: member.accentColor }}>{member.name}</span>의
            스타일을 얼마나 적용할까요?
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          {/* Preview with intensity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-[3/4] max-w-xs overflow-hidden rounded-3xl">
              {/* Selfie */}
              <Image
                src={selfieUrl}
                alt="Your selfie"
                fill
                className="object-cover"
              />

              {/* Member style overlay (intensity based) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: getIntensityScale(selected) * 0.5 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${member.accentColor}60 0%, transparent 50%, ${member.accentColor}40 100%)`,
                }}
              />

              {/* Intensity indicator */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-xl bg-black/60 p-3 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-white/70">스타일 강도</span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: member.accentColor }}
                    >
                      {STYLE_INTENSITIES.find((i) => i.id === selected)?.label}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getIntensityScale(selected) * 100}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: member.accentColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Intensity Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center space-y-4"
          >
            {STYLE_INTENSITIES.map((intensity, index) => {
              const isSelected = selected === intensity.id

              return (
                <motion.button
                  key={intensity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => handleSelect(intensity.id)}
                  className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? 'scale-[1.02] shadow-xl'
                      : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                  style={{
                    borderColor: isSelected ? member.accentColor : undefined,
                    backgroundColor: isSelected ? `${member.accentColor}15` : undefined,
                  }}
                >
                  {/* Selection indicator */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isSelected ? 'border-transparent' : 'border-white/30'
                      }`}
                      style={{
                        backgroundColor: isSelected ? member.accentColor : 'transparent',
                      }}
                    >
                      {isSelected && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-lg font-medium">{intensity.label}</h3>
                        <span className="text-xs text-white/40">
                          {intensity.labelEn}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">{intensity.description}</p>

                      {/* Intensity bar visualization */}
                      <div className="mt-3 flex gap-1">
                        {[1, 2, 3].map((bar) => (
                          <div
                            key={bar}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              bar <= (intensity.id === 'light' ? 1 : intensity.id === 'medium' ? 2 : 3)
                                ? ''
                                : 'opacity-20'
                            }`}
                            style={{
                              backgroundColor:
                                bar <= (intensity.id === 'light' ? 1 : intensity.id === 'medium' ? 2 : 3)
                                  ? member.accentColor
                                  : 'white',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        {/* Member Style Guide */}
        {styleGuide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: member.accentColor }} />
              <h3 className="text-sm font-medium">
                {member.name}의 시그니처 스타일
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs text-white/50">메이크업</p>
                <div className="flex flex-wrap gap-1.5">
                  {styleGuide.makeupFeatures.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full px-2.5 py-1 text-xs"
                      style={{
                        backgroundColor: `${member.accentColor}20`,
                        color: member.accentColor,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs text-white/50">스타일링</p>
                <div className="flex flex-wrap gap-1.5">
                  {styleGuide.stylingFeatures.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full px-2.5 py-1 text-xs"
                      style={{
                        backgroundColor: `${member.accentColor}20`,
                        color: member.accentColor,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Color palette */}
            <div className="mt-4">
              <p className="mb-2 text-xs text-white/50">컬러 팔레트</p>
              <div className="flex gap-2">
                {styleGuide.colorPalette.map((color) => (
                  <div
                    key={color}
                    className="h-6 w-6 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            뒤로
          </Button>

          <Button
            variant="primary"
            onClick={handleContinue}
            className="gap-2"
            style={{ backgroundColor: MIRROR_COLOR }}
          >
            변신 시작
            <Sparkles className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
