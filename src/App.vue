<template>
  <NavBar/>
  <Hero/>
  <AboutMe/>
  <Proyects/>
  <Contact/>
  <SimpleFooter/>

</template>

<script>
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import AboutMe from './components/AboutMe.vue'
import Proyects from './components/Proyects.vue'
import Contact from './components/Contact.vue'
import SimpleFooter from './components/SimpleFooter.vue'

import '@/assets/tailwind.css';

export default {
  name: 'App',
  components: {
    NavBar,
    Hero,
    AboutMe,
    Proyects,
    Contact,
    SimpleFooter
  }
}
</script>

<style>
  #app {
    --secondary-color: #888888;
    --accent-color: #5D42A9;
    --background-color: #131418;
    background: var(--background-color);
    font-family: 'Retro Gaming', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
