'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getStudyHistory, getVerbsByDate } from '@/lib/progress'
import { getVerbById } from '@/lib/verbs'
import { Calendar, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { DailyVerbsDialog } from '@/components/daily-verbs-dialog'
import { type Verb } from '@/lib/verbs'

interface StudyHistoryProps {
  onVerbClick: (verb: Verb) => void
}

export function StudyHistory({ onVerbClick }: StudyHistoryProps) {
  const [history, setHistory] = useState<Record<string, number>>({})
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedVerbs, setSelectedVerbs] = useState<Verb[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [show30Days, setShow30Days] = useState(false)
  const [showWeek, setShowWeek] = useState(false)

  useEffect(() => {
    setHistory(getStudyHistory())
    
    const interval = setInterval(() => {
      setHistory(getStudyHistory())
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const handleDateClick = (date: string, count: number) => {
    if (count === 0) return
    
    const verbIds = getVerbsByDate(date)
    
    // Si aucun verbe n'est trouvé dans verbsByDate (anciennes données),
    // afficher un message informatif
    if (verbIds.length === 0) {
      setSelectedDate(date)
      setSelectedVerbs([])
      setDialogOpen(true)
      return
    }
    
    const verbs = verbIds.map(id => getVerbById(id)).filter(Boolean) as Verb[]
    
    setSelectedDate(date)
    setSelectedVerbs(verbs)
    setDialogOpen(true)
  }

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
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('fr-FR', { month: 'short' })
      })
    }
    
    return days
  }

  const getLast7DaysDetailed = () => {
    const days = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      days.push({
        date: dateStr,
        count: history[dateStr] || 0,
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'long' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('fr-FR', { month: 'long' }),
        isToday: i === 0
      })
    }
    
    return days
  }

  const days = getLast30Days()
  const last7Days = getLast7DaysDetailed()
  const maxCount = Math.max(...days.map(d => d.count), 1)
  const totalLast7Days = last7Days.reduce((sum, d) => sum + d.count, 0)
  const avgLast7Days = Math.round(totalLast7Days / 7)

  return (
    <>
      <div className="space-y-4">
        {/* Bouton Activité des 30 derniers jours */}
        <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-border/30 backdrop-blur-xl">
          <Button
            onClick={() => setShow30Days(!show30Days)}
            variant="ghost"
            className="w-full p-6 h-auto flex items-center justify-between hover:bg-primary/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">
                  Activité des 30 derniers jours
                </h3>
                <p className="text-sm text-muted-foreground">
                  {days.filter(d => d.count > 0).length} jours actifs • {days.reduce((sum, d) => sum + d.count, 0)} verbes appris
                </p>
              </div>
            </div>
            {show30Days ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>

          {show30Days && (
            <div className="px-6 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Cliquez sur un jour pour voir les verbes appris</span>
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

              <div className="grid grid-cols-10 gap-1.5">
                {days.map((day, index) => {
                  const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 3)
                  const bgColor = 
                    intensity === 0 ? 'bg-muted' :
                    intensity === 1 ? 'bg-primary/30' :
                    intensity === 2 ? 'bg-primary/60' :
                    'bg-primary'
                  
                  const verbIds = getVerbsByDate(day.date)
                  const hasDetails = verbIds.length > 0
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(day.date, day.count)}
                      disabled={day.count === 0}
                      className={`aspect-square rounded-sm ${bgColor} transition-all hover:scale-110 hover:ring-2 hover:ring-primary/50 ${
                        day.count > 0 ? 'cursor-pointer' : 'cursor-default'
                      } group relative disabled:cursor-default disabled:hover:scale-100 disabled:hover:ring-0`}
                      title={`${day.dayNumber} ${day.monthName} - ${day.count} verbe${day.count > 1 ? 's' : ''}`}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {day.dayNumber} {day.monthName}<br/>
                        <span className="font-semibold">{day.count} verbe{day.count > 1 ? 's' : ''}</span>
                        {day.count > 0 && <br/>}
                        {day.count > 0 && (
                          <span className={hasDetails ? 'text-primary' : 'text-muted-foreground'}>
                            {hasDetails ? 'Cliquez pour voir' : 'Anciennes données'}
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

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
          )}
        </Card>

        {/* Bouton Cette semaine */}
        <Card className="overflow-hidden bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 border-border/30 backdrop-blur-xl">
          <Button
            onClick={() => setShowWeek(!showWeek)}
            variant="ghost"
            className="w-full p-6 h-auto flex items-center justify-between hover:bg-accent/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-accent" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">
                  Cette semaine
                </h3>
                <p className="text-sm text-muted-foreground">
                  {totalLast7Days} verbes appris • Moyenne {avgLast7Days} verbes/jour
                </p>
              </div>
            </div>
            {showWeek ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>

          {showWeek && (
            <div className="px-6 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-300">
              {last7Days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(day.date, day.count)}
                  disabled={day.count === 0}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    day.isToday 
                      ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30' 
                      : 'bg-background/50 hover:bg-background/80'
                  } ${day.count > 0 ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center min-w-[60px]">
                      <p className="text-xs text-muted-foreground capitalize">{day.dayName}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {day.dayNumber} {day.monthName}
                      </p>
                    </div>
                    {day.isToday && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                        Aujourd'hui
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                        style={{ width: `${Math.min((day.count / 15) * 100, 100)}%` }}
                      />
                    </div>
                    
                    <div className="text-right min-w-[80px]">
                      <p className="text-2xl font-bold text-primary">
                        {day.count}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        verbe{day.count > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </button>
              ))}

              <div className="pt-4 border-t border-border/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total cette semaine</span>
                  <span className="text-lg font-bold text-accent">{totalLast7Days} verbes</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <DailyVerbsDialog
        date={selectedDate || ''}
        verbs={selectedVerbs}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onVerbClick={onVerbClick}
      />
    </>
  )
}
