'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MemberCard } from '@/components/steps/member-card'
import { Button } from '@/components/ui/button'
import { useExperienceStore, useCanvasMember } from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function SelectPage() {
  const router = useRouter()
  const selectedMember = useCanvasMember()
  const { setCanvasMember } = useExperienceStore()
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const selectedMemberData = MEMBERS.find((m) => m.id === selectedMember)

  const handleContinue = () => {
    if (selectedMember) {
      router.push(`/canvas/questions/${selectedMember}`)
    }
  }

  const handleBack = () => {
    router.push('/hub')
  }

  return (
    <div className="min-h-screen px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-[var(--text-muted)] uppercase mb-4 block">
            Step 1 of 3
          </span>
          <h1 className="font-korean text-4xl md:text-5xl lg:text-6xl font-medium mb-4">
            당신의 멤버를 선택하세요
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
            누구의 새로운 모습을 발견하고 싶나요?
          </p>
        </motion.div>

        {/* Member Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {MEMBERS.map((member, index) => (
            <div
              key={member.id}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <MemberCard
                member={member}
                isSelected={selectedMember === member.id}
                onSelect={() => setCanvasMember(member.id)}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Selected Member Info */}
        {selectedMemberData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-[var(--text-secondary)]">
              <span
                className="font-medium"
                style={{ color: selectedMemberData.accentColor }}
              >
                {selectedMemberData.name}
              </span>
              의 새로운 모습을 만들어볼까요?
            </p>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center max-w-2xl mx-auto"
        >
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            처음으로
          </Button>

          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!selectedMember}
            className="gap-2 min-w-[140px]"
            style={{
              backgroundColor: selectedMemberData?.accentColor || undefined,
            }}
          >
            다음
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
