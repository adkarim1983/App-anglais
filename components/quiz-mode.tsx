'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type Verb } from '@/lib/verbs'
import { X, Check, RotateCcw } from 'lucide-react'
import { speakVerb } from '@/lib/speech'

interface QuizModeProps {
  verbs: Verb[]
  onClose: () => void
}

interface QuizQuestion {
  verb: Verb
  options: string[]
  correctAnswer: string
  type: 'french-to-english' | 'english-to-french' | 'conjugation'
}

export function QuizMode({ verbs, onClose }: QuizModeProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    generateQuestions()
  }, [verbs])

  const generateQuestions = () => {
    const quizQuestions: QuizQuestion[] = verbs.slice(0, 10).map(verb => {
      const questionType = Math.random()
      
      if (questionType < 0.4) {
        // French to English
        const wrongOptions = verbs
          .filter(v => v.id !== verb.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.english)
        
        const options = [...wrongOptions, verb.english].sort(() => Math.random() - 0.5)
        
        return {
          verb,
          options,
          correctAnswer: verb.english,
          type: 'french-to-english'
        }
      } else if (questionType < 0.7) {
        // English to French
        const wrongOptions = verbs
          .filter(v => v.id !== verb.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.french)
        
        const options = [...wrongOptions, verb.french].sort(() => Math.random() - 0.5)
        
        return {
          verb,
          options,
          correctAnswer: verb.french,
          type: 'english-to-french'
        }
      } else {
        // Conjugation
        const wrongOptions = verbs
          .filter(v => v.id !== verb.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.past)
        
        const options = [...wrongOptions, verb.past].sort(() => Math.random() - 0.5)
        
        return {
          verb,
          options,
          correctAnswer: verb.past,
          type: 'conjugation'
        }
      }
    })
    
    setQuestions(quizQuestions)
  }

  const handleAnswer = (answer: string) => {
    if (answered) return
    
    setSelectedAnswer(answer)
    setAnswered(true)
    
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswered(false)
    generateQuestions()
  }

  if (questions.length === 0) {
    return null
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 bg-card/95 backdrop-blur-xl border-border/30">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quiz Terminé !
            </h2>
            <p className="text-muted-foreground">Voici vos résultats</p>
          </div>
          
          <div className="py-8">
            <div className="text-6xl font-bold text-primary mb-2">
              {percentage}%
            </div>
            <p className="text-lg text-muted-foreground">
              {score} / {questions.length} bonnes réponses
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

  const currentQuestion = questions[currentIndex]
  const questionText = 
    currentQuestion.type === 'french-to-english' 
      ? `Quelle est la traduction de "${currentQuestion.verb.french}" ?`
      : currentQuestion.type === 'english-to-french'
      ? `Comment dit-on "${currentQuestion.verb.english}" en français ?`
      : `Quel est le passé simple de "${currentQuestion.verb.english}" ?`

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-card/95 backdrop-blur-xl border-border/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Question {currentIndex + 1} / {questions.length}
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
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
            {questionText}
          </h3>
          {currentQuestion.type !== 'english-to-french' && (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakVerb(currentQuestion.verb.english)}
                className="text-muted-foreground hover:text-primary"
              >
                🔊 Écouter
              </Button>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isCorrect = option === currentQuestion.correctAnswer
            const showCorrect = answered && isCorrect
            const showWrong = answered && isSelected && !isCorrect
            
            return (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                variant="outline"
                className={`h-auto py-4 px-6 text-lg justify-start transition-all ${
                  showCorrect
                    ? 'bg-green-500/20 border-green-500 text-green-700 dark:text-green-300'
                    : showWrong
                    ? 'bg-red-500/20 border-red-500 text-red-700 dark:text-red-300'
                    : isSelected
                    ? 'bg-primary/10 border-primary'
                    : 'hover:bg-primary/5'
                }`}
              >
                <span className="flex-1 text-left">{option}</span>
                {showCorrect && <Check className="h-5 w-5 ml-2" />}
                {showWrong && <X className="h-5 w-5 ml-2" />}
              </Button>
            )
          })}
        </div>

        {/* Next button */}
        {answered && (
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            size="lg"
          >
            {currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
          </Button>
        )}
      </Card>
    </div>
  )
}
