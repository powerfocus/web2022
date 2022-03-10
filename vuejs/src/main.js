import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@element-plus/icons'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {size: 'media', zIndex: 3000})

app.mount('#app')
