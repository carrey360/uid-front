<template>
  <login-layout>
    <h1>登录</h1>
    <div class="login_form">
      <LimitInput v-model="username" label="Account" warn="4-8位字符，需包含数字1-5和字母a-z两种元素" />
      <LimitInput v-model="password" label="Password" type="password" warn="6位字符，需包含数字和字母两种元素">
        <template slot="label-end">
          <insert-txt title="导入Keystore" />
        </template>
      </LimitInput>
    </div>
    <button class="transfer-submit" :class="{'btn-disabled': disabled}" @click="handleSubmit">Login in</button>
    <p class="no_acccount">NO ACCOUNT？ <span style="color: #195BDD" @click="handleRegister">REGISTER</span></p>
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
import insertTxt from '@/components/insert'
import config from '@/utils/config'
import Crypto from '@/utils/crypto'
import { getTableRow, toApiFormatUserName } from '@/utils'
import ecc from 'eosjs-ecc'

export default {
  name: 'Login',
  components: { LimitInput, LoginLayout, insertTxt },
  data () {
    return {
      disabled: false,
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit () {
      const userKeystore = localStorage.getItem(config.lsUserKeystore)
      if (userKeystore) {
        if (!this.username) {
          window.tip('请输入用户名')
          return false
        }
        if (!this.password) {
          window.tip('请输入密码')
          return false
        }
        try {
          this.disabled = !this.disabled
          // 通过密码获取用户公钥
          const privateKey = Crypto.decrypt(userKeystore, this.password)
          const publicKey = ecc.privateToPublic(privateKey)
          // 通过uid获取用户公钥
          this.getTableRowsForAjax(toApiFormatUserName(this.username), publicKey)
        } catch (error) {
          window.tip('用户名或密码错误')
          this.disabled = !this.disabled
          return false
        }
      } else {
        window.tip('请导入您的keystore')
      }
    },
    getTableRowsForAjax (lowerBound, publicKey) {
      let _that = this
      let params = {
        code: config.contractAccount,
        scope: config.contractAccount,
        lower_bound: lowerBound,
        upper_bound: '',
        index_position: 1,
        table: 'users',
        limit: 1
      }
      getTableRow(params, function (res) {
        if (res.rows && res.rows.length > 0) {
          let row = res.rows[0]
          if (row.username === params.lower_bound) {
            if (publicKey === row.pubkey) {
              _that.$store.commit('setLoginStatus', {isLogin: true, userName: row.nickname, lock: _that.password})
              _that.$router.push({path: '/'})
              _that.disabled = !_that.disabled
            } else {
              window.tip('登陆用户和导入的keystore内容不一致')
            }
          } else {
            window.tip('用户名或密码错误')
            return false
          }
        }
      })
    },
    handleRegister () {
      this.$router.push({path: '/register'})
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
  span
    cursor pointer
</style>
