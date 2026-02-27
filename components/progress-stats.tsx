'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getUserProgress, resetProgress } from '@/lib/progress'
import { useState, useEffect } from 'react'
import { getAllVerbs } from '@/lib/verbs'
import { MasteryDialog } from '@/components/mastery-dialog'
import { VocabularyItem } from '@/lib/vocabulary'

interface ProgressStatsProps {
  onItemClick?: (item: VocabularyItem) => void
}

export function ProgressStats({ onItemClick }: ProgressStatsProps) {
  const [progress, setProgress] = useState(getUserProgress())
  const [showReset, setShowReset] = useState(false)
  const [masteryDialogOpen, setMasteryDialogOpen] = useState(false)
  const [masteryDialogType, setMasteryDialogType] = useState<'mastered' | 'toReview'>('mastered')
  const totalVerbs = getAllVerbs().length

  useEffect(() => {
    // Mettre à jour les stats périodiquement
    const interval = setInterval(() => {
      setProgress(getUserProgress())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ?')) {
      resetProgress()
      setProgress(getUserProgress())
      setShowReset(false)
      window.location.reload()
    }
  }

  const handleOpenMasteryDialog = (type: 'mastered' | 'toReview') => {
    setMasteryDialogType(type)
    setMasteryDialogOpen(true)
  }

  const handleItemClick = (item: VocabularyItem) => {
    setMasteryDialogOpen(false)
    if (onItemClick) {
      onItemClick(item)
    }
  }

  const progressPercentage = Math.round((progress.totalVerbsLearned / totalVerbs) * 100)

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-border/30 backdrop-blur-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Votre Progression</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReset(!showReset)}
            className="text-muted-foreground hover:text-destructive"
          >
            Réinitialiser
          </Button>
        </div>

        {showReset && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="text-sm text-destructive mb-3">
              Cela supprimera toute votre progression. Cette action est irréversible.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={handleReset}
              >
                Confirmer
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowReset(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        )}

        {/* Statistiques principales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Verbes appris</p>
            <p className="text-2xl font-bold text-primary">
              {progress.totalVerbsLearned}
              <span className="text-sm text-muted-foreground">/{totalVerbs}</span>
            </p>
          </div>

          <button
            onClick={() => handleOpenMasteryDialog('mastered')}
            className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer text-left"
          >
            <p className="text-xs text-muted-foreground mb-1">✅ Maîtrisés</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{progress.masteredIds.length}</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">Cliquer pour voir</p>
          </button>

          <button
            onClick={() => handleOpenMasteryDialog('toReview')}
            className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer text-left"
          >
            <p className="text-xs text-muted-foreground mb-1">🔁 À revoir</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{progress.toReviewIds.length}</p>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">Cliquer pour voir</p>
          </button>

          <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Série actuelle</p>
            <p className="text-2xl font-bold text-accent">{progress.streak} 🔥</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Progression</p>
            <p className="text-2xl font-bold text-primary">{progressPercentage}%</p>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progression totale</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Message de motivation */}
        {progress.totalVerbsLearned > 0 && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-border/20">
            <p className="text-sm text-muted-foreground text-center">
              {getMotivationalMessage(progress.totalVerbsLearned, progress.streak)}
            </p>
          </div>
        )}
      </div>

      {/* Mastery Dialog */}
      <MasteryDialog
        open={masteryDialogOpen}
        onOpenChange={setMasteryDialogOpen}
        type={masteryDialogType}
        itemIds={masteryDialogType === 'mastered' ? progress.masteredIds : progress.toReviewIds}
        onItemClick={handleItemClick}
      />
    </Card>
  )
}

function getMotivationalMessage(learned: number, streak: number): string {
  if (streak >= 7) {
    return `🎉 Incroyable ! ${streak} jours d'affilée ! Vous êtes sur la bonne voie !`
  }
  if (streak >= 3) {
    return `💪 Excellent ! ${streak} jours consécutifs ! Continuez comme ça !`
  }
  if (learned >= 30) {
    return `🌟 Fantastique ! Vous avez appris ${learned} verbes ! Vous progressez rapidement !`
  }
  if (learned >= 10) {
    return `👏 Bravo ! ${learned} verbes appris ! Vous faites des progrès remarquables !`
  }
  return `🚀 Bon début ! Continuez à apprendre chaque jour pour progresser !`
}
