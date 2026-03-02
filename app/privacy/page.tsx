'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <PageHeader />

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Politique de Confidentialité
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Dernière mise à jour : Mars 2024
          </p>
        </div>

        <Card className="border-2">
          <CardContent className="p-8 space-y-8">
            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                1. Introduction
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Bienvenue sur App-Anglais. Nous respectons votre vie privée et nous nous engageons à protéger 
                vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont 
                nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre application.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                2. Données Collectées
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Nous collectons les types de données suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-4">
                <li>Données de progression d'apprentissage (verbes appris, scores de quiz)</li>
                <li>Préférences utilisateur (thème, paramètres d'affichage)</li>
                <li>Données d'utilisation (pages visitées, temps passé sur l'application)</li>
                <li>Informations techniques (type de navigateur, système d'exploitation)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                3. Utilisation des Données
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Nous utilisons vos données pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-4">
                <li>Personnaliser votre expérience d'apprentissage</li>
                <li>Suivre votre progression et vos statistiques</li>
                <li>Améliorer nos services et fonctionnalités</li>
                <li>Analyser l'utilisation de l'application</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                4. Stockage des Données
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Vos données de progression sont stockées localement dans votre navigateur (localStorage). 
                Nous n'envoyons pas vos données personnelles à des serveurs externes. Les données analytiques 
                sont collectées de manière anonyme via Vercel Analytics.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                5. Cookies et Technologies Similaires
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience. 
                Ces cookies nous aident à mémoriser vos préférences et à analyser l'utilisation de notre site. 
                Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                6. Partage des Données
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers. 
                Nous pouvons partager des données anonymisées avec nos partenaires analytiques pour 
                améliorer nos services.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                7. Sécurité des Données
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre 
                tout accès non autorisé, modification, divulgation ou destruction. Cependant, aucune méthode 
                de transmission sur Internet n'est totalement sécurisée.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                8. Vos Droits
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Vous avez le droit de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-4">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger vos données inexactes</li>
                <li>Supprimer vos données (effacer le cache du navigateur)</li>
                <li>Vous opposer au traitement de vos données</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                9. Modifications de la Politique
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications seront publiées sur cette page avec une date de mise à jour révisée.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                10. Contact
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité, veuillez nous contacter 
                via notre page de contact.
              </p>
            </section>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
