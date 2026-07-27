<template>
  <button
    type="button"
    class="toggle-switch"
    :class="{ 'toggle-disabled': disabled }"
    :disabled="disabled"
    @click="!disabled && $emit('update:modelValue', !modelValue)"
  >
    <svg
      :width="TRACK_WIDTH"
      :height="TRACK_HEIGHT"
      :viewBox="`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT}`"
      shape-rendering="crispEdges"
      class="toggle-track"
    >
      <polygon :points="trackOuterPoints" class="toggle-track-outer" />
      <polygon :points="trackInnerPoints" class="toggle-track-inner" :class="{ on: modelValue }" />
    </svg>
    <svg
      :width="KNOB_SIZE"
      :height="KNOB_SIZE"
      :viewBox="`0 0 ${KNOB_SIZE} ${KNOB_SIZE}`"
      shape-rendering="crispEdges"
      class="toggle-knob"
      :class="{ on: modelValue }"
    >
      <polygon :points="knobPoints" class="toggle-knob-fill" />
    </svg>
  </button>
</template>

<script>
const TRACK_WIDTH = 36
const TRACK_HEIGHT = 18
const TRACK_NOTCH_STEP = 2
const TRACK_NOTCH_DEPTH = 4
const BORDER_WIDTH = 2

const KNOB_SIZE = 10
const KNOB_NOTCH_CUT = 2
// Inset del knob en las 4 direcciones = 4px (ver .toggle-knob más abajo):
// vertical, (TRACK_HEIGHT - KNOB_SIZE) / 2 = (18 - 10) / 2 = 4px lo centra;
// horizontal, 4px en vez de 2px deja un margen visible contra el borde en
// vez de quedar pegado a él.

// Silueta "esquinas pixeladas" en dos escalones, armada a mano con un
// polígono en vez de clip-path: clip-path siempre antialiasea sus bordes (no
// hay forma de pedirle bordes duros), mientras que shape-rendering
// ="crispEdges" en un polígono SVG sí los deja perfectamente nítidos incluso
// a este tamaño chico.
function notchedRectPoints(x, y, w, h, step, depth) {
  const points = [
    [x, y + h - depth],
    [x + step, y + h - depth],
    [x + step, y + h - step],
    [x + depth, y + h - step],
    [x + depth, y + h],
    [x + w - depth, y + h],
    [x + w - depth, y + h - step],
    [x + w - step, y + h - step],
    [x + w - step, y + h - depth],
    [x + w, y + h - depth],
    [x + w, y + depth],
    [x + w - step, y + depth],
    [x + w - step, y + step],
    [x + w - depth, y + step],
    [x + w - depth, y],
    [x + depth, y],
    [x + depth, y + step],
    [x + step, y + step],
    [x + step, y + depth],
    [x, y + depth]
  ]
  return points.map(([px, py]) => `${px},${py}`).join(' ')
}

// Mismo principio pero con un solo corte por esquina (usado en el knob, que
// es demasiado chico para el escalonado de dos pixeles del track).
function singleCutRectPoints(x, y, w, h, cut) {
  const points = [
    [x, y + h - cut],
    [x + cut, y + h - cut],
    [x + cut, y + h],
    [x + w - cut, y + h],
    [x + w - cut, y + h - cut],
    [x + w, y + h - cut],
    [x + w, y + cut],
    [x + w - cut, y + cut],
    [x + w - cut, y],
    [x + cut, y],
    [x + cut, y + cut],
    [x, y + cut]
  ]
  return points.map(([px, py]) => `${px},${py}`).join(' ')
}

export default {
  name: 'ToggleSwitch',
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      TRACK_WIDTH,
      TRACK_HEIGHT,
      KNOB_SIZE
    }
  },
  computed: {
    trackOuterPoints() {
      return notchedRectPoints(0, 0, TRACK_WIDTH, TRACK_HEIGHT, TRACK_NOTCH_STEP, TRACK_NOTCH_DEPTH)
    },
    trackInnerPoints() {
      // Mismo notch, pero en una caja inset por el "ancho de borde" en los
      // cuatro lados: así el aro violeta que queda entre ambos polígonos
      // sigue el escalonado en vez de cortarse en las esquinas.
      return notchedRectPoints(
        BORDER_WIDTH,
        BORDER_WIDTH,
        TRACK_WIDTH - BORDER_WIDTH * 2,
        TRACK_HEIGHT - BORDER_WIDTH * 2,
        TRACK_NOTCH_STEP,
        TRACK_NOTCH_DEPTH
      )
    },
    knobPoints() {
      return singleCutRectPoints(0, 0, KNOB_SIZE, KNOB_SIZE, KNOB_NOTCH_CUT)
    }
  }
}
</script>

<style scoped>
.toggle-switch {
  width: 36px;
  height: 18px;
  padding: 0;
  border: none;
  background: transparent;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  display: inline-block;
}

.toggle-track {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
}

.toggle-track-outer {
  fill: #5D42A9;
}

.toggle-track-inner {
  fill: #131418;
}

.toggle-track-inner.on {
  fill: #5D42A9;
}

.toggle-knob-fill {
  fill: #ffffff;
}

.toggle-switch.toggle-disabled {
  cursor: default;
  opacity: 0.75;
}

.toggle-knob {
  position: absolute;
  top: 4px;
  left: 4px;
  display: block;
}

.toggle-knob.on {
  left: auto;
  right: 4px;
}
</style>
