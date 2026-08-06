<template>
  <div class="flex flex-col gap-6">
    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="text-sm font-bold text-[#888888] uppercase">Filtrar por año</h3>
        <button
          v-if="selectedYear"
          class="text-xs text-[#8B6FD6] hover:underline"
          @click="selectedYear = null"
        >
          Quitar filtro
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <div class="pixel-corners-sm inline-block filter-chip-border bg-[#2a2b31] p-[2px]"
            :class="{ active: !selectedYear }">
            <button
            type="button"
            class="filter-chip pixel-corners-sm"
            :class="{ active: !selectedYear }"
            @click="selectedYear = null"
            >
            Todos
            </button>
        </div>
        <div class="pixel-corners-sm inline-block filter-chip-border bg-[#2a2b31] p-[2px]"
            v-for="row in perYearRows"
            :key="row.year"
            :class="{ active: selectedYear === row.year }">
            <button
            type="button"
            class="filter-chip pixel-corners-sm"
            :class="{ active: selectedYear === row.year }"
            @click="toggleYearFilter(row.year)"
            >
            {{ row.year }} <span class="filter-chip-count" :class="{ active: selectedYear === row.year }">({{ row.count }})</span>
            </button>
        </div>
      </div>
      <p class="text-xs text-[#888888] mt-3">
        Tocá un sector o una barra de los gráficos de abajo para filtrar el resto del dashboard.
      </p>
    </div>

    <div v-if="activeFilterChips.length" class="bg-[#1c1d22] rounded p-4 pixel-corners">
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
        <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">
          Posicion<span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
        </h3>
        <div style="height: 220px">
          <Pie :data="posicionPieData" :options="pieOptionsFor('posicion')" />
        </div>
      </div>

      <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
        <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">
          Color de pelo<span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
        </h3>
        <div style="height: 220px">
          <Pie :data="colorPeloPieData" :options="pieOptionsFor('colorPelo')" />
        </div>
      </div>

      <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
        <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">
          Qué se hizo<span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
        </h3>
        <div style="height: 220px">
          <Pie :data="queSeHizoPieData" :options="pieOptionsFor('queSeHizo')" />
        </div>
      </div>

      <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
        <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">
          Visual<span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
        </h3>
        <div style="height: 220px">
          <Pie :data="visualPieData" :options="pieOptionsFor('visual')" />
        </div>
      </div>
    </div>

    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">
        Top 20 nombres más repetidos
        <span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
      </h3>
      <div :style="{ height: topNamesChartHeight + 'px' }">
        <Bar :data="topNamesBarData" :options="barOptionsFor('nombre')" />
      </div>
    </div>

    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">
        Rating
        <span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
      </h3>
      <Bar :data="ratingBarData" :options="verticalBarOptionsFor('rating')" />
    </div>
  </div>
</template>

<script>
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { COLOR_PELO_COLORS, POSICION_COLORS, VISUAL_COLORS } from '@/config/personaOptions'
import { themeState, CHART_COLORS } from '@/lib/theme'

ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController, BarElement, CategoryScale, LinearScale)

const PALETTE = ['#5D42A9', '#8B6FD6', '#2c7a7b', '#c05746', '#d4a017', '#3b6ea5', '#888888']

const QUE_SE_HIZO_COLORS = {
  'Comos y Orl': '#c05746',
  'Solo Orl': '#d4a017',
  'Solo Comos': '#2c7a7b',
  Chmos: '#5D42A9',
  Nada: '#888888'
}

function countBy(items, getValue) {
  const counts = {}
  items.forEach((item) => {
    const value = getValue(item) || 'Sin dato'
    counts[value] = (counts[value] || 0) + 1
  })
  return counts
}

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

// Siempre devuelve un array (nunca alterna array/string entre renders, ver
// comentario en DateDashboard.vue) para que Chart.js no se quede con el
// color atenuado pegado al sacar el filtro.
function colorsFor(labels, colorFor, selectedKey) {
  return labels.map((l, i) => {
    const base = colorFor?.(l) || PALETTE[i % PALETTE.length]
    return selectedKey == null || l === selectedKey ? base : hexToRgba(base, 0.25)
  })
}

