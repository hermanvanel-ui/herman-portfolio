# 🌐 Guide de déploiement

Ce guide explique comment déployer le portfolio sur différentes plateformes et le rendre accessible publiquement.

---

## Option 1 : Vercel (Recommandé) ⭐

**Pourquoi Vercel ?**
- Créé par les développeurs de Next.js
- Déploiement automatique à chaque commit
- SSL gratuit (HTTPS)
- CDN mondial ultra-rapide
- Domaine personnalisé gratuit

### Étapes

1. **Créer un compte sur Vercel**
   - Aller sur https://vercel.com
   - S'inscrire avec GitHub (recommandé)

2. **Importer le projet**
   - Cliquer sur "Add New Project"
   - Sélectionner le repository GitHub
   - Ou glisser-déposer le dossier

3. **Configuration automatique**
   - Vercel détecte automatiquement Next.js
   - Aucune configuration nécessaire
   - Cliquer sur "Deploy"

4. **Récupérer l'URL**
   - URL automatique : `https://herman-portfolio-xxx.vercel.app`
   - Personnalisable : `https://herman-vanel.vercel.app`

### Variables d'environnement

Si tu utilises des secrets (API keys, webhooks n8n) :

1. Aller dans "Project Settings" → "Environment Variables"
2. Ajouter `NEXT_PUBLIC_N8N_WEBHOOK_URL`
3. Redéployer

### Domaine personnalisé

Pour utiliser ton propre domaine (ex: `hermanvanel.com`) :

1. Aller dans "Project Settings" → "Domains"
2. Ajouter le domaine
3. Configurer les DNS selon les instructions

---

## Option 2 : Netlify

**Pourquoi Netlify ?**
- Interface simple et intuitive
- Déploiement par drag-and-drop
- Formulaires intégrés (utile pour la section contact)

### Étapes

1. **Créer un compte sur Netlify**
   - Aller sur https://netlify.com
   - S'inscrire

2. **Déployer le site**
   - Glisser-déposer le dossier `herman-portfolio`
   - Ou connecter GitHub

3. **Configurer le build**
   - Build command : `npm run build`
   - Publish directory : `.next`

4. **Récupérer l'URL**
   - URL automatique : `https://herman-portfolio.netlify.app`

---

## Option 3 : GitHub Pages

**Limitations** : GitHub Pages ne supporte pas les fonctionnalités serveur de Next.js (API routes, SSR).

Solution : exporter en site statique.

### Étapes

1. **Modifier `next.config.js`**
   ```javascript
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. **Build statique**
   ```bash
   npm run build
   ```

3. **Déployer sur GitHub Pages**
   - Créer un repository GitHub
   - Pusher le contenu du dossier `out/`
   - Activer GitHub Pages dans les settings

---

## Option 4 : Auto-hébergement (VPS)

Pour un contrôle total.

### Prérequis

- Un serveur (DigitalOcean, Linode, OVH, etc.)
- Node.js installé
- Nginx (recommandé)

### Étapes

1. **Cloner le projet sur le serveur**
   ```bash
   git clone https://github.com/ton-repo/herman-portfolio.git
   cd herman-portfolio
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Build production**
   ```bash
   npm run build
   ```

4. **Lancer avec PM2** (pour que le site tourne en continu)
   ```bash
   npm install -g pm2
   pm2 start npm --name "herman-portfolio" -- start
   pm2 save
   pm2 startup
   ```

5. **Configurer Nginx**
   ```nginx
   server {
       listen 80;
       server_name hermanvanel.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **SSL avec Let's Encrypt**
   ```bash
   sudo certbot --nginx -d hermanvanel.com
   ```

---

## Connecter le workflow n8n

Une fois le site déployé, pour activer l'automatisation :

### 1. Créer le workflow n8n

- Installer n8n (cloud ou self-hosted)
- Créer un workflow avec :
  - **Webhook node** : reçoit les requêtes
  - **HTTP Request node** : appelle l'API d'IA
  - **Response node** : retourne le résultat

### 2. Récupérer l'URL du webhook

Exemple : `https://your-n8n.app/webhook/abc123`

### 3. Créer l'API route Next.js

Créer `app/api/automation/route.ts` :

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de l\'automatisation' },
      { status: 500 }
    );
  }
}
```

### 4. Mettre à jour `Demo.tsx`

Décommenter le code de la vraie connexion (ligne ~30).

### 5. Ajouter la variable d'environnement

Sur Vercel/Netlify :
```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.app/webhook/abc123
```

---

## Partager le lien

Une fois déployé, tu peux partager le lien directement :

- Par email : "Voici mon portfolio : https://herman-vanel.vercel.app"
- Dans un CV PDF : ajouter le lien cliquable
- Sur LinkedIn : dans la bio ou les posts
- Dans les candidatures : remplacer le CV classique par le lien

---

## Maintenance

### Mettre à jour le site

1. Modifier les fichiers localement
2. Commit et push sur GitHub
3. Vercel/Netlify redéploie automatiquement

Ou manuellement :
```bash
npm run build
```
Puis redéployer.

### Surveiller les performances

- **Vercel Analytics** : performances en temps réel
- **Google PageSpeed Insights** : score de performance
- **Lighthouse** (Chrome DevTools) : audit complet

---

## Checklist avant déploiement

- [ ] Mettre à jour les informations de contact dans `Footer.tsx`
- [ ] Vérifier que tous les liens fonctionnent
- [ ] Tester sur mobile et desktop
- [ ] Ajouter des images dans `public/`
- [ ] Configurer les variables d'environnement si nécessaire
- [ ] Tester le formulaire d'automatisation
- [ ] Vérifier les métadonnées SEO dans `layout.tsx`
- [ ] Ajouter un favicon (placer `favicon.ico` dans `public/`)

---

## Support

En cas de problème :
1. Consulter les logs de build sur Vercel/Netlify
2. Vérifier la console du navigateur (F12)
3. Tester localement avec `npm run dev`

---

Bon déploiement ! 🚀
