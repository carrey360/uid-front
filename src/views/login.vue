<template>
  <login-layout>
    <h1>Login in</h1>
    <div class="login_form">
      <LimitInput v-model="username" label="Account" warn="4-8位字符，需包含数字1-5和字母a-z两种元素" />
      <LimitInput v-model="password" label="Password" type="password" warn="6位字符，需包含数字和字母两种元素" />
    </div>
    <button class="transfer-submit" :class="{'btn-disabled': disabled}" @click="handleSubmit">Login in</button>
    <p class="no_acccount">NO EOS ACCOUNT？ <span style="color: #195BDD">REGISTER</span></p>
    <template slot="title">
      <p class="title">Welcome Back</p>
      <p>Wether you are an expett or a baeginner.EOS is going to</p>
      <p>become the first platform whiche will faster all your needs </p>
      <p>in a simple, easy and intuotive way</p>
    </template>
  </login-layout>
</template>
<script>
import LimitInput from '@/components/input'
import LoginLayout from '@/components/loginLayout'
import config from '@/utils/config'

export default {
  name: 'Login',
  components: { LimitInput, LoginLayout },
  data () {
    return {
      disabled: false,
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit () {
      if (!this.username) {
        window.tip('请输入用户名')
        return false
      }
      if (!this.password) {
        window.tip('请输入密码')
        return false
      }
      // 此处未完-需要通过key stroe 来验证
      let userPrivateKey = localStorage.getItem(config.lsUserPrivateKeyName)
      if (userPrivateKey) {
        this.$store.commit('setLoginStatus', {isLogin: true, userName: this.username})
        this.$router.push({path: '/'})
      }
      this.disabled = !this.disabled
    }
  }
}
</script>
<style lang="stylus" scoped>
h1
  color #CE2344
  font-size 3rem
  margin-bottom 46px
  text-align left
  width 100%
.login_form
  margin-bottom 48px
.login_forget
  width 100%
  text-align right
  color #195BDD
  font-size 14px
  cursor pointer
.no_acccount
  margin-top 20px
  text-align center
</style>
