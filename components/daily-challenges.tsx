'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { getDailyChallenges, type DailyChallenge } from '@/lib/challenges'
import { Target, CheckCircle2, Circle } from 'lucide-react'

interface DailyChallengesProps {
  verbsToday: number
  quizToday: number
  reviewsToday: number
}

export function DailyChallenges({ verbsToday, quizToday, reviewsToday }: DailyChallengesProps) {
  const [challenges, setChallenges] = useState<DailyChallenge[]>([])

  useEffect(() => {
    const dailyChallenges = getDailyChallenges({
      verbsToday,
      quizToday,
      reviewsToday
    })
    setChallenges(dailyChallenges)
  }, [verbsToday, quizToday, reviewsToday])

  const completedCount = challenges.filter(c => c.completed).length

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-border/30 backdrop-blur-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Défis Quotidiens
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Complétés</p>
            <p className="text-xl font-bold text-primary">
              {completedCount}/{challenges.length}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-4 rounded-lg border transition-all ${
                challenge.completed
                  ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30'
                  : 'bg-background/50 border-border/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {challenge.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{challenge.icon}</span>
                        <h4 className="font-semibold text-foreground">
                          {challenge.nameFr}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {challenge.descriptionFr}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-accent whitespace-nowrap">
                      {challenge.rewardFr}
                    </span>
                  </div>

                  {/* Barre de progression */}
                  <div className="space-y-1">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          challenge.completed
                            ? 'bg-gradient-to-r from-primary to-accent'
                            : 'bg-primary/50'
                        }`}
                        style={{ 
                          width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` 
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {challenge.progress}/{challenge.target}
                      </span>
                      <span>
                        {Math.round((challenge.progress / challenge.target) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {completedCount === challenges.length && challenges.length > 0 && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-center">
            <p className="text-lg font-bold text-foreground">
              🎉 Tous les défis complétés!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Revenez demain pour de nouveaux défis
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
