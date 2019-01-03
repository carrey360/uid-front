import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: sessionStorage.getItem('uidLogin') || '',
    userName: sessionStorage.getItem('uidUserName') || '',
    uidUserPrivateKey: '' // 存取用户的私钥
  },
  actions: {},
  getters: {},
  mutations: {
    'setLoginStatus': (state, data) => {
      state.isLogin = data.isLogin
      state.userName = data.userName
      sessionStorage.setItem('uidLogin', data.isLogin)
      sessionStorage.setItem('uidUserName', data.userName)
    },
    'getUserPrivateKey': (state, data) => {
      state.uidUserPrivateKey = data
    }
  }
})

export default store
