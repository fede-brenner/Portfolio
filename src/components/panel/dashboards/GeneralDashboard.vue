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

function toPieData(sortedEntries, colorFor) {
  const labels = sortedEntries.map(([l]) => l)
  return {
    labels,
    datasets: [
      {
        data: sortedEntries.map(([, v]) => v),
        backgroundColor: labels.map((l, i) => colorFor?.(l) || PALETTE[i % PALETTE.length])
      }
    ]
  }
}

function toBarData(sortedEntries, label, colorFor) {
  const labels = sortedEntries.map(([l]) => l)
  return {
    labels,
    datasets: [
      {
        label,
        data: sortedEntries.map(([, v]) => v),
        backgroundColor: labels.map((l, i) => colorFor?.(l) || PALETTE[i % PALETTE.length])
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
  nombre: (p) => p.nombre || 'Sin dato'
}

const FIELD_LABELS = {
  posicion: 'Posición',
  colorPelo: 'Color de pelo',
  queSeHizo: 'Qué se hizo',
  visual: 'Visual',
  nombre: 'Nombre'
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
        list = list.filter((p) => p.fecha && Number(p.fecha.slice(0, 4)) === this.selectedYear)
      }
      Object.entries(this.activeFilters).forEach(([field, value]) => {
        const getValue = FIELD_GETTERS[field]
        list = list.filter((p) => getValue(p) === value)
      })
      return list
    },
    posicionPieData() {
      return toPieData(
        sortDesc(countBy(this.filteredPersonas, (p) => p.posicion)),
        (l) => POSICION_COLORS[l]
      )
    },
    colorPeloPieData() {
      return toPieData(
        sortDesc(countBy(this.filteredPersonas, (p) => p.color_pelo)),
        (l) => COLOR_PELO_COLORS[l]
      )
    },
    queSeHizoPieData() {
      return toPieData(
        sortDesc(countBy(this.filteredPersonas, queSeHizoCategoria)),
        (l) => QUE_SE_HIZO_COLORS[l]
      )
    },
    visualPieData() {
      return toPieData(
        sortDesc(countBy(this.filteredPersonas, (p) => p.visual)),
        (l) => VISUAL_COLORS[l]
      )
    },
    topNamesBarData() {
      const sorted = sortDesc(countBy(this.filteredPersonas, (p) => p.nombre)).slice(0, 20)
      return toBarData(sorted, 'Personas')
    },
    topNamesChartHeight() {
      return chartHeightFor(this.topNamesBarData.labels.length)
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
