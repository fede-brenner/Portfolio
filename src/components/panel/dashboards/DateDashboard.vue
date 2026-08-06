<template>
  <div class="flex flex-col gap-6">
    <div class="bg-[#1c1d22] rounded p-4 pixel-corners flex flex-col gap-3">
      <div class="flex justify-between items-baseline">
        <h3 class="text-sm font-bold text-[#888888] uppercase">
          Filtros activos ({{ activeFilterChips.length }})
        </h3>
        <button
          v-if="activeFilterChips.length"
          class="text-xs text-[#8B6FD6] hover:underline"
          @click="clearAllFilters"
        >
          Quitar todos
        </button>
      </div>

      <div v-if="activeFilterChips.length" class="flex flex-wrap gap-2">
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

      <p v-if="!activeFilterChips.length" class="text-xs text-[#888888] mt-2 mb-3 text-start">
        Tocá una barra para filtrar el resto de los gráficos.
      </p>

      <div class="flex items-center gap-2">
        <ToggleSwitch v-model="desglosar" />
        <span class="text-sm text-[#888888]">
          Desglosar por {{ boolLabels.bool1 }} / {{ boolLabels.bool2 }} / {{ boolLabels.bool3 }}
        </span>
      </div>
    </div>

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
      <div style="height: 320px">
        <Bar :data="byDayOfMonthData" :options="chartOptionsFor('day', { maintainAspectRatio: false })" />
      </div>
    </div>

    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Por mes de cada año</h3>
      <div class="overflow-x-auto calendar-scroll">
        <div
          class="lg:!min-w-0 lg:w-full"
          :style="{ '--ym-chart-w': yearMonthChartWidth + 'px', minWidth: 'var(--ym-chart-w)', height: '320px' }"
        >
          <Bar :data="byYearMonthData" :options="chartOptionsFor('yearMonth', { maintainAspectRatio: false })" />
        </div>
      </div>
    </div>

    <div class="bg-[#1c1d22] rounded p-4 pixel-corners">
      <h3 class="text-sm font-bold mb-2 text-[#888888] uppercase">Calendario de fechas</h3>
      <div v-if="!calendarWeeks.length" class="text-sm text-[#888888]">Sin fechas cargadas.</div>
      <div v-else class="flex">
        <!-- Eje de días, fuera del contenedor con scroll: queda fijo a la
             izquierda sin importar cuánto se scrollee horizontalmente. El
             spacer de arriba iguala la altura del header año+mes del lado
             derecho, para que las filas de Lun/Mié/Vie queden alineadas con
             sus cuadrados. -->
        <div class="flex flex-col mr-1 flex-shrink-0">
          <div style="height: 28px"></div>
          <div class="grid" :style="{ gridTemplateRows: 'repeat(7, 12px)', gap: '3px', width: '20px' }">
            <span
              v-for="label in dayLabels"
              :key="label.row"
              class="text-[10px] text-[#888888] leading-[12px]"
              :style="{ gridRow: label.row }"
            >{{ label.text }}</span>
          </div>
        </div>

        <div ref="calendarScroll" class="overflow-x-auto calendar-scroll">
          <div style="width: max-content" class="pb-2">
            <!-- Año (arriba) y mes (abajo) por semana donde cambian, en la
                 misma coordenada X que esa columna. -->
            <div class="relative" style="height: 28px" :style="{ width: (calendarWeeks.length * 15) + 'px' }">
              <span
                v-for="label in calendarYearLabels"
                :key="'year-' + label.weekIndex"
                class="absolute top-0 text-[10px] font-bold text-[#888888] whitespace-nowrap"
                :style="{ left: (label.weekIndex * 15) + 'px' }"
              >{{ label.text }}</span>
              <span
                v-for="label in calendarMonthLabels"
                :key="'month-' + label.weekIndex"
                class="absolute text-[10px] text-[#888888] whitespace-nowrap"
                style="top: 14px"
                :style="{ left: (label.weekIndex * 15) + 'px' }"
              >{{ label.text }}</span>
            </div>

            <div
              class="grid gap-[3px]"
              :style="{
                gridTemplateColumns: `repeat(${calendarWeeks.length}, 12px)`,
                gridTemplateRows: 'repeat(7, 12px)',
                gridAutoFlow: 'column'
              }"
            >
              <span
                v-for="day in calendarDays"
                :key="day.date"
                class="calendar-day"
                :class="{ 'calendar-day--empty': day.level < 0 }"
                :style="{ backgroundColor: day.level < 0 ? 'transparent' : calendarColors[day.level] }"
                :title="day.level < 0 ? '' : `${day.date}: ${day.count} persona${day.count === 1 ? '' : 's'}`"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <p class="text-xs text-[#888888] mt-2">
        Cada cuadrado es un día; cuanto más violeta, más personas en esa fecha. Se adapta a los filtros de los otros gráficos.
      </p>
      <div class="flex flex-wrap gap-3 mt-2">
        <div v-for="item in calendarLegend" :key="item.level" class="flex items-center gap-1.5 text-xs text-[#888888]">
          <span class="calendar-legend-swatch" :style="{ backgroundColor: calendarColors[item.level] }"></span>
          {{ item.text }}
        </div>
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
import ToggleSwitch from '../ToggleSwitch.vue'
import { BOOL_LABELS, BOOL_COLORS } from '@/config/personaOptions'
import { themeState, CHART_COLORS } from '@/lib/theme'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const BOOL_KEYS = ['bool1', 'bool2', 'bool3']

