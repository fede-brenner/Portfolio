/**
 * Redimensiona (si excede maxDimension) y convierte una imagen a WebP en el
 * navegador vía canvas, para no subir fotos pesadas/en formatos ineficientes
 * a Supabase Storage.
 */
export async function compressImageToWebp(file, { maxDimension = 1600, quality = 0.82 } = {}) {
  if (!file.type.startsWith('image/')) return file

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close?.()

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
  if (!blob) return file

  // Si la conversión da un archivo más pesado que el original (fotos ya
  // chicas/comprimidas), no vale la pena reemplazarlo.
  if (blob.size >= file.size) return file

  const newName = file.name.replace(/\.[^.]+$/, '') + '.webp'
  return new File([blob], newName, { type: 'image/webp' })
}

/**
 * Genera un thumbnail chico (200px, webp) para usarlo en listados en vez de
 * la imagen completa. A diferencia de compressImageToWebp, siempre devuelve
 * el resultado convertido: a este tamaño el webp achicado siempre gana.
 */
export async function generateThumbnail(file, { maxDimension = 200, quality = 0.75 } = {}) {
  if (!file.type.startsWith('image/')) return null

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close?.()

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
  if (!blob) return null

  const newName = file.name.replace(/\.[^.]+$/, '') + '-thumb.webp'
  return new File([blob], newName, { type: 'image/webp' })
}
