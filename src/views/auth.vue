<template>
  <login-layout>
    <h1>Login in</h1>
    <div class="login_form">
      <LimitInput v-model="username" label="Account" warn="" />
      <LimitInput v-model="password" type="password" label="Password" warn="6位字符，需包含数字和字母两种元素" />
    </div>
    <div class="login_line">
      <span>
        <a v-for="(item, key) in dappList" :key="key" :href="item.url">
          {{item.appname}} <i v-show="(key+1) != item.length">,</i>
        </a>
        请求获取以下权限
      </span>
    </div>
    <div class="login_checkbox">
      <label v-for="(item, key) in currencyList" :key="key"><input type="checkbox" name="NAME" value="VALUE" checked>{{ item }}</label>
    </div>
    <p class="login_warn">24小时内可以从您的账户与各种扣除以下资产，授权后表示您知晓并同意以上请求。</p>
    <button :class="{'btn-disabled': disabled}" class="transfer-submit" @click="handleSubmit">Login in</button>
    <!-- <p class="no_acccount">NO EOS ACCOUNT？ <span style="color: #195BDD">REGISTER</span></p> -->
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
import config from '@/utils/config'
import { getUrlSearch, transactAction, getTableRow, toApiFormatUserName, getExpireTime } from '@/utils/'

export default {
  name: 'Login',
  components: { LimitInput, LoginLayout },
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
            _that.dappList.push(row)
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
      let sec = getExpireTime()
      let contracts = []
      this.dappList.map(item => {
        contracts.push(item.contract)
      })
      let limits = this.urlSearch.scope
      let expireIn = this.urlSearch.expire_in || (24 * 60 * 60) // 默认24小时
      let formatUserName = toApiFormatUserName(this.username)
      let pubKey = this.urlSearch.pubkey
      var data = `${formatUserName}-${contracts.join('-')}-${limits}-${expireIn}-${pubKey}-${sec}`
      let sig = ecc.sign(data, this.uidUserPrivateKey)
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
        } else {
          window.tip('授权失败')
        }
      })
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
.login_line
  height 1px
  background-color #D9D5E2
  width 100%
  position relative
  margin-bottom 24px
  display flex
  justify-content center
  span
    position absolute
    top -16px
    display inline-block
    padding 6px 20px
    background #fff
    font-size 14px
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
.no_acccount
  text-align center
  margin-top 20px
</style>
