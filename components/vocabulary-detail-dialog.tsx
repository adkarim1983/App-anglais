'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { VocabularyItem } from '@/lib/vocabulary'
import { speakVerb, speakExample, speakText } from '@/lib/speech'
import { Volume2 } from 'lucide-react'

interface VocabularyDetailDialogProps {
  item: VocabularyItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VocabularyDetailDialog({ item, open, onOpenChange }: VocabularyDetailDialogProps) {
  if (!item) return null

  const getTypeColor = () => {
    switch (item.type) {
      case 'verb':
        return 'text-blue-700 dark:text-blue-400'
      case 'adjective':
        return 'text-purple-700 dark:text-purple-400'
      case 'adverb':
        return 'text-cyan-700 dark:text-cyan-400'
      case 'expression':
        return 'text-amber-700 dark:text-amber-400'
      default:
        return 'text-blue-700 dark:text-blue-400'
    }
  }

  const getTypeLabel = () => {
    switch (item.type) {
      case 'verb':
        return 'Verbe'
      case 'adjective':
        return 'Adjectif'
      case 'adverb':
        return 'Adverbe'
      case 'expression':
        return 'Expression'
      default:
        return 'Vocabulaire'
    }
  }

  const getPastParticiple = () => {
    if (item.pastParticiple) return item.pastParticiple
    if (item.presentPerfect) return item.presentPerfect.replace('has ', '')
    return ''
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">
                  {getTypeLabel()}
                </span>
              </div>
              <DialogTitle className={`text-4xl font-bold ${getTypeColor()}`}>
                {item.english}
              </DialogTitle>
              <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold mt-2">{item.french}</p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => speakVerb(item.english)}
              className="shrink-0 h-12 w-12 p-0 border-blue-300 dark:border-blue-600/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400/50 transition-colors"
              title="Écouter la prononciation"
            >
              <Volume2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Contenu spécifique au type */}
          {item.type === 'verb' && renderVerbContent(item, getPastParticiple())}
          {item.type === 'adjective' && renderAdjectiveContent(item)}
          {item.type === 'adverb' && renderAdverbContent(item)}
          {item.type === 'expression' && renderExpressionContent(item)}

          {/* Exemples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              Exemples d'utilisation
            </h3>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed flex-1">
                    "{item.example}"
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakExample(item.example)}
                    className="shrink-0 h-7 w-7 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                    title="Écouter l'exemple"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </Button>
                </div>
                {item.exampleFr && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                    "{item.exampleFr}"
                  </p>
                )}
              </div>
              
              {/* Exemple supplémentaire généré */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/30 dark:to-teal-900/20 border border-teal-200 dark:border-teal-800/50 hover:border-teal-400 dark:hover:border-teal-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 dark:hover:shadow-teal-400/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed flex-1">
                    "{getSecondExample(item)}"
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakExample(getSecondExample(item))}
                    className="shrink-0 h-7 w-7 p-0 hover:bg-teal-100 dark:hover:bg-teal-500/20"
                    title="Écouter l'exemple"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                  "{getSecondExampleTranslation(item)}"
                </p>
              </div>

              {/* Troisième exemple */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20 border border-sky-200 dark:border-sky-800/50 hover:border-sky-400 dark:hover:border-sky-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 dark:hover:shadow-sky-400/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed flex-1">
                    "{getThirdExample(item)}"
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakExample(getThirdExample(item))}
                    className="shrink-0 h-7 w-7 p-0 hover:bg-sky-100 dark:hover:bg-sky-500/20"
                    title="Écouter l'exemple"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                  "{getThirdExampleTranslation(item)}"
                </p>
              </div>
            </div>
          </div>

          {/* Synonymes et Antonymes */}
          {(item.synonyms || item.antonyms || item.opposite) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.synonyms && item.synonyms.length > 0 && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 border border-green-200 dark:border-green-800/50">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    ✅ Synonymes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.synonyms.map((synonym, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {(item.antonyms && item.antonyms.length > 0 || item.opposite) && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    ⛔ Antonymes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.opposite && (
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">
                        {item.opposite}
                      </span>
                    )}
                    {item.antonyms?.map((antonym, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30"
                      >
                        {antonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          {item.notes && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/30 dark:via-yellow-950/30 dark:to-amber-950/30 border border-amber-200 dark:border-amber-800/50">
              <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">💡 Note</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Rendu spécifique pour les verbes
function renderVerbContent(item: VocabularyItem, pastParticiple: string) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
        Formes du Verbe
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800/50">
          <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">INFINITIVE</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.english.toLowerCase()}</p>
        </div>
        <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
          <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2">PAST SIMPLE</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.past}</p>
        </div>
        <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20 border border-violet-200 dark:border-violet-800/50">
          <p className="text-xs font-bold text-violet-700 dark:text-violet-400 mb-2">PAST PARTICIPLE</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{pastParticiple}</p>
        </div>
      </div>
      {item.isIrregular && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/20 border border-rose-200 dark:border-rose-800/50">
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">
            ⚠️ Verbe Irrégulier - Mémorisez ces formes!
          </p>
        </div>
      )}
    </div>
  )
}

// Rendu spécifique pour les adjectifs
function renderAdjectiveContent(item: VocabularyItem) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
        Formes de l'Adjectif
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800/50">
          <p className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-2">BASE</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.english.toLowerCase()}</p>
        </div>
        {item.comparative && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20 border border-pink-200 dark:border-pink-800/50">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-400 mb-2">COMPARATIVE</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.comparative}</p>
          </div>
        )}
        {item.superlative && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50 dark:from-fuchsia-950/30 dark:to-fuchsia-900/20 border border-fuchsia-200 dark:border-fuchsia-800/50">
            <p className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-400 mb-2">SUPERLATIVE</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.superlative}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Rendu spécifique pour les adverbes
function renderAdverbContent(item: VocabularyItem) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
        Informations sur l'Adverbe
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50">
          <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mb-2">ADVERBE</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.english.toLowerCase()}</p>
        </div>
        {item.relatedAdjective && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/30 dark:to-teal-900/20 border border-teal-200 dark:border-teal-800/50">
            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-2">ADJECTIF LIÉ</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{item.relatedAdjective}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Rendu spécifique pour les expressions
function renderExpressionContent(item: VocabularyItem) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
        À propos de cette Expression
      </h3>
      <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/50">
        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
          Cette expression est couramment utilisée dans les conversations quotidiennes en anglais.
        </p>
      </div>
    </div>
  )
}

// Fonctions helper pour générer des exemples supplémentaires
function getSecondExample(item: VocabularyItem): string {
  const examples: Record<string, string> = {
    // Adjectifs
    'Big': 'They live in a big house with a beautiful garden.',
    'Small': 'She has a small collection of rare books.',
    'Beautiful': 'The sunset was absolutely beautiful tonight.',
    'Good': 'He is a good teacher who cares about his students.',
    'Bad': 'Bad weather forced us to cancel the trip.',
    // Adverbes
    'Always': 'She always arrives on time for meetings.',
    'Never': 'I never forget to call my parents on weekends.',
    'Quickly': 'He quickly solved the complex problem.',
    'Slowly': 'The turtle moved slowly across the road.',
    // Expressions
    'How are you?': 'How are you doing today? I hope everything is well.',
    'Thank you': 'Thank you so much for your help yesterday.',
  }
  return examples[item.english] || `This is another example using ${item.english.toLowerCase()}.`
}

function getSecondExampleTranslation(item: VocabularyItem): string {
  const translations: Record<string, string> = {
    'Big': 'Ils vivent dans une grande maison avec un beau jardin.',
    'Small': 'Elle a une petite collection de livres rares.',
    'Beautiful': 'Le coucher de soleil était absolument magnifique ce soir.',
    'Good': 'C\'est un bon professeur qui se soucie de ses élèves.',
    'Bad': 'Le mauvais temps nous a forcés à annuler le voyage.',
    'Always': 'Elle arrive toujours à l\'heure aux réunions.',
    'Never': 'Je n\'oublie jamais d\'appeler mes parents le week-end.',
    'Quickly': 'Il a rapidement résolu le problème complexe.',
    'Slowly': 'La tortue se déplaçait lentement sur la route.',
    'How are you?': 'Comment allez-vous aujourd\'hui? J\'espère que tout va bien.',
    'Thank you': 'Merci beaucoup pour votre aide hier.',
  }
  return translations[item.english] || `Ceci est un autre exemple utilisant ${item.french.toLowerCase()}.`
}

function getThirdExample(item: VocabularyItem): string {
  const examples: Record<string, string> = {
    'Big': 'The company made a big announcement about their new product.',
    'Small': 'Even small changes can make a big difference.',
    'Beautiful': 'She wore a beautiful dress to the party.',
    'Good': 'That was a good decision that helped everyone.',
    'Bad': 'Don\'t let one bad day ruin your week.',
    'Always': 'He always brings a positive attitude to work.',
    'Never': 'They never give up, no matter how difficult it gets.',
    'Quickly': 'Time passes quickly when you\'re having fun.',
    'Slowly': 'She slowly opened the mysterious package.',
    'How are you?': 'How are you feeling after the long journey?',
    'Thank you': 'Thank you for being such a wonderful friend.',
  }
  return examples[item.english] || `Here is one more example with ${item.english.toLowerCase()}.`
}

function getThirdExampleTranslation(item: VocabularyItem): string {
  const translations: Record<string, string> = {
    'Big': 'L\'entreprise a fait une grande annonce sur leur nouveau produit.',
    'Small': 'Même de petits changements peuvent faire une grande différence.',
    'Beautiful': 'Elle portait une belle robe à la fête.',
    'Good': 'C\'était une bonne décision qui a aidé tout le monde.',
    'Bad': 'Ne laissez pas une mauvaise journée gâcher votre semaine.',
    'Always': 'Il apporte toujours une attitude positive au travail.',
    'Never': 'Ils n\'abandonnent jamais, peu importe la difficulté.',
    'Quickly': 'Le temps passe vite quand on s\'amuse.',
    'Slowly': 'Elle a lentement ouvert le paquet mystérieux.',
    'How are you?': 'Comment vous sentez-vous après le long voyage?',
    'Thank you': 'Merci d\'être un ami si merveilleux.',
  }
  return translations[item.english] || `Voici un autre exemple avec ${item.french.toLowerCase()}.`
}
