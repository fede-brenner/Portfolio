<template>
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <template v-if="isLight">
            <!-- Sol pixel-art (sol.svg, provisto por el usuario), no el glyph
                 abstracto del toggle de tema. -->
            <img v-if="sun" :src="sunImg" alt="" class="pixel-sun-deco" style="image-rendering: pixelated;">
            <!-- Destellos: triángulos muy suaves (blur + baja opacidad) que
                 salen del sol y viajan en diagonal de arriba-derecha a
                 abajo-izquierda mientras se expanden, con fade-in/fade-out en
                 loop, simulando un halo de luz. -->
            <div v-if="sun" class="sun-rays" aria-hidden="true">
                <span
                    v-for="(ray, index) in sunRays"
                    :key="'sun-ray-' + index"
                    class="sun-ray"
                    :style="{
                        width: ray.length + 'vmax',
                        transform: 'rotate(' + ray.angle + 'deg)',
                        animationDuration: ray.duration,
                        animationDelay: ray.delay,
                    }"
                ></span>
            </div>
            <div v-if="birds" class="pixel-birds" aria-hidden="true">
                <span
                    v-for="(bird, index) in birdConfigs"
                    :key="'bird-' + index"
                    class="pixel-bird-fly"
                    :style="{ top: bird.top, animationDuration: bird.duration, animationDelay: bird.delay }"
                >
                    <svg
                        class="pixel-bird-flap"
                        viewBox="0 0 9 5"
                        xmlns="http://www.w3.org/2000/svg"
                        shape-rendering="crispEdges"
                        :style="{ width: (9 * bird.scale) + 'px', height: (5 * bird.scale) + 'px', animationDelay: bird.flapDelay }"
                    >
                        <rect x="0" y="0" width="1" height="1" fill="currentColor"/>
                        <rect x="2" y="1" width="1" height="1" fill="currentColor"/>
                        <rect x="4" y="2" width="1" height="1" fill="currentColor"/>
                        <rect x="6" y="1" width="1" height="1" fill="currentColor"/>
                        <rect x="8" y="0" width="1" height="1" fill="currentColor"/>
                    </svg>
                </span>
            </div>
        </template>
        <template v-else>
            <span
                v-for="(star, index) in stars"
                :key="'star-' + index"
                class="pixel-star"
                :style="{
                    top: star.top,
                    left: star.left,
                    width: star.size + 'px',
                    height: star.size + 'px',
                    animationDuration: star.duration,
                    animationDelay: star.delay
                }"
            ></span>
            <!-- Luna pixel-art (luna.svg, provisto por el usuario), mismo
                 lugar que ocupa el sol en claro. Sin animación de giro (una
                 luna no rota como el sol): solo el mismo pulso de brillo. -->
            <img v-if="sun" :src="moonImg" alt="" class="pixel-moon-deco" style="image-rendering: pixelated;">
        </template>
    </div>
</template>

<script>
import { themeState } from '@/lib/theme';
import sunImg from '@/assets/sol.svg';
import moonImg from '@/assets/luna.svg';

const PIXEL_BIRDS = [
    { top: '10%', delay: '0s', flapDelay: '0s', duration: '19s', scale: 2.4 },
    { top: '22%', delay: '4s', flapDelay: '.15s', duration: '23s', scale: 2 },
    { top: '7%', delay: '9s', flapDelay: '.3s', duration: '17s', scale: 2.8 },
    { top: '30%', delay: '13s', flapDelay: '.1s', duration: '21s', scale: 2.1 },
]

// Cada destello es un triángulo fijo (no se mueve ni rota en loop): parte de
// la punta del sol, apuntando a un ángulo estático distinto cada uno (varios
// rumbos: izquierda, abajo, izquierda-abajo — pedido explícito). angle
// negativo = hacia abajo, cercano a 0 = hacia la izquierda (ver rotate() en
// el <style>: 0° apunta a la izquierda, -90° apunta hacia abajo).
//
// length (en vmax) = qué tan lejos llega cada uno ANTES de que el fade-out
// del mask-image (ver .sun-ray) termine de desvanecerlo del todo. No puede
// ser el mismo valor para todos los rumbos: el sol está arriba a la derecha,
// así que un rayo horizontal (izquierda) tiene que recorrer ~96vmax para
// salir de pantalla por el borde izquierdo, uno diagonal sale antes por el
// borde inferior (~72vmax), y uno vertical (abajo) sale mucho antes todavía
// (~51vmax). Antes el largo era fijo (115vmax) para los seis, así que el
// fade (que ocupaba el último 22% del largo) recién terminaba de desvanecer
// bien pasado el borde de la sección en los rumbos más cortos — por eso se
// veía un corte duro justo en el borde del Hero. Estos valores quedan por
// debajo de la distancia real de salida (con margen), para que el fade
// termine ANTES de llegar al borde.
// Lo único animado es la opacidad: un pulso con una pausa en 0 (ver
// keyframes), para que no se vean muchos a la vez aunque haya varios rumbos
// definidos.
const SUN_RAYS = [
    { angle: 3,   length: 82, duration: '19s', delay: '0s' },   // izquierda
    { angle: -8,  length: 80, duration: '22s', delay: '6s' },   // izquierda
    { angle: -42, length: 58, duration: '20s', delay: '3s' },   // izquierda-abajo
    { angle: -52, length: 56, duration: '23s', delay: '13s' },  // izquierda-abajo
    { angle: -88, length: 38, duration: '18s', delay: '9s' },   // abajo
    { angle: -96, length: 38, duration: '24s', delay: '16s' },  // abajo
]

