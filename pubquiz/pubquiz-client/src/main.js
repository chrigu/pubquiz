import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTailwind from 'vue-tailwind'
import {
  TInput,
  TTextarea
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
  't-input': {
    component: TInput,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  },
  't-textarea': {
    component: TTextarea,
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
