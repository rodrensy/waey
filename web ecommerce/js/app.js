// ===== WAEY ECOMMERCE - LÓGICA PRINCIPAL (Supabase) =====
// Requiere que ANTES en el HTML estén cargados:
//   <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
//   <script src="js/supabase-client.js"></script>

// ===== PRODUCTOS DEMO (para sembrar la base la primera vez) =====
const DEMO_PRODUCTS = [
  {
    id: 'p001',
    name: 'Botella Térmica Acero Premium 500ml',
    category: 'botellas',
    price: 12500,
    oldPrice: 15000,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
    ],
    description: 'Botella térmica de acero inoxidable de doble pared. Mantiene bebidas frías 24hs y calientes 12hs. Tapa hermética con válvula de seguridad. Ideal para el gym, la oficina o el aire libre.',
    features: ['Acero inoxidable 18/8', 'Doble pared al vacío', 'Apta para bebidas calientes y frías', '500ml de capacidad', 'Libre de BPA'],
    badge: 'sale',
    rating: 4.8,
    reviews: 24,
    active: true,
    stock: 50
  },
  {
    id: 'p002',
    name: 'Mochila Urbana Premium 25L',
    category: 'mochilas',
    price: 28900,
    oldPrice: null,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80'
    ],
    description: 'Mochila urbana resistente al agua con compartimento para laptop de 15". Diseño ergonómico con espalda acolchada y correas regulables. Perfecta para el trabajo o la universidad.',
    features: ['Capacidad 25 litros', 'Compartimento laptop 15"', 'Resistente al agua', 'Puerto USB de carga', 'Espalda ergonómica'],
    badge: 'new',
    rating: 4.9,
    reviews: 18,
    active: true,
    stock: 30
  },
  {
    id: 'p003',
    name: 'Cartera Cuero ECO Mediana',
    category: 'carteras',
    price: 19500,
    oldPrice: 22000,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80'
    ],
    description: 'Cartera de cuero ECO de alta calidad con múltiples compartimentos. Correa regulable incluida. Cierre metálico dorado. Disponible en varios colores.',
    features: ['Cuero ECO premium', 'Cierre metálico', 'Correa regulable', '3 compartimentos', 'Medidas: 32x22x10cm'],
    badge: 'sale',
    rating: 4.7,
    reviews: 32,
    active: true,
    stock: 20
  },
  {
    id: 'p004',
    name: 'Valija Trolley Cabina 20"',
    category: 'valijas',
    price: 65000,
    oldPrice: 80000,
    images: [
      'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&q=80',
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&q=80'
    ],
    description: 'Valija rígida para cabina de avión. Candado TSA integrado. Ruedas 360° silenciosas. Expandible +15% de capacidad. Aprobada por la mayoría de las aerolíneas internacionales.',
    features: ['Tamaño cabina 20"', 'Candado TSA', 'Ruedas 360° dobles', 'Carcasa ABS rígida', 'Expandible +15%'],
    badge: 'sale',
    rating: 4.6,
    reviews: 45,
    active: true,
    stock: 15
  },
  {
    id: 'p005',
    name: 'Botella Deportiva 750ml Shaker',
    category: 'botellas',
    price: 8900,
    oldPrice: null,
    images: [
      'https://images.unsplash.com/photo-1571019613914-8c94c39e9e8f?w=600&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
    ],
    description: 'Botella deportiva con filtro mezclador incorporado. Perfecta para proteínas y batidos. Material Tritan libre de BPA. Tapa a rosca con asa.',
    features: ['750ml de capacidad', 'Filtro mezclador', 'Material Tritan libre de BPA', 'Tapa con asa', 'Apta lavaplatos'],
    badge: null,
    rating: 4.5,
    reviews: 12,
    active: true,
    stock: 60
  },
  {
    id: 'p006',
    name: 'Mochila Escolar Juvenil 18L',
    category: 'mochilas',
    price: 17800,
    oldPrice: 20000,
    images: [
      'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80'
    ],
    description: 'Mochila escolar de diseño moderno y funcional. Compartimento principal amplio, bolsillo frontal organizador y bolsillos laterales para botella. Espalda ventilada.',
    features: ['18 litros', 'Bolsillo organizador', 'Espalda ventilada', 'Bolsillos laterales', 'Refuerzo en base'],
    badge: 'new',
    rating: 4.4,
    reviews: 28,
    active: true,
    stock: 40
  },
  {
    id: 'p007',
    name: 'Billetera Hombre Cuero RFID',
    category: 'carteras',
    price: 6500,
    oldPrice: null,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&q=80'
    ],
    description: 'Billetera slim de cuero genuino con protección RFID para tarjetas. Diseño delgado y elegante. Capacidad para 8 tarjetas y billetes.',
    features: ['Cuero genuino', 'Protección RFID', '8 tarjeteros', 'Diseño slim', 'Caja regalo incluida'],
    badge: null,
    rating: 4.7,
    reviews: 56,
    active: true,
    stock: 80
  },
  {
    id: 'p008',
    name: 'Valija Grande Check-in 28"',
    category: 'valijas',
    price: 98000,
    oldPrice: 120000,
    images: [
      'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=600&q=80',
      'https://images.unsplash.com/photo-1631153576730-0f6cdec1b673?w=600&q=80'
    ],
    description: 'Valija grande para viajes largos. Carcasa ultra resistente, cerradura TSA y 4 ruedas multidireccionales. Interior con organizadores separadores. Ideal para viajes de más de 7 días.',
    features: ['28" para bodega', '4 ruedas 360°', 'Cerradura TSA', 'Carcasa policarbonato', 'Organizadores internos'],
    badge: 'sale',
    rating: 4.8,
    reviews: 38,
    active: true,
    stock: 10
  }
];

