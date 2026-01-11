'use client'

import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import type { MemberSpectrumProfile } from '@/types/spectrum'
import { SPECTRUM_AXES } from '@/lib/constants'

interface SpectrumRadarProps {
  /** User's spectrum values (0-100 for each axis) */
  userProfile: MemberSpectrumProfile
  /** Optional member profile to compare with */
  memberProfile?: MemberSpectrumProfile
  /** Member name for display */
  memberName?: string
  /** Member color for styling */
  memberColor?: string
  /** Size of the radar chart */
  size?: number
  /** Show axis labels */
  showLabels?: boolean
  /** Animate on mount */
  animated?: boolean
}

// Convert spectrum value (0-100) to coordinates on radar
function getRadarPoint(
  value: number,
  axisIndex: number,
  totalAxes: number,
  radius: number,
  centerX: number,
  centerY: number
): { x: number; y: number } {
  const angle = (Math.PI * 2 * axisIndex) / totalAxes - Math.PI / 2
  const normalizedValue = value / 100
  const x = centerX + radius * normalizedValue * Math.cos(angle)
  const y = centerY + radius * normalizedValue * Math.sin(angle)
  return { x, y }
}

// Generate path string for a profile
function generateProfilePath(
  profile: MemberSpectrumProfile,
  axes: typeof SPECTRUM_AXES,
  radius: number,
  centerX: number,
  centerY: number
): string {
  const axisKeys = axes.map((a) => a.id) as (keyof MemberSpectrumProfile)[]
  const points = axisKeys.map((key, index) => {
    const value = profile[key]
    return getRadarPoint(value, index, axes.length, radius, centerX, centerY)
  })

  return (
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  )
}

