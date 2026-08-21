-- Fisio Picazo — schema, triggers and RLS policies.
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent (create-if-not-exists / drop-if-exists).
--
-- IMPORTANT: the zone id list ('rodilla', 'hombro', ...) below MUST stay in
-- sync with the `id` fields of the `zones` array in app/lib/site-content.js —
-- that array feeds the admin dropdowns that write these columns. Adding a
-- zone in one place without the other will make inserts using it fail a
-- check constraint. Search this file for every occurrence of the zone list
-- and update them all together.

-- =========================================================
-- 1. profiles — one row per auth.users row
-- =========================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'patient',
  injury_zone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Added via ALTER (not inline above) so it lands even if this table already
-- existed from an earlier run of this script.
alter table public.profiles add column if not exists privacy_accepted_at timestamptz;

-- Check constraints are declared here (not inline above) and dropped+recreated
-- on every run, so re-running this script always converges to the values
-- below even if the table already existed with an older/drifted constraint.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('patient', 'admin'));

alter table public.profiles drop constraint if exists profiles_injury_zone_check;
alter table public.profiles add constraint profiles_injury_zone_check
  check (
    injury_zone is null
    or injury_zone in ('rodilla', 'hombro', 'isquios', 'tobillo', 'cadera', 'pierna', 'espalda')
  );

-- =========================================================
-- 2. exercises — reusable exercise library (title, video, etc.)
-- =========================================================

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_path text, -- object path inside the 'exercise-videos' storage bucket
  zone text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.exercises enable row level security;

alter table public.exercises drop constraint if exists exercises_zone_check;
alter table public.exercises add constraint exercises_zone_check
  check (
    zone is null
    or zone in ('rodilla', 'hombro', 'isquios', 'tobillo', 'cadera', 'pierna', 'espalda')
  );

-- =========================================================
-- 3. programs — a treatment plan assigned to one patient
-- =========================================================

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles (id) on delete cascade,
  zone text not null,
  phase int not null default 1,
  status text not null default 'active',
  started_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.programs enable row level security;

create index if not exists programs_patient_id_idx on public.programs (patient_id);

alter table public.programs drop constraint if exists programs_zone_check;
alter table public.programs add constraint programs_zone_check
  check (zone in ('rodilla', 'hombro', 'isquios', 'tobillo', 'cadera', 'pierna', 'espalda'));

alter table public.programs drop constraint if exists programs_status_check;
alter table public.programs add constraint programs_status_check
  check (status in ('active', 'paused', 'completed'));

-- =========================================================
-- 4. program_exercises — exercises prescribed within a program
-- =========================================================

create table if not exists public.program_exercises (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id) on delete cascade,
  sets int,
  reps text, -- free text: "10", "30s", "al fallo"...
  order_index int not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.program_exercises enable row level security;

create index if not exists program_exercises_program_id_idx on public.program_exercises (program_id);

-- =========================================================
-- 5. exercise_logs — a patient marking an exercise as done
-- =========================================================

create table if not exists public.exercise_logs (
  id uuid primary key default gen_random_uuid(),
  program_exercise_id uuid not null references public.program_exercises (id) on delete cascade,
  patient_id uuid not null references public.profiles (id) on delete cascade,
  completed_at timestamptz not null default now(),
  pain_score int,
  notes text
);

alter table public.exercise_logs enable row level security;

alter table public.exercise_logs drop constraint if exists exercise_logs_pain_score_check;
alter table public.exercise_logs add constraint exercise_logs_pain_score_check
  check (pain_score is null or pain_score between 0 and 10);

create index if not exists exercise_logs_patient_id_idx on public.exercise_logs (patient_id);
create index if not exists exercise_logs_program_exercise_id_idx on public.exercise_logs (program_exercise_id);

-- =========================================================
-- 6. Helper: is_admin() — SECURITY DEFINER avoids RLS recursion
--    when a policy on profiles needs to query profiles itself.
-- =========================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- =========================================================
-- 7. updated_at triggers
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_programs_updated_at on public.programs;
create trigger trg_programs_updated_at
  before update on public.programs
  for each row execute function public.set_updated_at();

