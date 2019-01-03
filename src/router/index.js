import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/'
import crypto from '@/utils/crypto'
import config from '@/utils/config'
import Home from '@/views/home'
import Detail from '@/views/detail/'
import Auth from '@/views/auth'
import Login from '@/views/login'
import Register from '@/views/register'
import Wallet from '@/views/wallet'
import Account from '@/views/account'
import EditorUser from '@/views/editorUser'
import Guide from '@/views/guide'
import Test from '@/views/test'
Vue.use(Router)

let router = new Router({
  mode: 'history',
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
    }, {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    }, {
      path: '/account',
      name: 'Account',
      component: Account
    }, {
      path: '/editoruser',
      name: 'EditorUser',
      component: EditorUser
    }, {
      path: '/test',
      name: 'Test',
      component: Test
    }, {
      path: '/guide',
      name: 'Guide',
      component: Guide
    }
  ]
})
router.beforeEach((to, form, next) => {
  if (store.state.isLogin && !store.state.uidUserPrivateKey) {
    let keyStore = localStorage.getItem(config.lsUserKeystore)
    if (keyStore && store.state.lock) {
      let privateKey = crypto.decrypt(keyStore, store.state.lock)
      if (privateKey) {
        store.commit('getUserPrivateKey', privateKey)
      }
    }
  }
  next()
})

export default router
