# 🚀 Guide de démarrage rapide

## En 3 étapes

### 1. Installer les dépendances

```bash
cd herman-portfolio
npm install
```

### 2. Lancer le serveur

```bash
npm run dev
```

### 3. Ouvrir le site

Ouvrir http://localhost:3000 dans votre navigateur.

---

## Commandes utiles

- `npm run dev` : lance le serveur de développement
- `npm run build` : génère la version production
- `npm run start` : lance la version production
- `npm run lint` : vérifie le code

---

## Personnalisation rapide

### Modifier les informations de contact

Ouvrir `components/Footer.tsx` et mettre à jour :
- Email
- LinkedIn
- GitHub

### Modifier les projets

Ouvrir `components/Projects.tsx` et modifier le tableau `projects`.

### Modifier la description

Ouvrir `components/Hero.tsx` et modifier les textes.

---

## Problèmes courants

### Le site ne démarre pas

1. Vérifier que Node.js est installé : `node -v`
2. Supprimer `node_modules` et réinstaller : `rm -rf node_modules && npm install`
3. Vérifier les permissions npm

### Les styles ne s'affichent pas

1. Vérifier que Tailwind est bien installé : `npm list tailwindcss`
2. Redémarrer le serveur : Ctrl+C puis `npm run dev`

---

Pour plus de détails, consulter le [README.md](./README.md) complet.
