'use client'

import Link from 'next/link'
import { Mail, Heart } from 'lucide-react'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">
              App-Anglais
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Apprenez l'anglais facilement avec notre méthode progressive et interactive.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">
              Liens rapides
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/about" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                À Propos
              </Link>
              <Link 
                href="/regular-verbs" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Verbes Réguliers
              </Link>
              <Link 
                href="/irregular-verbs" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Verbes Irréguliers
              </Link>
              <Link 
                href="/quiz" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Quiz
              </Link>
              <Link 
                href="/tips" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Astuces
              </Link>
            </nav>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">
              Contact & Légal
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/contact" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contactez-nous
              </Link>
              <Link 
                href="/privacy" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Conditions d'utilisation
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
              © {currentYear} App-Anglais. Tous droits réservés.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
              Créé avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> par AdKarim
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
