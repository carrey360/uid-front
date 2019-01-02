<template>
  <login-layout>
    <h1>Sign in</h1>
    <div class="login_form">
      <LimitInput v-model="username" label="Account" warn="4-8位字符，需包含数字1-5和字母a-z两种元素" />
      <LimitInput v-model="password" type="password" label="Password" warn="6位字符，需包含数字和字母两种元素" />
      <LimitInput v-model="configPassword" type="password" label="Confirm Password" />
    </div>
    <button class="transfer-submit" :class="{'btn-disabled': disabled}" @click="handleSubmit">Submit</button>
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
import ecc from 'eosjs-ecc'
import config from '@/utils/config'
import { transactAction, toApiFormatUserName } from '@/utils/'

export default {
  name: 'sogin-in',
  components: { LimitInput, LoginLayout },
  data () {
    return {
      disabled: false,
      username: '',
      password: '',
      configPassword: ''
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
      if (!this.configPassword) {
        window.tip('请再次输入密码')
        return false
      }
      if (this.password !== this.configPassword) {
        window.tip('两次输入密码不一致，请检查')
        return false
      }
      // 生成用户的公私钥
      this.disabled = !this.disabled
      ecc.randomKey().then(privateKey => {
        let publicKey = ecc.privateToPublic(privateKey)
        let formatUserName = toApiFormatUserName(this.username)
        let sign = ecc.sign(formatUserName, privateKey)
        let params = {
          username: formatUserName,
          pubkey: publicKey,
          sig: sign
        }

        transactAction('signup', params).then(result => {
          if (result && result.transaction_id) {
            window.tip('注册成功')
            localStorage.setItem(config.lsUserPrivateKeyName, privateKey)
          } else {
            window.tip('注册失败')
          }
        })
      })
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
.no_acccount
  text-align center
  margin-top 20px
</style>
