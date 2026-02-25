'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { type Verb } from '@/lib/verbs'
import { X, Check, RotateCcw, Volume2 } from 'lucide-react'
import { speakExample } from '@/lib/speech'

interface FillBlanksProps {
  verbs: Verb[]
  onClose: () => void
}

interface Exercise {
  verb: Verb
  sentence: string
  blank: string
  answer: string
}

export function FillBlanksMode({ verbs, onClose }: FillBlanksProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    generateExercises()
  }, [verbs])

  const generateExercises = () => {
    const newExercises: Exercise[] = verbs.slice(0, 10).map(verb => {
      // Choisir aléatoirement entre différents types d'exercices
      const exerciseType = Math.random()
      
      if (exerciseType < 0.5) {
        // Remplacer le verbe dans l'exemple
        const sentence = verb.example.replace(
          new RegExp(`\\b${verb.english}\\w*\\b`, 'gi'),
          '______'
        )
        return {
          verb,
          sentence,
          blank: '______',
          answer: verb.english.toLowerCase()
        }
      } else {
        // Exercice de conjugaison
        const sentences = [
          `Yesterday, I ______ (${verb.english}) for the first time.`,
          `She ______ (${verb.english}) every day.`,
          `They have ______ (${verb.english}) many times.`,
        ]
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
        
        let answer = verb.past
        if (randomSentence.includes('every day')) {
          answer = verb.present
        } else if (randomSentence.includes('have')) {
          answer = verb.presentPerfect.replace('has ', '')
        }
        
        return {
          verb,
          sentence: randomSentence,
          blank: '______',
          answer: answer.toLowerCase()
        }
      }
    })
    
    setExercises(newExercises)
  }

  const handleSubmit = () => {
    const currentExercise = exercises[currentIndex]
    const normalizedAnswer = userAnswer.trim().toLowerCase()
    const normalizedCorrect = currentExercise.answer.toLowerCase()
    
    const correct = normalizedAnswer === normalizedCorrect
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer('')
      setIsCorrect(null)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setUserAnswer('')
    setIsCorrect(null)
    setShowResult(false)
    generateExercises()
  }

  if (exercises.length === 0) {
    return null
  }

  if (showResult) {
    const percentage = Math.round((score / exercises.length) * 100)
    
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 bg-card/95 backdrop-blur-xl border-border/30">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Exercice Terminé !
            </h2>
            <p className="text-muted-foreground">Voici vos résultats</p>
          </div>
          
          <div className="py-8">
            <div className="text-6xl font-bold text-primary mb-2">
              {percentage}%
            </div>
            <p className="text-lg text-muted-foreground">
              {score} / {exercises.length} bonnes réponses
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              size="lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Recommencer
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Fermer
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const currentExercise = exercises[currentIndex]
  const progress = Math.round(((currentIndex + 1) / exercises.length) * 100)

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-card/95 backdrop-blur-xl border-border/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Exercice {currentIndex + 1} / {exercises.length}
            </div>
            <div className="text-sm font-semibold text-primary">
              Score: {score}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Exercise */}
        <div className="space-y-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Complétez la phrase :
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakExample(currentExercise.sentence.replace('______', currentExercise.answer))}
                className="h-8 w-8 p-0"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-border/20">
              <p className="text-xl text-foreground leading-relaxed">
                {currentExercise.sentence}
              </p>
            </Card>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && userAnswer && isCorrect === null) {
                  handleSubmit()
                }
              }}
              placeholder="Tapez votre réponse..."
              disabled={isCorrect !== null}
              className="text-lg h-12"
              autoFocus
            />
            
            {isCorrect !== null && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  isCorrect
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                }`}
              >
                {isCorrect ? (
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <X className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {isCorrect ? 'Correct !' : 'Incorrect'}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-muted-foreground mt-1">
                      La bonne réponse est : <span className="font-semibold">{currentExercise.answer}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {isCorrect === null ? (
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              size="lg"
            >
              Vérifier
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              size="lg"
            >
              {currentIndex < exercises.length - 1 ? 'Suivant' : 'Voir les résultats'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
