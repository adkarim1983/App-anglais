'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getUserBadges, getUserLevel, getLevelProgress, type Badge } from '@/lib/badges'
import { Trophy, Lock, ChevronRight } from 'lucide-react'

export function BadgesDisplay() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [levelInfo, setLevelInfo] = useState<ReturnType<typeof getLevelProgress> | null>(null)

  useEffect(() => {
    const allBadges = getUserBadges()
    setBadges(allBadges)
    
    // Calculer le niveau
    const totalVerbs = allBadges.filter(b => b.category === 'verbs' && b.unlocked).length * 10
    setLevelInfo(getLevelProgress(totalVerbs))
  }, [])

  const unlockedBadges = badges.filter(b => b.unlocked)
  const displayBadges = showAll ? badges : badges.slice(0, 6)

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge)
    setDialogOpen(true)
  }

  return (
    <>
      <Card className="p-6 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 border-border/30 backdrop-blur-xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">
                Badges & Niveau
              </h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Débloqués</p>
              <p className="text-xl font-bold text-accent">
                {unlockedBadges.length}/{badges.length}
              </p>
            </div>
          </div>

          {/* Niveau actuel */}
          {levelInfo && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/20">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">Niveau actuel</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {levelInfo.currentLevel.nameFr}
                  </p>
                </div>
                {levelInfo.nextLevel && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Prochain niveau</p>
                    <p className="text-sm font-semibold text-foreground">
                      {levelInfo.nextLevel.nameFr}
                    </p>
                  </div>
                )}
              </div>
              
              {levelInfo.nextLevel && (
                <>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${levelInfo.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {levelInfo.verbsToNext} verbes pour le niveau suivant
                  </p>
                </>
              )}
            </div>
          )}

          {/* Grille de badges */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {displayBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={`relative aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                  badge.unlocked
                    ? 'border-primary/50 bg-gradient-to-br from-primary/20 to-accent/20 hover:border-primary'
                    : 'border-border/30 bg-muted/50 hover:border-border/50'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {badge.unlocked ? (
                    <span className="text-4xl">{badge.icon}</span>
                  ) : (
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                {badge.unlocked && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {badges.length > 6 && (
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="w-full"
            >
              {showAll ? 'Voir moins' : `Voir tous les badges (${badges.length})`}
              <ChevronRight className={`ml-2 h-4 w-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
            </Button>
          )}
        </div>
      </Card>

      {/* Dialog détails du badge */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border/30">
          {selectedBadge && (
            <>
              <DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-6xl ${
                    selectedBadge.unlocked
                      ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/50'
                      : 'bg-muted border-2 border-border/30'
                  }`}>
                    {selectedBadge.unlocked ? selectedBadge.icon : <Lock className="h-12 w-12 text-muted-foreground" />}
                  </div>
                  <div className="text-center">
                    <DialogTitle className="text-2xl font-bold text-foreground">
                      {selectedBadge.nameFr}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedBadge.descriptionFr}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Statut</span>
                    <span className={`text-sm font-semibold ${
                      selectedBadge.unlocked ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {selectedBadge.unlocked ? '✓ Débloqué' : '🔒 Verrouillé'}
                    </span>
                  </div>
                  {selectedBadge.unlocked && selectedBadge.unlockedDate && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Débloqué le</span>
                      <span className="text-sm font-medium text-foreground">
                        {new Date(selectedBadge.unlockedDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                </div>

                {!selectedBadge.unlocked && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-center text-muted-foreground">
                      Continuez à apprendre pour débloquer ce badge!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