const PIXEL_STARS = [
    { top: '8%', left: '6%', size: 3, delay: '0s', duration: '3.2s' },
    { top: '15%', left: '85%', size: 2, delay: '.6s', duration: '2.8s' },
    { top: '22%', left: '20%', size: 2, delay: '1.1s', duration: '3.6s' },
    { top: '30%', left: '92%', size: 3, delay: '.3s', duration: '3.1s' },
    { top: '38%', left: '10%', size: 2, delay: '1.4s', duration: '2.6s' },
    { top: '46%', left: '78%', size: 3, delay: '.8s', duration: '3.4s' },
    { top: '55%', left: '4%', size: 2, delay: '.2s', duration: '2.9s' },
    { top: '60%', left: '88%', size: 2, delay: '1.6s', duration: '3.8s' },
    { top: '68%', left: '22%', size: 3, delay: '1.0s', duration: '3.0s' },
    { top: '75%', left: '95%', size: 2, delay: '.5s', duration: '2.7s' },
    { top: '12%', left: '45%', size: 2, delay: '1.8s', duration: '3.3s' },
    { top: '84%', left: '55%', size: 3, delay: '.9s', duration: '3.5s' },
    { top: '5%', left: '65%', size: 2, delay: '1.2s', duration: '3.0s' },
    { top: '90%', left: '30%', size: 2, delay: '.4s', duration: '2.8s' },
    { top: '3%', left: '30%', size: 2, delay: '.7s', duration: '3.1s' },
    { top: '18%', left: '55%', size: 3, delay: '1.3s', duration: '2.9s' },
    { top: '28%', left: '35%', size: 2, delay: '.2s', duration: '3.4s' },
    { top: '33%', left: '60%', size: 2, delay: '1.5s', duration: '2.7s' },
    { top: '50%', left: '40%', size: 3, delay: '.6s', duration: '3.2s' },
    { top: '58%', left: '65%', size: 2, delay: '1.1s', duration: '2.8s' },
    { top: '63%', left: '12%', size: 2, delay: '.9s', duration: '3.0s' },
    { top: '70%', left: '50%', size: 3, delay: '.3s', duration: '3.6s' },
    { top: '80%', left: '8%', size: 2, delay: '1.7s', duration: '2.9s' },
    { top: '88%', left: '70%', size: 2, delay: '.4s', duration: '3.3s' },
    { top: '6%', left: '75%', size: 2, delay: '1.0s', duration: '3.1s' },
    { top: '95%', left: '45%', size: 2, delay: '.8s', duration: '2.6s' },
]

export default {
    name: 'Pixel-Stars',
    props: {
        // El sol y los pájaros son piezas fuertes (grandes/animadas), así que
        // solo se piden explícitamente donde tienen sentido (Hero) en vez de
        // repetirse en las 6 secciones que usan este mismo componente.
        sun: {
            type: Boolean,
            default: false,
        },
        birds: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            stars: PIXEL_STARS,
            birdConfigs: PIXEL_BIRDS,
            sunRays: SUN_RAYS,
            themeState,
            sunImg,
            moonImg,
        }
    },
    computed: {
        isLight() {
            return this.themeState.value === 'light'
        },
    },
}
</script>

