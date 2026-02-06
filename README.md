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
- Variables: `MISTRAL_API_KEY` (+ éventuellement `VITE_API_URL`)
- Pour API sur Vercel, préférer des fonctions serverless dans `api/`.

## Structure
- `src/` UI principale
- `server/` API Express locale

## Scripts
- `npm run dev` : Vite
- `npm run server` : API Express
- `npm run start` : front + api en parallèle

## Licence
Projet interne / démo.
