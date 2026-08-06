<template>
  <div>
    <div v-if="activeFilterChips.length" class="bg-[#1c1d22] rounded p-4 mb-6 pixel-corners">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="text-sm font-bold text-[#888888] uppercase">Filtros activos</h3>
        <button class="text-xs text-[#8B6FD6] hover:underline" @click="activeFilters = {}">
          Quitar todos
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="chip in activeFilterChips"
          :key="chip.field"
          type="button"
          class="filter-chip active"
          @click="clearFieldFilter(chip.field)"
        >
          {{ chip.label }}: {{ chip.value }} ✕
        </button>
      </div>
    </div>

<div class="flex flex-col md:flex-row gap-6 w-full mb-6">
  <!-- Primer mapa: Ocupa el 60% del espacio disponible en desktop -->
  <div class="bg-[#1c1d22] rounded p-4 pixel-corners md:flex-[60] min-w-0">
    <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Mapa de países</h3>
    <p v-if="mapsConfigError" class="text-red-400 text-sm">{{ mapsConfigError }}</p>
    <p v-else-if="mapError" class="text-red-400 text-sm">{{ mapError }}</p>
    <div ref="countryMapEl" class="rounded" style="height: 26rem"></div>
  </div>

  <!-- Segundo mapa: Ocupa el 40% restante en desktop -->
  <div class="bg-[#1c1d22] rounded p-4 pixel-corners md:flex-[40] min-w-0">
    <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Mapa de burbujas por barrio</h3>
    <p v-if="!bubbleData.length" class="text-[#888888] text-sm">
      Todavía no hay barrios con geolocalización cargada. Se completa al elegir/crear un barrio
      en el formulario de personas.
    </p>
    <template v-else>
      <p v-if="bubbleError" class="text-red-400 text-sm">{{ bubbleError }}</p>
    </template>
    <div v-show="bubbleData.length" ref="bubbleMapEl" class="rounded" style="height: 26rem"></div>
  </div>
</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col gap-6">
        <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
          <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Nacionalidad (top 15)</h3>
          <div class="overflow-y-auto" :style="{ maxHeight: Math.min(paisChartHeight, 448) + 'px' }">
            <div :style="{ height: paisChartHeight + 'px' }">
              <Bar :data="paisBarData" :options="barOptionsFor('pais')" />
            </div>
          </div>
        </div>
        <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
          <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Lugar</h3>
          <div class="overflow-y-auto" :style="{ maxHeight: Math.min(lugarChartHeight, 448) + 'px' }">
            <div :style="{ height: lugarChartHeight + 'px' }">
              <Bar :data="lugarBarData" :options="barOptionsFor('lugar')" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
        <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Barrio (top 25)</h3>
        <div :style="{ height: barrioChartHeight + 'px' }">
          <Bar :data="barrioBarData" :options="barOptionsFor('barrio')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { findCountryFeature } from '@/lib/geo'
import { PAIS_COLORS, LUGAR_COLORS } from '@/config/personaOptions'
import { loadMapsLibrary, isGoogleMapsConfigured } from '@/lib/googleMaps'
import { themeState, CHART_COLORS } from '@/lib/theme'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const NEUTRAL_PALETTE = ['#5D42A9', '#8B6FD6', '#2c7a7b', '#c05746', '#d4a017', '#3b6ea5', '#888888']

const FIELD_LABELS = {
  pais: 'País',
  barrio: 'Barrio',
  lugar: 'Lugar'
}

const FIELD_GETTERS = {
  pais: (p) => p.pais || 'Sin dato',
  barrio: (p) => p.barrio || 'Sin dato',
  lugar: (p) => p.lugar || 'Sin dato'
}

// Estilo oscuro para que el mapa de Google combine con el resto del panel
// en vez del estilo claro por defecto.
const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1c1d22' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1c1d22' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9a9a9a' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#3f4048' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#5D42A9' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#1c1d22' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2b31' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#131418' }] }
]

// Mismo estilo que el oscuro pero invertido, para que el mapa combine con
// el resto del panel también en tema claro (no el estilo por defecto de
// Google, que rompe con la paleta minimalista de la app).
const LIGHT_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#f2f2f5' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5a5a63' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#d8d8de' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#5D42A9' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f2f2f5' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#e4e4ea' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#dfe6ee' }] }
]

