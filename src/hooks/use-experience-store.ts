'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ScentRecipe } from '@/types/scent'
import type {
  SpectrumResult,
  SpectrumAnswers,
  PersonalityAnalysis,
} from '@/types/spectrum'
import type { MirrorResult, StyleIntensity } from '@/types/mirror'

// ============================================
// Canvas Program State
// ============================================
interface CanvasState {
  selectedMember: string | null
  responses: Record<string, string>
  currentStep: number
  generatedImageUrl: string | null
  generatedScent: ScentRecipe | null
}

// ============================================
// Spectrum Program State
// ============================================
interface SpectrumState {
  currentQuestion: number
  answers: SpectrumAnswers
  result: SpectrumResult | null
  generatedScent: ScentRecipe | null
  personality: PersonalityAnalysis | null
}

// ============================================
// Mirror Program State
// ============================================
interface MirrorState {
  selectedMember: string | null
  selfieUrl: string | null
  styleIntensity: StyleIntensity
  currentStep: number
  result: MirrorResult | null
  generatedScent: ScentRecipe | null
}

// ============================================
// Global State
// ============================================
interface GlobalState {
  currentProgram: 'canvas' | 'spectrum' | 'mirror' | null
  isGenerating: boolean
  error: string | null
}

// ============================================
// Combined Experience State
// ============================================
interface ExperienceState extends GlobalState {
  canvas: CanvasState
  spectrum: SpectrumState
  mirror: MirrorState

  // Global actions
  setCurrentProgram: (program: 'canvas' | 'spectrum' | 'mirror' | null) => void
  setIsGenerating: (value: boolean) => void
  setError: (error: string | null) => void
  resetAll: () => void

  // Canvas actions
  setCanvasMember: (member: string) => void
  setCanvasResponse: (questionId: string, value: string) => void
  getCanvasResponse: (questionId: string) => string | undefined
  setCanvasStep: (step: number) => void
  nextCanvasStep: () => void
  prevCanvasStep: () => void
  setCanvasImageUrl: (url: string) => void
  setCanvasScent: (scent: ScentRecipe) => void
  resetCanvas: () => void

  // Spectrum actions
  setSpectrumQuestion: (index: number) => void
  setSpectrumAnswer: (questionId: string, value: number) => void
  nextSpectrumQuestion: () => void
  prevSpectrumQuestion: () => void
  setSpectrumResult: (result: SpectrumResult) => void
  setSpectrumScent: (scent: ScentRecipe) => void
  setSpectrumPersonality: (personality: PersonalityAnalysis) => void
  resetSpectrum: () => void

  // Mirror actions
  setMirrorMember: (member: string) => void
  setMirrorSelfie: (url: string) => void
  setMirrorStyleIntensity: (intensity: StyleIntensity) => void
  setMirrorStep: (step: number) => void
  nextMirrorStep: () => void
  prevMirrorStep: () => void
  setMirrorResult: (result: MirrorResult) => void
  setMirrorScent: (scent: ScentRecipe) => void
  resetMirror: () => void
}

// ============================================
// Initial States
// ============================================
const initialCanvasState: CanvasState = {
  selectedMember: null,
  responses: {},
  currentStep: 0,
  generatedImageUrl: null,
  generatedScent: null,
}

const initialSpectrumState: SpectrumState = {
  currentQuestion: 0,
  answers: {},
  result: null,
  generatedScent: null,
  personality: null,
}

const initialMirrorState: MirrorState = {
  selectedMember: null,
  selfieUrl: null,
  styleIntensity: 'medium',
  currentStep: 0,
  result: null,
  generatedScent: null,
}

const initialGlobalState: GlobalState = {
  currentProgram: null,
  isGenerating: false,
  error: null,
}

