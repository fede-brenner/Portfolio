<template>
  <span v-if="pais" class="inline-flex items-center gap-1.5">
    <span v-if="flagCode" :class="`fi fi-${flagCode}`" class="rounded-sm"></span>
    <span>{{ probable ? 'Prob. ' : '' }}{{ pais }}</span>
  </span>
</template>

<script>
import { PAIS_FLAG_CODES } from '@/config/personaOptions'

export default {
  name: 'PaisFlag',
  props: {
    pais: { type: String, default: '' },
    probable: { type: Boolean, default: false }
  },
  computed: {
    flagCode() {
      return PAIS_FLAG_CODES[this.pais] || null
    }
  }
}
</script>