function toPieData(sortedEntries, colorFor, selectedKey = null) {
  const labels = sortedEntries.map(([l]) => l)
  return {
    labels,
    datasets: [
      {
        data: sortedEntries.map(([, v]) => v),
        backgroundColor: colorsFor(labels, colorFor, selectedKey)
      }
    ]
  }
}

function toBarData(sortedEntries, label, colorFor, selectedKey = null) {
  const labels = sortedEntries.map(([l]) => l)
  return {
    labels,
    datasets: [
      {
        label,
        data: sortedEntries.map(([, v]) => v),
        backgroundColor: colorsFor(labels, colorFor, selectedKey)
      }
    ]
  }
}

function chartHeightFor(count) {
  return Math.max(180, count * 20)
}

// Categoría exhaustiva y mutuamente excluyente según los 3 booleanos: el
// nivel de Chmos deja de importar en cuanto Comos y/o Orl están presentes.
function queSeHizoCategoria(p) {
  const chmos = !!p.bool1
  const comos = !!p.bool2
  const orl = !!p.bool3
  if (comos && orl) return 'Comos y Orl'
  if (orl) return 'Solo Orl'
  if (comos) return 'Solo Comos'
  if (chmos) return 'Chmos'
  return 'Nada'
}

// Cada entrada define cómo leer el valor "clickeable" de una persona para ese
// campo, y qué etiqueta mostrar en el chip de filtro activo correspondiente.
const FIELD_GETTERS = {
  posicion: (p) => p.posicion || 'Sin dato',
  colorPelo: (p) => p.color_pelo || 'Sin dato',
  queSeHizo: queSeHizoCategoria,
  visual: (p) => p.visual || 'Sin dato',
  nombre: (p) => p.nombre || 'Sin dato',
  rating: (p) => (p.rating != null ? String(p.rating) : null)
}

const FIELD_LABELS = {
  posicion: 'Posición',
  colorPelo: 'Color de pelo',
  queSeHizo: 'Qué se hizo',
  visual: 'Visual',
  nombre: 'Nombre',
  rating: 'Rating'
}

// A diferencia de las otras barras (ordenadas por cantidad), el rating tiene
// un orden natural 0-5 que tiene más sentido mantener en el eje.
function ratingBuckets(personas) {
  const counts = {}
  personas.forEach((p) => {
    if (p.rating == null) return
    counts[p.rating] = (counts[p.rating] || 0) + 1
  })
  const labels = ['0', '1', '2', '3', '4', '5']
  return labels.map((l) => [l, counts[l] || 0])
}

