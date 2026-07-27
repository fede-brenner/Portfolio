<template>
  <div>
    <div class="flex items-center justify-between gap-3 mb-4 flex-wrap">
      <div class="pixel-corners-sm bg-[#2a2b31] focus-within:bg-[#5D42A9] p-px flex-1 min-w-[200px] max-w-xs h-10">
        <div class="pixel-corners-sm w-full h-full bg-[#131418] flex items-center gap-2 px-3">
          <PixelSearchIcon class="text-[#888888] flex-shrink-0" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar personas..."
            class="flex-1 min-w-0 h-full bg-transparent text-sm text-white placeholder-[#888888] outline-none"
          />
          <button
            v-if="searchQuery"
            type="button"
            title="Limpiar búsqueda"
            class="flex-shrink-0 text-[#888888] hover:text-white transition-colors"
            @click="searchQuery = ''"
          >
            <svg width="15" height="15" viewBox="0 0 5 5" shape-rendering="crispEdges" fill="currentColor">
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
        </div>
      </div>
      <div class="flex gap-2">
        <div class="relative" ref="columnPicker">
          <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px h-10">
            <button
              class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors text-white font-bold h-full px-3 flex items-center justify-center"
              title="Columnas"
              @click="showColumnPicker = !showColumnPicker"
            >
              <PropertiesIcon class="w-5 h-5" />
            </button>
          </div>
          <div
            v-if="showColumnPicker"
            class="absolute top-full right-0 mt-2 z-20 bg-[#1c1d22] border border-[#5D42A9] rounded p-3 text-left text-sm w-64"
          >
            <div class="flex items-center gap-2 py-1 mb-1 pb-2 border-b border-[#2a2b31]">
              <ToggleSwitch v-model="showNumberColumn" />
              <span class="flex-1">Número</span>
            </div>
            <div
              v-for="(key, index) in columnOrder"
              :key="key"
              draggable="true"
              class="flex items-center gap-2 py-1 cursor-move"
              :class="{ 'opacity-40': dragIndex === index }"
              @dragstart="onDragStart(index)"
              @dragover.prevent="onDragOver(index)"
              @dragend="onDragEnd"
              @drop.prevent
            >
              <span class="text-[#888888]">⠿</span>
              <ToggleSwitch
                :model-value="visibleColumns.includes(key)"
                @update:model-value="toggleColumnVisible(key)"
              />
              <span class="flex-1">{{ columnLabel(key) }}</span>
            </div>
          </div>
        </div>
        <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px h-10">
          <button
            class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors text-white font-bold h-full px-4 flex items-center gap-2"
            @click="showImport = true"
          >
            <ImportIcon class="w-5 h-5" /> Importar
          </button>
        </div>
        <button
          class="pixel-corners-sm bg-[#5D42A9] hover:opacity-90 text-white font-bold h-10 px-4"
          @click="openCreate"
        >
          + Agregar persona
        </button>
      </div>
    </div>

    <p v-if="loading" class="text-[#888888]">Cargando personas...</p>
    <p v-else-if="!personas.length" class="text-[#888888]">Todavía no agregaste a nadie.</p>
    <p v-else-if="!sortedPersonas.length" class="text-[#888888]">
      No se encontraron personas para "{{ searchQuery }}".
    </p>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-[#5D42A9] text-[#888888]">
            <th v-if="showNumberColumn" class="py-2 pr-3">Nº</th>
            <th
              v-for="col in activeColumns"
              :key="col.key"
              class="py-2 pr-3"
              :class="{ 'cursor-pointer select-none hover:text-white': col.key !== 'imagen' }"
              @click="col.key !== 'imagen' && setSort(col.key)"
            >
              {{ col.label }}<PixelTriangle
                v-if="sortKey === col.key"
                :direction="sortDir === 'asc' ? 'up' : 'down'"
                class="ml-1"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(persona, index) in sortedPersonas"
            :key="persona.id"
            class="border-b border-[#2a2b31] cursor-pointer hover:bg-[#1c1d22]"
            @click="openProfile(persona)"
          >
            <td v-if="showNumberColumn" class="py-2 pr-3 text-[#888888]">{{ index + 1 }}</td>
            <td v-for="col in activeColumns" :key="col.key" class="py-2 pr-3">
              <img
                v-if="col.key === 'imagen' && persona.imagen_signed_url"
                :src="persona.imagen_signed_url"
                alt=""
                class="pixel-corners-sm w-10 h-10 object-cover"
              />
              <PaisFlag
                v-else-if="col.key === 'pais'"
                :pais="persona.pais"
                :probable="persona.pais_probable"
              />
              <template v-else-if="col.key === 'edad'">{{ persona.edad }}{{ persona.edad_aproximada ? '≈' : '' }}</template>
              <ToggleSwitch
                v-else-if="['bool1', 'bool2', 'bool3'].includes(col.key)"
                :model-value="!!persona[col.key]"
                disabled
              />
              <a
                v-else-if="col.key === 'instagram' && persona.instagram"
                :href="instagramUrl(persona)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 hover:text-[#8B6FD6] transition-colors"
                @click.stop
              >
                {{ persona.instagram }}
                <PixelExternalLink />
              </a>
              <a
                v-else-if="col.key === 'barrio' && barrioMapsUrl(persona)"
                :href="barrioMapsUrl(persona)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 hover:text-[#8B6FD6] transition-colors"
                @click.stop
              >
                {{ persona.barrio }}
                <PixelExternalLink />
              </a>
              <template v-else>{{ persona[col.key] }}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      @click.self="closeForm"
    >
      <div class="pixel-corners-sm bg-[#1c1d22] p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <PersonaForm
          :persona="editingPersona"
          @saved="onSaved"
          @cancel="closeForm"
        />
      </div>
    </div>

    <div
      v-if="showImport"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      @click.self="showImport = false"
    >
      <div class="pixel-corners-sm bg-[#1c1d22] p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <PersonaImportModal
          @imported="onImported"
          @cancel="showImport = false"
        />
      </div>
    </div>

    <div
      v-if="viewingPersona"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      @click.self="viewingPersona = null"
    >
      <div class="pixel-corners-sm bg-[#1c1d22] p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <PersonaProfile
          :persona="viewingPersona"
          @close="viewingPersona = null"
          @edit="openEditFromProfile"
          @delete="removeFromProfile"
        />
      </div>
    </div>

    <div class="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
      <div v-if="!atPageTop" class="pixel-corners-sm bg-[#5D42A9] p-px">
        <button
          type="button"
          title="Subir al principio"
          class="pixel-corners-sm bg-[#1c1d22] hover:bg-[#2a2b31] transition-colors text-white w-10 h-10 flex items-center justify-center"
          @click="scrollToTop"
        >
          <ArrowUpIcon />
        </button>
      </div>
      <div v-if="!atPageBottom" class="pixel-corners-sm bg-[#5D42A9] p-px">
        <button
          type="button"
          title="Bajar al final"
          class="pixel-corners-sm bg-[#1c1d22] hover:bg-[#2a2b31] transition-colors text-white w-10 h-10 flex items-center justify-center"
          @click="scrollToBottom"
        >
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import PersonaForm from './PersonaForm.vue'
import PersonaProfile from './PersonaProfile.vue'
import PaisFlag from './PaisFlag.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import ImportIcon from './icons/ImportIcon.vue'
import PropertiesIcon from './icons/PropertiesIcon.vue'
import PixelTriangle from './icons/PixelTriangle.vue'
import PixelExternalLink from './icons/PixelExternalLink.vue'
import PixelSearchIcon from './icons/PixelSearchIcon.vue'
import ArrowUpIcon from './icons/ArrowUpIcon.vue'
import ArrowDownIcon from './icons/ArrowDownIcon.vue'
import { BOOL_LABELS } from '@/config/personaOptions'

const PersonaImportModal = defineAsyncComponent(() => import('./PersonaImportModal.vue'))

const COLUMN_DEFS = [
  { key: 'imagen', label: 'Imagen' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'pais', label: 'Pais' },
  { key: 'edad', label: 'Edad' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'descripcion', label: 'Descripcion' },
  { key: 'barrio', label: 'Barrio' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'color_pelo', label: 'Color de pelo' },
  { key: 'lugar', label: 'Lugar' },
  { key: 'posicion', label: 'Posicion' },
  { key: 'visual', label: 'Visual' },
  { key: 'bool1', label: BOOL_LABELS.bool1 },
  { key: 'bool2', label: BOOL_LABELS.bool2 },
  { key: 'bool3', label: BOOL_LABELS.bool3 }
]
const ALL_KEYS = COLUMN_DEFS.map((c) => c.key)
const DEFAULT_VISIBLE = ['imagen', 'nombre', 'pais', 'edad', 'barrio', 'instagram', 'fecha']
const STORAGE_KEY = 'personasColumnPrefs'
const OLD_STORAGE_KEY = 'personasVisibleColumns'

// Campos de texto libre sobre los que busca el buscador (no tiene sentido
// incluir booleans/fecha/imagen ahí).
const SEARCHABLE_FIELDS = [
  'nombre', 'edad', 'fecha', 'pais', 'descripcion', 'barrio', 'instagram', 'color_pelo', 'lugar', 'posicion', 'visual'
]

function compareValues(a, b) {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (typeof a === 'boolean' || typeof b === 'boolean') {
    return a === b ? 0 : a ? 1 : -1
  }
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'es', { sensitivity: 'base' })
}

