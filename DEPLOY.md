# Deploy Avenor and use a custom domain

## 1. Build the app

From the `web` folder:

```bash
npm run build
```

Output goes to **`dist/`**. The app is a static SPA (React + Vite); any host that serves static files and supports client-side routing can serve it.

---

## 2. Deploy to a host

Use one of these (or any static host).

### Vercel (recommended)

1. Push your code to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your repo.
3. **Root Directory:** set to `web` if the repo root is the monorepo root (e.g. `Avenor`), or leave blank if the repo is only the `web` app.
4. **Build Command:** `npm run build` (or `cd web && npm run build` if root is repo root).
5. **Output Directory:** `dist`.
6. **Environment variables:** add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (same values as in your local `.env`). Redeploy after adding them.
7. Deploy. You’ll get a URL like `avenor-xxx.vercel.app`.

### Netlify

1. Push code to Git, then [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
2. **Build command:** `npm run build` (or `cd web && npm run build`).
3. **Publish directory:** `dist`.
4. Add **Environment variables** in Site settings → Environment: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
5. Deploy. You’ll get a URL like `random-name.netlify.app`.

### Cloudflare Pages

1. Connect your Git repo at [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **Create project** → **Connect to Git**.
2. **Build command:** `npm run build` (or `cd web && npm run build`).
3. **Build output directory:** `dist`.
4. **Environment variables:** add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the project’s Settings.
5. Deploy. You’ll get a URL like `avenor.pages.dev`.

---

## 3. Custom domain and go live

### Add the domain in your host

- **Vercel:** Project → **Settings** → **Domains** → **Add** → enter e.g. `avenor.com` or `www.avenor.com`.
- **Netlify:** Site → **Domain management** → **Add custom domain**.
- **Cloudflare Pages:** Project → **Custom domains** → **Set up a custom domain**.

The host will show exactly which DNS records to create (usually a **CNAME** or **A** record).

### Point DNS to the host

In your **domain registrar** (or DNS provider) add the record the host asks for. Examples:

| Host     | Record type | Name  | Value / Target                    |
|----------|-------------|--------|-----------------------------------|
| Vercel   | CNAME       | `www`  | `cname.vercel-dns.com`            |
| Vercel   | A           | `@`    | `76.76.21.21` (for apex)          |
| Netlify  | CNAME       | `www`  | `apex-loadbalancer.netlify.com` or your site’s Netlify URL |
| CF Pages | CNAME       | `www`  | `your-project.pages.dev`          |

- **Apex (root) domain** (e.g. `avenor.com`): use the A record or ALIAS/ANAME if your host supports it; otherwise use the host’s “apex” instructions.
- **www** (e.g. `www.avenor.com`): usually CNAME to the host’s target.

DNS can take from a few minutes up to 48 hours to propagate.

### HTTPS

Vercel, Netlify, and Cloudflare Pages issue **SSL certificates automatically** once the domain is pointed correctly. Force HTTPS in the host’s settings if available.

### SPA routing

All hosts above can be set to serve `index.html` for every path so client-side routes (e.g. `/contact`, `/pricing`) work. Usually this is the default for “SPA” or “single-page app” projects. If a path returns 404, enable “rewrite all routes to `/index.html`” (or the equivalent) in the host’s docs.

---

## 4. Checklist before going live

- [ ] **Supabase:** Schema and RLS applied; `contact_submissions` and other tables working.
- [ ] **Env in production:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set in the host’s environment (not only in local `.env`).
- [ ] **Build:** `npm run build` runs without errors.
- [ ] **Custom domain:** Added in the host and DNS points to the host; HTTPS works.
- [ ] **Test:** Submit the contact form and open Pricing/Services; confirm data comes from Supabase.

After that, the site is live on your custom domain.
