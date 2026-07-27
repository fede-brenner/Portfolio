<template>
  <div class="text-white text-left relative">
    <button
      type="button"
      class="pixel-corners-sm absolute -top-2 -right-2 w-9 h-9 flex items-center justify-center bg-[#1c1d22] text-[#888888] hover:bg-[#2a2b31] hover:text-white transition-colors"
      @click="$emit('close')"
    >
      <svg width="20" height="20" viewBox="0 0 5 5" shape-rendering="crispEdges" fill="currentColor">
        <rect x="0" y="0" width="1" height="1" />
        <rect x="4" y="0" width="1" height="1" />
        <rect x="1" y="1" width="1" height="1" />
        <rect x="3" y="1" width="1" height="1" />
        <rect x="2" y="2" width="1" height="1" />
        <rect x="1" y="3" width="1" height="1" />
        <rect x="3" y="3" width="1" height="1" />
        <rect x="0" y="4" width="1" height="1" />
        <rect x="4" y="4" width="1" height="1" />
      </svg>
    </button>

    <div class="identidad-row gap-x-4 mb-4">
      <div class="identidad-image">
        <img
          v-if="persona.imagen_signed_url"
          :src="persona.imagen_signed_url"
          alt=""
          class="pixel-corners-sm w-28 h-28 object-cover"
        />
        <div v-else class="pixel-corners-sm bg-[#5D42A9] p-px w-28 h-28">
          <div class="pixel-corners-sm bg-[#131418] w-full h-full flex items-center justify-center text-3xl">
            🖼️
          </div>
        </div>
      </div>

      <div class="identidad-grid">
          <div class="identidad-nombre">
            <h2 class="text-2xl font-bold">{{ persona.nombre }}</h2>
          </div>
    
          <div class="identidad-instagram text-sm">
            <a
              v-if="persona.instagram"
              :href="instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 hover:text-[#8B6FD6] transition-colors"
            >
              <InstagramIcon /> {{ persona.instagram }} <PixelExternalLink />
            </a>
            <span v-else class="text-[#888888]">—</span>
          </div>
    
          <div class="identidad-edad text-sm">
            {{ persona.edad ?? '—' }}{{ persona.edad_aproximada ? '≈' : '' }} {{ persona.edad ? ' años' : '' }}
          </div>
    
          <div class="identidad-pais text-sm">
            <PaisFlag :pais="persona.pais" :probable="persona.pais_probable" />
          </div>
      </div>
    </div>

    <h3 class="text-xs font-bold text-[#8B6FD6] uppercase tracking-wide mb-2 pb-1 border-b border-[#2a2b31]">
      Ubicación y fecha
    </h3>
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
      <div>
        <dt class="text-[#888888]">📍 Barrio</dt>
        <dd>
          <a
            v-if="barrioMapsUrl"
            :href="barrioMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 hover:text-[#8B6FD6] transition-colors"
          >
            {{ persona.barrio }} <PixelExternalLink />
          </a>
          <span v-else>—</span>
        </dd>
      </div>
      <div>
        <dt class="text-[#888888]">📌 Lugar</dt>
        <dd>{{ persona.lugar || '—' }}</dd>
      </div>
      <div>
        <dt class="text-[#888888]">📅 Fecha</dt>
        <dd>{{ persona.fecha || '—' }}</dd>
      </div>
    </dl>

    <h3 class="text-xs font-bold text-[#8B6FD6] uppercase tracking-wide mb-2 pb-1 border-b border-[#2a2b31]">
      Perfil físico
    </h3>
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
      <div>
        <dt class="text-[#888888]">💇 Color de pelo</dt>
        <dd>{{ persona.color_pelo || '—' }}</dd>
      </div>
      <div>
        <dt class="text-[#888888]">👀 Visual</dt>
        <dd>{{ persona.visual || '—' }}</dd>
      </div>
    </dl>

    <h3 class="text-xs font-bold text-[#8B6FD6] uppercase tracking-wide mb-2 pb-1 border-b border-[#2a2b31]">
      Detalles
    </h3>
    <dl class="text-sm mb-3">
      <dt class="text-[#888888]">🔀 Posicion</dt>
      <dd>{{ persona.posicion || '—' }}</dd>
    </dl>

    <div class="flex gap-6 mb-3 text-sm">
      <div class="flex items-center gap-2">
        <ToggleSwitch :model-value="!!persona.bool1" disabled />
        {{ BOOL_LABELS.bool1 }}
      </div>
      <div class="flex items-center gap-2">
        <ToggleSwitch :model-value="!!persona.bool2" disabled />
        {{ BOOL_LABELS.bool2 }}
      </div>
      <div class="flex items-center gap-2">
        <ToggleSwitch :model-value="!!persona.bool3" disabled />
        {{ BOOL_LABELS.bool3 }}
      </div>
    </div>

    <div v-if="persona.descripcion" class="mb-4">
      <p class="text-[#888888] text-sm mb-1">📝 Descripcion</p>
      <p class="text-sm whitespace-pre-line text-justify">{{ persona.descripcion }}</p>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <button type="button" class="text-red-400 font-bold py-2 px-4" @click="$emit('delete', persona)">
        Eliminar
      </button>
      <button type="button" class="pixel-corners-sm bg-[#5D42A9] py-2 px-4 font-bold" @click="$emit('edit', persona)">
        Editar
      </button>
    </div>
  </div>
</template>

<script>
import { BOOL_LABELS } from '@/config/personaOptions'
import PaisFlag from './PaisFlag.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import InstagramIcon from './icons/InstagramIcon.vue'
import PixelExternalLink from './icons/PixelExternalLink.vue'

export default {
  name: 'PersonaProfile',
  components: { PaisFlag, ToggleSwitch, InstagramIcon, PixelExternalLink },
  props: {
    persona: { type: Object, required: true }
  },
  emits: ['close', 'edit', 'delete'],
  data() {
    return { BOOL_LABELS }
  },
  computed: {
    instagramUrl() {
      const handle = this.persona.instagram?.replace(/^@/, '').trim()
      return `https://instagram.com/${encodeURIComponent(handle)}`
    },
    barrioMapsUrl() {
      const p = this.persona
      if (p.barrio_lat != null && p.barrio_lng != null) {
        return `https://www.google.com/maps/search/?api=1&query=${p.barrio_lat},${p.barrio_lng}`
      }
      if (p.barrio) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.barrio)}`
      }
      return null
    }
  }
}
</script>

<style scoped>
/* Fila Identidad: imagen a la izquierda, y a la derecha un stack vertical
   (nombre, instagram, edad, pais) en .identidad-grid. Ya no hace falta
   grid-template-areas: la imagen es un hermano de ese stack, no parte de el. */
.identidad-row {
  display: flex;
  align-items: flex-start;
}

.identidad-grid {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
