-- Example seed: assigns a sample "rodilla" program to one existing patient.
-- Sign up on the site first (so the profiles row exists via the trigger),
-- then run this in the SQL Editor with your own email swapped in below.

with target_profile as (
  select id from public.profiles where email = 'test@gmail.com'
),
new_program as (
  insert into public.programs (patient_id, zone, phase)
  select id, 'rodilla', 2 from target_profile
  returning id
),
ex1 as (
  insert into public.exercises (title, description, zone)
  values (
    'Sentadilla búlgara',
    '3 series de 10 repeticiones por pierna, control excéntrico en el descenso.',
    'rodilla'
  )
  returning id
),
ex2 as (
  insert into public.exercises (title, description, zone)
  values (
    'Step-down excéntrico',
    '3 series de 8, bajada lenta en 3 segundos, sin perder el apoyo.',
    'rodilla'
  )
  returning id
)
insert into public.program_exercises (program_id, exercise_id, sets, reps, order_index)
select new_program.id, ex1.id, 3, '10', 0 from new_program, ex1
union all
select new_program.id, ex2.id, 3, '8', 1 from new_program, ex2;
