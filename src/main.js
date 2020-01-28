import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/en'
import App from './App.vue'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'
import 'element-ui/lib/theme-chalk/fonts/element-icons.woff'

locale.use(lang)

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
