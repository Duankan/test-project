import Vue from 'vue'
import Router from 'vue-router'
import RtBase from '@/components/rtbase/RtBase'

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
      import('@/components/rtzty/Rtzty')
  }
  ]
}]
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
router.afterEach(() => { })

export default router
