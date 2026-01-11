export type QuestionType = 'color-picker' | 'single-select' | 'text-input'

export interface QuestionOption {
  value: string
  label: string
  description?: string
  emoji?: string
  imageSrc?: string
}

export interface Question {
  id: string
  type: QuestionType
  order: number
  title: string
  subtitle: string
  description: string
  options?: QuestionOption[]
  allowCustom?: boolean
  placeholder?: string
  maxLength?: number
}
