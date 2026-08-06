<template>
  <form class="text-white text-left" @submit.prevent="save">
    <h2 class="text-xl font-bold mb-4">{{ persona ? 'Editar persona' : 'Nueva persona' }}</h2>

    <div class="identidad-grid gap-x-4 gap-y-2 mb-3">
      <div class="identidad-image relative cursor-pointer group" @click="$refs.fileInput.click()">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt=""
          class="pixel-corners-sm w-28 h-28 object-cover"
        />
        <div v-else class="pixel-corners-sm bg-[#5D42A9] p-px w-28 h-28">
          <div class="pixel-corners-sm bg-[#131418] w-full h-full flex items-center justify-center text-3xl">
            🖼️
          </div>
        </div>
        <div
          class="pixel-corners-sm absolute inset-0 w-28 bg-black/60 flex items-center justify-center text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          ✎
        </div>
      </div>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />

      <label class="identidad-nombre flex flex-col text-sm">
        👤 Nombre
        <div class="pixel-corners-sm bg-[#5D42A9] p-px">
          <input v-model="form.nombre" required class="pixel-corners-sm w-full bg-[#131418] px-2 py-1 text-left" />
        </div>
      </label>

      <label class="identidad-instagram flex flex-col text-sm">
        <span class="flex items-center gap-1"><InstagramIcon /> Instagram</span>
        <div class="pixel-corners-sm bg-[#5D42A9] p-px">
          <input v-model="form.instagram" class="pixel-corners-sm w-full bg-[#131418] px-2 py-1" />
        </div>
      </label>

      <label class="identidad-edad flex flex-col text-sm">
        🎂 Edad
        <div class="flex gap-1">
          <div class="pixel-corners-sm bg-[#5D42A9] p-px w-20">
            <input v-model.number="form.edad" type="number" min="0" required class="pixel-corners-sm w-full bg-[#131418] px-2 py-1" />
          </div>
          <IconToggle v-model="form.edad_aproximada" title="Edad aproximada" />
        </div>
      </label>

      <label class="identidad-pais flex flex-col text-sm">
        🌍 Pais
        <div class="flex gap-1 items-stretch">
          <div class="flex-1">
            <SearchableSelect
              v-model="form.pais"
              :options="PAIS_OPTIONS"
              :flags="PAIS_FLAG_CODES"
              placeholder="Buscar pais..."
              required
            />
          </div>
          <IconToggle v-model="form.pais_probable" title="No estoy seguro (probable)" />
        </div>
      </label>
    </div>

    <h3 class="text-xs font-bold text-[#8B6FD6] uppercase tracking-wide mb-2 pb-1 border-b border-[#2a2b31]">
      Ubicación y fecha
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
      <label class="flex flex-col text-sm">
        📍 Barrio
        <BarrioSelect
          v-model="form.barrio"
          @update:coords="onBarrioCoords"
        />
      </label>

      <label class="flex flex-col text-sm">
        📌 Lugar
        <div class="pixel-corners-sm bg-[#5D42A9] p-px">
          <select v-model="form.lugar" class="pixel-corners-sm w-full bg-[#131418] px-2 py-1">
            <option value="" disabled>Elegir...</option>
            <option v-for="opt in LUGAR_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
      </label>

      <label class="flex flex-col text-sm">
        📅 Fecha
        <div class="pixel-corners-sm bg-[#5D42A9] p-px">
          <input v-model="form.fecha" type="date" required class="pixel-corners-sm w-full bg-[#131418] px-2 py-1" />
        </div>
      </label>
    </div>

    <h3 class="text-xs font-bold text-[#8B6FD6] uppercase tracking-wide mb-2 pb-1 border-b border-[#2a2b31]">
      Perfil físico
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
      <label class="flex flex-col text-sm">
        💇 Color de pelo
        <div class="pixel-corners-sm bg-[#5D42A9] p-px">
          <select v-model="form.color_pelo" class="pixel-corners-sm w-full bg-[#131418] px-2 py-1">
            <option value="" disabled>Elegir...</option>
            <option v-for="opt in COLOR_PELO_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
      </label>

      <label class="flex flex-col text-sm">
        👀 Visual
        <div class="pixel-corners-sm bg-[#5D42A9] p-px">
          <select v-model="form.visual" class="pixel-corners-sm w-full bg-[#131418] px-2 py-1">
            <option value="" disabled>Elegir...</option>
            <option v-for="opt in VISUAL_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
      </label>
    </div>

    <h3 class="text-xs font-bold text-[#8B6FD6] uppercase tracking-wide mb-2 pb-1 border-b border-[#2a2b31]">
      Detalles
    </h3>
    <label class="flex flex-col text-sm mb-2">
      🔀 Posicion mia
      <div class="pixel-corners-sm bg-[#5D42A9] p-px">
        <select v-model="form.posicion" class="pixel-corners-sm w-full bg-[#131418] px-2 py-1">
          <option value="" disabled>Elegir...</option>
          <option v-for="opt in POSICION_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
    </label>

    <label class="flex flex-col text-sm mb-3">
      ⭐ Rating
      <StarRating v-model="form.rating" show-value size="lg" />
    </label>

    <div class="flex gap-6 mb-3">
      <label class="flex items-center gap-2 text-sm">
        <ToggleSwitch v-model="form.bool1" />
        {{ BOOL_LABELS.bool1 }}
      </label>
      <label class="flex items-center gap-2 text-sm">
        <ToggleSwitch v-model="form.bool2" />
        {{ BOOL_LABELS.bool2 }}
      </label>
      <label class="flex items-center gap-2 text-sm">
        <ToggleSwitch v-model="form.bool3" />
        {{ BOOL_LABELS.bool3 }}
      </label>
    </div>

    <label class="flex flex-col text-sm mb-3">
      📝 Descripcion
      <div class="pixel-corners-sm bg-[#5D42A9] p-px">
        <textarea v-model="form.descripcion" rows="3" class="pixel-corners-sm w-full bg-[#131418] px-2 py-1"></textarea>
      </div>
    </label>

    <p v-if="errorMsg" class="text-red-400 text-sm mt-2">{{ errorMsg }}</p>

    <div class="flex justify-end gap-2 mt-4">
      <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px">
        <button type="button" class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors py-2 px-4" @click="$emit('cancel')">
          Cancelar
        </button>
      </div>
      <button type="submit" class="pixel-corners-sm bg-[#5D42A9] py-2 px-4 font-bold" :disabled="saving">
        {{ saving ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>
  </form>
</template>

<script>
import { supabase } from '@/lib/supabaseClient'
import { getCachedSignedUrl, invalidateCachedSignedUrl } from '@/lib/signedUrlCache'
import { compressImageToWebp, generateThumbnail } from '@/lib/imageCompression'
import SearchableSelect from './SearchableSelect.vue'
import BarrioSelect from './BarrioSelect.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import IconToggle from './IconToggle.vue'
import StarRating from './StarRating.vue'
import InstagramIcon from './icons/InstagramIcon.vue'
import {
  PAIS_OPTIONS,
  PAIS_FLAG_CODES,
  COLOR_PELO_OPTIONS,
  LUGAR_OPTIONS,
  POSICION_OPTIONS,
  VISUAL_OPTIONS,
  BOOL_LABELS
} from '@/config/personaOptions'

const BUCKET = 'personas-imagenes'

// Fecha local (no UTC) para que no se corra un día según la hora/zona
// horaria, a diferencia de lo que haría new Date().toISOString().
function todayISO() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function emptyForm() {
  return {
    nombre: '',
    pais: '',
    pais_probable: false,
    fecha: todayISO(),
    edad: null,
    edad_aproximada: false,
    descripcion: '',
    barrio: '',
    barrio_lat: null,
    barrio_lng: null,
    instagram: '',
    color_pelo: '',
    lugar: '',
    posicion: '',
    visual: '',
    rating: 0,
    bool1: true,
    bool2: false,
    bool3: false
  }
}

export default {
  name: 'PersonaForm',
  components: { SearchableSelect, BarrioSelect, ToggleSwitch, IconToggle, StarRating, InstagramIcon },
  props: {
    persona: { type: Object, default: null }
  },
  emits: ['saved', 'cancel'],
  data() {
    return {
      // rating puede venir null desde la DB (personas viejas, sin rating
      // cargado); StarRating espera un Number, así que se normaliza a 0 acá
      // en vez de dejar que el spread de abajo pise el default de emptyForm().
      form: this.persona
        ? { ...emptyForm(), ...this.persona, rating: this.persona.rating || 0 }
        : emptyForm(),
      imageFile: null,
      previewUrl: this.persona?.imagen_signed_url || null,
      saving: false,
      errorMsg: '',
      PAIS_OPTIONS,
      PAIS_FLAG_CODES,
      COLOR_PELO_OPTIONS,
      LUGAR_OPTIONS,
      POSICION_OPTIONS,
      VISUAL_OPTIONS,
      BOOL_LABELS
    }
  },
  methods: {
    onBarrioCoords({ lat, lng }) {
      this.form.barrio_lat = lat
      this.form.barrio_lng = lng
    },
    async onFileChange(event) {
      const file = event.target.files[0]
      if (!file) return
      this.imageFile = await compressImageToWebp(file)
      this.previewUrl = URL.createObjectURL(this.imageFile)
    },
    async save() {
      this.saving = true
      this.errorMsg = ''
      try {
        let imagenPath = this.persona?.imagen_path || null
        let imagenThumbPath = this.persona?.imagen_thumb_path || null

        if (this.imageFile) {
          const path = `${Date.now()}-${this.imageFile.name}`
          const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(path, this.imageFile, { cacheControl: '31536000' })
          if (uploadError) throw uploadError
          imagenPath = path

          const thumb = await generateThumbnail(this.imageFile)
          if (thumb) {
            const thumbPath = `thumb-${Date.now()}-${thumb.name}`
            const { error: thumbUploadError } = await supabase.storage
              .from(BUCKET)
              .upload(thumbPath, thumb, { cacheControl: '31536000' })
            if (thumbUploadError) throw thumbUploadError
            imagenThumbPath = thumbPath
          }
        }

        const payload = {
          nombre: this.form.nombre,
          pais: this.form.pais || null,
          pais_probable: !!this.form.pais_probable,
          fecha: this.form.fecha || null,
          edad: this.form.edad || null,
          edad_aproximada: !!this.form.edad_aproximada,
          descripcion: this.form.descripcion || null,
          barrio: this.form.barrio || null,
          barrio_lat: this.form.barrio_lat,
          barrio_lng: this.form.barrio_lng,
          instagram: this.form.instagram || null,
          color_pelo: this.form.color_pelo || null,
          imagen_path: imagenPath,
          imagen_thumb_path: imagenThumbPath,
          bool1: !!this.form.bool1,
          bool2: !!this.form.bool2,
          bool3: !!this.form.bool3,
          lugar: this.form.lugar || null,
          posicion: this.form.posicion || null,
          visual: this.form.visual || null,
          rating: this.form.rating || null
        }

        const query = this.persona
          ? supabase.from('personas').update(payload).eq('id', this.persona.id).select().single()
          : supabase.from('personas').insert(payload).select().single()

        const { data, error } = await query
        if (error) throw error

        let imagen_signed_url = null
        if (data.imagen_path) {
          if (this.imageFile) invalidateCachedSignedUrl(BUCKET, data.imagen_path)
          imagen_signed_url = await getCachedSignedUrl(supabase, BUCKET, data.imagen_path)
        }

        let imagen_thumb_signed_url = null
        if (data.imagen_thumb_path) {
          if (this.imageFile) invalidateCachedSignedUrl(BUCKET, data.imagen_thumb_path)
          imagen_thumb_signed_url = await getCachedSignedUrl(supabase, BUCKET, data.imagen_thumb_path)
        }

        this.$emit('saved', { ...data, imagen_signed_url, imagen_thumb_signed_url })
      } catch (err) {
        this.errorMsg = err.message || 'Error al guardar'
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped>
/* En mobile, la Identidad va en una sola columna en este orden: imagen,
   nombre, instagram, edad, pais (menos ancho disponible). En sm+ pasa a 2
   columnas: la imagen y edad comparten el ancho de la columna 1 (auto, la
   fija el w-28 de la imagen), nombre/instagram/pais comparten la columna 2. */
.identidad-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'image'
    'nombre'
    'instagram'
    'edad'
    'pais';
}

@media (min-width: 640px) {
  .identidad-grid {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'image nombre'
      'image instagram'
      'edad pais';
  }
}

.identidad-image {
  grid-area: image;
  align-self: start;
}

.identidad-nombre {
  grid-area: nombre;
}

.identidad-instagram {
  grid-area: instagram;
}

.identidad-edad {
  grid-area: edad;
}

.identidad-pais {
  grid-area: pais;
}
</style>
