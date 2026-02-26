'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VerbCard, type Verb } from '@/components/verb-card'
import { ESSENTIAL_VERBS_WITH_IDS } from '@/lib/essential-verbs'
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

interface EssentialVerbsSectionProps {
  onVerbClick: (verb: Verb) => void
}

export function EssentialVerbsSection({ onVerbClick }: EssentialVerbsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const displayedVerbs = isExpanded ? ESSENTIAL_VERBS_WITH_IDS : ESSENTIAL_VERBS_WITH_IDS.slice(0, 6)

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/30 dark:via-yellow-950/30 dark:to-amber-950/30 border-2 border-amber-200 dark:border-amber-800/50 backdrop-blur-xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                Verbes Essentiels
              </h2>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Les {ESSENTIAL_VERBS_WITH_IDS.length} verbes les plus courants en anglais
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-300"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Réduire
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Voir tous ({ESSENTIAL_VERBS_WITH_IDS.length})
              </>
            )}
          </Button>
        </div>

        {/* Info box */}
        <div className="p-4 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold">💡 Ces verbes sont fondamentaux</span> - Ils représentent les actions et états les plus utilisés au quotidien. Maîtrisez-les en priorité pour communiquer efficacement en anglais!
          </p>
        </div>

        {/* Grid de verbes */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {displayedVerbs.map((verb, index) => (
            <div
              key={verb.id}
              style={{ animationDelay: `${index * 30}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <VerbCard verb={verb} onClick={() => onVerbClick(verb)} />
            </div>
          ))}
        </div>

        {/* Stats */}
        {isExpanded && (
          <div className="pt-4 border-t border-amber-200 dark:border-amber-800/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {ESSENTIAL_VERBS_WITH_IDS.filter(v => v.isIrregular).length}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">Verbes irréguliers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {ESSENTIAL_VERBS_WITH_IDS.length}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  100%
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">Essentiels</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