export default {
  name: 'GeneralDashboard',
  components: { Bar, Pie },
  props: {
    personas: { type: Array, required: true }
  },
  data() {
    return {
      selectedYear: null,
      activeFilters: {}
    }
  },
  computed: {
    pieOptions() {
      const colors = CHART_COLORS[themeState.value]
      return {
        responsive: true,
        maintainAspectRatio: false,
        elements: { arc: { borderWidth: 0 } },
        plugins: { legend: { position: 'right', labels: { color: colors.text } } }
      }
    },
    horizontalBarOptions() {
      const colors = CHART_COLORS[themeState.value]
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
    // A diferencia de horizontalBarOptions (usada para rankings tipo top
    // nombres), el rating va vertical con categorías fijas 0-5 en el eje x.
    verticalBarOptions() {
      const colors = CHART_COLORS[themeState.value]
      return {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: colors.text }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid }, beginAtZero: true }
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
    // Personas para cada gráfico: aplican todos los filtros activos menos el
    // suyo propio, así tocar un sector/barra filtra el resto del dashboard
    // sin autofiltrarse.
    posicionPersonas() {
      return this.personasExcluding('posicion')
    },
    colorPeloPersonas() {
      return this.personasExcluding('colorPelo')
    },
    queSeHizoPersonas() {
      return this.personasExcluding('queSeHizo')
    },
    visualPersonas() {
      return this.personasExcluding('visual')
    },
    nombrePersonas() {
      return this.personasExcluding('nombre')
    },
    ratingPersonas() {
      return this.personasExcluding('rating')
    },
    posicionPieData() {
      return toPieData(
        sortDesc(countBy(this.posicionPersonas, (p) => p.posicion)),
        (l) => POSICION_COLORS[l],
        this.activeFilters.posicion ?? null
      )
    },
    colorPeloPieData() {
      return toPieData(
        sortDesc(countBy(this.colorPeloPersonas, (p) => p.color_pelo)),
        (l) => COLOR_PELO_COLORS[l],
        this.activeFilters.colorPelo ?? null
      )
    },
    queSeHizoPieData() {
      return toPieData(
        sortDesc(countBy(this.queSeHizoPersonas, queSeHizoCategoria)),
        (l) => QUE_SE_HIZO_COLORS[l],
        this.activeFilters.queSeHizo ?? null
      )
    },
    visualPieData() {
      return toPieData(
        sortDesc(countBy(this.visualPersonas, (p) => p.visual)),
        (l) => VISUAL_COLORS[l],
        this.activeFilters.visual ?? null
      )
    },
    topNamesBarData() {
      const sorted = sortDesc(countBy(this.nombrePersonas, (p) => p.nombre)).slice(0, 20)
      return toBarData(sorted, 'Personas', null, this.activeFilters.nombre ?? null)
    },
    topNamesChartHeight() {
      return chartHeightFor(this.topNamesBarData.labels.length)
    },
    ratingBarData() {
      return toBarData(ratingBuckets(this.ratingPersonas), 'Personas', () => '#d4a017', this.activeFilters.rating ?? null)
    },
    perYearRows() {
      const counts = countBy(
        this.personas.filter((p) => p.fecha),
        (p) => Number(p.fecha.slice(0, 4))
      )
      return Object.entries(counts)
        .map(([year, count]) => ({ year: Number(year), count }))
        .sort((a, b) => a.year - b.year)
    }
  },
  methods: {
    // Aplica selectedYear + todos los activeFilters menos `excludeField`
    // (null = todos). Cada gráfico usa esto con su propio field para no
    // autofiltrarse.
    personasExcluding(excludeField) {
      let list = this.personas
      if (this.selectedYear) {
        list = list.filter((p) => p.fecha && Number(p.fecha.slice(0, 4)) === this.selectedYear)
      }
      Object.entries(this.activeFilters).forEach(([field, value]) => {
        if (field === excludeField) return
        const getValue = FIELD_GETTERS[field]
        list = list.filter((p) => getValue(p) === value)
      })
      return list
    },
    toggleYearFilter(year) {
      this.selectedYear = this.selectedYear === year ? null : year
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
    pieOptionsFor(field) {
      return {
        ...this.pieOptions,
        onClick: (evt, elements, chart) => this.handleChartClick(field, chart, elements),
        onHover: this.handleChartHover
      }
    },
    barOptionsFor(field) {
      return {
        ...this.horizontalBarOptions,
        onClick: (evt, elements, chart) => this.handleChartClick(field, chart, elements),
        onHover: this.handleChartHover
      }
    },
    verticalBarOptionsFor(field) {
      return {
        ...this.verticalBarOptions,
        onClick: (evt, elements, chart) => this.handleChartClick(field, chart, elements),
        onHover: this.handleChartHover
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
  padding: 6px 12px;
  cursor: pointer;
  image-rendering: pixelated;
  transition: background 0.05s linear;
}

.filter-chip:hover {
  background: #5D42A9;
}

.filter-chip.active {
  background: #5D42A9;
}

.filter-chip-border {
  background: #131418;
  cursor: pointer;
  image-rendering: pixelated;
  transition: background 0.05s linear;
}

.filter-chip-border:hover {
  background: #5D42A9;
}

.filter-chip-border.active {
  background: #5D42A9;
}

.filter-chip-count {
  color: #888888;
}

.filter-chip-count.active {
  color: #535353;
}

.filter-chip.active .filter-chip-count {
  color: #d9d0f5;
}
</style>