<style scoped>
    .pixel-star {
        position: absolute;
        background-color: #888888;
        animation-name: pixel-twinkle;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    @keyframes pixel-twinkle {
        0%, 100% { opacity: .6; }
        50% { opacity: .1; }
    }

    /* Reemplazo de las estrellas en tema claro: de noche tiene sentido un
       cielo con estrellas, pero de día ese mismo punteado se lee como
       "suciedad" en vez de cielo. Rayos propios (largos y gruesos, ver
       template) en vez de reusar el ícono del toggle: ese glyph de 24x24
       tiene los rayos demasiado finos y se pierden al escalarlo/antialiasear
       a este tamaño. Solo en Hero (prop `sun`), no en las otras 5 secciones. */
    .pixel-sun-deco {
        position: absolute;
        top: -6%;
        right: -4%;
        width: clamp(140px, 22vw, 220px);
        height: clamp(140px, 22vw, 220px);
        opacity: .3;
        animation: pixel-sun-spin 90s linear infinite, pixel-sun-pulse 6s ease-in-out infinite;
    }

    @keyframes pixel-sun-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes pixel-sun-pulse {
        0%, 100% { opacity: .22; }
        50% { opacity: .38; }
    }

    /* Misma posición que el sol, pero más chica (pedido explícito) y con su
       propio giro (más lento que el del sol) + un glow suave (drop-shadow,
       se calcula sobre la silueta ya recortada del sprite en vez de una caja
       cuadrada). */
    .pixel-moon-deco {
        position: absolute;
        top: -5%;
        right: -3%;
        width: clamp(105px, 16.5vw, 165px);
        height: clamp(105px, 16.5vw, 165px);
        opacity: .55;
        filter: drop-shadow(0 0 14px rgba(210, 218, 255, 0.55));
        animation: pixel-moon-spin 140s linear infinite, pixel-moon-pulse 6s ease-in-out infinite;
    }

    @keyframes pixel-moon-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes pixel-moon-pulse {
        0%, 100% { opacity: .45; }
        50% { opacity: .65; }
    }

    /* Contenedor pegado exactamente al mismo lugar/tamaño que el sol, para
       que los triángulos nazcan desde su centro. */
    .sun-rays {
        position: absolute;
        top: -6%;
        right: -4%;
        width: clamp(140px, 22vw, 220px);
        height: clamp(140px, 22vw, 220px);
    }

    /* Triángulo (clip-path, no border-trick): punta angosta pegada al sol
       que se abre a lo largo de casi toda la pantalla, en el rumbo fijo que
       le toque (ver ángulos en SUN_RAYS: izquierda/abajo/diagonal). Fijo: no
       rota ni se traslada en loop. El mask-image lo desvanece hacia la punta
       lejana para que no se vea un corte duro donde termina. Tono/opacidad
       ya ajustados al valor final (mismo amarillo del sol, bien tenue) — la
       forma/rumbo ya habían quedado aprobados. */
    .sun-ray {
        position: absolute;
        /* "right" ancla el borde derecho (= la punta, ver clip-path) al
           centro horizontal del contenedor del sol. "top" se corrige restando
           la mitad de la altura (calc) para que el centro vertical de la
           franja (no su borde superior) caiga sobre ese mismo centro — mismo
           truco que el "- 60vmax" de la versión anterior, adaptado a esta
           forma. */
        top: calc(50% - 6vmax);
        right: 50%;
        /* width (largo) viene por inline style, distinto por rumbo — ver
           "length" en SUN_RAYS y el porqué en su comentario. */
        height: 12vmax;
        clip-path: polygon(100% 50%, 0% 0%, 0% 100%);
        /* El amarillo del sol (#e3c77a) es más OSCURO que el fondo crema
           (#f0ebe0), así que en vez de leerse como luz se veía como una
           sombra. Un halo tiene que ser más claro que lo que hay detrás:
           amarillo pálido, más claro en los 3 canales que el fondo. */
        background-color: #fff9e3;
        /* Degradé en AMBOS extremos (pedido explícito): transparente pegado
           al sol, sube a opaco, se mantiene, y vuelve a transparente hacia la
           punta lejana — así ni el inicio ni el final tienen un corte duro. */
        mask-image: linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%);
        -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%);
        transform-origin: right center;
        opacity: 0;
        animation-name: sun-ray-fade;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    @keyframes sun-ray-fade {
        /* Pico de opacidad sostenido (25%-45%, en vez de un pulso instantáneo)
           para que cada halo quede visible más tiempo dentro de su ciclo
           (pedido explícito), con una pausa en 0 el resto — así, con varios
           rumbos definidos y delays escalonados, no se ven todos a la vez. */
        0%, 8%, 62%, 100% { opacity: 0; }
        /* Bajado de .95 (solo para probar forma/rumbo) a un valor bien
           sutil: ahora que el tono ya es el amarillo del sol y no blanco,
           tiene que leerse como un halo tenue, no como un flash. Subido
           +15% después (pedido explícito: "aumenta un 15% el brillo"). */
        25%, 45% { opacity: .184; }
    }

    /* Pájaros: solo en Hero (prop `birds`), tan pocos píxeles como el
       cardumen de referencia. Dos animaciones en dos elementos distintos
       (wrapper mueve, svg interno alterea escala) porque una sola animación
       de "transform" no puede combinar vuelo + aleteo a la vez sobre el
       mismo elemento sin que una pise a la otra. Todo vía transform/opacity
       (compositor, sin layout ni repaint por frame) para que sea liviano. */
    .pixel-birds {
        position: absolute;
        inset: 0;
    }

    .pixel-bird-fly {
        position: absolute;
        left: 0;
        color: #5a5a63;
        opacity: 0;
        animation-name: pixel-bird-fly;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    .pixel-bird-flap {
        display: block;
        animation: pixel-bird-flap .5s steps(2) infinite;
    }

    @keyframes pixel-bird-fly {
        0%   { transform: translateX(-10vw) translateY(0); opacity: 0; }
        8%   { opacity: .5; }
        50%  { transform: translateX(50vw) translateY(-16px); }
        92%  { opacity: .5; }
        100% { transform: translateX(110vw) translateY(0); opacity: 0; }
    }

    @keyframes pixel-bird-flap {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(.55); }
    }
</style>
