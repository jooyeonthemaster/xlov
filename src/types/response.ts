export interface FanResponse {
  id: string
  member: string
  color: string
  season: string
  timeOfDay: string
  texture: string
  emotion: string
  oneWord: string
  generatedImageUrl?: string
  createdAt: string
}

export interface ResponseData {
  color: string
  season: string
  timeOfDay: string
  texture: string
  emotion: string
  oneWord: string
}

export interface AggregatedData {
  member: string
  topColors: { value: string; count: number }[]
  topSeasons: { value: string; count: number }[]
  topTextures: { value: string; count: number }[]
  topEmotions: { value: string; count: number }[]
  totalResponses: number
  aggregatedImageUrl?: string
  updatedAt: string
}

export interface MemberSelfDefinition {
  member: string
  color: string
  season: string
  timeOfDay: string
  texture: string
  emotion: string
  oneWord: string
  imageUrl?: string
}
