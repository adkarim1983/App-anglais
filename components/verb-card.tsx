'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isVerbLearned, isFavorite, toggleFavorite } from '@/lib/progress'
import { speakVerb } from '@/lib/speech'
import { useEffect, useState } from 'react'
import { Volume2, Heart } from 'lucide-react'
import { type Verb } from '@/lib/verbs'

export type { Verb } from '@/lib/verbs'

interface VerbCardProps {
  verb: Verb
  onClick?: () => void
}

export function VerbCard({ verb, onClick }: VerbCardProps) {
  const [learned, setLearned] = useState(false)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setLearned(isVerbLearned(verb.id))
    setFavorite(isFavorite(verb.id))
  }, [verb.id])

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    speakVerb(verb.english)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(verb.id)
    setFavorite(!favorite)
  }

  const getDifficultyStars = () => {
    if (verb.difficulty === 'easy') return '⭐'
    if (verb.difficulty === 'medium') return '⭐⭐'
    return '⭐⭐⭐'
  }

  return (
    <Card 
      onClick={onClick}
      className="group relative overflow-hidden border border-slate-700/50 dark:border-slate-600/30 bg-white dark:bg-slate-900/90 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:scale-[1.02] transition-all duration-500 cursor-pointer"
    >
      {/* Gradient overlay on hover - Bleu royal et violet */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-indigo-600/10 dark:from-blue-500/15 dark:via-purple-500/10 dark:to-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect - Or et bleu */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 dark:via-blue-300/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      <div className="relative p-5 flex flex-col h-full">
        {/* Header avec icônes */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex-1 min-w-0">
            {/* Titre en bleu royal */}
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-300 truncate">
              {verb.english}
            </h3>
            {/* Traduction en violet/améthyste */}
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">
              {verb.french}
            </p>
          </div>
          
          <div className="flex gap-1 shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggleFavorite}
              className={`h-7 w-7 p-0 rounded-full transition-all ${
                favorite 
                  ? 'text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-400/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-blue-500/10 dark:hover:bg-blue-400/20 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${favorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handlePlayAudio}
              className="h-7 w-7 p-0 rounded-full text-slate-500 dark:text-slate-400 hover:bg-blue-500/10 dark:hover:bg-blue-400/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Conjugaisons avec couleurs alternées */}
        <div className="space-y-2.5 flex-1 text-sm">
          {/* Present - Bleu */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Present</p>
            <p className="text-slate-800 dark:text-slate-200 font-semibold">{verb.present}</p>
          </div>
          
          {/* Past - Indigo */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Past</p>
            <p className="text-slate-800 dark:text-slate-200 font-semibold">{verb.past}</p>
          </div>
          
          {/* Future - Cyan */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">Future</p>
            <p className="text-slate-800 dark:text-slate-200 font-semibold">{verb.future}</p>
          </div>
          
          {/* Present Perfect - Violet */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">Present Perfect</p>
            <p className="text-slate-800 dark:text-slate-200 font-semibold">{verb.presentPerfect}</p>
          </div>
        </div>

        {/* Exemple avec fond subtil */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed line-clamp-2">
            "{verb.example}"
          </p>
        </div>

        {/* Footer avec badge et difficulté */}
        <div className="flex items-center justify-between mt-3">
          {learned && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 text-white shadow-sm">
              ✓ Appris
            </span>
          )}
          <span className={`text-xs font-medium ml-auto px-2 py-1 rounded-full ${
            verb.difficulty === 'easy' 
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' 
              : verb.difficulty === 'medium' 
              ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' 
              : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
          }`}>
            {getDifficultyStars()} {verb.difficulty === 'easy' ? 'Facile' : verb.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
          </span>
        </div>
      </div>
    </Card>
  )
}