// ===== HELPERS DE MAPEO entre snake_case (DB) y camelCase (JS) =====
function rowToProduct(r) {
  if (!r) return null;
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    price: Number(r.price),
    oldPrice: r.old_price != null ? Number(r.old_price) : null,
    images: r.images || [],
    description: r.description || '',
    features: r.features || [],
    badge: r.badge,
    rating: Number(r.rating || 0),
    reviews: Number(r.reviews_count || 0),
    active: !!r.active,
    stock: Number(r.stock || 0)
  };
}
function productToRow(p) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    old_price: p.oldPrice ?? null,
    images: p.images || [],
    description: p.description || '',
    features: p.features || [],
    badge: p.badge ?? null,
    rating: p.rating ?? 0,
    reviews_count: p.reviews ?? 0,
    active: p.active !== false,
    stock: p.stock ?? 0,
    updated_at: new Date().toISOString()
  };
}
function rowToReview(r) {
  if (!r) return null;
  return {
    id: r.id,
    name: r.author,
    text: r.comment,
    rating: r.rating,
    date: new Date(r.created_at).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
  };
}

// ===== CACHE simple (1 minuto) para evitar pegar a la DB en cada render =====
const _cache = { products: null, productsAt: 0, categories: null, categoriesAt: 0, config: null, configAt: 0 };
const CACHE_MS = 60_000;
function _isFresh(k) { return _cache[k] && (Date.now() - _cache[k + 'At']) < CACHE_MS; }

