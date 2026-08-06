<template>
  <div>
    <div class="flex items-center gap-3 mb-4 flex-wrap w-full">
      <div class="pixel-corners-sm bg-[#2a2b31] focus-within:bg-[#5D42A9] p-px flex-1 w-full h-10">
        <div class="pixel-corners-sm w-full h-full bg-[#131418] flex items-center gap-2 px-3">
          <PixelSearchIcon class="text-[#888888] flex-shrink-0" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar personas..."
            class="flex-1 h-full bg-transparent text-sm text-white placeholder-[#888888] outline-none"
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
            class="absolute top-full left-auto right-0 mt-2 z-20 bg-[#1c1d22] border border-[#5D42A9] rounded p-3 text-left text-sm w-64 max-w-[calc(100vw-2rem)]"
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
      <div class="pixel-corners-sm bg-[#5D42A9] p-px h-10 hidden sm:inline-block">
            <button
            class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors text-white h-full px-3 flex items-center gap-2 disabled:opacity-60"
            title="Recomprimir a WebP las imágenes ya subidas"
            :disabled="migratingImages"
            @click="startImageMigration"
            >
            <svg v-if="!migratingImages" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M4 18h2v2h6v2H4v-2H2v-8h2v6Zm16 4h-4v-2h4v2Zm-6-2h-2v-2h-2v-2h2v-4h2v8Zm8 0h-2v-2h2v2ZM8 18H6v-2h2v2Zm2-2H8v-2h2v2Zm12 0h-2v-5h2v5Zm-10-4H4v-2h8v2Zm4-2h-2V8h2v2Zm6-1h-2V6h-2V4h-3V2h7v7ZM4 8H2V4h2v4Zm14 0h-2V6h2v2ZM6 4H4V2h2v2Zm7 0H8V2h5v2Z"></path></svg>
            <span v-else>{{ `${migrationProgress.done}/${migrationProgress.total}...` }}</span>
            <span v-if="!migratingImages" class="hidden md:inline">Optimizar</span>
            </button>
        </div>
        <div class="pixel-corners-sm bg-[#5D42A9] p-px h-10 hidden sm:inline-block">
            <button
            class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors text-white h-full px-3 flex items-center gap-2"
            @click="showImport = true"
            >
            <ImportIcon class="w-5 h-5" /> <span class="hidden md:inline">Importar</span>
            </button>
        </div>
        <button
            class="pixel-corners-sm bg-[#5D42A9] hover:opacity-90 text-white h-10 px-4 text-xl sm:text-base flex flex-row gap-2 items-center"
            @click="openCreate"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
            <path d="M8 20h6v2H6v-2H4v-2h4v2Zm12-2h2v2h-2v2h-2v-2h-2v-2h2v-2h2v2ZM4 18H2V6h2v12Zm10 0H8v-2h6v2Zm0-4h-4v-2h4v2Zm8 0h-2V6h2v8Zm-12-2H8V8h2v4Zm6 0h-2V8h2v4Zm-2-4h-4V6h4v2ZM6 6H4V4h2v2Zm14 0h-2V4h2v2Zm-2-2H6V2h12v2Z"/>
            </svg>
            <span class="hidden sm:inline">Agregar</span>
        </button>
      </div>

    <div v-if="hasActiveColumnFilters" class="mb-3">
      <button
        type="button"
        class="pixel-corners-sm px-3 py-1 text-xs text-red-400 hover:text-red-300 transition-colors bg-[#1c1d22]"
        @click="clearColumnFilters"
      >
        ✕ Borrar todos los filtros
      </button>
    </div>

    <p v-if="loading" class="text-[#888888]">Cargando personas...</p>
    <p v-else-if="!personas.length" class="text-[#888888]">Todavía no agregaste a nadie.</p>
    <p v-else-if="!sortedPersonas.length" class="text-[#888888]">
      No se encontraron personas con los filtros aplicados.
    </p>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-[#5D42A9] text-[#888888]">
            <th v-if="showNumberColumn" class="py-2 pr-3">Nº</th>
            <th
              v-for="col in activeColumns"
              :key="col.key"
              class="py-2 pr-3 relative"
              :class="{ 'cursor-pointer select-none hover:text-white': col.key !== 'imagen' }"
              @click.stop="col.key !== 'imagen' && toggleColumnMenu(col.key, $event)"
            >
              <span>
                {{ col.label }}<PixelTriangle
                  v-if="sortKey === col.key"
                  :direction="sortDir === 'asc' ? 'up' : 'down'"
                  class="ml-1"
                /><svg
                  v-if="(columnFilters[col.key] || []).length"
                  width="10" height="10" viewBox="0 0 5 5" shape-rendering="crispEdges" fill="currentColor"
                  class="inline text-[#8B6FD6] ml-1 align-middle"
                >
                  <rect x="0" y="0" width="5" height="1" />
                  <rect x="1" y="1" width="3" height="1" />
                  <rect x="2" y="2" width="1" height="1" />
                  <rect x="2" y="3" width="1" height="1" />
                  <rect x="2" y="4" width="1" height="1" />
                </svg>
              </span>

              <Teleport to="body">
                <div
                  v-if="openColumnMenu === col.key"
                  class="fixed z-50 bg-[#1c1d22] border border-[#5D42A9] rounded p-3 text-left text-xs font-normal normal-case w-52 max-w-[calc(100vw-2rem)] cursor-default text-white"
                  :style="{ top: columnMenuPos.top + 'px', left: columnMenuPos.left + 'px', fontFamily: `'Retro Gaming', Helvetica, Arial, sans-serif` }"
                  @click.stop
                >
                  <button
                    type="button"
                    class="w-full text-left py-1 px-2 hover:bg-[#2a2b31] rounded flex items-center gap-2"
                    :class="sortKey === col.key && sortDir === 'asc' ? 'bg-[#5D42A9] text-white' : ''"
                    @click="applySort(col.key, 'asc')"
                  >
                    <PixelTriangle direction="up" /> Ordenar ascendente
                  </button>
                  <button
                    type="button"
                    class="w-full text-left py-1 px-2 hover:bg-[#2a2b31] rounded flex items-center gap-2 mb-2"
                    :class="sortKey === col.key && sortDir === 'desc' ? 'bg-[#5D42A9] text-white' : ''"
                    @click="applySort(col.key, 'desc')"
                  >
                    <PixelTriangle direction="down" /> Ordenar descendente
                  </button>

                  <div class="border-t border-[#2a2b31] pt-2 max-h-48 overflow-y-auto column-menu-scroll">
                    <label
                      v-for="opt in columnValueOptions(col.key)"
                      :key="String(opt.value)"
                      class="flex items-center gap-2 py-1 px-2 hover:bg-[#2a2b31] rounded cursor-pointer"
                    >
                      <ToggleSwitch
                        :model-value="(columnFilters[col.key] || []).includes(opt.value)"
                        @update:model-value="toggleColumnFilterValue(col.key, opt.value)"
                      />
                      <PaisFlag v-if="col.key === 'pais'" :pais="opt.label" class="flex-1 truncate" />
                      <span v-else class="flex-1 truncate">{{ opt.label }}</span>
                    </label>
                    <p v-if="!columnValueOptions(col.key).length" class="text-[#888888] px-2 py-1">Sin valores</p>
                  </div>
                </div>
              </Teleport>
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
                :src="persona.imagen_thumb_signed_url || persona.imagen_signed_url"
                alt=""
                loading="lazy"
                class="pixel-corners-sm w-10 h-10 object-cover"
              />
              <PaisFlag
                v-else-if="col.key === 'pais'"
                :pais="persona.pais"
                :probable="persona.pais_probable"
              />
              <template v-else-if="col.key === 'edad'">{{ persona.edad }}{{ persona.edad_aproximada ? '≈' : '' }}</template>
              <span v-else-if="col.key === 'nombre'" class="inline-flex items-center gap-1">
                {{ persona.nombre }}
                <span
                  v-if="duplicateIds.has(persona.id)"
                  title="Posible duplicado: mismo Instagram que otra persona"
                  class="text-yellow-400"
                >⚠️</span>
              </span>
              <ToggleSwitch
                v-else-if="['bool1', 'bool2', 'bool3'].includes(col.key)"
                :model-value="!!persona[col.key]"
                disabled
              />
              <StarRating
                v-else-if="col.key === 'rating'"
                :model-value="persona.rating || 0"
                readonly
              />
              <a
                v-else-if="col.key === 'instagram' && persona.instagram"
                :href="instagramUrl(persona)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 hover:text-[#8B6FD6] transition-colors"
                :title="persona.instagram"
                @click.stop
              >
                {{ truncate(persona.instagram, 15) }}
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
import { invalidateCachedSignedUrl } from '@/lib/signedUrlCache'
import { migrateExistingImages, needsWork } from '@/lib/imageMigration'
import PersonaForm from './PersonaForm.vue'
import PersonaProfile from './PersonaProfile.vue'
import PaisFlag from './PaisFlag.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import StarRating from './StarRating.vue'
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
  { key: 'imagen', label: 'Img.' },
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
  { key: 'rating', label: 'Rating' },
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
      const sortKey = ALL_KEYS.includes(raw.sortKey) ? raw.sortKey : 'fecha'
      const sortDir = raw.sortDir === 'desc' ? 'desc' : 'asc'
      const columnFilters = {}
      if (raw.columnFilters && typeof raw.columnFilters === 'object') {
        ALL_KEYS.forEach((k) => {
          if (Array.isArray(raw.columnFilters[k]) && raw.columnFilters[k].length) {
            columnFilters[k] = raw.columnFilters[k]
          }
        })
      }
      return { order, visible: visible.length ? visible : [...DEFAULT_VISIBLE], showNumber, sortKey, sortDir, columnFilters }
    }

    // Migración del formato viejo (solo un array de columnas visibles, sin orden propio).
    const oldRaw = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY))
    if (Array.isArray(oldRaw)) {
      const visible = oldRaw.filter((k) => ALL_KEYS.includes(k))
      return { order: [...ALL_KEYS], visible: visible.length ? visible : [...DEFAULT_VISIBLE], showNumber: true, sortKey: 'fecha', sortDir: 'asc', columnFilters: {} }
    }
  } catch {
    // ignorar y usar default
  }
  return { order: [...ALL_KEYS], visible: [...DEFAULT_VISIBLE], showNumber: true, sortKey: 'fecha', sortDir: 'asc', columnFilters: {} }
}

