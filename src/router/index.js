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
                import ('@/components/directive/Directive')
        },
        {
            name: 'Rtzty',
            path: '/rtzty',
            component: () =>
                import ('@/components/rtzty/Rtzty')
        },
        {
            name: 'Document',
            path: '/document',
            component: () =>
                import ('@/components/document/Document'),
            children: [{
                    name: 'Prototype',
                    path: '/document/Prototype',
                    component: () =>
                        import ('@/components/study/prototype/Prototype')
                },
                {
                    name: 'MicrAndMactask',
                    path: '/document/macmicr',
                    component: () =>
                        import ('@/components/study/micrandmactask/MicrAndMactask')
                },
                {
                    name: 'BindCallApply',
                    path: '/document/BindCallApply',
                    component: () =>
                        import ('@/components/study/bindcallapply/BindCallApply')
                }
            ]
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
router.afterEach(() => {})

export default router