const BASE_MAP_OPTIONS = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  gestureHandling: 'greedy'
}

function countBy(items, getValue) {
  const counts = {}
  items.forEach((item) => {
    const value = getValue(item)
    if (!value) return
    counts[value] = (counts[value] || 0) + 1
  })
  return counts
}

// Ordena de mayor a menor cantidad, para que las barras (y sus etiquetas)
// queden de mayor a menor en vez del orden de aparición en los datos.
function sortDesc(counts) {
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function toBarData(sortedEntries, label, colorFor, selectedKey = null) {
  const labels = sortedEntries.map(([l]) => l)
  return {
    labels,
    datasets: [
      {
        label,
        data: sortedEntries.map(([, v]) => v),
        // Siempre devuelve un array (nunca alterna array/string entre
        // renders, ver comentario en DateDashboard.vue) para que Chart.js no
        // se quede con el color atenuado pegado al sacar el filtro.
        backgroundColor: labels.map((l, i) => {
          const base = colorFor(l, i)
          return selectedKey == null || l === selectedKey ? base : hexToRgba(base, 0.25)
        })
      }
    ]
  }
}

// El InfoWindow nativo de Google Maps reserva una fila propia arriba de todo
// el globo para su botón de cerrar (48x48, con un título vacío al lado), lo
// que deja un hueco grande antes del texto. En vez de ocultarlo y armar uno
// propio (frágil: quedaban los dos superpuestos), se restylea ese botón
// nativo por CSS para que sea chico y quede flotando sobre la esquina
// superior derecha del texto — ver el bloque de reglas :deep(.gm-*) al
// final del <style>. El contenido solo necesita el padding-right para no
// quedar debajo suyo.
function infoWindowContent(title, subtitle) {
  return `<div style="color:#131418;padding-right:14px; margin-top: 5px; margin-bottom: 5px">
    <strong>${title}</strong><br>${subtitle}
  </div>`
}

// Alto en px para que cada barra tenga suficiente espacio y ninguna etiqueta
// se salte por autoSkip; el contenedor scrollea si esto excede el máximo visible.
function chartHeightFor(count) {
  return Math.max(220, count * 28)
}

// Violeta oscuro a violeta claro, para el relleno de cada país según cantidad.
function colorInterpolate(t) {
  const from = { r: 0x3d, g: 0x33, b: 0x66 }
  const to = { r: 0xb3, g: 0x93, b: 0xf0 }
  const r = Math.round(from.r + (to.r - from.r) * t)
  const g = Math.round(from.g + (to.g - from.g) * t)
  const b = Math.round(from.b + (to.b - from.b) * t)
  return `rgb(${r}, ${g}, ${b})`
}

export default {
  name: 'GeoDashboard',
  components: { Bar },
  props: {
    personas: { type: Array, required: true }
  },
  data() {
    return {
      mapsConfigError: '',
      mapError: '',
      bubbleError: '',
      countryMap: null,
      countryDataLayer: null,
      bubbleMap: null,
      bubbleCircles: [],
      bubbleInfoWindow: null,
      activeFilters: {}
    }
  },
  computed: {
    theme() {
      return themeState.value
    },
    mapStyle() {
      return this.theme === 'light' ? LIGHT_MAP_STYLE : DARK_MAP_STYLE
    },
    horizontalBarOptions() {
      const colors = CHART_COLORS[this.theme]
      return {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: colors.text }, grid: { color: colors.grid }, beginAtZero: true },
          y: { ticks: { color: colors.text, autoSkip: false }, grid: { color: colors.grid } }
        }
      }
    },
    activeFilterChips() {
      return Object.entries(this.activeFilters).map(([field, value]) => ({
        field,
        value,
        label: FIELD_LABELS[field]
      }))
    },
    filteredPersonas() {
      return this.personasExcluding(null)
    },
    // Personas para cada gráfico/mapa: aplican todos los filtros activos
    // menos el suyo propio, así tocar un país/barrio/lugar filtra el resto
    // del dashboard sin autofiltrarse.
    paisPersonas() {
      return this.personasExcluding('pais')
    },
    barrioPersonas() {
      return this.personasExcluding('barrio')
    },
    lugarPersonas() {
      return this.personasExcluding('lugar')
    },
    countryCounts() {
      return countBy(this.paisPersonas, (p) => p.pais)
    },
    // Promedio de rating por país, solo para mostrar en el tooltip del mapa
    // (no afecta el color del choropleth, que sigue siendo por cantidad).
    countryRatingAvg() {
      const sums = {}
      const counts = {}
      this.paisPersonas.forEach((p) => {
        if (p.rating == null || !p.pais) return
        sums[p.pais] = (sums[p.pais] || 0) + p.rating
        counts[p.pais] = (counts[p.pais] || 0) + 1
      })
      const avgs = {}
      Object.keys(sums).forEach((pais) => {
        avgs[pais] = sums[pais] / counts[pais]
      })
      return avgs
    },
    bubbleData() {
      const groups = {}
      this.barrioPersonas.forEach((p) => {
        if (p.barrio_lat == null || p.barrio_lng == null || !p.barrio) return
        const key = p.barrio
        if (!groups[key]) groups[key] = { longitude: p.barrio_lng, latitude: p.barrio_lat, value: 0, label: key }
        groups[key].value++
      })
      return Object.values(groups)
    },
    paisBarData() {
      return toBarData(
        sortDesc(this.countryCounts).slice(0, 15),
        'Pais',
        (l) => PAIS_COLORS[l] || '#888888',
        this.activeFilters.pais ?? null
      )
    },
    paisChartHeight() {
      return chartHeightFor(this.paisBarData.labels.length)
    },
    barrioBarData() {
      return toBarData(
        sortDesc(countBy(this.barrioPersonas, (p) => p.barrio)).slice(0, 25),
        'Barrio',
        (_, i) => NEUTRAL_PALETTE[i % NEUTRAL_PALETTE.length],
        this.activeFilters.barrio ?? null
      )
    },
    barrioChartHeight() {
      return chartHeightFor(this.barrioBarData.labels.length)
    },
    lugarBarData() {
      return toBarData(
        sortDesc(countBy(this.lugarPersonas, (p) => p.lugar)),
        'Lugar',
        (l) => LUGAR_COLORS[l] || '#888888',
        this.activeFilters.lugar ?? null
      )
    },
    lugarChartHeight() {
      return chartHeightFor(this.lugarBarData.labels.length)
    }
  },
  watch: {
    mapStyle(styles) {
      this.countryMap?.setOptions({ styles })
      this.bubbleMap?.setOptions({ styles })
    },
    countryCounts() {
      this.updateCountryMapFeatures()
    },
    bubbleData() {
      this.updateBubbleMarkers()
    }
  },
  async mounted() {
    if (!isGoogleMapsConfigured) {
      this.mapsConfigError = 'Google Maps no está configurado (falta VUE_APP_GOOGLE_MAPS_API_KEY).'
      return
    }
    try {
      const { Map } = await loadMapsLibrary()
      this.MapCtor = Map
      this.renderCountryMap()
      this.renderBubbleMap()
    } catch (err) {
      this.mapsConfigError = 'No se pudo cargar Google Maps: ' + (err.message || err)
    }
  },
  methods: {
    // Aplica todos los activeFilters menos `excludeField` (null = todos).
    // Cada gráfico/mapa usa esto con su propio field para no autofiltrarse.
    personasExcluding(excludeField) {
      let list = this.personas
      Object.entries(this.activeFilters).forEach(([field, value]) => {
        if (field === excludeField) return
        const getValue = FIELD_GETTERS[field]
        list = list.filter((p) => getValue(p) === value)
      })
      return list
    },
    toggleFieldFilter(field, value) {
      if (this.activeFilters[field] === value) {
        this.clearFieldFilter(field)
        return
      }
      this.activeFilters = { ...this.activeFilters, [field]: value }
    },
    clearFieldFilter(field) {
      const updated = { ...this.activeFilters }
      delete updated[field]
      this.activeFilters = updated
    },
    handleChartClick(field, chart, elements) {
      if (!elements.length) return
      const label = chart.data.labels[elements[0].index]
      this.toggleFieldFilter(field, label)
    },
    handleChartHover(event, elements) {
      if (event.native?.target) {
        event.native.target.style.cursor = elements.length ? 'pointer' : 'default'
      }
    },
    barOptionsFor(field) {
      return {
        ...this.horizontalBarOptions,
        onClick: (evt, elements, chart) => this.handleChartClick(field, chart, elements),
        onHover: this.handleChartHover
      }
    },
    updateCountryMapFeatures() {
      const dataLayer = this.countryDataLayer
      if (!dataLayer) return

      dataLayer.forEach((feature) => dataLayer.remove(feature))

      const entries = Object.entries(this.countryCounts)
      const maxValue = Math.max(1, ...entries.map(([, v]) => v))
      const ratingAvgByPais = this.countryRatingAvg
      const features = entries
        .map(([nombre, value]) => {
          const feature = findCountryFeature(nombre)
          if (!feature) return null
          const ratingAvg = ratingAvgByPais[nombre] ?? null
          return { ...feature, properties: { ...feature.properties, nombre, personas: value, ratingAvg } }
        })
        .filter(Boolean)

      dataLayer.addGeoJson({ type: 'FeatureCollection', features })
      dataLayer.setStyle((feature) => {
        const isSelected = this.activeFilters.pais === feature.getProperty('nombre')
        return {
          fillColor: colorInterpolate((feature.getProperty('personas') || 0) / maxValue),
          fillOpacity: 0.75,
          strokeColor: isSelected ? '#ffffff' : '#d8cdfa',
          strokeWeight: isSelected ? 2 : 1
        }
      })
    },
    renderCountryMap() {
      try {
        const map = new this.MapCtor(this.$refs.countryMapEl, {
          ...BASE_MAP_OPTIONS,
          styles: this.mapStyle,
          center: { lat: 15, lng: 0 },
          zoom: 2,
          minZoom: 1
        })
        // markRaw: si estas instancias de Google Maps quedan reactivas (Vue
        // las envuelve en un Proxy al guardarlas en data()), las llamadas
        // que las mutan internamente (setMap(null), remove(feature), etc.)
        // se ejecutan sobre el Proxy en vez del objeto real. Google Maps usa
        // estructuras internas atadas a la identidad exacta del objeto
        // original, así que esas mutaciones quedan rotas en silencio — las
        // altas seguían funcionando pero las bajas (borrar markers viejos)
        // no, que era justo el síntoma reportado.
        this.countryMap = markRaw(map)

        const data = new window.google.maps.Data({ map })
        this.countryDataLayer = markRaw(data)
        this.updateCountryMapFeatures()

        // maxWidth marca dónde Google Maps recién empieza a envolver el
        // texto; sin esto el ancho por defecto (algo angosto) hacía que el
        // texto se envolviera y el propio InfoWindow le agregara scrollbars
        // internas.
        const infoWindow = markRaw(new window.google.maps.InfoWindow({ maxWidth: 240 }))
        // 'closeclick' solo dispara con la "x" (o Esc), no al reemplazar el
        // contenido por otro país clickeado — así que cerrar el recuadro
        // también saca el filtro de país en vez de dejarlo pegado.
        infoWindow.addListener('closeclick', () => this.clearFieldFilter('pais'))
        data.addListener('click', (event) => {
          const nombre = event.feature.getProperty('nombre')
          const personas = event.feature.getProperty('personas') || 0
          const ratingAvg = event.feature.getProperty('ratingAvg')
          const subtitle = `${personas} persona${personas === 1 ? '' : 's'}`
            + (ratingAvg != null ? ` — ⭐ ${ratingAvg.toFixed(1)}` : '')
          infoWindow.setContent(
            infoWindowContent(nombre, subtitle)
          )
          infoWindow.setPosition(event.latLng)
          infoWindow.open(map)
          this.toggleFieldFilter('pais', nombre)
        })
      } catch (err) {
        this.mapError = 'No se pudo cargar el mapa de países: ' + (err.message || err)
      }
    },
    updateBubbleMarkers() {
      if (!this.bubbleMap) return

      this.bubbleCircles.forEach((marker) => marker.setMap(null))
      this.bubbleCircles = []
      // Se recreaba un InfoWindow nuevo en cada llamada (cada vez que
      // cambiaba un filtro) sin cerrar el anterior: si había uno abierto
      // apuntando a un marker que se acababa de eliminar arriba, quedaba
      // flotando en el mapa. Ahora se reusa una sola instancia guardada en
      // data() y se cierra explícitamente antes de reconstruir los markers.
      this.bubbleInfoWindow?.close()
      if (!this.bubbleData.length) return

      const maxValue = Math.max(1, ...this.bubbleData.map((d) => d.value))
      if (!this.bubbleInfoWindow) {
        this.bubbleInfoWindow = markRaw(new window.google.maps.InfoWindow({ maxWidth: 240 }))
        this.bubbleInfoWindow.addListener('closeclick', () => this.clearFieldFilter('barrio'))
      }
      const bubbleInfoWindow = this.bubbleInfoWindow
      this.bubbleCircles = this.bubbleData.map((d) => {
        const isSelected = this.activeFilters.barrio === d.label
        // Marker con ícono de símbolo en vez de Circle: el radio de Circle es en
        // metros (geográfico), así que a bajo zoom se vuelve invisible. El scale
        // de un Symbol es en píxeles de pantalla, así que la burbuja se ve del
        // mismo tamaño relativo sin importar cuánto zoom tengas.
        const marker = markRaw(new window.google.maps.Marker({
          map: this.bubbleMap,
          position: { lat: d.latitude, lng: d.longitude },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8 + (d.value / maxValue) * 22,
            fillColor: isSelected ? '#ffffff' : '#8B6FD6',
            fillOpacity: 0.5,
            strokeColor: '#d8cdfa',
            strokeOpacity: 0.9,
            strokeWeight: 1
          }
        }))
        marker.addListener('click', () => {
          bubbleInfoWindow.setContent(
            infoWindowContent(d.label, `${d.value} persona${d.value === 1 ? '' : 's'}`)
          )
          bubbleInfoWindow.open(this.bubbleMap, marker)
          this.toggleFieldFilter('barrio', d.label)
        })
        return marker
      })
    },
    renderBubbleMap() {
      if (!this.bubbleData.length) return
      try {
        const bounds = new window.google.maps.LatLngBounds()
        this.bubbleData.forEach((d) => bounds.extend({ lat: d.latitude, lng: d.longitude }))

        const map = new this.MapCtor(this.$refs.bubbleMapEl, {
          ...BASE_MAP_OPTIONS,
          styles: this.mapStyle,
          center: bounds.getCenter(),
          zoom: 4,
          minZoom: 2
        })
        this.bubbleMap = markRaw(map)
        this.updateBubbleMarkers()

        if (this.bubbleData.length > 1) map.fitBounds(bounds)
      } catch (err) {
        this.bubbleError = 'No se pudo cargar el mapa de burbujas: ' + (err.message || err)
      }
    }
  }
}
</script>

