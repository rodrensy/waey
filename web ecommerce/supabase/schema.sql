-- =====================================================
-- WAEY ECOMMERCE - ESQUEMA SUPABASE (v2)
-- Pegá TODO este archivo en: Supabase > SQL Editor > New query > RUN
-- =====================================================

-- ===== 1. TABLA CATEGORIES =====
create table if not exists public.categories (
  id text primary key,
  label text not null,
  emoji text default '📦',
  position int default 0,
  created_at timestamptz default now()
);

-- ===== 2. TABLA PRODUCTS =====
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text references public.categories(id) on delete set null,
  price numeric(12,2) not null default 0,
  old_price numeric(12,2),
  images jsonb default '[]'::jsonb,
  description text,
  features jsonb default '[]'::jsonb,
  badge text,
  rating numeric(3,2) default 0,
  reviews_count int default 0,
  active boolean default true,
  stock int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_active   on public.products(active);

-- ===== 3. TABLA REVIEWS =====
create table if not exists public.reviews (
  id bigserial primary key,
  product_id text references public.products(id) on delete cascade,
  author text not null,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

create index if not exists idx_reviews_product on public.reviews(product_id);

-- ===== 4. TABLA ORDERS =====
create table if not exists public.orders (
  id text primary key,
  customer text default 'Cliente WhatsApp',
  customer_phone text,
  items jsonb not null default '[]'::jsonb,
  total numeric(12,2) not null default 0,
  status text default 'pendiente' check (status in ('pendiente','confirmado','enviado','entregado','cancelado')),
  notes text,
  created_at timestamptz default now()
);

create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_date   on public.orders(created_at desc);

-- ===== 5. TABLA CONFIG (clave/valor) =====
create table if not exists public.config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- ===== 6. TABLA PROFILES (rol de cada usuario auth) =====
-- IMPORTANTE: NO usamos trigger sobre auth.users (Supabase lo bloquea
-- por permisos). En su lugar, cuando un usuario nuevo entra por primera
-- vez, el frontend hará upsert en esta tabla.
create table if not exists public.profiles (
  id uuid primary key,
  email text,
  role text default 'admin' check (role in ('admin','superadmin')),
  created_at timestamptz default now()
);

-- ===== 7. SEMILLA: CATEGORÍAS POR DEFECTO =====
insert into public.categories (id, label, emoji, position) values
  ('botellas', 'Botellas y Termos', '🧴', 1),
  ('mochilas', 'Mochilas',          '🎒', 2),
  ('carteras', 'Carteras y Bolsos', '👜', 3),
  ('valijas',  'Valijas y Viaje',   '🧳', 4)
on conflict (id) do nothing;

-- ===== 8. SEMILLA: CONFIG POR DEFECTO =====
insert into public.config (key, value) values
  ('store', '{"whatsapp":"5491100000000","storeName":"WAEY","freeShipping":true}'::jsonb)
on conflict (key) do nothing;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

alter table public.categories enable row level security;
alter table public.products   enable row level security;
alter table public.reviews    enable row level security;
alter table public.orders     enable row level security;
alter table public.config     enable row level security;
alter table public.profiles   enable row level security;

-- ----- CATEGORIES -----
drop policy if exists "categories read public" on public.categories;
create policy "categories read public" on public.categories
  for select using (true);

drop policy if exists "categories write auth" on public.categories;
create policy "categories write auth" on public.categories
  for all to authenticated using (true) with check (true);

-- ----- PRODUCTS -----
drop policy if exists "products read public" on public.products;
create policy "products read public" on public.products
  for select using (true);

drop policy if exists "products write auth" on public.products;
create policy "products write auth" on public.products
  for all to authenticated using (true) with check (true);

-- ----- REVIEWS -----
drop policy if exists "reviews read public" on public.reviews;
create policy "reviews read public" on public.reviews
  for select using (true);

drop policy if exists "reviews insert public" on public.reviews;
create policy "reviews insert public" on public.reviews
  for insert with check (true);

drop policy if exists "reviews modify auth" on public.reviews;
create policy "reviews modify auth" on public.reviews
  for update to authenticated using (true) with check (true);

drop policy if exists "reviews delete auth" on public.reviews;
create policy "reviews delete auth" on public.reviews
  for delete to authenticated using (true);

-- ----- ORDERS -----
drop policy if exists "orders insert public" on public.orders;
create policy "orders insert public" on public.orders
  for insert with check (true);

drop policy if exists "orders read auth" on public.orders;
create policy "orders read auth" on public.orders
  for select to authenticated using (true);

drop policy if exists "orders update auth" on public.orders;
create policy "orders update auth" on public.orders
  for update to authenticated using (true) with check (true);

drop policy if exists "orders delete auth" on public.orders;
create policy "orders delete auth" on public.orders
  for delete to authenticated using (true);

-- ----- CONFIG -----
drop policy if exists "config read public" on public.config;
create policy "config read public" on public.config
  for select using (true);

drop policy if exists "config write auth" on public.config;
create policy "config write auth" on public.config
  for all to authenticated using (true) with check (true);

-- ----- PROFILES -----
-- cualquier usuario logueado puede leer perfiles (para saber su rol)
drop policy if exists "profiles read auth" on public.profiles;
create policy "profiles read auth" on public.profiles
  for select to authenticated using (true);

-- cualquier usuario logueado puede insertar SU propio perfil (auto-onboarding)
drop policy if exists "profiles insert self" on public.profiles;
create policy "profiles insert self" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

-- cada uno puede actualizar SU propio perfil
drop policy if exists "profiles update self" on public.profiles;
create policy "profiles update self" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- =====================================================
-- STORAGE: bucket público para imágenes de productos
-- =====================================================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product-images read" on storage.objects;
create policy "product-images read" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "product-images upload auth" on storage.objects;
create policy "product-images upload auth" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

drop policy if exists "product-images update auth" on storage.objects;
create policy "product-images update auth" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');

drop policy if exists "product-images delete auth" on storage.objects;
create policy "product-images delete auth" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');

-- =====================================================
-- LISTO. Próximos pasos:
-- 1) Authentication > Users > Add user (creá tu usuario admin)
-- 2) Volvé acá y ejecutá MANUALMENTE el siguiente bloque
--    cambiando el email por el tuyo, para hacerte SUPERADMIN:
--
--    insert into public.profiles (id, email, role)
--    select id, email, 'superadmin'
--    from auth.users
--    where email = 'tu-email@ejemplo.com'
--    on conflict (id) do update set role = 'superadmin';
-- =====================================================
