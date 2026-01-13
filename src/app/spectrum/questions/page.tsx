'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SpectrumQuestionStep } from '@/components/steps/spectrum-question-step'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import { useExperienceStore } from '@/hooks/use-experience-store'
import { SPECTRUM_QUESTIONS } from '@/lib/constants'
import { useMobile } from '@/hooks/use-mobile'

// Spectrum 브랜드 컬러
const SPECTRUM_COLOR = '#9B6DFF'

export default function SpectrumQuestionsPage() {
  const router = useRouter()
  const { isMobile } = useMobile()

  const {
    spectrum,
    setSpectrumAnswer,
    setSpectrumQuestion,
    setCurrentProgram,
  } = useExperienceStore()

  const [direction, setDirection] = useState(1)
  const currentStep = spectrum.currentQuestion
  const answers = spectrum.answers

  // Set program on mount
  useEffect(() => {
    setCurrentProgram('spectrum')
  }, [setCurrentProgram])

  const currentQuestion = SPECTRUM_QUESTIONS[currentStep]
  const currentValue = currentQuestion ? answers[currentQuestion.id] : undefined
  const isLastQuestion = currentStep === SPECTRUM_QUESTIONS.length - 1
  const canProceed = currentValue !== undefined

  const handleNext = () => {
    if (isLastQuestion) {
      // Go to loading/calculation page
      router.push('/spectrum/loading')
    } else {
      setDirection(1)
      setSpectrumQuestion(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      router.push('/hub')
    } else {
      setDirection(-1)
      setSpectrumQuestion(currentStep - 1)
    }
  }

  const handleChange = (value: number) => {
    if (currentQuestion) {
      setSpectrumAnswer(currentQuestion.id, value)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  if (!currentQuestion) {
    return null
  }

  // 모바일: 애니메이션 없이 렌더링
  if (isMobile) {
    return (
      <div className="min-h-screen px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.3em] uppercase mb-4"
              style={{
                backgroundColor: `${SPECTRUM_COLOR}20`,
                color: SPECTRUM_COLOR,
              }}
            >
              SPECTRUM
            </span>
            <h1 className="font-korean text-xl text-white/60">
              당신의 감각 스펙트럼을 탐색합니다
            </h1>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 md:mb-12">
            <ProgressIndicator
              current={currentStep + 1}
              total={SPECTRUM_QUESTIONS.length}
              memberColor={SPECTRUM_COLOR}
            />
          </div>

          {/* Question Content - 애니메이션 없이 직접 렌더링 */}
          <div key={currentStep}>
            <SpectrumQuestionStep
              question={currentQuestion}
              value={currentValue}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
              isLast={isLastQuestion}
              canProceed={canProceed}
              accentColor={SPECTRUM_COLOR}
            />
          </div>

          {/* Question counter */}
          <div className="text-center mt-8 text-[var(--text-muted)] text-sm">
            {currentStep + 1} / {SPECTRUM_QUESTIONS.length}
          </div>
        </div>
      </div>
    )
  }

  // 데스크톱: 기존 애니메이션
  return (
    <div className="min-h-screen px-6 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.3em] uppercase mb-4"
            style={{
              backgroundColor: `${SPECTRUM_COLOR}20`,
              color: SPECTRUM_COLOR,
            }}
          >
            SPECTRUM
          </span>
          <h1 className="font-korean text-xl text-white/60">
            당신의 감각 스펙트럼을 탐색합니다
          </h1>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <ProgressIndicator
            current={currentStep + 1}
            total={SPECTRUM_QUESTIONS.length}
            memberColor={SPECTRUM_COLOR}
          />
        </motion.div>

        {/* Question Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <SpectrumQuestionStep
              question={currentQuestion}
              value={currentValue}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
              isLast={isLastQuestion}
              canProceed={canProceed}
              accentColor={SPECTRUM_COLOR}
            />
          </motion.div>
        </AnimatePresence>

        {/* Question counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-[var(--text-muted)] text-sm"
        >
          {currentStep + 1} / {SPECTRUM_QUESTIONS.length}
        </motion.div>
      </div>
    </div>
  )
}
