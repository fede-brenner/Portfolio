<template>
    <section id="contact" class="p-8 text-white my-12 relative overflow-hidden">
        <PixelStars/>
        <div class="relative z-10 w-full max-w-[1080px] mx-auto">
            <h3 class="py-10 text-4xl text-left">{{ t.contact.heading }}</h3>
            <div class="flex items-center justify-center">
                <form action="" class="w-full max-w-lg">
                    <label for="name" class="block mt-4 mb-2 text-xl">{{ t.contact.name }}</label>
                    <input type="text" id="name" name="name" class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="email" class="block mt-4 mb-2 text-xl">{{ t.contact.email }}</label>
                    <input type="email" id="email" name="email" class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="message" class="block mt-4 mb-2 text-xl">{{ t.contact.message }}</label>
                    <textarea name="message" id="message" cols="30" rows="10" class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3"></textarea>

                    <input type="submit" :value="t.contact.send" class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3 hover:bg-gray-700">
                </form>
            </div>
            
        </div>
    </section>
</template>

<script>
import PixelStars from './PixelStars.vue';
import { languageState } from '@/lib/language';
import { translations } from '@/config/translations';

export default {
  name: 'My-Contact',
  components: {
    PixelStars,
  },
  data() {
    return { languageState }
  },
  computed: {
    t() {
      return translations[this.languageState.value]
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