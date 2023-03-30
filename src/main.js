import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router.js'

import { require } from '@/logic/functions.js'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.config.globalProperties.require = require

app.mount('#app')