<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="inline-block" :class="sizeClass">
    <path v-if="filled" d="M13 3h2v4h8v4h-2v2h-2v3h2v6h-5v-2h-2v-2h-4v2H8v2H3v-6h2v-3H3v-2H1V7h8V3h2V1h2v2Z" />
    <path
      v-else
      d="M5 20h3v2H3v-6h2v4Zm16 2h-5v-2h3v-4h2v6Zm-11-2H8v-2h2v2Zm6 0h-2v-2h2v2Zm-2-2h-4v-2h4v2Zm-7-2H5v-3h2v3Zm12 0h-2v-3h2v3ZM5 13H3v-2h2v2Zm16 0h-2v-2h2v2ZM9 9H3v2H1V7h8v2Zm14 2h-2V9h-6V7h8v4ZM11 7H9V3h2v4Zm4 0h-2V3h2v4Zm-2-4h-2V1h2v2Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'PixelStar',
  props: {
    filled: { type: Boolean, default: false },
    // 'lg' = 24px (w-6 h-6), un 50% más grande que el default (16px, w-4 h-4).
    size: { type: String, default: 'md' }
  },
  computed: {
    sizeClass() {
      return this.size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
    }
  }
}
</script>
