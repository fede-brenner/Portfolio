<template>
    <section id="proyects" class="p-8 text-white relative overflow-hidden" style="background: linear-gradient(to bottom, #1a1815, #131418);">
        <PixelStars/>
        <div id="container" class="relative z-10 w-full max-w-[1080px] mx-auto">
            <h2 class="py-10 text-4xl text-left">{{ t.proyects.heading }}</h2>
            <div class="m-0 flex items-center justify-center">
                <ul class="flex items-center justify-center m-0 gap-12 w-full">
                    <li v-for="(proyect, index) of proyects" :key="index" class="pixel-corners w-full max-w-2xl bg-gray-800 text-left min-h-[12rem] transition-transform duration-500 ease-in-out hover:scale-105 md:text-left flex flex-col md:flex-row" id="card">
                        <img v-if="proyect.image" :src="proyect.image" alt="" class="w-full md:w-52 md:flex-shrink-0 h-52 md:h-auto object-cover object-top" style="image-rendering: pixelated;">
                        <div class="flex-1">
                            <h2 class="m-0 text-3xl p-3">{{proyect.name}}</h2>
                            <p class="text-grayText text-sm py-1 px-5 pb-4">{{proyect.description}}</p>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </section>
</template>

<script>
import PixelStars from './PixelStars.vue';
import outfitMakerImg from '@/assets/outfit-maker.png';
import { languageState } from '@/lib/language';
import { translations } from '@/config/translations';

export default {
  name: 'all-proyects',
  components: {
    PixelStars,
  },
  data() {
    return{
        languageState,
    };
  },
  computed: {
    t() {
      return translations[this.languageState.value]
    },
    proyects() {
      return this.t.proyects.items.map((item) => ({
        name: item.name,
        description: item.description,
        image: outfitMakerImg,
      }))
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pixel-corners {
        clip-path: polygon(
            0px calc(100% - 20px),
            4px calc(100% - 20px),
            4px calc(100% - 12px),
            8px calc(100% - 12px),
            8px calc(100% - 8px),
            12px calc(100% - 8px),
            12px calc(100% - 4px),
            20px calc(100% - 4px),
            20px 100%,
            calc(100% - 20px) 100%,
            calc(100% - 20px) calc(100% - 4px),
            calc(100% - 12px) calc(100% - 4px),
            calc(100% - 12px) calc(100% - 8px),
            calc(100% - 8px) calc(100% - 8px),
            calc(100% - 8px) calc(100% - 12px),
            calc(100% - 4px) calc(100% - 12px),
            calc(100% - 4px) calc(100% - 20px),
            100% calc(100% - 20px),
            100% 20px,
            calc(100% - 4px) 20px,
            calc(100% - 4px) 12px,
            calc(100% - 8px) 12px,
            calc(100% - 8px) 8px,
            calc(100% - 12px) 8px,
            calc(100% - 12px) 4px,
            calc(100% - 20px) 4px,
            calc(100% - 20px) 0px,
            20px 0px,
            20px 4px,
            12px 4px,
            12px 8px,
            8px 8px,
            8px 12px,
            4px 12px,
            4px 20px,
            0px 20px
        );
    }
</style>