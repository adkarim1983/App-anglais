# 🎯 Guide d'Intégration Google AdSense

## 📋 Étape 1 : Obtenir le Code AdSense

Après l'approbation de votre compte AdSense, vous recevrez un code client qui ressemble à :
```
ca-pub-1234567890123456
```

## 🔧 Étape 2 : Ajouter le Script AdSense Global

### Modifier `app/layout.tsx`

Ajoutez l'import de Script en haut du fichier :
```tsx
import Script from 'next/script'
```

Puis ajoutez le script AdSense dans le composant, juste après la balise `<body>` :

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

Remplacez `ca-pub-XXXXXXXXXX` par votre véritable code client AdSense.

## 📍 Étape 3 : Créer un Composant AdSense Réutilisable

### Créer `components/adsense-ad.tsx`

```tsx
'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  adLayout?: string
  fullWidthResponsive?: boolean
  className?: string
}

export function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  adLayout,
  fullWidthResponsive = true,
  className = ''
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}
```

N'oubliez pas de remplacer `ca-pub-XXXXXXXXXX` par votre code client.

## 🎨 Étape 4 : Ajouter des Annonces aux Pages

### Page d'Accueil (`app/page.tsx`)

#### Top Banner (après le header)
```tsx
import { AdSenseAd } from '@/components/adsense-ad'

// Dans le composant, après la section Hero
<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <AdSenseAd 
    adSlot="1234567890"
    adFormat="horizontal"
    className="mb-8"
  />
</section>
```

#### Sidebar (à côté du contenu principal)
```tsx
<div className="grid lg:grid-cols-[1fr_300px] gap-8">
  <div>
    {/* Contenu principal */}
  </div>
  
  <aside className="hidden lg:block">
    <div className="sticky top-24 space-y-8">
      <AdSenseAd 
        adSlot="9876543210"
        adFormat="vertical"
      />
    </div>
  </aside>
</div>
```

#### In-Feed (entre les sections)
```tsx
{/* Après la section des verbes essentiels */}
<div className="my-12">
  <AdSenseAd 
    adSlot="1122334455"
    adFormat="fluid"
    adLayout="in-article"
  />
</div>
```

### Pages de Contenu (Verbes, Quiz, Tips)

#### Top Banner
```tsx
// Après le header, avant le contenu principal
<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <AdSenseAd 
    adSlot="5544332211"
    adFormat="horizontal"
  />
</section>
```

#### In-Article
```tsx
// Au milieu du contenu
<div className="my-8">
  <AdSenseAd 
    adSlot="6677889900"
    adFormat="fluid"
    adLayout="in-article"
  />
</div>
```

#### Bottom Banner
```tsx
// Avant le footer
<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <AdSenseAd 
    adSlot="9988776655"
    adFormat="horizontal"
  />
</section>
```

## 📱 Étape 5 : Emplacements Recommandés par Page

### Page d'Accueil (/)
```tsx
// 1. Top Banner - après le header
<AdSenseAd adSlot="SLOT_1" adFormat="horizontal" />

// 2. Sidebar - colonne droite
<AdSenseAd adSlot="SLOT_2" adFormat="vertical" />

// 3. In-Feed - entre les sections
<AdSenseAd adSlot="SLOT_3" adFormat="fluid" adLayout="in-article" />

// 4. Bottom - avant le footer
<AdSenseAd adSlot="SLOT_4" adFormat="horizontal" />
```

### Page Verbes Réguliers (/regular-verbs)
```tsx
// 1. Top Banner
<AdSenseAd adSlot="SLOT_5" adFormat="horizontal" />

// 2. In-Article - après 3-4 verbes
<AdSenseAd adSlot="SLOT_6" adFormat="fluid" adLayout="in-article" />

// 3. Bottom
<AdSenseAd adSlot="SLOT_7" adFormat="horizontal" />
```

### Page Quiz (/quiz)
```tsx
// 1. Top Banner
<AdSenseAd adSlot="SLOT_8" adFormat="horizontal" />

// 2. Après les résultats du quiz
<AdSenseAd adSlot="SLOT_9" adFormat="rectangle" />
```

### Page Astuces (/tips)
```tsx
// 1. Top Banner
<AdSenseAd adSlot="SLOT_10" adFormat="horizontal" />

// 2. Entre les conseils (après 4 conseils)
<AdSenseAd adSlot="SLOT_11" adFormat="fluid" adLayout="in-article" />

// 3. Bottom
<AdSenseAd adSlot="SLOT_12" adFormat="horizontal" />
```

