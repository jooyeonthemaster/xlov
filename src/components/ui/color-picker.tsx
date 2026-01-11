'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface ColorOption {
  value: string
  label: string
}

interface ColorPickerProps {
  options: ColorOption[]
  value?: string
  onChange: (value: string) => void
  allowCustom?: boolean
  memberColor?: string
}

export function ColorPicker({
  options,
  value,
  onChange,
  allowCustom = true,
  memberColor = 'var(--member-umuti)',
}: ColorPickerProps) {
  const [showCustom, setShowCustom] = useState(false)
  const [customColor, setCustomColor] = useState('#FFFFFF')

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    onChange(newColor)
  }

  const isSelected = (optionValue: string) => value === optionValue
  const isCustomSelected = value && !options.find((o) => o.value === value)

  return (
    <div className="space-y-6">
      {/* Preset colors grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChange(option.value)}
            className={cn(
              'group relative aspect-square rounded-2xl transition-all duration-300',
              'hover:scale-105 hover:shadow-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isSelected(option.value) && 'ring-2 ring-offset-2 ring-offset-[var(--background)]'
            )}
            style={{
              backgroundColor: option.value,
              boxShadow: isSelected(option.value)
                ? `0 0 20px ${option.value}40`
                : undefined,
              '--tw-ring-color': memberColor,
            } as React.CSSProperties}
          >
            {/* Selected checkmark */}
            {isSelected(option.value) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[var(--background)]" />
                </div>
              </motion.div>
            )}

            {/* Label tooltip on hover */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="text-xs text-[var(--text-secondary)] bg-[var(--background-secondary)] px-2 py-1 rounded">
                {option.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Custom color picker */}
      {allowCustom && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-4 border-t border-[var(--background-tertiary)]"
        >
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {showCustom ? '프리셋 색상으로' : '+ 직접 색상 선택하기'}
          </button>

          {showCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex items-center gap-4"
            >
              <div className="relative">
                <input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent"
                />
                {isCustomSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[var(--background)]" />
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value)
                    onChange(e.target.value)
                  }}
                  placeholder="#FFFFFF"
                  className="w-full bg-[var(--background-secondary)] border border-[var(--background-tertiary)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--text-muted)]"
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  HEX 코드를 직접 입력하세요
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}
