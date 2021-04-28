import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTailwind from 'vue-tailwind'
import {
  TInput,
  TRadio
} from 'vue-tailwind/dist/components'

import './assets/styles/index.css'

Vue.config.productionTip = false

const settings = {
  // Use the following syntax
  // {component-name}: {
  //   component: {importedComponentObject},
  //   props: {
  //     {propToOverride}: {newDefaultValue}
  //     {propToOverride2}: {newDefaultValue2}
  //   }
  // }
  't-radio': {
    component: TRadio,
    props: {
      classes: {
        input: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out'
      }
      // Variants and fixed classes in the same `object` format ...
    }
  },
  't-input': {
    component: TInput,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  }
  // ...Rest of the components
}

Vue.use(VueTailwind, settings)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
