import Vue from 'vue'
import App from './App'
import router from './router'
// import x2js from 'x2js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import UseInstall from '../src/components/useinstall/index'
import kplugins from 'kplugins'
import showdown from 'showdown'
Vue.use(iView)
    // 使用自定义插件
Vue.use(UseInstall)
Vue.use(kplugins)

Vue.config.productionTip = false

// 使用md文件
Vue.prototype.md2html = (md) => {
        let converter = new showdown.Converter()
        let text = md.toString()
        let html = converter.makeHtml(text)
        return html
    }
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