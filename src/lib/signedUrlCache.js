const STORAGE_KEY = 'signedUrlCache'

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeCache(cache) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage lleno o no disponible: se sigue funcionando sin cache persistente
  }
}

/**
 * Devuelve una signed URL reusando la del cache mientras no esté por vencer,
 * para que el navegador pueda cachear la imagen por su URL (que se mantiene
 * estable entre recargas) en vez de pedir un token nuevo cada vez.
 */
export async function getCachedSignedUrl(supabase, bucket, path, expiresIn = 60 * 60 * 24 * 7) {
  const cache = readCache()
  const key = `${bucket}/${path}`
  const entry = cache[key]
  const now = Date.now()
  const safetyMarginMs = 60 * 60 * 1000 // renovar 1h antes de que venza

  if (entry && entry.expiresAt - safetyMarginMs > now) {
    return entry.url
  }

  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn)
  if (error || !data?.signedUrl) return entry?.url || null

  // Se relee justo antes de escribir para no pisar entradas que otras
  // llamadas concurrentes (Promise.all sobre varias imágenes) hayan
  // guardado mientras esta esperaba la respuesta de red.
  const latestCache = readCache()
  latestCache[key] = { url: data.signedUrl, expiresAt: now + expiresIn * 1000 }
  writeCache(latestCache)
  return data.signedUrl
}

export function invalidateCachedSignedUrl(bucket, path) {
  const cache = readCache()
  delete cache[`${bucket}/${path}`]
  writeCache(cache)
}
