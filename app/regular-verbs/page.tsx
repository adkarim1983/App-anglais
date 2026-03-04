'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { useState } from 'react'
import { ALL_VERBS } from '@/lib/verbs-data'

interface RegularVerb {
  infinitive: string
  french: string
  present: string
  past: string
  future: string
  examples: string[]
}

// Filtrer les verbes réguliers depuis la base de données
const REGULAR_VERBS: RegularVerb[] = ALL_VERBS
  .filter(verb => !verb.isIrregular)
  .map(verb => ({
    infinitive: verb.english,
    french: verb.french,
    present: verb.present,
    past: verb.past,
    future: verb.future,
    examples: [verb.example || `I ${verb.english.toLowerCase()} every day.`]
  }))

export default function RegularVerbsPage() {
  const [selectedVerb, setSelectedVerb] = useState<RegularVerb | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <PageHeader />

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Verbes Réguliers Anglais
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Les verbes réguliers suivent un schéma de conjugaison prévisible. Pour former le passé simple et le participe passé, 
            il suffit d'ajouter -ed à la forme de base du verbe. Découvrez notre sélection de {REGULAR_VERBS.length} verbes réguliers essentiels 
            avec leurs conjugaisons et exemples d'utilisation.
          </p>
        </div>

        {/* Tableau des verbes */}
        <div className="grid gap-4 mb-12">
          {REGULAR_VERBS.map((verb, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all cursor-pointer border-2"
              onClick={() => setSelectedVerb(verb)}
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {verb.infinitive}
                  </span>
                  <span className="text-lg text-slate-600 dark:text-slate-400">
                    {verb.french}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Présent</p>
                    <p className="text-lg font-bold text-green-700 dark:text-green-400">{verb.present}</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Passé</p>
                    <p className="text-lg font-bold text-orange-700 dark:text-orange-400">{verb.past}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Futur</p>
                    <p className="text-lg font-bold text-purple-700 dark:text-purple-400">{verb.future}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Exemples :</p>
                  {verb.examples.map((example, i) => (
                    <p key={i} className="text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-blue-300">
                      {example}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note pédagogique */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Comment conjuguer les verbes réguliers ?
            </h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                <strong>Règle générale :</strong> Pour former le passé simple et le participe passé des verbes réguliers, 
                ajoutez simplement -ed à la forme de base du verbe.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>work</strong> → worked (I worked yesterday)</li>
                <li><strong>play</strong> → played (She played tennis)</li>
                <li><strong>listen</strong> → listened (They listened carefully)</li>
              </ul>
              <p>
                <strong>Exceptions orthographiques :</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Verbes se terminant par -e : ajoutez seulement -d (love → loved)</li>
                <li>Verbes se terminant par consonne + y : changez y en i et ajoutez -ed (study → studied)</li>
                <li>Verbes d'une syllabe se terminant par consonne-voyelle-consonne : doublez la consonne finale (stop → stopped)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
