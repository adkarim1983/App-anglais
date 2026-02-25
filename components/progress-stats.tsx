'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getUserProgress, resetProgress } from '@/lib/progress'
import { useState, useEffect } from 'react'
import { getAllVerbs } from '@/lib/verbs'

export function ProgressStats() {
  const [progress, setProgress] = useState(getUserProgress())
  const [showReset, setShowReset] = useState(false)
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Verbes appris</p>
            <p className="text-2xl font-bold text-primary">
              {progress.totalVerbsLearned}
              <span className="text-sm text-muted-foreground">/{totalVerbs}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Série actuelle</p>
            <p className="text-2xl font-bold text-accent">{progress.streak} 🔥</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Progression</p>
            <p className="text-2xl font-bold text-primary">{progressPercentage}%</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Dernière étude</p>
            <p className="text-sm font-semibold text-accent">
              {progress.lastStudyDate 
                ? new Date(progress.lastStudyDate).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'short' 
                  })
                : 'Jamais'}
            </p>
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
