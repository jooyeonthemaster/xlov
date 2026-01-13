'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useMobile } from '@/hooks/use-mobile'
import type { SpectrumQuestion } from '@/types/spectrum'

interface SpectrumQuestionStepProps {
  question: SpectrumQuestion
  value: number | undefined
  onChange: (value: number) => void
  onNext: () => void
  onBack: () => void
  isLast: boolean
  canProceed: boolean
  accentColor: string
}

export function SpectrumQuestionStep({
  question,
  value,
  onChange,
  onNext,
  onBack,
  isLast,
  canProceed,
  accentColor,
}: SpectrumQuestionStepProps) {
  const { isMobile } = useMobile()

  // 모바일: 애니메이션 없이 렌더링
  if (isMobile) {
    return (
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="font-korean text-3xl md:text-4xl font-medium">
            {question.text}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {question.options.map((option) => {
            const isSelected = value === option.value
            const intensity = Math.abs(option.value) / 2

            return (
              <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`
                  w-full p-4 rounded-xl text-left transition-colors duration-200
                  border
                  ${
                    isSelected
                      ? 'border-transparent'
                      : 'border-white/10 bg-white/5'
                  }
                `}
                style={{
                  backgroundColor: isSelected ? `${accentColor}30` : undefined,
                  borderColor: isSelected ? accentColor : undefined,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: isSelected ? accentColor : 'rgba(255,255,255,0.3)',
                      backgroundColor: isSelected ? accentColor : 'transparent',
                    }}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  <span
                    className={`
                      flex-1 text-base md:text-lg
                      ${isSelected ? 'text-white' : 'text-white/70'}
                    `}
                  >
                    {option.label}
                  </span>

                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            i < intensity * 3
                              ? isSelected
                                ? accentColor
                                : 'rgba(255,255,255,0.3)'
                              : 'rgba(255,255,255,0.1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex justify-between items-center pt-8 max-w-2xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            이전
          </Button>

          <Button
            variant="primary"
            onClick={onNext}
            disabled={!canProceed}
            className="gap-2 min-w-[120px]"
            style={{
              backgroundColor: canProceed ? accentColor : undefined,
            }}
          >
            {isLast ? (
              <>
                결과 보기
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                다음
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }

  // 데스크톱: 기존 애니메이션
  return (
    <div className="space-y-12">
      {/* Question header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-korean text-3xl md:text-4xl font-medium"
        >
          {question.text}
        </motion.h2>
      </div>

      {/* Options - 5 scale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto space-y-3"
      >
        {question.options.map((option, index) => {
          const isSelected = value === option.value
          const intensity = Math.abs(option.value) / 2

          return (
            <motion.button
              key={option.value}
              onClick={() => onChange(option.value)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full p-4 rounded-xl text-left transition-all duration-300
                border backdrop-blur-sm
                ${
                  isSelected
                    ? 'border-transparent'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }
              `}
              style={{
                backgroundColor: isSelected ? `${accentColor}30` : undefined,
                borderColor: isSelected ? accentColor : undefined,
                boxShadow: isSelected
                  ? `0 0 20px ${accentColor}20, inset 0 0 20px ${accentColor}10`
                  : undefined,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Selection indicator */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300
                  `}
                  style={{
                    borderColor: isSelected ? accentColor : 'rgba(255,255,255,0.3)',
                    backgroundColor: isSelected ? accentColor : 'transparent',
                  }}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </div>

                {/* Option text */}
                <span
                  className={`
                    flex-1 text-base md:text-lg transition-colors
                    ${isSelected ? 'text-white' : 'text-white/70'}
                  `}
                >
                  {option.label}
                </span>

                {/* Intensity bars */}
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-4 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          i < intensity * 3
                            ? isSelected
                              ? accentColor
                              : 'rgba(255,255,255,0.3)'
                            : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-center pt-8 max-w-2xl mx-auto"
      >
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          이전
        </Button>

        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canProceed}
          className="gap-2 min-w-[120px]"
          style={{
            backgroundColor: canProceed ? accentColor : undefined,
          }}
        >
          {isLast ? (
            <>
              결과 보기
              <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              다음
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}
