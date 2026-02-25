'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Heart,
  Filter,
  Menu
} from 'lucide-react'
import { type VerbCategory, getCategoryLabel } from '@/lib/verbs'

interface AppNavProps {
  onModeChange: (mode: 'learn' | 'quiz' | 'flashcards' | 'fill-blanks' | 'favorites') => void
  onCategoryChange: (category: VerbCategory | 'all') => void
  currentCategory: VerbCategory | 'all'
  favoriteCount: number
}

export function AppNav({ onModeChange, onCategoryChange, currentCategory, favoriteCount }: AppNavProps) {
  const categories: Array<{ value: VerbCategory | 'all'; label: string }> = [
    { value: 'all', label: 'Toutes' },
    { value: 'action', label: 'Action' },
    { value: 'communication', label: 'Communication' },
    { value: 'thinking', label: 'Réflexion' },
    { value: 'creation', label: 'Création' },
    { value: 'learning', label: 'Apprentissage' },
    { value: 'business', label: 'Business' },
  ]

  return (
    <div className="flex items-center gap-2">
      {/* Modes d'apprentissage */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50 hover:bg-primary/10 hover:border-primary/50"
          >
            <Menu className="h-4 w-4" />
            <span className="hidden sm:inline">Modes</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Modes d'apprentissage</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onModeChange('learn')}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Apprentissage</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onModeChange('quiz')}>
            <Brain className="mr-2 h-4 w-4" />
            <span>Quiz interactif</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onModeChange('flashcards')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Flashcards</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onModeChange('fill-blanks')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Phrases à trous</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onModeChange('favorites')}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Favoris ({favoriteCount})</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtres par catégorie */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50 hover:bg-primary/10 hover:border-primary/50"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">
              {currentCategory === 'all' ? 'Catégories' : getCategoryLabel(currentCategory as VerbCategory)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Filtrer par catégorie</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((cat) => (
            <DropdownMenuItem
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={currentCategory === cat.value ? 'bg-primary/10' : ''}
            >
              {cat.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Toggle thème */}
      <ThemeToggle />
    </div>
  )
}
