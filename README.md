# Time Travel Agency

Vitrine immersive "Time Travel Agency" avec une expérience de chat propulsée par Mistral.

## Stack
- Front: Vite + React + TypeScript + Tailwind
- Backend local: Express (proxy vers l'API Mistral)

## Prérequis
- Node.js 18+
- npm

## Installation
```bash
npm install
```

## Variables d'environnement
Créer un fichier `.env` à la racine avec:
```
MISTRAL_API_KEY=your_key_here
```

Le front peut utiliser `VITE_API_URL` pour pointer vers l'API.
Exemple (local):
```
VITE_API_URL=http://localhost:5175
```

## Développement (front + api locale)
```bash
npm run start
```
- Front: http://localhost:5173
- API: http://localhost:5175

## Build
```bash
npm run build
```

## Preview
```bash
npm run preview
```

## Déploiement Vercel (résumé)
- Build command: `npm run build`
- Output directory: `dist`
- Variables: `MISTRAL_API_KEY` (obligatoire)
- Optionnel: `VITE_API_URL` si l'API n'est pas sur le même domaine

### API serverless (Vercel)
Les endpoints sont exposés via des fonctions serverless:
- `api/chat.mjs` (POST `/api/chat`)
- `api/health.mjs` (GET `/api/health`)

### SPA routing
Le projet utilise un rewrite SPA via `vercel.json` pour servir `index.html` sur toutes les routes.

## Structure
- `src/` UI principale
- `server/` API Express locale

## Scripts
- `npm run dev` : Vite
- `npm run server` : API Express
- `npm run start` : front + api en parallèle

## Licence
Projet interne / démo.