export default {
  name: 'PersonasList',
  components: { PersonaForm, PersonaProfile, PaisFlag, ToggleSwitch, StarRating, PersonaImportModal, ImportIcon, PropertiesIcon, PixelTriangle, PixelExternalLink, PixelSearchIcon, ArrowUpIcon, ArrowDownIcon },
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
      sortKey: prefs.sortKey,
      sortDir: prefs.sortDir,
      dragIndex: null,
      atPageTop: true,
      atPageBottom: true,
      migratingImages: false,
      migrationProgress: { done: 0, total: 0 },
      openColumnMenu: null,
      columnMenuPos: { top: 0, left: 0 },
      columnFilters: prefs.columnFilters
    }
  },
  computed: {
    activeColumns() {
      return this.columnOrder
        .filter((key) => this.visibleColumns.includes(key))
        .map((key) => COLUMN_DEFS.find((c) => c.key === key))
    },
    hasActiveColumnFilters() {
      return Object.values(this.columnFilters).some((arr) => Array.isArray(arr) && arr.length)
    },
    // Personas que comparten Instagram (normalizado) con alguna otra: se
    // calcula sobre la lista completa, no la filtrada, para que la marca de
    // duplicado no dependa de qué esté buscando/filtrando el usuario.
    duplicateIds() {
      const byInstagram = {}
      this.personas.forEach((p) => {
        const ig = (p.instagram || '').replace(/^@/, '').trim().toLowerCase()
        if (ig) {
          if (!byInstagram[ig]) byInstagram[ig] = []
          byInstagram[ig].push(p.id)
        }
      })
      const dup = new Set()
      Object.values(byInstagram).forEach((ids) => {
        if (ids.length > 1) ids.forEach((id) => dup.add(id))
      })
      return dup
    },
    searchedPersonas() {
      const query = this.searchQuery.trim().toLowerCase()
      if (!query) return this.personas
      return this.personas.filter((p) =>
        SEARCHABLE_FIELDS.some((field) => String(p[field] || '').toLowerCase().includes(query))
      )
    },
    filteredPersonas() {
      return this.searchedPersonas.filter((p) =>
        Object.entries(this.columnFilters).every(([key, values]) => {
          if (!values || !values.length) return true
          return values.includes(p[key])
        })
      )
    },
    sortedPersonas() {
      const arr = [...this.filteredPersonas]
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
    sortKey() {
      this.savePrefs()
    },
    sortDir() {
      this.savePrefs()
    },
    columnFilters: {
      handler() {
        this.savePrefs()
      },
      deep: true
    },
    personas() {
      this.$nextTick(this.checkPageScroll)
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
    window.addEventListener('scroll', this.checkPageScroll, { passive: true })
    window.addEventListener('scroll', this.closeColumnMenu, { passive: true })
    window.addEventListener('resize', this.checkPageScroll)
    window.addEventListener('resize', this.closeColumnMenu)
    this.checkPageScroll()
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
    window.removeEventListener('scroll', this.checkPageScroll)
    window.removeEventListener('scroll', this.closeColumnMenu)
    window.removeEventListener('resize', this.checkPageScroll)
    window.removeEventListener('resize', this.closeColumnMenu)
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
    // threshold: se corta cuando el texto supera esta cantidad de caracteres.
    // sliceLength: a cuántos caracteres se recorta antes de agregar "...".
    truncate(text, threshold, sliceLength = threshold - 1) {
      if (!text || text.length <= threshold) return text
      return text.slice(0, sliceLength) + '...'
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
    toggleColumnMenu(key, event) {
      if (this.openColumnMenu === key) {
        this.openColumnMenu = null
        return
      }
      const th = event.currentTarget.closest('th')
      const rect = th.getBoundingClientRect()
      const dropdownHeight = 320 // estimado (ordenar + hasta ~10 valores visibles)
      const dropdownWidth = 208 // w-52
      const openUpward = rect.bottom + dropdownHeight > window.innerHeight
      this.columnMenuPos = {
        top: openUpward ? Math.max(8, rect.top - dropdownHeight) : rect.bottom + 4,
        left: Math.min(rect.left, window.innerWidth - dropdownWidth - 16)
      }
      this.openColumnMenu = key
    },
    closeColumnMenu() {
      this.openColumnMenu = null
    },
    applySort(key, dir) {
      this.sortKey = key
      this.sortDir = dir
      this.openColumnMenu = null
    },
    columnValueOptions(key) {
      if (['bool1', 'bool2', 'bool3'].includes(key)) {
        return [{ value: true, label: 'Sí' }, { value: false, label: 'No' }]
      }
      const set = new Set()
      this.personas.forEach((p) => {
        const v = p[key]
        if (v !== null && v !== undefined && v !== '') set.add(v)
      })
      return [...set].sort(compareValues).map((v) => ({ value: v, label: String(v) }))
    },
    toggleColumnFilterValue(key, value) {
      const current = this.columnFilters[key] ? [...this.columnFilters[key]] : []
      const idx = current.indexOf(value)
      if (idx === -1) current.push(value)
      else current.splice(idx, 1)
      this.columnFilters = { ...this.columnFilters, [key]: current }
    },
    clearColumnFilters() {
      this.columnFilters = {}
    },
    handleOutsideClick(event) {
      const wrapper = this.$refs.columnPicker
      if (wrapper && !wrapper.contains(event.target)) {
        this.showColumnPicker = false
      }
      // El trigger del header y el propio dropdown paran la propagación
      // (@click.stop), así que si este handler global se dispara con un menú
      // de columna abierto, es porque el click fue afuera de ambos.
      if (this.openColumnMenu) {
        this.openColumnMenu = null
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
          showNumber: this.showNumberColumn,
          sortKey: this.sortKey,
          sortDir: this.sortDir,
          columnFilters: this.columnFilters
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
    async startImageMigration() {
      const pendingCount = this.personas.filter(needsWork).length
      if (!pendingCount) {
        alert('No hay imágenes pendientes de optimizar.')
        return
      }
      if (!confirm(`Se van a recomprimir ${pendingCount} imágenes a WebP. Las originales se reemplazan (se borran del bucket una vez migradas). ¿Continuar?`)) {
        return
      }

      this.migratingImages = true
      this.migrationProgress = { done: 0, total: pendingCount }
      try {
        const result = await migrateExistingImages(supabase, this.personas, (done, total) => {
          this.migrationProgress = { done, total }
        })
        this.$emit('refresh')
        if (result.failed.length) {
          alert(`Listo con errores: ${result.done - result.failed.length} ok, ${result.failed.length} fallaron.\n` +
            result.failed.map((f) => `- ${f.nombre}: ${f.error}`).join('\n'))
        } else {
          alert(`Listo: ${result.done} imágenes optimizadas (${result.skipped} ya eran livianas y se dejaron igual).`)
        }
      } finally {
        this.migratingImages = false
      }
    },
    async removeFromProfile(persona) {
      if (!confirm(`¿Eliminar a ${persona.nombre}?`)) return
      if (persona.imagen_path) {
        await supabase.storage.from('personas-imagenes').remove([persona.imagen_path])
        invalidateCachedSignedUrl('personas-imagenes', persona.imagen_path)
      }
      await supabase.from('personas').delete().eq('id', persona.id)
      this.viewingPersona = null
      this.$emit('persona-deleted', persona.id)
    }
  }
}
</script>

<style scoped>
/* Mismo tratamiento que .calendar-scroll en DateDashboard.vue: el scrollbar
   global (index.css) usa el fondo de la página, más oscuro que esta tarjeta
   (#1c1d22) — se pisa acá para que quede del mismo color que el dropdown. */
.column-menu-scroll::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.column-menu-scroll::-webkit-scrollbar-track {
  background: #1c1d22;
}

.column-menu-scroll::-webkit-scrollbar-thumb {
  border-color: #1c1d22;
}

.column-menu-scroll::-webkit-scrollbar-corner {
  background: #1c1d22;
}

.column-menu-scroll {
  scrollbar-color: #5D42A9 #1c1d22;
}
</style>
