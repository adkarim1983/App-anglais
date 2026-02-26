// Système de badges et récompenses

export interface Badge {
  id: string
  name: string
  nameFr: string
  description: string
  descriptionFr: string
  icon: string
  requirement: number
  category: 'streak' | 'verbs' | 'quiz' | 'mastery' | 'special'
  unlocked: boolean
  unlockedDate?: string
}

export interface UserLevel {
  level: number
  name: string
  nameFr: string
  minVerbs: number
  maxVerbs: number
}

const BADGES_KEY = 'user-badges'

const ALL_BADGES: Omit<Badge, 'unlocked' | 'unlockedDate'>[] = [
  // Badges de série
  { id: 'streak-3', name: 'Getting Started', nameFr: 'Bon Départ', description: '3 days streak', descriptionFr: '3 jours consécutifs', icon: '🔥', requirement: 3, category: 'streak' },
  { id: 'streak-7', name: 'Week Warrior', nameFr: 'Guerrier Hebdomadaire', description: '7 days streak', descriptionFr: '7 jours consécutifs', icon: '⚡', requirement: 7, category: 'streak' },
  { id: 'streak-14', name: 'Two Weeks Champion', nameFr: 'Champion Bi-hebdomadaire', description: '14 days streak', descriptionFr: '14 jours consécutifs', icon: '💪', requirement: 14, category: 'streak' },
  { id: 'streak-30', name: 'Monthly Master', nameFr: 'Maître Mensuel', description: '30 days streak', descriptionFr: '30 jours consécutifs', icon: '🏆', requirement: 30, category: 'streak' },
  { id: 'streak-100', name: 'Century Legend', nameFr: 'Légende du Siècle', description: '100 days streak', descriptionFr: '100 jours consécutifs', icon: '👑', requirement: 100, category: 'streak' },
  
  // Badges de verbes appris
  { id: 'verbs-10', name: 'First Steps', nameFr: 'Premiers Pas', description: '10 verbs learned', descriptionFr: '10 verbes appris', icon: '📚', requirement: 10, category: 'verbs' },
  { id: 'verbs-50', name: 'Vocabulary Builder', nameFr: 'Bâtisseur de Vocabulaire', description: '50 verbs learned', descriptionFr: '50 verbes appris', icon: '📖', requirement: 50, category: 'verbs' },
  { id: 'verbs-100', name: 'Word Collector', nameFr: 'Collectionneur de Mots', description: '100 verbs learned', descriptionFr: '100 verbes appris', icon: '🎓', requirement: 100, category: 'verbs' },
  { id: 'verbs-200', name: 'Language Expert', nameFr: 'Expert Linguistique', description: '200 verbs learned', descriptionFr: '200 verbes appris', icon: '🌟', requirement: 200, category: 'verbs' },
  { id: 'verbs-500', name: 'Polyglot Master', nameFr: 'Maître Polyglotte', description: '500 verbs learned', descriptionFr: '500 verbes appris', icon: '💎', requirement: 500, category: 'verbs' },
  
  // Badges de quiz
  { id: 'quiz-10', name: 'Quiz Novice', nameFr: 'Novice des Quiz', description: '10 quizzes completed', descriptionFr: '10 quiz complétés', icon: '🎯', requirement: 10, category: 'quiz' },
  { id: 'quiz-50', name: 'Quiz Expert', nameFr: 'Expert des Quiz', description: '50 quizzes completed', descriptionFr: '50 quiz complétés', icon: '🎪', requirement: 50, category: 'quiz' },
  { id: 'quiz-perfect', name: 'Perfect Score', nameFr: 'Score Parfait', description: 'Get 100% in a quiz', descriptionFr: 'Obtenir 100% dans un quiz', icon: '💯', requirement: 1, category: 'quiz' },
  
  // Badges de maîtrise
  { id: 'mastery-5', name: 'Quick Learner', nameFr: 'Apprenant Rapide', description: '5 verbs mastered', descriptionFr: '5 verbes maîtrisés', icon: '🚀', requirement: 5, category: 'mastery' },
  { id: 'mastery-20', name: 'Master Student', nameFr: 'Étudiant Maître', description: '20 verbs mastered', descriptionFr: '20 verbes maîtrisés', icon: '🎖️', requirement: 20, category: 'mastery' },
  { id: 'mastery-50', name: 'Fluency Champion', nameFr: 'Champion de Fluidité', description: '50 verbs mastered', descriptionFr: '50 verbes maîtrisés', icon: '🏅', requirement: 50, category: 'mastery' },
  
  // Badges spéciaux
  { id: 'special-early-bird', name: 'Early Bird', nameFr: 'Lève-tôt', description: 'Study before 8 AM', descriptionFr: 'Étudier avant 8h', icon: '🌅', requirement: 1, category: 'special' },
  { id: 'special-night-owl', name: 'Night Owl', nameFr: 'Oiseau de Nuit', description: 'Study after 10 PM', descriptionFr: 'Étudier après 22h', icon: '🦉', requirement: 1, category: 'special' },
  { id: 'special-weekend', name: 'Weekend Warrior', nameFr: 'Guerrier du Week-end', description: 'Study on weekend', descriptionFr: 'Étudier le week-end', icon: '🎉', requirement: 1, category: 'special' },
]

