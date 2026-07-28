<template>
    <section id="contact" class="p-8 text-white my-12 relative overflow-hidden">
        <PixelStars fireflies/>
        <div class="relative z-10 w-full max-w-[1080px] mx-auto">
            <h3 class="py-10 text-4xl text-left">{{ t.contact.heading }}</h3>
            <div class="flex items-center justify-center">
                <form class="w-full max-w-lg" @submit.prevent="handleSubmit">
                    <label for="name" class="block mt-4 mb-2 text-xl">{{ t.contact.name }}</label>
                    <input v-model="form.name" type="text" id="name" name="name" required class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="email" class="block mt-4 mb-2 text-xl">{{ t.contact.email }}</label>
                    <input v-model="form.email" type="email" id="email" name="email" required class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3">

                    <label for="message" class="block mt-4 mb-2 text-xl">{{ t.contact.message }}</label>
                    <textarea v-model="form.message" name="message" id="message" cols="30" rows="10" required class="pixel-corners w-full box-border bg-gray-800 resize-none text-base outline-none p-3"></textarea>

                    <p v-if="status === 'sent'" class="mt-4 text-green-400">{{ t.contact.sent }}</p>
                    <p v-else-if="status === 'error'" class="mt-4 text-red-400">{{ t.contact.error }}</p>

                    <input
                        type="submit"
                        :value="status === 'sending' ? t.contact.sending : t.contact.send"
                        :disabled="status === 'sending'"
                        class="mt-4 pixel-corners w-full box-border bg-accent resize-none text-base text-white font-bold outline-none p-3 send-btn disabled:opacity-60"
                    >
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
    return {
      languageState,
      form: { name: '', email: '', message: '' },
      status: 'idle'
    }
  },
  computed: {
    t() {
      return translations[this.languageState.value]
    },
  },
  methods: {
    async handleSubmit() {
      this.status = 'sending'
      try {
        const body = new URLSearchParams({ 'form-name': 'contact', ...this.form }).toString()
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        })
        if (!response.ok) throw new Error('Bad response')
        this.form = { name: '', email: '', message: '' }
        this.status = 'sent'
      } catch (err) {
        this.status = 'error'
      }
    }
  }
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

    .send-btn:hover {
        background-color: #7d5ed3;
    }
</style>