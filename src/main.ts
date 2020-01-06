import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'query-string'

import './plugins'

Vue.config.productionTip = false
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
