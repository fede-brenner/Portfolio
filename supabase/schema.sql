-- Correr este script completo en el SQL Editor de tu proyecto Supabase.
-- Reemplazá TU_EMAIL_AQUI por tu email real de Google (el mismo que pusiste
-- en VUE_APP_ALLOWED_EMAIL) antes de ejecutarlo.

create table if not exists personas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  pais text,
  fecha date,
  edad int,
  descripcion text,
  barrio text,
  instagram text,
  color_pelo text,
  imagen_path text,
  pais_probable boolean default false,
  edad_aproximada boolean default false,
  bool1 boolean default false,
  bool2 boolean default false,
  bool3 boolean default false,
  lugar text,
  posicion text,
  visual text,
  created_at timestamptz default now()
);

alter table personas enable row level security;

drop policy if exists "solo el owner puede todo" on personas;
create policy "solo el owner puede todo"
  on personas for all
  using (auth.jwt() ->> 'email' = 'TU_EMAIL_AQUI')
  with check (auth.jwt() ->> 'email' = 'TU_EMAIL_AQUI');

-- Bucket de imágenes: privado, se accede solo con signed URLs generadas
-- del lado del cliente para la cuenta autorizada.
insert into storage.buckets (id, name, public)
values ('personas-imagenes', 'personas-imagenes', false)
on conflict (id) do nothing;

drop policy if exists "solo el owner puede sus imagenes" on storage.objects;
create policy "solo el owner puede sus imagenes"
  on storage.objects for all
  using (bucket_id = 'personas-imagenes' and auth.jwt() ->> 'email' = 'TU_EMAIL_AQUI')
  with check (bucket_id = 'personas-imagenes' and auth.jwt() ->> 'email' = 'TU_EMAIL_AQUI');

-- ============================================================
-- Geolocalización de Barrio (para el mapa de burbujas del
-- dashboard de Geografía). El barrio se busca con Google Places
-- Autocomplete desde el formulario, así que no hace falta una
-- tabla propia de barrios: solo guardamos la lat/lng elegida
-- directamente en personas.
-- ============================================================

alter table personas add column if not exists barrio_lat double precision;
alter table personas add column if not exists barrio_lng double precision;

-- ============================================================
-- Thumbnail separado de la imagen completa: la lista de personas
-- muestra un cuadradito de ~40px, no tiene sentido bajar la misma
-- imagen de 1600px que se usa en el perfil. Se guarda el path del
-- thumbnail (200px, webp) por separado.
-- ============================================================

alter table personas add column if not exists imagen_thumb_path text;
