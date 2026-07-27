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
          Promedio: <strong class="text-white">{{ ageStats.avg }}</strong> —
          Mediana: <strong class="text-white">{{ ageStats.median }}</strong>
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
          Promedio: <strong class="text-white">{{ updatedAgeStats.avg }}</strong> —
          Mediana: <strong class="text-white">{{ updatedAgeStats.median }}</strong>
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

function toBarChartData(counts) {
  const labels = Object.keys(counts)
    .map(Number)
    .sort((a, b) => a - b)
  return {
    labels: labels.map(String),
    datasets: [
      {
        label: 'Personas',
        data: labels.map((l) => counts[l]),
        backgroundColor: '#5D42A9'
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
      activeFilters: {}
    }
  },
  computed: {
    barOptions() {
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
      let list = this.personas
      if (this.selectedYear) {
        list = list.filter(
          (p) => p.fecha && Number(p.fecha.slice(0, 4)) === this.selectedYear
        )
      }
      Object.entries(this.activeFilters).forEach(([field, value]) => {
        const getValue = FIELD_GETTERS[field]
        list = list.filter((p) => getValue(p) === value)
      })
      return list
    },
    ages() {
      return this.filteredPersonas.map((p) => p.edad).filter((e) => e != null)
    },
    ageStats() {
      return { avg: round1(average(this.ages)), median: round1(median(this.ages)) }
    },
    ageChartData() {
      return toBarChartData(countByValue(this.ages))
    },
    updatedAges() {
      const today = new Date()
      return this.filteredPersonas
        .filter((p) => p.edad != null && p.fecha)
        .map((p) => p.edad + fullYearsSince(p.fecha, today))
    },
    updatedAgeStats() {
      return { avg: round1(average(this.updatedAges)), median: round1(median(this.updatedAges)) }
    },
    updatedAgeChartData() {
      return toBarChartData(countByValue(this.updatedAges))
    },
    perYearRows() {
      let base = this.personas
      Object.entries(this.activeFilters).forEach(([field, value]) => {
        const getValue = FIELD_GETTERS[field]
        base = base.filter((p) => getValue(p) === value)
      })

      const byYear = {}
      base.forEach((p) => {
        if (p.edad == null || !p.fecha) return
        const year = Number(p.fecha.slice(0, 4))
        if (!byYear[year]) byYear[year] = []
        byYear[year].push(p.edad)
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
            diffAvg: avg == null ? null : avg - myAge,
            diffMedian: med == null ? null : med - myAge
          }
        })
    }
  },
  methods: {
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