export function SpectrumRadar({
  userProfile,
  memberProfile,
  memberName,
  memberColor = '#C9A962',
  size = 300,
  showLabels = true,
  animated = true,
}: SpectrumRadarProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const userPathRef = useRef<SVGPathElement>(null)
  const memberPathRef = useRef<SVGPathElement>(null)

  const padding = 85
  const radius = (size - padding * 2) / 2
  const centerX = size / 2
  const centerY = size / 2

  // Generate grid circles
  const gridLevels = [25, 50, 75, 100]

  // Memoize paths
  const userPath = useMemo(
    () =>
      generateProfilePath(userProfile, SPECTRUM_AXES, radius, centerX, centerY),
    [userProfile, radius, centerX, centerY]
  )

  const memberPath = useMemo(
    () =>
      memberProfile
        ? generateProfilePath(
          memberProfile,
          SPECTRUM_AXES,
          radius,
          centerX,
          centerY
        )
        : '',
    [memberProfile, radius, centerX, centerY]
  )

  useEffect(() => {
    if (!animated || !svgRef.current) return

    const ctx = gsap.context(() => {
      // Animate user path
      if (userPathRef.current) {
        const pathLength = userPathRef.current.getTotalLength()
        gsap.set(userPathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })
        gsap.to(userPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 0.5,
          ease: 'power2.out',
        })
        gsap.to(userPathRef.current, {
          fillOpacity: 0.2,
          duration: 0.5,
          delay: 1.5,
        })
      }

      // Animate member path
      if (memberPathRef.current) {
        const pathLength = memberPathRef.current.getTotalLength()
        gsap.set(memberPathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })
        gsap.to(memberPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 0.8,
          ease: 'power2.out',
        })
        gsap.to(memberPathRef.current, {
          fillOpacity: 0.15,
          duration: 0.5,
          delay: 1.8,
        })
      }
    }, svgRef)

    return () => ctx.revert()
  }, [animated, userPath, memberPath])

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {/* Background glow */}
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 10}
            fill="url(#radarGlow)"
          />

          {/* Grid circles */}
          {gridLevels.map((level) => (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={(radius * level) / 100}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {SPECTRUM_AXES.map((axis, index) => {
            const angle =
              (Math.PI * 2 * index) / SPECTRUM_AXES.length - Math.PI / 2
            const endX = centerX + radius * Math.cos(angle)
            const endY = centerY + radius * Math.sin(angle)

            return (
              <line
                key={axis.id}
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            )
          })}

          {/* Member profile (if provided) - behind user */}
          {memberProfile && (
            <motion.path
              ref={memberPathRef}
              d={memberPath}
              fill={memberColor}
              fillOpacity={0}
              stroke={memberColor}
              strokeWidth="2"
              strokeOpacity={0.6}
              filter="url(#glow)"
            />
          )}

          {/* User profile */}
          <motion.path
            ref={userPathRef}
            d={userPath}
            fill="white"
            fillOpacity={0}
            stroke="white"
            strokeWidth="2.5"
            filter="url(#glow)"
          />

          {/* Axis points - user */}
          {SPECTRUM_AXES.map((axis, index) => {
            const value = userProfile[axis.id as keyof MemberSpectrumProfile]
            const point = getRadarPoint(
              value,
              index,
              SPECTRUM_AXES.length,
              radius,
              centerX,
              centerY
            )

            return (
              <motion.circle
                key={`user-${axis.id}`}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="white"
                initial={animated ? { scale: 0, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
                filter="url(#glow)"
              />
            )
          })}

          {/* Axis points - member (if provided) */}
          {memberProfile &&
            SPECTRUM_AXES.map((axis, index) => {
              const value =
                memberProfile[axis.id as keyof MemberSpectrumProfile]
              const point = getRadarPoint(
                value,
                index,
                SPECTRUM_AXES.length,
                radius,
                centerX,
                centerY
              )

              return (
                <motion.circle
                  key={`member-${axis.id}`}
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill={memberColor}
                  initial={animated ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.3 }}
                  filter="url(#glow)"
                />
              )
            })}
        </svg>

        {/* Axis labels */}
        {showLabels &&
          SPECTRUM_AXES.map((axis, index) => {
            const angle =
              (Math.PI * 2 * index) / SPECTRUM_AXES.length - Math.PI / 2
            const labelRadius = radius + 45
            const x = centerX + labelRadius * Math.cos(angle)
            const y = centerY + labelRadius * Math.sin(angle)

            // Determine which side of the label (left/right icon)
            const userValue =
              userProfile[axis.id as keyof MemberSpectrumProfile]
            const isLeftSide = userValue < 50

            return (
              <div
                key={axis.id}
                className="absolute"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.div
                  initial={animated ? { opacity: 0, scale: 0.8 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  {/* Icons */}
                  <div className="mb-1 flex items-center gap-2 text-lg">
                    <span
                      className={`transition-opacity ${isLeftSide ? 'opacity-100' : 'opacity-30'}`}
                    >
                      {axis.leftIcon}
                    </span>
                    <span className="text-[10px] text-white/30">|</span>
                    <span
                      className={`transition-opacity ${!isLeftSide ? 'opacity-100' : 'opacity-30'}`}
                    >
                      {axis.rightIcon}
                    </span>
                  </div>

                  {/* Label */}
                  <span className="whitespace-nowrap text-xs font-medium text-white/70">
                    {axis.label}
                  </span>

                  {/* Value indicator */}
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-white/40">
                    <span className={isLeftSide ? 'text-white/60' : ''}>
                      {axis.leftLabel}
                    </span>
                    <span>→</span>
                    <span className={!isLeftSide ? 'text-white/60' : ''}>
                      {axis.rightLabel}
                    </span>
                  </div>
                </motion.div>
              </div>
            )
          })}

        {/* Legend */}
        {memberProfile && memberName && (
          <motion.div
            initial={animated ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-[11px] font-medium tracking-tight text-white/60">
                당신
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                style={{
                  backgroundColor: memberColor,
                  boxShadow: `0 0 8px ${memberColor}80`,
                }}
              />
              <span className="text-[11px] font-medium tracking-tight text-white/60">
                {memberName}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>

  )
}
