# Security & privacy (Avenor web)

## Contact form & user data

- **Who can submit:** Anyone (public) can submit the contact form.
- **Who can see submissions:** Only you, via the Supabase Dashboard (or a backend using the **service role** key). No visitor and no logged-in user can read another user’s submission in the app.
- **How:** Row Level Security (RLS) on `contact_submissions` allows:
  - **INSERT** for anonymous users (so the form works).
  - **SELECT** for no one when using the **anon** or **authenticated** key. Only the **service role** (used by the Dashboard and by secure backends) can read rows.
- **Important:** Never put the Supabase **service role** key in the frontend or in `.env` that is bundled for the browser. Use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the app. View submissions only in the Supabase Dashboard or from a server/backend that uses the service role.

## SQL injection & injection in general

- The app never builds raw SQL. All DB access goes through the Supabase JS client, which uses **parameterized queries**. User input is sent as values, not as part of the query text, so SQL injection from the frontend is not possible.
- Contact form values are validated and length-limited on the client and by DB constraints (max lengths on `name`, `email`, `message`, `project_type`). Control characters are stripped before insert.

## XML / XSS

- The site does not parse or render user-supplied XML. Contact submissions are not displayed anywhere in the public app, so there is no XSS risk from that data in the frontend. If you later build an admin UI that shows submissions, render text as plain text (or escape HTML); do not insert raw HTML from the database.

## Data in transit

- Use **HTTPS** in production so all traffic (including form submissions and Supabase API calls) is encrypted.

## Summary

- **Public:** Anyone can visit and submit the form.
- **Privacy:** Only you (Dashboard/service role) can see submissions; users cannot see each other’s data.
- **Hardening:** RLS, length limits, sanitized input, and parameterized queries reduce abuse and injection risk. Keep the service role key server-side only.
