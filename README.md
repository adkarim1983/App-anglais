# 🎓 App-Anglais - Plateforme d'Apprentissage de l'Anglais

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Apprenez l'anglais de manière interactive avec 10 nouveaux verbes chaque jour, des quiz interactifs et un suivi de progression personnalisé.

## 🌟 Fonctionnalités Principales

### 📚 Apprentissage Interactif
- **Verbes du Jour** : 10 nouveaux verbes quotidiens avec conjugaisons complètes
- **Vocabulaire Enrichi** : Adjectifs, adverbes et expressions idiomatiques
- **Contexte Professionnel** : Exemples d'utilisation en contexte business
- **Synonymes & Antonymes** : Enrichissement du vocabulaire

### 🎮 Modes d'Apprentissage
- **Quiz Interactif** : Testez vos connaissances avec des questions variées
- **Flashcards** : Mémorisation par répétition espacée
- **Exercices à Trous** : Complétez les phrases avec les verbes corrects
- **Mode Dictée** : Améliorez votre compréhension orale
- **Mode Révision** : Révisez les verbes déjà appris

### 📊 Suivi de Progression
- **Statistiques Détaillées** : Suivez vos progrès jour après jour
- **Système de Badges** : Débloquez des récompenses
- **Défis Quotidiens** : Maintenez votre motivation
- **Historique d'Étude** : Visualisez votre parcours d'apprentissage
- **Séries d'Apprentissage** : Maintenez votre série quotidienne

### 📖 Pages de Contenu
- **100 Verbes Réguliers** : Liste complète avec conjugaisons et exemples
- **20 Verbes Irréguliers** : Les verbes essentiels à maîtriser
- **Mini-Quiz** : 10 questions interactives pour tester vos connaissances
- **Astuces d'Apprentissage** : 8 conseils pratiques pour progresser rapidement

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou pnpm

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/app-anglais.git

# Naviguer dans le dossier
cd app-anglais

# Installer les dépendances
npm install
# ou
pnpm install

# Lancer le serveur de développement
npm run dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
app-anglais/
├── app/                    # Pages Next.js
│   ├── about/             # Page À Propos
│   ├── regular-verbs/     # Page Verbes Réguliers
│   ├── irregular-verbs/   # Page Verbes Irréguliers
│   ├── quiz/              # Page Mini-Quiz
│   ├── tips/              # Page Astuces
│   ├── privacy/           # Politique de Confidentialité
│   └── terms/             # Conditions d'Utilisation
├── components/            # Composants React
│   ├── ui/               # Composants UI (shadcn/ui)
│   └── ...               # Composants métier
├── lib/                  # Bibliothèques et utilitaires
│   ├── verbs-data.ts    # Données des verbes
│   ├── progress.ts      # Gestion de la progression
│   └── ...              # Autres utilitaires
└── public/              # Fichiers statiques
```

Voir [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) pour plus de détails.

## 🎨 Technologies Utilisées

- **Framework** : [Next.js 16](https://nextjs.org/) avec App Router
- **UI Library** : [React 19](https://reactjs.org/)
- **Language** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Components** : [shadcn/ui](https://ui.shadcn.com/)
- **Icons** : [Lucide React](https://lucide.dev/)
- **Deployment** : [Vercel](https://vercel.com/)

## 📚 Documentation

### Guides Utilisateur
- [Guide des Fonctionnalités](FEATURES_GUIDE.md) - Toutes les fonctionnalités expliquées
- [Guide Audio](AUDIO_GUIDE.md) - Utilisation de la synthèse vocale
- [Nouvelles Fonctionnalités](NOUVELLES_FONCTIONNALITES.md) - Dernières mises à jour

### Guides Développeur
- [Structure du Projet](PROJECT_STRUCTURE.md) - Architecture détaillée
- [Documentation Système](SYSTEM_DOCUMENTATION.md) - Documentation technique

### Guides Déploiement
- [Guide de Déploiement](DEPLOYMENT_GUIDE.md) - Déployer sur Vercel
- [Guide AdSense](ADSENSE_GUIDE.md) - Optimisation pour Google AdSense
- [Intégration AdSense](ADSENSE_INTEGRATION.md) - Intégration technique

### Résumé
- [Résumé des Modifications](RESUME_MODIFICATIONS.md) - Changements récents

## 🎯 Optimisation Google AdSense

Ce site est optimisé pour Google AdSense avec :
- ✅ 8 pages de contenu original (3700+ mots)
- ✅ Structure SEO optimisée
- ✅ Pages légales (Privacy Policy, Terms)
- ✅ Navigation claire et intuitive
- ✅ Design responsive et professionnel
- ✅ Sitemap.xml et robots.txt

Voir [ADSENSE_GUIDE.md](ADSENSE_GUIDE.md) pour plus d'informations.

## 🌐 Déploiement

### Déploiement sur Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Cliquez sur "Deploy"
4. Votre site sera disponible en quelques minutes

```bash
# Ou utilisez la CLI Vercel
npm install -g vercel
vercel
```

Voir [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) pour un guide détaillé.

## 📊 Statistiques

- **Pages** : 8 pages de contenu
- **Verbes** : 50+ verbes avec conjugaisons complètes
- **Vocabulaire** : 100+ mots (adjectifs, adverbes, expressions)
- **Quiz** : 10+ questions interactives
- **Modes** : 5 modes d'apprentissage différents
- **Badges** : 10+ badges à débloquer

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développeur Principal* - [Votre GitHub](https://github.com/votre-username)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [shadcn/ui](https://ui.shadcn.com/) pour les composants UI
- [Vercel](https://vercel.com/) pour l'hébergement
- [Lucide](https://lucide.dev/) pour les icônes

## 📞 Support

Pour toute question ou problème :
- Ouvrez une [issue](https://github.com/votre-username/app-anglais/issues)
- Consultez la [documentation](SYSTEM_DOCUMENTATION.md)
- Contactez-nous via la page de contact

## 🗺️ Roadmap

### Version 1.1 (À venir)
- [ ] Système de comptes utilisateurs
- [ ] Synchronisation cloud
- [ ] Application mobile (PWA)
- [ ] Plus de verbes (200+)

### Version 1.2 (Futur)
- [ ] Leçons thématiques
- [ ] Vidéos explicatives
- [ ] Certificats de compétence
- [ ] Mode multijoueur

## 📈 Métriques

- **Performance** : Score Lighthouse 95+
- **SEO** : Score Lighthouse 100
- **Accessibilité** : Score Lighthouse 90+
- **Best Practices** : Score Lighthouse 100

---

**Fait avec ❤️ pour les apprenants d'anglais**

[Site Web](https://votre-domaine.vercel.app) • [Documentation](SYSTEM_DOCUMENTATION.md) • [Changelog](RESUME_MODIFICATIONS.md)
