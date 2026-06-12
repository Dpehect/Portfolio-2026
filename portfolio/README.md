# Portfolio (2025)

Personal portfolio site: project case studies, lightweight 3D and shader demos, bilingual copy (English and German).

Built with **Vue 3**, **TypeScript**, and **Vite**. Motion via **GSAP** and **Lenis**, 3D via **three.js**, audio via **Howler**. GLSL is compiled through **vite-plugin-glsl**.

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run dev`   | Dev server on port **3000** (`strictPort`) |
| `npm run build` | `vue-tsc` then production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Typecheck only (`vue-tsc -b`) |

## Content

- **Site data**: edit `src/content/site.json`. Profile text, social links, footer credits, music tracks, home boxes, translations, and projects are all configured there.
- **Project media / music**: JSON paths like `thumbnails/example.webp`, `images/projects/example/screen-0.webp`, or `music/example.ogg` resolve from `src/assets/`. Paths starting with `/` resolve from `public/`, so `/music/example.ogg` works too.
- **Localized copy**: `translations.en.common` is the fallback for English UI copy. You can edit `translations.de.common` for German text.
- **Tags**: built-in tag labels live in `src/components/tagVariants.ts`. Custom tag text in `site.json` still renders with the neutral tag style.

## Stack (high level)

- Vue 3 (`<script setup>`), SCSS with shared mixins (`src/assets/styles/`)
- i18n helpers under `src/i18n/`
- WebGL / GLSL under `src/three/` where applicable

## Credits & Attribution

This project was created and designed by David Heckhoff.

If you use this project or substantial parts of its source code as a base for your own portfolio or work, attribution must be preserved.

Please keep:

- existing credit comments in the source code
- this attribution section in the README
- a visible reference to the original project/repository in derivative works

Original portfolio:
-> https://david-hckh.com

Commercial reuse or redistribution of substantial portions of this project without permission is prohibited.
