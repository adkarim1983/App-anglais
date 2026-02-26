// Système de défis quotidiens

export interface DailyChallenge {
  id: string
  name: string
  nameFr: string
  description: string
  descriptionFr: string
  icon: string
  target: number
  progress: number
  completed: boolean
  reward: string
  rewardFr: string
}

/**
 * Générer les défis du jour
 */
export function getDailyChallenges(stats: {
  verbsToday: number
  quizToday: number
  reviewsToday: number
}): DailyChallenge[] {
  const challenges: DailyChallenge[] = [
    {
      id: 'daily-verbs',
      name: 'Daily Goal',
      nameFr: 'Objectif Quotidien',
      description: 'Learn 10 new verbs today',
      descriptionFr: 'Apprendre 10 nouveaux verbes aujourd\'hui',
      icon: '🎯',
      target: 10,
      progress: stats.verbsToday,
      completed: stats.verbsToday >= 10,
      reward: '+50 XP',
      rewardFr: '+50 XP'
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      nameFr: 'Maître du Quiz',
      description: 'Complete 3 quizzes',
      descriptionFr: 'Compléter 3 quiz',
      icon: '🎪',
      target: 3,
      progress: stats.quizToday,
      completed: stats.quizToday >= 3,
      reward: '+30 XP',
      rewardFr: '+30 XP'
    },
    {
      id: 'review-champion',
      name: 'Review Champion',
      nameFr: 'Champion de Révision',
      description: 'Review 5 verbs',
      descriptionFr: 'Réviser 5 verbes',
      icon: '🔄',
      target: 5,
      progress: stats.reviewsToday,
      completed: stats.reviewsToday >= 5,
      reward: '+20 XP',
      rewardFr: '+20 XP'
    }
  ]
  
  // Défi bonus du week-end
  const isWeekend = [0, 6].includes(new Date().getDay())
  if (isWeekend) {
    challenges.push({
      id: 'weekend-warrior',
      name: 'Weekend Warrior',
      nameFr: 'Guerrier du Week-end',
      description: 'Study on the weekend',
      descriptionFr: 'Étudier le week-end',
      icon: '🎉',
      target: 1,
      progress: stats.verbsToday > 0 ? 1 : 0,
      completed: stats.verbsToday > 0,
      reward: '+100 XP Bonus',
      rewardFr: '+100 XP Bonus'
    })
  }
  
  return challenges
}

/**
 * Obtenir un défi aléatoire spécial
 */
export function getSpecialChallenge(): DailyChallenge {
  const specialChallenges: Omit<DailyChallenge, 'progress' | 'completed'>[] = [
    {
      id: 'category-focus',
      name: 'Category Focus',
      nameFr: 'Focus Catégorie',
      description: 'Learn 5 verbs from Communication category',
      descriptionFr: 'Apprendre 5 verbes de la catégorie Communication',
      icon: '💬',
      target: 5,
      reward: '+40 XP',
      rewardFr: '+40 XP'
    },
    {
      id: 'perfect-score',
      name: 'Perfect Score',
      nameFr: 'Score Parfait',
      description: 'Get 100% in any quiz',
      descriptionFr: 'Obtenir 100% dans un quiz',
      icon: '💯',
      target: 1,
      reward: '+75 XP',
      rewardFr: '+75 XP'
    },
    {
      id: 'speed-learner',
      name: 'Speed Learner',
      nameFr: 'Apprenant Rapide',
      description: 'Learn 15 verbs in one session',
      descriptionFr: 'Apprendre 15 verbes en une session',
      icon: '⚡',
      target: 15,
      reward: '+60 XP',
      rewardFr: '+60 XP'
    },
    {
      id: 'flashcard-master',
      name: 'Flashcard Master',
      nameFr: 'Maître des Flashcards',
      description: 'Complete 20 flashcards',
      descriptionFr: 'Compléter 20 flashcards',
      icon: '🃏',
      target: 20,
      reward: '+50 XP',
      rewardFr: '+50 XP'
    }
  ]
  
  const random = specialChallenges[Math.floor(Math.random() * specialChallenges.length)]
  return {
    ...random,
    progress: 0,
    completed: false
  }
}
