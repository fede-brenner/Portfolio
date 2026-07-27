<template>
    <section class="h-screen p-0 flex items-center justify-center relative overflow-hidden px-5">
        <PixelStars sun birds/>
        <!-- Nubes que aparecen en un punto random del Hero con fade-in,
             recorren un tramo random (no la pantalla completa) y desaparecen
             con fade-out — en ambos temas (pedido explícito: antes solo en
             claro) — ver runCloudCycle. -->
        <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
                v-for="(cloud, index) in driftClouds"
                :key="'drift-cloud-' + index"
                :src="cloud.src"
                alt=""
                class="drift-cloud"
                :style="{
                    top: cloud.top,
                    left: cloud.left,
                    width: cloud.width + 'px',
                    height: cloud.height + 'px',
                    opacity: cloud.opacity,
                    transform: cloud.transform,
                    transitionProperty: cloud.transitionProperty,
                    transitionDuration: cloud.transitionDuration,
                    transitionTimingFunction: cloud.transitionTimingFunction,
                }"
            >
        </div>
        <!-- Cada tecnología flota dentro de la canasta de su propio globo
             aerostático, en ambos temas (pedido explícito: antes solo en
             claro). El wrapper se ubica de forma que el centro del ícono
             (icon.top/left + mitad de icon.size) coincida con el centro de
             la canasta del globo (fracción fija del sprite, ver
             BASKET_FRAC_X/Y), calculado una sola vez en balloonIcons. La
             clase balloon-sprite (img + recorte de canasta, NO el ícono de
             tecnología) es la que se oscurece de noche — ver
             [data-theme='dark'] .balloon-sprite en index.css. -->
        <div class="absolute inset-0 z-0 pointer-events-none">
            <div
                v-for="(icon, index) in balloonIcons"
                :key="'balloon-icon-' + index"
                class="pixel-float-icon-wrapper"
                :style="{
                    top: icon.wrapperTop,
                    left: icon.wrapperLeft,
                    width: icon.balloonSize + 'px',
                    height: icon.balloonSize + 'px',
                    animationDuration: icon.duration,
                    animationDelay: icon.delay
                }"
            >
                <img :src="hotAirBaloon" alt="" class="absolute inset-0 w-full h-full balloon-sprite" style="image-rendering: pixelated;">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    :viewBox="icon.viewBox"
                    class="absolute balloon-icon-svg"
                    :style="{ top: icon.iconOffsetTop, left: icon.iconOffsetLeft, width: icon.size + 'px', height: icon.size + 'px' }"
                >
                    <template v-for="(shape, si) in icon.shapes" :key="si">
                        <path v-if="shape.tag === 'path'" :fill="shape.fill" :d="shape.d"/>
                        <ellipse v-else-if="shape.tag === 'ellipse'" :fill="shape.fill" :cx="shape.cx" :cy="shape.cy" :rx="shape.rx" :ry="shape.ry"/>
                        <polygon v-else-if="shape.tag === 'polygon'" :fill="shape.fill" :points="shape.points"/>
                    </template>
                </svg>
                <!-- Recorte de la canasta (mismo sprite, solo esa porción vía
                     background-position), dibujado encima del ícono para que
                     parezca que está adentro/detrás de la canasta. -->
                <div
                    class="absolute balloon-sprite"
                    :style="{
                        top: icon.basketTop,
                        left: icon.basketLeft,
                        width: icon.basketWidth,
                        height: icon.basketHeight,
                        backgroundImage: 'url(' + hotAirBaloon + ')',
                        backgroundSize: icon.basketBgSize,
                        backgroundPosition: icon.basketBgPosition,
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'pixelated',
                    }"
                ></div>
                <!-- Glow del quemador: titila para simular el fuego que
                     calienta el aire del globo (pedido explícito). -->
                <div
                    class="absolute balloon-fire-glow"
                    :style="{
                        top: icon.fireGlowTop,
                        left: icon.fireGlowLeft,
                        width: icon.fireGlowSize,
                        height: icon.fireGlowSize,
                        animationDuration: icon.fireDuration,
                        animationDelay: icon.fireDelay,
                    }"
                ></div>
            </div>
        </div>
        <div class="relative z-10 block md:grid md:grid-flow-col md:grid-cols-2 md:justify-between md:items-center w-full max-w-[1080px] mx-auto">
            <div class="left-col">
                <p id="uphead" class="text-white text-left m-0 text-2xl pl-2 w-100">{{upText}}</p>
                <div>
                    <h1 id="name1" class="text-left text-accent m-0 text-7xl font-normal">{{nombre}}</h1>
                    <h1 id="name2" class="text-left text-accent m-0 text-7xl -translate-y-2.5 font-normal">{{apellido}}</h1>
                </div>
                <div>
                    <p id="subhead1" class="text-left text-white -translate-y-2.5 text-3xl pl-1 m-0">{{underText1}}</p>
                    <p id="subhead2" class="text-left text-white -translate-y-2.5 text-3xl pl-1 m-0">{{underText2}}</p>
                </div>

            </div>
            <div id="fedeFace" class="md:flex md:justify-center md:items-center hidden">
                <transition>
                    <img v-if="allVisible" :src="isLight ? fedeFaceLight : fedeFace" class="w-80 mt-8 md:absolute" alt="photo of Federico Brenner">
                </transition>
            </div>
        </div>
        <transition>
            <div v-if="allVisible" id="mouse" class="-translate-x-2/4 flex items-center justify-center flex-col absolute left-2/4 whitespace-no-wrap before:w-1 before:h-1 before:absolute before:opacity-100 z-10" :style="{ bottom: '2%', opacity: scrollHintOpacity }">
                <svg xmlns="http://www.w3.org/2000/svg" id="mouse-border" width="40" height="80" viewBox="0 0 65 100"><path fill="#888888" d="M25 0h15v5H25V0ZM15 10V5h10v5H15Zm-5 5v-5h5v5h-5ZM5 25V15h5v10H5Zm0 50H0V25h5v50Zm5 10H5V75h5v10Zm5 5h-5v-5h5v5Zm10 5H15v-5h10v5Zm15 0H25v5h15v-5Zm10-5v5H40v-5h10Zm5-5v5h-5v-5h5Zm5-10v10h-5V75h5Zm0-50h5v50h-5V25Zm-5-10h5v10h-5V15Zm-5-5h5v5h-5v-5Zm0 0V5H40v5h10Z"/></svg>
                <p class="text-sm m-0 text-gray">{{ t.hero.scrollDown }}</p>
            </div>
        </transition>
    </section>