-- =========================================================
-- 8. Auto-create a profile row when someone signs up
-- =========================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, privacy_accepted_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    case
      when new.raw_user_meta_data ->> 'privacy_accepted' = 'true' then now()
      else null
    end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- 9. RLS policies
-- =========================================================

-- profiles: a patient sees/edits only their own row; admin sees/edits all.
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_insert_admin" on public.profiles;
create policy "profiles_insert_admin"
  on public.profiles for insert
  with check (public.is_admin());

-- exercises: any authenticated user can read the library; only admin writes.
drop policy if exists "exercises_select_authenticated" on public.exercises;
create policy "exercises_select_authenticated"
  on public.exercises for select
  using (auth.uid() is not null);

drop policy if exists "exercises_admin_write" on public.exercises;
create policy "exercises_admin_write"
  on public.exercises for all
  using (public.is_admin())
  with check (public.is_admin());

-- programs: a patient sees only their own programs; only admin assigns/edits them.
drop policy if exists "programs_select_own_or_admin" on public.programs;
create policy "programs_select_own_or_admin"
  on public.programs for select
  using (patient_id = auth.uid() or public.is_admin());

drop policy if exists "programs_admin_write" on public.programs;
create policy "programs_admin_write"
  on public.programs for all
  using (public.is_admin())
  with check (public.is_admin());

-- program_exercises: readable by the owning patient; only admin writes.
drop policy if exists "program_exercises_select_own_or_admin" on public.program_exercises;
create policy "program_exercises_select_own_or_admin"
  on public.program_exercises for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.programs p
      where p.id = program_exercises.program_id
        and p.patient_id = auth.uid()
    )
  );

drop policy if exists "program_exercises_admin_write" on public.program_exercises;
create policy "program_exercises_admin_write"
  on public.program_exercises for all
  using (public.is_admin())
  with check (public.is_admin());

-- exercise_logs: a patient can read/insert only their own logs; only admin edits/deletes.
drop policy if exists "exercise_logs_select_own_or_admin" on public.exercise_logs;
create policy "exercise_logs_select_own_or_admin"
  on public.exercise_logs for select
  using (patient_id = auth.uid() or public.is_admin());

drop policy if exists "exercise_logs_insert_own_or_admin" on public.exercise_logs;
create policy "exercise_logs_insert_own_or_admin"
  on public.exercise_logs for insert
  with check (patient_id = auth.uid() or public.is_admin());

drop policy if exists "exercise_logs_admin_update" on public.exercise_logs;
create policy "exercise_logs_admin_update"
  on public.exercise_logs for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "exercise_logs_admin_delete" on public.exercise_logs;
create policy "exercise_logs_admin_delete"
  on public.exercise_logs for delete
  using (public.is_admin());

-- =========================================================
-- 10. Storage — private bucket for exercise videos
-- =========================================================

insert into storage.buckets (id, name, public)
values ('exercise-videos', 'exercise-videos', false)
on conflict (id) do nothing;

drop policy if exists "exercise_videos_select_authenticated" on storage.objects;
create policy "exercise_videos_select_authenticated"
  on storage.objects for select
  using (bucket_id = 'exercise-videos' and auth.uid() is not null);

drop policy if exists "exercise_videos_admin_insert" on storage.objects;
create policy "exercise_videos_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'exercise-videos' and public.is_admin());

drop policy if exists "exercise_videos_admin_update" on storage.objects;
create policy "exercise_videos_admin_update"
  on storage.objects for update
  using (bucket_id = 'exercise-videos' and public.is_admin());

drop policy if exists "exercise_videos_admin_delete" on storage.objects;
create policy "exercise_videos_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'exercise-videos' and public.is_admin());

-- =========================================================
-- 11. Promote yourself to admin (run manually, once)
-- =========================================================

-- 1. Sign up through the site with your own email first, so a profile row exists.
-- 2. Then run, replacing the email:
--
-- update public.profiles set role = 'admin' where email = 'tu@email.com';
