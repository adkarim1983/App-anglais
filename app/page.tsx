'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { VerbCard, type Verb } from '@/components/verb-card'
import { VerbDetailDialog } from '@/components/verb-detail-dialog'
import { ProgressStats } from '@/components/progress-stats'
import { AudioIndicator } from '@/components/audio-indicator'
import { AppNav } from '@/components/app-nav'
import { QuizMode } from '@/components/quiz-mode'
import { FlashcardMode } from '@/components/flashcard-mode'
import { FillBlanksMode } from '@/components/fill-blanks-mode'
import { StudyHistory } from '@/components/study-history'
import { EssentialVerbsSection } from '@/components/essential-verbs-section'
import { fetchVerbs, getVerbById, type VerbCategory } from '@/lib/verbs'
import { getUserProgress, markVerbAsLearned, getLearnedVerbIds, getFavoriteVerbIds, getDailyProgress } from '@/lib/progress'

const VERBS_PER_DAY = 10

export default function Home() {
  const [verbs, setVerbs] = useState<Verb[]>([])
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [progress, setProgress] = useState(getUserProgress())
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'learn' | 'quiz' | 'flashcards' | 'fill-blanks' | 'favorites'>('learn')
  const [category, setCategory] = useState<VerbCategory | 'all'>('all')
  const [dailyProgress, setDailyProgress] = useState(getDailyProgress())

  useEffect(() => {
    loadVerbs()
    
    // Mettre à jour la progression quotidienne
    const interval = setInterval(() => {
      setDailyProgress(getDailyProgress())
    }, 5000)
    
    return () => clearInterval(interval)
  }, [category])

  const loadVerbs = async () => {
    setIsLoading(true)
    try {
      if (mode === 'favorites') {
        const favoriteIds = getFavoriteVerbIds()
        const favoriteVerbs = favoriteIds.map(id => getVerbById(id)).filter(Boolean) as Verb[]
        setVerbs(favoriteVerbs)
      } else {
        const learnedIds = getLearnedVerbIds()
        const categoryFilter = category === 'all' ? undefined : category
        const randomVerbs = await fetchVerbs(VERBS_PER_DAY, learnedIds, categoryFilter)
        setVerbs(randomVerbs)
      }
    } catch (error) {
      console.error('Error loading verbs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerbClick = (verb: Verb) => {
    setSelectedVerb(verb)
    setDialogOpen(true)
    
    // Marquer le verbe comme appris
    const updatedProgress = markVerbAsLearned(verb.id)
    setProgress(updatedProgress)
    setDailyProgress(getDailyProgress())
  }

  const handleGenerateNewVerbs = async () => {
    await loadVerbs()
  }

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode)
    if (newMode === 'learn' || newMode === 'favorites') {
      loadVerbs()
    }
  }

  const handleCategoryChange = (newCategory: VerbCategory | 'all') => {
    setCategory(newCategory)
  }

  // Fermer les modes spéciaux
  const handleCloseMode = () => {
    setMode('learn')
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10 animate-gradient" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary/15 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header - Fixed navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-400 sm:text-3xl">
                Daily English Verbs
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-light">
                Maîtrisez 10 nouveaux verbes chaque jour
              </p>
            </div>

            {/* Progression quotidienne */}
            <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800/50">
              <div className="text-center">
                <p className="text-xs text-slate-600 dark:text-slate-400">Aujourd'hui</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {dailyProgress.current}/{dailyProgress.goal}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-600" />
              <div className="text-center">
                <p className="text-xs text-slate-600 dark:text-slate-400">Série</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{progress.streak} 🔥</p>
              </div>
            </div>

            {/* Navigation */}
            <AppNav
              onModeChange={handleModeChange}
              onCategoryChange={handleCategoryChange}
              currentCategory={category}
              favoriteCount={progress.favoriteVerbIds.length}
            />

            <Button
              onClick={handleGenerateNewVerbs}
              disabled={isLoading}
              className="relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 disabled:opacity-50"
              size="lg"
            >
              <span className="relative z-10">
                {isLoading ? 'Chargement...' : 'Nouveaux'}
              </span>
              <div className="absolute inset-0 animate-shimmer" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - avec padding pour la navbar fixe */}
      <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance text-slate-800 dark:text-slate-100 leading-tight">
            Maîtrisez l'Anglais avec Élégance
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 text-balance max-w-3xl mx-auto font-light leading-relaxed">
            Enrichissez votre vocabulaire avec des verbes soigneusement sélectionnés. 
            Une pratique quotidienne pour des compétences linguistiques durables.
          </p>
        </div>

        {/* Statistiques de progression */}
        <div className="mb-12">
          <ProgressStats />
        </div>

        {/* Section Verbes Essentiels */}
        <div className="mb-12">
          <EssentialVerbsSection onVerbClick={handleVerbClick} />
        </div>

        {/* Titre pour les verbes quotidiens */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Verbes du Jour
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Découvrez 10 nouveaux verbes chaque jour pour enrichir votre vocabulaire
          </p>
        </div>

        {/* Verbs Grid */}
        {mode === 'learn' || mode === 'favorites' ? (
          <div className="mb-12">
            {mode === 'favorites' && verbs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Vous n'avez pas encore de verbes favoris.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cliquez sur le ❤️ sur les cartes pour ajouter des verbes à vos favoris.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {verbs.map((verb, index) => (
                  <div
                    key={verb.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                  >
                    <VerbCard verb={verb} onClick={() => handleVerbClick(verb)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* Historique d'étude - en dessous des verbes */}
        <div className="mb-12">
          <StudyHistory onVerbClick={handleVerbClick} />
        </div>
      </section>

      {/* Modes spéciaux */}
      {mode === 'quiz' && verbs.length > 0 && (
        <QuizMode verbs={verbs} onClose={handleCloseMode} />
      )}
      {mode === 'flashcards' && verbs.length > 0 && (
        <FlashcardMode verbs={verbs} onClose={handleCloseMode} />
      )}
      {mode === 'fill-blanks' && verbs.length > 0 && (
        <FillBlanksMode verbs={verbs} onClose={handleCloseMode} />
      )}

      {/* Verb Detail Dialog */}
      <VerbDetailDialog 
        verb={selectedVerb} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
      />

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-12 sm:p-16 text-center backdrop-blur-sm shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-gradient" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Prêt à enrichir votre vocabulaire ?
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Engagez-vous à apprendre 10 nouveaux verbes chaque jour et observez vos compétences en anglais s'épanouir.
            </p>
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base px-8 py-6 border-0"
            >
              <span className="relative z-10">Commencer Maintenant</span>
              <div className="absolute inset-0 animate-shimmer" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/20 bg-background/60 backdrop-blur-xl py-12 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
            <p className="text-muted-foreground font-light">
              &copy; 2024 Daily English Verbs. Tous droits réservés.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-light">
                À propos
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-light">
                Contact
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-light">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Audio Indicator */}
      <AudioIndicator />
    </main>
  )
}