</template>

<script>
import { ref } from 'vue';
import PixelStars from './PixelStars.vue';
import { languageState } from '@/lib/language';
import { themeState } from '@/lib/theme';
import { translations } from '@/config/translations';
import hotAirBaloon from '@/assets/pixel-art-hot-air-baloon.svg';
import nube1 from '@/assets/clouds/nube-1-superior.svg';
import nube2 from '@/assets/clouds/nube-2-central-derecha.svg';
import nube3 from '@/assets/clouds/nube-3-central-izquierda.svg';
import nube4 from '@/assets/clouds/nube-4-inferior.svg';
import fedeFace from '@/assets/fede-face.svg';
import fedeFaceLight from '@/assets/fede-face-light.svg';


let i=0;
let s=0;
let l=0;
let n=0;
let m=0;
// Federico/Brenner es un nombre propio, no se traduce entre idiomas.
const nameText1 = "Federico";
const nameText2 = "Brenner";

const ACCENT = '#8B6FD6'
const ACCENT_DARK = '#5D42A9'

// Nubes que aparecen en un punto random del Hero (solo light mode): a
// diferencia de las de PixelClouds (AboutMe/Skills, que se balancean de lado
// a lado en loop sin aparecer/desaparecer), estas se manejan a mano desde JS
// (ver runCloudCycle): cada ciclo elige una posición random, se muestran con
// un fade-in, recorren un tramo random (no la pantalla completa) y se
// desvanecen con un fade-out antes de volver a arrancar en otro punto —
// más chicas y más transparentes que las de About Me (opacity .25 ahí).
// baseDuration ya viene con el +50% pedido (duración *1.5 de la versión
// anterior: 26/32/22/29s).
const HERO_DRIFT_CLOUDS = [
    { src: nube1, width: 70, height: 36, opacity: 0.14, baseDuration: 26 },
    { src: nube2, width: 60, height: 33, opacity: 0.12, baseDuration: 32 },
    { src: nube3, width: 55, height: 31, opacity: 0.15, baseDuration: 22 },
    { src: nube4, width: 70, height: 21, opacity: 0.11, baseDuration: 29 },
    // Segunda tanda (cantidad duplicada): mismos sprites, tamaño/duración
    // levemente distintos para que no se vean como un calco exacto.
    { src: nube1, width: 64, height: 33, opacity: 0.13, baseDuration: 29 },
    { src: nube2, width: 66, height: 36, opacity: 0.11, baseDuration: 24 },
    { src: nube3, width: 50, height: 28, opacity: 0.14, baseDuration: 34 },
    { src: nube4, width: 60, height: 18, opacity: 0.12, baseDuration: 27 },
    // Tercera tanda (límite subido a 10, pedido explícito).
    { src: nube1, width: 58, height: 30, opacity: 0.12, baseDuration: 30 },
    { src: nube3, width: 62, height: 34, opacity: 0.13, baseDuration: 25 },
]

