<template>
  <button
    type="button"
    class="pixel-corners-sm shrink-0 w-8 flex items-center justify-center transition-colors"
    :class="modelValue ? 'bg-[#5D42A9] text-white hover:bg-[#8B6FD6]' : 'bg-[#1c1d22] text-[#888888] hover:bg-[#2a2b31]'"
    :aria-pressed="modelValue"
    :title="title"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <svg width="10" height="14" viewBox="0 0 5 7" shape-rendering="crispEdges" fill="currentColor">
      <rect x="1" y="0" width="1" height="1" />
      <rect x="2" y="0" width="1" height="1" />
      <rect x="3" y="0" width="1" height="1" />
      <rect x="0" y="1" width="1" height="1" />
      <rect x="4" y="1" width="1" height="1" />
      <rect x="4" y="2" width="1" height="1" />
      <rect x="3" y="3" width="1" height="1" />
      <rect x="2" y="4" width="1" height="1" />
      <rect x="2" y="6" width="1" height="1" />
    </svg>
  </button>
</template>

<script>
// Boton toggle chico (icono "?" pixelado) para marcar un campo como "dato no
// seguro" sin ocupar una fila extra de texto debajo del input.
export default {
  name: 'IconToggle',
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' }
  },
  emits: ['update:modelValue']
}
</script>
