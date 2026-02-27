'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isVerbLearned, isFavorite, toggleFavorite } from '@/lib/progress'
import { speakVerb } from '@/lib/speech'
import { useEffect, useState } from 'react'
import { Volume2, Heart } from 'lucide-react'
import { VocabularyItem } from '@/lib/vocabulary'

interface VocabularyCardProps {
  item: VocabularyItem
  onClick?: () => void
}

export function VocabularyCard({ item, onClick }: VocabularyCardProps) {
  const [learned, setLearned] = useState(false)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setLearned(isVerbLearned(item.id))
    setFavorite(isFavorite(item.id))
  }, [item.id])

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    speakVerb(item.english)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(item.id)
    setFavorite(!favorite)
  }

  const getDifficultyStars = () => {
    if (item.difficulty === 'easy') return '⭐'
    if (item.difficulty === 'medium') return '⭐⭐'
    return '⭐⭐⭐'
  }

  const getTypeColor = () => {
    switch (item.type) {
      case 'verb':
        return 'text-blue-600 dark:text-blue-400'
      case 'adjective':
        return 'text-purple-600 dark:text-purple-400'
      case 'adverb':
        return 'text-cyan-600 dark:text-cyan-400'
      case 'expression':
        return 'text-amber-600 dark:text-amber-400'
      default:
        return 'text-blue-600 dark:text-blue-400'
    }
  }

  const renderContent = () => {
    switch (item.type) {
      case 'verb':
        return (
          <>
            <div className="space-y-1">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Infinitive</p>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">{item.english.toLowerCase()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Past Simple</p>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">{item.past}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">Past Participle</p>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">
                {item.pastParticiple || (item.presentPerfect ? item.presentPerfect.replace('has ', '') : '')}
              </p>
            </div>
          </>
        )
      
      case 'adjective':
        return (
          <>
            <div className="space-y-1">
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Base</p>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">{item.english.toLowerCase()}</p>
            </div>
            {item.comparative && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wide">Comparative</p>
                <p className="text-slate-800 dark:text-slate-200 font-semibold">{item.comparative}</p>
              </div>
            )}
            {item.superlative && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wide">Superlative</p>
                <p className="text-slate-800 dark:text-slate-200 font-semibold">{item.superlative}</p>
              </div>
            )}
          </>
        )
      
      case 'adverb':
        return (
          <>
            <div className="space-y-1">
              <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">Adverbe</p>
              <p className="text-slate-800 dark:text-slate-200 font-semibold">{item.english.toLowerCase()}</p>
            </div>
            {item.relatedAdjective && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">Adjectif lié</p>
                <p className="text-slate-800 dark:text-slate-200 font-semibold">{item.relatedAdjective}</p>
              </div>
            )}
            {item.synonyms && item.synonyms.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide">Synonymes</p>
                <p className="text-slate-800 dark:text-slate-200 font-semibold text-xs">
                  {item.synonyms.slice(0, 2).join(', ')}
                </p>
              </div>
            )}
          </>
        )
      
      case 'expression':
        return (
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">Expression</p>
              <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm leading-tight">
                {item.english}
              </p>
            </div>
            {item.notes && (
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                <p className="text-xs text-amber-700 dark:text-amber-300 italic">
                  {item.notes}
                </p>
              </div>
            )}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <Card 
      onClick={onClick}
      className="group relative overflow-hidden border border-slate-700/50 dark:border-slate-600/30 bg-white dark:bg-slate-900/90 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:scale-[1.02] transition-all duration-500 cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-indigo-600/10 dark:from-blue-500/15 dark:via-purple-500/10 dark:to-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 dark:via-blue-300/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      <div className="relative p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className={`text-2xl font-bold ${getTypeColor()} group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-300 ${item.type === 'expression' ? 'text-base' : 'truncate'}`}>
              {item.english}
            </h3>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">
              {item.french}
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

        {/* Contenu spécifique au type */}
        <div className="space-y-2.5 flex-1 text-sm">
          {renderContent()}
        </div>

        {/* Exemple */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed line-clamp-2">
            "{item.example}"
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          {learned && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 text-white shadow-sm">
              ✓ Appris
            </span>
          )}
          <span className={`text-xs font-medium ml-auto px-2 py-1 rounded-full ${
            item.difficulty === 'easy' 
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' 
              : item.difficulty === 'medium' 
              ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' 
              : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
          }`}>
            {getDifficultyStars()} {item.difficulty === 'easy' ? 'Facile' : item.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
          </span>
        </div>
      </div>
    </Card>
  )
}
