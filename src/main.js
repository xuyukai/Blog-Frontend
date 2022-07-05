// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import mavonEditor from 'mavon-editor'
import VueCookies from 'vue-cookies'
import 'mavon-editor/dist/css/index.css'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
