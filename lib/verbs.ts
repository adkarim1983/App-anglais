export type VerbCategory = 'action' | 'communication' | 'thinking' | 'creation' | 'learning' | 'business'

export interface Verb {
  id: number
  english: string
  french: string
  present: string
  past: string
  future: string
  presentPerfect: string
  example: string
  category: VerbCategory
  difficulty: 'easy' | 'medium' | 'hard'
}

import { ALL_VERBS } from './verbs-data'

/**
 * Get random verbs from the collection, avoiding already learned ones
 * @param count Number of verbs to return
 * @param excludeIds IDs of verbs to exclude
 * @param category Optional category filter
 * @returns Array of random verbs
 */
export function getRandomVerbs(count: number, excludeIds: number[] = [], category?: VerbCategory): Verb[] {
  // Filtrer les verbes déjà appris et par catégorie
  let availableVerbs = ALL_VERBS.filter(verb => !excludeIds.includes(verb.id))
  
  if (category) {
    availableVerbs = availableVerbs.filter(verb => verb.category === category)
  }
  
  // Si pas assez de verbes disponibles, inclure tous les verbes
  const verbsToUse = availableVerbs.length >= count ? availableVerbs : ALL_VERBS
  
  // Mélanger et retourner
  const shuffled = [...verbsToUse].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * Get all verbs
 */
export function getAllVerbs(): Verb[] {
  return ALL_VERBS
}

/**
 * Get verb by ID
 */
export function getVerbById(id: number): Verb | undefined {
  return ALL_VERBS.find(verb => verb.id === id)
}

/**
 * Get verbs by category
 */
export function getVerbsByCategory(category: VerbCategory): Verb[] {
  return ALL_VERBS.filter(verb => verb.category === category)
}

/**
 * Get verbs by difficulty
 */
export function getVerbsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Verb[] {
  return ALL_VERBS.filter(verb => verb.difficulty === difficulty)
}

/**
 * Get category label in French
 */
export function getCategoryLabel(category: VerbCategory): string {
  const labels: Record<VerbCategory, string> = {
    action: 'Action',
    communication: 'Communication',
    thinking: 'Réflexion',
    creation: 'Création',
    learning: 'Apprentissage',
    business: 'Business'
  }
  return labels[category]
}

/**
 * Fetch verbs from the API
 * @param count Number of verbs to fetch
 * @param excludeIds IDs of verbs to exclude
 * @param category Optional category filter
 * @returns Promise resolving to array of verbs
 */
export async function fetchVerbs(count: number, excludeIds: number[] = [], category?: VerbCategory): Promise<Verb[]> {
  try {
    // Appeler l'API
    const params = new URLSearchParams({ count: count.toString() })
    if (excludeIds.length > 0) {
      params.append('exclude', excludeIds.join(','))
    }
    if (category) {
      params.append('category', category)
    }
    
    const response = await fetch(`/api/verbs?${params}`)
    if (!response.ok) {
      throw new Error('Failed to fetch verbs')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching verbs, using local data:', error)
    // Fallback sur les données locales
    return getRandomVerbs(count, excludeIds, category)
  }
}
