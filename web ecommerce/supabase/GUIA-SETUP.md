# Guía de Setup — Supabase para WAEY

## Paso 1 — Crear cuenta y proyecto Supabase

1. Andá a **https://supabase.com** y hacé clic en **Start your project**.
2. Iniciá sesión con GitHub o con tu email.
3. Hacé clic en **New project**.
4. Completá:
   - **Name**: `waey-ecommerce` (o el nombre que prefieras)
   - **Database Password**: poné una contraseña fuerte y **guardala** (la vas a necesitar si querés conectarte por psql algún día)
   - **Region**: elegí `South America (São Paulo)` — es la más cercana a Argentina
   - **Plan**: **Free**
5. Hacé clic en **Create new project**. Tarda ~1–2 minutos en provisionarlo.

## Paso 2 — Correr el script SQL

1. En el panel de tu proyecto, en el menú izquierdo, abrí **SQL Editor**.
2. Hacé clic en **+ New query**.
3. Abrí el archivo `supabase/schema.sql` (que está en esta misma carpeta), copialo entero y pegalo en el editor.
4. Hacé clic en **Run** (o `Ctrl+Enter`).
5. Tiene que decir **Success. No rows returned**. Si aparece un error, mandámelo y lo revisamos.

Esto crea todas las tablas (`products`, `categories`, `orders`, `reviews`, `config`, `profiles`), las reglas de seguridad (RLS) y el bucket de storage para imágenes.

## Paso 3 — Crear tu primer usuario admin

1. En el menú izquierdo, abrí **Authentication** → **Users**.
2. Hacé clic en **Add user** → **Create new user**.
3. Poné un email (el tuyo) y una contraseña fuerte.
4. **IMPORTANTE**: marcá la opción **Auto Confirm User** (así no tenés que confirmar el mail).
5. Hacé clic en **Create user**.

Repetí para cada persona que quieras que pueda entrar al admin.

### Convertir a alguien en SUPERADMIN

Por defecto todos los usuarios nuevos son `admin`. Si querés que vos seas `superadmin` (acceso a configuración):

1. Volvé al **SQL Editor** → **New query**.
2. Pegá esto (cambiando el email):

```sql
update public.profiles
set role = 'superadmin'
where email = 'tu-email@ejemplo.com';
```

3. Run.

## Paso 4 — Copiar las credenciales del proyecto

Las vas a necesitar para conectar el sitio a Supabase.

1. En el menú izquierdo, abrí **Project Settings** (⚙️ abajo) → **API**.
2. Vas a ver dos cosas que tenés que copiar:
   - **Project URL** — algo como `https://abcdefgh.supabase.co`
   - **anon public** key (en *Project API keys*) — un texto largo que empieza con `eyJ...`

**Mandame esos dos valores por chat** y los pego en el archivo de configuración del sitio para terminar la migración.

> ⚠️ La `anon public` key es segura para usar en el frontend (es lo que recomienda Supabase). La que NO se debe pegar en el frontend es la `service_role` key — esa quedátela para vos.

## Paso 5 — Subir el sitio a Netlify (después del Paso 4)

Cuando ya tengas el sitio conectado a Supabase, lo siguiente es publicar:

1. Andá a **https://app.netlify.com** y entrá con tu cuenta.
2. **Add new site** → **Deploy manually**.
3. Arrastrá toda la carpeta `web ecommerce` al área que dice "drag and drop your folder".
4. En 30 segundos tenés tu URL: algo como `https://waey-tienda.netlify.app`.

Si después querés conectar tu propio dominio, lo hacemos.
