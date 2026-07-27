<template>
  <svg width="10" height="6" viewBox="0 0 5 3" shape-rendering="crispEdges" fill="currentColor" class="inline-block align-middle">
    <rect v-for="(r, i) in rects" :key="i" :x="r[0]" :y="r[1]" width="1" height="1" />
  </svg>
</template>

<script>
// Triangulo pixelado chico (5x3), usado para el indicador de orden de
// PersonasList.vue y el chevron del menu de usuario en PanelView.vue.
const DOWN = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [1, 1], [2, 1], [3, 1], [2, 2]]
const UP = [[2, 0], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]]

export default {
  name: 'PixelTriangle',
  props: {
    direction: { type: String, default: 'down' }
  },
  computed: {
    rects() {
      return this.direction === 'up' ? UP : DOWN
    }
  }
}
</script>
