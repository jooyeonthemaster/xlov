'use client'

import { useMobile } from '@/hooks/use-mobile'

export function NoiseOverlay() {
  const { isMobile } = useMobile()

  // 모바일에서는 노이즈 오버레이 완전히 비활성화 (성능 최적화)
  if (isMobile) {
    return null
  }

  return <div className="noise-overlay" aria-hidden="true" />
}
