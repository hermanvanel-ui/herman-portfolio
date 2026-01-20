# 🎨 Guide de personnalisation

Ce guide t'aide à personnaliser le portfolio selon tes besoins.

---

## 1. Informations personnelles

### Modifier les informations de contact

**Fichier** : `components/Footer.tsx`

```tsx
// Remplacer par tes vraies informations
<a href="mailto:herman.vanel@example.com">
  📧 Email
</a>
<a href="https://linkedin.com/in/hermanvanel">
  💼 LinkedIn
</a>
<a href="https://github.com/hermanvanel">
  🔧 GitHub
</a>
```

### Modifier les métadonnées (SEO)

**Fichier** : `app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: "Herman Vanel - Construire le futur",
  description: "Portfolio futuriste d'Herman Vanel - Automatisation, systèmes, et vision technologique",
  keywords: ["développeur", "automatisation", "IA", "systèmes", "n8n", "bots"],
};
```

---

## 2. Textes et contenu

### Section Hero (Accueil)

**Fichier** : `components/Hero.tsx`

Modifier :
- Le titre principal (ligne 13)
- La phrase fondatrice (ligne 18)
- La présentation courte (lignes 23-31)

### Section Projets

**Fichier** : `components/Projects.tsx`

Modifier le tableau `projects` (ligne 3) :

```tsx
const projects = [
  {
    title: "Ton projet",
    subtitle: "Une description courte",
    description: "Description détaillée...",
    tags: ["Tag1", "Tag2", "Tag3"],
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
  },
  // Ajouter ou supprimer des projets ici
];
```

### Section Compétences

**Fichier** : `components/Skills.tsx`

Modifier le tableau `learnings` (ligne 3) :

```tsx
const learnings = [
  {
    icon: "⚙️",
    title: "Ta compétence",
    description: "Description de la compétence...",
  },
  // Ajouter ou supprimer des compétences ici
];
```

Modifier la section parcours (lignes 80-95) selon ton expérience.

### Section Vision

**Fichier** : `components/Vision.tsx`

Modifier tout le texte de vision selon tes objectifs personnels.

---

## 3. Design et couleurs

### Changer la palette de couleurs

**Fichier** : `tailwind.config.ts`

Actuellement : Cyan/Bleu

Pour changer en Vert/Émeraude :
```tsx
// Remplacer toutes les occurrences de :
from-cyan-400 to-blue-400
// Par :
from-emerald-400 to-green-400
```

Chercher et remplacer dans tous les fichiers :
- `cyan` → `emerald` (ou autre couleur Tailwind)
- `blue` → `green` (ou autre couleur)

### Changer les animations

**Fichier** : `tailwind.config.ts`

Modifier les keyframes (lignes 16-27) pour créer de nouvelles animations.

Exemple :
```tsx
keyframes: {
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
},
```

### Modifier le fond

**Fichier** : `app/globals.css`

```css
:root {
  --background: #0a0a0a; /* Noir */
  --foreground: #ededed; /* Gris clair */
}
```

Pour un fond bleu foncé :
```css
:root {
  --background: #0f172a;
  --foreground: #f1f5f9;
}
```

---

## 4. Ajouter des images

### Ajouter une image à un projet

1. **Placer l'image dans `public/`**
   ```
   public/
   └── projects/
       └── mon-projet.png
   ```

2. **Importer et utiliser dans le composant**
   ```tsx
   import Image from 'next/image';

   <Image
     src="/projects/mon-projet.png"
     alt="Mon projet"
     width={500}
     height={300}
     className="rounded-lg"
   />
   ```

### Ajouter un favicon

1. Créer ou télécharger un favicon (16x16 ou 32x32 px)
2. Le nommer `favicon.ico`
3. Le placer dans `public/`
4. Next.js le détecte automatiquement

### Ajouter une image de fond à une section

```tsx
<section
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/background.jpg)' }}
>
  {/* Contenu */}
</section>
```

---

## 5. Ajouter des sections

### Créer une nouvelle section

1. **Créer un nouveau composant**
   ```bash
   components/NewSection.tsx
   ```

2. **Structurer le composant**
   ```tsx
   "use client";

   export default function NewSection() {
     return (
       <section id="new-section" className="min-h-screen py-20 px-6">
         <div className="max-w-6xl mx-auto">
           <h2 className="text-4xl font-bold text-cyan-300">
             Nouveau titre
           </h2>
           <p>Contenu...</p>
         </div>
       </section>
     );
   }
   ```

3. **Ajouter dans `app/page.tsx`**
   ```tsx
   import NewSection from "@/components/NewSection";

   <NewSection />
   ```

4. **Ajouter dans la navigation**
   ```tsx
   // components/Navigation.tsx
   const navItems = [
     // ...
     { label: "Nouveau", href: "#new-section" },
   ];
   ```

---

## 6. Modifier le responsive

Tailwind utilise des breakpoints :
- `md:` → tablette (768px+)
- `lg:` → desktop (1024px+)

Exemple :
```tsx
<div className="
  text-sm md:text-base lg:text-lg
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  {/* Contenu */}
</div>
```

---

## 7. Ajouter des fonctionnalités

### Ajouter Google Analytics

1. **Installer le package**
   ```bash
   npm install @next/third-parties
   ```

2. **Ajouter dans `layout.tsx`**
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'

   <GoogleAnalytics gaId="G-XXXXXXXXXX" />
   ```

### Ajouter un formulaire de contact

1. **Créer une API route**
   ```tsx
   // app/api/contact/route.ts
   export async function POST(request: Request) {
     const { name, email, message } = await request.json();
     // Envoyer l'email avec Resend, SendGrid, etc.
   }
   ```

2. **Créer un composant formulaire**
   ```tsx
   // components/ContactForm.tsx
   const handleSubmit = async (e) => {
     const response = await fetch('/api/contact', {
       method: 'POST',
       body: JSON.stringify({ name, email, message }),
     });
   };
   ```

---

## 8. Optimisations

### Améliorer les performances

1. **Optimiser les images**
   - Utiliser le composant `<Image />` de Next.js
   - Convertir en WebP

2. **Lazy loading**
   ```tsx
   import dynamic from 'next/dynamic';

   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Chargement...</p>,
   });
   ```

3. **Fonts locales**
   - Télécharger les fonts
   - Les placer dans `public/fonts/`
   - Les charger dans `globals.css`

---

## 9. Multilingue (optionnel)

Pour ajouter une version anglaise :

1. **Installer i18n**
   ```bash
   npm install next-intl
   ```

2. **Créer les traductions**
   ```
   locales/
   ├── fr.json
   └── en.json
   ```

3. **Configurer Next.js**
   Suivre la documentation : https://next-intl-docs.vercel.app

---

## 10. Mode clair/sombre (optionnel)

1. **Installer next-themes**
   ```bash
   npm install next-themes
   ```

2. **Configurer Tailwind pour le dark mode**
   ```tsx
   // tailwind.config.ts
   module.exports = {
     darkMode: 'class',
     // ...
   };
   ```

3. **Ajouter un toggle**
   ```tsx
   import { useTheme } from 'next-themes';

   const { theme, setTheme } = useTheme();

   <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
     Toggle
   </button>
   ```

---

## Besoin d'aide ?

- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation Tailwind** : https://tailwindcss.com/docs
- **Documentation TypeScript** : https://www.typescriptlang.org/docs

---

Amuse-toi bien avec les personnalisations ! 🎨
