import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import './assets/styles/index.css'

require('dotenv').config()

Vue.config.productionTip = false

if (process.env.TOKEN) {
  axios.defaults.headers.common['Authorization'] = 'token ' + process.env.TOKEN
}

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
