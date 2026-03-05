# 🚀 Configuration du Formulaire de Contact

## ✅ Ce qui est déjà fait

- ✅ Page de contact créée (`/contact`)
- ✅ Formulaire élégant et responsive
- ✅ API route pour traiter les messages (`/api/contact`)
- ✅ Votre adresse email est CACHÉE (pas visible dans le code frontend)
- ✅ Liens "Contact" ajoutés dans la navbar et le footer

## 📧 Configuration de l'envoi d'emails (REQUIS)

### Étape 1 : Choisir votre méthode

**Option A : Resend (Recommandé - Plus simple)**
- Gratuit jusqu'à 3000 emails/mois
- Configuration en 5 minutes
- Très fiable

**Option B : Gmail avec Nodemailer**
- Gratuit et illimité (limite 500/jour)
- Utilise votre Gmail existant
- Configuration un peu plus complexe

---

## 🎯 Configuration avec Resend (Recommandé)

### 1. Créer un compte Resend

1. Allez sur https://resend.com/signup
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Obtenir votre clé API

1. Connectez-vous à Resend
2. Allez dans "API Keys" dans le menu
3. Cliquez sur "Create API Key"
4. Donnez-lui un nom (ex: "App-Anglais Contact")
5. Copiez la clé (elle commence par `re_`)

### 3. Configurer votre projet

1. Créez un fichier `.env.local` à la racine du projet :

```bash
# Dans le terminal, à la racine du projet
echo "RESEND_API_KEY=re_votre_cle_api_ici" > .env.local
echo "CONTACT_EMAIL=aderrab.karim1983@gmail.com" >> .env.local
```

Ou créez le fichier manuellement avec ce contenu :

```env
RESEND_API_KEY=re_votre_cle_api_ici
CONTACT_EMAIL=aderrab.karim1983@gmail.com
```

### 4. Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez
npm run dev
```

### 5. Tester

1. Allez sur http://localhost:3000/contact
2. Remplissez le formulaire
3. Envoyez un message test
4. Vous devriez recevoir l'email sur `aderrab.karim1983@gmail.com`

---

## 🔧 Mode Développement (Sans configuration)

Si vous n'avez pas encore configuré Resend, le formulaire fonctionne quand même :
- Les messages sont affichés dans la console du serveur
- Vous verrez un message de succès
- Mais aucun email n'est envoyé

C'est parfait pour tester l'interface !

---

## 🔒 Sécurité

✅ **Votre adresse email est protégée** :
- Elle n'apparaît JAMAIS dans le code frontend
- Elle est stockée dans `.env.local` (non commité sur Git)
- Seul le serveur y a accès
- L'utilisateur ne peut PAS voir votre email

✅ **Protection contre le spam** :
- Validation des champs côté serveur
- Validation du format email
- Rate limiting possible (à ajouter si besoin)

---

## 📝 Format de l'email que vous recevrez

```
De : App-Anglais <onboarding@resend.dev>
Répondre à : email_de_lutilisateur@exemple.com
À : aderrab.karim1983@gmail.com
Sujet : [Contact App-Anglais] Le sujet du message

Nouveau message de contact

Nom : Jean Dupont
Email : jean.dupont@exemple.com
Sujet : Question sur l'application

Message :
Bonjour, j'ai une question concernant...

💡 Vous pouvez répondre directement à cet email pour contacter Jean Dupont
```

---

## 🚀 Déploiement sur Vercel

Quand vous déployez sur Vercel :

1. Allez dans les paramètres de votre projet Vercel
2. Section "Environment Variables"
3. Ajoutez :
   - `RESEND_API_KEY` = votre clé Resend
   - `CONTACT_EMAIL` = aderrab.karim1983@gmail.com
4. Redéployez

---

## ❓ Besoin d'aide ?

Si vous avez des questions ou des problèmes :
1. Vérifiez que `.env.local` existe et contient les bonnes valeurs
2. Vérifiez que le serveur a été redémarré après la création de `.env.local`
3. Regardez les logs dans le terminal pour voir les erreurs
4. Testez d'abord en mode développement (sans Resend) pour vérifier que le formulaire fonctionne

---

## 📊 Statistiques Resend

Une fois configuré, vous pouvez :
- Voir tous les emails envoyés dans le dashboard Resend
- Vérifier le taux de délivrabilité
- Voir les erreurs éventuelles
- Suivre votre quota (3000 emails/mois gratuits)
