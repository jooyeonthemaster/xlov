'use client'

import { motion } from 'framer-motion'
import type {
  Place,
  Activity,
  Gift,
} from '@/lib/constants/archetype-content'

type RecommendationItem = Place | Activity | Gift | { name: string; icon?: string; description?: string }

interface RecommendationGridProps {
  items: RecommendationItem[]
  type: 'places' | 'activities' | 'gifts' | 'content' | 'food'
  columns?: number
  color?: string
}

export function RecommendationGrid({
  items,
  type,
  columns = 3,
  color = '#9B6DFF',
}: RecommendationGridProps) {
  const getItemDisplay = (item: RecommendationItem) => {
    if ('type' in item && type === 'places') {
      // Place type
      const place = item as Place
      return {
        icon: getPlaceIcon(place.type),
        title: place.type,
        subtitle: place.vibe.join(', '),
        description: place.reason,
      }
    } else if ('difficulty' in item && type === 'activities') {
      // Activity type
      const activity = item as Activity
      return {
        icon: activity.icon,
        title: activity.name,
        subtitle: `난이도: ${activity.difficulty} | 사회성: ${activity.social}`,
        description: `에너지: ${activity.energy}`,
        tags: [
          { label: activity.difficulty, color: '#FFE066' },
          { label: `사회성 ${activity.social}`, color: '#4ECDC4' },
          { label: `에너지 ${activity.energy}`, color: '#FF6B9D' },
        ],
      }
    } else if ('item' in item && type === 'gifts') {
      // Gift type
      const gift = item as Gift
      return {
        icon: gift.icon,
        title: gift.item,
        subtitle: '',
        description: gift.reason,
      }
    } else {
      // Generic type
      const generic = item as { name: string; icon?: string; description?: string }
      return {
        icon: generic.icon || '✨',
        title: generic.name,
        subtitle: '',
        description: generic.description || '',
      }
    }
  }

  const getPlaceIcon = (placeType: string): string => {
    const iconMap: Record<string, string> = {
      조용한: '🌙',
      북카페: '📚',
      루프탑: '🌃',
      카페: '☕',
      공원: '🌳',
      미술관: '🎨',
      바: '🍸',
      클럽: '🎵',
      레스토랑: '🍽️',
      default: '📍',
    }
    return iconMap[placeType] || iconMap.default
  }

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 2 ? '280px' : '220px'}, 1fr))`,
      }}
    >
      {items.map((item, index) => {
        const display = getItemDisplay(item)
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            {/* Icon */}
            <div
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl text-3xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                border: `1px solid ${color}30`,
              }}
            >
              {display.icon}
            </div>

            {/* Title */}
            <h4 className="mb-1 font-semibold text-white">{display.title}</h4>

            {/* Subtitle */}
            {display.subtitle && (
              <p className="mb-2 text-xs text-white/60">{display.subtitle}</p>
            )}

            {/* Description */}
            {display.description && (
              <p className="text-sm text-white/80">{display.description}</p>
            )}

            {/* Tags (for activities) */}
            {display.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {display.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded-full px-2 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      border: `1px solid ${tag.color}40`,
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}

            {/* Hover Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
