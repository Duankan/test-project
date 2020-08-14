import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
var routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }
];

export default new Router(
  {
    routes: routes
  }
)
