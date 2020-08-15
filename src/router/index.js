import Vue from 'vue'
import Router from 'vue-router'
// import config from 'config'
import RtBase from '@/components/rtbase/RtBase'
// import Directive from '@/components/directive/Directive'
// import HelloWorld from '@/components/HelloWorld'
// import Rtzty from '@/components/Rtzty'

Vue.use(Router)
const routes = [{
  name: 'RtBase',
  path: '/',
  redirect: '/direct',
  component: RtBase,
  children: [{
    name: 'Directive',
    path: '/direct',
    component: () =>
                    import('@/components/directive/Directive')
  },
  {
    name: 'HelloWorld',
    path: '/pap',
    component: () =>
                    import('@/components/HelloWorld')
  },
  {
    name: 'Rtzty',
    path: '/rtzty',
    component: () =>
                    import('@/components/Rtzty')
  }
  ]
}]
// 遍历生成routes
// function foreachroutes (data, output) {
//   let type
//   if (data !== null) {
//     type = typeOf(data)
//     if (type == 'array') {
//       for (var route in data) {
//         output.push(route)
//         foreachroutes(route)
//       }
//     } else if (type == 'object') {
//       if (typeOf(data.children) == null) {

//       } else if (typeOf(data.children) == 'array') {
//         for (var route in data.children) {
//           foreachroutes(route)
//         }
//       } else if (typeOf(data.children) == 'object') {
//         for (var route in [data.children]) {
//           foreachroutes(route)
//         }
//       }
//     }
//   }
// };
// foreachroutes(config.routes, routes)

// function typeOf (obj) {
//   const toString = Object.prototype.toString
//   const map = {
//     '[object Boolean]': 'boolean',
//     '[object Number]': 'number',
//     '[object String]': 'string',
//     '[object Function]': 'function',
//     '[object Array]': 'array',
//     '[object Date]': 'date',
//     '[object RegExp]': 'regExp',
//     '[object Undefined]': 'undefined',
//     '[object Null]': 'null',
//     '[object Object]': 'object'
//   }
//   return map[toString.call(obj)]
// }
const router = new Router({
  mode: 'hash',
  base: '/',
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes
})
// 路由前置
router.beforeEach((to, from, next) => {
  to.matched.length ? next() : next(to.fullPath)
})
// 路由后置
router.afterEach(() => {})

export default router
