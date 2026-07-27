<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2">
      <ToggleSwitch v-model="desglosar" />
      <span class="text-sm text-[#888888]">
        Desglosar por {{ boolLabels.bool1 }} / {{ boolLabels.bool2 }} / {{ boolLabels.bool3 }}
      </span>
    </div>

    <div v-if="activeFilterChips.length" class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="text-sm font-bold text-[#888888] uppercase">Filtros activos</h3>
        <button class="text-xs text-[#8B6FD6] hover:underline" @click="clearAllFilters">
          Quitar todos
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="chip in activeFilterChips"
          :key="chip.field"
          type="button"
          class="filter-chip active"
          @click="clearFilter(chip.field)"
        >
          {{ chip.label }}: {{ chip.display }} ✕
        </button>
      </div>
    </div>

    <p class="text-xs text-[#888888] -mt-4">
      Tocá una barra para filtrar el resto de los gráficos.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
        <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Por año</h3>
        <Bar :data="byYearData" :options="chartOptionsFor('year')" />
      </div>

      <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
        <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Por mes</h3>
        <Bar :data="byMonthData" :options="chartOptionsFor('month')" />
      </div>
    </div>

    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Por día del mes</h3>
      <Bar :data="byDayOfMonthData" :options="chartOptionsFor('day')" />
    </div>

    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Por mes de cada año</h3>
      <Bar :data="byYearMonthData" :options="chartOptionsFor('yearMonth')" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import ToggleSwitch from '../ToggleSwitch.vue'
import { BOOL_LABELS, BOOL_COLORS } from '@/config/personaOptions'
import { themeState, CHART_COLORS } from '@/lib/theme'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const BOOL_KEYS = ['bool1', 'bool2', 'bool3']

function parseFecha(str) {
  const [year, month, day] = str.split('-').map(Number)
  return { year, month, day }
}

// Arma { keys, labels } para cada tipo de gráfico: keys es lo que se usa para
// agrupar/contar y para filtrar al clickear una barra; labels es lo que se
// muestra en el eje X (mismo orden, pero puede diferir de keys, ej. meses).
// año y mes-de-cada-año dependen del rango real de datos (con huecos en 0);
// mes y día del mes siempre muestran el ciclo completo (1-12 / 1-31).
function yearBuckets(entries) {
  if (!entries.length) return { keys: [], labels: [] }
  const years = entries.map((e) => e.year)
  const min = Math.min(...years)
  const max = Math.max(...years)
  const keys = []
  for (let y = min; y <= max; y++) keys.push(String(y))
  return { keys, labels: keys }
}

function monthBuckets() {
  const keys = MONTH_NAMES.map((_, i) => String(i + 1))
  return { keys, labels: MONTH_NAMES }
}

function dayOfMonthBuckets() {
  const keys = []
  for (let d = 1; d <= 31; d++) keys.push(String(d))
  return { keys, labels: keys }
}

function yearMonthBuckets(entries) {
  if (!entries.length) return { keys: [], labels: [] }
  const toIndex = (y, m) => y * 12 + (m - 1)
  const indices = entries.map((e) => toIndex(e.year, e.month))
  const minIdx = Math.min(...indices)
  const maxIdx = Math.max(...indices)
  const keys = []
  for (let idx = minIdx; idx <= maxIdx; idx++) {
    const y = Math.floor(idx / 12)
    const m = (idx % 12) + 1
    keys.push(`${y}-${String(m).padStart(2, '0')}`)
  }
  return { keys, labels: keys }
}

function buildChartData(bucket, entries, keyFor, desglosar, color) {
  const { keys, labels } = bucket
  if (!keys.length) return { labels: [], datasets: [], keys: [] }

  if (!desglosar) {
    const counts = {}
    entries.forEach((e) => {
      const k = keyFor(e)
      counts[k] = (counts[k] || 0) + 1
    })
    return {
      labels,
      keys,
      datasets: [{ label: 'Personas', data: keys.map((k) => counts[k] || 0), backgroundColor: color }]
    }
  }

  const counts = { bool1: {}, bool2: {}, bool3: {} }
  entries.forEach((e) => {
    const k = keyFor(e)
    BOOL_KEYS.forEach((bk) => {
      if (e.persona[bk]) counts[bk][k] = (counts[bk][k] || 0) + 1
    })
  })
  return {
    labels,
    keys,
    datasets: BOOL_KEYS.map((bk) => ({
      label: BOOL_LABELS[bk],
      data: keys.map((k) => counts[bk][k] || 0),
      backgroundColor: BOOL_COLORS[bk]
    }))
  }
}

