// Structure générique pour le vocabulaire (verbes, adjectifs, adverbes, expressions)

export type VocabularyType = 'verb' | 'adjective' | 'adverb' | 'expression'

export type VocabularyCategory = 'action' | 'communication' | 'thinking' | 'creation' | 'learning' | 'business' | 'description' | 'emotion' | 'time' | 'manner' | 'frequency' | 'common'

export interface VocabularyItem {
  id: number
  type: VocabularyType
  english: string
  french: string
  category: VocabularyCategory
  difficulty: 'easy' | 'medium' | 'hard'
  example: string
  exampleFr?: string
  
  // Pour les verbes
  present?: string
  past?: string
  future?: string
  presentPerfect?: string
  isIrregular?: boolean
  pastParticiple?: string
  
  // Pour les adjectifs
  comparative?: string // ex: bigger
  superlative?: string // ex: biggest
  opposite?: string // antonyme
  
  // Pour les adverbes
  relatedAdjective?: string // adjectif lié
  
  // Commun à tous
  synonyms?: string[]
  antonyms?: string[]
  idioms?: { english: string; french: string }[]
  businessContext?: string
  notes?: string
}

// Alias pour compatibilité
export type Verb = VocabularyItem
