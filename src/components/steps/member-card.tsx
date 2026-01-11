'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Member } from '@/types'
import { cn } from '@/lib/utils'

interface MemberCardProps {
  member: Member
  isSelected: boolean
  onSelect: () => void
  index: number
}

export function MemberCard({ member, isSelected, onSelect, index }: MemberCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      onClick={onSelect}
      className={cn(
        'relative group w-full aspect-[3/4] rounded-2xl overflow-hidden',
        'border-2 transition-all duration-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isSelected
          ? 'border-current scale-[1.02]'
          : 'border-transparent hover:border-[var(--text-muted)]/30'
      )}
      style={{
        borderColor: isSelected ? member.accentColor : undefined,
        boxShadow: isSelected ? `0 0 40px ${member.accentColor}30` : undefined,
      }}
      whileHover={{ scale: isSelected ? 1.02 : 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Member Image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        <Image
          src={member.placeholderImage}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${member.accentColor}20 0%, transparent 50%, ${member.accentColor}10 100%)`,
          }}
        />
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />

      {/* Member info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.div
          animate={{ y: isSelected ? -8 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="font-korean text-2xl font-medium text-[var(--text-primary)] mb-1">
            {member.name}
          </h3>
          <p
            className="text-sm tracking-widest uppercase"
            style={{ color: member.accentColor }}
          >
            {member.englishName}
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {member.description}
          </p>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${member.accentColor}30, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected ? 1 : 0 }}
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.4 }}
      />

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 right-4"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: member.accentColor }}
          >
            <svg
              className="w-5 h-5 text-[var(--background)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </motion.button>
  )
}
