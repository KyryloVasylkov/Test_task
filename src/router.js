import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  linkExactActiveClass: 'active',
})

export default router