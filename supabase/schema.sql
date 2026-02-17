-- Run this in Supabase: SQL Editor → New query → paste → Run

-- Contact form submissions (only inserts from anonymous users; read via Dashboard or service role)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy "Allow anonymous insert"
  on public.contact_submissions for insert
  to anon with check (true);

create policy "No public read"
  on public.contact_submissions for select
  to anon using (false);

create policy "Authenticated read"
  on public.contact_submissions for select
  to authenticated using (true);

-- Services (public read; manage in Dashboard or with service role)
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text,
  features jsonb not null default '[]',
  ideal text,
  tier text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "Public can read services"
  on public.services for select
  to anon using (true);

create policy "Authenticated can manage services"
  on public.services for all
  to authenticated using (true) with check (true);

-- Optional: seed current services (run once)
insert into public.services (slug, title, short_description, features, ideal, tier, sort_order)
values
  ('websites', 'Portfolio & Business Websites', 'Fast, responsive sites that convert.', '["Responsive design", "CMS optional", "Contact forms", "SEO basics"]'::jsonb, 'Freelancers, creatives, small businesses', 'Basic – Premium', 1),
  ('ecommerce', 'E‑commerce & Stores', 'Stores and platforms that scale.', '["Checkout & payments", "Inventory", "Shipping", "Admin dashboard"]'::jsonb, 'Brands, retailers, D2C', 'Professional – Enterprise', 2),
  ('saas', 'SaaS & Web Apps', 'Product-grade web applications.', '["Auth & roles", "Dashboards", "API integration", "Real-time features"]'::jsonb, 'Startups, product companies', 'Premium – Enterprise', 3),
  ('landing', 'Landing Pages', 'Memorable first impressions.', '["High-conversion layout", "Forms & CTAs", "A/B ready", "Fast load"]'::jsonb, 'Campaigns, launches, lead gen', 'Basic – Professional', 4),
  ('enterprise', 'Custom Enterprise Solutions', null, '["Custom workflows", "Integrations", "Security & compliance", "Scalability"]'::jsonb, 'Large orgs, regulated industries', 'Enterprise', 5)
on conflict (slug) do nothing;
