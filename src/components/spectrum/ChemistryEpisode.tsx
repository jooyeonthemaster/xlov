'use client'

import { motion } from 'framer-motion'

interface ChemistryEpisodeProps {
  title: string
  description: string
  memberColor: string
  icon?: string
  delay?: number
}

export function ChemistryEpisode({
  title,
  description,
  memberColor,
  icon,
  delay = 0,
}: ChemistryEpisodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-0 flex h-full flex-col items-center">
        <motion.div
          className="z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg shadow-lg"
          style={{
            backgroundColor: memberColor,
            boxShadow: `0 0 20px ${memberColor}40`,
          }}
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon || '💫'}
        </motion.div>
        <div
          className="mt-2 w-0.5 flex-1 opacity-30"
          style={{ backgroundColor: memberColor }}
        />
      </div>

      {/* Content Card */}
      <div className="ml-16">
        <motion.div
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          whileHover={{ x: 4 }}
        >
          {/* Title */}
          <h3
            className="mb-4 text-xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${memberColor}, white)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <div className="relative rounded-xl bg-white/5 p-4">
            <p className="leading-relaxed text-white/90">{description}</p>

            {/* Decorative Corner */}
            <div
              className="absolute right-0 top-0 h-20 w-20 opacity-10"
              style={{
                background: `radial-gradient(circle at top right, ${memberColor}, transparent 70%)`,
              }}
            />
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            className="mt-4 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
            style={{ backgroundColor: memberColor }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
