# Portfolio Herman Vanel — guide pour Claude Code

## Projet
Site portfolio « CV du futur » de Herman Vanel. Stack **Next.js / React / TypeScript / Tailwind**, multilingue (FR / EN / ES / IT) via `i18n/` et `locales/`. Direction : futuriste, sobre, narratif. Pas encore déployé en ligne.

Branche principale : `master`.

## Lien avec le cerveau Obsidian de Herman

Ce projet est suivi en parallèle dans le **vault Obsidian** de Herman, synchronisé via **Obsidian Sync** sur ses 3 appareils (PC Windows, Mac, iPhone) et backupé sur GitHub à `git@github.com:hermanvanel-ui/cerveau-obsidian.git`.

**Sur Mac, le vault local est à** : `/Users/hermanvanel/Documents/Cerveau Herman/`

```
BRAIN_PATH="/Users/hermanvanel/Documents/Cerveau Herman"
```

**Note canonique de ce projet dans le cerveau** : `$BRAIN_PATH/Vault/Projets/Portfolio.md`

## Règle de fonctionnement

**Au début d'une session**, lis la note canonique pour comprendre l'état actuel (version en cours, derniers commits, décisions prises sur le design / contenu).

**Après toute décision structurante** (refonte d'une section, ajout d'une page, choix de stack, intégration n8n, mise à jour des infos perso/CV, déploiement, etc.), tu dois :

1. **Mettre à jour la note canonique** `$BRAIN_PATH/Vault/Projets/Portfolio.md` (statut, prochaines étapes, journal)
2. **Ajouter une ligne au journal du jour** : `$BRAIN_PATH/Vault/Journal/AAAA-MM-JJ.md` (créer si besoin)
3. **Créer une note dédiée** si le sujet est riche (ex. `Portfolio — Refonte timeline.md`, `Déploiement Vercel.md`)
4. **Propagation automatique** (pas de `git push` depuis Mac) :
   - Sur Mac, le dossier brain (`/Users/hermanvanel/Documents/Cerveau Herman/`) **n'est PAS un repo git** — c'est juste un dossier synchronisé par Obsidian Sync. Tes modifs y sont propagées automatiquement vers Windows + iPhone via Obsidian Sync (quelques secondes).
   - Côté **Windows**, le dossier brain vit à l'intérieur d'un repo git (`cerveau-obsidian`), et une **tâche planifiée Windows (19h et 22h)** fait le `git commit + push` automatique vers GitHub.
   - **N'essaie PAS `git add` / `commit` / `push` sur le cerveau depuis Mac** — ça échouera avec « not a git repository » et c'est inutile, la propagation se fait toute seule.
   - Si un push GitHub immédiat est nécessaire (sans attendre 19h/22h), Herman le déclenche depuis Windows.

## Bonnes pratiques
- Toujours lire les notes existantes avant d'éditer (cohérence avec ce qui a déjà été décidé)
- Format markdown standard, liens `[[...]]` Obsidian, dates `AAAA-MM-JJ`
- Si `$BRAIN_PATH` n'existe pas (Obsidian Sync pas configuré sur cette machine), tu attends et tu préviens Herman au lieu d'écrire.

## Setup rapide du projet

```bash
npm install
npm run dev
# → http://localhost:3000
```

Pour le déploiement : voir `DEPLOYMENT.md`.
