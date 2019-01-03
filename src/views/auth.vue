<template>
  <login-layout>
    <h1>第三方登录</h1>
    <div class="login_form">
      <LimitInput v-model="username" label="Account" warn="" />
      <LimitInput v-model="password" type="password" label="Password" warn="" >
        <template slot="label-end">
          <insert-txt title="导入Keystore" />
        </template>
      </LimitInput>
    </div>
    <div class="contract—account">
      合约账号&nbsp;
      <span>
        <a v-for="(item, key) in dappList" :key="key" :href="item.url">
          {{item.appname}} <i v-if="(key + 1) != dappList.length">、</i>
        </a>&nbsp;请求获取以下权限
      </span>
    </div>
    <div class="login_warn">
      <label>
        <input type="checkbox" name="NAME" value="VALUE" checked />
        <span>
          24小时内可以从您的账户余额中扣除
          <label v-for="(item, key) in currencyList" :key="key">{{ item }}<i v-if="(key + 1) != currencyList.length">、</i></label>
          ，授权后表示您知晓并同意以上请求。
        </span>
      </label>
    </div>
    <button :class="{'btn-disabled': disabled}" class="transfer-submit" @click="handleSubmit">Login in</button>
    <p class="no_acccount">还没有账号？ <span style="color: #195BDD" @click="goRegister">注册</span></p>
    <template slot="title">
      <p class="title">Welcome Back</p>
      <p>Wether you are an expett or a baeginner.EOS is going to</p>
      <p>become the first platform whiche will faster all your needs </p>
      <p>in a simple, easy and intuotive way</p>
    </template>
  </login-layout>
</template>
<script>
import { mapState } from 'vuex'
import ecc from 'eosjs-ecc'
import LoginLayout from '@/components/loginLayout'
import LimitInput from '@/components/input'
import insertTxt from '@/components/insert'
import config from '@/utils/config'
import Crypto from '@/utils/crypto'
import { getUrlSearch, transactAction, getTableRow, toApiFormatUserName, getExpireTime, signinTools } from '@/utils/'

export default {
  name: 'Login',
  components: { LimitInput, LoginLayout, insertTxt },
  data () {
    return {
      disabled: false,
      currencyList: [],
      urlSearch: {},
      username: '',
      password: '',
      dappList: []
    }
  },
  computed: {
    ...mapState(['uidUserPrivateKey'])
  },
  created () {
    let search = getUrlSearch(window.location.search)
    this.urlSearch = search
    if (search.scope) {
      this.currencyList = search.scope.split('^')
    }
    let clientIds = search.client_id
    if (clientIds) {
      let clientId = clientIds.split('^')
      let i = 0
      for (i; i < clientId.length; i++) {
        this.getTableRowsForAjax(clientId[i])
      }
    }
  },
  methods: {
    getTableRowsForAjax (lowerBound) {
      let _that = this
      let params = {
        code: config.contractAccount,
        scope: config.contractAccount,
        lower_bound: lowerBound,
        upper_bound: '',
        index_position: 1,
        table: 'dapps',
        limit: 1
      }
      getTableRow(params, function (res) {
        if (res.rows && res.rows.length > 0) {
          let row = res.rows[0]
          if (row.contract === params.lower_bound) {
            let info = {
              appname: row.appname,
              contract: row.contract
            }
            _that.dappList.push(info)
          }
        }
      })
    },
    handleSubmit () {
      if (!this.username) {
        window.tip('请输入用户名')
        return false
      }
      if (!this.password) {
        window.tip('请输入密码')
        return false
      }
      const userKeystore = localStorage.getItem(config.lsUserKeystore)
      if (!userKeystore) {
        window.tip('请导入您的keystore')
        return false
      }
      try {
        const privateKey = Crypto.decrypt(userKeystore, this.password)
        const publicKey = ecc.privateToPublic(privateKey)
        // 通过uid获取通过用户私钥
        this.getTableRowsForLogin(toApiFormatUserName(this.username), publicKey, privateKey)
      } catch (error) {
        window.tip('用户名或密码错误')
        this.disabled = !this.disabled
        return false
      }
      this.disabled = !this.disabled
    },
    getTableRowsForLogin (lowerBound, publicKey, privateKey) {
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
              // _that.signin(privateKey)
              signinTools(_that.urlSearch, privateKey, _that.dappList, _that.username)
            }
          } else {
            window.tip('用户名或密码错误')
            return false
          }
        }
      })
    },
    signin (privateKey) {
      let sec = getExpireTime()
      let _that = this
      let contracts = []
      this.dappList.map(item => {
        contracts.push(item.contract)
      })
      let limits = this.urlSearch.scope
      let expireIn = +this.urlSearch.expire_in || (24 * 60 * 60) // 默认24小时
      let formatUserName = toApiFormatUserName(this.username)
      let pubKey = this.urlSearch.pubkey
      var data = `${formatUserName}-${contracts.join('-')}-${limits}-${expireIn}-${pubKey}-${sec}`
      let sig = ecc.sign(data, privateKey)
      let params = {
        username: formatUserName,
        contracts: contracts,
        limits: limits,
        expire_in: expireIn,
        pubkey: pubKey,
        expire_time: sec,
        sig: sig
      }
      transactAction('signin', params).then(res => {
        if (res && res.transaction_id) {
          window.tip('授权成功')
          // #error=0&username=xxx&scope=xxx&state=xxx
          setTimeout(() => {
            window.location.href = `${_that.urlSearch.redirect_uri}#error=0&username=${_that.username}&scope=${_that.urlSearch.scope}&state=${_that.urlSearch.state}`
          }, 2000)
        } else {
          window.tip('授权失败')
          setTimeout(() => {
            window.location.href = `${_that.urlSearch.redirect_uri}#error=access_denied`
          }, 2000)
        }
      })
    },
    goRegister () {
      let search = location.search + '&dappList=' + JSON.stringify(this.dappList)

      let url = location.protocol + '//' + location.hostname + ':' + location.port + '/register?' + search
      location.href = encodeURI(decodeURI(url))

      // this.$router.push({path: '/register', query: {query: search}})
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
.no_acccount
  text-align center
  margin-top 20px
</style>
