# Ocean Luxe Estates — Website

The public business website for Ocean Luxe Estates (oceanluxe.org). A single-page React 19 + Vite
app covering Buy, Invest, Sell, Markets, About, and Ocean Luxe Notary services, with an AI concierge
widget (`components/Concierge.tsx`) and AI-assisted imagery (`components/AiImage.tsx`) powered by
Google Gemini.

## Run locally

Prerequisites: Node.js (18+).

1. Install dependencies: `npm install`
2. Set your Gemini key in a local env file, e.g. `.env.local` with `GEMINI_API_KEY=<key>`
   (consumed via `vite.config.ts` → `process.env.GEMINI_API_KEY`).
3. Start the dev server: `npm run dev` (serves on port 3000).

## Build

`npm run build` — outputs a static site to `dist/`, ready for static hosting (Vercel, Netlify, etc.).
Preview the production build with `npm run preview`.

## Notes

- Styling uses the Tailwind CDN (configured inline in `index.html`); no Tailwind build step.
- Brand tokens: near-black backgrounds (#000000 / #121212), metallic gold accent (#D4AF37),
  Playfair Display serif headings.
- `public/privacy.html` and `public/terms.html` are placeholders until final legal copy is prepared.
