'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  memberColor?: string
}

export function TextInput({
  value,
  onChange,
  placeholder = '입력해주세요',
  maxLength = 20,
  memberColor = 'var(--member-umuti)',
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const characterCount = value.length
  const isNearLimit = maxLength && characterCount >= maxLength * 0.8
  const isAtLimit = maxLength && characterCount >= maxLength

  useEffect(() => {
    // Auto-focus the input when component mounts
    inputRef.current?.focus()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative">
        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            if (!maxLength || e.target.value.length <= maxLength) {
              onChange(e.target.value)
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full bg-transparent text-center text-3xl md:text-4xl font-korean font-medium',
            'border-b-2 pb-4 pt-2 outline-none transition-all duration-300',
            'placeholder:text-[var(--text-muted)]/50',
            isFocused
              ? 'border-current'
              : 'border-[var(--text-muted)]/30 hover:border-[var(--text-muted)]/50'
          )}
          style={{
            borderColor: isFocused ? memberColor : undefined,
          }}
        />

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{ backgroundColor: memberColor }}
          initial={{ width: '0%', left: '50%' }}
          animate={{
            width: isFocused ? '100%' : '0%',
            left: isFocused ? '0%' : '50%',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Character counter */}
      {maxLength && (
        <motion.div
          className="mt-4 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span
            className={cn(
              'text-sm transition-colors',
              isAtLimit
                ? 'text-red-400'
                : isNearLimit
                  ? 'text-yellow-400'
                  : 'text-[var(--text-muted)]'
            )}
          >
            {characterCount} / {maxLength}
          </span>
        </motion.div>
      )}

      {/* Helper text */}
      <motion.p
        className="mt-2 text-center text-sm text-[var(--text-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        이 멤버의 본질을 담은 한 단어를 입력해주세요
      </motion.p>
    </motion.div>
  )
}
