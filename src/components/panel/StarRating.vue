<template>
  <div class="inline-flex items-center gap-0.5" :class="{ 'cursor-pointer': !readonly }">
    <button
      v-for="n in max"
      :key="n"
      type="button"
      :disabled="readonly"
      class="p-0 leading-none disabled:cursor-default"
      :class="starColorClass(n)"
      :title="readonly ? null : `${n} estrella${n === 1 ? '' : 's'}`"
      @click="!readonly && $emit('update:modelValue', modelValue === n ? 0 : n)"
      @mouseenter="!readonly && (hovered = n)"
      @mouseleave="!readonly && (hovered = 0)"
    >
      <PixelStar :filled="isActive(n)" :size="size" />
    </button>
    <span v-if="showValue && modelValue" class="text-xs text-[#888888] ml-1">{{ modelValue }}/{{ max }}</span>
  </div>
</template>

<script>
import PixelStar from './icons/PixelStar.vue'

export default {
  name: 'StarRating',
  components: { PixelStar },
  props: {
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 5 },
    readonly: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false },
    size: { type: String, default: 'md' }
  },
  emits: ['update:modelValue'],
  data() {
    return { hovered: 0 }
  },
  methods: {
    isActive(n) {
      return this.hovered ? n <= this.hovered : n <= (this.modelValue || 0)
    },
    starColorClass(n) {
      return this.isActive(n) ? 'text-[#d4a017]' : 'text-[#3a3b42]'
    }
  }
}
</script>
