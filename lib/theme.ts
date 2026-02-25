// Gestion du thème (clair/sombre)

export type Theme = 'light' | 'dark' | 'system'

const THEME_KEY = 'daily-verbs-theme'

/**
 * Obtient le thème actuel
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return (stored as Theme) || 'system'
  } catch {
    return 'system'
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
  
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', prefersDark)
  } else {
    root.classList.toggle('dark', theme === 'dark')
  }
}

/**
 * Initialise le thème au chargement
 */
export function initTheme(): void {
  const theme = getTheme()
  applyTheme(theme)
  
  // Écouter les changements de préférence système
  if (theme === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (getTheme() === 'system') {
        document.documentElement.classList.toggle('dark', e.matches)
      }
    })
  }
}
