'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <PageHeader />

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Conditions Générales d'Utilisation
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Dernière mise à jour : Mars 2024
          </p>
        </div>

        <Card className="border-2">
          <CardContent className="p-8 space-y-8">
            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                1. Acceptation des Conditions
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                En accédant et en utilisant App-Anglais, vous acceptez d'être lié par ces conditions générales 
                d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre application.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                2. Description du Service
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                App-Anglais est une plateforme d'apprentissage de l'anglais en ligne qui propose des verbes, 
                du vocabulaire, des quiz interactifs et des outils de suivi de progression. Le service est 
                fourni gratuitement et est accessible via un navigateur web.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                3. Utilisation du Service
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Vous vous engagez à :
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-4">
                <li>Utiliser le service uniquement à des fins légales et éducatives</li>
                <li>Ne pas tenter de perturber ou d'endommager le service</li>
                <li>Ne pas copier, reproduire ou distribuer le contenu sans autorisation</li>
                <li>Respecter les droits de propriété intellectuelle</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                4. Propriété Intellectuelle
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Tout le contenu présent sur App-Anglais, y compris mais sans s'y limiter, les textes, graphiques, 
                logos, images, et logiciels, est la propriété d'App-Anglais ou de ses fournisseurs de contenu et 
                est protégé par les lois sur la propriété intellectuelle.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                5. Contenu Utilisateur
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Les données de progression que vous créez en utilisant notre service restent votre propriété. 
                Ces données sont stockées localement dans votre navigateur et ne sont pas transmises à nos serveurs.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                6. Limitation de Responsabilité
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                App-Anglais est fourni "tel quel" sans garantie d'aucune sorte. Nous ne garantissons pas que :
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 pl-4">
                <li>Le service sera ininterrompu ou exempt d'erreurs</li>
                <li>Les résultats obtenus seront précis ou fiables</li>
                <li>Tous les défauts seront corrigés</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
                Nous ne serons pas responsables des dommages directs, indirects, accessoires ou consécutifs 
                résultant de l'utilisation ou de l'impossibilité d'utiliser notre service.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                7. Exactitude du Contenu Éducatif
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nous nous efforçons de fournir un contenu éducatif précis et de qualité. Cependant, nous ne 
                garantissons pas l'exactitude, l'exhaustivité ou l'actualité de tout le contenu. Le contenu 
                est fourni à des fins éducatives uniquement et ne doit pas être considéré comme un conseil professionnel.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                8. Liens Externes
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Notre service peut contenir des liens vers des sites web tiers. Nous ne sommes pas responsables 
                du contenu, des politiques de confidentialité ou des pratiques de ces sites tiers.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                9. Modifications du Service
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du service 
                à tout moment, avec ou sans préavis. Nous ne serons pas responsables envers vous ou tout tiers 
                de toute modification, suspension ou interruption du service.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                10. Modifications des Conditions
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications 
                entreront en vigueur dès leur publication sur cette page. Votre utilisation continue du service 
                après la publication des modifications constitue votre acceptation de ces modifications.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                11. Droit Applicable
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Ces conditions sont régies par les lois françaises. Tout litige relatif à ces conditions sera 
                soumis à la juridiction exclusive des tribunaux français.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                12. Contact
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter via notre 
                page de contact.
              </p>
            </section>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
