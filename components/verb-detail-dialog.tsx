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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/30">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {verb.english}
              </DialogTitle>
              <p className="text-xl text-primary/80 font-medium mt-2">{verb.french}</p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => speakVerb(verb.english)}
              className="shrink-0 h-12 w-12 p-0 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-colors"
              title="Écouter la prononciation"
            >
              <Volume2 className="h-6 w-6 text-primary" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Conjugaison complète */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b border-border/30 pb-2">
              Conjugaison Complète
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Present Simple */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-primary">Present Simple</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I ${verb.english.toLowerCase()}, you ${verb.english.toLowerCase()}, he ${verb.present}`)}
                    className="h-7 w-7 p-0 hover:bg-primary/10"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">I</span> {verb.english.toLowerCase()}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> {verb.english.toLowerCase()}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">He/She/It</span> {verb.present}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">We</span> {verb.english.toLowerCase()}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> {verb.english.toLowerCase()}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">They</span> {verb.english.toLowerCase()}</p>
                </div>
              </div>
              
              {/* Past Simple */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-accent">Past Simple</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I ${verb.past}, you ${verb.past}, he ${verb.past}`)}
                    className="h-7 w-7 p-0 hover:bg-accent/10"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">I</span> {verb.past}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> {verb.past}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">He/She/It</span> {verb.past}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">We</span> {verb.past}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> {verb.past}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">They</span> {verb.past}</p>
                </div>
              </div>
              
              {/* Future Simple */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-primary">Future Simple</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I ${verb.future}, you ${verb.future}, he ${verb.future}`)}
                    className="h-7 w-7 p-0 hover:bg-primary/10"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">I</span> {verb.future}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> {verb.future}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">He/She/It</span> {verb.future}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">We</span> {verb.future}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> {verb.future}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">They</span> {verb.future}</p>
                </div>
              </div>
              
              {/* Present Perfect */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-accent">Present Perfect</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(`I have ${getPastParticiple(verb)}, you have ${getPastParticiple(verb)}, he ${verb.presentPerfect}`)}
                    className="h-7 w-7 p-0 hover:bg-accent/10"
                    title="Écouter"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">I</span> have {getPastParticiple(verb)}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> have {getPastParticiple(verb)}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">He/She/It</span> {verb.presentPerfect}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">We</span> have {getPastParticiple(verb)}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">You</span> have {getPastParticiple(verb)}</p>
                  <p className="text-foreground"><span className="text-muted-foreground font-medium">They</span> have {getPastParticiple(verb)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Exemples avec traduction */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b border-border/30 pb-2">
              Exemples d'utilisation
            </h3>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-foreground font-medium leading-relaxed flex-1">
                    "{verb.example}"
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakExample(verb.example)}
                    className="shrink-0 h-7 w-7 p-0 hover:bg-primary/10"
                    title="Écouter l'exemple"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm italic">
                  "{getExampleTranslation(verb)}"
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-foreground font-medium leading-relaxed flex-1">
                    "{getSecondExample(verb)}"
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakExample(getSecondExample(verb))}
                    className="shrink-0 h-7 w-7 p-0 hover:bg-accent/10"
                    title="Écouter l'exemple"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm italic">
                  "{getSecondExampleTranslation(verb)}"
                </p>
              </div>
            </div>
          </div>

          {/* Conseils d'apprentissage */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border/20">
            <h3 className="text-sm font-semibold text-primary mb-2">💡 Conseil d'apprentissage</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
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
