<template>
  <div>
    <div v-if="activeFilterChips.length" class="bg-[#1c1d22] rounded p-4 mb-6">
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

    <div class="bg-[#1c1d22] rounded p-4 mb-6 pixel-corners">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="text-sm font-bold text-[#888888] uppercase">
          Distribución de edad
          <span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
        </h3>
        <p class="text-sm text-[#888888]">
          <span class="md:hidden">Prom.</span><span class="hidden md:inline">Promedio</span>:
          <strong class="text-white">{{ ageStats.avg }}</strong> —
          <span class="md:hidden">Med.</span><span class="hidden md:inline">Mediana</span>:
          <strong class="text-white">{{ ageStats.median }}</strong>
        </p>
      </div>
      <p class="text-xs text-[#888888] mb-2">Tocá una barra para filtrar el resto del dashboard.</p>
      <Bar :data="ageChartData" :options="barOptionsFor('edad')" />
    </div>

    <div class="bg-[#1c1d22] rounded p-4 mb-6 pixel-corners">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="text-sm font-bold text-[#888888] uppercase">
          Edad actualizada a hoy
          <span v-if="selectedYear" class="normal-case font-normal text-[#8B6FD6]"> — {{ selectedYear }}</span>
        </h3>
        <p class="text-sm text-[#888888]">
          <span class="md:hidden">Prom.</span><span class="hidden md:inline">Promedio</span>:
          <strong class="text-white">{{ updatedAgeStats.avg }}</strong> —
          <span class="md:hidden">Med.</span><span class="hidden md:inline">Mediana</span>:
          <strong class="text-white">{{ updatedAgeStats.median }}</strong>
        </p>
      </div>
      <p class="text-xs text-[#888888] mb-2">Tocá una barra para filtrar el resto del dashboard.</p>
      <Bar :data="updatedAgeChartData" :options="barOptionsFor('updatedEdad')" />
    </div>

    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="text-sm font-bold text-[#888888] uppercase">Por año</h3>
        <button
          v-if="selectedYear"
          class="text-xs text-[#8B6FD6] hover:underline"
          @click="selectedYear = null"
        >
          Quitar filtro ({{ selectedYear }})
        </button>
      </div>
      <p class="text-xs text-[#888888] mb-2">Tocá un año para filtrar los gráficos de arriba.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-[#5D42A9] text-[#888888]">
              <th class="py-2 pr-3">Año</th>
              <th class="py-2 pr-3">Promedio</th>
              <th class="py-2 pr-3">Mediana</th>
              <th class="py-2 pr-3">Mi edad</th>
              <th class="py-2 pr-3">Dif. vs promedio</th>
              <th class="py-2 pr-3">Dif. vs mediana</th>
              <th class="py-2 pr-3">⭐ Rating prom.</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in perYearRows"
              :key="row.year"
              class="border-b border-[#2a2b31] cursor-pointer hover:bg-white/5"
              :class="{ 'bg-[#5D42A9]/20': selectedYear === row.year }"
              @click="toggleYearFilter(row.year)"
            >
              <td class="py-2 pr-3">{{ row.year }}</td>
              <td class="py-2 pr-3">{{ row.avg }}</td>
              <td class="py-2 pr-3">{{ row.median }}</td>
              <td class="py-2 pr-3">{{ row.myAge }}</td>
              <td class="py-2 pr-3" :class="diffBgClass(row.diffAvg)">{{ formatDiff(row.diffAvg) }}</td>
              <td class="py-2 pr-3" :class="diffBgClass(row.diffMedian)">{{ formatDiff(row.diffMedian) }}</td>
              <td class="py-2 pr-3">{{ row.ratingAvg ?? '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
import { MY_AGE_REFERENCE } from '@/config/personaOptions'
import { themeState, CHART_COLORS } from '@/lib/theme'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

function average(arr) {
  if (!arr.length) return null
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function median(arr) {
  if (!arr.length) return null
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

function round1(n) {
  return n == null ? '—' : Math.round(n * 10) / 10
}

function parseISODate(str) {
  const [year, month, day] = str.split('-').map(Number)
  return { year, month: month - 1, day }
}

// Años completos entre la fecha (con año/mes/día) y hoy, sin sumar un año
// hasta que pase el aniversario de esa fecha (no solo cambie el año calendario).
function fullYearsSince(fechaStr, today) {
  const { year, month, day } = parseISODate(fechaStr)
  let years = today.getFullYear() - year
  const monthDiff = today.getMonth() - month
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    years--
  }
  return years
}

// Getters usados para filtrar por el valor exacto clickeado. Devuelven string
// porque el label que Chart.js pasa al handler de click también es string.
const FIELD_GETTERS = {
  edad: (p) => (p.edad != null ? String(p.edad) : null),
  updatedEdad: (p) => {
    if (p.edad == null || !p.fecha) return null
    return String(p.edad + fullYearsSince(p.fecha, new Date()))
  }
}

const FIELD_LABELS = {
  edad: 'Edad',
  updatedEdad: 'Edad actualizada'
}

function countByValue(values) {
  const counts = {}
  values.forEach((v) => {
    counts[v] = (counts[v] || 0) + 1
  })
  return counts
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
function colorsFor(labels, color, selectedKey) {
  return labels.map((l) => (selectedKey == null || l === selectedKey ? color : hexToRgba(color, 0.25)))
}

function toBarChartData(counts, selectedKey = null) {
  const labels = Object.keys(counts)
    .map(Number)
    .sort((a, b) => a - b)
    .map(String)
  return {
    labels,
    datasets: [
      {
        label: 'Personas',
        data: labels.map((l) => counts[l]),
        backgroundColor: colorsFor(labels, '#5D42A9', selectedKey)
      }
    ]
  }
}

export default {
  name: 'AgeDashboard',
  components: { Bar },
  props: {
    personas: { type: Array, required: true }
  },
  data() {
    return {
      selectedYear: null,
      activeFilters: {},
      isDesktop: true
    }
  },
  computed: {
    barOptions() {
      const colors = CHART_COLORS[themeState.value]
      return {
        responsive: true,
        // Chart.js usa aspectRatio 2 (ancho:alto) por defecto para Bar. El
        // 35% menos alto pedido es solo para desktop (ver mql en
        // mounted/beforeUnmount) — en mobile se deja el ratio normal, si no
        // el gráfico queda demasiado achatado en pantallas angostas.
        aspectRatio: this.isDesktop ? 2 / 0.65 : 2,
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
    // Personas para el gráfico de "edad": aplica todos los filtros activos
    // menos el suyo propio, así tocar una barra filtra el resto del
    // dashboard sin autofiltrarse (se seguiría viendo solo la barra tocada).
    agePersonas() {
      return this.personasExcluding('edad')
    },
    updatedAgePersonas() {
      return this.personasExcluding('updatedEdad')
    },
    ages() {
      return this.agePersonas.map((p) => p.edad).filter((e) => e != null)
    },
    ageStats() {
      return { avg: round1(average(this.ages)), median: round1(median(this.ages)) }
    },
    ageChartData() {
      return toBarChartData(countByValue(this.ages), this.activeFilters.edad ?? null)
    },
    updatedAges() {
      const today = new Date()
      return this.updatedAgePersonas
        .filter((p) => p.edad != null && p.fecha)
        .map((p) => p.edad + fullYearsSince(p.fecha, today))
    },
    updatedAgeStats() {
      return { avg: round1(average(this.updatedAges)), median: round1(median(this.updatedAges)) }
    },
    updatedAgeChartData() {
      return toBarChartData(countByValue(this.updatedAges), this.activeFilters.updatedEdad ?? null)
    },
    perYearRows() {
      // La tabla por año no depende de selectedYear (es su propio filtro),
      // pero sí de los filtros de los gráficos de edad de arriba.
      const base = this.personasExcluding(null, { skipYear: true })

      const byYear = {}
      const ratingsByYear = {}
      base.forEach((p) => {
        if (p.edad == null || !p.fecha) return
        const year = Number(p.fecha.slice(0, 4))
        if (!byYear[year]) byYear[year] = []
        byYear[year].push(p.edad)
        // El rating se junta en un acumulador aparte porque no toda persona
        // con edad tiene rating cargado (average()/median() ya filtran null).
        if (p.rating != null) {
          if (!ratingsByYear[year]) ratingsByYear[year] = []
          ratingsByYear[year].push(p.rating)
        }
      })

      return Object.keys(byYear)
        .map(Number)
        .sort((a, b) => a - b)
        .map((year) => {
          const avg = average(byYear[year])
          const med = median(byYear[year])
          const myAge = MY_AGE_REFERENCE.age + (year - MY_AGE_REFERENCE.year)
          return {
            year,
            avg: round1(avg),
            median: round1(med),
            myAge,
            ratingAvg: round1(average(ratingsByYear[year] || [])),
            diffAvg: avg == null ? null : avg - myAge,
            diffMedian: med == null ? null : med - myAge
          }
        })
    }
  },
  mounted() {
    // Mismo breakpoint que el "md" de Tailwind, usado en el resto del panel.
    this.desktopMql = window.matchMedia('(min-width: 768px)')
    this.isDesktop = this.desktopMql.matches
    this.desktopMql.addEventListener('change', this.handleDesktopChange)
  },
  beforeUnmount() {
    this.desktopMql?.removeEventListener('change', this.handleDesktopChange)
  },
  methods: {
    handleDesktopChange(event) {
      this.isDesktop = event.matches
    },
    // Aplica selectedYear + todos los activeFilters menos `excludeField`
    // (null = todos). Cada gráfico usa esto con su propio field para no
    // autofiltrarse; la tabla por año pasa skipYear para no autofiltrarse
    // tampoco respecto de selectedYear.
    personasExcluding(excludeField, { skipYear = false } = {}) {
      let list = this.personas
      if (!skipYear && this.selectedYear) {
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
    barOptionsFor(field) {
      return {
        ...this.barOptions,
        onClick: (evt, elements, chart) => this.handleChartClick(field, chart, elements),
        onHover: this.handleChartHover
      }
    },
    formatDiff(diff) {
      if (diff == null) return '—'
      const rounded = Math.round(diff * 10) / 10
      return rounded > 0 ? `+${rounded}` : `${rounded}`
    },
    diffBgClass(diff) {
      if (diff == null) return ''
      const abs = Math.abs(diff)
      if (abs <= 2) return 'bg-green-900/40'
      if (abs <= 5) return 'bg-yellow-900/40'
      return 'bg-red-900/40'
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