const HERO_SKILL_ICONS = [
    // -- frontend (4) --
    {
        top: '10%', left: '6%', size: 26, duration: '5.4s', delay: '0s',
        viewBox: '0 0 384 512',
        shapes: [{ tag: 'path', fill: ACCENT, d: 'M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z' }]
    },
    {
        top: '74%', left: '5%', size: 22, duration: '6.1s', delay: '.8s',
        viewBox: '0 0 384 512',
        shapes: [{ tag: 'path', fill: ACCENT, d: 'M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z' }]
    },
    {
        // JavaScript: 3px más arriba dentro de la canasta y 15% más chica,
        // luego otro 15% más chica de nuevo (pedido explícito): 0.85*0.85.
        top: '15%', left: '90%', size: 24, duration: '5.8s', delay: '1.2s',
        extraIconOffsetTopPx: -3, sizeScale: 0.7225,
        viewBox: '0 0 448 512',
        shapes: [{ tag: 'path', fill: ACCENT, d: 'M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z' }]
    },
    {
        top: '66%', left: '91%', size: 22, duration: '6.4s', delay: '.4s',
        viewBox: '0 0 24 24',
        shapes: [{ tag: 'path', fill: ACCENT, d: 'M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z' }]
    },
    // -- backend / tooling (5) --
    {
        top: '42%', left: '96%', size: 24, duration: '5.1s', delay: '1.6s',
        viewBox: '0 0 128 128',
        shapes: [
            { tag: 'path', fill: ACCENT_DARK, d: 'M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z' },
            { tag: 'path', fill: ACCENT, d: 'M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z' },
            { tag: 'path', fill: '#fff', d: 'M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z' }
        ]
    },
    {
        top: '48%', left: '2%', size: 22, duration: '5.6s', delay: '.2s',
        viewBox: '0 0 24 24',
        shapes: [
            { tag: 'path', fill: ACCENT, d: 'M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372zm-8.703-.693a.868.829 0 0 1-.869.829.868.829 0 0 1-.868-.83.868.829 0 0 1 .868-.828.868.829 0 0 1 .869.829Z' }
        ]
    },
    {
        // SQL: globo + tecnología 50px más abajo (quedaban debajo del navbar).
        top: '6%', left: '48%', size: 24, duration: '6.7s', delay: '1s',
        extraWrapperTopPx: 50,
        viewBox: '0 0 32 32',
        shapes: [
            { tag: 'path', fill: ACCENT, d: 'M8.562,15.256A21.159,21.159,0,0,0,16,16.449a21.159,21.159,0,0,0,7.438-1.194c1.864-.727,2.525-1.535,2.525-2V9.7a10.357,10.357,0,0,1-2.084,1.076A22.293,22.293,0,0,1,16,12.078a22.36,22.36,0,0,1-7.879-1.3A10.28,10.28,0,0,1,6.037,9.7v3.55C6.037,13.724,6.7,14.528,8.562,15.256Z' },
            { tag: 'path', fill: ACCENT, d: 'M8.562,21.961a15.611,15.611,0,0,0,2.6.741A24.9,24.9,0,0,0,16,23.155a24.9,24.9,0,0,0,4.838-.452,15.614,15.614,0,0,0,2.6-.741c1.864-.727,2.525-1.535,2.525-2v-3.39a10.706,10.706,0,0,1-1.692.825A23.49,23.49,0,0,1,16,18.74a23.49,23.49,0,0,1-8.271-1.348,10.829,10.829,0,0,1-1.692-.825V19.96C6.037,20.426,6.7,21.231,8.562,21.961Z' },
            { tag: 'path', fill: ACCENT, d: 'M16,30c5.5,0,9.963-1.744,9.963-3.894V23.269a10.5,10.5,0,0,1-1.535.762l-.157.063A23.487,23.487,0,0,1,16,25.445a23.422,23.422,0,0,1-8.271-1.351c-.054-.02-.106-.043-.157-.063a10.5,10.5,0,0,1-1.535-.762v2.837C6.037,28.256,10.5,30,16,30Z' },
            { tag: 'ellipse', fill: ACCENT, cx: 16, cy: 5.894, rx: 9.963, ry: 3.894 }
        ]
    },
    {
        // Docker: 3px más arriba, luego bajado 1px (pedido explícito): -3+1.
        top: '84%', left: '78%', size: 24, duration: '5.9s', delay: '.6s',
        extraIconOffsetTopPx: -2,
        viewBox: '0 0 24 24',
        shapes: [{ tag: 'path', fill: ACCENT, d: 'M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z' }]
    },
    {
        top: '30%', left: '18%', size: 20, duration: '5.3s', delay: '1.4s',
        viewBox: '0 0 24 24',
        shapes: [{ tag: 'path', fill: ACCENT, d: 'M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z' }]
    },
]

