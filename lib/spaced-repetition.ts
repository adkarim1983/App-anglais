// Système de répétition espacée (Spaced Repetition System)

export interface VerbReview {
  verbId: number
  lastReviewed: string // ISO date
  nextReview: string // ISO date
  reviewCount: number
  easeFactor: number // 1.3 à 2.5 (difficulté perçue)
  interval: number // Jours avant prochaine révision
}

export interface ReviewSession {
  verbId: number
  date: string
  quality: number // 0-5 (0 = échec total, 5 = parfait)
}

const STORAGE_KEY = 'verb-reviews'
const SESSIONS_KEY = 'review-sessions'

/**
 * Obtenir toutes les révisions
 */
export function getAllReviews(): Record<number, VerbReview> {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * Sauvegarder les révisions
 */
function saveReviews(reviews: Record<number, VerbReview>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
}

/**
 * Obtenir les verbes à réviser aujourd'hui
 */
export function getVerbsDueForReview(): number[] {
  const reviews = getAllReviews()
  const today = new Date().toISOString().split('T')[0]
  
  return Object.values(reviews)
    .filter(review => review.nextReview <= today)
    .map(review => review.verbId)
}

/**
 * Calculer le prochain intervalle selon l'algorithme SM-2
 */
function calculateNextInterval(
  quality: number,
  interval: number,
  easeFactor: number,
  reviewCount: number
): { newInterval: number; newEaseFactor: number } {
  // Ajuster le facteur de facilité
  let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  
  if (newEaseFactor < 1.3) newEaseFactor = 1.3
  if (newEaseFactor > 2.5) newEaseFactor = 2.5
  
  // Calculer le nouvel intervalle
  let newInterval: number
  
  if (quality < 3) {
    // Échec - recommencer
    newInterval = 1
  } else {
    if (reviewCount === 0) {
      newInterval = 1
    } else if (reviewCount === 1) {
      newInterval = 6
    } else {
      newInterval = Math.round(interval * newEaseFactor)
    }
  }
  
  return { newInterval, newEaseFactor }
}

/**
 * Enregistrer une session de révision
 */
export function recordReview(verbId: number, quality: number): VerbReview {
  const reviews = getAllReviews()
  const today = new Date().toISOString().split('T')[0]
  
  const existingReview = reviews[verbId] || {
    verbId,
    lastReviewed: today,
    nextReview: today,
    reviewCount: 0,
    easeFactor: 2.5,
    interval: 0
  }
  
  const { newInterval, newEaseFactor } = calculateNextInterval(
    quality,
    existingReview.interval,
    existingReview.easeFactor,
    existingReview.reviewCount
  )
  
  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval)
  
  const updatedReview: VerbReview = {
    verbId,
    lastReviewed: today,
    nextReview: nextReviewDate.toISOString().split('T')[0],
    reviewCount: quality >= 3 ? existingReview.reviewCount + 1 : 0,
    easeFactor: newEaseFactor,
    interval: newInterval
  }
  
  reviews[verbId] = updatedReview
  saveReviews(reviews)
  
  // Enregistrer la session
  recordSession({ verbId, date: today, quality })
  
  return updatedReview
}

/**
 * Enregistrer une session
 */
function recordSession(session: ReviewSession): void {
  if (typeof window === 'undefined') return
  
  try {
    const stored = localStorage.getItem(SESSIONS_KEY)
    const sessions: ReviewSession[] = stored ? JSON.parse(stored) : []
    sessions.push(session)
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  } catch (error) {
    console.error('Error recording session:', error)
  }
}

/**
 * Obtenir les statistiques de révision
 */
export function getReviewStats(): {
  totalReviews: number
  dueToday: number
  averageEaseFactor: number
  masteredVerbs: number // reviewCount >= 5
} {
  const reviews = getAllReviews()
  const reviewsArray = Object.values(reviews)
  const dueToday = getVerbsDueForReview().length
  
  const totalReviews = reviewsArray.reduce((sum, r) => sum + r.reviewCount, 0)
  const averageEaseFactor = reviewsArray.length > 0
    ? reviewsArray.reduce((sum, r) => sum + r.easeFactor, 0) / reviewsArray.length
    : 2.5
  const masteredVerbs = reviewsArray.filter(r => r.reviewCount >= 5).length
  
  return {
    totalReviews,
    dueToday,
    averageEaseFactor,
    masteredVerbs
  }
}
