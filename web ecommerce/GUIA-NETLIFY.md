# Guía de Despliegue — Netlify para WAEY

> Esta guía asume que ya completaste la setup de Supabase (`supabase/GUIA-SETUP.md`):
> - El esquema SQL ya se ejecutó.
> - Tenés un usuario admin creado en Authentication → Users.
> - El archivo `js/supabase-client.js` ya tiene la URL y la publishable key.

---

## Paso 1 — Verificar que el sitio funciona localmente (opcional pero recomendado)

Antes de subirlo a Netlify, conviene chequear que todo levanta bien. Como el sitio es 100% estático (HTML + CSS + JS), no necesita servidor.

**Opción rápida**: hacé doble click en `index.html`. Va a abrirse en tu navegador y debería mostrarte la home.

**Opción mejor (recomendada)**: levantá un mini-servidor para evitar problemas de CORS:

- Si tenés Python:
  ```
  cd "C:\Users\rfarias\Documents\Claude\Projects\web ecommerce"
  python -m http.server 8080
  ```
  Y abrí http://localhost:8080

- Si tenés Node:
  ```
  npx serve .
  ```

Probá:
- ✅ Home (index.html) se ve y carga productos.
- ✅ Tienda muestra los productos.
- ✅ Click en un producto abre la ficha.
- ✅ Carrito agrega/quita ítems.
- ✅ Admin (`admin.html`) te pide email + contraseña, podés entrar con tu usuario de Supabase.

Si la home queda en "Cargando productos..." y no aparece nada → abrí la consola del navegador (F12) y mirá los errores. Lo más común: las credenciales en `js/supabase-client.js` están mal o la base está vacía (cargá los productos demo desde el panel admin).

---

## Paso 2 — Crear el sitio en Netlify

### A) Drag & drop (la forma más rápida)

1. Andá a **https://app.netlify.com** y entrá con tu cuenta.
2. En el dashboard, hacé click en **Add new site** → **Deploy manually**.
3. Vas a ver un cuadro grande que dice *"Drag and drop your site output folder here"*.
4. Abrí el explorador de Windows en `C:\Users\rfarias\Documents\Claude\Projects\web ecommerce`.
5. **Arrastrá la carpeta entera** (no su contenido — la carpeta) al cuadro de Netlify.
6. Esperá unos segundos. Cuando termine vas a ver una URL del estilo:
   ```
   https://random-name-12345.netlify.app
   ```

¡Listo! Tu sitio ya está online y accesible desde cualquier dispositivo.

### B) Cambiar el subdominio gratis

El nombre random que te dio Netlify lo podés cambiar:

1. En el panel de tu sitio: **Site configuration** → **Change site name**.
2. Poné algo como `waey-tienda` o `waey-online`.
3. Tu URL final queda: `https://waey-tienda.netlify.app`.

---

## Paso 3 — Configurar Supabase para aceptar la URL de Netlify

Este paso es crítico para que la autenticación funcione bien desde Netlify.

1. Andá a tu proyecto en **Supabase** → **Authentication** → **URL Configuration**.
2. En **Site URL** poné tu URL de Netlify, sin barra final:
   ```
   https://waey-tienda.netlify.app
   ```
3. En **Redirect URLs** agregá las dos URLs (una por línea):
   ```
   https://waey-tienda.netlify.app
   https://waey-tienda.netlify.app/**
   http://localhost:8080
   ```
4. Hacé click en **Save**.

> 💡 La `localhost` es por si querés seguir desarrollando localmente.

---

## Paso 4 — Probar el sitio en producción

1. Abrí tu URL de Netlify en una pestaña de incógnito.
2. Verificá la home, la tienda, el carrito, el admin.
3. **Importante**: probá entrar al admin con tu email + contraseña. Si todo está bien configurado, vas a entrar al panel.
4. Cargá tu primer producto desde el admin para confirmar que la base se actualiza.
5. Abrí otra pestaña con el sitio y refrescá → tiene que aparecer el producto que cargaste.

Si algo falla, abrí la consola del navegador (F12 → Console) y copiame el error.

---

## Paso 5 — Compartirlo con la otra persona

Ahora la persona que va a cargar productos puede:

1. Entrar a `https://waey-tienda.netlify.app/admin.html`.
2. Loguearse con el email + contraseña que le creaste en **Supabase → Authentication → Users**.
3. Cargar productos, subir fotos, ajustar precios, ver pedidos.

Lo que ella cargue se ve **al instante** en la tienda pública, desde cualquier navegador del mundo.

---

## Actualizaciones futuras

Cada vez que hagamos cambios en el código (HTML, CSS, JS), hay dos formas de subirlo:

### A) Re-arrastrar la carpeta (manual)

1. Andá a tu sitio en Netlify.
2. **Deploys** → **Deploy manually**.
3. Arrastrá la carpeta `web ecommerce` actualizada.
4. Listo, en 30 segundos está actualizado.

### B) Conectar a GitHub (automático, recomendado a futuro)

Si más adelante querés que cada cambio se publique automáticamente:

1. Subí el proyecto a un repo de GitHub.
2. En Netlify: **Site configuration** → **Build & deploy** → **Link repository**.
3. Cada `git push` despliega solo. (Esto te lo armo cuando llegues ahí.)

---

## Conectar un dominio propio (opcional, más adelante)

Si querés `www.waey.com.ar` en lugar del subdominio gratis:

1. Comprá el dominio (NIC.ar, namecheap, etc.).
2. En Netlify: **Domain management** → **Add custom domain**.
3. Netlify te da DNS records para apuntar el dominio a su CDN.
4. En tu registrador, cargá esos records.
5. Esperá la propagación (10 min - 24 hs).
6. Netlify auto-genera el certificado HTTPS gratis.

---

## Checklist final

Antes de avisar que está todo listo, asegurate de:

- [ ] El sitio carga en la URL de Netlify.
- [ ] Podés navegar la tienda, abrir productos, agregar al carrito.
- [ ] Podés loguearte en `/admin.html` con tu email + contraseña.
- [ ] Cargaste al menos un producto desde el admin.
- [ ] El producto aparece en la tienda pública.
- [ ] Configuraste **Site URL** y **Redirect URLs** en Supabase Auth.
- [ ] Le mandaste a la otra persona la URL del admin + sus credenciales.
