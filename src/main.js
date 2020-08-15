import Vue from 'vue'
import App from './App'
import router from './router'
// import x2js from 'x2js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

Vue.config.productionTip = false
// 创建x2js对象，挂到vue原型上
// Vue.prototype.$x2js = new x2js()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
