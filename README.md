# Herman Vanel - Portfolio Futuriste

> Un CV du futur : vivant, testable, évolutif.

Ce n'est pas un simple portfolio. C'est une démonstration concrète de compétences en automatisation, développement web, et pensée système.

---

## 🚀 Vision

Ce site remplace un CV classique. Il démontre :
- **Automatisation** : intégration de workflows n8n
- **Vision technologique** : design futuriste, sobre, narratif
- **Compétences concrètes** : Next.js, TypeScript, Tailwind CSS, APIs, webhooks
- **Storytelling** : un parcours clair, une vision assumée

---

## 📁 Structure du projet

```
herman-portfolio/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx             # Page d'accueil (toutes les sections)
│   └── globals.css          # Styles globaux
├── components/
│   ├── Navigation.tsx       # Barre de navigation
│   ├── Hero.tsx             # Section 1 : Accueil
│   ├── CurrentStatus.tsx    # Section 2 : Où j'en suis aujourd'hui ⭐ NOUVEAU
│   ├── Timeline.tsx         # Section 3 : Frise chronologique du parcours ⭐ NOUVEAU
│   ├── Projects.tsx         # Section 4 : Projets
│   ├── Skills.tsx           # Section 5 : Compétences
│   ├── Vision.tsx           # Section 6 : Vision future
│   ├── Demo.tsx             # Section 7 : CTA + Automatisation
│   └── Footer.tsx           # Footer
├── public/                  # Assets statiques (images, etc.)
├── tailwind.config.ts       # Configuration Tailwind
├── tsconfig.json            # Configuration TypeScript
├── package.json             # Dépendances
├── README.md                # Ce fichier
└── CHANGELOG.md             # Historique des modifications ⭐ NOUVEAU
```

---

## 🛠️ Installation et lancement

### Prérequis

- **Node.js** : version 18 ou supérieure
- **npm** ou **yarn**

### Étapes

1. **Naviguer dans le dossier du projet** :
   ```bash
   cd herman-portfolio
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Ouvrir le site dans le navigateur** :
   ```
   http://localhost:3000
   ```

Le site se recharge automatiquement à chaque modification.

---

## 🌐 Déploiement

### Option 1 : Vercel (recommandé)

Vercel est la plateforme officielle de Next.js. Déploiement en un clic.

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Importer le projet depuis GitHub (ou uploader le dossier)
3. Vercel détecte automatiquement Next.js et configure tout
4. Le site est en ligne en quelques secondes

**Lien partageable** : tu obtiendras une URL publique (ex: `https://herman-vanel.vercel.app`)

### Option 2 : Netlify

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier du projet
3. Configurer la commande de build : `npm run build`
4. Le site est déployé

### Option 3 : Build statique

Pour générer une version statique :
```bash
npm run build
npm run start
```

---

## 🔗 Connexion au workflow n8n (automatisation)

### Architecture cible

Le formulaire "Testez mon automatisation" est prêt à être connecté à un workflow n8n :

1. **Webhook n8n** : reçoit les requêtes depuis le site
2. **API IA** : génère une image (DALL-E, Stable Diffusion, etc.)
3. **Retour au site** : affiche l'image générée

### Étapes pour connecter

#### 1. Créer un workflow n8n

- Installer n8n (self-hosted ou cloud)
- Créer un nouveau workflow avec :
  - **Node Webhook** : écoute les POST requests
  - **Node HTTP Request** : appel à une API d'IA
  - **Node Respond to Webhook** : renvoie le résultat

#### 2. Créer une API route dans Next.js

Créer le fichier `app/api/automation/route.ts` :

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    // Appel au webhook n8n
    const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
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

#### 3. Mettre à jour `components/Demo.tsx`

Décommenter le code de la vraie connexion (ligne ~30) et remplacer l'URL du webhook.

---

## 🎨 Personnalisation

### Modifier les textes

Tous les textes sont dans les composants :
- `components/Hero.tsx` : texte d'accueil
- `components/Projects.tsx` : liste des projets
- `components/Skills.tsx` : compétences et parcours
- `components/Vision.tsx` : vision future
- `components/Footer.tsx` : liens de contact

### Modifier les couleurs

Les couleurs principales sont définies dans :
- `app/globals.css` : couleurs CSS variables
- `tailwind.config.ts` : configuration Tailwind

Couleurs actuelles :
- **Cyan/Bleu** : accent principal
- **Noir** : fond
- **Gris** : textes secondaires

### Ajouter des images

Placer les images dans le dossier `public/` :
```
public/
├── projects/
│   ├── trading.png
│   ├── automation.png
│   └── bots.png
```

Puis les importer dans les composants :
```tsx
import Image from 'next/image';

<Image src="/projects/trading.png" alt="Trading" width={500} height={300} />
```

---

## 📱 Responsive

Le site est **100% responsive** :
- **Mobile** : menu hamburger, sections empilées
- **Tablet** : grille à 2 colonnes
- **Desktop** : grille à 3 colonnes, animations complètes

Tailwind utilise les breakpoints :
- `md:` → tablette (768px+)
- `lg:` → desktop (1024px+)

---

## 🧩 Évolutions possibles

Ce site est conçu pour évoluer. Idées d'améliorations :

1. **Analytics** : ajouter Google Analytics ou Plausible
2. **Blog** : créer une section blog avec Markdown
3. **Projets détaillés** : pages individuelles pour chaque projet
4. **Animations avancées** : utiliser Framer Motion
5. **Mode clair** : ajouter un toggle dark/light mode
6. **Multilingue** : français / anglais
7. **API publique** : exposer certaines automatisations via API

---

## 🔧 Dépendances principales

- **Next.js 15** : framework React
- **React 19** : bibliothèque UI
- **TypeScript** : typage statique
- **Tailwind CSS 3** : styles utilitaires
- **PostCSS** : traitement CSS

---

## 📄 Licence

Ce projet est personnel et sert de portfolio.
Libre de t'en inspirer, mais ne copie pas directement.

---

## 📧 Contact

- **Email** : herman.vanel@example.com (à mettre à jour)
- **LinkedIn** : [linkedin.com/in/hermanvanel](https://linkedin.com) (à mettre à jour)
- **GitHub** : [github.com/hermanvanel](https://github.com) (à mettre à jour)

---

## 🎯 Conclusion

Ce site n'est pas juste un portfolio.
**C'est une preuve de concept.**
**C'est une vision.**
**C'est un futur en construction.**

Aujourd'hui, je construis mon avenir.

---

*Herman Vanel - 2025*
