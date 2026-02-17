# Pre-launch checklist: Avenor

Use this list before deploying live. It’s based on common production, security, legal, and SEO norms ([OWASP](https://owasp.org/www-project-top-ten/), [GDPR/CCPA](https://gdpr.eu/), [launch checklists](https://docs.netlify.com/resources/checklists/production-checklist)).

---

## 1. Security (OWASP-aligned)

| Item | Status | Notes |
|------|--------|--------|
| HTTPS only in production | ⬜ | Enforce in host (Vercel/Netlify/CF). No sensitive data over HTTP. |
| No secrets in frontend | ✅ | Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; service role never in client. |
| Parameterized queries / no raw SQL | ✅ | Supabase client only; no SQL injection from app. |
| Input validation & length limits | ✅ | Contact form sanitized and constrained; DB constraints on `contact_submissions`. |
| RLS: no client read of contact data | ✅ | Only service role can read submissions. |
| Sensitive data not in localStorage/sessionStorage | ✅ | No auth tokens or PII stored there. |
| Dependencies up to date | ⬜ | Run `npm audit` and fix critical/high; update packages periodically. |
| No verbose errors in production | ⬜ | Avoid exposing stack traces or internal paths to users; use generic messages. |

---

## 2. Legal & business (required for a selling site)

| Item | Status | Notes |
|------|--------|--------|
| **Privacy Policy** | ⬜ | **Required** if you collect any personal data (contact form, analytics). Must state: what you collect, why, how long you keep it, who you share with, and user rights (access, deletion). Needed for GDPR (EU), CCPA (California), and similar laws. Add a `/privacy` page and link in footer. |
| **Terms of Service** | ⬜ | Strongly recommended. Covers liability, acceptable use, governing law, dispute resolution. Add `/terms` and link in footer. |
| **Cookie / tracking notice** | ⬜ | If you add analytics or marketing cookies, you need a consent banner (e.g. [CookieYes](https://www.cookieyes.com/), [Osano](https://www.osano.com/), or custom) and a short cookie policy. |
| **Contact / business info in footer** | ✅ | Email (avenordevs@gmail.com) and brand are present. Add physical address/company details if you’re a registered business (e.g. UK/EU requirements). |

---

## 3. SEO & discoverability

| Item | Status | Notes |
|------|--------|--------|
| Single meta title & description | ✅ | In `index.html`. Good for homepage. |
| **Per-route meta (title/description)** | ⬜ | Each page (Services, Pricing, Contact, etc.) should have its own `<title>` and `meta name="description"`. Use [react-helmet-async](https://github.com/staylor/react-helmet-async) or similar. |
| **Open Graph tags** | ⬜ | `og:title`, `og:description`, `og:image`, `og:url` for better link previews (e.g. LinkedIn, Twitter). |
| **robots.txt** | ⬜ | In `public/robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap: https://yourdomain.com/sitemap.xml`. |
| **sitemap.xml** | ⬜ | List all public URLs (/, /services, /pricing, /contact, /about, /portfolio, /case-studies, /faq) so search engines can discover them. Can be static in `public/` or generated at build. |
| **Structured data (JSON-LD)** | ⬜ | Optional but useful: `Organization` or `LocalBusiness` schema for rich results. |
| Image `alt` attributes | ⬜ | Audit images; ensure all have meaningful `alt` for accessibility and SEO. |

---

## 4. Performance & UX

| Item | Status | Notes |
|------|--------|--------|
| Build succeeds | ✅ | `npm run build` (and no heavy errors in console). |
| Core Web Vitals | ⬜ | Check with Lighthouse (Chrome DevTools). Aim for good LCP, FID/INP, CLS. |
| Image optimization | ⬜ | External images (Unsplash) are already CDN; consider lazy loading and sizes if you add many large images. |
| 404 / error page | ⬜ | React Router: add a catch-all route and a friendly “Page not found” component. |
| **Error boundary** | ⬜ | React Error Boundary so a single component crash doesn’t blank the whole app; show a generic “Something went wrong” and optionally a way to retry. |

---

## 5. Analytics & monitoring (optional but recommended)

| Item | Status | Notes |
|------|--------|--------|
| Analytics | ⬜ | e.g. Google Analytics 4, Plausible, or Fathom. If you use cookies/tracking, implement cookie consent first. |
| Error monitoring | ⬜ | e.g. Sentry, LogRocket. Capture JS errors in production to fix issues quickly. |
| Uptime / health | ⬜ | Optional: simple uptime check (e.g. UptimeRobot) on your live URL. |

---

## 6. Deployment & operations

| Item | Status | Notes |
|------|--------|--------|
| Env in production | ⬜ | Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the host’s environment (not only in local `.env`). |
| Custom domain + HTTPS | ⬜ | See `DEPLOY.md`. DNS → host; HTTPS is usually automatic. |
| SPA fallback | ⬜ | All routes serve `index.html` so `/pricing`, `/contact`, etc. don’t 404 on direct load or refresh. (Vercel/Netlify/CF handle this with correct config.) |
| Backups | ⬜ | Supabase has point-in-time recovery on paid plans; know how to restore. Export contact submissions periodically if you need your own copy. |

---

## 7. Selling point / conversion (business flow)

| Item | Status | Notes |
|------|--------|--------|
| Clear value proposition | ✅ | Hero and copy explain what you offer. |
| Contact / CTA visible | ✅ | Header CTA, contact page, CTAs on Pricing. |
| Trust signals | ⬜ | Consider: short testimonials, client logos, “As seen in” or certifications if you have them. |
| Social proof | ✅ | Testimonials carousel on Home. |
| Clear next step after form | ✅ | Success message after contact submit. |
| Mobile-friendly | ✅ | Responsive layout. Quick pass on real devices before launch. |

---

## 8. Developer / code quality

| Item | Status | Notes |
|------|--------|--------|
| TypeScript | ✅ | In use. |
| Linting | ⬜ | Consider ESLint + a strict config; run in CI if you add it. |
| Env example | ✅ | `.env.example` documents required env vars. |
| README / deploy docs | ✅ | `DEPLOY.md` and project docs. |
| No debug logs in production | ⬜ | Avoid `console.log` of sensitive or noisy data; strip or guard if needed. |

---

## Suggested order before “go live”

1. **Must-have:** Privacy Policy (and Terms if you want full protection), then cookie consent if you add analytics/tracking.
2. **Must-have:** `robots.txt` and `sitemap.xml` in `public/`.
3. **Strongly recommended:** Per-route meta tags (title/description) and one Error Boundary.
4. **Strongly recommended:** 404 page and production env vars on the host.
5. **Nice-to-have:** Open Graph tags, JSON-LD, analytics (with consent), error monitoring.

Once these are in place, you’re in a good position to deploy and point the custom domain.
