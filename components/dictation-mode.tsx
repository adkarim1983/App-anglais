'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { type Verb } from '@/lib/verbs'
import { speakVerb } from '@/lib/speech'
import { X, Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react'

interface DictationModeProps {
  verbs: Verb[]
  open: boolean
  onClose: () => void
}

export function DictationMode({ verbs, open, onClose }: DictationModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (open && verbs.length > 0) {
      // Prononcer automatiquement le premier verbe
      setTimeout(() => {
        speakVerb(verbs[0].english)
      }, 500)
    }
  }, [open, verbs])

  const currentVerb = verbs[currentIndex]

  const handlePlayAudio = () => {
    if (currentVerb) {
      speakVerb(currentVerb.english)
    }
  }

  const handleSubmit = () => {
    if (!currentVerb || !userInput.trim()) return

    const correct = userInput.trim().toLowerCase() === currentVerb.english.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserInput('')
      setShowResult(false)
      setIsCorrect(false)
      
      // Prononcer le prochain verbe
      setTimeout(() => {
        speakVerb(verbs[currentIndex + 1].english)
      }, 300)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setUserInput('')
    setShowResult(false)
    setIsCorrect(false)
    setScore(0)
    setCompleted(false)
    
    setTimeout(() => {
      speakVerb(verbs[0].english)
    }, 300)
  }

  const handleClose = () => {
    setCurrentIndex(0)
    setUserInput('')
    setShowResult(false)
    setIsCorrect(false)
    setScore(0)
    setCompleted(false)
    onClose()
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Mode Dictée
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

        {completed ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">
              {score === verbs.length ? '🏆' : score >= verbs.length * 0.7 ? '🎉' : '👍'}
            </div>
            <p className="text-lg font-semibold text-foreground">
              Dictée terminée!
            </p>
            <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/20">
              <p className="text-4xl font-bold text-primary mb-2">
                {score}/{verbs.length}
              </p>
              <p className="text-sm text-muted-foreground">
                {Math.round((score / verbs.length) * 100)}% de réussite
              </p>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={handleRestart} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Recommencer
              </Button>
              <Button onClick={handleClose}>
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
                <span>{currentIndex + 1} / {verbs.length}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / verbs.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/20">
              <span className="text-sm text-muted-foreground">Score actuel</span>
              <span className="text-xl font-bold text-primary">
                {score}/{currentIndex + (showResult ? 1 : 0)}
              </span>
            </div>

            {/* Zone de dictée */}
            <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/30">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Écoutez et écrivez le verbe que vous entendez
                  </p>
                  <Button
                    onClick={handlePlayAudio}
                    size="lg"
                    variant="outline"
                    className="h-20 w-20 rounded-full"
                  >
                    <Volume2 className="h-8 w-8" />
                  </Button>
                </div>

                {!showResult ? (
                  <div className="space-y-4">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmit()
                        }
                      }}
                      placeholder="Tapez le verbe ici..."
                      className="text-center text-xl h-14"
                      autoFocus
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!userInput.trim()}
                      className="w-full"
                      size="lg"
                    >
                      Vérifier
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-6 rounded-lg border-2 ${
                      isCorrect
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-red-500/10 border-red-500/50'
                    }`}>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        {isCorrect ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-500" />
                        )}
                        <p className="text-2xl font-bold">
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </p>
                      </div>

                      <div className="space-y-2 text-center">
                        {!isCorrect && (
                          <div>
                            <p className="text-sm text-muted-foreground">Votre réponse:</p>
                            <p className="text-lg font-semibold text-red-500">{userInput}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-muted-foreground">Réponse correcte:</p>
                          <p className="text-2xl font-bold text-foreground">{currentVerb.english}</p>
                          <p className="text-lg text-primary mt-1">{currentVerb.french}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleNext}
                      className="w-full"
                      size="lg"
                    >
                      {currentIndex < verbs.length - 1 ? 'Suivant' : 'Terminer'}
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
