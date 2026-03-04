'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'
import { speakText } from '@/lib/speech'

export function EssentialAuxiliaryVerbs() {
  const handleSpeak = (text: string) => {
    speakText(text, 0.85)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Les Verbes Auxiliaires Essentiels
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Maîtrisez "to be" (être) et "to have" (avoir), les deux piliers de la langue anglaise
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* TO BE */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-b-2 border-blue-200 dark:border-blue-800">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">To Be</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSpeak('to be')}
                  className="hover:bg-blue-100 dark:hover:bg-blue-900/50"
                >
                  <Volume2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </Button>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-1">Être</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Présent Simple */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Présent Simple
              </h4>
              <div className="grid grid-cols-2 gap-3 pl-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">I am</span> (je suis)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('I am')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You are</span> (tu es)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('You are')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">He/She/It is</span> (il/elle est)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('He is. She is. It is')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">We are</span> (nous sommes)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('We are')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You are</span> (vous êtes)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('You are')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">They are</span> (ils/elles sont)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('They are')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Passé Simple */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Passé Simple
              </h4>
              <div className="grid grid-cols-2 gap-3 pl-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">I was</span> (j'étais)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('I was')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You were</span> (tu étais)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('You were')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">He/She/It was</span> (il/elle était)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('He was. She was. It was')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">We were</span> (nous étions)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('We were')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You were</span> (vous étiez)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('You were')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">They were</span> (ils/elles étaient)</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak('They were')}
                      className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Futur */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Futur Simple
              </h4>
              <div className="pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">I/You/He/She/It/We/They will be</span></p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak('I will be. You will be. He will be. She will be. It will be. We will be. They will be')}
                    className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">Exemple : I will be there tomorrow (Je serai là demain)</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak('I will be there tomorrow')}
                    className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Exemples détaillés */}
            <div className="space-y-3 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">Exemples d'utilisation</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <p className="text-slate-700 dark:text-slate-300 flex-1">
                    <span className="font-semibold">I am a student.</span> → Je suis étudiant(e).
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak('I am a student')}
                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-slate-700 dark:text-slate-300 flex-1">
                    <span className="font-semibold">She is happy today.</span> → Elle est heureuse aujourd'hui.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak('She is happy today')}
                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-slate-700 dark:text-slate-300 flex-1">
                    <span className="font-semibold">They were at home yesterday.</span> → Ils étaient à la maison hier.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak('They were at home yesterday')}
                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-slate-700 dark:text-slate-300 flex-1">
                    <span className="font-semibold">We will be ready soon.</span> → Nous serons prêts bientôt.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak('We will be ready soon')}
                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-slate-700 dark:text-slate-300 flex-1">
                    <span className="font-semibold">It is important to practice.</span> → Il est important de pratiquer.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak('It is important to practice')}
                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Formes contractées */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Formes contractées</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-slate-700 dark:text-slate-300">I'm = I am</p>
                <p className="text-slate-700 dark:text-slate-300">You're = You are</p>
                <p className="text-slate-700 dark:text-slate-300">He's = He is</p>
                <p className="text-slate-700 dark:text-slate-300">She's = She is</p>
                <p className="text-slate-700 dark:text-slate-300">It's = It is</p>
                <p className="text-slate-700 dark:text-slate-300">We're = We are</p>
                <p className="text-slate-700 dark:text-slate-300">They're = They are</p>
                <p className="text-slate-700 dark:text-slate-300">I'll be = I will be</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TO HAVE */}
        <Card className="border-2 border-green-200 dark:border-green-800 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-b-2 border-green-200 dark:border-green-800">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-green-700 dark:text-green-400">To Have</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSpeak('to have')}
                  className="hover:bg-green-100 dark:hover:bg-green-900/50"
                >
                  <Volume2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </Button>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-1">Avoir</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Présent Simple */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Présent Simple
              </h4>
              <div className="grid grid-cols-2 gap-3 pl-4">
                <div className="space-y-2">
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">I am</span> (je suis)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You are</span> (tu es)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">He/She/It is</span> (il/elle est)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">We are</span> (nous sommes)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You are</span> (vous êtes)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">They are</span> (ils/elles sont)</p>
                </div>
              </div>
            </div>

            {/* Passé Simple */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Passé Simple
              </h4>
              <div className="grid grid-cols-2 gap-3 pl-4">
                <div className="space-y-2">
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">I was</span> (j'étais)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You were</span> (tu étais)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">He/She/It was</span> (il/elle était)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">We were</span> (nous étions)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">You were</span> (vous étiez)</p>
                  <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">They were</span> (ils/elles étaient)</p>
                </div>
              </div>
            </div>

            {/* Futur */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Futur Simple
              </h4>
              <div className="pl-4 space-y-2">
                <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">I/You/He/She/It/We/They will be</span></p>
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">Exemple : I will be there tomorrow (Je serai là demain)</p>
              </div>
            </div>

            {/* Exemples détaillés */}
            <div className="space-y-3 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">Exemples d'utilisation</h4>
              <div className="space-y-2 text-sm">
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">I am a student.</span> → Je suis étudiant(e).
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">She is happy today.</span> → Elle est heureuse aujourd'hui.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">They were at home yesterday.</span> → Ils étaient à la maison hier.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">We will be ready soon.</span> → Nous serons prêts bientôt.
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">It is important to practice.</span> → Il est important de pratiquer.
                </p>
              </div>
            </div>

            {/* Formes contractées */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Formes contractées</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-slate-700 dark:text-slate-300">I'm = I am</p>
                <p className="text-slate-700 dark:text-slate-300">You're = You are</p>
                <p className="text-slate-700 dark:text-slate-300">He's = He is</p>
                <p className="text-slate-700 dark:text-slate-300">She's = She is</p>
                <p className="text-slate-700 dark:text-slate-300">It's = It is</p>
                <p className="text-slate-700 dark:text-slate-300">We're = We are</p>
                <p className="text-slate-700 dark:text-slate-300">They're = They are</p>
                <p className="text-slate-700 dark:text-slate-300">I'll be = I will be</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Note pédagogique */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="text-3xl">💡</span>
            Pourquoi ces verbes sont-ils essentiels ?
          </h3>
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
              <span className="font-semibold text-blue-700 dark:text-blue-400">To be</span> et{' '}
              <span className="font-semibold text-green-700 dark:text-green-400">to have</span> sont les deux verbes 
              les plus importants en anglais. Ils sont utilisés :
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Comme verbes principaux pour exprimer l'état ou la possession</li>
              <li>Comme auxiliaires pour former les temps composés (present perfect, past perfect, etc.)</li>
              <li>Dans de nombreuses expressions idiomatiques courantes</li>
              <li>Pour construire des phrases passives (avec "to be")</li>
            </ul>
            <p className="text-sm italic bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <span className="font-semibold">Conseil :</span> Pratiquez ces verbes quotidiennement en les utilisant dans des phrases 
              simples. Leur maîtrise est la fondation de votre apprentissage de l'anglais !
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