// ============================================
// Store Implementation
// ============================================
export const useExperienceStore = create<ExperienceState>()(
  persist(
    (set, get) => ({
      // Initial states
      ...initialGlobalState,
      canvas: { ...initialCanvasState },
      spectrum: { ...initialSpectrumState },
      mirror: { ...initialMirrorState },

      // ========== Global Actions ==========
      setCurrentProgram: (program) => set({ currentProgram: program }),
      setIsGenerating: (value) => set({ isGenerating: value }),
      setError: (error) => set({ error }),
      resetAll: () =>
        set({
          ...initialGlobalState,
          canvas: { ...initialCanvasState },
          spectrum: { ...initialSpectrumState },
          mirror: { ...initialMirrorState },
        }),

      // ========== Canvas Actions ==========
      setCanvasMember: (member) =>
        set((state) => ({
          canvas: { ...state.canvas, selectedMember: member },
        })),
      setCanvasResponse: (questionId, value) =>
        set((state) => ({
          canvas: {
            ...state.canvas,
            responses: { ...state.canvas.responses, [questionId]: value },
          },
        })),
      getCanvasResponse: (questionId) => get().canvas.responses[questionId],
      setCanvasStep: (step) =>
        set((state) => ({
          canvas: { ...state.canvas, currentStep: step },
        })),
      nextCanvasStep: () =>
        set((state) => ({
          canvas: { ...state.canvas, currentStep: state.canvas.currentStep + 1 },
        })),
      prevCanvasStep: () =>
        set((state) => ({
          canvas: {
            ...state.canvas,
            currentStep: Math.max(0, state.canvas.currentStep - 1),
          },
        })),
      setCanvasImageUrl: (url) =>
        set((state) => ({
          canvas: { ...state.canvas, generatedImageUrl: url },
        })),
      setCanvasScent: (scent) =>
        set((state) => ({
          canvas: { ...state.canvas, generatedScent: scent },
        })),
      resetCanvas: () =>
        set((state) => ({
          canvas: { ...initialCanvasState },
          currentProgram: state.currentProgram,
        })),

      // ========== Spectrum Actions ==========
      setSpectrumQuestion: (index) =>
        set((state) => ({
          spectrum: { ...state.spectrum, currentQuestion: index },
        })),
      setSpectrumAnswer: (questionId, value) =>
        set((state) => ({
          spectrum: {
            ...state.spectrum,
            answers: { ...state.spectrum.answers, [questionId]: value },
          },
        })),
      nextSpectrumQuestion: () =>
        set((state) => ({
          spectrum: {
            ...state.spectrum,
            currentQuestion: state.spectrum.currentQuestion + 1,
          },
        })),
      prevSpectrumQuestion: () =>
        set((state) => ({
          spectrum: {
            ...state.spectrum,
            currentQuestion: Math.max(0, state.spectrum.currentQuestion - 1),
          },
        })),
      setSpectrumResult: (result) =>
        set((state) => ({
          spectrum: { ...state.spectrum, result },
        })),
      setSpectrumScent: (scent) =>
        set((state) => ({
          spectrum: { ...state.spectrum, generatedScent: scent },
        })),
      setSpectrumPersonality: (personality) =>
        set((state) => ({
          spectrum: { ...state.spectrum, personality },
        })),
      resetSpectrum: () =>
        set((state) => ({
          spectrum: { ...initialSpectrumState },
          currentProgram: state.currentProgram,
        })),

      // ========== Mirror Actions ==========
      setMirrorMember: (member) =>
        set((state) => ({
          mirror: { ...state.mirror, selectedMember: member },
        })),
      setMirrorSelfie: (url) =>
        set((state) => ({
          mirror: { ...state.mirror, selfieUrl: url },
        })),
      setMirrorStyleIntensity: (intensity) =>
        set((state) => ({
          mirror: { ...state.mirror, styleIntensity: intensity },
        })),
      setMirrorStep: (step) =>
        set((state) => ({
          mirror: { ...state.mirror, currentStep: step },
        })),
      nextMirrorStep: () =>
        set((state) => ({
          mirror: { ...state.mirror, currentStep: state.mirror.currentStep + 1 },
        })),
      prevMirrorStep: () =>
        set((state) => ({
          mirror: {
            ...state.mirror,
            currentStep: Math.max(0, state.mirror.currentStep - 1),
          },
        })),
      setMirrorResult: (result) =>
        set((state) => ({
          mirror: { ...state.mirror, result },
        })),
      setMirrorScent: (scent) =>
        set((state) => ({
          mirror: { ...state.mirror, generatedScent: scent },
        })),
      resetMirror: () =>
        set((state) => ({
          mirror: { ...initialMirrorState },
          currentProgram: state.currentProgram,
        })),
    }),
    {
      name: 'xlov-experience-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentProgram: state.currentProgram,
        canvas: state.canvas,
        spectrum: state.spectrum,
        mirror: state.mirror,
      }),
    }
  )
)

// ============================================
// Selector Hooks for Better Performance
// ============================================

// Global selectors
export const useCurrentProgram = () =>
  useExperienceStore((state) => state.currentProgram)
export const useIsGenerating = () =>
  useExperienceStore((state) => state.isGenerating)
export const useError = () => useExperienceStore((state) => state.error)

// Canvas selectors
export const useCanvasState = () => useExperienceStore((state) => state.canvas)
export const useCanvasMember = () =>
  useExperienceStore((state) => state.canvas.selectedMember)
export const useCanvasResponses = () =>
  useExperienceStore((state) => state.canvas.responses)
export const useCanvasStep = () =>
  useExperienceStore((state) => state.canvas.currentStep)
export const useCanvasImage = () =>
  useExperienceStore((state) => state.canvas.generatedImageUrl)
export const useCanvasScent = () =>
  useExperienceStore((state) => state.canvas.generatedScent)

// Spectrum selectors
export const useSpectrumState = () =>
  useExperienceStore((state) => state.spectrum)
export const useSpectrumQuestion = () =>
  useExperienceStore((state) => state.spectrum.currentQuestion)
export const useSpectrumAnswers = () =>
  useExperienceStore((state) => state.spectrum.answers)
export const useSpectrumResult = () =>
  useExperienceStore((state) => state.spectrum.result)
export const useSpectrumScent = () =>
  useExperienceStore((state) => state.spectrum.generatedScent)
export const useSpectrumPersonality = () =>
  useExperienceStore((state) => state.spectrum.personality)

// Mirror selectors
export const useMirrorState = () => useExperienceStore((state) => state.mirror)
export const useMirrorMember = () =>
  useExperienceStore((state) => state.mirror.selectedMember)
export const useMirrorSelfie = () =>
  useExperienceStore((state) => state.mirror.selfieUrl)
export const useMirrorIntensity = () =>
  useExperienceStore((state) => state.mirror.styleIntensity)
export const useMirrorStep = () =>
  useExperienceStore((state) => state.mirror.currentStep)
export const useMirrorResult = () =>
  useExperienceStore((state) => state.mirror.result)
export const useMirrorScent = () =>
  useExperienceStore((state) => state.mirror.generatedScent)

// Legacy compatibility exports (for existing Canvas code)
export const useSelectedMember = useCanvasMember
export const useResponses = useCanvasResponses
export const useCurrentStep = useCanvasStep
export const useGeneratedImage = useCanvasImage