// Escala de violetas para el calendario (índice 0 = sin personas). En UTC
// para no arrastrar corrimientos de huso horario al sumar/restar días.
const CALENDAR_COLORS_BY_THEME = {
  // Nivel 4 bajado de #d8cdfa (casi blanco) a #a78bfa: sigue siendo el más
  // claro/intenso de la escala, pero se lee como violeta y no como blanco.
  dark: ['#2a2b31', '#3a2f66', '#5f46a1', '#826ac5', '#a288f0'],
  light: ['#d8d8de', '#c3b3ec', '#957dda', '#6e54b4', '#4f4381']
}

// Fila 1-indexed dentro del grid de 7 filas (1=domingo ... 7=sábado). Solo
// lun/mié/vie, como el calendario de GitHub, para no saturar el eje.
const CALENDAR_DAY_LABELS = [
  { row: 2, text: 'Lun' },
  { row: 4, text: 'Mié' },
  { row: 6, text: 'Vie' }
]

function pad2(n) {
  return String(n).padStart(2, '0')
}

function toUTCDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day))
}

function toISOFromUTC(date) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`
}

// Nivel 1-4 según en qué cuarto del máximo cae el conteo (0 personas = nivel 0).
function levelFor(count, maxCount) {
  if (count <= 0) return 0
  const ratio = count / maxCount
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

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

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Si selectedKey no es null, la barra que coincide se muestra con el color
// pleno y el resto se atenúa (alpha baja) para marcar visualmente cuál está
// seleccionada sin necesidad de filtrar el propio gráfico. Devuelve siempre
// un array (nunca alterna array/string entre renders): Chart.js reutiliza
// las opciones resueltas por elemento entre updates, y alternar la forma del
// dato (string vs array) es lo que hacía que, al sacar el filtro, las barras
// atenuadas se quedaran pegadas en su color anterior en vez de volver todas
// al tono normal.
function colorsFor(keys, color, selectedKey) {
  return keys.map((k) => (selectedKey == null || k === selectedKey ? color : hexToRgba(color, 0.25)))
}

function buildChartData(bucket, entries, keyFor, desglosar, color, selectedKey = null) {
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
      datasets: [{
        label: 'Personas',
        data: keys.map((k) => counts[k] || 0),
        backgroundColor: colorsFor(keys, color, selectedKey)
      }]
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
      backgroundColor: colorsFor(keys, BOOL_COLORS[bk], selectedKey)
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
  date: (p, value) => p.fecha === value,
  bool: (p, value) => !!p[value]
}

const FILTER_LABELS = {
  year: 'Año',
  month: 'Mes',
  day: 'Día del mes',
  yearMonth: 'Mes de cada año',
  date: 'Fecha exacta',
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
      return this.personasExcluding(null)
    },
    fechas() {
      return this.fechasExcluding(null)
    },
    // Fechas para cada gráfico en particular: aplican todos los filtros
    // activos MENOS el propio del gráfico, así tocar una barra filtra el
    // resto de los gráficos pero no se autofiltra (se seguiría viendo solo
    // la opción tocada, sin poder ver ni destocar el resto de las barras).
    fechasByYear() {
      return this.fechasExcluding('year')
    },
    fechasByMonth() {
      return this.fechasExcluding('month')
    },
    fechasByDay() {
      return this.fechasExcluding('day')
    },
    fechasByYearMonth() {
      return this.fechasExcluding('yearMonth')
    },
    fechasByDate() {
      return this.fechasExcluding('date')
    },
    byYearData() {
      return buildChartData(
        yearBuckets(this.fechasByYear),
        this.fechasByYear,
        (e) => String(e.year),
        this.desglosar,
        '#5D42A9',
        this.activeFilters.year ?? null
      )
    },
    byMonthData() {
      return buildChartData(
        monthBuckets(),
        this.fechasByMonth,
        (e) => String(e.month),
        this.desglosar,
        '#8B6FD6',
        this.activeFilters.month ?? null
      )
    },
    byDayOfMonthData() {
      return buildChartData(
        dayOfMonthBuckets(),
        this.fechasByDay,
        (e) => String(e.day),
        this.desglosar,
        '#2c7a7b',
        this.activeFilters.day ?? null
      )
    },
    byYearMonthData() {
      return buildChartData(
        yearMonthBuckets(this.fechasByYearMonth),
        this.fechasByYearMonth,
        (e) => `${e.year}-${String(e.month).padStart(2, '0')}`,
        this.desglosar,
        '#c05746',
        this.activeFilters.yearMonth ?? null
      )
    },
    // Ancho mínimo para que cada barra tenga espacio legible (no se aplaste
    // en mobile); el contenedor padre scrollea horizontalmente si esto supera
    // el ancho visible en vez de comprimir las barras.
    yearMonthChartWidth() {
      return Math.max(280, (this.byYearMonthData.labels.length || 0) * 18)
    },
    calendarColors() {
      return CALENDAR_COLORS_BY_THEME[themeState.value]
    },
    // Conteo por fecha completa (YYYY-MM-DD), reusado por calendarWeeks y por
    // la leyenda (para calcular a qué rango de personas equivale cada color).
    calendarCounts() {
      const counts = {}
      this.fechasByDate.forEach((e) => {
        const key = `${e.year}-${pad2(e.month)}-${pad2(e.day)}`
        counts[key] = (counts[key] || 0) + 1
      })
      return counts
    },
    calendarMaxCount() {
      return Math.max(1, ...Object.values(this.calendarCounts))
    },
    // Semanas completas (domingo a sábado) que cubren el rango real de fechas,
    // con relleno antes/después marcado como level -1 (no se pinta, solo
    // completa la grilla para que las semanas queden alineadas por columna).
    calendarWeeks() {
      if (!this.fechasByDate.length) return []

      const counts = this.calendarCounts
      const times = this.fechasByDate.map((e) => toUTCDate(e.year, e.month, e.day).getTime())
      const minTime = Math.min(...times)
      // Llega hasta hoy (no solo hasta la última fecha con datos), así se ve
      // el hueco entre la última persona cargada y el día actual en vez de
      // cortar el calendario justo ahí. Si hay una fecha futura cargada, esa
      // sigue siendo el límite (Math.max se queda con la mayor de las dos).
      const todayTime = (() => {
        const now = new Date()
        return toUTCDate(now.getFullYear(), now.getMonth() + 1, now.getDate()).getTime()
      })()
      const maxTime = Math.max(...times, todayTime)

      const start = new Date(minTime)
      start.setUTCDate(start.getUTCDate() - start.getUTCDay())
      const end = new Date(maxTime)
      end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()))

      const maxCount = this.calendarMaxCount

      const weeks = []
      const cursor = new Date(start)
      while (cursor.getTime() <= end.getTime()) {
        const week = []
        for (let d = 0; d < 7; d++) {
          const dateStr = toISOFromUTC(cursor)
          const inRange = cursor.getTime() >= minTime && cursor.getTime() <= maxTime
          const count = counts[dateStr] || 0
          week.push({ date: dateStr, count, level: inRange ? levelFor(count, maxCount) : -1 })
          cursor.setUTCDate(cursor.getUTCDate() + 1)
        }
        weeks.push(week)
      }
      return weeks
    },
    // El grid CSS (grid-auto-flow: column) llena columna por columna, así que
    // necesita los días en orden semana-por-semana (7 seguidos = 1 columna).
    calendarDays() {
      return this.calendarWeeks.flat()
    },
    dayLabels() {
      return CALENDAR_DAY_LABELS
    },
    // Un label por semana donde cambia el mes respecto a la semana anterior.
    // Usa el primer día de la semana como referencia. El año va en un label
    // aparte (calendarYearLabels, misma coordenada X) arriba de este.
    calendarMonthLabels() {
      const labels = []
      let lastMonth = null
      this.calendarWeeks.forEach((week, index) => {
        const [, month] = week[0].date.split('-').map(Number)
        if (month !== lastMonth) {
          labels.push({ weekIndex: index, text: MONTH_NAMES[month - 1].slice(0, 3) })
          lastMonth = month
        }
      })
      return labels
    },
    // Un label por semana donde cambia el año respecto a la anterior (incluye
    // la primera semana del rango, sea cual sea el mes en que arranquen los
    // datos). Queda arriba del mes correspondiente (mismo weekIndex).
    calendarYearLabels() {
      const labels = []
      let lastYear = null
      this.calendarWeeks.forEach((week, index) => {
        const [year] = week[0].date.split('-').map(Number)
        if (year !== lastYear) {
          labels.push({ weekIndex: index, text: String(year) })
          lastYear = year
        }
      })
      return labels
    },
    // Rango de personas que representa cada color, calculado recorriendo
    // conteo por conteo con la misma levelFor() que colorea los cuadrados
    // (así no se puede desincronizar el texto de la leyenda del color real).
    calendarLegend() {
      if (!this.fechasByDate.length) return []
      const max = this.calendarMaxCount
      const byLevel = { 1: [], 2: [], 3: [], 4: [] }
      for (let count = 1; count <= max; count++) {
        byLevel[levelFor(count, max)].push(count)
      }
      const items = [{ level: 0, text: '0' }]
      ;[1, 2, 3, 4].forEach((level) => {
        const counts = byLevel[level]
        if (!counts.length) return
        const min = counts[0]
        const maxOfLevel = counts[counts.length - 1]
        items.push({
          level,
          text: min === maxOfLevel ? `${min}` : `${min}-${maxOfLevel}`
        })
      })
      return items
    }
  },
  watch: {
    desglosar(value) {
      if (!value) this.clearFilter('bool')
    },
    // Recién cargan los datos (o cambian los filtros) de forma async, así que
    // el ancho real del calendario no está listo hasta el siguiente tick.
    calendarWeeks() {
      this.$nextTick(this.scrollCalendarToEnd)
    }
  },
  mounted() {
    this.$nextTick(this.scrollCalendarToEnd)
  },
  methods: {
    // Aplica todos los filtros activos menos `excludeField` (null = todos).
    // Cada gráfico usa esto con su propio field para no autofiltrarse.
    personasExcluding(excludeField) {
      let list = this.personas
      Object.entries(this.activeFilters).forEach(([field, value]) => {
        if (value == null) return
        if (field === excludeField) return
        list = list.filter((p) => FILTER_PREDICATES[field](p, value))
      })
      return list
    },
    fechasExcluding(excludeField) {
      return this.personasExcluding(excludeField)
        .filter((p) => p.fecha)
        .map((p) => ({ ...parseFecha(p.fecha), persona: p }))
    },
    scrollCalendarToEnd() {
      const el = this.$refs.calendarScroll
      if (el) el.scrollLeft = el.scrollWidth
    },
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
    chartOptionsFor(bucketField, overrides = {}) {
      return {
        ...this.chartOptions,
        ...overrides,
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

.calendar-day {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.calendar-legend-swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* El scrollbar global (index.css) usa el fondo de la página (#131418) para
   el track, más oscuro que la tarjeta de este gráfico (#1c1d22) — acá se
   pisa solo para este scroller en particular, para que quede del mismo
   color que la tarjeta en vez de destacarse. */
.calendar-scroll::-webkit-scrollbar-track {
  background: #1c1d22;
}

.calendar-scroll::-webkit-scrollbar-thumb {
  border-color: #1c1d22;
}

.calendar-scroll::-webkit-scrollbar-corner {
  background: #1c1d22;
}

.calendar-scroll {
  scrollbar-color: #5D42A9 #1c1d22;
}

[data-theme='light'] .calendar-scroll::-webkit-scrollbar-track {
  background: #faf6ec;
}

[data-theme='light'] .calendar-scroll::-webkit-scrollbar-thumb {
  border-color: #faf6ec;
}

[data-theme='light'] .calendar-scroll::-webkit-scrollbar-corner {
  background: #faf6ec;
}

[data-theme='light'] .calendar-scroll {
  scrollbar-color: #9379CC #faf6ec;
}
</style>
