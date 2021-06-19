// ES6的class语法糖

import Vue from 'vue'
// 模块默认创建参数
const defaultOpts = {
    openType: 'href',
    url: ''
}
class MyClass {
    // 私有方法
    // 私有属性
    constructor() {}
        // 创建模板
    createModule(args) {
            let props = Object.assign({}, defaultOpts, args)
            switch (props.openType) {
                case 'href':
                    window.open(props.url)
                    break
                case 'route':
                    window.vueApp.$router.push({
                        name: props.module,
                        query: props.startArgs,
                        params: Object.assign({ source: 'router' }, props.params)
                    })
                    break
            }
        }
        // 静态类方法
    static warning(msg) {
        msg = (msg == null || msg == undefined || msg == '') ? '无值警告' : msg
        Vue.prototype.$Message.warning(msg)
    }
}
export default MyClass