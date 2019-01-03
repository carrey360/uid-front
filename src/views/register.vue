<template>
  <login-layout>
    <h1>注册</h1>
    <div class="login_form">
      <LimitInput v-model="username" label="Account" warn="4-8位字符，需包含数字1-5和字母a-z两种元素" />
      <LimitInput v-model="password" type="password" label="Password" warn="6位字符，需包含数字和字母两种元素" />
      <LimitInput v-model="configPassword" type="password" label="Confirm Password" />
    </div>
    <div class="contract—account" v-show="dappList.length > 0">
      合约账号&nbsp;
      <span>
        <a v-for="(item, key) in dappList" :key="key" :href="item.url">
          {{item.appname}} <i v-if="(key + 1) != dappList.length">、</i>
        </a>&nbsp;请求获取以下权限
      </span>
    </div>
    <div class="login_warn" v-show="currencyList.length > 0">
      <label>
        <input type="checkbox" name="NAME" value="VALUE" checked />
        <span>
          24小时内可以从您的账户余额中扣除
          <label v-for="(item, key) in currencyList" :key="key">{{ item }}<i v-if="(key + 1) != currencyList.length">、</i></label>
          ，授权后表示您知晓并同意以上请求。
        </span>
      </label>
    </div>
    <button class="transfer-submit" :class="{'btn-disabled': disabled}" @click="handleSubmit">Submit</button>
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
import { transactAction, toApiFormatUserName, downloadFile, getUrlSearch, signinTools } from '@/utils/'
import Crypto from '@/utils/crypto'

export default {
  name: 'sogin-in',
  components: { LimitInput, LoginLayout },
  data () {
    return {
      disabled: false,
      username: '',
      password: '',
      configPassword: '',
      currencyList: [],
      dappList: [],
      urlSearch: ''
    }
  },
  created () {
    let search = getUrlSearch(window.location.search)

    if (search.scope) {
      this.urlSearch = search
      this.currencyList = search.scope.split('^')
    }
    if (search.dappList) {
      this.dappList = JSON.parse(search.dappList)
    }
  },
  methods: {
    handleSubmit () {
      // todo 密码位数验证还需补充
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
      let _that = this
      ecc.randomKey().then(privateKey => {
        let publicKey = ecc.privateToPublic(privateKey)
        console.log('注册私钥', privateKey)
        console.log('注册公钥', publicKey)
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
            const keyStote = Crypto.encrypt(privateKey, this.password)
            localStorage.setItem(config.lsUserKeystore, keyStote)
            downloadFile(`${params.username}.txt`, keyStote)
            if (this.urlSearch.redirect_uri) { // 如果是第三方登陆处理
              signinTools(_that.urlSearch, privateKey, _that.dappList, _that.username)
            } else {
              this.$store.commit('setLoginStatus', {isLogin: true, userName: this.username, lock: this.password})
              this.$router.push({path: '/'})
            }
          } else {
            window.tip('注册失败')
          }
        })
      })
    },
    handleRegister () {
      this.$router.path({path: '/register'})
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
.contract—account
  color #333333
  font-size 14px
  font-weight 500
  margin-bottom 24px
  a
    text-decoration none
    color #455DE1
.login_checkbox
  display flex
  flex-direction column
  padding-left 30%
  label
    margin-bottom 12px
    font-size 16px
    color #333333
    cursor pointer
    input
      margin-right 10px
      width 16px
      height 16px
.login_warn
  font-size 14px
  color #5E6875
  margin-bottom 48px
  display flex
  input
    margin-right 5px
</style>
