-- Run in Supabase: SQL Editor → New query → paste → Run (run once)
-- Ensures no user can see another user's contact submissions; only you (Dashboard/service role) can read.

-- 1) Remove any client-side read access to contact_submissions
--    (anon and authenticated can no longer SELECT; only service role / Dashboard can)
drop policy if exists "Authenticated read" on public.contact_submissions;

-- 2) Limit payload size to prevent abuse and oversized data (skip if you already ran this and see "already exists")
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'contact_submissions_name_length') then
    alter table public.contact_submissions add constraint contact_submissions_name_length check (char_length(name) <= 500);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_submissions_email_length') then
    alter table public.contact_submissions add constraint contact_submissions_email_length check (char_length(email) <= 320);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_submissions_message_length') then
    alter table public.contact_submissions add constraint contact_submissions_message_length check (char_length(message) <= 10000);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'contact_submissions_project_type_length') then
    alter table public.contact_submissions add constraint contact_submissions_project_type_length check (project_type is null or char_length(project_type) <= 100);
  end if;
end $$;

-- 3) Optional: restrict project_type to allowed values (reduces junk; adjust list if you add options)
-- alter table public.contact_submissions
--   add constraint contact_submissions_project_type_allowed check (
--     project_type is null or project_type in ('website', 'ecommerce', 'saas', 'landing', 'other')
--   );
-- Uncomment above if you want to enforce dropdown values only.
