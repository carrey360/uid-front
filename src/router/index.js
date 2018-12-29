import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Auth from '@/views/auth'
import Login from '@/views/login'
import Register from '@/views/register'
import Wallet from '@/views/wallet'
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
      path: '/auth',
      name: 'Auth',
      component: Auth
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    }
  ]
})