// pixel-art-hot-air-baloon.svg es un sprite de 48x48 con la canasta abajo al
// centro (aprox x:16-28, y:40-45). Estas fracciones ubican el centro y el
// rectángulo de esa canasta dentro del sprite, para poder anclar cada globo
// de forma que la canasta quede exactamente donde estaba el ícono original
// (mismo centro), en vez de que el globo entero arranque desde esa esquina.
const BASKET_FRAC_X = 22 / 48
const BASKET_FRAC_Y = 42.5 / 48
const BASKET_X0_FRAC = 16 / 48
const BASKET_X1_FRAC = 28 / 48
const BASKET_Y0_FRAC = 40 / 48
const BASKET_Y1_FRAC = 45 / 48
// Escala grande a propósito: la canasta real del sprite es angosta (25% del
// ancho del globo), así que para que quede más grande que el ícono de
// tecnología que "lleva adentro" el globo entero tiene que ser bastante más
// grande que el ícono.
const BALLOON_SCALE = 5.5 * 0.85
// Corrimiento fijo del ícono dentro de la canasta (pedido explícito, para
// que no quede pegado al piso ni centrado a la izquierda de la canasta).
const ICON_LIFT_PX = 5 + 3
const ICON_SHIFT_RIGHT_PX = 1

// Timing del glow del quemador (ver .balloon-fire-glow): valores elegidos a
// mano, no una fórmula lineal del índice, para que el patrón entre globos se
// vea random de verdad (pedido explícito) en vez de un desfasaje parejo y
// predecible. Duraciones bien más largas que antes (pedido explícito: "mas
// lento") — el keyframe (ver <style>) ya tiene su propio tramo apagado/
// prendido adentro de cada ciclo, así que esto es la duración de UN ciclo
// completo apagado+prendido, no solo del parpadeo.
const FIRE_FLICKER_TIMING = [
    { duration: '8.4s', delay: '0s' },
    { duration: '10.2s', delay: '3.1s' },
    { duration: '7.1s', delay: '5.8s' },
    { duration: '11.5s', delay: '1.4s' },
    { duration: '6.8s', delay: '7.2s' },
    { duration: '9.6s', delay: '2.6s' },
    { duration: '12s', delay: '4.9s' },
    { duration: '7.9s', delay: '9.3s' },
    { duration: '10.8s', delay: '6.1s' },
]

