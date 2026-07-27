<template>
  <transition>
    <nav v-if="allVisible" class="max-w-[1080px] w-full left-1/2 -translate-x-1/2 overflow-x-hidden absolute flex flex-wrap items-center justify-between py-3 mb-3 z-50">
        <div class="w-full flex flex-wrap items-center justify-between">
            <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <a class="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#">
                <!--FEDE BRENNER-->
                </a>
                <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
                    <img src="../assets/Menu.svg" alt="" class="nav-menu-icon">
                </button>
            </div>
            <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="md:flex md:flex-grow items-center">
                <ul class="flex flex-col md:flex-row list-none ml-auto">
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#about-me">
                    <span class="ml-2">{{ t.nav.aboutMe }}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#skills">
                    <span class="ml-2">{{ t.nav.skills }}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#resume">
                    <span class="ml-2">{{ t.nav.experience }}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#proyects">
                    <span class="ml-2">{{ t.nav.proyects }}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#contact">
                    <span class="ml-2">{{ t.nav.hireMe }}</span>
                    </a>
                </li>
                <li class="nav-item flex items-center">
                    <button type="button" class="theme-toggle-btn px-3 py-2 flex items-center text-white hover:opacity-75" v-on:click="toggleTheme()" aria-label="Toggle light/dark theme">
                        <PixelMoon v-if="themeState.value === 'dark'"/>
                        <PixelSun v-else/>
                    </button>
                </li>
                <li class="nav-item flex items-center">
                    <button type="button" class="theme-toggle-btn px-3 py-2 flex items-center gap-1 text-white hover:opacity-75" v-on:click="cycleLanguage()" aria-label="Change language">
                        <LanguageIcon/>
                        <span class="text-xs font-bold">{{ languageState.value.toUpperCase() }}</span>
                    </button>
                </li>
                </ul>
            </div>
        </div>
    </nav>
  </transition>
</template>

<script>
import '@/assets/tailwind.css';
import { themeState, toggleTheme } from '@/lib/theme';
import { languageState, cycleLanguage } from '@/lib/language';
import { translations } from '@/config/translations';
import PixelSun from './panel/icons/PixelSun.vue';
import PixelMoon from './panel/icons/PixelMoon.vue';
import LanguageIcon from './panel/icons/LanguageIcon.vue';

export default {
  name: 'Nav-Bar',
  components: {
    PixelSun,
    PixelMoon,
    LanguageIcon,
  },
  data() {
    return {
      showMenu: false,
      allVisible: false,
      themeState,
      languageState,
    }
  },
  computed: {
    t() {
      return translations[this.languageState.value]
    },
  },
  methods: {
    toggleNavbar(){
      this.showMenu = !this.showMenu
    },
    toggleTheme,
    cycleLanguage,
  },
    mounted() {
    setTimeout(() => {
      this.allVisible = true;
    }, 2000); // 5000 milliseconds = 5 seconds
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* Define the fade-in animation */
    .v-enter-active, .v-leave-active {
    transition: opacity 1s ease;
    }

    .v-enter-from, .v-leave-to {
    opacity: 0;
    }
</style>
