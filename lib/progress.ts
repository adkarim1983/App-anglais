// Gestion de la progression de l'utilisateur avec localStorage

export interface UserProgress {
  learnedVerbIds: number[]
  favoriteVerbIds: number[]
  lastStudyDate: string
  totalVerbsLearned: number
  streak: number
  dailyGoal: number
  dailyProgress: number
  studyHistory: Record<string, number> // date -> nombre de verbes étudiés
}

const STORAGE_KEY = 'daily-verbs-progress'

/**
 * Récupère la progression de l'utilisateur depuis localStorage
 */
export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return getDefaultProgress()
    }
    
    const progress = JSON.parse(stored) as UserProgress
    
    // Migration: Ajouter les nouveaux champs s'ils n'existent pas
    if (!progress.favoriteVerbIds) {
      progress.favoriteVerbIds = []
    }
    if (!progress.dailyGoal) {
      progress.dailyGoal = 10
    }
    if (!progress.dailyProgress) {
      progress.dailyProgress = 0
    }
    if (!progress.studyHistory) {
      progress.studyHistory = {}
    }
    
    return progress
  } catch (error) {
    console.error('Error loading progress:', error)
    return getDefaultProgress()
  }
}

/**
 * Sauvegarde la progression de l'utilisateur
 */
export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

/**
 * Marque un verbe comme appris
 */
export function markVerbAsLearned(verbId: number): UserProgress {
  const progress = getUserProgress()
  const today = new Date().toISOString().split('T')[0]
  
  // S'assurer que studyHistory existe
  if (!progress.studyHistory) {
    progress.studyHistory = {}
  }
  
  if (!progress.learnedVerbIds.includes(verbId)) {
    progress.learnedVerbIds.push(verbId)
    progress.totalVerbsLearned = progress.learnedVerbIds.length
    
    // Mettre à jour la progression quotidienne
    if (!progress.studyHistory[today]) {
      progress.studyHistory[today] = 0
    }
    progress.studyHistory[today] += 1
    progress.dailyProgress = progress.studyHistory[today]
    
    // Mettre à jour la série (streak)
    const lastDate = progress.lastStudyDate
    
    if (lastDate) {
      const daysDiff = getDaysDifference(lastDate, today)
      if (daysDiff === 1) {
        progress.streak += 1
      } else if (daysDiff > 1) {
        progress.streak = 1
      }
    } else {
      progress.streak = 1
    }
    
    progress.lastStudyDate = today
    saveUserProgress(progress)
  }
  
  return progress
}

/**
 * Ajoute/retire un verbe des favoris
 */
export function toggleFavorite(verbId: number): UserProgress {
  const progress = getUserProgress()
  
  const index = progress.favoriteVerbIds.indexOf(verbId)
  if (index > -1) {
    progress.favoriteVerbIds.splice(index, 1)
  } else {
    progress.favoriteVerbIds.push(verbId)
  }
  
  saveUserProgress(progress)
  return progress
}

/**
 * Vérifie si un verbe est favori
 */
export function isFavorite(verbId: number): boolean {
  return getUserProgress().favoriteVerbIds.includes(verbId)
}

/**
 * Obtient les IDs des verbes favoris
 */
export function getFavoriteVerbIds(): number[] {
  return getUserProgress().favoriteVerbIds
}

/**
 * Définit l'objectif quotidien
 */
export function setDailyGoal(goal: number): UserProgress {
  const progress = getUserProgress()
  progress.dailyGoal = goal
  saveUserProgress(progress)
  return progress
}

/**
 * Obtient la progression quotidienne
 */
export function getDailyProgress(): { current: number; goal: number; percentage: number } {
  const progress = getUserProgress()
  const today = new Date().toISOString().split('T')[0]
  
  // S'assurer que studyHistory existe
  if (!progress.studyHistory) {
    progress.studyHistory = {}
  }
  
  const current = progress.studyHistory[today] || 0
  const goal = progress.dailyGoal || 10
  const percentage = goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0
  
  return { current, goal, percentage }
}

/**
 * Réinitialise la progression quotidienne (appelé automatiquement chaque jour)
 */
export function resetDailyProgress(): void {
  const progress = getUserProgress()
  const today = new Date().toISOString().split('T')[0]
  
  if (progress.lastStudyDate !== today) {
    progress.dailyProgress = 0
  }
  
  saveUserProgress(progress)
}

/**
 * Réinitialise la progression
 */
export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Obtient les IDs des verbes déjà appris
 */
export function getLearnedVerbIds(): number[] {
  return getUserProgress().learnedVerbIds
}

/**
 * Vérifie si un verbe a été appris
 */
export function isVerbLearned(verbId: number): boolean {
  return getUserProgress().learnedVerbIds.includes(verbId)
}

/**
 * Obtient l'historique d'étude
 */
export function getStudyHistory(): Record<string, number> {
  const progress = getUserProgress()
  return progress.studyHistory || {}
}

/**
 * Progression par défaut
 */
function getDefaultProgress(): UserProgress {
  return {
    learnedVerbIds: [],
    favoriteVerbIds: [],
    lastStudyDate: '',
    totalVerbsLearned: 0,
    streak: 0,
    dailyGoal: 10,
    dailyProgress: 0,
    studyHistory: {},
  }
}

/**
 * Calcule la différence en jours entre deux dates
 */
function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
