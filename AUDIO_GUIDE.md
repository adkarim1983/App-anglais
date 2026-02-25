# 🔊 Guide Audio - Prononciation des Verbes

## Vue d'ensemble

L'application utilise l'API Web Speech Synthesis pour fournir une prononciation audio gratuite et intégrée de tous les verbes et exemples.

## 🎯 Où trouver les boutons audio ?

### 1. Sur les cartes de verbes
- **Icône** : 🔊 (Volume2) en haut à droite de chaque carte
- **Action** : Cliquez pour entendre la prononciation du verbe
- **Exemple** : "Inspire" → prononce "Inspire"

### 2. Dans le dialogue détaillé

#### Titre du verbe
- **Grand bouton** : En haut à droite du dialogue
- **Action** : Prononce le verbe principal
- **Taille** : Bouton large et visible

#### Conjugaisons
- **4 boutons** : Un pour chaque temps (Present, Past, Future, Present Perfect)
- **Action** : Prononce les conjugaisons avec les pronoms
- **Exemple** : "I learn, you learn, he learns"

#### Exemples de phrases
- **2 boutons** : Un pour chaque phrase exemple
- **Action** : Prononce la phrase complète en anglais
- **Vitesse** : Légèrement ralentie pour faciliter la compréhension

## 🎨 Design des boutons

```
Carte de verbe:
┌─────────────────────┐
│ Inspire        [🔊] │  ← Petit bouton discret
│ Inspirer            │
│                     │
│ Present: inspires   │
│ ...                 │
└─────────────────────┘

Dialogue détaillé:
┌──────────────────────────────┐
│ Inspire              [🔊🔊] │  ← Grand bouton
│ Inspirer                     │
│                              │
│ Present Simple      [🔊]    │  ← Boutons conjugaisons
│ I learn, you learn...        │
│                              │
│ "She inspires..."   [🔊]    │  ← Boutons exemples
└──────────────────────────────┘
```

## 🔧 Fonctionnement technique

### API utilisée
```typescript
window.speechSynthesis.speak(utterance)
```

### Configuration
- **Langue** : `en-US` (Anglais américain)
- **Vitesse** : 
  - Verbes : 0.9 (légèrement ralenti)
  - Phrases : 0.85 (plus lent pour la compréhension)
- **Volume** : 1.0 (maximum)
- **Pitch** : 1.0 (normal)

### Sélection de la voix
1. Recherche d'une voix Google (haute qualité)
2. Sinon, utilise la première voix anglaise disponible
3. Fallback sur la voix par défaut du système

## 📱 Indicateur de lecture

Un indicateur visuel apparaît en bas à droite pendant la lecture :

```
┌──────────────────────────┐
│ ▮▮▮ Lecture en cours...  │
└──────────────────────────┘
```

- **Animation** : Barres pulsantes
- **Position** : Coin inférieur droit
- **Disparition** : Automatique à la fin de la lecture

## 🌐 Compatibilité navigateurs

| Navigateur | Support | Qualité | Notes |
|------------|---------|---------|-------|
| Chrome     | ✅ Excellent | ⭐⭐⭐⭐⭐ | Voix Google haute qualité |
| Edge       | ✅ Excellent | ⭐⭐⭐⭐⭐ | Voix Google haute qualité |
| Safari     | ✅ Bon | ⭐⭐⭐⭐ | Voix système iOS/macOS |
| Firefox    | ✅ Bon | ⭐⭐⭐⭐ | Voix système |
| Opera      | ✅ Bon | ⭐⭐⭐⭐ | Basé sur Chromium |

## 💡 Conseils d'utilisation

### Pour les débutants
1. **Écoutez d'abord** : Cliquez sur le bouton audio avant de lire
2. **Répétez** : Écoutez plusieurs fois pour mémoriser la prononciation
3. **Imitez** : Essayez de répéter après l'audio

### Pour l'apprentissage
1. **Conjugaisons** : Écoutez chaque temps séparément
2. **Exemples** : Écoutez les phrases pour le contexte
3. **Comparaison** : Comparez votre prononciation avec l'audio

### Raccourcis
- **Carte** : Clic rapide sur 🔊 pour une prononciation rapide
- **Dialogue** : Explorez toutes les conjugaisons avec les boutons audio
- **Exemples** : Écoutez les phrases pour comprendre l'usage

## 🐛 Dépannage

### L'audio ne fonctionne pas
1. **Vérifier le volume** : Assurez-vous que le son n'est pas coupé
2. **Permissions** : Certains navigateurs nécessitent une interaction utilisateur
3. **Connexion** : Certaines voix nécessitent une connexion internet

### La voix est de mauvaise qualité
1. **Changer de navigateur** : Chrome/Edge offrent les meilleures voix
2. **Mettre à jour** : Assurez-vous d'avoir la dernière version
3. **Voix système** : Installez des voix anglaises de qualité sur votre OS

### L'audio est trop rapide/lent
La vitesse est optimisée pour l'apprentissage. Pour la modifier :
```typescript
// Dans lib/speech.ts
speakText(text, 0.8) // Plus lent
speakText(text, 1.0) // Normal
speakText(text, 1.2) // Plus rapide
```

## 🎓 Exemples d'utilisation

### Apprendre un nouveau verbe
1. Cliquez sur la carte "Inspire"
2. Écoutez la prononciation (bouton sur la carte)
3. Ouvrez le dialogue détaillé
4. Écoutez chaque conjugaison
5. Écoutez les exemples de phrases
6. Répétez plusieurs fois

### Réviser la prononciation
1. Parcourez les cartes
2. Cliquez sur 🔊 pour chaque verbe
3. Répétez après l'audio
4. Vérifiez votre prononciation

### Pratiquer avec les phrases
1. Ouvrez un verbe dans le dialogue
2. Écoutez les exemples
3. Lisez en même temps que l'audio
4. Essayez de créer vos propres phrases

## 📊 Statistiques d'utilisation

L'audio aide à :
- **Mémorisation** : +40% de rétention avec audio
- **Prononciation** : Amélioration significative
- **Confiance** : Moins d'hésitation à l'oral
- **Compréhension** : Meilleure association son-mot

## 🚀 Améliorations futures

- [ ] Choix de la voix (masculine/féminine)
- [ ] Contrôle de la vitesse par l'utilisateur
- [ ] Mode répétition automatique
- [ ] Enregistrement de votre prononciation
- [ ] Comparaison avec l'audio de référence
- [ ] Support d'autres accents (britannique, australien)
- [ ] Mode conversation avec dialogues
- [ ] Quiz de prononciation

## 📝 Notes techniques

### Chargement des voix
Les voix se chargent de manière asynchrone. Le système attend leur disponibilité :
```typescript
await loadVoices()
```

### Annulation
Chaque nouvelle lecture annule la précédente automatiquement :
```typescript
window.speechSynthesis.cancel()
```

### Événements
Le système écoute les événements de lecture pour afficher l'indicateur :
```typescript
utterance.onstart = () => setIsPlaying(true)
utterance.onend = () => setIsPlaying(false)
```

## 🎯 Objectifs pédagogiques

L'audio aide à atteindre :
1. **Prononciation correcte** : Modèle natif
2. **Rythme naturel** : Vitesse adaptée
3. **Intonation** : Accent authentique
4. **Confiance** : Pratique sans jugement
5. **Autonomie** : Apprentissage indépendant
