# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Vite + Vue 3 single-page app that displays a PDF magazine gallery for "Iglesia en Camino", the weekly bulletin of the Archidiócesis de Mérida-Badajoz. The app itself contains no issue content — it's a thin client that fetches an index of already-published issues from a remote server and renders cover thumbnails, download links, and a year/month archive browser.

## Commands

```bash
npm run dev        # vite dev server with hot reload (localhost:5173)
npm run build      # production build into dist/
npm run preview    # serve the production build (run build first)
npm run lint       # eslint over the project (also runs as precommit hook)
```

There is no test suite configured in this repository.

## Architecture

- **Single page app**: `src/App.vue` orchestrates everything; there is no router.
- **Data source (FROZEN CONTRACT — do not alter)**: on mount, the app fetches `https://www.meridabadajoz.net/iglesiaencamino/ic.json`. This JSON is a nested map of `{ year: { monthName: [issueId, ...] } }` ordered newest→oldest at every level, where `issueId` strings (`ic-NNNN-DDMMAA`) encode the issue number (`.slice(3, 7)`) and day (`.slice(8, 10)`), and are used to build asset URLs: `${base}/${issue}.png` (cover, 423×600) and `${base}/${issue}.pdf` (download). All of this lives in `src/composables/useIssues.js` — the only file that should know about the remote naming scheme. The API is stable and frozen; if something doesn't match it, fix the app, not the contract.
- **Year key ordering caveat**: JavaScript orders numeric-like object keys ascending regardless of JSON text order, so `Object.keys(items)` returns years oldest→newest; month keys (non-numeric) keep JSON insertion order (newest first). `useIssues.js` accounts for both.
- **Components** (`src/components/`): `AppHeader` (corporate masthead), `HeroIssue` (latest issue + CTAs), `ArchiveSection` (year/month pill navigation + cover grid, owns its own view state), `IssueCard`, `SubscribeDialog` (native `<dialog>`; POSTs `{ name, surname, email }` to `www.meridabadajoz.net/wp-json/newsletter/v1/subscribe`), `AppFooter`.
- **Old issues** (1996–2009) are served separately as static HTML at `iglesiaencamino.meridabadajoz.net/antiguos/index.html`, linked from the archive section and footer rather than integrated into this app.

## Design system

Colors and typography come from the official identity manual in `/datos/web/arzobispado/identidad corporativa/`:

- Burdeos profundo `#660033` (primary), oro litúrgico `#C4A84A` (accent), neutrals `#E4E1DD`/`#666666`, white.
- Typography: Libre Bodoni (web stand-in for the official Bauer Bodoni) for display, Alegreya for body text, Roboto/system stack for UI labels. Fonts are self-hosted via `@fontsource` packages imported in `src/main.js`.
- All tokens are CSS custom properties in `src/assets/styles/main.css`, with light and dark themes (`prefers-color-scheme`). Use tokens, never raw hex, in components.
- Corporate logos live in `src/assets/logo-*.svg` with `fill:currentColor` so they inherit color; they are inlined with `?raw` imports + `v-html`.

## Code style

- ESLint 9 flat config (`eslint.config.js`: vue/flat-recommended + prettier) and Prettier: single quotes, no semicolons (`.prettierrc.js`), 2-space indentation (`.editorconfig`).
- `engines` requires Node >= 22 (`.nvmrc` pins `lts/jod`; the user runs `nvm use lts/jod`). Vue 3 `<script setup>` SFCs throughout.
- use codegraph mcp to explore code
