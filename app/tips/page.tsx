'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'
import { BookOpen, Headphones, MessageCircle, Pen, Video, Globe, Calendar, Target } from 'lucide-react'

interface Tip {
  icon: React.ReactNode
  title: string
  description: string
  examples: string[]
}

const LEARNING_TIPS: Tip[] = [
  {
    icon: <Headphones className="w-8 h-8" />,
    title: 'Écoutez 5 minutes d\'anglais par jour',
    description: 'L\'écoute régulière améliore votre compréhension orale et votre prononciation. Même 5 minutes quotidiennes font une grande différence.',
    examples: [
      'Écoutez des podcasts en anglais pendant vos trajets',
      'Regardez des vidéos YouTube avec sous-titres anglais',
      'Utilisez des applications d\'apprentissage avec audio'
    ]
  },
  {
    icon: <Pen className="w-8 h-8" />,
    title: 'Écrivez 5 phrases chaque jour',
    description: 'La pratique de l\'écriture renforce votre grammaire et votre vocabulaire. Commencez simplement et progressez graduellement.',
    examples: [
      'Tenez un journal quotidien en anglais',
      'Décrivez votre journée en 5 phrases simples',
      'Écrivez des commentaires sur les réseaux sociaux en anglais'
    ]
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Pratiquez la conversation régulièrement',
    description: 'Parler anglais, même avec vous-même, améliore votre fluidité et votre confiance. N\'ayez pas peur de faire des erreurs.',
    examples: [
      'Rejoignez des groupes de conversation en ligne',
      'Parlez à voix haute en décrivant ce que vous faites',
      'Utilisez des applications d\'échange linguistique'
    ]
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Lisez des textes adaptés à votre niveau',
    description: 'La lecture enrichit votre vocabulaire et vous expose à différentes structures grammaticales dans leur contexte naturel.',
    examples: [
      'Commencez par des livres pour enfants ou jeunes adultes',
      'Lisez des articles de blog sur vos sujets préférés',
      'Utilisez des applications de lecture graduée'
    ]
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: 'Regardez des films et séries en version originale',
    description: 'Les contenus audiovisuels vous immergent dans la langue et la culture anglophone tout en rendant l\'apprentissage plus agréable.',
    examples: [
      'Commencez avec des sous-titres en français, puis en anglais',
      'Regardez des séries que vous connaissez déjà',
      'Répétez les dialogues pour améliorer votre prononciation'
    ]
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Changez la langue de vos appareils en anglais',
    description: 'L\'immersion quotidienne dans la langue accélère l\'apprentissage. Vous apprendrez du vocabulaire technique naturellement.',
    examples: [
      'Configurez votre téléphone en anglais',
      'Utilisez les réseaux sociaux en anglais',
      'Changez la langue de vos applications favorites'
    ]
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Établissez une routine d\'apprentissage',
    description: 'La régularité est la clé du succès. Même 15 minutes par jour sont plus efficaces qu\'une longue session hebdomadaire.',
    examples: [
      'Choisissez un moment fixe chaque jour (matin, pause déjeuner, soir)',
      'Utilisez des rappels sur votre téléphone',
      'Suivez vos progrès avec un calendrier ou une application'
    ]
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Fixez-vous des objectifs réalistes et mesurables',
    description: 'Des objectifs clairs vous motivent et vous permettent de mesurer vos progrès. Célébrez chaque petite victoire.',
    examples: [
      'Apprenez 10 nouveaux mots par jour',
      'Complétez une leçon quotidienne sur App-Anglais',
      'Regardez un épisode de série en anglais par semaine'
    ]
  }
]

export default function TipsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <PageHeader />

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Astuces pour Apprendre l'Anglais
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Découvrez nos meilleurs conseils pour progresser rapidement en anglais. Ces méthodes éprouvées 
            vous aideront à développer vos compétences linguistiques de manière efficace et durable.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {LEARNING_TIPS.map((tip, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all border-2 hover:border-primary/50"
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-blue-600 dark:text-blue-400">
                    {tip.icon}
                  </div>
                  <span className="text-xl">{tip.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                  {tip.description}
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                    Exemples pratiques :
                  </p>
                  <ul className="space-y-2">
                    {tip.examples.map((example, i) => (
                      <li 
                        key={i}
                        className="text-sm text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-blue-300 dark:border-blue-700"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Tips Section */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-2">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Conseils Supplémentaires pour Maximiser Votre Apprentissage
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
              <div>
                <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">
                  Techniques de Mémorisation
                </h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Utilisez des flashcards pour le vocabulaire</li>
                  <li>Créez des associations mentales avec des images</li>
                  <li>Répétez à voix haute pour mieux mémoriser</li>
                  <li>Révisez régulièrement ce que vous avez appris</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">
                  Immersion Linguistique
                </h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Pensez en anglais dans votre vie quotidienne</li>
                  <li>Suivez des comptes anglophones sur les réseaux sociaux</li>
                  <li>Écoutez de la musique anglaise et lisez les paroles</li>
                  <li>Participez à des forums ou communautés en ligne</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">
                  Gestion de l'Apprentissage
                </h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Ne vous découragez pas face aux erreurs</li>
                  <li>Concentrez-vous sur la communication, pas la perfection</li>
                  <li>Variez les méthodes d'apprentissage</li>
                  <li>Célébrez vos progrès, même les plus petits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-400">
                  Ressources Recommandées
                </h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Applications : Duolingo, Babbel, Memrise</li>
                  <li>Podcasts : BBC Learning English, ESL Pod</li>
                  <li>YouTube : English with Lucy, Rachel's English</li>
                  <li>Livres : Graded readers, romans adaptés</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivation Section */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Restez Motivé dans Votre Apprentissage
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
              L'apprentissage d'une langue est un marathon, pas un sprint. La clé du succès réside dans la 
              régularité et la patience. Chaque jour d'apprentissage vous rapproche de votre objectif. 
              N'oubliez pas : même les polyglottes ont commencé par apprendre leur premier mot !
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                Commencer à Pratiquer Maintenant
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
