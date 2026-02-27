'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VocabularyCard } from '@/components/vocabulary-card'
import { VocabularyItem } from '@/lib/vocabulary'
import { BookText, MessageSquare, Zap } from 'lucide-react'
import { ADJECTIVES_WITH_IDS } from '@/lib/adjectives-data'
import { ADVERBS_WITH_IDS } from '@/lib/adverbs-data'
import { EXPRESSIONS_WITH_IDS } from '@/lib/expressions-data'

interface VocabularyTabsProps {
  verbs: VocabularyItem[]
  onItemClick: (item: VocabularyItem) => void
  isLoading: boolean
}

export function VocabularyTabs({ verbs, onItemClick, isLoading }: VocabularyTabsProps) {
  const [activeTab, setActiveTab] = useState('verbs')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-100 dark:bg-slate-800/50 p-1">
        <TabsTrigger 
          value="verbs"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          <BookText className="h-4 w-4 mr-2" />
          Verbes ({verbs.length})
        </TabsTrigger>
        <TabsTrigger 
          value="adjectives"
          className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Adjectifs ({ADJECTIVES_WITH_IDS.length})
        </TabsTrigger>
        <TabsTrigger 
          value="adverbs"
          className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
        >
          <Zap className="h-4 w-4 mr-2" />
          Adverbes ({ADVERBS_WITH_IDS.length})
        </TabsTrigger>
        <TabsTrigger 
          value="expressions"
          className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
        >
          💬 Expressions ({EXPRESSIONS_WITH_IDS.length})
        </TabsTrigger>
      </TabsList>

      {/* Verbes */}
      <TabsContent value="verbs" className="mt-0">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">Chargement...</p>
          </div>
        ) : verbs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Aucun verbe disponible.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {verbs.map((verb, index) => (
              <div
                key={verb.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <VocabularyCard item={verb} onClick={() => onItemClick(verb)} />
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      {/* Adjectifs */}
      <TabsContent value="adjectives" className="mt-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ADJECTIVES_WITH_IDS.map((adj, index) => (
            <div
              key={adj.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <VocabularyCard item={adj} onClick={() => onItemClick(adj)} />
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Adverbes */}
      <TabsContent value="adverbs" className="mt-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ADVERBS_WITH_IDS.map((adv, index) => (
            <div
              key={adv.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <VocabularyCard item={adv} onClick={() => onItemClick(adv)} />
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Expressions */}
      <TabsContent value="expressions" className="mt-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {EXPRESSIONS_WITH_IDS.map((expr, index) => (
            <div
              key={expr.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <VocabularyCard item={expr} onClick={() => onItemClick(expr)} />
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
