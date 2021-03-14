import Vue from 'vue'
import App from './App'
import router from './router'
// import x2js from 'x2js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import UseInstall from '../src/components/useinstall/index'
Vue.use(iView)
    // 使用自定义插件
Vue.use(UseInstall)

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