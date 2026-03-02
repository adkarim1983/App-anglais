'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteNav } from '@/components/site-nav'

export function PageHeader() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">
              App-Anglais
            </h1>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/about">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-primary">
                À Propos
              </Button>
            </Link>
            <Link href="/regular-verbs">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-primary">
                Verbes Réguliers
              </Button>
            </Link>
            <Link href="/irregular-verbs">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-primary">
                Verbes Irréguliers
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-primary">
                Quiz
              </Button>
            </Link>
            <Link href="/tips">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-primary">
                Astuces
              </Button>
            </Link>
          </nav>

          {/* Navigation Mobile */}
          <div className="lg:hidden">
            <SiteNav />
          </div>

          {/* Bouton Retour */}
          <Link href="/" className="hidden md:block">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