// Un predicado por tipo de bucket, para poder aplicar todos los filtros
// activos (año, mes, día, mes-de-cada-año, bool) combinados con AND.
const FILTER_PREDICATES = {
  year: (p, value) => p.fecha && p.fecha.slice(0, 4) === value,
  month: (p, value) => p.fecha && String(Number(p.fecha.slice(5, 7))) === value,
  day: (p, value) => p.fecha && String(Number(p.fecha.slice(8, 10))) === value,
  yearMonth: (p, value) => p.fecha && p.fecha.slice(0, 7) === value,
  bool: (p, value) => !!p[value]
}

const FILTER_LABELS = {
  year: 'Año',
  month: 'Mes',
  day: 'Día del mes',
  yearMonth: 'Mes de cada año',
  bool: 'Desglose'
}

function formatFilterValue(field, value) {
  if (field === 'bool') return BOOL_LABELS[value]
  if (field === 'month') return MONTH_NAMES[Number(value) - 1]
  return value
}

// vue-chartjs solo copia labels/datasets al instanciar el chart (ver
// cloneData en su código fuente) y descarta cualquier otra propiedad del
// objeto de datos, así que chart.data.keys nunca llega al chart real. Para
// mapear el índice clickeado al key real hay que leerlo del computed propio
// del dashboard (que sí conserva keys) en vez del chart.data interno.
const BUCKET_DATA_KEYS = {
  year: 'byYearData',
  month: 'byMonthData',
  day: 'byDayOfMonthData',
  yearMonth: 'byYearMonthData'
}

export default {
  name: 'DateDashboard',
  components: { Bar, ToggleSwitch },
  props: {
    personas: { type: Array, required: true }
  },
  data() {
    return {
      desglosar: false,
      boolLabels: BOOL_LABELS,
      activeFilters: {}
    }
  },
  computed: {
    chartOptions() {
      const colors = CHART_COLORS[themeState.value]
      return {
        responsive: true,
        plugins: { legend: { display: this.desglosar, labels: { color: colors.text } } },
        scales: {
          x: { ticks: { color: colors.text, autoSkip: false }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid }, beginAtZero: true }
        }
      }
    },
    activeFilterChips() {
      return Object.entries(this.activeFilters)
        .filter(([, value]) => value != null)
        .map(([field, value]) => ({
          field,
          label: FILTER_LABELS[field],
          display: formatFilterValue(field, value)
        }))
    },
    filteredPersonas() {
      let list = this.personas
      Object.entries(this.activeFilters).forEach(([field, value]) => {
        if (value == null) return
        list = list.filter((p) => FILTER_PREDICATES[field](p, value))
      })
      return list
    },
    fechas() {
      return this.filteredPersonas
        .filter((p) => p.fecha)
        .map((p) => ({ ...parseFecha(p.fecha), persona: p }))
    },
    byYearData() {
      return buildChartData(
        yearBuckets(this.fechas),
        this.fechas,
        (e) => String(e.year),
        this.desglosar,
        '#5D42A9'
      )
    },
    byMonthData() {
      return buildChartData(
        monthBuckets(),
        this.fechas,
        (e) => String(e.month),
        this.desglosar,
        '#8B6FD6'
      )
    },
    byDayOfMonthData() {
      return buildChartData(
        dayOfMonthBuckets(),
        this.fechas,
        (e) => String(e.day),
        this.desglosar,
        '#2c7a7b'
      )
    },
    byYearMonthData() {
      return buildChartData(
        yearMonthBuckets(this.fechas),
        this.fechas,
        (e) => `${e.year}-${String(e.month).padStart(2, '0')}`,
        this.desglosar,
        '#c05746'
      )
    }
  },
  watch: {
    desglosar(value) {
      if (!value) this.clearFilter('bool')
    }
  },
  methods: {
    toggleFilter(field, value) {
      this.activeFilters = {
        ...this.activeFilters,
        [field]: this.activeFilters[field] === value ? null : value
      }
    },
    clearFilter(field) {
      this.activeFilters = { ...this.activeFilters, [field]: null }
    },
    clearAllFilters() {
      this.activeFilters = {}
    },
    handleChartClick(bucketField, elements) {
      if (!elements.length) return
      const { datasetIndex, index } = elements[0]
      const bucketData = this[BUCKET_DATA_KEYS[bucketField]]
      const key = bucketData?.keys?.[index]
      if (key == null) return
      this.toggleFilter(bucketField, key)
      if (this.desglosar) {
        const boolKey = BOOL_KEYS[datasetIndex]
        if (boolKey) this.toggleFilter('bool', boolKey)
      }
    },
    handleChartHover(event, elements) {
      if (event.native?.target) {
        event.native.target.style.cursor = elements.length ? 'pointer' : 'default'
      }
    },
    chartOptionsFor(bucketField) {
      return {
        ...this.chartOptions,
        onClick: (evt, elements) => this.handleChartClick(bucketField, elements),
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
</style>