// ===== GESTIÓN DE DATOS (asíncrono / Supabase) =====
const DB = {
  // ----- PRODUCTOS -----
  async getProducts(force = false) {
    if (!force && _isFresh('products')) return _cache.products;
    const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false });
    if (error) { console.error('getProducts', error); return _cache.products || []; }
    _cache.products = data.map(rowToProduct);
    _cache.productsAt = Date.now();
    return _cache.products;
  },
  async getProduct(id) {
    const { data, error } = await sb.from('products').select('*').eq('id', id).maybeSingle();
    if (error) { console.error('getProduct', error); return null; }
    return rowToProduct(data);
  },
  async addProduct(product) {
    const id = product.id || ('p' + Date.now());
    const row = productToRow({ ...product, id });
    const { data, error } = await sb.from('products').insert(row).select('*').single();
    if (error) throw error;
    _cache.products = null;
    return rowToProduct(data);
  },
  async updateProduct(id, data) {
    // tomamos el actual y mergeamos
    const current = await this.getProduct(id);
    if (!current) return null;
    const merged = { ...current, ...data, id };
    const row = productToRow(merged);
    delete row.id; // no actualizar la PK
    const { data: out, error } = await sb.from('products').update(row).eq('id', id).select('*').single();
    if (error) throw error;
    _cache.products = null;
    return rowToProduct(out);
  },
  async deleteProduct(id) {
    const { error } = await sb.from('products').delete().eq('id', id);
    if (error) throw error;
    _cache.products = null;
  },

  // ----- REVIEWS -----
  async getReviews(productId) {
    const { data, error } = await sb.from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    if (error) { console.error('getReviews', error); return []; }
    return data.map(rowToReview);
  },
  async addReview(productId, review) {
    const { data, error } = await sb.from('reviews').insert({
      product_id: productId,
      author: review.name,
      rating: review.rating,
      comment: review.text
    }).select('*').single();
    if (error) throw error;

    // recalcular rating + reviews_count del producto
    try {
      const all = await this.getReviews(productId);
      const avg = all.reduce((s, r) => s + r.rating, 0) / (all.length || 1);
      await sb.from('products').update({
        rating: Math.round(avg * 10) / 10,
        reviews_count: all.length
      }).eq('id', productId);
      _cache.products = null;
    } catch (e) { console.warn('No se pudo recalcular rating', e); }

    return rowToReview(data);
  },

  // ----- CONFIG -----
  async getConfig() {
    if (_isFresh('config')) return _cache.config;
    const { data, error } = await sb.from('config').select('value').eq('key', 'store').maybeSingle();
    const fallback = { whatsapp: '5491100000000', storeName: 'WAEY', freeShipping: true };
    _cache.config = (error || !data) ? fallback : { ...fallback, ...(data.value || {}) };
    _cache.configAt = Date.now();
    return _cache.config;
  },
  async saveConfig(config) {
    const { error } = await sb.from('config').upsert({ key: 'store', value: config, updated_at: new Date().toISOString() });
    if (error) throw error;
    _cache.config = null;
  },

  // ----- CATEGORÍAS -----
  DEFAULT_CATEGORIES: [
    { id: 'botellas', label: 'Botellas y Termos', emoji: '🧴' },
    { id: 'mochilas', label: 'Mochilas',           emoji: '🎒' },
    { id: 'carteras', label: 'Carteras y Bolsos',  emoji: '👜' },
    { id: 'valijas',  label: 'Valijas y Viaje',    emoji: '🧳' }
  ],
  async getCategories() {
    if (_isFresh('categories')) return _cache.categories;
    const { data, error } = await sb.from('categories').select('*').order('position');
    if (error || !data || data.length === 0) {
      _cache.categories = this.DEFAULT_CATEGORIES;
    } else {
      _cache.categories = data.map(c => ({ id: c.id, label: c.label, emoji: c.emoji || '📦' }));
    }
    _cache.categoriesAt = Date.now();
    return _cache.categories;
  },
  async saveCategories(cats) {
    // upsert categorías nuevas/modificadas + borra las que ya no están
    const incomingIds = cats.map(c => c.id);
    if (incomingIds.length) {
      await sb.from('categories').delete().not('id', 'in', `(${incomingIds.map(i => `"${i}"`).join(',')})`);
    } else {
      await sb.from('categories').delete().neq('id', '___nada___');
    }
    if (cats.length) {
      const rows = cats.map((c, i) => ({ id: c.id, label: c.label, emoji: c.emoji || '📦', position: i }));
      const { error } = await sb.from('categories').upsert(rows);
      if (error) throw error;
    }
    _cache.categories = null;
  },

  // ----- ÓRDENES -----
  async getOrders() {
    const { data, error } = await sb.from('orders').select('*').order('created_at', { ascending: false });
    if (error) { console.error('getOrders', error); return []; }
    return data.map(o => ({
      id: o.id,
      date: o.created_at,
      items: o.items,
      total: Number(o.total),
      status: o.status,
      customer: o.customer,
      customerPhone: o.customer_phone,
      notes: o.notes
    }));
  },
  async addOrder(order) {
    const id = 'ORD-' + Date.now();
    const row = {
      id,
      customer: order.customer || 'Cliente WhatsApp',
      customer_phone: order.customerPhone ?? null,
      items: order.items || [],
      total: order.total || 0,
      status: order.status || 'pendiente',
      notes: order.notes ?? null
    };
    const { data, error } = await sb.from('orders').insert(row).select('*').single();
    if (error) throw error;
    return data;
  },
  async updateOrderStatus(id, status) {
    const { error } = await sb.from('orders').update({ status }).eq('id', id);
    if (error) throw error;
  },
  async deleteOrder(id) {
    const { error } = await sb.from('orders').delete().eq('id', id);
    if (error) throw error;
  },

  // ----- SEMILLA INICIAL -----
  // Esto se llama SOLO una vez desde el panel admin si la tabla está vacía.
  async seedDemoProducts() {
    const existing = await this.getProducts(true);
    if (existing.length > 0) return { inserted: 0, message: 'Ya hay productos cargados' };
    const rows = DEMO_PRODUCTS.map(productToRow);
    const { error } = await sb.from('products').insert(rows);
    if (error) throw error;
    _cache.products = null;
    return { inserted: rows.length, message: `${rows.length} productos demo cargados` };
  }
};

// ===== AUTH (Supabase) =====
const Auth = {
  async signIn(email, password) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // upsert del perfil al primer login
    if (data.user) {
      await sb.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        role: 'admin'
      }, { onConflict: 'id', ignoreDuplicates: true });
    }
    return data;
  },
  async signOut() {
    await sb.auth.signOut();
  },
  async getSession() {
    const { data } = await sb.auth.getSession();
    return data.session;
  },
  async getCurrentUser() {
    const { data } = await sb.auth.getUser();
    return data.user;
  },
  async getCurrentRole() {
    const user = await this.getCurrentUser();
    if (!user) return null;
    const { data } = await sb.from('profiles').select('role').eq('id', user.id).maybeSingle();
    return data?.role || 'admin';
  }
};

