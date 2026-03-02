'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'
import { BookOpen, Target, TrendingUp, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <PageHeader />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Bienvenue sur App-Anglais
          </h2>
          <div className="max-w-4xl mx-auto">
            <img 
              src="/placeholder.svg" 
              alt="Apprentissage de l'anglais" 
              className="w-full h-64 object-cover rounded-2xl shadow-xl mb-8"
            />
          </div>
        </div>

        {/* Description principale */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-2">
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                App-Anglais est une plateforme d'apprentissage innovante conçue pour vous aider à maîtriser l'anglais de manière progressive et efficace. Notre méthode unique combine la répétition espacée, l'apprentissage interactif et des exercices pratiques pour garantir une mémorisation durable du vocabulaire anglais.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Que vous soyez débutant ou que vous cherchiez à perfectionner votre anglais, notre application s'adapte à votre niveau. Chaque jour, découvrez 10 nouveaux verbes soigneusement sélectionnés, accompagnés de leurs conjugaisons, exemples d'utilisation et contextes professionnels. Notre système de suivi de progression vous permet de visualiser vos acquis et de maintenir votre motivation.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                L'apprentissage d'une langue demande de la régularité et de la pratique. C'est pourquoi nous avons développé plusieurs modes d'apprentissage : flashcards, quiz interactifs, exercices à trous et mode dictée. Cette variété d'approches stimule différentes zones de mémorisation et rend l'apprentissage plus engageant et efficace.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Caractéristiques */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Méthode Progressive</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Apprenez à votre rythme avec notre système de répétition espacée
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Target className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">Objectifs Quotidiens</h3>
              <p className="text-slate-600 dark:text-slate-400">
                10 nouveaux verbes par jour pour un apprentissage régulier
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold mb-2">Suivi de Progression</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Visualisez vos progrès et maintenez votre série d'apprentissage
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-bold mb-2">Modes Variés</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Quiz, flashcards, dictée et exercices interactifs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Commencer l'apprentissage
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
