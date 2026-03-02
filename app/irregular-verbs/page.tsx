'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'

interface IrregularVerb {
  infinitive: string
  french: string
  past: string
  pastParticiple: string
  present: string
  future: string
  examples: string[]
}

const IRREGULAR_VERBS: IrregularVerb[] = [
  {
    infinitive: 'go',
    french: 'aller',
    past: 'went',
    pastParticiple: 'gone',
    present: 'go/goes',
    future: 'will go',
    examples: ['I go to work by bus.', 'She went to Paris last year.', 'They have gone to the market.']
  },
  {
    infinitive: 'write',
    french: 'écrire',
    past: 'wrote',
    pastParticiple: 'written',
    present: 'write/writes',
    future: 'will write',
    examples: ['He writes poetry.', 'She wrote a beautiful letter.', 'I have written three books.']
  },
  {
    infinitive: 'speak',
    french: 'parler',
    past: 'spoke',
    pastParticiple: 'spoken',
    present: 'speak/speaks',
    future: 'will speak',
    examples: ['They speak English fluently.', 'He spoke at the conference.', 'She has spoken to the manager.']
  },
  {
    infinitive: 'think',
    french: 'penser',
    past: 'thought',
    pastParticiple: 'thought',
    present: 'think/thinks',
    future: 'will think',
    examples: ['I think it\'s a good idea.', 'She thought about it carefully.', 'We have thought of a solution.']
  },
  {
    infinitive: 'know',
    french: 'savoir/connaître',
    past: 'knew',
    pastParticiple: 'known',
    present: 'know/knows',
    future: 'will know',
    examples: ['I know the answer.', 'He knew her from school.', 'They have known each other for years.']
  },
  {
    infinitive: 'take',
    french: 'prendre',
    past: 'took',
    pastParticiple: 'taken',
    present: 'take/takes',
    future: 'will take',
    examples: ['She takes the train daily.', 'I took a photo yesterday.', 'He has taken the keys.']
  },
  {
    infinitive: 'make',
    french: 'faire/fabriquer',
    past: 'made',
    pastParticiple: 'made',
    present: 'make/makes',
    future: 'will make',
    examples: ['I make breakfast every morning.', 'She made a cake.', 'They have made a decision.']
  },
  {
    infinitive: 'see',
    french: 'voir',
    past: 'saw',
    pastParticiple: 'seen',
    present: 'see/sees',
    future: 'will see',
    examples: ['I see the problem now.', 'We saw a movie last night.', 'Have you seen my keys?']
  },
  {
    infinitive: 'come',
    french: 'venir',
    past: 'came',
    pastParticiple: 'come',
    present: 'come/comes',
    future: 'will come',
    examples: ['She comes here often.', 'They came to visit us.', 'He has come a long way.']
  },
  {
    infinitive: 'give',
    french: 'donner',
    past: 'gave',
    pastParticiple: 'given',
    present: 'give/gives',
    future: 'will give',
    examples: ['I give presentations regularly.', 'She gave me a gift.', 'They have given their approval.']
  },
  {
    infinitive: 'find',
    french: 'trouver',
    past: 'found',
    pastParticiple: 'found',
    present: 'find/finds',
    future: 'will find',
    examples: ['I find this interesting.', 'He found his keys.', 'We have found a solution.']
  },
  {
    infinitive: 'tell',
    french: 'dire/raconter',
    past: 'told',
    pastParticiple: 'told',
    present: 'tell/tells',
    future: 'will tell',
    examples: ['She tells great stories.', 'I told him the truth.', 'They have told everyone.']
  },
  {
    infinitive: 'become',
    french: 'devenir',
    past: 'became',
    pastParticiple: 'become',
    present: 'become/becomes',
    future: 'will become',
    examples: ['It becomes easier with practice.', 'She became a doctor.', 'He has become very successful.']
  },
  {
    infinitive: 'leave',
    french: 'partir/quitter',
    past: 'left',
    pastParticiple: 'left',
    present: 'leave/leaves',
    future: 'will leave',
    examples: ['I leave work at 5 PM.', 'They left early yesterday.', 'She has left the company.']
  },
  {
    infinitive: 'feel',
    french: 'sentir/ressentir',
    past: 'felt',
    pastParticiple: 'felt',
    present: 'feel/feels',
    future: 'will feel',
    examples: ['I feel happy today.', 'She felt tired after work.', 'They have felt this way before.']
  },
  {
    infinitive: 'bring',
    french: 'apporter',
    past: 'brought',
    pastParticiple: 'brought',
    present: 'bring/brings',
    future: 'will bring',
    examples: ['Please bring your laptop.', 'He brought flowers.', 'She has brought good news.']
  },
  {
    infinitive: 'begin',
    french: 'commencer',
    past: 'began',
    pastParticiple: 'begun',
    present: 'begin/begins',
    future: 'will begin',
    examples: ['Classes begin at 9 AM.', 'The meeting began on time.', 'We have begun the project.']
  },
  {
    infinitive: 'keep',
    french: 'garder/continuer',
    past: 'kept',
    pastParticiple: 'kept',
    present: 'keep/keeps',
    future: 'will keep',
    examples: ['Keep trying!', 'She kept her promise.', 'I have kept all the receipts.']
  },
  {
    infinitive: 'hold',
    french: 'tenir/maintenir',
    past: 'held',
    pastParticiple: 'held',
    present: 'hold/holds',
    future: 'will hold',
    examples: ['Hold my hand.', 'They held a meeting.', 'The event has been held annually.']
  },
  {
    infinitive: 'understand',
    french: 'comprendre',
    past: 'understood',
    pastParticiple: 'understood',
    present: 'understand/understands',
    future: 'will understand',
    examples: ['I understand the concept.', 'She understood immediately.', 'They have understood the instructions.']
  }
]

