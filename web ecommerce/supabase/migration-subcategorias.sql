-- =====================================================
-- WAEY ECOMMERCE - MIGRACIÓN SUBCATEGORÍAS
-- Ejecutar UNA sola vez en: Supabase > SQL Editor > New query > RUN
-- =====================================================

-- 1) Agregar parent_id a categories (autorelación → árbol)
alter table public.categories
  add column if not exists parent_id text references public.categories(id) on delete cascade;

create index if not exists idx_categories_parent on public.categories(parent_id);

-- 2) Agregar subcategory a products
alter table public.products
  add column if not exists subcategory text references public.categories(id) on delete set null;

create index if not exists idx_products_subcategory on public.products(subcategory);

-- 3) (Opcional) limpiar las categorías por defecto viejas y sembrar el árbol nuevo
-- ⚠️ Solo descomentá las líneas siguientes si querés REEMPLAZAR las categorías
-- existentes por las nuevas. Si ya tenés productos con categorías "botellas",
-- "mochilas", "carteras", "valijas", esos productos perderán esa referencia
-- (los productos quedan; sólo se les borra la categoría).

-- delete from public.categories where parent_id is null;

-- 4) Insertar el árbol de categorías nuevas (idempotente)
insert into public.categories (id, label, emoji, position, parent_id) values
  -- Top-level
  ('mochilas',      'Mochilas',                '🎒',  1, null),
  ('carteras',      'Carteras y Bolsos',       '👜',  2, null),
  ('rinoneras',     'Riñoneras y Bandoleras',  '🎽',  3, null),
  ('loncheras',     'Loncheras y Térmicos',    '🍱',  4, null),
  ('accesorios',    'Accesorios',              '💼',  5, null),
  ('viaje',         'Viaje',                   '✈️',  6, null),
  ('hombre',        'Hombre',                  '🧍‍♂️', 7, null),
  ('mujer',         'Mujer',                   '🧍‍♀️', 8, null),
  ('ofertas',       'Ofertas',                 '🔥',  9, null),

  -- Mochilas
  ('mochilas-urbanas',     'Urbanas',              '🎒', 1, 'mochilas'),
  ('mochilas-deportivas',  'Deportivas',           '🎒', 2, 'mochilas'),
  ('mochilas-escolares',   'Escolares',            '🎒', 3, 'mochilas'),
  ('mochilas-ejecutivas',  'Ejecutivas (notebook)', '🎒', 4, 'mochilas'),
  ('mochilas-viaje',       'Viaje',                '🎒', 5, 'mochilas'),

  -- Carteras y Bolsos
  ('carteras-carteras',    'Carteras',             '👜', 1, 'carteras'),
  ('carteras-mano',        'Bolsos de mano',       '👜', 2, 'carteras'),
  ('carteras-viaje',       'Bolsos de viaje',      '👜', 3, 'carteras'),
  ('carteras-tote',        'Tote bags',            '👜', 4, 'carteras'),

  -- Riñoneras y Bandoleras
  ('rinoneras-rinoneras',  'Riñoneras',            '🎽', 1, 'rinoneras'),
  ('rinoneras-bandoleras', 'Bandoleras',           '🎽', 2, 'rinoneras'),
  ('rinoneras-crossbody',  'Crossbody',            '🎽', 3, 'rinoneras'),

  -- Loncheras y Térmicos
  ('loncheras-loncheras',  'Loncheras',            '🍱', 1, 'loncheras'),
  ('loncheras-termicos',   'Bolsos térmicos',      '🍱', 2, 'loncheras'),
  ('loncheras-botellas',   'Botellas deportivas',  '🍱', 3, 'loncheras'),
  ('loncheras-termos',     'Termos',               '🍱', 4, 'loncheras'),

  -- Accesorios
  ('accesorios-billeteras', 'Billeteras',          '💼', 1, 'accesorios'),
  ('accesorios-tarjeteros', 'Tarjeteros',          '💼', 2, 'accesorios'),
  ('accesorios-necesers',   'Necesers',            '💼', 3, 'accesorios'),
  ('accesorios-cosmeticos', 'Porta cosméticos',    '💼', 4, 'accesorios'),
  ('accesorios-organizadores','Organizadores',     '💼', 5, 'accesorios'),

  -- Viaje
  ('viaje-valijas',        'Valijas',              '✈️', 1, 'viaje'),
  ('viaje-organizadores',  'Organizadores de viaje','✈️',2, 'viaje'),
  ('viaje-almohadas',      'Almohadas de viaje',   '✈️', 3, 'viaje'),
  ('viaje-cabina',         'Mochilas de cabina',   '✈️', 4, 'viaje'),

  -- Hombre
  ('hombre-mochilas',      'Mochilas hombre',      '🧍‍♂️', 1, 'hombre'),
  ('hombre-rinoneras',     'Riñoneras hombre',     '🧍‍♂️', 2, 'hombre'),
  ('hombre-billeteras',    'Billeteras hombre',    '🧍‍♂️', 3, 'hombre'),

  -- Mujer
  ('mujer-carteras',       'Carteras',             '🧍‍♀️', 1, 'mujer'),
  ('mujer-mochilas',       'Mochilas mujer',       '🧍‍♀️', 2, 'mujer'),
  ('mujer-accesorios',     'Accesorios mujer',     '🧍‍♀️', 3, 'mujer'),

  -- Ofertas
  ('ofertas-descuentos',   'Descuentos',           '🔥', 1, 'ofertas'),
  ('ofertas-ultimas',      'Últimas unidades',     '🔥', 2, 'ofertas'),
  ('ofertas-promos',       'Promociones',          '🔥', 3, 'ofertas')
on conflict (id) do nothing;
-- Si ya existía una categoría con el mismo id (ej: mochilas, carteras),
-- esta migración NO la modifica: respeta tu label, emoji, posición y parent_id actuales.
-- Solo agrega las que no existían.

-- =====================================================
-- LISTO. Ahora podés:
-- - Editar / agregar / borrar categorías y subcategorías desde el panel admin.
-- - Asignar a cada producto su categoría madre + subcategoría.
-- =====================================================
