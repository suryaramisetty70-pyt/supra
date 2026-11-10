# Supradeep — Studio Portfolio

A complete, standalone portfolio using React, TypeScript, Vite and Three.js. It follows the warm ivory Studio design selected in the conversation. All application code and the required visual assets are included.

## Run on your laptop

Install Node.js 22.13 or newer, then open a terminal inside this folder:

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. No API keys or environment variables are required.

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`. `npm run preview` is for checking the build locally.

## Upload to GitHub

1. Extract the ZIP.
2. Open the `supradeep-portfolio` folder.
3. Create an empty GitHub repository.
4. Upload the contents of this folder, including `src`, `public`, `index.html`, configuration files, `package.json`, and `package-lock.json`.
5. Do not upload `node_modules` or `dist`; these are generated locally and ignored by `.gitignore`.

Alternatively, from this folder:

```bash
git init
git add .
git commit -m "Add Studio portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL of your empty repository. A GitHub repository stores the code; publishing a website requires hosting configuration as a separate step.

## Hosting settings

For a static host that builds from GitHub:

- Install command: `npm ci`
- Build command: `npm run build`
- Publish/output directory: `dist`
- Node.js: 22.13 or newer

The Vite base is relative (`./`) and asset references use `import.meta.env.BASE_URL`, so the built site can also be served from a repository subdirectory. This is a static application with no backend service.

## Where to edit

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Name, biography, skills, projects, contact links and page sections |
| `src/workspace.tsx` | Procedural live Three.js room and fallback illustration |
| `src/styles.css` | Colours, typography, responsive layouts and animations |
| `public/studio-preview.webp` | Studio illustration for devices without WebGL |
| `public/saragadam-supradeep-resume.pdf` | Downloadable resume |
| `public/favicon.svg` | Browser icon |
| `index.html` | Page title, description and social metadata |

The content comes from the uploaded Saragadam Supradeep resume. Update it before publishing under another person's name.

## Included interactions

- A live Three.js workspace with furniture, plants, shadows, ambient animation and pointer response.
- An illustrated, animated fallback when WebGL is unavailable.
- A pause/play control and system reduced-motion support.
- Project category filters and accessible detail dialogs.
- Escape dismissal, focus restoration, and keyboard focus styles.
- Mobile navigation, scroll reveals, contact email links and email copying.
- Project repositories, professional profiles and resume download.

## Important implementation details

The live 3D room is procedural geometry. It is not the same asset as the photorealistic illustration fallback. The illustration was generated for this design and is included. The preview browser used during development disabled WebGL, so the live 3D rendering could not be visually verified there; fallback rendering and page interactions were checked instead.

The email link opens a visitor's email application. There is no backend contact form. Fonts load from Google Fonts, with local serif and sans-serif fallbacks if unavailable. There are no analytics, accounts or paid APIs.

## Validation

The standalone export passes the TypeScript check and Vite production build. Page interactions and desktop/mobile layouts were checked on the hosted version before export. Only the application entry point, build tooling, and portable asset paths changed for this download.
