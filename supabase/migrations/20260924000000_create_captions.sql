-- Week 2: first table for the public-facing app.
-- Captions are the unit of content we eventually want people to vote on.

create table if not exists public.captions (
  id         bigint generated always as identity primary key,
  text       text not null,
  flavor     text not null default 'deadpan',
  context    text,
  upvotes    integer not null default 0,
  downvotes  integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists captions_created_at_idx on public.captions (created_at desc);

-- The list page reads with the anon key, so RLS has to explicitly allow it.
-- Read-only: nothing here grants insert/update/delete to the public.
alter table public.captions enable row level security;

drop policy if exists "Captions are publicly readable" on public.captions;
create policy "Captions are publicly readable"
  on public.captions
  for select
  to anon, authenticated
  using (true);

insert into public.captions (text, flavor, context, upvotes, downvotes) values
  ('Butler at 3am is just a sleep study with better lighting.', 'deadpan', 'Butler Library, finals week', 47, 3),
  ('The 1 train runs express when you are early and local when you are late.', 'observational', 'MTA, every single morning', 62, 5),
  ('Low Steps in September: 400 people pretending to read the same syllabus.', 'observational', 'Low Steps, first week of classes', 38, 7),
  ('My rent went up again and the landlord called it "market discovery".', 'bleak', 'Morningside Heights housing', 71, 4),
  ('Group project where four people have opinions and one person has the repo.', 'relatable', 'Any CS course', 89, 2),
  ('Ferris at 7pm is a buffet in the same way a parking lot is a garden.', 'mean', 'Ferris Booth dining hall', 55, 18),
  ('I told my advisor my five-year plan and she asked if I had a five-hour plan.', 'self-deprecating', 'Advising appointment', 44, 6),
  ('Every Columbia tour guide walks backwards with more confidence than I walk forwards.', 'whimsical', 'Campus tour', 51, 3),
  ('The gym at 6am is just people avoiding their inbox in a more expensive way.', 'observational', 'Dodge Fitness Center', 33, 9),
  ('Office hours: one question answered, four new anxieties issued.', 'deadpan', 'TA office hours', 67, 2)
on conflict do nothing;
