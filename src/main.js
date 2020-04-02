import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import api from "./api"
import VueUeditorWrap from 'vue-ueditor-wrap'
import "./utils/event-bus.js"

Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.prototype.$api = api
Vue.config.productionTip = false

// 如果已经登录过就不需要再登录了
if(localStorage.getItem('token') && localStorage.getItem('user')){
  store.commit('LoginModule/setToken',localStorage.getItem('token'))
  store.commit('LoginModule/setUser',localStorage.getItem('user'))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