function loadColumnPrefs() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (raw && Array.isArray(raw.order) && Array.isArray(raw.visible)) {
      const order = raw.order.filter((k) => ALL_KEYS.includes(k))
      ALL_KEYS.forEach((k) => {
        if (!order.includes(k)) order.push(k)
      })
      const visible = raw.visible.filter((k) => ALL_KEYS.includes(k))
      const showNumber = typeof raw.showNumber === 'boolean' ? raw.showNumber : true
      return { order, visible: visible.length ? visible : [...DEFAULT_VISIBLE], showNumber }
    }

    // Migración del formato viejo (solo un array de columnas visibles, sin orden propio).
    const oldRaw = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY))
    if (Array.isArray(oldRaw)) {
      const visible = oldRaw.filter((k) => ALL_KEYS.includes(k))
      return { order: [...ALL_KEYS], visible: visible.length ? visible : [...DEFAULT_VISIBLE], showNumber: true }
    }
  } catch {
    // ignorar y usar default
  }
  return { order: [...ALL_KEYS], visible: [...DEFAULT_VISIBLE], showNumber: true }
}

export default {
  name: 'PersonasList',
  components: { PersonaForm, PersonaProfile, PaisFlag, ToggleSwitch, PersonaImportModal, ImportIcon, PropertiesIcon, PixelTriangle, PixelExternalLink, PixelSearchIcon, ArrowUpIcon, ArrowDownIcon },
  props: {
    personas: { type: Array, required: true },
    loading: { type: Boolean, default: false }
  },
  emits: ['refresh', 'persona-saved', 'persona-deleted'],
  data() {
    const prefs = loadColumnPrefs()
    return {
      showForm: false,
      showImport: false,
      showColumnPicker: false,
      editingPersona: null,
      viewingPersona: null,
      COLUMN_DEFS,
      columnOrder: prefs.order,
      visibleColumns: prefs.visible,
      showNumberColumn: prefs.showNumber,
      searchQuery: '',
      sortKey: 'fecha',
      sortDir: 'asc',
      dragIndex: null,
      atPageTop: true,
      atPageBottom: true
    }
  },
  computed: {
    activeColumns() {
      return this.columnOrder
        .filter((key) => this.visibleColumns.includes(key))
        .map((key) => COLUMN_DEFS.find((c) => c.key === key))
    },
    searchedPersonas() {
      const query = this.searchQuery.trim().toLowerCase()
      if (!query) return this.personas
      return this.personas.filter((p) =>
        SEARCHABLE_FIELDS.some((field) => String(p[field] || '').toLowerCase().includes(query))
      )
    },
    sortedPersonas() {
      const arr = [...this.searchedPersonas]
      arr.sort((a, b) => {
        const cmp = compareValues(a[this.sortKey], b[this.sortKey])
        return this.sortDir === 'asc' ? cmp : -cmp
      })
      return arr
    }
  },
  watch: {
    columnOrder: {
      handler() {
        this.savePrefs()
      },
      deep: true
    },
    visibleColumns: {
      handler() {
        this.savePrefs()
      },
      deep: true
    },
    showNumberColumn() {
      this.savePrefs()
    },
    personas() {
      this.$nextTick(this.checkPageScroll)
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
    window.addEventListener('scroll', this.checkPageScroll, { passive: true })
    window.addEventListener('resize', this.checkPageScroll)
    this.checkPageScroll()
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
    window.removeEventListener('scroll', this.checkPageScroll)
    window.removeEventListener('resize', this.checkPageScroll)
  },
  methods: {
    checkPageScroll() {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight
      this.atPageTop = scrollY <= 4
      this.atPageBottom = scrollY + viewportHeight >= fullHeight - 4
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollToBottom() {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    },
    instagramUrl(persona) {
      const handle = persona.instagram?.replace(/^@/, '').trim()
      return `https://instagram.com/${encodeURIComponent(handle)}`
    },
    barrioMapsUrl(persona) {
      if (persona.barrio_lat != null && persona.barrio_lng != null) {
        return `https://www.google.com/maps/search/?api=1&query=${persona.barrio_lat},${persona.barrio_lng}`
      }
      if (persona.barrio) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(persona.barrio)}`
      }
      return null
    },
    setSort(key) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortDir = 'asc'
      }
    },
    handleOutsideClick(event) {
      const wrapper = this.$refs.columnPicker
      if (wrapper && !wrapper.contains(event.target)) {
        this.showColumnPicker = false
      }
    },
    columnLabel(key) {
      return COLUMN_DEFS.find((c) => c.key === key)?.label || key
    },
    toggleColumnVisible(key) {
      this.visibleColumns = this.visibleColumns.includes(key)
        ? this.visibleColumns.filter((k) => k !== key)
        : [...this.visibleColumns, key]
    },
    onDragStart(index) {
      this.dragIndex = index
    },
    onDragOver(index) {
      if (this.dragIndex === null || this.dragIndex === index) return
      const order = [...this.columnOrder]
      const [moved] = order.splice(this.dragIndex, 1)
      order.splice(index, 0, moved)
      this.columnOrder = order
      this.dragIndex = index
    },
    onDragEnd() {
      this.dragIndex = null
    },
    savePrefs() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          order: this.columnOrder,
          visible: this.visibleColumns,
          showNumber: this.showNumberColumn
        })
      )
    },
    openCreate() {
      this.editingPersona = null
      this.showForm = true
    },
    openEdit(persona) {
      this.editingPersona = persona
      this.showForm = true
    },
    openProfile(persona) {
      this.viewingPersona = persona
    },
    openEditFromProfile(persona) {
      this.viewingPersona = null
      this.openEdit(persona)
    },
    closeForm() {
      this.showForm = false
      this.editingPersona = null
    },
    onSaved(persona) {
      this.closeForm()
      this.$emit('persona-saved', persona)
    },
    onImported() {
      this.showImport = false
      this.$emit('refresh')
    },
    async removeFromProfile(persona) {
      if (!confirm(`¿Eliminar a ${persona.nombre}?`)) return
      if (persona.imagen_path) {
        await supabase.storage.from('personas-imagenes').remove([persona.imagen_path])
      }
      await supabase.from('personas').delete().eq('id', persona.id)
      this.viewingPersona = null
      this.$emit('persona-deleted', persona.id)
    }
  }
}
</script>
