'use client'

import { useEffect, useState } from 'react'

export function AudioIndicator() {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    const checkSpeaking = () => {
      setIsPlaying(window.speechSynthesis.speaking)
    }

    const interval = setInterval(checkSpeaking, 100)
    return () => clearInterval(interval)
  }, [])

  if (!isPlaying) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-2xl animate-in slide-in-from-bottom-2">
      <div className="flex gap-1">
        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm font-medium">Lecture en cours...</span>
    </div>
  )
}
