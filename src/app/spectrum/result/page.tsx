'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  useExperienceStore,
  useSpectrumResult,
  useSpectrumScent,
  useSpectrumPersonality,
} from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { MEMBER_SPECTRUM_PROFILES } from '@/lib/constants/spectrum-questions'
import { ARCHETYPE_CONTENT } from '@/lib/constants/archetype-content'
import { getInsightForAxis } from '@/lib/constants/personality-insights'
import { SpectrumRadar } from '@/components/spectrum-radar'
import { ScentPyramid } from '@/components/scent-pyramid'
import { MemberMatchBar } from '@/components/member-match-bar'
import {
  PersonalityInsightCard,
  StrengthBadge,
  ScenarioCard,
  ChemistryEpisode,
  FanReaction,
  PlaylistSection,
  RecommendationGrid,
  RelationshipMatrix,
} from '@/components/spectrum'
import { Button } from '@/components/ui/button'
import { ArrowRight, RotateCcw, Sparkles, Users, Gift } from 'lucide-react'
import type { MemberSpectrumProfile } from '@/types/spectrum'

const SPECTRUM_COLOR = '#9B6DFF'

type TabType = 'profile' | 'match' | 'recommend' | 'scent'

export default function SpectrumResultPage() {
  const router = useRouter()
  const result = useSpectrumResult()
  const scent = useSpectrumScent()
  const personality = useSpectrumPersonality()
  const { resetSpectrum } = useExperienceStore()

  const [activeTab, setActiveTab] = useState<TabType>('profile')

  // Map archetype name to key for content lookup
  const getArchetypeKey = (archetypeName: string) => {
    const nameToKey: Record<string, keyof typeof ARCHETYPE_CONTENT> = {
      '고요한 안개': 'quiet_mist',
      '따스한 안개': 'warm_mist',
      '빛나는 용암': 'blazing_lava',
      '고요한 얼음': 'quiet_ice',
      '반짝이는 파도': 'sparkling_wave',
      '조화로운 무지개': 'balanced_rainbow',
      '신비로운 오로라': 'default',
    }
    return nameToKey[archetypeName] || 'default'
  }

  useEffect(() => {
    if (!result) {
      router.push('/spectrum/questions')
    }
  }, [result, router])

  const handleTryAgain = () => {
    resetSpectrum()
    router.push('/hub')
  }

  const handleComplete = () => {
    router.push('/closing')
  }

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-[var(--text-muted)]">
          결과를 불러오는 중...
        </div>
      </div>
    )
  }

  // Get soul mate member info
  const soulMateMember = MEMBERS.find(
    (m) => m.id === result.memberMatch.soulMate.memberId
  )
  const soulMateProfile = soulMateMember
    ? MEMBER_SPECTRUM_PROFILES[soulMateMember.id]
    : undefined

  // Build user profile for radar
  const userProfile: MemberSpectrumProfile = {
    light: result.axes.find((a) => a.id === 'light')?.value || 50,
    temperature: result.axes.find((a) => a.id === 'temperature')?.value || 50,
    texture: result.axes.find((a) => a.id === 'texture')?.value || 50,
    time: result.axes.find((a) => a.id === 'time')?.value || 50,
  }

  // Convert member matches for MemberMatchBar (percentage -> similarity)
  const memberMatches = [
    {
      memberId: result.memberMatch.soulMate.memberId,
      similarity: result.memberMatch.soulMate.percentage,
      reason: result.memberMatch.soulMate.reason,
    },
    {
      memberId: result.memberMatch.hidden.memberId,
      similarity: result.memberMatch.hidden.percentage,
      reason: result.memberMatch.hidden.reason,
    },
    {
      memberId: result.memberMatch.opposite.memberId,
      similarity: result.memberMatch.opposite.percentage,
      reason: result.memberMatch.opposite.reason,
    },
  ]

  // Add missing members
  MEMBERS.forEach((member) => {
    if (!memberMatches.find((m) => m.memberId === member.id)) {
      memberMatches.push({
        memberId: member.id,
        similarity: 50,
        reason: '',
      })
    }
  })

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em]"
            style={{
              backgroundColor: `${SPECTRUM_COLOR}20`,
              color: SPECTRUM_COLOR,
            }}
          >
            SPECTRUM RESULT
          </span>

          <h1 className="font-korean mb-4 text-3xl font-medium md:text-4xl lg:text-5xl">
            당신은{' '}
            <span className="relative inline-block">
              <span style={{ color: SPECTRUM_COLOR }}>
                {result.archetype.emoji} {result.archetype.name}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-1 left-0 h-0.5 w-full origin-left"
                style={{ backgroundColor: SPECTRUM_COLOR }}
              />
            </span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)]">
            {result.archetype.description}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-8 flex max-w-2xl justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-1"
        >
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'profile'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
              }`}
          >
            스펙트럼
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'match'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
              }`}
          >
            <Users className="h-4 w-4" />
            매칭
          </button>
          <button
            onClick={() => setActiveTab('recommend')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'recommend'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
              }`}
          >
            <Gift className="h-4 w-4" />
            추천
          </button>
          <button
            onClick={() => setActiveTab('scent')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${activeTab === 'scent'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
              }`}
          >
            <Sparkles className="h-4 w-4" />
            향
          </button>
        </motion.div>

        {/* Content Area */}
        <div className="mx-auto max-w-4xl">
          {/* Profile Tab - Radar Chart */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Radar Chart */}
              <div className="relative mb-16">
                <SpectrumRadar
                  userProfile={userProfile}
                  memberProfile={soulMateProfile}
                  memberName={soulMateMember?.name}
                  memberColor={soulMateMember?.accentColor || SPECTRUM_COLOR}
                  size={360}
                  showLabels
                  animated
                />
              </div>

              {/* Axis Details */}
              <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
                {result.axes.map((axis, index) => (
                  <motion.div
                    key={axis.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{axis.leftIcon}</span>
                        <span className="text-sm font-medium text-white/80">
                          {axis.label}
                        </span>
                        <span>{axis.rightIcon}</span>
                      </div>
                      <span
                        className="font-mono text-sm"
                        style={{ color: SPECTRUM_COLOR }}
                      >
                        {axis.value}
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${axis.value}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: SPECTRUM_COLOR }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-white/40">
                      <span>{axis.leftLabel}</span>
                      <span>{axis.rightLabel}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 🆕 4축 상세 해석 */}
              <div className="mt-16 w-full max-w-3xl space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8 text-center text-2xl font-bold text-white"
                >
                  📊 나의 성격 DNA
                </motion.h2>
                {result.axes.map((axis, index) => (
                  <PersonalityInsightCard
                    key={axis.id}
                    axis={axis}
                    insight={getInsightForAxis(axis.id, axis.value)}
                    delay={0.7 + index * 0.1}
                  />
                ))}
              </div>

              {/* 🆕 강점 & 약점 */}
              <div className="mt-16 w-full max-w-3xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mb-8 text-center text-2xl font-bold text-white"
                >
                  🎯 당신의 강점 & 약점
                </motion.h2>
                <StrengthBadge
                  strengths={ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.strengths || []}
                  weaknesses={ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.weaknesses || []}
                />
              </div>

              {/* 🆕 4가지 시나리오 (AI 생성) */}
              {personality?.scenarios && (
                <div className="mt-16 w-full max-w-3xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="mb-8 text-center text-2xl font-bold text-white"
                  >
                    💡 이런 상황에서는...
                  </motion.h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ScenarioCard
                      title="갈등 상황"
                      icon="⚡"
                      description={personality.scenarios.conflict}
                      delay={1.4}
                      accentColor={SPECTRUM_COLOR}
                    />
                    <ScenarioCard
                      title="스트레스 받을 때"
                      icon="😤"
                      description={personality.scenarios.stress}
                      delay={1.5}
                      accentColor={SPECTRUM_COLOR}
                    />
                    <ScenarioCard
                      title="새로운 도전"
                      icon="🚀"
                      description={personality.scenarios.challenge}
                      delay={1.6}
                      accentColor={SPECTRUM_COLOR}
                    />
                    <ScenarioCard
                      title="휴식이 필요할 때"
                      icon="🌙"
                      description={personality.scenarios.rest}
                      delay={1.7}
                      accentColor={SPECTRUM_COLOR}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Match Tab */}
          {activeTab === 'match' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Soul Mate Section */}
              {soulMateMember && (
                <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 text-sm text-white/60">
                    <span className="text-lg">💫</span>
                    <span>Soul Mate</span>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Member Image */}
                    <div className="relative h-24 w-24 overflow-hidden rounded-full">
                      <Image
                        src={soulMateMember.placeholderImage}
                        alt={soulMateMember.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: soulMateMember.accentColor }}
                      />
                    </div>

                    {/* Member Info */}
                    <div className="flex-1">
                      <h3
                        className="mb-1 text-2xl font-bold"
                        style={{ color: soulMateMember.accentColor }}
                      >
                        {soulMateMember.name}
                      </h3>
                      <p className="mb-2 text-sm text-white/60">
                        {soulMateMember.englishName}
                      </p>
                      <p className="text-sm text-white/80">
                        {result.memberMatch.soulMate.reason}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${result.memberMatch.soulMate.percentage}%`,
                            }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: soulMateMember.accentColor,
                            }}
                          />
                        </div>
                        <span
                          className="font-mono text-sm font-bold"
                          style={{ color: soulMateMember.accentColor }}
                        >
                          {result.memberMatch.soulMate.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* All Members Match */}
              <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <MemberMatchBar
                  matches={memberMatches}
                  showPercentage
                  animated
                  highlightBest
                />
              </div>

              {/* 🆕 Soul mate 케미 스토리 (AI 생성) */}
              {personality?.chemistry && soulMateMember && (
                <div className="mx-auto max-w-2xl">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6 text-center text-xl font-bold text-white"
                  >
                    💫 왜 우리가 잘 맞을까?
                  </motion.h3>
                  <div className="space-y-6">
                    <ChemistryEpisode
                      title="함께 여행 간다면?"
                      description={personality.chemistry.travel}
                      memberColor={soulMateMember.accentColor}
                      icon="✈️"
                      delay={0.5}
                    />
                    <ChemistryEpisode
                      title="같이 일한다면?"
                      description={personality.chemistry.work}
                      memberColor={soulMateMember.accentColor}
                      icon="💼"
                      delay={0.6}
                    />
                    <ChemistryEpisode
                      title="힘들 때?"
                      description={personality.chemistry.support}
                      memberColor={soulMateMember.accentColor}
                      icon="🤝"
                      delay={0.7}
                    />
                  </div>
                </div>
              )}

              {/* 🆕 팬 반응 */}
              <div className="mx-auto mt-12 max-w-2xl">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6 text-center text-xl font-bold text-white"
                >
                  💬 팬들의 반응
                </motion.h3>
                <div className="space-y-3">
                  <FanReaction
                    reaction={`완전 소울메이트 ㅋㅋㅋ 나도 ${soulMateMember?.name}랑 똑같이 나옴`}
                    username="XLOV 팬 1"
                    delay={0.9}
                  />
                  <FanReaction
                    reaction="아 진짜 이거 신기해 ㅠㅠ 성격 분석 완전 정확함"
                    username="XLOV 팬 2"
                    delay={1.0}
                  />
                  <FanReaction
                    reaction={`${result.archetype.emoji} ${result.archetype.name} 나온 사람 손 🙋‍♀️`}
                    username="XLOV 팬 3"
                    delay={1.1}
                  />
                  <FanReaction
                    reaction="이거 친구한테도 공유했어요! 다같이 해보니까 재밌음 ㅋㅋ"
                    username="XLOV 팬 4"
                    delay={1.2}
                  />
                </div>
              </div>

              {/* Hidden Connection & Opposite */}
              <div className="mx-auto mt-12 grid max-w-xl grid-cols-2 gap-4">
                {/* Hidden Connection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
                    <span>🔮</span>
                    <span>Hidden Connection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: `${MEMBERS.find((m) => m.id === result.memberMatch.hidden.memberId)?.accentColor}30`,
                        color: MEMBERS.find(
                          (m) => m.id === result.memberMatch.hidden.memberId
                        )?.accentColor,
                      }}
                    >
                      {MEMBERS.find(
                        (m) => m.id === result.memberMatch.hidden.memberId
                      )?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {
                          MEMBERS.find(
                            (m) => m.id === result.memberMatch.hidden.memberId
                          )?.name
                        }
                      </p>
                      <p className="text-xs text-white/50">
                        {result.memberMatch.hidden.percentage}% 유사도
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Opposite Energy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
                    <span>⚡</span>
                    <span>Opposite Energy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: `${MEMBERS.find((m) => m.id === result.memberMatch.opposite.memberId)?.accentColor}30`,
                        color: MEMBERS.find(
                          (m) => m.id === result.memberMatch.opposite.memberId
                        )?.accentColor,
                      }}
                    >
                      {MEMBERS.find(
                        (m) => m.id === result.memberMatch.opposite.memberId
                      )?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {
                          MEMBERS.find(
                            (m) => m.id === result.memberMatch.opposite.memberId
                          )?.name
                        }
                      </p>
                      <p className="text-xs text-white/50">
                        {result.memberMatch.opposite.percentage}% 유사도
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* 🆕 NEW Tab 3: Recommend */}
          {activeTab === 'recommend' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {/* 추천 플레이리스트 */}
              <div className="mx-auto max-w-3xl">
                <PlaylistSection
                  songs={ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.playlist || []}
                  archetypeName={result.archetype.name}
                  color={SPECTRUM_COLOR}
                />
              </div>

              {/* 추천 장소 */}
              <div className="mx-auto max-w-4xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 text-center text-2xl font-bold text-white"
                >
                  📍 추천 데이트 스팟
                </motion.h2>
                <RecommendationGrid
                  items={ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.places || []}
                  type="places"
                  columns={2}
                  color={SPECTRUM_COLOR}
                />
              </div>

              {/* 추천 활동 */}
              <div className="mx-auto max-w-4xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 text-center text-2xl font-bold text-white"
                >
                  🎨 추천 취미 & 활동
                </motion.h2>
                <RecommendationGrid
                  items={ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.activities || []}
                  type="activities"
                  columns={3}
                  color={SPECTRUM_COLOR}
                />
              </div>

              {/* 추천 콘텐츠 */}
              <div className="mx-auto max-w-3xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 text-center text-2xl font-bold text-white"
                >
                  🎬 추천 콘텐츠
                </motion.h2>
                <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  {/* Movies */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                      <span>🎥</span>
                      <span>영화 & 드라마</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.content.movies.map((movie, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
                        >
                          {movie}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Books */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                      <span>📚</span>
                      <span>책</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.content.books.map((book, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
                        >
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* YouTube */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                      <span>📺</span>
                      <span>유튜브</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.content.youtubeTypes.map((type, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 추천 선물 */}
              <div className="mx-auto max-w-4xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 text-center text-2xl font-bold text-white"
                >
                  🎁 받으면 좋을 선물
                </motion.h2>
                <RecommendationGrid
                  items={ARCHETYPE_CONTENT[getArchetypeKey(result.archetype.name)]?.gifts || []}
                  type="gifts"
                  columns={3}
                  color={SPECTRUM_COLOR}
                />
              </div>

              {/* 아키타입 관계 매트릭스 */}
              <div className="mx-auto max-w-5xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8 text-center text-2xl font-bold text-white"
                >
                  🌟 아키타입 궁합표
                </motion.h2>
                <RelationshipMatrix
                  userArchetype={result.archetype.name}
                  color={SPECTRUM_COLOR}
                />
              </div>
            </motion.div>
          )}

          {/* Scent Tab */}
          {activeTab === 'scent' && scent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
            >
              <ScentPyramid recipe={scent} showDetails animated />
            </motion.div>
          )}

          {/* No scent fallback */}
          {activeTab === 'scent' && !scent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-white/30" />
              <p className="text-white/50">향 레시피를 불러오지 못했습니다</p>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button variant="ghost" onClick={handleTryAgain} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            다른 체험하기
          </Button>

          <Button
            variant="primary"
            onClick={handleComplete}
            className="gap-2"
            style={{ backgroundColor: SPECTRUM_COLOR }}
          >
            완료하기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
