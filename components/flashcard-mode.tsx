'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type Verb } from '@/lib/verbs'
import { X, RotateCcw, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import { speakVerb } from '@/lib/speech'

interface FlashcardModeProps {
  verbs: Verb[]
  onClose: () => void
}

export function FlashcardMode({ verbs, onClose }: FlashcardModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownVerbs, setKnownVerbs] = useState<number[]>([])
  const [reviewVerbs, setReviewVerbs] = useState<number[]>([])

  const currentVerb = verbs[currentIndex]
  const progress = Math.round(((currentIndex + 1) / verbs.length) * 100)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKnow = () => {
    if (!knownVerbs.includes(currentVerb.id)) {
      setKnownVerbs([...knownVerbs, currentVerb.id])
    }
    handleNext()
  }

  const handleReview = () => {
    if (!reviewVerbs.includes(currentVerb.id)) {
      setReviewVerbs([...reviewVerbs, currentVerb.id])
    }
    handleNext()
  }

  const handleNext = () => {
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownVerbs([])
    setReviewVerbs([])
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">Mode Flashcards</h2>
            <p className="text-sm text-muted-foreground">
              Carte {currentIndex + 1} / {verbs.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-9 w-9 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-9 w-9 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>✓ Je sais: {knownVerbs.length}</span>
            <span>↻ À revoir: {reviewVerbs.length}</span>
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="relative h-96 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <Card
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            } bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-border/30 backdrop-blur-xl hover:shadow-2xl`}
          >
            <div className={`text-center ${isFlipped ? 'rotate-y-180' : ''}`}>
              {!isFlipped ? (
                // Front: French
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">
                    Français
                  </p>
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {currentVerb.french}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    Cliquez pour voir la réponse
                  </p>
                </div>
              ) : (
                // Back: English + Details
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">
                      English
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <h3 className="text-5xl font-bold text-foreground">
                        {currentVerb.english}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          speakVerb(currentVerb.english)
                        }}
                        className="h-10 w-10 p-0"
                      >
                        <Volume2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <p className="text-muted-foreground mb-1">Past</p>
                      <p className="font-semibold">{currentVerb.past}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <p className="text-muted-foreground mb-1">Present Perfect</p>
                      <p className="font-semibold">{currentVerb.presentPerfect}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground italic">
                    "{currentVerb.example}"
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          
          {isFlipped && (
            <>
              <Button
                onClick={handleReview}
                variant="outline"
                className="flex-1 border-orange-500/50 hover:bg-orange-500/10"
              >
                ↻ À revoir
              </Button>
              <Button
                onClick={handleKnow}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                ✓ Je sais
              </Button>
            </>
          )}
          
          {!isFlipped && (
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === verbs.length - 1}
              className="flex-1"
            >
              Suivant
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
