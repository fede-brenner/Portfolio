import { compressImageToWebp, generateThumbnail } from './imageCompression'
import { invalidateCachedSignedUrl } from './signedUrlCache'

const BUCKET = 'personas-imagenes'

export function needsWork(persona) {
  if (!persona.imagen_path) return false
  const mainNeedsCompression = !persona.imagen_path.toLowerCase().endsWith('.webp')
  const missingThumb = !persona.imagen_thumb_path
  return mainNeedsCompression || missingThumb
}

/**
 * Re-sube en WebP/resolución reducida las imágenes de personas que ya están
 * en Storage (subidas antes de que existiera la compresión en el upload), y
 * genera el thumbnail chico para las que todavía no lo tienen.
 * onProgress(done, total) para reportar avance en la UI.
 */
export async function migrateExistingImages(supabase, personas, onProgress) {
  const pending = personas.filter(needsWork)
  const result = { total: pending.length, done: 0, skipped: 0, failed: [] }

  for (const persona of pending) {
    try {
      const { data: original, error: downloadError } = await supabase.storage
        .from(BUCKET)
        .download(persona.imagen_path)
      if (downloadError) throw downloadError

      const rawFile = new File([original], persona.imagen_path, { type: original.type || 'image/jpeg' })
      const alreadyWebp = persona.imagen_path.toLowerCase().endsWith('.webp')
      const compressed = alreadyWebp ? rawFile : await compressImageToWebp(rawFile)

      const updates = {}
      let newMainPath = persona.imagen_path

      if (compressed !== rawFile) {
        newMainPath = `${persona.imagen_path.replace(/\.[^.]+$/, '')}-${Date.now()}.webp`
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(newMainPath, compressed, { cacheControl: '31536000' })
        if (uploadError) throw uploadError
        updates.imagen_path = newMainPath
      }

      if (!persona.imagen_thumb_path) {
        const thumb = await generateThumbnail(compressed)
        if (thumb) {
          const thumbPath = `thumb-${newMainPath.replace(/\.[^.]+$/, '')}.webp`
          const { error: thumbUploadError } = await supabase.storage
            .from(BUCKET)
            .upload(thumbPath, thumb, { cacheControl: '31536000' })
          if (thumbUploadError) throw thumbUploadError
          updates.imagen_thumb_path = thumbPath
        }
      }

      if (Object.keys(updates).length) {
        const { error: updateError } = await supabase
          .from('personas')
          .update(updates)
          .eq('id', persona.id)
        if (updateError) throw updateError

        if (updates.imagen_path) {
          await supabase.storage.from(BUCKET).remove([persona.imagen_path])
          invalidateCachedSignedUrl(BUCKET, persona.imagen_path)
          persona.imagen_path = updates.imagen_path
        }
        if (updates.imagen_thumb_path) persona.imagen_thumb_path = updates.imagen_thumb_path
      } else {
        result.skipped += 1
      }
    } catch (err) {
      result.failed.push({ id: persona.id, nombre: persona.nombre, error: err.message || String(err) })
    } finally {
      result.done += 1
      onProgress?.(result.done, result.total)
    }
  }

  return result
}
