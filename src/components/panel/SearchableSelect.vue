<template>
  <div class="relative">
    <div class="pixel-corners-sm bg-[#5D42A9] p-px w-full">
      <input
        ref="input"
        v-model="query"
        type="text"
        autocomplete="off"
        :required="required"
        :placeholder="placeholder"
        class="pixel-corners-sm bg-[#131418] px-2 py-1 w-full text-left"
        @focus="onFocus"
        @input="open = true"
        @keydown.esc="close"
        @keydown.down.prevent="moveHighlight(1)"
        @keydown.up.prevent="moveHighlight(-1)"
        @keydown.enter.prevent="selectHighlighted"
      />
    </div>
    <ul
      v-if="open && filteredOptions.length"
      class="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto bg-[#1c1d22] border border-[#5D42A9] rounded text-left"
    >
      <li
        v-for="(opt, i) in filteredOptions"
        :key="opt"
        class="px-2 py-1 cursor-pointer flex items-center gap-1.5 text-sm"
        :class="{ 'bg-[#5D42A9]': i === highlighted }"
        @mousedown.prevent="select(opt)"
        @mouseenter="highlighted = i"
      >
        <span v-if="flags && flags[opt]" :class="`fi fi-${flags[opt]}`"></span>
        <span>{{ opt }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchableSelect',
  props: {
    modelValue: { type: String, default: '' },
    options: { type: Array, required: true },
    placeholder: { type: String, default: 'Buscar...' },
    flags: { type: Object, default: null },
    required: { type: Boolean, default: false }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      query: this.modelValue,
      open: false,
      highlighted: 0
    }
  },
  computed: {
    filteredOptions() {
      const q = this.query.trim().toLowerCase()
      if (!q) return this.options
      return this.options.filter((opt) => opt.toLowerCase().includes(q))
    }
  },
  watch: {
    modelValue(val) {
      if (!this.open) this.query = val
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    onFocus() {
      this.query = ''
      this.open = true
      this.highlighted = 0
    },
    close() {
      this.open = false
      this.query = this.modelValue
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) this.close()
    },
    select(opt) {
      this.$emit('update:modelValue', opt)
      this.query = opt
      this.open = false
    },
    moveHighlight(delta) {
      if (!this.open) {
        this.open = true
        return
      }
      const max = this.filteredOptions.length - 1
      this.highlighted = Math.min(max, Math.max(0, this.highlighted + delta))
    },
    selectHighlighted() {
      const opt = this.filteredOptions[this.highlighted]
      if (opt) this.select(opt)
    }
  }
}
</script>
