'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  correctAnswer: string
  hint: string
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'I ___ (to go) to school yesterday.',
    correctAnswer: 'went',
    hint: 'Verbe irrégulier au passé'
  },
  {
    id: 2,
    question: 'She ___ (to write) a beautiful letter last week.',
    correctAnswer: 'wrote',
    hint: 'Verbe irrégulier au passé'
  },
  {
    id: 3,
    question: 'They ___ (to play) soccer every weekend.',
    correctAnswer: 'play',
    hint: 'Verbe régulier au présent'
  },
  {
    id: 4,
    question: 'We ___ (to study) English for three years.',
    correctAnswer: 'have studied',
    hint: 'Present perfect'
  },
  {
    id: 5,
    question: 'He ___ (to work) in this company since 2020.',
    correctAnswer: 'has worked',
    hint: 'Present perfect avec "since"'
  },
  {
    id: 6,
    question: 'I ___ (to see) that movie last night.',
    correctAnswer: 'saw',
    hint: 'Verbe irrégulier au passé'
  },
  {
    id: 7,
    question: 'She ___ (to speak) three languages fluently.',
    correctAnswer: 'speaks',
    hint: 'Présent simple, 3ème personne'
  },
  {
    id: 8,
    question: 'They ___ (to finish) their homework before dinner.',
    correctAnswer: 'finished',
    hint: 'Verbe régulier au passé'
  },
  {
    id: 9,
    question: 'We ___ (to travel) to Paris next summer.',
    correctAnswer: 'will travel',
    hint: 'Futur simple'
  },
  {
    id: 10,
    question: 'He ___ (to think) about the problem carefully.',
    correctAnswer: 'thought',
    hint: 'Verbe irrégulier au passé'
  }
]

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value.trim().toLowerCase()
    }))
  }

  const checkAnswers = () => {
    let correctCount = 0
    QUIZ_QUESTIONS.forEach(question => {
      const userAnswer = answers[question.id] || ''
      if (userAnswer === question.correctAnswer.toLowerCase()) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const isCorrect = (questionId: number) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId)
    const userAnswer = answers[questionId] || ''
    return userAnswer === question?.correctAnswer.toLowerCase()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <PageHeader />

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Mini-Quiz Interactif
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Testez vos connaissances en conjugaison anglaise avec ces 10 questions interactives. 
            Complétez les phrases avec la forme correcte du verbe.
          </p>
        </div>

        {/* Score Display */}
        {showResults && (
          <Card className="mb-8 border-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">
                Votre score : {score}/{QUIZ_QUESTIONS.length}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {score === QUIZ_QUESTIONS.length && 'Parfait ! Vous maîtrisez ces verbes ! 🎉'}
                {score >= 7 && score < QUIZ_QUESTIONS.length && 'Excellent travail ! Continuez comme ça ! 👏'}
                {score >= 5 && score < 7 && 'Bon effort ! Continuez à pratiquer ! 💪'}
                {score < 5 && 'Continuez à apprendre, vous progressez ! 📚'}
              </p>
              <Button onClick={resetQuiz} className="mt-4">
                Recommencer le quiz
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {QUIZ_QUESTIONS.map((question, index) => (
            <Card 
              key={question.id}
              className={`border-2 transition-all ${
                showResults 
                  ? isCorrect(question.id)
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <span className="text-lg">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      Question {index + 1}:
                    </span>
                    {' '}{question.question}
                  </span>
                  {showResults && (
                    isCorrect(question.id) 
                      ? <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      : <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Votre réponse..."
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    disabled={showResults}
                    className="text-lg"
                  />
                  
                  {!showResults && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      💡 Indice : {question.hint}
                    </p>
                  )}

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Réponse correcte : <span className="text-green-600 dark:text-green-400">{question.correctAnswer}</span>
                      </p>
                      {!isCorrect(question.id) && answers[question.id] && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          Votre réponse : {answers[question.id]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        {!showResults && (
          <div className="text-center">
            <Button 
              onClick={checkAnswers}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              disabled={Object.keys(answers).length === 0}
            >
              Vérifier mes réponses
            </Button>
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Conseils pour réussir
            </h3>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Lisez attentivement le contexte de chaque phrase</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Identifiez le temps requis (présent, passé, futur, present perfect)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Vérifiez si le verbe est régulier ou irrégulier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Attention à la 3ème personne du singulier au présent (ajouter -s)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Utilisez les indices fournis pour vous guider</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