// ===== STORAGE (subida de imágenes) =====
const Storage = {
  async uploadProductImage(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await sb.storage.from('product-images').upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || `image/${ext}`
    });
    if (error) throw error;
    const { data } = sb.storage.from('product-images').getPublicUrl(filename);
    return data.publicUrl;
  },
  async deleteProductImage(url) {
    // del URL público sacamos el path interno
    try {
      const m = url.match(/product-images\/([^?]+)/);
      if (!m) return;
      await sb.storage.from('product-images').remove([m[1]]);
    } catch (e) { console.warn('No se pudo borrar imagen', e); }
  }
};

// ===== CARRITO (sigue en localStorage — el carrito es por navegador) =====
const Cart = {
  get() {
    try { return JSON.parse(localStorage.getItem('waey_cart') || '[]'); } catch { return []; }
  },
  save(cart) { localStorage.setItem('waey_cart', JSON.stringify(cart)); },
  async add(productId, qty = 1) {
    const cart = this.get();
    const product = await DB.getProduct(productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: productId, qty,
        name: product.name, price: product.price,
        image: product.images[0], category: product.category
      });
    }
    this.save(cart);
    this.updateBadge();
    showToast('¡Producto agregado al carrito!', 'success');
  },
  remove(productId) {
    const cart = this.get().filter(i => i.id !== productId);
    this.save(cart);
    this.updateBadge();
  },
  updateQty(productId, qty) {
    const cart = this.get();
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      this.save(cart);
    }
    this.updateBadge();
  },
  clear() { this.save([]); this.updateBadge(); },
  count() { return this.get().reduce((s, i) => s + i.qty, 0); },
  total() { return this.get().reduce((s, i) => s + i.price * i.qty, 0); },
  updateBadge() {
    const n = this.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  },
  async buildWhatsAppMessage() {
    const config = await DB.getConfig();
    const items = this.get();
    if (!items.length) return null;
    let msg = `🛒 *Hola! Me gustaría hacer un pedido en WAEY:*\n\n`;
    items.forEach(i => {
      msg += `• ${i.name}\n  Cantidad: ${i.qty} | Precio: ${formatPrice(i.price)} c/u\n\n`;
    });
    msg += `\n*TOTAL: ${formatPrice(this.total())}*\n\n¿Cómo puedo coordinar el pago y el envío?`;
    return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
  },
  async saveOrderFromCart() {
    const items = this.get();
    if (!items.length) return;
    try {
      await DB.addOrder({ items: [...items], total: this.total(), customer: 'Cliente WhatsApp' });
    } catch (e) { console.warn('No se pudo guardar el pedido', e); }
  }
};

// ===== HELPERS =====
function formatPrice(n) {
  return '$' + Number(n).toLocaleString('es-AR');
}

function starsHTML(rating, showCount = true, count = 0) {
  let html = '<span style="color:#f39c12">';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '★';
    else if (i - rating < 1) html += '☆';
    else html += '☆';
  }
  html += '</span>';
  if (showCount) html += `<span style="color:var(--gray);font-size:11px;margin-left:4px">(${count})</span>`;
  return html;
}

function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', info: '🛒' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type] || '💬'} ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3000);
}

// Sincrónicos: se llaman desde renderProductCard etc.
// Necesitamos las categorías cacheadas para no romper sincronía.
let _categoriesSync = [];
async function _ensureCategoriesLoaded() {
  if (!_categoriesSync.length) _categoriesSync = await DB.getCategories();
}
function getCategoryLabel(cat) {
  const found = _categoriesSync.find(c => c.id === cat);
  return found ? found.label : cat;
}
function getCategoryEmoji(cat) {
  const found = _categoriesSync.find(c => c.id === cat);
  return found ? found.emoji : '📦';
}

function renderProductCard(product) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  return `
    <div class="product-card" onclick="window.location.href='producto.html?id=${product.id}'">
      <div class="product-img-wrap">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge === 'new' ? 'Nuevo' : product.badge === 'sale' ? '-' + discount + '%' : ''}</span>` : ''}
        <div class="product-actions">
          <button title="Agregar al carrito" onclick="event.stopPropagation(); Cart.add('${product.id}')">🛒</button>
          <button title="Ver producto" onclick="event.stopPropagation(); window.location.href='producto.html?id=${product.id}'">👁️</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${getCategoryLabel(product.category)}</div>
        <div class="product-name">${product.name}</div>
        <div>
          <span class="product-price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="product-price-old">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        <div class="product-stars mt-8">${starsHTML(product.rating, true, product.reviews)}</div>
        <button class="btn-add mt-8" onclick="event.stopPropagation(); Cart.add('${product.id}')">
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  `;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', async () => {
  Cart.updateBadge();
  // precargo categorías para que renderProductCard sea sincrónico
  await _ensureCategoriesLoaded();
  // Marcar nav activo
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-inner a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
