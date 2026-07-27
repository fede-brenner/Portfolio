<template>
    <div class="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        <div
            v-for="(leaf, index) in leaves"
            :key="'leaf-' + index"
            class="pixel-leaf-fall"
            :style="{
                top: leaf.top,
                left: leaf.left,
                animationDuration: leaf.duration,
                animationDelay: leaf.delay,
                '--rot-start': leaf.rotation + 'deg',
                '--rot-delta': leaf.wobble + 'deg',
                '--drift-x': leaf.driftX + 'px',
                '--sway-x': leaf.swayX + 'px',
                '--sway-rot': leaf.swayRot + 'deg',
            }"
        >
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                :style="{
                    width: (22 * leaf.scale) + 'px',
                    height: (22 * leaf.scale) + 'px',
                    color: leafColor(leaf.color),
                    transform: leaf.mirror ? 'scaleX(-1)' : 'none',
                }"
            >
                <path fill="currentColor" d="M3 22H1v-4h2v4Zm10 0H9v-2h4v2Zm-4-2H5v-2h4v2Zm8 0h-4v-2h4v2ZM5 18H3v-2h2v2Zm14 0h-2v-2h2v2Zm-8-2H5v-2h6v2Zm10 0h-2V4h2v12ZM5 14H3v-4h2v4Zm8 0h-2v-2h2v2Zm-6-4H5V8h2v2Zm6-2H7V6h6v2Zm4-2h-4V4h4v2Zm2-2h-2V2h2v2Z"/>
            </svg>
        </div>
    </div>
</template>

<script>
import { themeState } from '@/lib/theme';

// Grises de la paleta ya usada en el sitio (grayText #888888 y variantes del
// tema claro), rotación + espejado distintos por hoja para que no se vean
// todas iguales cayendo. `top` arranca en un punto random de la franja
// superior (no siempre desde el borde), `driftX` es la deriva neta de
// derecha a izquierda, y `swayX`/`swayRot` son la amplitud del vaivén
// lateral y de la rotación que lo acompaña (ver keyframes: cada vez que el
// swing cambia de lado, la hoja gira para ese mismo lado, como una hoja real
// cayendo de un árbol en vez de solo trasladarse).
// `top` es porcentaje del contenedor compartido (Experience+Proyects+Contact
// apilados). Medido en pantalla: Experience ~0-36%, Proyects ~36-64%,
// Contact ~64-100%. Las hojas SOLO nacen dentro de las primeras dos franjas
// (0-30% y 40-60%, con margen de sobra a cada lado del límite real) — en
// Contact no se generan hojas todavía, pero el contenedor recortador
// (overflow-hidden) ahora incluye Contact, así que una hoja que nace cerca
// del final de Proyects puede seguir cayendo y desvaneciéndose ya dentro de
// Contact en vez de cortarse en seco en el borde de Proyects.
// Los 5 grises de PIXEL_LEAVES fueron pensados contra el fondo CREMA del
// tema claro (gris medio sobre fondo claro = contraste ok). De noche (tema
// oscuro) una hoja caída tiene que verse oscura, apenas más clara que el
// fondo casi negro (#131418/#0e150f) — no aclarada hacia blanco, que se leía
// como una hoja iluminada de día. Cada gris tiene su versión oscurecida
// (preservando el orden relativo entre las 5) para usar en oscuro. Mapa en
// vez de recalcular con filter porque el color viene por leaf.color
// (JS/inline, no una clase CSS) y son solo 5 valores fijos a resolver.
const LEAF_COLOR_DARK_MAP = {
    '#5a5a63': '#1e1e22',
    '#6b6b74': '#26262b',
    '#7a7a83': '#2e2e33',
    '#888888': '#363636',
    '#9a9aa1': '#3e3e42',
}