function withBalloonLayout(icons) {
    return icons.map((icon, i) => {
        // sizeScale (ej. JavaScript) achica SOLO el ícono, no el globo: el
        // globo siempre se calcula sobre icon.size (tamaño base), y el punto
        // de anclaje (centro original) también, para que no se corra.
        const effectiveSize = icon.size * (icon.sizeScale || 1)
        const balloonSize = icon.size * BALLOON_SCALE
        const basketOffsetX = BASKET_FRAC_X * balloonSize
        const basketOffsetY = BASKET_FRAC_Y * balloonSize
        const basketLeft = BASKET_X0_FRAC * balloonSize
        const basketTop = BASKET_Y0_FRAC * balloonSize
        const basketWidth = (BASKET_X1_FRAC - BASKET_X0_FRAC) * balloonSize
        const basketHeight = (BASKET_Y1_FRAC - BASKET_Y0_FRAC) * balloonSize
        return {
            ...icon,
            size: effectiveSize,
            balloonSize,
            // El wrapper se corre para que el centro de la canasta (basketOffsetX/Y
            // dentro del wrapper) caiga exactamente sobre el centro original del
            // ícono (icon.left/top + mitad de icon.size), más el corrimiento
            // extra pedido para SQL (extraWrapperTopPx, balloon+ícono juntos).
            wrapperLeft: `calc(${icon.left} + ${icon.size / 2}px - ${basketOffsetX.toFixed(2)}px)`,
            wrapperTop: `calc(${icon.top} + ${icon.size / 2}px - ${basketOffsetY.toFixed(2)}px + ${icon.extraWrapperTopPx || 0}px)`,
            // Y el ícono, dentro del wrapper, se centra sobre ese mismo punto,
            // más el corrimiento extra pedido para Docker/JavaScript
            // (extraIconOffsetTopPx, solo el ícono dentro de su canasta).
            iconOffsetLeft: (basketOffsetX - effectiveSize / 2 + ICON_SHIFT_RIGHT_PX).toFixed(2) + 'px',
            iconOffsetTop: (basketOffsetY - effectiveSize / 2 - ICON_LIFT_PX + (icon.extraIconOffsetTopPx || 0)).toFixed(2) + 'px',
            // Recorte de solo la canasta (mismo sprite, escalado y corrido con
            // background-position) que se dibuja ENCIMA del ícono, para dar la
            // sensación de que el ícono está adentro/detrás de la canasta y no
            // flotando delante de ella.
            basketLeft: basketLeft.toFixed(2) + 'px',
            basketTop: basketTop.toFixed(2) + 'px',
            basketWidth: basketWidth.toFixed(2) + 'px',
            basketHeight: basketHeight.toFixed(2) + 'px',
            basketBgSize: `${balloonSize.toFixed(2)}px ${balloonSize.toFixed(2)}px`,
            basketBgPosition: `-${basketLeft.toFixed(2)}px -${basketTop.toFixed(2)}px`,
            // Glow del quemador/fuego: un círculo centrado horizontalmente
            // sobre la canasta, arriba de su borde superior (donde estaría
            // la boca del globo/el quemador real) — al menos 22px más
            // arriba que el borde de la canasta (14px + 3px + 5px extra en
            // rondas sucesivas). Tamaño relativo al globo para que escale
            // igual en los íconos más chicos/grandes. Duración/delay de
            // FIRE_FLICKER_TIMING (valores fijos "random", no una fórmula
            // del índice — ver comentario ahí arriba).
            fireGlowSize: (balloonSize * 0.24).toFixed(2) + 'px',
            fireGlowLeft: (basketOffsetX - balloonSize * 0.12).toFixed(2) + 'px',
            fireGlowTop: (basketTop - balloonSize * 0.1 - 22).toFixed(2) + 'px',
            fireDuration: FIRE_FLICKER_TIMING[i % FIRE_FLICKER_TIMING.length].duration,
            fireDelay: FIRE_FLICKER_TIMING[i % FIRE_FLICKER_TIMING.length].delay,
        }
    })
}

