import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('@/views/PanelView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// El scroller pixelado (ver index.css) queda reservado al panel privado;
// en el sitio publico se oculta la barra pero el scroll normal sigue andando.
router.afterEach((to) => {
  document.documentElement.classList.toggle('is-home-route', to.name === 'home')
})

export default router
