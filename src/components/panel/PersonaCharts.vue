<template>
  <div>
    <p v-if="loading" class="text-[#888888]">Cargando gráficos...</p>
    <p v-else-if="!personas.length" class="text-[#888888]">Todavía no hay datos para graficar.</p>

    <template v-else>
      <PixelTabs v-model="section" class="mb-6" :tabs="tabs" />

      <component :is="currentDashboard" :personas="personas" />
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import PixelTabs from './PixelTabs.vue'

const GeoDashboard = defineAsyncComponent(() => import('./dashboards/GeoDashboard.vue'))
const AgeDashboard = defineAsyncComponent(() => import('./dashboards/AgeDashboard.vue'))
const DateDashboard = defineAsyncComponent(() => import('./dashboards/DateDashboard.vue'))
const GeneralDashboard = defineAsyncComponent(() => import('./dashboards/GeneralDashboard.vue'))

export default {
  name: 'PersonaCharts',
  components: { PixelTabs },
  props: {
    personas: { type: Array, required: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    const tabs = [
      { key: 'geografia', label: 'Geografía' },
      { key: 'edades', label: 'Edades' },
      { key: 'fechas', label: 'Fechas' },
      { key: 'general', label: 'General' }
    ]
    const stored = localStorage.getItem('panel:chartsSection')
    return {
      section: tabs.some((t) => t.key === stored) ? stored : 'geografia',
      tabs
    }
  },
  computed: {
    currentDashboard() {
      return {
        geografia: GeoDashboard,
        edades: AgeDashboard,
        fechas: DateDashboard,
        general: GeneralDashboard
      }[this.section]
    }
  },
  watch: {
    section(value) {
      localStorage.setItem('panel:chartsSection', value)
    }
  }
}
</script>
