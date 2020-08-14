import Vue from 'vue'
import App from './App'
import router from './router'
import x2js from 'x2js'

Vue.config.productionTip = false
//创建x2js对象，挂到vue原型上
Vue.prototype.$x2js = new x2js();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>'
})
