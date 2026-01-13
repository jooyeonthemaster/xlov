'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useExperienceStore } from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { MIRROR_COLOR } from '@/lib/constants/mirror-styles'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Camera } from 'lucide-react'
import { useMobile } from '@/hooks/use-mobile'

export default function MirrorSelectPage() {
  const router = useRouter()
  const { isMobile } = useMobile()
  const { setMirrorMember, setCurrentProgram } = useExperienceStore()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (memberId: string) => {
    setSelectedId(memberId)
  }

  const handleContinue = () => {
    if (!selectedId) return
    setCurrentProgram('mirror')
    setMirrorMember(selectedId)
    router.push('/mirror/upload')
  }

  const handleBack = () => {
    router.push('/hub')
  }

  const selectedMember = MEMBERS.find((m) => m.id === selectedId)

  // 모바일: 애니메이션 없이 렌더링
  if (isMobile) {
    return (
      <div className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em]"
              style={{
                backgroundColor: `${MIRROR_COLOR}20`,
                color: MIRROR_COLOR,
              }}
            >
              <Camera className="mr-2 inline h-3 w-3" />
              MIRROR
            </span>

            <h1 className="font-korean mb-4 text-3xl font-medium md:text-4xl lg:text-5xl">
              누구의 스타일로
              <br />
              <span style={{ color: MIRROR_COLOR }}>변신</span>할까요?
            </h1>

            <p className="mx-auto max-w-md text-[var(--text-secondary)]">
              당신의 셀카에 멤버의 시그니처 스타일을 입혀드릴게요
            </p>
          </div>

          {/* Member Grid - 모바일 최적화 */}
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {MEMBERS.map((member) => {
              const isSelected = selectedId === member.id

              return (
                <button
                  key={member.id}
                  onClick={() => handleSelect(member.id)}
                  className={`group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 ${
                    isSelected
                      ? ''
                      : 'border-transparent'
                  }`}
                  style={{
                    borderColor: isSelected ? member.accentColor : undefined,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={member.placeholderImage}
                      alt={member.name}
                      fill
                      className={`object-cover ${
                        isSelected ? '' : 'grayscale-[30%]'
                      }`}
                    />

                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 ${
                        isSelected ? 'opacity-60' : 'opacity-40'
                      }`}
                      style={{
                        background: `linear-gradient(to top, ${member.accentColor}90 0%, transparent 60%)`,
                      }}
                    />

                    {/* Selection indicator */}
                    {isSelected && (
                      <div
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full"
                        style={{ backgroundColor: member.accentColor }}
                      >
                        <svg
                          className="h-5 w-5 text-white"
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
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <h3 className="font-korean mb-1 text-xl font-bold text-white md:text-2xl">
                      {member.name}
                    </h3>
                    <p className="text-xs text-white/70">{member.englishName}</p>
                    <p className="mt-1 text-[10px] text-white/50 line-clamp-1">
                      {member.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected member style preview - 모바일: backdrop-blur 제거 */}
          {selectedMember && (
            <div className="mx-auto mb-8 max-w-md rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${selectedMember.accentColor}30` }}
                >
                  <Camera
                    className="h-5 w-5"
                    style={{ color: selectedMember.accentColor }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    <span style={{ color: selectedMember.accentColor }}>
                      {selectedMember.name}
                    </span>
                    의 스타일로 변신
                  </p>
                  <p className="text-xs text-white/50 line-clamp-1">
                    {selectedMember.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              뒤로
            </Button>

            <Button
              variant="primary"
              onClick={handleContinue}
              disabled={!selectedId}
              className="gap-2"
              style={{
                backgroundColor: selectedId ? MIRROR_COLOR : undefined,
              }}
            >
              다음
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 데스크톱: 기존 애니메이션
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em]"
            style={{
              backgroundColor: `${MIRROR_COLOR}20`,
              color: MIRROR_COLOR,
            }}
          >
            <Camera className="mr-2 inline h-3 w-3" />
            MIRROR
          </span>

          <h1 className="font-korean mb-4 text-3xl font-medium md:text-4xl lg:text-5xl">
            누구의 스타일로
            <br />
            <span style={{ color: MIRROR_COLOR }}>변신</span>할까요?
          </h1>

          <p className="mx-auto max-w-md text-[var(--text-secondary)]">
            당신의 셀카에 멤버의 시그니처 스타일을 입혀드릴게요
          </p>
        </motion.div>

        {/* Member Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {MEMBERS.map((member, index) => {
            const isSelected = selectedId === member.id

            return (
              <motion.button
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => handleSelect(member.id)}
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'scale-[1.02] shadow-2xl'
                    : 'border-transparent hover:border-white/20'
                }`}
                style={{
                  borderColor: isSelected ? member.accentColor : undefined,
                }}
              >
                {/* Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={member.placeholderImage}
                    alt={member.name}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      isSelected
                        ? 'scale-105'
                        : 'grayscale-[30%] group-hover:grayscale-0'
                    }`}
                  />

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isSelected ? 'opacity-60' : 'opacity-40'
                    }`}
                    style={{
                      background: `linear-gradient(to top, ${member.accentColor}90 0%, transparent 60%)`,
                    }}
                  />

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: member.accentColor }}
                    >
                      <svg
                        className="h-5 w-5 text-white"
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
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <h3 className="font-korean mb-1 text-xl font-bold text-white md:text-2xl">
                    {member.name}
                  </h3>
                  <p className="text-xs text-white/70">{member.englishName}</p>
                  <p className="mt-1 text-[10px] text-white/50 line-clamp-1">
                    {member.description}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Selected member style preview */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-8 max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${selectedMember.accentColor}30` }}
              >
                <Camera
                  className="h-5 w-5"
                  style={{ color: selectedMember.accentColor }}
                />
              </div>
              <div>
                <p className="text-sm font-medium">
                  <span style={{ color: selectedMember.accentColor }}>
                    {selectedMember.name}
                  </span>
                  의 스타일로 변신
                </p>
                <p className="text-xs text-white/50 line-clamp-1">
                  {selectedMember.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            뒤로
          </Button>

          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!selectedId}
            className="gap-2"
            style={{
              backgroundColor: selectedId ? MIRROR_COLOR : undefined,
            }}
          >
            다음
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
