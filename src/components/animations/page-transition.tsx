'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { useMobile } from '@/hooks/use-mobile'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const { isMobile } = useMobile()

  // 모바일: 애니메이션 없이 렌더링
  if (isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

// Slide transition variant
const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
}

interface SlideTransitionProps {
  children: ReactNode
  direction?: number
  className?: string
  keyProp?: string | number
}

export function SlideTransition({
  children,
  direction = 1,
  className = '',
  keyProp,
}: SlideTransitionProps) {
  const { isMobile } = useMobile()

  // 모바일: AnimatePresence 없이 단순 렌더링
  if (isMobile) {
    return <div key={keyProp} className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={keyProp}
        className={className}
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Scale fade transition
const scaleFadeVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function ScaleFadeTransition({
  children,
  className = '',
  keyProp,
}: {
  children: ReactNode
  className?: string
  keyProp?: string | number
}) {
  const { isMobile } = useMobile()

  // 모바일: AnimatePresence 없이 단순 렌더링
  if (isMobile) {
    return <div key={keyProp} className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyProp}
        className={className}
        variants={scaleFadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