<style scoped>
.filter-chip {
  font-family: inherit;
  font-weight: bold;
  font-size: 0.8125rem;
  color: #ffffff;
  background: #131418;
  border: 2px solid #2a2b31;
  padding: 6px 12px;
  cursor: pointer;
  image-rendering: pixelated;
  transition: background 0.05s linear, border-color 0.05s linear;
}

.filter-chip:hover {
  border-color: #5D42A9;
}

.filter-chip.active {
  background: #5D42A9;
  border-color: #5D42A9;
}

/* Oculta los elementos de atribución, atajos y términos del pie */
:deep(a[href*="google.com/help/terms_maps"]),
:deep(a[href*="maps.google.com/help/terms_maps"]) {
  display: none !important;
}

/* En versiones recientes, este contenedor engloba todo el bloque de texto inferior derecho */
:deep(.gm-style-cc + div),
:deep(div[style*="z-index: 1000001"]) {
  display: none !important;
}

/* El InfoWindow nativo reserva una fila propia (.gm-style-iw-chr, 48px) para
   el botón de cerrar arriba de todo el globo, dejando un hueco grande antes
   del texto — se saca de flujo (position:absolute) y se encoge el botón
   para que quede flotando compacto en la esquina superior derecha, sobre el
   texto, en vez de empujarlo hacia abajo. gm-style-iw-d fuerza overflow
   hidden porque si no Google le agregaba scrollbars aunque el contenido
   entrara de sobra en el ancho del globo. */
:deep(.gm-style-iw-chr) {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  height: auto !important;
}

:deep(.gm-style-iw-ch) {
  display: none !important;
}

:deep(.gm-ui-hover-effect) {
  width: 24px !important;
  height: 24px !important;
}

:deep(.gm-ui-hover-effect > span) {
  width: 16px !important;
  height: 16px !important;
  margin: 4px !important;
}

:deep(.gm-style-iw-d) {
  overflow: hidden !important;
}
</style>
