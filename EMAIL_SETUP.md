# Configuration de l'envoi d'emails

## Option 1 : Resend (Recommandé - Simple et Gratuit)

### Étapes :

1. **Créer un compte Resend** : https://resend.com/signup
   - Gratuit jusqu'à 3000 emails/mois
   - Très simple à configurer

2. **Obtenir votre clé API** :
   - Connectez-vous à Resend
   - Allez dans "API Keys"
   - Créez une nouvelle clé API
   - Copiez la clé (elle commence par `re_`)

3. **Installer le package** :
   ```bash
   npm install resend
   ```

4. **Créer le fichier `.env.local`** à la racine du projet :
   ```env
   RESEND_API_KEY=re_votre_cle_api_ici
   CONTACT_EMAIL=aderrab.karim1983@gmail.com
   ```

5. **Mettre à jour l'API route** :
   Le fichier `app/api/contact/route.ts` sera automatiquement mis à jour pour utiliser Resend.

### Avantages de Resend :
- ✅ Configuration en 5 minutes
- ✅ 3000 emails gratuits/mois
- ✅ Pas besoin de configurer SMTP
- ✅ Excellente délivrabilité
- ✅ Dashboard pour suivre les emails

---

## Option 2 : Nodemailer avec Gmail

### Étapes :

1. **Installer les packages** :
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Configurer Gmail** :
   - Aller dans votre compte Google
   - Activer la validation en 2 étapes
   - Générer un "Mot de passe d'application" :
     - https://myaccount.google.com/apppasswords
     - Sélectionner "Mail" et "Autre"
     - Copier le mot de passe généré (16 caractères)

3. **Créer le fichier `.env.local`** :
   ```env
   GMAIL_USER=aderrab.karim1983@gmail.com
   GMAIL_APP_PASSWORD=votre_mot_de_passe_application_16_caracteres
   CONTACT_EMAIL=aderrab.karim1983@gmail.com
   ```

4. **Mettre à jour l'API route** avec Nodemailer

### Avantages de Nodemailer :
- ✅ Gratuit et illimité
- ✅ Utilise votre compte Gmail existant
- ✅ Pas de service tiers

### Inconvénients :
- ⚠️ Configuration plus complexe
- ⚠️ Limite de 500 emails/jour avec Gmail
- ⚠️ Peut être bloqué par Gmail si trop d'emails

---

## Quelle option choisir ?

- **Resend** : Si vous voulez quelque chose de simple et professionnel
- **Nodemailer + Gmail** : Si vous préférez utiliser votre compte Gmail existant

---

## Après la configuration

Une fois que vous avez choisi et configuré l'une des options :

1. Créez le fichier `.env.local` avec vos clés
2. Redémarrez le serveur de développement
3. Testez le formulaire de contact
4. Vous recevrez les emails sur `aderrab.karim1983@gmail.com`

**Important** : Le fichier `.env.local` ne doit JAMAIS être commité sur Git (il est déjà dans `.gitignore`)
