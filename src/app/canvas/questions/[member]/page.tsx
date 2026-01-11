'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { QuestionStep } from '@/components/steps/question-step'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import {
  useExperienceStore,
  useCanvasMember,
  useCanvasResponses,
  useCanvasStep,
} from '@/hooks/use-experience-store'
import { MEMBERS, QUESTIONS } from '@/lib/constants'
import { Member } from '@/types'

export default function QuestionsPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = params.member as string

  const selectedMember = useCanvasMember()
  const responses = useCanvasResponses()
  const currentStep = useCanvasStep()
  const {
    setCanvasMember,
    setCanvasResponse,
    nextCanvasStep,
    prevCanvasStep,
  } = useExperienceStore()

  const [direction, setDirection] = useState(1)

  // Get member data
  const member = MEMBERS.find((m) => m.id === memberId) as Member

  // Ensure member is selected in store
  useEffect(() => {
    if (memberId && memberId !== selectedMember) {
      setCanvasMember(memberId)
    }
  }, [memberId, selectedMember, setCanvasMember])

  // Redirect if no member
  useEffect(() => {
    if (!member) {
      router.push('/canvas/select')
    }
  }, [member, router])

  if (!member) {
    return null
  }

  const currentQuestion = QUESTIONS[currentStep]
  const currentValue = responses[currentQuestion?.id]
  const isLastQuestion = currentStep === QUESTIONS.length - 1
  const canProceed = !!currentValue

  const handleNext = () => {
    if (isLastQuestion) {
      // Go to loading/generation page
      router.push(`/canvas/loading/${memberId}`)
    } else {
      setDirection(1)
      nextCanvasStep()
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      router.push('/canvas/select')
    } else {
      setDirection(-1)
      prevCanvasStep()
    }
  }

  const handleChange = (value: string) => {
    if (currentQuestion) {
      setCanvasResponse(currentQuestion.id, value)
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

  return (
    <div className="min-h-screen px-6 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <ProgressIndicator
            current={currentStep + 1}
            total={QUESTIONS.length}
            memberColor={member.accentColor}
          />
        </motion.div>

        {/* Member indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{
              backgroundColor: `${member.accentColor}20`,
              color: member.accentColor,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: member.accentColor }}
            />
            {member.name}의 새로운 모습
          </span>
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
            {currentQuestion && (
              <QuestionStep
                question={currentQuestion}
                member={member}
                value={currentValue}
                onChange={handleChange}
                onNext={handleNext}
                onBack={handleBack}
                isLast={isLastQuestion}
                canProceed={canProceed}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Question counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-[var(--text-muted)] text-sm"
        >
          {currentStep + 1} / {QUESTIONS.length}
        </motion.div>
      </div>
    </div>
  )
}
