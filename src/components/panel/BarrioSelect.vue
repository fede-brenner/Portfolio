<template>
  <div class="relative">
    <div class="pixel-corners-sm bg-[#5D42A9] p-px w-full">
      <input
        ref="input"
        v-model="query"
        type="text"
        autocomplete="off"
        placeholder="Buscar barrio, ciudad o lugar..."
        class="pixel-corners-sm bg-[#131418] px-2 py-1 w-full text-left"
        @focus="open = true"
        @input="onInput"
        @keydown.esc="close"
      />
    </div>

    <div
      v-if="open"
      class="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto bg-[#1c1d22] border border-[#5D42A9] rounded text-left"
    >
      <div v-if="!isGoogleMapsConfigured" class="px-2 py-2 text-xs text-[#888888]">
        Google Maps no está configurado — este campo funciona como texto libre, sin
        geolocalización.
      </div>

      <template v-else>
        <div v-if="loading" class="px-2 py-2 text-xs text-[#888888]">Buscando...</div>
        <div v-else-if="loadError" class="px-2 py-2 text-xs text-red-400">{{ loadError }}</div>
        <div v-else-if="query.trim() && !suggestions.length" class="px-2 py-2 text-xs text-[#888888]">
          Sin resultados. Podés dejar el texto tal cual como lugar libre.
        </div>

        <div
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="px-2 py-1 cursor-pointer text-sm hover:bg-[#5D42A9]"
          @mousedown.prevent="selectSuggestion(suggestion)"
        >
          {{ suggestion.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { loadPlacesLibrary, isGoogleMapsConfigured } from '@/lib/googleMaps'

export default {
  name: 'BarrioSelect',
  props: {
    modelValue: { type: String, default: '' }
  },
  emits: ['update:modelValue', 'update:coords'],
  data() {
    return {
      query: this.modelValue,
      open: false,
      loading: false,
      loadError: '',
      suggestions: [],
      sessionToken: null,
      isGoogleMapsConfigured,
      debounceTimer: null
    }
  },
  watch: {
    modelValue(val) {
      if (!this.open) this.query = val
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
    clearTimeout(this.debounceTimer)
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
  },
  methods: {
    close() {
      this.open = false
      this.query = this.modelValue
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) this.close()
    },
    onInput() {
      this.$emit('update:modelValue', this.query)
      this.open = true
      clearTimeout(this.debounceTimer)
      if (!this.isGoogleMapsConfigured) return
      if (this.query.trim().length < 2) {
        this.suggestions = []
        return
      }
      this.debounceTimer = setTimeout(() => this.fetchSuggestions(), 300)
    },
    async fetchSuggestions() {
      const input = this.query.trim()
      this.loading = true
      this.loadError = ''
      try {
        const places = await loadPlacesLibrary()
        if (!this.sessionToken) this.sessionToken = new places.AutocompleteSessionToken()
        const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          sessionToken: this.sessionToken,
          language: 'es'
        })
        if (this.query.trim() !== input) return
        this.suggestions = suggestions
          .filter((s) => s.placePrediction)
          .map((s) => ({
            id: s.placePrediction.placeId,
            text: s.placePrediction.text.text,
            prediction: s.placePrediction
          }))
      } catch (err) {
        this.loadError = 'No se pudieron cargar sugerencias: ' + (err.message || err)
        this.suggestions = []
      } finally {
        this.loading = false
      }
    },
    normalizarBarrio(val) {
        if (!val) return null
        // Regex case-insensitive para capturar variaciones (con/sin tilde)
        if (/^ciudad\s+aut[oó]noma\s+de\s+buenos\s+aires$/i.test(val.trim())) {
            return 'CABA'
        }
        return val.trim()
    },
    async selectSuggestion(suggestion) {
      try {
        const place = suggestion.prediction.toPlace()
        await place.fetchFields({ fields: ['location', 'displayName', 'formattedAddress'] })
        const label = place.displayName || place.formattedAddress || suggestion.text
        this.query = this.normalizarBarrio(label)
        this.$emit('update:modelValue', this.normalizarBarrio(label))
        if (place.location) {
          this.$emit('update:coords', { lat: place.location.lat(), lng: place.location.lng() })
        }
      } catch (err) {
        this.loadError = 'No se pudo obtener la ubicación: ' + (err.message || err)
      } finally {
        this.suggestions = []
        this.sessionToken = null
        this.open = false
      }
    }
  }
}
</script>
