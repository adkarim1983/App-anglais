'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, BookOpen, FileText, HelpCircle, Lightbulb } from 'lucide-react'

export function SiteNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <BookOpen className="h-4 w-4" />
            <span>Accueil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about" className="flex items-center gap-2 cursor-pointer">
            <FileText className="h-4 w-4" />
            <span>À Propos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/regular-verbs" className="flex items-center gap-2 cursor-pointer">
            <BookOpen className="h-4 w-4" />
            <span>Verbes Réguliers</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/irregular-verbs" className="flex items-center gap-2 cursor-pointer">
            <BookOpen className="h-4 w-4" />
            <span>Verbes Irréguliers</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/quiz" className="flex items-center gap-2 cursor-pointer">
            <HelpCircle className="h-4 w-4" />
            <span>Mini-Quiz</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/tips" className="flex items-center gap-2 cursor-pointer">
            <Lightbulb className="h-4 w-4" />
            <span>Astuces d'Apprentissage</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
