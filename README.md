# humor-project-f26

Public-facing application for **Designing for GenAI: The Humor Project** (Columbia, Fall 2026).

The home page is a list of captions read from Supabase at request time.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Supabase (Postgres + Data API, read with the anon key)
- Vercel (hosting, auto-deploy on push to `main`)

## Setup

```bash
npm install
cp .env.example .env.local   # fill in from Supabase → Project Settings → API
npm run dev
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required — the
app fails fast at startup if either is missing. The same two variables must be
set in Vercel → Settings → Environment Variables.

## Database

Schema lives in [`supabase/migrations/`](supabase/migrations). Apply it by pasting
the SQL into the Supabase SQL Editor.

The `captions` table has RLS enabled with a single policy allowing public `select`,
which is what lets the anon key read rows. There is no public write path.

## Build

```bash
npm run build
```
