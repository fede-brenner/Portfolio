<template>
  <transition>
    <nav v-if="allVisible" class="overflow-x-hidden absolute flex flex-wrap items-center justify-between py-3 mb-3 w-full">
        <div class="w-full px-4 mx-1 flex flex-wrap items-center justify-between md:max-w-[1480px]">
            <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <a class="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#">
                <!--FEDE BRENNER-->
                </a>
                <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
                    <img src="../assets/Menu.svg" alt="">
                </button>
            </div>
            <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="md:flex md:flex-grow items-center">
                <ul class="flex flex-col md:flex-row list-none ml-auto">
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#about-me">
                    <span class="ml-2">ABOUT ME</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#skills">
                    <span class="ml-2">SKILLS</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#proyects">
                    <span class="ml-2">PROYECTS</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75" href="#contact">
                    <span class="ml-2">HIRE ME</span>
                    </a>
                </li>
                </ul>
            </div>
        </div>
    </nav>
  </transition>
</template>

<script>
import '@/assets/tailwind.css';

export default {
  name: 'Nav-Bar',
  data() {
    return {
      showMenu: false,
      allVisible: false,
    }
  },
  methods: {
    toggleNavbar(){
      this.showMenu = !this.showMenu
    }
  },
    mounted() {
    setTimeout(() => {
      this.allVisible = true;
    }, 2100); // 5000 milliseconds = 5 seconds
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
