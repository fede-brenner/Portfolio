<template>
  <div class="text-white text-left">
    <h2 class="text-xl font-bold mb-4">Importar personas desde Excel</h2>

    <div v-if="step === 'select'">
      <p class="text-sm text-[#888888] mb-3">
        Subí un .xlsx con las columnas en el mismo orden que el formulario (los nombres de
        encabezado no importan, se ignora la primera fila).
      </p>
      <input type="file" accept=".xlsx" class="text-sm mb-4" @change="onFileChange" />
      <p v-if="errorMsg" class="text-red-400 text-sm mb-3">{{ errorMsg }}</p>
      <div class="flex justify-end gap-2">
        <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px">
          <button type="button" class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors py-2 px-4" @click="$emit('cancel')">
            Cancelar
          </button>
        </div>
        <button
          type="button"
          class="pixel-corners-sm bg-[#5D42A9] py-2 px-4 font-bold"
          :disabled="!file || analyzing"
          @click="analyze"
        >
          {{ analyzing ? 'Analizando...' : 'Analizar archivo' }}
        </button>
      </div>
    </div>

    <div v-else-if="step === 'preview'">
      <p class="mb-2 text-sm">
        Se encontraron <strong>{{ rows.length }}</strong> filas.
      </p>
      <div v-if="mismatchValues.length" class="bg-[#3a2a1a] border border-[#d4a017] text-sm rounded p-3 mb-3">
        <p class="font-bold mb-1">{{ mismatchValues.length }} valores no coinciden con las listas fijas:</p>
        <p class="text-[#d4a017]">{{ mismatchValues.join(', ') }}</p>
        <p class="mt-1 text-[#888888]">Se pueden importar igual, quedan como texto libre.</p>
      </div>

      <div class="overflow-x-auto max-h-[50vh] overflow-y-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-[#5D42A9] text-[#888888]">
              <th class="py-1 pr-2">Img</th>
              <th class="py-1 pr-2">Nombre</th>
              <th class="py-1 pr-2">Pais</th>
              <th class="py-1 pr-2">Fecha</th>
              <th class="py-1 pr-2">Edad</th>
              <th class="py-1 pr-2">Barrio</th>
              <th class="py-1 pr-2">Color pelo</th>
              <th class="py-1 pr-2">Lugar</th>
              <th class="py-1 pr-2">Posicion</th>
              <th class="py-1 pr-2">Visual</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i" class="border-b border-[#2a2b31]">
              <td class="py-1 pr-2">
                <img v-if="row.imagePreviewUrl" :src="row.imagePreviewUrl" class="w-8 h-8 object-cover rounded" alt="" />
              </td>
              <td class="py-1 pr-2">{{ row.nombre }}</td>
              <td class="py-1 pr-2" :class="{ 'text-[#d4a017]': row.mismatches.pais }">
                <PaisFlag :pais="row.pais" :probable="row.pais_probable" />
              </td>
              <td class="py-1 pr-2">{{ row.fecha }}</td>
              <td class="py-1 pr-2">{{ row.edad }}{{ row.edad_aproximada ? '≈' : '' }}</td>
              <td class="py-1 pr-2">{{ row.barrio }}</td>
              <td class="py-1 pr-2" :class="{ 'text-[#d4a017]': row.mismatches.color_pelo }">{{ row.color_pelo }}</td>
              <td class="py-1 pr-2" :class="{ 'text-[#d4a017]': row.mismatches.lugar }">{{ row.lugar }}</td>
              <td class="py-1 pr-2" :class="{ 'text-[#d4a017]': row.mismatches.posicion }">{{ row.posicion }}</td>
              <td class="py-1 pr-2" :class="{ 'text-[#d4a017]': row.mismatches.visual }">{{ row.visual }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-if="errorMsg" class="text-red-400 text-sm mt-3">{{ errorMsg }}</p>

      <div class="flex justify-end gap-2 mt-4">
        <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px">
          <button type="button" class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors py-2 px-4" @click="$emit('cancel')">
            Cancelar
          </button>
        </div>
        <button type="button" class="pixel-corners-sm bg-[#5D42A9] py-2 px-4 font-bold" @click="confirmImport">
          {{ mismatchValues.length ? 'Importar igual' : 'Importar' }}
        </button>
      </div>
    </div>

    <div v-else-if="step === 'importing'" class="text-center py-8">
      <p>Importando... {{ progress.done }}/{{ progress.total }}</p>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabaseClient'
import PaisFlag from './PaisFlag.vue'
import { compressImageToWebp, generateThumbnail } from '@/lib/imageCompression'

const BUCKET = 'personas-imagenes'

export default {
  name: 'PersonaImportModal',
  components: { PaisFlag },
  emits: ['imported', 'cancel'],
  data() {
    return {
      step: 'select',
      file: null,
      analyzing: false,
      errorMsg: '',
      rows: [],
      mismatchValues: [],
      progress: { done: 0, total: 0 }
    }
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0] || null
      this.errorMsg = ''
    },
    async analyze() {
      this.analyzing = true
      this.errorMsg = ''
      try {
        const { parseImportWorkbook } = await import('@/lib/excelImport')
        const buffer = await this.file.arrayBuffer()
        const result = await parseImportWorkbook(buffer)

        this.rows = result.rows.map((row) => ({
          ...row,
          imagePreviewUrl: row.imageBuffer
            ? URL.createObjectURL(new Blob([row.imageBuffer], { type: `image/${row.imageExtension}` }))
            : null
        }))
        this.mismatchValues = result.mismatchValues

        if (!this.rows.length) {
          this.errorMsg = 'No se encontraron filas con datos (revisá que la columna Nombre no esté vacía).'
          return
        }

        this.step = 'preview'
      } catch (err) {
        this.errorMsg = 'No se pudo leer el archivo: ' + (err.message || err)
      } finally {
        this.analyzing = false
      }
    },
    async confirmImport() {
      this.step = 'importing'
      this.progress = { done: 0, total: this.rows.length }
      this.errorMsg = ''

      try {
        const payloads = []

        for (const row of this.rows) {
          let imagenPath = null
          let imagenThumbPath = null
          if (row.imageBuffer) {
            const rawFile = new File(
              [row.imageBuffer],
              `import.${row.imageExtension}`,
              { type: `image/${row.imageExtension}` }
            )
            const compressed = await compressImageToWebp(rawFile)
            const ext = compressed.name.split('.').pop()
            const path = `import-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
            const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, compressed, { cacheControl: '31536000' })
            if (uploadError) throw uploadError
            imagenPath = path

            const thumb = await generateThumbnail(compressed)
            if (thumb) {
              const thumbPath = `thumb-import-${Date.now()}-${Math.random().toString(36).slice(2)}.webp`
              const { error: thumbUploadError } = await supabase.storage.from(BUCKET).upload(thumbPath, thumb, { cacheControl: '31536000' })
              if (thumbUploadError) throw thumbUploadError
              imagenThumbPath = thumbPath
            }
          }

          payloads.push({
            nombre: row.nombre,
            pais: row.pais || null,
            pais_probable: row.pais_probable,
            fecha: row.fecha || null,
            edad: row.edad,
            edad_aproximada: row.edad_aproximada,
            descripcion: row.descripcion || null,
            barrio: row.barrio || null,
            barrio_lat: null,
            barrio_lng: null,
            instagram: row.instagram || null,
            color_pelo: row.color_pelo || null,
            imagen_path: imagenPath,
            imagen_thumb_path: imagenThumbPath,
            bool1: row.bool1,
            bool2: row.bool2,
            bool3: row.bool3,
            lugar: row.lugar || null,
            posicion: row.posicion || null,
            visual: row.visual || null
          })

          this.progress.done++
        }

        const { error } = await supabase.from('personas').insert(payloads)
        if (error) throw error

        this.$emit('imported')
      } catch (err) {
        this.errorMsg = 'Error al importar: ' + (err.message || err)
        this.step = 'preview'
      }
    }
  }
}
</script>
