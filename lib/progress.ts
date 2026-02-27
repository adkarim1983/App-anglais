// Gestion de la progression de l'utilisateur avec localStorage

export interface UserProgress {
  learnedVerbIds: number[]
  favoriteVerbIds: number[]
  masteredIds: number[] // IDs des items maîtrisés ✅
  toReviewIds: number[] // IDs des items à revoir 🔁
  lastStudyDate: string
  totalVerbsLearned: number
  streak: number
  dailyGoal: number
  dailyProgress: number
  studyHistory: Record<string, number> // date -> nombre de verbes étudiés
  verbsByDate: Record<string, number[]> // date -> IDs des verbes appris ce jour
  quizCompleted: number // Nombre de quiz complétés
  quizPerfectScores: number // Nombre de quiz avec 100%
  totalStudyTime: number // Temps d'étude total en minutes
  challenges: Record<string, boolean> // Défis quotidiens complétés
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
    if (!progress.masteredIds) {
      progress.masteredIds = []
    }
    if (!progress.toReviewIds) {
      progress.toReviewIds = []
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
    if (!progress.verbsByDate) {
      progress.verbsByDate = {}
    }
    if (progress.quizCompleted === undefined) {
      progress.quizCompleted = 0
    }
    if (progress.quizPerfectScores === undefined) {
      progress.quizPerfectScores = 0
    }
    if (progress.totalStudyTime === undefined) {
      progress.totalStudyTime = 0
    }
    if (!progress.challenges) {
      progress.challenges = {}
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
  
  // S'assurer que studyHistory et verbsByDate existent
  if (!progress.studyHistory) {
    progress.studyHistory = {}
  }
  if (!progress.verbsByDate) {
    progress.verbsByDate = {}
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
    
    // Ajouter le verbe à la liste des verbes appris aujourd'hui
    if (!progress.verbsByDate[today]) {
      progress.verbsByDate[today] = []
    }
    if (!progress.verbsByDate[today].includes(verbId)) {
      progress.verbsByDate[today].push(verbId)
    }
    
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
 * Obtient les verbes appris à une date donnée
 */
export function getVerbsByDate(date: string): number[] {
  const progress = getUserProgress()
  if (!progress.verbsByDate) {
    return []
  }
  return progress.verbsByDate[date] || []
}

/**
 * Obtient l'historique d'étude
 */
export function getStudyHistory(): Record<string, number> {
  const progress = getUserProgress()
  return progress.studyHistory || {}
}

/**
 * Obtient tous les verbes par date
 */
export function getAllVerbsByDate(): Record<string, number[]> {
  const progress = getUserProgress()
  return progress.verbsByDate || {}
}

/**
 * Enregistrer la complétion d'un quiz
 */
export function recordQuizCompletion(score: number, totalQuestions: number): UserProgress {
  const progress = getUserProgress()
  progress.quizCompleted += 1
  
  if (score === totalQuestions) {
    progress.quizPerfectScores += 1
  }
  
  saveUserProgress(progress)
  return progress
}

/**
 * Ajouter du temps d'étude
 */
export function addStudyTime(minutes: number): UserProgress {
  const progress = getUserProgress()
  progress.totalStudyTime += minutes
  saveUserProgress(progress)
  return progress
}

/**
 * Marquer un défi comme complété
 */
export function completeChallenge(challengeId: string): UserProgress {
  const progress = getUserProgress()
  const today = new Date().toISOString().split('T')[0]
  const key = `${today}-${challengeId}`
  progress.challenges[key] = true
  saveUserProgress(progress)
  return progress
}

/**
 * Vérifier si un défi est complété aujourd'hui
 */
export function isChallengeCompleted(challengeId: string): boolean {
  const progress = getUserProgress()
  const today = new Date().toISOString().split('T')[0]
  const key = `${today}-${challengeId}`
  return progress.challenges[key] || false
}

/**
 * Obtenir les statistiques complètes
 */
export function getCompleteStats(): {
  totalVerbs: number
  streak: number
  quizCompleted: number
  quizPerfectScores: number
  totalStudyTime: number
  averageDaily: number
  masteredVerbs: number
} {
  const progress = getUserProgress()
  const history = progress.studyHistory || {}
  const days = Object.keys(history).length
  const averageDaily = days > 0 ? Math.round(progress.totalVerbsLearned / days) : 0
  
  return {
    totalVerbs: progress.totalVerbsLearned,
    streak: progress.streak,
    quizCompleted: progress.quizCompleted || 0,
    quizPerfectScores: progress.quizPerfectScores || 0,
    totalStudyTime: progress.totalStudyTime || 0,
    averageDaily,
    masteredVerbs: 0 // Sera calculé depuis spaced-repetition
  }
}

/**
 * Progression par défaut
 */
function getDefaultProgress(): UserProgress {
  return {
    learnedVerbIds: [],
    favoriteVerbIds: [],
    masteredIds: [],
    toReviewIds: [],
    lastStudyDate: '',
    totalVerbsLearned: 0,
    streak: 0,
    dailyGoal: 10,
    dailyProgress: 0,
    studyHistory: {},
    verbsByDate: {},
    quizCompleted: 0,
    quizPerfectScores: 0,
    totalStudyTime: 0,
    challenges: {},
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

/**
 * Marque un item comme maîtrisé
 */
export function markAsMastered(itemId: number): UserProgress {
  const progress = getUserProgress()
  
  // Ajouter à masteredIds si pas déjà présent
  if (!progress.masteredIds.includes(itemId)) {
    progress.masteredIds.push(itemId)
  }
  
  // Retirer de toReviewIds si présent
  progress.toReviewIds = progress.toReviewIds.filter(id => id !== itemId)
  
  saveUserProgress(progress)
  return progress
}

/**
 * Marque un item comme à revoir
 */
export function markToReview(itemId: number): UserProgress {
  const progress = getUserProgress()
  
  // Ajouter à toReviewIds si pas déjà présent
  if (!progress.toReviewIds.includes(itemId)) {
    progress.toReviewIds.push(itemId)
  }
  
  // Retirer de masteredIds si présent
  progress.masteredIds = progress.masteredIds.filter(id => id !== itemId)
  
  saveUserProgress(progress)
  return progress
}

/**
 * Vérifie si un item est maîtrisé
 */
export function isMastered(itemId: number): boolean {
  const progress = getUserProgress()
  return progress.masteredIds.includes(itemId)
}

/**
 * Vérifie si un item est à revoir
 */
export function isToReview(itemId: number): boolean {
  const progress = getUserProgress()
  return progress.toReviewIds.includes(itemId)
}

/**
 * Obtient tous les IDs des items maîtrisés
 */
export function getMasteredIds(): number[] {
  const progress = getUserProgress()
  return progress.masteredIds
}

/**
 * Obtient tous les IDs des items à revoir
 */
export function getToReviewIds(): number[] {
  const progress = getUserProgress()
  return progress.toReviewIds
}

/**
 * Retire les statuts maîtrisé/à revoir d'un item
 */
export function clearItemStatus(itemId: number): UserProgress {
  const progress = getUserProgress()
  
  progress.masteredIds = progress.masteredIds.filter(id => id !== itemId)
  progress.toReviewIds = progress.toReviewIds.filter(id => id !== itemId)
  
  saveUserProgress(progress)
  return progress
}
