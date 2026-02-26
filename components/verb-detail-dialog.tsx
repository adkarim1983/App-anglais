'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { type Verb } from '@/lib/verbs'
import { speakVerb, speakExample, speakText } from '@/lib/speech'
import { Volume2 } from 'lucide-react'

interface VerbDetailDialogProps {
  verb: Verb | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VerbDetailDialog({ verb, open, onOpenChange }: VerbDetailDialogProps) {
  if (!verb) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                {verb.english}
              </DialogTitle>
              <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold mt-2">{verb.french}</p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => speakVerb(verb.english)}
              className="shrink-0 h-12 w-12 p-0 border-blue-300 dark:border-blue-600/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400/50 transition-colors"
              title="Écouter la prononciation"
            >
              <Volume2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Conjugaison complète */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              Conjugaison Complète
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Present Simple - Bleu */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-blue-700 dark:text-blue-400">Present Simple</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I ${verb.english.toLowerCase()}, you ${verb.english.toLowerCase()}, he ${verb.present}`)}
                    className="h-7 w-7 p-0 hover:bg-blue-100 dark:hover:bg-blue-500/20"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">I</span> {verb.english.toLowerCase()}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> {verb.english.toLowerCase()}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">He/She/It</span> {verb.present}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">We</span> {verb.english.toLowerCase()}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> {verb.english.toLowerCase()}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">They</span> {verb.english.toLowerCase()}</p>
                </div>
              </div>
              
              {/* Past Simple - Indigo */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-400 dark:hover:border-indigo-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/20">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-indigo-700 dark:text-indigo-400">Past Simple</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I ${verb.past}, you ${verb.past}, he ${verb.past}`)}
                    className="h-7 w-7 p-0 hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">I</span> {verb.past}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> {verb.past}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">He/She/It</span> {verb.past}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">We</span> {verb.past}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> {verb.past}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">They</span> {verb.past}</p>
                </div>
              </div>
              
              {/* Future Simple - Cyan */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20 border border-cyan-200 dark:border-cyan-800/50 hover:border-cyan-400 dark:hover:border-cyan-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-400/20">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-cyan-700 dark:text-cyan-400">Future Simple</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I ${verb.future}, you ${verb.future}, he ${verb.future}`)}
                    className="h-7 w-7 p-0 hover:bg-cyan-100 dark:hover:bg-cyan-500/20"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">I</span> {verb.future}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> {verb.future}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">He/She/It</span> {verb.future}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">We</span> {verb.future}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> {verb.future}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">They</span> {verb.future}</p>
                </div>
              </div>
              