const PIXEL_LEAVES = [
    // -- Experience (14) --
    { top: '2%',  left: '85%', delay: '0s',   duration: '24s', rotation: 15,  wobble: 50,  driftX: -140, swayX: 70, swayRot: 30, mirror: false, color: '#6b6b74', scale: 0.9 },
    { top: '9%',  left: '55%', delay: '4s',   duration: '27s', rotation: -20, wobble: -45, driftX: -160, swayX: 85, swayRot: 35, mirror: true,  color: '#888888', scale: 1.1 },
    { top: '4%',  left: '15%', delay: '9s',   duration: '22s', rotation: 30,  wobble: 55,  driftX: -110, swayX: 60, swayRot: 25, mirror: false, color: '#5a5a63', scale: 0.8 },
    { top: '13%', left: '68%', delay: '3s',   duration: '29s', rotation: -10, wobble: -35, driftX: -150, swayX: 90, swayRot: 38, mirror: true,  color: '#9a9aa1', scale: 1 },
    { top: '6%',  left: '30%', delay: '11s',  duration: '25s', rotation: 20,  wobble: 45,  driftX: -125, swayX: 75, swayRot: 28, mirror: false, color: '#7a7a83', scale: 0.95 },
    { top: '11%', left: '92%', delay: '6s',   duration: '23s', rotation: -25, wobble: -50, driftX: -170, swayX: 95, swayRot: 40, mirror: true,  color: '#888888', scale: 1.05 },
    { top: '16%', left: '6%',  delay: '14s',  duration: '26s', rotation: 25,  wobble: 40,  driftX: -130, swayX: 65, swayRot: 32, mirror: true,  color: '#9a9aa1', scale: 0.85 },
    { top: '8%',  left: '78%', delay: '17s',  duration: '21s', rotation: -15, wobble: -55, driftX: -145, swayX: 80, swayRot: 27, mirror: false, color: '#6b6b74', scale: 1 },
    { top: '20%', left: '40%', delay: '20s',  duration: '28s', rotation: 10,  wobble: 48,  driftX: -155, swayX: 72, swayRot: 36, mirror: true,  color: '#5a5a63', scale: 1.1 },
    { top: '24%', left: '22%', delay: '23s',  duration: '24s', rotation: -30, wobble: -40, driftX: -120, swayX: 88, swayRot: 24, mirror: false, color: '#888888', scale: 0.9 },
    { top: '18%', left: '62%', delay: '26s',  duration: '30s', rotation: 18,  wobble: 52,  driftX: -165, swayX: 92, swayRot: 33, mirror: false, color: '#7a7a83', scale: 1.05 },
    { top: '27%', left: '48%', delay: '29s',  duration: '20s', rotation: -22, wobble: -48, driftX: -115, swayX: 62, swayRot: 29, mirror: true,  color: '#9a9aa1', scale: 0.8 },
    { top: '3%',  left: '8%',  delay: '32s',  duration: '25s', rotation: 22,  wobble: 42,  driftX: -135, swayX: 68, swayRot: 26, mirror: false, color: '#6b6b74', scale: 0.95 },
    { top: '22%', left: '88%', delay: '35s',  duration: '27s', rotation: -18, wobble: -44, driftX: -160, swayX: 78, swayRot: 31, mirror: true,  color: '#888888', scale: 1 },
    // -- Proyects (10) --
    { top: '42%', left: '10%', delay: '5s',   duration: '25s', rotation: 12,  wobble: 46,  driftX: -135, swayX: 68, swayRot: 26, mirror: false, color: '#7a7a83', scale: 0.9 },
    { top: '48%', left: '75%', delay: '15s',  duration: '22s', rotation: -18, wobble: -42, driftX: -150, swayX: 82, swayRot: 34, mirror: true,  color: '#888888', scale: 1 },
    { top: '55%', left: '35%', delay: '8s',   duration: '27s', rotation: 24,  wobble: 50,  driftX: -120, swayX: 60, swayRot: 22, mirror: false, color: '#5a5a63', scale: 1.05 },
    { top: '59%', left: '90%', delay: '21s',  duration: '24s', rotation: -14, wobble: -46, driftX: -160, swayX: 78, swayRot: 30, mirror: true,  color: '#9a9aa1', scale: 0.85 },
    { top: '51%', left: '55%', delay: '12s',  duration: '29s', rotation: 20,  wobble: 44,  driftX: -140, swayX: 70, swayRot: 28, mirror: false, color: '#6b6b74', scale: 1.1 },
    { top: '44%', left: '18%', delay: '27s',  duration: '21s', rotation: -26, wobble: -50, driftX: -110, swayX: 66, swayRot: 24, mirror: true,  color: '#888888', scale: 0.95 },
    { top: '57%', left: '62%', delay: '18s',  duration: '26s', rotation: 16,  wobble: 47,  driftX: -145, swayX: 74, swayRot: 31, mirror: false, color: '#7a7a83', scale: 1 },
    { top: '40%', left: '48%', delay: '30s',  duration: '23s', rotation: -20, wobble: -41, driftX: -125, swayX: 63, swayRot: 27, mirror: true,  color: '#5a5a63', scale: 0.9 },
    { top: '53%', left: '25%', delay: '24s',  duration: '28s', rotation: 27,  wobble: 53,  driftX: -155, swayX: 84, swayRot: 35, mirror: false, color: '#9a9aa1', scale: 1.05 },
    { top: '60%', left: '5%',  delay: '33s',  duration: '22s', rotation: -12, wobble: -38, driftX: -115, swayX: 58, swayRot: 23, mirror: true,  color: '#6b6b74', scale: 0.85 },
]

