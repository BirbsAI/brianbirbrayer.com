# brianbirbrayer.com

Personal résumé site for **Brian Birbrayer** ("Birbs"), Full Stack Developer.

## Stack
- **Next.js 15** (App Router) + **React 19**, **static export** (`output: "export"`): plain HTML/CSS/JS, no server
- **TypeScript** (strict) · **Tailwind CSS v4**
- Zero runtime UI dependencies. The command palette, theme toggle, and scroll reveal are hand-rolled.

## Features
- ⌘K / Ctrl+K command palette (keyboard navigable, ARIA listbox)
- Dark/light mode (system default, persisted, no flash)
- Subtle reveal animations, disabled under `prefers-reduced-motion`
- SEO: metadata, OpenGraph image (generated at build), JSON-LD `Person`, sitemap, robots
- Accessible: skip link, semantic landmarks, labelled sections, focus states
- Downloadable résumé at `/Brian-Birbrayer-Resume.pdf`

## Structure
```
src/content/site.ts        ← all content (edit this; TODOs live here)
src/app/page.tsx           ← page sections
src/app/layout.tsx         ← metadata, fonts, theme bootstrap, JSON-LD
src/app/opengraph-image.tsx, robots.ts, sitemap.ts, icon.svg
src/components/            ← CommandPalette, ThemeToggle, Reveal
public/                    ← résumé PDF
scripts/screenshots.mjs    ← headless screenshots → screenshots/
```

## Scripts
```bash
npm install
npm run dev         # http://localhost:3000
npm run lint        # ESLint (next/core-web-vitals + typescript)
npm run typecheck   # tsc --noEmit
npm run build       # static export → out/
npm run check       # all of the above
npm run screenshots # after build; needs Chrome (CHROME_PATH)
```

## Deploy (Vercel)
Import the repo in Vercel. Framework preset **Next.js** is auto-detected; the static export works with the defaults (build `npm run build`, no output override needed). Then add `brianbirbrayer.com` under Project → Domains.