              {/* Present Perfect - Violet */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20 border border-violet-200 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 dark:hover:shadow-violet-400/20">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-violet-700 dark:text-violet-400">Present Perfect</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I have ${getPastParticiple(verb)}, you have ${getPastParticiple(verb)}, he ${verb.presentPerfect}`)}
                    className="h-7 w-7 p-0 hover:bg-violet-100 dark:hover:bg-violet-500/20"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">I</span> have {getPastParticiple(verb)}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> have {getPastParticiple(verb)}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">He/She/It</span> {verb.presentPerfect}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">We</span> have {getPastParticiple(verb)}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">You</span> have {getPastParticiple(verb)}</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400 font-medium">They</span> have {getPastParticiple(verb)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Exemples avec traduction */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              Exemples d'utilisation
            </h3>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 hover:border-emerald-400 dark:hover:border-emerald-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed flex-1">
                    "{verb.example}"
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakExample(verb.example)}
                    className="shrink-0 h-7 w-7 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                    title="Écouter l'exemple"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                  "{getExampleTranslation(verb)}"
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/30 dark:to-teal-900/20 border border-teal-200 dark:border-teal-800/50 hover:border-teal-400 dark:hover:border-teal-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 dark:hover:shadow-teal-400/20">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed flex-1">
                    "{getSecondExample(verb)}"
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakExample(getSecondExample(verb))}
                    className="shrink-0 h-7 w-7 p-0 hover:bg-teal-100 dark:hover:bg-teal-500/20"
                    title="Écouter l'exemple"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                  "{getSecondExampleTranslation(verb)}"
                </p>
              </div>
            </div>
          </div>

          {/* Verbe irrégulier */}
          {verb.isIrregular && verb.pastParticiple && (
            <div className="p-5 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/20 border border-rose-200 dark:border-rose-800/50">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-rose-200 dark:border-rose-700 pb-2 mb-3">
                ⚠️ Verbe Irrégulier
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Base</p>
                  <p className="text-lg font-bold text-rose-700 dark:text-rose-400">{verb.english.toLowerCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Past</p>
                  <p className="text-lg font-bold text-rose-700 dark:text-rose-400">{verb.past}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Past Participle</p>
                  <p className="text-lg font-bold text-rose-700 dark:text-rose-400">{verb.pastParticiple}</p>
                </div>
              </div>
            </div>
          )}

          {/* Synonymes et Antonymes */}
          {(verb.synonyms || verb.antonyms) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verb.synonyms && verb.synonyms.length > 0 && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 border border-green-200 dark:border-green-800/50">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    ✅ Synonymes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {verb.synonyms.map((synonym, index) => (
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
              
              {verb.antonyms && verb.antonyms.length > 0 && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800/50">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    ⛔ Antonymes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {verb.antonyms.map((antonym, index) => (
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

          {/* Expressions idiomatiques */}
          {verb.idioms && verb.idioms.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
                💬 Expressions Idiomatiques
              </h3>
              <div className="space-y-3">
                {verb.idioms.map((idiom, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800/50"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-slate-700 dark:text-slate-200 font-semibold">{idiom.english}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => speakText(idiom.english)}
                        className="shrink-0 h-7 w-7 p-0 hover:bg-purple-100 dark:hover:bg-purple-500/20"
                      >
                        <Volume2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">{idiom.french}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contexte professionnel */}
          {verb.businessContext && (
            <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20 border border-sky-200 dark:border-sky-800/50">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 border-b border-sky-200 dark:border-sky-700 pb-2 mb-3">
                💼 Contexte Professionnel
              </h3>
              <div className="flex items-start justify-between gap-3">
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed flex-1">
                  "{verb.businessContext}"
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => speakText(verb.businessContext!)}
                  className="shrink-0 h-7 w-7 p-0 hover:bg-sky-100 dark:hover:bg-sky-500/20"
                >
                  <Volume2 className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                </Button>
              </div>
            </div>
          )}

          {/* Conseils d'apprentissage */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/30 dark:via-yellow-950/30 dark:to-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">💡 Conseil d'apprentissage</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Pratiquez ce verbe en créant vos propres phrases. Essayez de l'utiliser dans différents temps pour mieux mémoriser ses conjugaisons.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Fonction helper pour extraire le participe passé
function getPastParticiple(verb: Verb): string {
  // Extraire le participe passé de "has learned" -> "learned"
  return verb.presentPerfect.replace('has ', '')
}

// Fonctions helper pour générer des exemples supplémentaires
function getExampleTranslation(verb: Verb): string {
  const translations: Record<string, string> = {
    'Learn': 'Elle apprend de nouvelles langues chaque année.',
    'Write': 'Il écrit de la belle poésie.',
    'Speak': 'Ils parlent trois langues couramment.',
    'Understand': 'Je comprends l\'importance de la pratique.',
    'Create': 'Elle crée de l\'art numérique incroyable.',
    'Explore': 'Ils explorent de nouveaux pays chaque été.',
    'Achieve': 'Il atteint ses objectifs grâce à sa détermination.',
    'Discover': 'Les scientifiques découvrent régulièrement de nouvelles espèces.',
    'Develop': 'Elle développe des solutions innovantes aux problèmes.',
    'Improve': 'Vos compétences s\'améliorent avec une pratique régulière.',
    'Inspire': 'Les grands leaders inspirent les autres à rêver.',
    'Challenge': 'Les nouveaux projets défient notre créativité.',
    'Collaborate': 'Les équipes collaborent pour obtenir de grands résultats.',
    'Analyze': 'Le chercheur analyse les données avec soin.',
    'Establish': 'Elle établit de solides relations avec les clients.',
    'Transform': 'L\'éducation transforme les vies et les communautés.',
    'Accelerate': 'Le projet accélère les progrès vers les objectifs.',
    'Navigate': 'Elle navigue bien dans les situations commerciales complexes.',
    'Cultivate': 'Il cultive une culture positive et inclusive.',
    'Empower': 'La connaissance permet aux gens de faire de meilleurs choix.',
  }
  return translations[verb.english] || verb.example
}

function getSecondExample(verb: Verb): string {
  const examples: Record<string, string> = {
    'Learn': 'They learned from their mistakes and improved quickly.',
    'Write': 'She has written three novels this year.',
    'Speak': 'He will speak at the conference next month.',
    'Understand': 'We understood the problem after careful analysis.',
    'Create': 'Artists create beauty from ordinary materials.',
    'Explore': 'We will explore the ancient ruins tomorrow.',
    'Achieve': 'She has achieved remarkable success in her career.',
    'Discover': 'They discovered a hidden talent for music.',
    'Develop': 'The team develops new features every sprint.',
    'Improve': 'He improved his skills through daily practice.',
    'Inspire': 'Her story inspires millions around the world.',
    'Challenge': 'This puzzle will challenge your problem-solving skills.',
    'Collaborate': 'We collaborated with experts from different fields.',
    'Analyze': 'They analyze market trends to make better decisions.',
    'Establish': 'The company established a strong presence in Asia.',
    'Transform': 'Technology has transformed how we communicate.',
    'Accelerate': 'Innovation accelerates economic growth.',
    'Navigate': 'He navigates difficult conversations with ease.',
    'Cultivate': 'They cultivate relationships with their community.',
    'Empower': 'Education empowers individuals to reach their potential.',
  }
  return examples[verb.english] || `I ${verb.english.toLowerCase()} every day to improve my skills.`
}

function getSecondExampleTranslation(verb: Verb): string {
  const translations: Record<string, string> = {
    'Learn': 'Ils ont appris de leurs erreurs et se sont améliorés rapidement.',
    'Write': 'Elle a écrit trois romans cette année.',
    'Speak': 'Il parlera à la conférence le mois prochain.',
    'Understand': 'Nous avons compris le problème après une analyse minutieuse.',
    'Create': 'Les artistes créent de la beauté à partir de matériaux ordinaires.',
    'Explore': 'Nous explorerons les ruines anciennes demain.',
    'Achieve': 'Elle a obtenu un succès remarquable dans sa carrière.',
    'Discover': 'Ils ont découvert un talent caché pour la musique.',
    'Develop': 'L\'équipe développe de nouvelles fonctionnalités à chaque sprint.',
    'Improve': 'Il a amélioré ses compétences grâce à la pratique quotidienne.',
    'Inspire': 'Son histoire inspire des millions de personnes dans le monde.',
    'Challenge': 'Ce puzzle mettra à l\'épreuve vos compétences en résolution de problèmes.',
    'Collaborate': 'Nous avons collaboré avec des experts de différents domaines.',
    'Analyze': 'Ils analysent les tendances du marché pour prendre de meilleures décisions.',
    'Establish': 'L\'entreprise a établi une forte présence en Asie.',
    'Transform': 'La technologie a transformé notre façon de communiquer.',
    'Accelerate': 'L\'innovation accélère la croissance économique.',
    'Navigate': 'Il navigue dans les conversations difficiles avec aisance.',
    'Cultivate': 'Ils cultivent des relations avec leur communauté.',
    'Empower': 'L\'éducation permet aux individus d\'atteindre leur potentiel.',
  }
  return translations[verb.english] || `Je ${verb.french.toLowerCase()} chaque jour pour améliorer mes compétences.`
}
