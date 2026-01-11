'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
  type?: 'chars' | 'words' | 'lines'
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  type = 'chars',
}: TextRevealProps) {
  const splitText = () => {
    switch (type) {
      case 'chars':
        return children.split('')
      case 'words':
        return children.split(' ')
      case 'lines':
        return children.split('\n')
      default:
        return children.split('')
    }
  }

  const items = splitText()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{
            marginRight: type === 'words' ? '0.25em' : undefined,
            whiteSpace: type === 'chars' ? 'pre' : undefined,
          }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Simple fade up animation component
interface FadeUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeUp({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animation wrapper
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
