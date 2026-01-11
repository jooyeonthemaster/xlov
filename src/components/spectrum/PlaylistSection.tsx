'use client'

import { motion } from 'framer-motion'
import type { Song } from '@/lib/constants/archetype-content'

interface PlaylistSectionProps {
  songs: Song[]
  archetypeName: string
  color?: string
}

export function PlaylistSection({
  songs,
  archetypeName,
  color = '#9B6DFF',
}: PlaylistSectionProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        {/* Playlist Cover */}
        <motion.div
          className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl text-4xl shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}80)`,
          }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          🎵
        </motion.div>

        {/* Playlist Info */}
        <div className="flex-1">
          <h3 className="mb-1 text-2xl font-bold text-white">
            {archetypeName} 플레이리스트
          </h3>
          <p className="text-sm text-white/60">
            당신을 위한 추천 음악 {songs.length}곡
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex -space-x-2">
              {['🎧', '🎸', '🎹', '🎤'].map((icon, i) => (
                <div
                  key={i}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs backdrop-blur-sm"
                >
                  {icon}
                </div>
              ))}
            </div>
            <span className="text-xs text-white/40">
              XLOV 큐레이션 플레이리스트
            </span>
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="space-y-2">
        {songs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              x: 4,
            }}
            className="group flex items-center gap-3 rounded-lg p-3 transition-colors duration-200"
          >
            {/* Track Number */}
            <div className="flex w-8 items-center justify-center text-sm text-white/40 group-hover:text-white/80">
              {index + 1}
            </div>

            {/* Song Info */}
            <div className="flex-1">
              <h4 className="font-medium text-white group-hover:text-white">
                {song.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>{song.artist}</span>
                <span>·</span>
                <span>{song.genre}</span>
              </div>
            </div>

            {/* Mood Tag */}
            <div
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${color}20`,
                color: color,
                border: `1px solid ${color}40`,
              }}
            >
              {song.mood}
            </div>

            {/* Play Icon */}
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 transition-opacity group-hover:opacity-100"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ▶
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="text-sm text-white/60">
          총 재생시간 ~
          {Math.floor(songs.length * 3.5)}분
        </div>
        <motion.button
          className="rounded-full px-6 py-2 text-sm font-medium text-white transition-colors"
          style={{
            backgroundColor: `${color}40`,
            border: `1px solid ${color}60`,
          }}
          whileHover={{
            backgroundColor: `${color}60`,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          전체 재생
        </motion.button>
      </div>
    </div>
  )
}