export default function IrregularVerbsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      {/* Header */}
      <PageHeader />

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Verbes Irréguliers Anglais
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Les verbes irréguliers ne suivent pas les règles standard de conjugaison. Leur forme au passé et au participe passé 
            doit être mémorisée individuellement. Voici une liste de 20 verbes irréguliers essentiels avec leurs conjugaisons 
            complètes et des exemples pratiques.
          </p>
        </div>

        {/* Tableau des verbes irréguliers */}
        <div className="grid gap-4 mb-12">
          {IRREGULAR_VERBS.map((verb, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all border-2 border-red-200 dark:border-red-900/50"
            >
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-700 dark:text-red-400">
                    {verb.infinitive}
                  </span>
                  <span className="text-lg text-slate-600 dark:text-slate-400">
                    {verb.french}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-3 mb-6">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Présent</p>
                    <p className="text-base font-bold text-green-700 dark:text-green-400">{verb.present}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Passé</p>
                    <p className="text-base font-bold text-orange-700 dark:text-orange-400">{verb.past}</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Participe passé</p>
                    <p className="text-base font-bold text-red-700 dark:text-red-400">{verb.pastParticiple}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Futur</p>
                    <p className="text-base font-bold text-purple-700 dark:text-purple-400">{verb.future}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Exemples :</p>
                  {verb.examples.map((example, i) => (
                    <p key={i} className="text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-red-300">
                      {example}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note pédagogique */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-2 border-red-200 dark:border-red-900/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Pourquoi les verbes irréguliers sont-ils importants ?
            </h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Les verbes irréguliers représentent certains des mots les plus fréquemment utilisés en anglais. 
                Bien qu'ils ne suivent pas les règles standard, leur maîtrise est essentielle pour communiquer efficacement.
              </p>
              <p>
                <strong>Conseils pour mémoriser les verbes irréguliers :</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Pratiquez régulièrement avec des flashcards</li>
                <li>Groupez les verbes par patterns similaires (ex: sing-sang-sung, ring-rang-rung)</li>
                <li>Utilisez-les dans des phrases contextuelles</li>
                <li>Écoutez et répétez leur prononciation</li>
                <li>Révisez 5-10 verbes par jour plutôt que tous à la fois</li>
              </ul>
              <p className="mt-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg border-l-4 border-red-500">
                <strong>Astuce :</strong> Les verbes irréguliers les plus courants (be, have, do, say, go, get, make, know, think, take) 
                représentent une grande partie de l'usage quotidien. Concentrez-vous d'abord sur ceux-ci !
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
