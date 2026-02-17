-- Run in Supabase: SQL Editor → New query → paste → Run (once)
-- Pricing tiers and add-ons: public read; manage in Dashboard or with service role.

-- Pricing tiers (main packages)
create table if not exists public.pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price text not null,
  description text,
  features jsonb not null default '[]',
  cta_text text not null default 'Get quote',
  highlighted boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.pricing_tiers enable row level security;

create policy "Public can read pricing_tiers"
  on public.pricing_tiers for select to anon using (true);

create policy "Authenticated can manage pricing_tiers"
  on public.pricing_tiers for all to authenticated using (true) with check (true);

-- Pricing add-ons
create table if not exists public.pricing_addons (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.pricing_addons enable row level security;

create policy "Public can read pricing_addons"
  on public.pricing_addons for select to anon using (true);

create policy "Authenticated can manage pricing_addons"
  on public.pricing_addons for all to authenticated using (true) with check (true);

-- Seed tiers (idempotent: re-run won't duplicate)
insert into public.pricing_tiers (name, price, description, features, cta_text, highlighted, sort_order)
values
  ('Basic', '$250', 'Landing pages, simple sites, personal branding', '["Up to 5 pages", "Responsive design", "Contact form", "SEO basics", "1 round of revisions"]'::jsonb, 'Get quote', false, 1),
  ('Professional', '$750', 'Business sites, small e‑commerce, blogs', '["Up to 15 pages", "CMS integration", "Analytics", "3 rounds of revisions", "1 month support"]'::jsonb, 'Get quote', true, 2),
  ('Premium', '$1,500', 'SaaS, custom web apps, advanced e‑commerce', '["Custom scope", "Auth & dashboards", "API integrations", "Ongoing support options", "Dedicated contact"]'::jsonb, 'Get quote', false, 3)
on conflict (name) do nothing;

insert into public.pricing_addons (name, price, sort_order)
values
  ('SEO audit & setup', '$300 – $800', 1),
  ('Copywriting', 'From $500', 2),
  ('Analytics & tracking', '$200 – $500', 3),
  ('Maintenance (monthly)', 'From $150/mo', 4),
  ('Hosting & support', 'From $50/mo', 5)
on conflict (name) do nothing;
