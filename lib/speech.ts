// Gestion de la synthèse vocale pour la prononciation des verbes

/**
 * Prononce un texte en anglais
 */
export function speakText(text: string, rate: number = 0.9): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported')
    return
  }

  // Annuler toute lecture en cours
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US' // Anglais américain
  utterance.rate = rate // Vitesse de lecture (0.1 à 10, défaut 1)
  utterance.pitch = 1 // Hauteur de la voix (0 à 2, défaut 1)
  utterance.volume = 1 // Volume (0 à 1, défaut 1)

  // Essayer de trouver une voix anglaise de qualité
  const voices = window.speechSynthesis.getVoices()
  const englishVoice = voices.find(
    voice => voice.lang.startsWith('en-') && voice.name.includes('Google')
  ) || voices.find(
    voice => voice.lang.startsWith('en-')
  )

  if (englishVoice) {
    utterance.voice = englishVoice
  }

  window.speechSynthesis.speak(utterance)
}

/**
 * Prononce un verbe avec ses conjugaisons
 */
export function speakVerb(verb: string): void {
  speakText(verb)
}

/**
 * Prononce une phrase exemple
 */
export function speakExample(example: string): void {
  speakText(example, 0.85) // Un peu plus lent pour les phrases
}

/**
 * Arrête toute lecture en cours
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

/**
 * Vérifie si la synthèse vocale est supportée
 */
export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Charge les voix disponibles (nécessaire sur certains navigateurs)
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve([])
      return
    }

    let voices = window.speechSynthesis.getVoices()
    
    if (voices.length > 0) {
      resolve(voices)
      return
    }

    // Sur certains navigateurs, les voix se chargent de manière asynchrone
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices()
      resolve(voices)
    }

    // Timeout de sécurité
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices())
    }, 1000)
  })
}
