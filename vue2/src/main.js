import Vue from 'vue'
import VueCompositionAPI, { createApp, h } from '@vue/composition-api'

import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'

Vue.use(VueCompositionAPI)
Vue.use(ElementUI)
Vue.use(CKEditor)

const app = createApp({
  router,
  render: () => h(App)
})

app.mount('#app')
