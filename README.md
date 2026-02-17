# Avenor — Web Development Services Site

A conversion-focused marketing site for a web development services business. Built to showcase services, pricing, portfolio, and generate leads.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS v4** (with `@tailwindcss/vite`)
- **Framer Motion** — scroll-triggered and hover animations
- **Embla Carousel** — testimonials carousel
- **React Router** — client-side routing

## Motion & animation

- **Framer Motion** — `framer-motion` (latest) for all animations
- **Scroll progress** — Top-of-page progress bar tied to scroll (`useScroll` + `useSpring`)
- **Scroll reveal** — Sections animate in with variants: `fadeUp`, `fadeIn`, `scaleIn`, `slideLeft`, `slideRight`
- **Stagger lists** — `StaggerList` + `StaggerItem` for staggered children (e.g. service cards, process steps, stats)
- **Hover effects** — Cards (lift + border/glow), nav links (lift + underline), footer links (slide), CTA buttons (scale + glow)
- **AnimatedButton** — Primary/secondary/ghost CTAs with `whileHover` and `whileTap` (scale, glow)
- **Carousel** — Embla Carousel with auto-advance; prev/next buttons use Framer Motion hover/tap
- **Section images** — Slight scale on hover for hero and section images
- Smooth scroll (CSS), spring-based transitions, and `viewport={{ once: true }}` for one-time reveals

## Design

- Dark theme with deep blue gradients and electric blue accents
- Glassmorphism (frosted glass) on cards and header
- Syne (display) + DM Sans (body) typography
- Smooth scroll, scroll-reveal sections, and hover effects

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional: preview dist/
```

## Pages

- **Home** — Hero, services preview, proof stats, process, testimonials carousel, CTA
- **Services** — Types of websites (portfolio, e‑commerce, SaaS, landing, enterprise) + industries
- **Portfolio** — Project grid (placeholder cards)
- **Pricing** — Basic / Professional / Premium tiers + add-ons
- **About** — Positioning, audience, differentiation
- **Contact** — Inquiry form (submit shows thank-you state)
- **Case Studies** — Placeholder list
- **FAQ** — Accordion

All content and structure follow the strategy in the project root `Readme.md`.
