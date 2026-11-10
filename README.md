# Supradeep — Studio Portfolio

A responsive React, TypeScript, Vite and Three.js portfolio with a warm ivory design.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

The static website is generated in `dist/`.

## Render deployment

Create a **Static Site** connected to this repository, using:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Root directory | Leave empty |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Start command | Not required |

After updating this repository, deploy the latest commit. `npm run dev` is for local development.

## Project files

- `src/App.tsx`: page sections, projects, biography and contact links.
- `src/workspace.tsx`: procedural Three.js workspace and illustrated fallback.
- `src/styles.css`: responsive design and animations.
- `src/main.tsx`: application entry point.
- `public/studio-preview.webp`: original studio illustration.
- `public/favicon.svg`: browser icon.

The resume button opens an email request. A resume PDF is not published in this repository.

The live 3D room uses procedural geometry. Browsers without WebGL show an animated illustration instead. Reduced-motion preferences and animation pause are supported. No API keys or backend are required.

## Checks

The project passes TypeScript checking and the Vite production build. The development preview browser disables WebGL, so the live 3D scene could not be visually verified there; the illustration fallback and page interactions were checked.
