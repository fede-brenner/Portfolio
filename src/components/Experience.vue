<template>
    <section id="resume" class="p-8 text-white relative overflow-hidden" style="background: linear-gradient(to bottom, #0e150f, #1a1815);">
        <PixelStars fireflies/>
        <img
            :src="treeBranch"
            alt=""
            aria-hidden="true"
            class="absolute pointer-events-none tree-deco-svg"
            style="top: 0; right: 0; width: 375px; height: auto; image-rendering: pixelated; opacity: 0.85;"
        >
        <img
            :src="treeBranch2"
            alt=""
            aria-hidden="true"
            class="absolute pointer-events-none tree-deco-svg"
            style="top: 200px; left: 0; width: 204px; height: auto; image-rendering: pixelated; opacity: 0.85;"
        >
        <div class="relative z-10 w-full max-w-[1080px] mx-auto">
            <h2 class="py-10 text-4xl text-left">{{ t.experience.heading }}</h2>
            <div class="flex items-center justify-center">
                <div class="relative w-full mt-8 md:mt-10">
                    <div class="hidden md:block absolute top-0 bottom-0 pointer-events-none z-0" style="left: 208px;">
                        <div class="absolute inset-0 border-l-2 border-dashed border-grayText/30"></div>
                        <img :src="iconSrc" alt="" class="absolute" :style="{ width: iconWidth + 'px', maxWidth: 'none', height: 'auto', imageRendering: 'pixelated', opacity: 0.7, top: '-60px', left: iconLeft, transform: 'translateX(-50%)' }">
                    </div>
                    <ul class="relative z-10 m-0 flex flex-col gap-8 w-full">
                        <li v-for="(job, index) of jobs" :key="index" class="md:flex md:items-start md:gap-8">
                            <div class="pixel-corners bg-gray-800 text-left p-4 mb-3 md:mb-0 md:w-48 md:flex-shrink-0 flex items-center justify-center">
                                <p class="m-0 text-grayText text-sm whitespace-nowrap">{{job.Start}} - {{job.Finish}}</p>
                            </div>
                            <div class="pixel-corners bg-gray-800 text-left p-6 md:flex-1">
                                <h3 class="m-0 text-2xl">{{job.Title}}</h3>
                                <p class="m-0 mt-1 text-accent text-base">{{job.Company}}</p>
                                <p class="m-0 mt-3 text-grayText text-sm">{{job.Description}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import PixelStars from './PixelStars.vue';
import rocketIcon from '@/assets/rocket.svg';
import planeIcon from '@/assets/plane.svg';
import treeBranch from '@/assets/long-branch.svg';
import treeBranch2 from '@/assets/short-branch.svg';
import { themeState } from '@/lib/theme';
import { languageState } from '@/lib/language';
import { translations } from '@/config/translations';

// Empresa y fechas son datos fijos del CV (no cambian por idioma); Title y
// Description salen de translations.js según el idioma seleccionado.
const JOB_META = [
  { Company: 'Asociación Escolar Goethe', Start: '05-2024', Finish: '07-2026' },
  { Company: 'Asociación Escolar Goethe', Start: '06-2023', Finish: '07-2026' },
  { Company: 'Asociación Escolar Goethe', Start: '06-2023', Finish: '05-2024' },
]

export default {
  name: 'My-Experience',
  components: {
    PixelStars,
  },
  data() {
    return{
        themeState,
        languageState,
        treeBranch,
        treeBranch2,
    };
  },
  computed: {
    t() {
      return translations[this.languageState.value]
    },
    jobs() {
      return this.t.experience.jobs.map((job, index) => ({
        Title: job.title,
        Description: job.description,
        ...JOB_META[index],
      }))
    },
    iconSrc() {
      return this.themeState.value === 'light' ? planeIcon : rocketIcon;
    },
    iconWidth() {
      // Mismo alto renderizado (~66px) para ambos íconos pese a tener
      // proporciones de viewBox distintas (cohete 15x33, avión 32x32).
      return this.themeState.value === 'light' ? 66 : 30;
    },
    iconLeft() {
      // El cohete necesita +1px para quedar centrado sobre la línea; la
      // avioneta ya queda centrada sin ese ajuste.
      return this.themeState.value === 'light' ? 'calc(50%)' : 'calc(50% + 1px)';
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pixel-corners {
        clip-path: polygon(
            0px calc(100% - 10px),
            5px calc(100% - 10px),
            5px calc(100% - 5px),
            10px calc(100% - 5px),
            10px 100%,
            calc(100% - 10px) 100%,
            calc(100% - 10px) calc(100% - 5px),
            calc(100% - 5px) calc(100% - 5px),
            calc(100% - 5px) calc(100% - 10px),
            100% calc(100% - 10px),
            100% 10px,
            calc(100% - 5px) 10px,
            calc(100% - 5px) 5px,
            calc(100% - 10px) 5px,
            calc(100% - 10px) 0px,
            10px 0px,
            10px 5px,
            5px 5px,
            5px 10px,
            0px 10px
        );
    }
</style>
