// Gestion du thème (clair/sombre)

export type Theme = 'light' | 'dark'

const THEME_KEY = 'daily-verbs-theme'

/**
 * Obtient le thème actuel
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return (stored as Theme) || 'light'
  } catch {
    return 'light'
  }
}

/**
 * Définit le thème
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(THEME_KEY, theme)
    applyTheme(theme)
  } catch (error) {
    console.error('Error saving theme:', error)
  }
}

/**
 * Applique le thème au document
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

/**
 * Initialise le thème au chargement
 */
export function initTheme(): void {
  const theme = getTheme()
  applyTheme(theme)
}

/**
 * Bascule entre clair et sombre
 */
export function toggleTheme(): Theme {
  const currentTheme = getTheme()
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  return newTheme
}
