'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { getStudyHistory } from '@/lib/progress'
import { Calendar } from 'lucide-react'

export function StudyHistory() {
  const [history, setHistory] = useState<Record<string, number>>({})

  useEffect(() => {
    setHistory(getStudyHistory())
    
    // Mettre à jour périodiquement
    const interval = setInterval(() => {
      setHistory(getStudyHistory())
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  // Obtenir les 30 derniers jours
  const getLast30Days = () => {
    const days = []
    const today = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      days.push({
        date: dateStr,
        count: history[dateStr] || 0,
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        dayNumber: date.getDate()
      })
    }
    
    return days
  }

  const days = getLast30Days()
  const maxCount = Math.max(...days.map(d => d.count), 1)

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-border/30 backdrop-blur-xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Historique d'apprentissage
          </h3>
        </div>

        <div className="space-y-3">
          {/* Légende */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>30 derniers jours</span>
            <div className="flex items-center gap-2">
              <span>Moins</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted" />
                <div className="w-3 h-3 rounded-sm bg-primary/30" />
                <div className="w-3 h-3 rounded-sm bg-primary/60" />
                <div className="w-3 h-3 rounded-sm bg-primary" />
              </div>
              <span>Plus</span>
            </div>
          </div>

          {/* Grille de calendrier */}
          <div className="grid grid-cols-10 gap-1.5">
            {days.map((day, index) => {
              const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 3)
              const bgColor = 
                intensity === 0 ? 'bg-muted' :
                intensity === 1 ? 'bg-primary/30' :
                intensity === 2 ? 'bg-primary/60' :
                'bg-primary'
              
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-sm ${bgColor} transition-all hover:scale-110 hover:ring-2 hover:ring-primary/50 cursor-pointer group relative`}
                  title={`${day.dayNumber} - ${day.count} verbe${day.count > 1 ? 's' : ''}`}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {day.dayNumber} - {day.count} verbe{day.count > 1 ? 's' : ''}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {days.filter(d => d.count > 0).length}
              </p>
              <p className="text-xs text-muted-foreground">Jours actifs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                {days.reduce((sum, d) => sum + d.count, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total verbes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {Math.round(days.reduce((sum, d) => sum + d.count, 0) / 30)}
              </p>
              <p className="text-xs text-muted-foreground">Moyenne/jour</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
