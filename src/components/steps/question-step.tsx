'use client'

import { motion } from 'framer-motion'
import { Question, Member } from '@/types'
import { ColorPicker } from '@/components/ui/color-picker'
import { OptionSelector } from '@/components/ui/option-selector'
import { TextInput } from '@/components/ui/text-input'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

interface QuestionStepProps {
  question: Question
  member: Member
  value: string | undefined
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
  isLast: boolean
  canProceed: boolean
}

export function QuestionStep({
  question,
  member,
  value,
  onChange,
  onNext,
  onBack,
  isLast,
  canProceed,
}: QuestionStepProps) {
  return (
    <div className="space-y-12">
      {/* Question header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <span
            className="text-sm tracking-[0.3em] uppercase"
            style={{ color: member.accentColor }}
          >
            {question.subtitle}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-korean text-4xl md:text-5xl font-medium mb-4"
        >
          {question.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--text-secondary)] text-lg max-w-md mx-auto"
        >
          {question.description}
        </motion.p>
      </div>

      {/* Question input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <div className="w-full max-w-2xl">
          {question.type === 'color-picker' && question.options && (
            <ColorPicker
              options={question.options}
              value={value}
              onChange={onChange}
              allowCustom={question.allowCustom}
              memberColor={member.accentColor}
            />
          )}

          {question.type === 'single-select' && question.options && (
            <OptionSelector
              options={question.options}
              value={value}
              onChange={onChange}
              memberColor={member.accentColor}
              columns={question.options.length <= 4 ? 2 : 3}
            />
          )}

          {question.type === 'text-input' && (
            <TextInput
              value={value || ''}
              onChange={onChange}
              placeholder={question.placeholder}
              maxLength={question.maxLength}
              memberColor={member.accentColor}
            />
          )}
        </div>
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
            backgroundColor: canProceed ? member.accentColor : undefined,
          }}
        >
          {isLast ? (
            <>
              완료
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
