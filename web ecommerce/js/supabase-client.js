// =====================================================
// WAEY - Conexión con Supabase
// Estas credenciales son seguras para frontend (publishable key).
// =====================================================

const SUPABASE_URL = 'https://airvkfzugxndjwylkvke.supabase.co';
const SUPABASE_KEY = 'sb_publishable_kfDl7nxXTtopSVzN8UFy0A_8WjCGxJf';

// El SDK supabase-js define una global 'supabase'. Renombramos a 'sb'
// para evitar confusión con el cliente.
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'waey-auth'
  }
});
