'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VocabularyItem } from '@/lib/vocabulary'
import { getAllVerbs } from '@/lib/verbs'
import { ESSENTIAL_VERBS_WITH_IDS } from '@/lib/essential-verbs'
import { ADJECTIVES_WITH_IDS } from '@/lib/adjectives-data'
import { ADVERBS_WITH_IDS } from '@/lib/adverbs-data'
import { EXPRESSIONS_WITH_IDS } from '@/lib/expressions-data'
import { CheckCircle2, RotateCcw } from 'lucide-react'

interface MasteryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'mastered' | 'toReview'
  itemIds: number[]
  onItemClick: (item: VocabularyItem) => void
}

export function MasteryDialog({ open, onOpenChange, type, itemIds, onItemClick }: MasteryDialogProps) {
  // Récupérer tous les items de vocabulaire
  const allItems: VocabularyItem[] = [
    ...getAllVerbs(),
    ...ESSENTIAL_VERBS_WITH_IDS,
    ...ADJECTIVES_WITH_IDS,
    ...ADVERBS_WITH_IDS,
    ...EXPRESSIONS_WITH_IDS,
  ]

  // Filtrer les items selon les IDs
  const items = allItems.filter(item => itemIds.includes(item.id))

  const title = type === 'mastered' ? 'Items Maîtrisés' : 'Items à Revoir'
  const icon = type === 'mastered' ? <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" /> : <RotateCcw className="h-8 w-8 text-orange-600 dark:text-orange-400" />
  const emptyMessage = type === 'mastered' 
    ? 'Aucun item maîtrisé pour le moment. Marquez des items comme maîtrisés pour les voir ici!' 
    : 'Aucun item à revoir pour le moment. Marquez des items à revoir pour les retrouver ici!'

  // Grouper par type
  const verbs = items.filter(item => item.type === 'verb')
  const adjectives = items.filter(item => item.type === 'adjective')
  const adverbs = items.filter(item => item.type === 'adverb')
  const expressions = items.filter(item => item.type === 'expression')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 backdrop-blur-xl border-2 border-slate-300 dark:border-slate-700">
        <DialogHeader className="pb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30">
              {icon}
            </div>
            <div>
              <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                {title}
              </DialogTitle>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
                {items.length} item{items.length > 1 ? 's' : ''} au total
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-8 px-2">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">{type === 'mastered' ? '✅' : '🔁'}</div>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {emptyMessage}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Verbes */}
              {verbs.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-blue-200 dark:border-blue-800">
                    <span className="text-3xl">📚</span>
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      Verbes ({verbs.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                    {verbs.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onItemClick(item)}
                        className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer p-4"
                      >
                        <div className="space-y-3">
                          {/* Titre */}
                          <div>
                            <h4 className="text-xl font-bold text-blue-700 dark:text-blue-400 truncate">
                              {item.english}
                            </h4>
                            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                              {item.french}
                            </p>
                          </div>
                          
                          {/* Formes du verbe */}
                          <div className="space-y-1.5 text-sm">
                            <div>
                              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Infinitive: </span>
                              <span className="text-slate-800 dark:text-slate-200">{item.english.toLowerCase()}</span>
                            </div>
                            <div>
                              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Past: </span>
                              <span className="text-slate-800 dark:text-slate-200">{item.past}</span>
                            </div>
                            <div>
                              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase">Participle: </span>
                              <span className="text-slate-800 dark:text-slate-200">
                                {item.pastParticiple || (item.presentPerfect ? item.presentPerfect.replace('has ', '') : '')}
                              </span>
                            </div>
                          </div>
                          
                          {/* Exemple */}
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
                              "{item.example}"
                            </p>
                          </div>
                          
                          {/* Badges */}
                          <div className="flex items-center justify-between pt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.difficulty === 'easy' 
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                : item.difficulty === 'medium' 
                                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' 
                                : 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400'
                            }`}>
                              {item.difficulty === 'easy' ? '⭐ Facile' : item.difficulty === 'medium' ? '⭐⭐ Moyen' : '⭐⭐⭐ Difficile'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Adjectifs */}
              {adjectives.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-purple-200 dark:border-purple-800">
                    <span className="text-3xl">🎨</span>
                    <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                      Adjectifs ({adjectives.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                    {adjectives.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onItemClick(item)}
                        className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer p-4"
                      >
                        <div className="space-y-3">
                          {/* Titre */}
                          <div>
                            <h4 className="text-xl font-bold text-purple-700 dark:text-purple-400 truncate">
                              {item.english}
                            </h4>
                            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                              {item.french}
                            </p>
                          </div>
                          
                          {/* Formes de l'adjectif */}
                          <div className="space-y-1.5 text-sm">
                            <div>
                              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Base: </span>
                              <span className="text-slate-800 dark:text-slate-200">{item.english.toLowerCase()}</span>
                            </div>
                            {item.comparative && (
                              <div>
                                <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase">Comparative: </span>
                                <span className="text-slate-800 dark:text-slate-200">{item.comparative}</span>
                              </div>
                            )}
                            {item.superlative && (
                              <div>
                                <span className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase">Superlative: </span>
                                <span className="text-slate-800 dark:text-slate-200">{item.superlative}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Exemple */}
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
                              "{item.example}"
                            </p>
                          </div>
                          
                          {/* Badges */}
                          <div className="flex items-center justify-between pt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.difficulty === 'easy' 
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                : item.difficulty === 'medium' 
                                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' 
                                : 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400'
                            }`}>
                              {item.difficulty === 'easy' ? '⭐ Facile' : item.difficulty === 'medium' ? '⭐⭐ Moyen' : '⭐⭐⭐ Difficile'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Adverbes */}
              {adverbs.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-cyan-200 dark:border-cyan-800">
                    <span className="text-3xl">⚡</span>
                    <h3 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
                      Adverbes ({adverbs.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                    {adverbs.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onItemClick(item)}
                        className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer p-4"
                      >
                        <div className="space-y-3">
                          {/* Titre */}
                          <div>
                            <h4 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 truncate">
                              {item.english}
                            </h4>
                            <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                              {item.french}
                            </p>
                          </div>
                          
                          {/* Info adverbe */}
                          <div className="space-y-1.5 text-sm">
                            <div>
                              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase">Adverbe: </span>
                              <span className="text-slate-800 dark:text-slate-200">{item.english.toLowerCase()}</span>
                            </div>
                            {item.relatedAdjective && (
                              <div>
                                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">Adjectif lié: </span>
                                <span className="text-slate-800 dark:text-slate-200">{item.relatedAdjective}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Exemple */}
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
                              "{item.example}"
                            </p>
                          </div>
                          
                          {/* Badges */}
                          <div className="flex items-center justify-between pt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.difficulty === 'easy' 
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                : item.difficulty === 'medium' 
                                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' 
                                : 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400'
                            }`}>
                              {item.difficulty === 'easy' ? '⭐ Facile' : item.difficulty === 'medium' ? '⭐⭐ Moyen' : '⭐⭐⭐ Difficile'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expressions */}
              {expressions.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-amber-200 dark:border-amber-800">
                    <span className="text-3xl">💬</span>
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                      Expressions ({expressions.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
                    {expressions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onItemClick(item)}
                        className="group relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer p-4"
                      >
                        <div className="space-y-3">
                          {/* Titre */}
                          <div>
                            <h4 className="text-lg font-bold text-amber-700 dark:text-amber-400 leading-tight">
                              {item.english}
                            </h4>
                            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-1">
                              {item.french}
                            </p>
                          </div>
                          
                          {/* Notes */}
                          {item.notes && (
                            <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                              <p className="text-xs text-amber-700 dark:text-amber-300 italic line-clamp-2">
                                {item.notes}
                              </p>
                            </div>
                          )}
                          
                          {/* Exemple */}
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-2">
                              "{item.example}"
                            </p>
                          </div>
                          
                          {/* Badges */}
                          <div className="flex items-center justify-between pt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.difficulty === 'easy' 
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                : item.difficulty === 'medium' 
                                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' 
                                : 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400'
                            }`}>
                              {item.difficulty === 'easy' ? '⭐ Facile' : item.difficulty === 'medium' ? '⭐⭐ Moyen' : '⭐⭐⭐ Difficile'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