## 🎯 Étape 6 : Créer les Unités Publicitaires dans AdSense

1. Connectez-vous à votre compte AdSense
2. Allez dans **Annonces** > **Par unité publicitaire**
3. Cliquez sur **Nouvelle unité publicitaire**
4. Créez les unités suivantes :

### Types d'Unités Recommandées

#### Display Responsive (pour tous les emplacements)
- Nom : "Display Responsive - Global"
- Type : Display
- Taille : Responsive
- Utilisez ce slot pour les emplacements génériques

#### In-Article (pour le contenu)
- Nom : "In-Article - Contenu"
- Type : In-article
- Utilisez ce slot entre les paragraphes

#### In-Feed (pour les listes)
- Nom : "In-Feed - Accueil"
- Type : In-feed
- Utilisez ce slot dans les flux de contenu

## 🔍 Étape 7 : Tester les Annonces

### Mode Test
Pendant le développement, les annonces peuvent ne pas s'afficher. C'est normal.

### Vérifications
1. Ouvrez la console du navigateur (F12)
2. Vérifiez qu'il n'y a pas d'erreurs AdSense
3. Attendez 24-48h après l'ajout du code pour voir les annonces
4. Testez sur différents appareils (mobile, tablette, desktop)

### Commandes Utiles
```bash
# Développement local
npm run dev

# Build de production
npm run build

# Déployer sur Vercel
git push origin main
```

## ⚠️ Règles Importantes AdSense

### À FAIRE ✅
- Placer les annonces de manière naturelle
- Respecter l'expérience utilisateur
- Laisser de l'espace autour des annonces
- Tester sur mobile et desktop
- Suivre les performances dans AdSense

### À NE PAS FAIRE ❌
- Ne cliquez JAMAIS sur vos propres annonces
- Ne demandez pas aux autres de cliquer
- Ne placez pas trop d'annonces (max 3 par page recommandé)
- Ne cachez pas le contenu derrière les annonces
- Ne modifiez pas le code AdSense

## 📊 Étape 8 : Optimisation des Performances

### Lazy Loading
Les annonces sont chargées automatiquement avec `strategy="afterInteractive"`.

### Placement Optimal
- **Au-dessus de la ligne de flottaison** : 1 annonce maximum
- **Dans le contenu** : 1-2 annonces
- **En bas de page** : 1 annonce

### Tailles Recommandées
- **Desktop** : 728x90 (leaderboard), 300x250 (rectangle), 300x600 (half-page)
- **Mobile** : 320x50 (mobile banner), 300x250 (rectangle)
- **Responsive** : S'adapte automatiquement

## 📈 Étape 9 : Suivi des Performances

### Dans AdSense
- Allez dans **Rapports**
- Consultez :
  - Revenus estimés
  - Impressions
  - Clics
  - CTR (taux de clics)
  - RPM (revenu pour 1000 impressions)

### Optimisation
- Testez différents emplacements
- Analysez les pages les plus performantes
- Ajustez selon les données

## 🆘 Dépannage

### Les annonces ne s'affichent pas
1. Vérifiez que le code client est correct
2. Attendez 24-48h après l'ajout
3. Vérifiez la console pour les erreurs
4. Assurez-vous que le site est approuvé par AdSense

### Erreurs courantes
```
AdSense error: adsbygoogle.push() error: No slot size for availableWidth=0
```
Solution : Vérifiez que le conteneur a une largeur définie.

```
AdSense error: All 'ins' elements in the DOM with class=adsbygoogle already have ads in them.
```
Solution : Ne dupliquez pas les éléments avec la même classe.

## ✅ Checklist Finale

Avant de déployer avec AdSense :
- [ ] Code client AdSense ajouté dans `layout.tsx`
- [ ] Composant `AdSenseAd` créé
- [ ] Unités publicitaires créées dans AdSense
- [ ] Slots AdSense ajoutés aux pages
- [ ] Code testé en local
- [ ] Build réussi sans erreurs
- [ ] Déployé sur Vercel
- [ ] Annonces visibles après 24-48h
- [ ] Pas d'erreurs dans la console
- [ ] Responsive testé

## 📞 Support

### Ressources
- [Centre d'aide AdSense](https://support.google.com/adsense/)
- [Politiques du programme](https://support.google.com/adsense/answer/48182)
- [Forum de la communauté](https://support.google.com/adsense/community)

Bonne chance avec votre monétisation ! 💰