export default {
    name: 'Pixel-Leaves',
    data() {
        return {
            leaves: PIXEL_LEAVES,
            themeState,
        }
    },
    computed: {
        isLight() {
            return this.themeState.value === 'light'
        },
    },
    methods: {
        leafColor(lightColor) {
            return this.isLight ? lightColor : (LEAF_COLOR_DARK_MAP[lightColor] || lightColor)
        },
    },
}
</script>

<style scoped>
    .pixel-leaf-fall {
        position: absolute;
        opacity: 0;
        animation-name: pixel-leaf-fall;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    /* translateX en cada tramo = deriva neta hasta ese punto de la caida
       (var(--drift-x) * fracción) +/- el vaivén lateral (var(--sway-x)),
       alternando de signo en cada tramo para que la hoja vaya y venga de
       lado. La rotación de ese mismo tramo suma +/- var(--sway-rot) con el
       signo CONTRARIO al vaivén de ese momento, para que gire hacia el lado
       opuesto al que se está moviendo, como una hoja real cayendo de un árbol. */
    @keyframes pixel-leaf-fall {
        0% {
            opacity: 0;
            transform: translate(0, 0) rotate(var(--rot-start));
        }
        12% {
            opacity: .6;
            transform:
                translate(calc(var(--drift-x) * .12 + var(--sway-x)), 10vh)
                rotate(calc(var(--rot-start) + var(--rot-delta) * .12 - var(--sway-rot)));
        }
        25% {
            transform:
                translate(calc(var(--drift-x) * .25 - var(--sway-x)), 21vh)
                rotate(calc(var(--rot-start) + var(--rot-delta) * .25 + var(--sway-rot)));
        }
        37% {
            transform:
                translate(calc(var(--drift-x) * .37 + var(--sway-x)), 31vh)
                rotate(calc(var(--rot-start) + var(--rot-delta) * .37 - var(--sway-rot)));
        }
        50% {
            transform:
                translate(calc(var(--drift-x) * .5 - var(--sway-x)), 42vh)
                rotate(calc(var(--rot-start) + var(--rot-delta) * .5 + var(--sway-rot)));
        }
        62% {
            transform:
                translate(calc(var(--drift-x) * .62 + var(--sway-x)), 53vh)
                rotate(calc(var(--rot-start) + var(--rot-delta) * .62 - var(--sway-rot)));
        }
        75% {
            transform:
                translate(calc(var(--drift-x) * .75 - var(--sway-x)), 64vh)
                rotate(calc(var(--rot-start) + var(--rot-delta) * .75 + var(--sway-rot)));
        }
        87% {
            opacity: .6;
            transform:
                translate(calc(var(--drift-x) * .87 + var(--sway-x)), 74vh)
                rotate(calc(var(--rot-start) + var(--rot-delta) * .87 - var(--sway-rot)));
        }
        100% {
            opacity: 0;
            transform:
                translate(var(--drift-x), 85vh)
                rotate(calc(var(--rot-start) + var(--rot-delta)));
        }
    }
</style>
