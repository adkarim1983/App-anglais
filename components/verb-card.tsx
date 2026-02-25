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

  return (
    <Card 
      onClick={onClick}
      className="group relative overflow-hidden border border-border/30 bg-card/80 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
    >
      {/* Badge "Appris" */}
      {learned && (
        <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold shadow-lg">
          ✓ Appris
        </div>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 animate-shimmer" />
      </div>
      
      <div className="relative p-6 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-2xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 flex-1">
              {verb.english}
            </h3>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToggleFavorite}
                className={`shrink-0 h-8 w-8 p-0 transition-colors ${
                  favorite 
                    ? 'text-red-500 hover:text-red-600 hover:bg-red-500/10' 
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
                title={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePlayAudio}
                className="shrink-0 h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
                title="Écouter la prononciation"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {verb.french}
          </p>
        </div>

        {/* Conjugations */}
        <div className="space-y-3 text-xs flex-1">
          <div className="group/item hover:translate-x-1 transition-transform duration-200">
            <p className="font-semibold text-muted-foreground/80 mb-1">Present</p>
            <p className="text-foreground font-medium">{verb.present}</p>
          </div>
          <div className="group/item hover:translate-x-1 transition-transform duration-200">
            <p className="font-semibold text-muted-foreground/80 mb-1">Past</p>
            <p className="text-foreground font-medium">{verb.past}</p>
          </div>
          <div className="group/item hover:translate-x-1 transition-transform duration-200">
            <p className="font-semibold text-muted-foreground/80 mb-1">Future</p>
            <p className="text-foreground font-medium">{verb.future}</p>
          </div>
          <div className="group/item hover:translate-x-1 transition-transform duration-200">
            <p className="font-semibold text-muted-foreground/80 mb-1">Present Perfect</p>
            <p className="text-foreground font-medium">{verb.presentPerfect}</p>
          </div>
        </div>

        {/* Example */}
        <div className="mt-6 pt-4 border-t border-border/20">
          <p className="text-xs text-muted-foreground italic leading-relaxed font-light">
            "{verb.example}"
          </p>
        </div>
      </div>
    </Card>
  )
}
