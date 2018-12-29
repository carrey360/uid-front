import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Detail from '@/views/detail/'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
