<template>
  <div class="pixel-tabs" :class="{ 'pixel-tabs--underline': variant === 'underline' }">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      class="pixel-tab"
      :class="[variant === 'underline' ? 'pixel-tab--underline' : 'pixel-tab--boxed', { active: modelValue === tab.key }]"
      @click="$emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'PixelTabs',
  props: {
    modelValue: { type: String, required: true },
    tabs: { type: Array, required: true },
    variant: { type: String, default: 'boxed' }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.pixel-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.pixel-tabs--underline {
  gap: 24px;
}

.pixel-tab {
  font-family: inherit;
  font-weight: bold;
  font-size: 0.875rem;
  cursor: pointer;
  image-rendering: pixelated;
}

.pixel-tab--boxed {
  color: #ffffff;
  background: #1c1d22;
  border: 2px solid #5D42A9;
  padding: 8px 16px;
  box-shadow: 4px 4px 0 #5D42A9;
  transition: transform 0.05s linear, box-shadow 0.05s linear;
}

.pixel-tab--boxed:hover {
  background: #2a2b31;
}

.pixel-tab--boxed.active {
  background: #5D42A9;
  transform: translate(4px, 4px);
  box-shadow: none;
}

/* Variante "solo texto": sin fondo/borde, la seleccion se marca con un
   subrayado grueso cuyas esquinas inferiores tienen una muesca de 1 pixel
   (mismo espiritu que .pixel-corners-sm pero a escala mini). */
.pixel-tab--underline {
  background: none;
  border: none;
  padding: 4px 2px 12px;
  color: #888888;
  position: relative;
  transition: color 0.1s linear;
}

.pixel-tab--underline:hover {
  color: #ffffff;
}

.pixel-tab--underline.active {
  color: #ffffff;
}

.pixel-tab--underline.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6px;
  background: #5D42A9;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 2px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 2px) 100%,
    2px 100%,
    2px calc(100% - 2px),
    0 calc(100% - 2px)
  );
}
</style>
