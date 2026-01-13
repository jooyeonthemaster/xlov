'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useMobile } from '@/hooks/use-mobile'

interface Option {
  value: string
  label: string
  description?: string
  emoji?: string
  imageSrc?: string
}

interface OptionSelectorProps {
  options: Option[]
  value?: string
  onChange: (value: string) => void
  memberColor?: string
  columns?: 2 | 3 | 4
}

export function OptionSelector({
  options,
  value,
  onChange,
  memberColor = 'var(--member-umuti)',
  columns = 2,
}: OptionSelectorProps) {
  const { isMobile } = useMobile()

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  // 모바일: 애니메이션 없이 렌더링
  if (isMobile) {
    return (
      <div className={cn('grid gap-3', gridCols[columns])}>
        {options.map((option) => {
          const isSelected = value === option.value

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                'relative p-4 rounded-xl text-left transition-colors duration-200 overflow-hidden',
                'border-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isSelected
                  ? 'bg-[var(--background-secondary)] border-current'
                  : 'bg-[var(--background-secondary)]/50 border-transparent'
              )}
              style={{
                borderColor: isSelected ? memberColor : undefined,
              }}
            >
              {/* Background Image */}
              {option.imageSrc && (
                <>
                  <Image
                    src={option.imageSrc}
                    alt={option.label}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                </>
              )}

              <div className="relative z-10">
                {/* Selected indicator */}
                {isSelected && (
                  <div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: memberColor }}
                  >
                    <Check className="w-3 h-3 text-[var(--background)]" />
                  </div>
                )}

                {/* Emoji */}
                {option.emoji && !option.imageSrc && (
                  <span className="text-2xl mb-2 block">{option.emoji}</span>
                )}

                {/* Label */}
                <h3
                  className={cn(
                    'text-base font-medium font-korean',
                    isSelected || option.imageSrc
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)]'
                  )}
                >
                  {option.label}
                </h3>

                {/* Description */}
                {option.description && (
                  <p
                    className={cn(
                      'mt-1 text-xs',
                      option.imageSrc
                        ? 'text-gray-300'
                        : 'text-[var(--text-muted)]'
                    )}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  // 데스크톱: 기존 애니메이션
  return (
    <div className={cn('grid gap-4', gridCols[columns])}>
      {options.map((option, index) => {
        const isSelected = value === option.value

        return (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative group p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden',
              'border-2 hover:scale-[1.02]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isSelected
                ? 'bg-[var(--background-secondary)] border-current'
                : 'bg-[var(--background-secondary)]/50 border-transparent hover:border-[var(--text-muted)]/30'
            )}
            style={{
              borderColor: isSelected ? memberColor : undefined,
              boxShadow: isSelected ? `0 0 30px ${memberColor}20` : undefined,
            }}
          >
            {/* Background Image */}
            {option.imageSrc && (
              <>
                <Image
                  src={option.imageSrc}
                  alt={option.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              </>
            )}

            <div className="relative z-10">
              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: memberColor }}
                >
                  <Check className="w-4 h-4 text-[var(--background)]" />
                </motion.div>
              )}

              {/* Emoji */}
              {option.emoji && !option.imageSrc && (
                <span className="text-3xl mb-3 block">{option.emoji}</span>
              )}

              {/* Label */}
              <h3
                className={cn(
                  'text-lg font-medium font-korean transition-colors',
                  isSelected || option.imageSrc
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                )}
              >
                {option.label}
              </h3>

              {/* Description */}
              {option.description && (
                <p
                  className={cn(
                    'mt-1 text-sm',
                    option.imageSrc
                      ? 'text-gray-300'
                      : 'text-[var(--text-muted)]'
                  )}
                >
                  {option.description}
                </p>
              )}
            </div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              style={{
                background: `radial-gradient(circle at 50% 100%, ${memberColor}10, transparent 70%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isSelected ? 1 : 0 }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        )
      })}
    </div>
  )
}
