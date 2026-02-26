'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Verb } from '@/lib/verbs'
import { Calendar, Volume2 } from 'lucide-react'
import { speakVerb } from '@/lib/speech'

interface DailyVerbsDialogProps {
  date: string
  verbs: Verb[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerbClick: (verb: Verb) => void
}

export function DailyVerbsDialog({ date, verbs, open, onOpenChange, onVerbClick }: DailyVerbsDialogProps) {
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const isOldData = verbs.length === 0 && open

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/30">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground capitalize">
                {formattedDate}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {isOldData 
                  ? 'Verbes appris avant la mise à jour'
                  : `${verbs.length} verbe${verbs.length > 1 ? 's' : ''} appris ce jour`
                }
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {isOldData ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-lg font-semibold text-foreground">
                Données non disponibles
              </p>
              <p className="text-muted-foreground max-w-md mx-auto">
                Les verbes appris avant la mise à jour du système ne peuvent pas être affichés individuellement. 
                Seul le nombre total est conservé.
              </p>
              <p className="text-sm text-muted-foreground">
                Les nouveaux verbes appris seront automatiquement enregistrés avec leurs détails.
              </p>
            </div>
          ) : verbs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Aucun verbe appris ce jour.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {verbs.map((verb, index) => (
                <Card
                  key={verb.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer bg-gradient-to-br from-card via-card/95 to-card/90 border-border/40 backdrop-blur-xl"
                  onClick={() => onVerbClick(verb)}
                >
                  {/* En-tête avec verbe et badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                          {verb.english}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            speakVerb(verb.english)
                          }}
                          className="h-10 w-10 p-0 hover:bg-primary/20 hover:scale-110 transition-all"
                        >
                          <Volume2 className="h-5 w-5 text-primary" />
                        </Button>
                      </div>
                      <p className="text-lg font-semibold text-primary/90">
                        {verb.french}
                      </p>
                    </div>
                    
                    <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-sm">
                      {verb.category}
                    </span>
                  </div>

                  {/* Conjugaisons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                    <div className="space-y-1.5 p-3 rounded-lg bg-background/50 border border-border/20">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Present</p>
                      <p className="text-sm font-semibold text-foreground">{verb.present}</p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-lg bg-background/50 border border-border/20">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Past</p>
                      <p className="text-sm font-semibold text-foreground">{verb.past}</p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-lg bg-background/50 border border-border/20">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Future</p>
                      <p className="text-sm font-semibold text-foreground">{verb.future}</p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-lg bg-background/50 border border-border/20">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Present Perfect</p>
                      <p className="text-sm font-semibold text-foreground">{verb.presentPerfect}</p>
                    </div>
                  </div>

                  {/* Exemple */}
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{verb.example}"
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
