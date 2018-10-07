// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import config from '@/config'
import PubNub from 'pubnub'

Vue.config.productionTip = false

window.pubnub = new PubNub({
  publishKey: config.pubnub.publish,
  subscribeKey: config.pubnub.subscribe
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
