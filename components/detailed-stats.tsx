'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getCompleteStats } from '@/lib/progress'
import { getReviewStats } from '@/lib/spaced-repetition'
import { getUserLevel, getLevelProgress } from '@/lib/badges'
import { BarChart3, TrendingUp, Clock, Award, X } from 'lucide-react'

interface DetailedStatsProps {
  open: boolean
  onClose: () => void
}

export function DetailedStats({ open, onClose }: DetailedStatsProps) {
  const [stats, setStats] = useState(getCompleteStats())
  const [reviewStats, setReviewStats] = useState(getReviewStats())
  const [levelInfo, setLevelInfo] = useState(getLevelProgress(0))

  useEffect(() => {
    if (open) {
      const completeStats = getCompleteStats()
      setStats(completeStats)
      setReviewStats(getReviewStats())
      setLevelInfo(getLevelProgress(completeStats.totalVerbs))
    }
  }, [open])

  if (!open) return null

  const studyHours = Math.floor(stats.totalStudyTime / 60)
  const studyMinutes = stats.totalStudyTime % 60

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Statistiques Détaillées
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Niveau et progression */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-border/30">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Niveau</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {levelInfo.currentLevel.nameFr}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Niveau {levelInfo.currentLevel.level}
                  </p>
                </div>
                {levelInfo.nextLevel && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Prochain</p>
                    <p className="text-lg font-semibold text-foreground">
                      {levelInfo.nextLevel.nameFr}
                    </p>
                  </div>
                )}
              </div>
              
              {levelInfo.nextLevel && (
                <>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${levelInfo.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {levelInfo.verbsToNext} verbes pour atteindre {levelInfo.nextLevel.nameFr}
                  </p>
                </>
              )}
            </div>
          </Card>

          {/* Statistiques principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground">Verbes appris</p>
              </div>
              <p className="text-3xl font-bold text-primary">{stats.totalVerbs}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <p className="text-xs text-muted-foreground">Série actuelle</p>
              </div>
              <p className="text-3xl font-bold text-accent">{stats.streak} 🔥</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground">Quiz complétés</p>
              </div>
              <p className="text-3xl font-bold text-primary">{stats.quizCompleted}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-accent" />
                <p className="text-xs text-muted-foreground">Scores parfaits</p>
              </div>
              <p className="text-3xl font-bold text-accent">{stats.quizPerfectScores} 💯</p>
            </Card>
          </div>

          {/* Temps d'étude */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-border/30">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Temps d'étude</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-3xl font-bold text-primary">{studyHours}h {studyMinutes}m</p>
                <p className="text-xs text-muted-foreground mt-1">Total</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-3xl font-bold text-accent">{stats.averageDaily}</p>
                <p className="text-xs text-muted-foreground mt-1">Moyenne/jour</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-3xl font-bold text-primary">
                  {stats.totalVerbs > 0 ? Math.round(stats.totalStudyTime / stats.totalVerbs) : 0}m
                </p>
                <p className="text-xs text-muted-foreground mt-1">Par verbe</p>
              </div>
            </div>
          </Card>

          {/* Statistiques de révision */}
          <Card className="p-6 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 border-border/30">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Révisions</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-3xl font-bold text-accent">{reviewStats.totalReviews}</p>
                <p className="text-xs text-muted-foreground mt-1">Total révisions</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-3xl font-bold text-primary">{reviewStats.dueToday}</p>
                <p className="text-xs text-muted-foreground mt-1">À réviser</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-3xl font-bold text-accent">{reviewStats.masteredVerbs}</p>
                <p className="text-xs text-muted-foreground mt-1">Maîtrisés</p>
              </div>
            </div>
          </Card>

          {/* Taux de réussite */}
          {stats.quizCompleted > 0 && (
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-border/30">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Performance</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Taux de scores parfaits</span>
                    <span className="text-lg font-bold text-primary">
                      {Math.round((stats.quizPerfectScores / stats.quizCompleted) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${(stats.quizPerfectScores / stats.quizCompleted) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Facteur de facilité moyen</span>
                    <span className="text-lg font-bold text-accent">
                      {reviewStats.averageEaseFactor.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-primary"
                      style={{ width: `${((reviewStats.averageEaseFactor - 1.3) / (2.5 - 1.3)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
