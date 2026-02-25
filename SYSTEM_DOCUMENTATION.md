# 📚 Daily English Verbs - Documentation du Système

## 🎯 Vue d'ensemble

Application d'apprentissage de verbes anglais avec système de progression, API, et évitement des répétitions.

## ✨ Fonctionnalités principales

### 1. Base de données enrichie (50 verbes)
- **Avant** : 20 verbes
- **Maintenant** : 50 verbes avec conjugaisons complètes
- Verbes réguliers et irréguliers
- Traductions françaises
- Exemples d'utilisation

### 2. 🔊 Prononciation audio (Text-to-Speech)
- **Synthèse vocale intégrée** : Utilise l'API Web Speech Synthesis
- **Gratuit et sans fichiers** : Pas besoin de fichiers audio externes
- **Boutons audio partout** :
  - Sur chaque carte de verbe (icône 🔊)
  - Dans le dialogue détaillé (titre + conjugaisons + exemples)
- **Voix anglaise** : Prononciation en anglais américain (en-US)
- **Vitesse ajustable** : Légèrement ralentie pour faciliter l'apprentissage

#### Fonctions disponibles (`lib/speech.ts`)
- `speakText(text, rate)` - Prononce un texte en anglais
- `speakVerb(verb)` - Prononce un verbe
- `speakExample(example)` - Prononce une phrase exemple
- `stopSpeaking()` - Arrête la lecture en cours
- `isSpeechSupported()` - Vérifie le support du navigateur
- `loadVoices()` - Charge les voix disponibles

### 3. API REST (`/api/verbs`)
- **GET** `/api/verbs?count=10&exclude=1,2,3`
  - `count` : Nombre de verbes à retourner
  - `exclude` : IDs des verbes à exclure (séparés par des virgules)
  - Retourne des verbes aléatoires non appris

- **POST** `/api/verbs` avec `{ action: "getAll" }`
  - Retourne tous les verbes disponibles

### 4. Système de progression (localStorage)

#### Structure des données
```typescript
interface UserProgress {
  learnedVerbIds: number[]      // IDs des verbes appris
  lastStudyDate: string          // Date de dernière étude
  totalVerbsLearned: number      // Nombre total de verbes appris
  streak: number                 // Série de jours consécutifs
}
```

#### Fonctions disponibles (`lib/progress.ts`)
- `getUserProgress()` - Récupère la progression
- `saveUserProgress(progress)` - Sauvegarde la progression
- `markVerbAsLearned(verbId)` - Marque un verbe comme appris
- `getLearnedVerbIds()` - Obtient les IDs des verbes appris
- `isVerbLearned(verbId)` - Vérifie si un verbe est appris
- `resetProgress()` - Réinitialise la progression

### 5. Évitement des répétitions

Le système évite automatiquement de montrer les verbes déjà appris :

```typescript
// Lors du chargement des verbes
const learnedIds = getLearnedVerbIds()
const newVerbs = await fetchVerbs(10, learnedIds)
```

Si tous les verbes ont été appris, le système recommence avec tous les verbes.

### 6. Suivi de la série (Streak)

Le système calcule automatiquement les jours consécutifs d'apprentissage :
- Étude aujourd'hui après hier : `streak + 1`
- Étude après une pause : `streak = 1`
- Affichage avec emoji 🔥

## 📊 Composants

### `ProgressStats`
Affiche les statistiques de progression :
- Nombre de verbes appris
- Série actuelle
- Pourcentage de progression
- Dernière date d'étude
- Barre de progression visuelle
- Messages de motivation
- Bouton de réinitialisation

### `VerbCard`
Carte de verbe avec :
- Badge "✓ Appris" si le verbe a été consulté
- Animations au survol
- Clic pour ouvrir les détails

### `VerbDetailDialog`
Dialogue détaillé avec :
- Conjugaison complète (6 pronoms × 4 temps)
- 2 exemples avec traductions
- Conseils d'apprentissage

## 🔄 Flux de données

```
1. Chargement de la page
   ↓
2. Récupération de la progression (localStorage)
   ↓
3. Appel API avec verbes exclus
   ↓
4. Affichage des verbes non appris
   ↓
5. Clic sur un verbe
   ↓
6. Marquage comme appris
   ↓
7. Mise à jour de la progression
   ↓
8. Sauvegarde dans localStorage
```

## 💾 Stockage

### localStorage
- **Clé** : `daily-verbs-progress`
- **Format** : JSON
- **Persistance** : Navigateur local
- **Réinitialisation** : Via bouton dans ProgressStats

## 🎨 Améliorations visuelles

- Design ultra élégant avec glassmorphism
- Animations fluides (shimmer, float, gradient)
- Dégradés de couleurs sophistiqués
- Effets de hover interactifs
- Badges de progression
- Statistiques en temps réel

## 🚀 Utilisation

### Démarrer l'application
```bash
npm run dev
```

### Tester l'API
```bash
# Obtenir 10 verbes aléatoires
curl http://localhost:3000/api/verbs?count=10

# Obtenir 10 verbes en excluant certains IDs
curl http://localhost:3000/api/verbs?count=10&exclude=1,2,3,4,5

# Obtenir tous les verbes
curl -X POST http://localhost:3000/api/verbs \
  -H "Content-Type: application/json" \
  -d '{"action":"getAll"}'
```

## 📈 Évolutions futures possibles

1. **Backend persistant** : Base de données PostgreSQL/MongoDB
2. **Authentification** : Comptes utilisateurs
3. **Synchronisation cloud** : Progression multi-appareils
4. **Quiz interactifs** : Tests de conjugaison
5. **Notifications** : Rappels quotidiens
6. **Statistiques avancées** : Graphiques de progression
7. **Partage social** : Partager ses réussites
8. **Mode hors ligne** : PWA avec Service Worker
9. **Voix personnalisées** : Choix de différentes voix
10. **Vitesse de lecture** : Contrôle utilisateur de la vitesse audio

## 🔊 Compatibilité audio

### Navigateurs supportés
- ✅ Chrome/Edge (Excellente qualité)
- ✅ Safari (Bonne qualité)
- ✅ Firefox (Bonne qualité)
- ✅ Opera (Bonne qualité)

### Voix disponibles
Le système sélectionne automatiquement la meilleure voix anglaise disponible :
1. Priorité : Voix Google (haute qualité)
2. Fallback : Voix système par défaut

### Limitations
- Nécessite une connexion internet pour certaines voix
- La qualité varie selon le système d'exploitation
- Certains navigateurs peuvent avoir un délai de chargement des voix

## 🐛 Débogage

### Vérifier la progression
```javascript
// Dans la console du navigateur
console.log(localStorage.getItem('daily-verbs-progress'))
```

### Réinitialiser manuellement
```javascript
// Dans la console du navigateur
localStorage.removeItem('daily-verbs-progress')
location.reload()
```

## 📝 Notes techniques

- Next.js 14+ avec App Router
- TypeScript pour la sécurité des types
- Tailwind CSS pour le styling
- Radix UI pour les composants
- localStorage pour la persistance locale
- API Routes pour le backend
