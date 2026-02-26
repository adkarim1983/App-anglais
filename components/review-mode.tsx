'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getVerbsDueForReview, recordReview, getReviewStats } from '@/lib/spaced-repetition'
import { getVerbById, type Verb } from '@/lib/verbs'
import { speakVerb } from '@/lib/speech'
import { X, Volume2, RotateCcw, CheckCircle } from 'lucide-react'

interface ReviewModeProps {
  open: boolean
  onClose: () => void
}

export function ReviewMode({ open, onClose }: ReviewModeProps) {
  const [verbsDue, setVerbsDue] = useState<Verb[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [stats, setStats] = useState(getReviewStats())
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    if (open) {
      loadDueVerbs()
    }
  }, [open])

  const loadDueVerbs = () => {
    const dueIds = getVerbsDueForReview()
    const verbs = dueIds.map(id => getVerbById(id)).filter(Boolean) as Verb[]
    setVerbsDue(verbs)
    setCurrentIndex(0)
    setShowAnswer(false)
    setSessionComplete(false)
    setStats(getReviewStats())
  }

  const currentVerb = verbsDue[currentIndex]

  const handleQualityRating = (quality: number) => {
    if (!currentVerb) return

    recordReview(currentVerb.id, quality)
    
    if (currentIndex < verbsDue.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    } else {
      setSessionComplete(true)
    }
    
    setStats(getReviewStats())
  }

  const handleClose = () => {
    setVerbsDue([])
    setCurrentIndex(0)
    setShowAnswer(false)
    setSessionComplete(false)
    onClose()
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Mode Révision
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {verbsDue.length === 0 && !sessionComplete ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-lg font-semibold text-foreground">
              Aucun verbe à réviser aujourd'hui!
            </p>
            <p className="text-muted-foreground">
              Revenez plus tard pour réviser vos verbes.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-6">
              <div className="p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-2xl font-bold text-primary">{stats.dueToday}</p>
                <p className="text-xs text-muted-foreground">À réviser</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-2xl font-bold text-accent">{stats.masteredVerbs}</p>
                <p className="text-xs text-muted-foreground">Maîtrisés</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-border/20">
                <p className="text-2xl font-bold text-primary">{stats.totalReviews}</p>
                <p className="text-xs text-muted-foreground">Révisions</p>
              </div>
            </div>
          </div>
        ) : sessionComplete ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-lg font-semibold text-foreground">
              Session de révision terminée!
            </p>
            <p className="text-muted-foreground">
              Vous avez révisé {verbsDue.length} verbe{verbsDue.length > 1 ? 's' : ''}.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={loadDueVerbs} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Recommencer
              </Button>
              <Button onClick={handleClose}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Terminer
              </Button>
            </div>
          </div>
        ) : currentVerb ? (
          <div className="space-y-6">
            {/* Progression */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Progression</span>
                <span>{currentIndex + 1} / {verbsDue.length}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / verbsDue.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Carte du verbe */}
            <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/30">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {currentVerb.english}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakVerb(currentVerb.english)}
                    className="h-10 w-10 p-0"
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>

                {showAnswer ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-xl text-primary font-semibold">
                      {currentVerb.french}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="p-3 rounded-lg bg-background/50 border border-border/20">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Present</p>
                        <p className="text-sm font-medium">{currentVerb.present}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border/20">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Past</p>
                        <p className="text-sm font-medium">{currentVerb.past}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border/20">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Future</p>
                        <p className="text-sm font-medium">{currentVerb.future}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border/20">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Present Perfect</p>
                        <p className="text-sm font-medium">{currentVerb.presentPerfect}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-left">
                      <p className="text-sm italic text-muted-foreground">
                        "{currentVerb.example}"
                      </p>
                    </div>

                    {/* Évaluation de la qualité */}
                    <div className="pt-4 space-y-3">
                      <p className="text-sm font-semibold text-foreground">
                        Comment avez-vous trouvé ce verbe?
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          onClick={() => handleQualityRating(2)}
                          variant="outline"
                          className="border-red-500/50 hover:bg-red-500/10"
                        >
                          😰 Difficile
                        </Button>
                        <Button
                          onClick={() => handleQualityRating(3)}
                          variant="outline"
                          className="border-yellow-500/50 hover:bg-yellow-500/10"
                        >
                          🤔 Moyen
                        </Button>
                        <Button
                          onClick={() => handleQualityRating(5)}
                          variant="outline"
                          className="border-green-500/50 hover:bg-green-500/10"
                        >
                          😊 Facile
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8">
                    <Button
                      onClick={() => setShowAnswer(true)}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      Afficher la réponse
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
