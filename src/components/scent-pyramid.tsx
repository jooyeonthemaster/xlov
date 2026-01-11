'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import type { ScentNote, ScentRecipe } from '@/types/scent'

interface ScentPyramidProps {
  recipe: ScentRecipe
  showDetails?: boolean
  animated?: boolean
}

interface NoteRowProps {
  notes: ScentNote[]
  layer: 'top' | 'middle' | 'base'
  index: number
  showDetails: boolean
}

const LAYER_CONFIG = {
  top: {
    label: 'TOP',
    labelKo: '탑 노트',
    description: '첫인상의 향',
    duration: '0-30분',
    width: 'w-[60%]',
    gradient: 'from-white/20 to-white/5',
    delay: 0.3,
  },
  middle: {
    label: 'MIDDLE',
    labelKo: '미들 노트',
    description: '성격을 형성하는 향',
    duration: '30분-4시간',
    width: 'w-[80%]',
    gradient: 'from-white/15 to-white/5',
    delay: 0.5,
  },
  base: {
    label: 'BASE',
    labelKo: '베이스 노트',
    description: '여운으로 남는 향',
    duration: '4시간+',
    width: 'w-full',
    gradient: 'from-white/10 to-white/5',
    delay: 0.7,
  },
}

function NoteRow({ notes, layer, index, showDetails }: NoteRowProps) {
  const config = LAYER_CONFIG[layer]
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rowRef.current) return

    const ctx = gsap.context(() => {
      // Animate note circles on hover
      const noteCircles = rowRef.current?.querySelectorAll('.note-circle')
      noteCircles?.forEach((circle) => {
        gsap.set(circle, { scale: 1 })
      })
    }, rowRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: config.delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${config.width} mx-auto`}
    >
      {/* Layer container */}
      <div
        className={`relative rounded-2xl border border-white/10 bg-gradient-to-b ${config.gradient} p-4 backdrop-blur-sm md:p-6`}
      >
        {/* Layer label */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] text-white/40 uppercase">
              {config.label}
            </span>
            {showDetails && (
              <span className="ml-2 text-xs text-white/30">
                {config.labelKo}
              </span>
            )}
          </div>
          {showDetails && (
            <span className="text-xs text-white/30">{config.duration}</span>
          )}
        </div>

        {/* Notes */}
        <div className="flex flex-wrap justify-center gap-3">
          {notes.map((note, noteIndex) => (
            <motion.div
              key={note.nameEn}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: config.delay + noteIndex * 0.1,
                duration: 0.4,
                ease: 'backOut',
              }}
              className="note-circle group relative"
            >
              {/* Note circle with color and intensity */}
              <div
                className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${note.color}80, ${note.color}40)`,
                  boxShadow: `0 0 20px ${note.color}30, inset 0 0 20px ${note.color}20`,
                }}
              >
                {/* Intensity ring */}
                <svg
                  className="absolute inset-0 h-full w-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke={note.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: note.intensity / 100 }}
                    transition={{
                      delay: config.delay + noteIndex * 0.1 + 0.3,
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                    style={{
                      strokeDasharray: '289',
                      strokeDashoffset: '289',
                    }}
                  />
                </svg>

                {/* Intensity percentage */}
                <span className="text-xs font-medium text-white/80">
                  {note.intensity}%
                </span>
              </div>

              {/* Note name tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-lg bg-black/80 px-3 py-1.5 text-xs backdrop-blur-sm">
                  <span className="text-white">{note.name}</span>
                  <span className="ml-1 text-white/50">{note.nameEn}</span>
                </div>
              </div>

              {/* Note name below (always visible) */}
              <div className="mt-2 text-center">
                <span className="text-xs text-white/60">{note.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Layer description */}
        {showDetails && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: config.delay + 0.5 }}
            className="mt-4 text-center text-xs text-white/40"
          >
            {config.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

export function ScentPyramid({
  recipe,
  showDetails = true,
  animated = true,
}: ScentPyramidProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="w-full space-y-4">
      {/* Header */}
      <motion.div
        initial={animated ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h3 className="mb-1 text-xl font-bold text-white md:text-2xl">
          {recipe.name}
        </h3>
        <p className="text-sm text-white/50">{recipe.description}</p>
      </motion.div>

      {/* Pyramid layers */}
      <div className="relative space-y-3 py-6">
        {/* Decorative vertical line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* TOP notes */}
        <NoteRow
          notes={recipe.top}
          layer="top"
          index={0}
          showDetails={showDetails}
        />

        {/* MIDDLE notes */}
        <NoteRow
          notes={recipe.middle}
          layer="middle"
          index={1}
          showDetails={showDetails}
        />

        {/* BASE notes */}
        <NoteRow
          notes={recipe.base}
          layer="base"
          index={2}
          showDetails={showDetails}
        />
      </div>

      {/* Mood tags */}
      {recipe.mood && recipe.mood.length > 0 && (
        <motion.div
          initial={animated ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {recipe.mood.map((tag, index) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      )}

      {/* Season & Time */}
      {(recipe.season || recipe.timeOfDay) && (
        <motion.div
          initial={animated ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex justify-center gap-4 text-xs text-white/40"
        >
          {recipe.season && <span>🍂 {recipe.season}</span>}
          {recipe.timeOfDay && <span>🕐 {recipe.timeOfDay}</span>}
        </motion.div>
      )}
    </div>
  )
}
