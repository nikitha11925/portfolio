# Nikitha D — Portfolio

A personal portfolio with a "Dark Artisan" aesthetic: near-black, warm gold accents,
an interactive Canvas **aura** in the hero, RPG-style stat cards, and per-project
case studies. Built to be the portfolio *and* the proof.

## Tech

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens as CSS variables)
- **Framer Motion** — scroll reveals, hero load sequence, hover interactions
- **HTML5 Canvas** — the signature aura (hand-written, no library)
- **Fonts** via `next/font`: Instrument Serif (display), Space Grotesk (body), Space Mono (terminal)
- **Lucide React** — icons
- Deploy target: **Vercel**

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Optional: copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_SITE_URL`
(used for metadata, Open Graph, sitemap & robots).

## Where the content lives

**Everything editable is in [`data/portfolio.ts`](./data/portfolio.ts)** — projects,
case studies, skills, achievements, contact, hobbies. No need to touch components.

## TODO / placeholders to fill in

Anything still set to `YOUR_...` or `#` shows up in the UI as a gold **`[add link]`**
badge. Replace these in `data/portfolio.ts`:

- [ ] CircleUp — live URL + GitHub URL
- [ ] PulseGate — live URL + GitHub URL
- [ ] MediTrak — live URL + GitHub URL
- [ ] ParadeCast — live URL + GitHub URL
- [ ] Research paper link / DOI
- [ ] LinkedIn URL
- [ ] GitHub profile URL
- [ ] Pixel-art avatar — swap the placeholder in [`components/PixelAvatar.tsx`](./components/PixelAvatar.tsx)
- [ ] Project screenshots — drop into `/public` and reference in each case study (`data/portfolio.ts`)
- [ ] Verify the CircleUp results metric (`[add metric]` in `data/portfolio.ts`)

## Deploy to Vercel

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) — it
auto-detects Next.js. Set `NEXT_PUBLIC_SITE_URL` to your final domain in project settings.
