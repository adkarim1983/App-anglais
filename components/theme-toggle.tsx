'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTheme, toggleTheme, type Theme } from '@/lib/theme'

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')

  useEffect(() => {
    setCurrentTheme(getTheme())
  }, [])

  const handleToggle = () => {
    const newTheme = toggleTheme()
    setCurrentTheme(newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="h-9 w-9 p-0 hover:bg-primary/10"
      title={currentTheme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Changer le thème</span>
    </Button>
  )
}
