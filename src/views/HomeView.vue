<template>
  <NavBar/>
  <Hero/>
  <AboutMe/>
  <Skills/>
  <div class="relative">
    <PixelLeaves/>
    <Experience/>
    <Proyects/>
    <Contact/>
  </div>
  <SimpleFooter/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Hero from '@/components/Hero.vue'
import AboutMe from '@/components/AboutMe.vue'
import Skills from '@/components/Skills.vue'
import Experience from '@/components/Experience.vue'
import Proyects from '@/components/Proyects.vue'
import Contact from '@/components/Contact.vue'
import SimpleFooter from '@/components/SimpleFooter.vue'
import PixelLeaves from '@/components/PixelLeaves.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    Hero,
    AboutMe,
    Skills,
    Experience,
    Proyects,
    Contact,
    SimpleFooter,
    PixelLeaves,
  }
}
</script>