const HERO_BALLOON_ICONS = withBalloonLayout(HERO_SKILL_ICONS)

export default {
  name: 'My-Hero',
  components: {
    PixelStars,
  },
  data() {
    return {
      upText: "",
      nombre: "",
      apellido: "",
      underText1: "",
      underText2: "",
      allVisible: ref(false),
      balloonIcons: HERO_BALLOON_ICONS,
      // Estado reactivo de cada nube: arranca invisible, sin transición, y
      // runCloudCycle() lo va pisando para animar cada ciclo (ver mounted()).
      driftClouds: HERO_DRIFT_CLOUDS.map(cloud => ({
        src: cloud.src,
        width: cloud.width,
        height: cloud.height,
        peakOpacity: cloud.opacity,
        baseDuration: cloud.baseDuration,
        top: '0%',
        left: '0%',
        opacity: 0,
        transform: 'translateX(0)',
        transitionProperty: 'none',
        transitionDuration: '0s',
        transitionTimingFunction: 'ease-in-out',
      })),
      cloudTimers: [],
      languageState,
      themeState,
      hotAirBaloon,
      fedeFace,
      fedeFaceLight,
      typingToken: 0,
      scrollY: 0,
      ticking: false,
    };
  },
  computed: {
    t() {
      return translations[this.languageState.value]
    },
    isLight() {
      return this.themeState.value === 'light'
    },
    scrollHintOpacity() {
      // Se apaga del todo a los 500px de scroll (más gradual que antes),
      // para que el fade acompañe más tiempo mientras se scrollea.
      const fadeDistance = 500;
      return Math.max(0, 1 - this.scrollY / fadeDistance);
    },
  },
  watch: {
    'languageState.value'() {
      // Reinicia el efecto de tipeo desde cero con el texto del nuevo idioma.
      // `typingToken` invalida cualquier setTimeout todavía en vuelo del
      // ciclo anterior para que no siga escribiendo con el idioma viejo.
      this.typingToken++;
      i = 0; s = 0; l = 0; n = 0; m = 0;
      this.upText = '';
      this.nombre = '';
      this.apellido = '';
      this.underText1 = '';
      this.underText2 = '';
      this.typing(this.typingToken);
    },
  },
  methods:{
    typing(token){
        if(token !== this.typingToken) return;
        const upheadText = this.t.hero.uphead;
        const subheadText1 = this.t.hero.sub1;
        const subheadText2 = this.t.hero.sub2;
        if(i<upheadText.length){
            this.upText = this.upText.slice(0,-1);
            this.upText += upheadText.charAt(i);
            i++;
            if(i<upheadText.length){
                this.upText += '_';
            }
            setTimeout(() => this.typing(token),30);
        }else if(s<nameText1.length){
            this.nombre = this.nombre.slice(0,-1);
            this.nombre += nameText1.charAt(s);
            s++;
            if(s<nameText1.length){
                this.nombre += '_';
            }
            setTimeout(() => this.typing(token),50);
        }else if(l<nameText2.length){
            this.apellido = this.apellido.slice(0,-1);
            this.apellido += nameText2.charAt(l);
            l++;
            if(l<nameText2.length){
                this.apellido += '_';
            }
            setTimeout(() => this.typing(token),50);
        }else if(n<subheadText1.length){
            this.underText1 = this.underText1.slice(0,-1);
            this.underText1 += subheadText1.charAt(n);
            n++;
            if(n<subheadText1.length){
                this.underText1 += '_';
            }
            setTimeout(() => this.typing(token),30);
        }else if(m<subheadText2.length){
            this.underText2 = this.underText2.slice(0,-1);
            this.underText2 += subheadText2.charAt(m);
            this.underText2 += '_';
            m++;
            setTimeout(() => this.typing(token),30);
        }else{
            if(this.underText2.charAt(m)=="_"){
                this.underText2 = this.underText2.slice(0,-1);
            }else{
                this.underText2 += '_';
            }
            setTimeout(() => this.typing(token),500);
        }
    },
    onScroll() {
      if (this.ticking) return
      this.ticking = true
      window.requestAnimationFrame(() => {
        this.scrollY = window.scrollY
        this.ticking = false
      })
    },
    randomBetween(min, max) {
      return min + Math.random() * (max - min)
    },
    // Cada ciclo: arranca invisible en una posición random del Hero, se
    // desvanece hacia adentro (fade-in) mientras recorre el primer tramo de
    // un trayecto random (no cruza toda la pantalla), y se desvanece de
    // nuevo (fade-out) mientras termina ese tramo — al terminar, espera una
    // pausa random y vuelve a arrancar desde otra posición random.
    runCloudCycle(index) {
      const cloud = this.driftClouds[index]
      // Cualquier altura del Hero, incluso abajo del todo (pedido explícito).
      const startTop = this.randomBetween(5, 98)
      const startLeft = this.randomBetween(0, 65)
      // Tramo random, no la pantalla completa.
      const travelVw = this.randomBetween(12, 28)
      const totalDuration = cloud.baseDuration * this.randomBetween(0.85, 1.15)
      const fadeInDuration = totalDuration * 0.3
      const fadeOutDuration = totalDuration * 0.7

      // Snap instantáneo (sin transición) a la posición de partida, invisible.
      cloud.top = startTop.toFixed(2) + '%'
      cloud.left = startLeft.toFixed(2) + '%'
      cloud.opacity = 0
      cloud.transform = 'translateX(0)'
      cloud.transitionProperty = 'none'
      cloud.transitionDuration = '0s'

      // Fuerza un reflow síncrono (leer offsetHeight) después de que Vue
      // aplicó el estado "invisible, sin transición" al DOM, para que el
      // navegador lo registre antes de fijar el estado final — a diferencia
      // de esperar un requestAnimationFrame, esto no depende de que la
      // pestaña esté compositando frames activamente.
      this.$nextTick(() => {
        const el = this.$el.querySelectorAll('.drift-cloud')[index]
        if (el) void el.offsetHeight
        cloud.transitionProperty = 'opacity, transform'
        cloud.transitionTimingFunction = 'ease-out'
        cloud.transitionDuration = fadeInDuration.toFixed(2) + 's'
        cloud.opacity = cloud.peakOpacity
        cloud.transform = `translateX(${(travelVw * 0.35).toFixed(2)}vw)`
      })

      // Termina el tramo mientras se desvanece (fade-out).
      const fadeOutTimer = setTimeout(() => {
        cloud.transitionTimingFunction = 'ease-in'
        cloud.transitionDuration = fadeOutDuration.toFixed(2) + 's'
        cloud.opacity = 0
        cloud.transform = `translateX(${travelVw.toFixed(2)}vw)`
      }, fadeInDuration * 1000)

      // Pausa random y arranca de nuevo desde otra posición random.
      const pause = this.randomBetween(1000, 4000)
      const nextCycleTimer = setTimeout(() => {
        this.runCloudCycle(index)
      }, (fadeInDuration + fadeOutDuration) * 1000 + pause)

      this.cloudTimers.push(fadeOutTimer, nextCycleTimer)
    },
  },
  mounted() {
    this.typing(this.typingToken),
    setTimeout(() => {
      this.allVisible = true;
    }, 2000); // 5000 milliseconds = 5 seconds
    window.addEventListener('scroll', this.onScroll, { passive: true })
    // Arranque escalonado para que las nubes no empiecen todas sincronizadas.
    this.driftClouds.forEach((_, index) => {
      const startTimer = setTimeout(() => this.runCloudCycle(index), index * 1500)
      this.cloudTimers.push(startTimer)
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    this.cloudTimers.forEach(clearTimeout)
  },
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #mouse::before {
    content: '';
    width: 4px;
    height: 4px;
    position: absolute;
    top: 25px;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    background-color: #888888;
    opacity: 1;
    animation: wheel 2s infinite;
    -webkit-animation: wheel 2s infinite;
    }
    @keyframes wheel {
        to {
            opacity: 0;
            top: 40px;
        }
    }
    @-webkit-keyframes wheel {
        to {
            opacity: 0;
            top: 40px;
        }
    }
    /* Define the fade-in animation */
    .v-enter-active, .v-leave-active {
    transition: opacity 1s ease;
    }

    .v-enter-from, .v-leave-to {
    opacity: 0;
    }

    @keyframes pixel-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-14px); }
    }

    .pixel-float-icon-wrapper {
        position: absolute;
        animation-name: pixel-float;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    .drift-cloud {
        position: absolute;
        image-rendering: pixelated;
    }

    /* Glow del quemador de cada globo: radial-gradient (no un ícono de
       llama pixel-art) porque lo que se pide es un resplandor difuso que
       titila, no una forma de fuego dibujada. blur() extra para que el
       borde del círculo no se note (el radial-gradient ya desvanece hacia
       afuera, pero con blur queda más orgánico/menos "botón"). animation-
       duration/delay vienen de FIRE_FLICKER_TIMING (por ícono, ver script)
       para que no titilen todos sincronizados. */
    .balloon-fire-glow {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 214, 120, 0.95) 0%, rgba(255, 140, 40, 0.55) 40%, rgba(255, 90, 20, 0) 75%);
        filter: blur(1.5px);
        /* opacity base = el mismo valor "apagado" del 0% del keyframe
           (bug real: sin esto, mientras corre el animation-delay de cada
           globo el navegador no aplica NINGÚN estilo de la animación —
           fill-mode por defecto es "none" — así que el elemento cae al
           opacity inicial de la cascada, que es 1 (opaco/prendido), y
           queda así fijo hasta que le toca arrancar. Con muchos globos con
           delays largos y distintos, eso se veía como "varios glows
           prendidos y estáticos" recién cargada la página). */
        opacity: .03;
        animation-name: balloon-fire-flicker;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        /* backwards: además de la opacity de respaldo de arriba, aplica de
           entrada el estado del primer keyframe (0%, también apagado)
           durante el propio animation-delay, para que sea consistente en
           todos los navegadores en vez de depender solo del fallback. */
        animation-fill-mode: backwards;
    }

    /* Un ciclo completo = un tramo "apagado" (ember tenue, 0%-52% y 86%-100%,
       ~2/3 del ciclo) seguido de un tramo "prendido" (55%-82%) donde recién
       ahí titila con varios pasos irregulares — pedido explícito: "un tiempo
       encendido y otro no", no parpadeo constante. La duration de cada globo
       (FIRE_FLICKER_TIMING) es la duración de ESTE ciclo completo, así que
       "más lento" (pedido explícito) se logra ahí, subiendo la duration en
       vez de agregar más pasos acá. */
    @keyframes balloon-fire-flicker {
        0%, 52% { opacity: .03; transform: scale(.7); }
        55% { opacity: .12; transform: scale(.9); }
        58% { opacity: .2; transform: scale(1.05); }
        62% { opacity: .13; transform: scale(.85); }
        66% { opacity: .25; transform: scale(1.15); }
        70% { opacity: .12; transform: scale(.8); }
        74% { opacity: .22; transform: scale(1.05); }
        78% { opacity: .14; transform: scale(.9); }
        82% { opacity: .07; transform: scale(.78); }
        86%, 100% { opacity: .03; transform: scale(.7); }
    }
</style>