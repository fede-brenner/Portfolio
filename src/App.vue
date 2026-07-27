<template>
  <router-view/>
</template>

<script>
import '@/assets/tailwind.css';

export default {
  name: 'App'
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
