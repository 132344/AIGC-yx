import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Game from './views/Game.vue'
import Story from './views/Story.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
  { path: '/story', component: Story }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')