const LEVELS: UserLevel[] = [
  { level: 1, name: 'Beginner', nameFr: 'Débutant', minVerbs: 0, maxVerbs: 19 },
  { level: 2, name: 'Elementary', nameFr: 'Élémentaire', minVerbs: 20, maxVerbs: 49 },
  { level: 3, name: 'Intermediate', nameFr: 'Intermédiaire', minVerbs: 50, maxVerbs: 99 },
  { level: 4, name: 'Upper Intermediate', nameFr: 'Intermédiaire Avancé', minVerbs: 100, maxVerbs: 199 },
  { level: 5, name: 'Advanced', nameFr: 'Avancé', minVerbs: 200, maxVerbs: 399 },
  { level: 6, name: 'Proficient', nameFr: 'Compétent', minVerbs: 400, maxVerbs: 699 },
  { level: 7, name: 'Expert', nameFr: 'Expert', minVerbs: 700, maxVerbs: 999 },
  { level: 8, name: 'Master', nameFr: 'Maître', minVerbs: 1000, maxVerbs: Infinity },
]

/**
 * Obtenir les badges de l'utilisateur
 */
export function getUserBadges(): Badge[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(BADGES_KEY)
    if (!stored) {
      return ALL_BADGES.map(b => ({ ...b, unlocked: false }))
    }
    return JSON.parse(stored)
  } catch {
    return ALL_BADGES.map(b => ({ ...b, unlocked: false }))
  }
}

/**
 * Sauvegarder les badges
 */
function saveBadges(badges: Badge[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges))
}

/**
 * Vérifier et débloquer les badges
 */
export function checkAndUnlockBadges(stats: {
  streak: number
  totalVerbs: number
  quizCompleted: number
  masteredVerbs: number
}): Badge[] {
  const badges = getUserBadges()
  const newlyUnlocked: Badge[] = []
  const now = new Date().toISOString()
  const hour = new Date().getHours()
  const isWeekend = [0, 6].includes(new Date().getDay())
  
  badges.forEach(badge => {
    if (badge.unlocked) return
    
    let shouldUnlock = false
    
    switch (badge.category) {
      case 'streak':
        shouldUnlock = stats.streak >= badge.requirement
        break
      case 'verbs':
        shouldUnlock = stats.totalVerbs >= badge.requirement
        break
      case 'quiz':
        shouldUnlock = stats.quizCompleted >= badge.requirement
        break
      case 'mastery':
        shouldUnlock = stats.masteredVerbs >= badge.requirement
        break
      case 'special':
        if (badge.id === 'special-early-bird') {
          shouldUnlock = hour < 8
        } else if (badge.id === 'special-night-owl') {
          shouldUnlock = hour >= 22
        } else if (badge.id === 'special-weekend') {
          shouldUnlock = isWeekend
        }
        break
    }
    
    if (shouldUnlock) {
      badge.unlocked = true
      badge.unlockedDate = now
      newlyUnlocked.push(badge)
    }
  })
  
  saveBadges(badges)
  return newlyUnlocked
}

/**
 * Obtenir le niveau de l'utilisateur
 */
export function getUserLevel(totalVerbs: number): UserLevel {
  return LEVELS.find(level => 
    totalVerbs >= level.minVerbs && totalVerbs <= level.maxVerbs
  ) || LEVELS[0]
}

/**
 * Obtenir la progression vers le prochain niveau
 */
export function getLevelProgress(totalVerbs: number): {
  currentLevel: UserLevel
  nextLevel: UserLevel | null
  progress: number
  verbsToNext: number
} {
  const currentLevel = getUserLevel(totalVerbs)
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1) || null
  
  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progress: 100,
      verbsToNext: 0
    }
  }
  
  const verbsInLevel = nextLevel.minVerbs - currentLevel.minVerbs
  const verbsCompleted = totalVerbs - currentLevel.minVerbs
  const progress = Math.min(Math.round((verbsCompleted / verbsInLevel) * 100), 100)
  const verbsToNext = nextLevel.minVerbs - totalVerbs
  
  return {
    currentLevel,
    nextLevel,
    progress,
    verbsToNext
  }
}

/**
 * Obtenir les statistiques des badges
 */
export function getBadgeStats(): {
  total: number
  unlocked: number
  locked: number
  byCategory: Record<string, { total: number; unlocked: number }>
} {
  const badges = getUserBadges()
  const unlocked = badges.filter(b => b.unlocked).length
  
  const byCategory: Record<string, { total: number; unlocked: number }> = {}
  
  badges.forEach(badge => {
    if (!byCategory[badge.category]) {
      byCategory[badge.category] = { total: 0, unlocked: 0 }
    }
    byCategory[badge.category].total++
    if (badge.unlocked) {
      byCategory[badge.category].unlocked++
    }
  })
  
  return {
    total: badges.length,
    unlocked,
    locked: badges.length - unlocked,
    byCategory
  }
}
