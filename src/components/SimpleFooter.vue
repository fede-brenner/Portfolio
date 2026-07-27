<template>
    <div
        class="relative overflow-hidden font-bold text-center py-8 text-white"
        style="padding-top: 420px; margin-top: -420px;"
    >
        <img
            :src="treeTrunk"
            alt=""
            aria-hidden="true"
            class="absolute pointer-events-none tree-deco-svg"
            style="right: 0; bottom: 0; width: 187px; height: auto; image-rendering: pixelated;"
        >
        <img
            :src="treeTrunk2"
            alt=""
            aria-hidden="true"
            class="absolute pointer-events-none tree-deco-svg"
            style="left: 0; bottom: 0; width: 78px; height: auto; image-rendering: pixelated;"
        >
        <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg
                v-for="(leaf, index) in litterLeaves"
                :key="'litter-' + index"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                :style="{
                    position: 'absolute',
                    bottom: leaf.bottom,
                    left: leaf.left,
                    width: (22 * leaf.scale) + 'px',
                    height: (22 * leaf.scale) + 'px',
                    color: leafColor(leaf.color),
                    opacity: leaf.opacity,
                    transform: 'rotate(' + leaf.rotation + 'deg)' + (leaf.mirror ? ' scaleX(-1)' : ''),
                }"
            >
                <path fill="currentColor" d="M3 22H1v-4h2v4Zm10 0H9v-2h4v2Zm-4-2H5v-2h4v2Zm8 0h-4v-2h4v2ZM5 18H3v-2h2v2Zm14 0h-2v-2h2v2Zm-8-2H5v-2h6v2Zm10 0h-2V4h2v12ZM5 14H3v-4h2v4Zm8 0h-2v-2h2v2Zm-6-4H5V8h2v2Zm6-2H7V6h6v2Zm4-2h-4V4h4v2Zm2-2h-2V2h2v2Z"/>
            </svg>
        </div>
        <span class="relative z-10">{{ t.footer }}</span>
    </div>
</template>

<script>
import { themeState } from '@/lib/theme';
import { languageState } from '@/lib/language';
import { translations } from '@/config/translations';
import treeTrunk from '@/assets/tree-trunk.svg';
import treeTrunk2 from '@/assets/tree-trunk-2.svg';

// Hojas quietas (sin animación) amontonadas contra el borde inferior del
// footer, como si el viento las hubiese apilado ahí ("leaf litter" en el
// piso). Son cientos, así que se generan proceduralmente en vez de a mano;
// el PRNG con seed fija hace que el desparramo sea siempre el mismo entre
// recargas en vez de cambiar en cada render.
const LITTER_COLORS = ['#6b6b74', '#888888', '#5a5a63', '#9a9aa1', '#7a7a83']

// Mismos grises pensados contra el fondo crema del tema claro; versión
// oscurecida (apenas más clara que el fondo casi negro, no aclarada hacia
// blanco) para que de noche se vean como hojas en la sombra en vez de hojas
// iluminadas de día (ver mismo mapa en PixelLeaves.vue).
const LITTER_COLOR_DARK_MAP = {
    '#5a5a63': '#1e1e22',
    '#6b6b74': '#26262b',
    '#7a7a83': '#2e2e33',
    '#888888': '#363636',
    '#9a9aa1': '#3e3e42',
}

function seededRandom(seed) {
    let state = seed
    return function next() {
        state = (state + 0x6D2B79F5) | 0
        let t = Math.imul(state ^ (state >>> 15), 1 | state)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

// Genera una franja completa (0-100%) de hojas. Se llama dos veces con
// semillas distintas (ver generateLitter) para duplicar la cantidad total:
// dos capas independientes se superponen y, al ser aleatorias por separado,
// una tapa los huecos que deja la otra en vez de sumarse a los mismos huecos.
// referenceWidthPx es el ancho real del contenedor (viewport): al usarlo en
// vez de un valor fijo, cada hoja ocupa más % de ancho en pantallas angostas
// y el loop corta antes, así la cantidad de hojas se adapta al ancho en vez
// de quedar siempre fija (en mobile se veían amontonadas/exceso de hojas).
function generateLitterLayer(seed, verticalShiftPx, referenceWidthPx) {
    const random = seededRandom(seed)
    const leaves = []
    // Colocación secuencial: se calcula el ancho REAL del bounding box ya
    // rotado de cada hoja (lado * (|cos| + |sin| del ángulo)) y se coloca
    // cada una pegada al borde derecho real de la anterior, con un solape
    // (no solo un toque) porque la hoja es un dibujo pixel-art hueco que no
    // llena todo su bounding box — sin solape real quedan huecos visuales
    // aunque las cajas se toquen. El cap de superposición ahora es más
    // permisivo (hasta 3-4 hojas), así que se prioriza cerrar huecos.
    let cursorPct = -2
    while (cursorPct < 102) {
        const scale = 0.8 + random() * 0.3
        const rotationDeg = Math.round(random() * 360)
        const rotationRad = (rotationDeg * Math.PI) / 180
        const baseWidthPx = 22 * scale
        const rotatedWidthPx = baseWidthPx * (Math.abs(Math.cos(rotationRad)) + Math.abs(Math.sin(rotationRad)))
        const halfWidthPct = (rotatedWidthPx / referenceWidthPx) * 100 / 2
        const overlapPct = halfWidthPct * (0.4 + random() * 0.25)
        const left = cursorPct + halfWidthPct - overlapPct
        // 25% de las hojas quedan 2-3px más altas que el resto, para romper
        // la línea pareja del borde inferior.
        const raisedPx = random() < 0.25 ? 2 + random() * 1 : 0
        leaves.push({
            left: Math.max(0, Math.min(100, left)).toFixed(2) + '%',
            // Contra el piso, 5px más abajo que antes: absolute, así que
            // aunque una parte quede fuera del viewBox y se recorte contra
            // el overflow-hidden del footer no pasa nada (pedido explícito).
            bottom: (random() * 4 - 2 - 7 + verticalShiftPx + raisedPx).toFixed(2) + 'px',
            rotation: rotationDeg,
            mirror: random() > 0.5,
            color: LITTER_COLORS[Math.floor(random() * LITTER_COLORS.length)],
            scale,
            opacity: 0.35 + random() * 0.45,
        })
        cursorPct = left + halfWidthPct
    }
    return leaves
}

function generateLitter(referenceWidthPx) {
    return [
        ...generateLitterLayer(1337, 0, referenceWidthPx),
        ...generateLitterLayer(4242, -2, referenceWidthPx),
    ]
}

export default {
  name: 'Simple-Footer',
  data() {
    return {
        languageState,
        themeState,
        treeTrunk,
        treeTrunk2,
        viewportWidth: window.innerWidth,
        resizeTimeout: null,
    }
  },
  computed: {
    t() {
      return translations[this.languageState.value]
    },
    isLight() {
      return this.themeState.value === 'light'
    },
    litterLeaves() {
      return generateLitter(this.viewportWidth)
    },
  },
  methods: {
    leafColor(lightColor) {
        return this.isLight ? lightColor : (LITTER_COLOR_DARK_MAP[lightColor] || lightColor)
    },
    onResize() {
        // Debounce con setTimeout (no requestAnimationFrame): el conteo de
        // hojas no necesita sincronizarse con un frame de pintado, y así
        // se actualiza igual aunque la pestaña esté en background.
        clearTimeout(this.resizeTimeout)
        this.resizeTimeout = setTimeout(() => {
            this.viewportWidth = window.innerWidth
        }, 150)
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
    clearTimeout(this.resizeTimeout)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
