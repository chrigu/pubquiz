import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTailwind from 'vue-tailwind'

import './assets/styles/index.css'

Vue.config.productionTip = false

const components = {}

Vue.use(VueTailwind, components)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
